---
title: "MySensors Light"
description: "Instructions on how to integrate MySensors lights into Home Assistant."
ha_category:
  - DIY
  - Light
ha_release: 0.13
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors lights into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

The following actuator types are supported:

## MySensors version 1.4

| S_TYPE   | V_TYPE                |
| -------- | --------------------- |
| S_DIMMER | V_DIMMER\*, V_LIGHT\* |

## MySensors version 1.5 and higher

| S_TYPE       | V_TYPE                                                         |
| ------------ | -------------------------------------------------------------- |
| S_DIMMER     | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]      |
| S_RGB_LIGHT  | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]  |
| S_RGBW_LIGHT | V_RGBW*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE] |

V_TYPES with a star (\*) denote V_TYPES that should be sent at sketch startup. For an S_DIMMER, send both a V_DIMMER/V_PERCENTAGE and a V_LIGHT/V_STATUS message.  For an S_RGB_LIGHT, send both a V_RGB and a V_LIGHT/V_STATUS message with a V_DIMMER/V_PERCENTAGE message being optional. Same principal applies for S_RGBW_LIGHT and V_RGBW.

Sketch should acknowledge a command sent from controller with the same type.  If command invokes a change to off state (including a V_PERCENTAGE, V_RGB, or V_RGBW message of zero), only a V_STATUS of zero message should be sent.  See sketches below for examples.

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## MySensors 1.x example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/dimmer
 */

#include <MySensor.h>
#include <SPI.h>

#define SN "DimmableRGBLED"
#define SV "1.0"
#define CHILD_ID 1
#define LED_PIN 5

MySensor gw;

char rgb[7] = "ffffff"; // RGB value.
int currentLevel = 0;  // Current dimmer level.
MyMessage dimmerMsg(CHILD_ID, V_PERCENTAGE);
MyMessage lightMsg(CHILD_ID, V_STATUS);
MyMessage rgbMsg(CHILD_ID, V_RGB);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_RGB_LIGHT);
  // Send initial values.
  gw.send(lightMsg.set(currentLevel > 0 ? 1 : 0));
  gw.send(dimmerMsg.set(currentLevel));
  gw.send(rgbMsg.set(rgb));
}

void loop()
{
  gw.process();
}

void incomingMessage(const MyMessage &message) {
  if (message.type == V_RGB) {
    // Retrieve the RGB value from the incoming message.
    // RGB LED not implemented, just a dummy print.
    String hexstring = message.getString();
    hexstring.toCharArray(rgb, sizeof(rgb));
    Serial.print("Changing color to ");
    Serial.println(rgb);
    gw.send(rgbMsg.set(rgb));
  }

  if (message.type == V_STATUS || message.type == V_PERCENTAGE) {
    // Retrieve the light status or dimmer level from the incoming message.
    int requestedLevel = atoi(message.data);

    // Adjust incoming level if this is a V_LIGHT update [0 == off, 1 == on].
    requestedLevel *= (message.type == V_STATUS ? 100 : 1);

    // Clip incoming level to valid range of 0 to 100
    requestedLevel = requestedLevel > 100 ? 100 : requestedLevel;
    requestedLevel = requestedLevel < 0   ? 0   : requestedLevel;

    // Change level value of LED pin.
    analogWrite(LED_PIN, (int)(requestedLevel / 100. * 255));
    currentLevel = requestedLevel;

    // Update the gateway with the current V_STATUS and V_PERCENTAGE.
    gw.send(lightMsg.set(currentLevel > 0 ? 1 : 0));
    gw.send(dimmerMsg.set(currentLevel));
    }
}
```

## MySensors 2.x example sketch

```cpp
/*
 * Example Dimmable Light
 * Code adapted from https://github.com/mysensors/MySensors/tree/master/examples/DimmableLight
 *
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 */

// Enable debug prints
#define MY_DEBUG

// Enable and select radio type attached
#define MY_RADIO_NRF24
//#define MY_RADIO_RFM69

#include <MySensors.h>

#define CHILD_ID_LIGHT 1

#define LIGHT_OFF 0
#define LIGHT_ON 1

#define SN "Dimmable Light"
#define SV "1.0"

int16_t last_state = LIGHT_ON;
int16_t last_dim = 100;

MyMessage light_msg( CHILD_ID_LIGHT, V_STATUS );
MyMessage dimmer_msg( CHILD_ID_LIGHT, V_PERCENTAGE );

void setup()
{
  update_light();
  Serial.println( "Node ready to receive messages..." );
}

void loop()
{
  //In MySensors2.x, first message must come from within loop()
  static bool first_message_sent = false;
  if ( first_message_sent == false ) {
    Serial.println( "Sending initial state..." );
    send_dimmer_message();
    send_status_message();
    first_message_sent = true;
  }
}

void presentation()
{
  // Send the sketch version information to the gateway
  sendSketchInfo( SN, SV );
  present( CHILD_ID_LIGHT, S_DIMMER );
}

void receive(const MyMessage &message)
{
  //When receiving a V_STATUS command, switch the light between OFF
  //and the last received dimmer value
  if ( message.type == V_STATUS ) {
    Serial.println( "V_STATUS command received..." );

    int lstate = message.getInt();
    if (( lstate < 0 ) || ( lstate > 1 )) {
      Serial.println( "V_STATUS data invalid (should be 0/1)" );
      return;
    }
    last_state = lstate;

    //If last dimmer state is zero, set dimmer to 100
    if (( last_state == LIGHT_ON ) && ( last_dim == 0 )) {
      last_dim=100;
    }

    //Update constroller status
    send_status_message();

  } else if ( message.type == V_PERCENTAGE ) {
    Serial.println( "V_PERCENTAGE command received..." );
    int dim_value = constrain( message.getInt(), 0, 100 );
    if ( dim_value == 0 ) {
      last_state = LIGHT_OFF;

      //Update constroller with dimmer value & status
      send_dimmer_message();
      send_status_message();
    } else {
      last_state = LIGHT_ON;
      last_dim = dim_value;

      //Update constroller with dimmer value
      send_dimmer_message();
    }

  } else {
    Serial.println( "Invalid command received..." );
    return;
  }

  //Here you set the actual light state/level
  update_light();
}

void update_light()
{
  //For this example, just print the light status to console.
  if ( last_state == LIGHT_OFF ) {
    Serial.println( "Light state: OFF" );
  } else {
    Serial.print( "Light state: ON, Level: " );
    Serial.println( last_dim );
  }
}

void send_dimmer_message()
{
  send( dimmer_msg.set( last_dim ) );
}

void send_status_message()
{
  if ( last_state == LIGHT_OFF ) {
    send( light_msg.set( (int16_t)0) );
  } else {
    send( light_msg.set( (int16_t)1) );
  }
}
```
