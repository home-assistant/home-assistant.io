---
title: MySensors
description: Instructions on how to integrate MySensors into Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: 0.73
ha_codeowners:
  - '@MartinHjelmare'
  - '@functionpointer'
ha_domain: mysensors
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - device_tracker
  - light
  - remote
  - sensor
  - switch
  - text
ha_config_flow: true
ha_integration_type: integration
---

The [MySensors](https://www.mysensors.org) project combines devices like Arduino, ESP8266, Raspberry Pi, NRF24L01+ and RFM69 to build affordable sensor networks. This integration will automatically add all available devices to Home Assistant, after [presentation](#presentation) is done. That is, you do not need to add anything to your configuration for the devices for them to be added. Go to the **states** section of the developer tools to find the devices that have been identified.

{% include integrations/config_flow.md %}

Configuration depends on the type of Gateway you use:

### Serial gateway

If you are using an original Arduino as a serial gateway, the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
ls /dev/ttyACM*
```

In addition to the serial device you also need to enter the baud rate.

### MQTT gateway

If you are using the MQTT gateway, you will need to enter topic prefixes for input and output. These need to be swapped
with the settings of the gateway. I.e. the input topic for Home Assistant needs to be the output (publish) topic of the gateway.

{% note %}
The MQTT gateway requires MySensors version 2.0+ and only the MQTT client gateway is supported.
{% endnote %}

### Ethernet gateway

To use an Ethernet gateway, you need to configure the IP address and port of the gateway.

### General options

A few options are available for all gateways:

- persistence file:
  Home Assistant will store detected nodes in a file. This means restarting Home Assistant will not require re-discovering of all the nodes. The persistence file option allows setting the path of the file. Leaving the option empty will make Home Assistant auto-generate a file name in the configuration directory.

- version:
  Enter the version of MySensors that you use for your gateway.

## Presentation

Present a MySensors sensor or actuator, by following these steps:

  Enter the version of MySensors that you use

1. Start Home Assistant and configure the MySensors integration
2. Write and upload your MySensors sketch to the sensor. Make sure you:
    - Send sketch name.
    - Present the sensor's `S_TYPE`.
    - Send at least one initial value per `V_TYPE`. In version 2.x of MySensors, this has to be done in the loop function. See below for an example in 2.0 of how to make sure the initial value has been received by the controller.
3. Start the sensor.

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/relay
 */

#define MY_DEBUG
#define MY_RADIO_NRF24
#define MY_REPEATER_FEATURE
#define MY_NODE_ID 1
#include <SPI.h>
#include <MySensors.h>
#include <Bounce2.h>

#define RELAY_PIN  5
#define BUTTON_PIN  3
#define CHILD_ID 1
#define RELAY_ON 1
#define RELAY_OFF 0

Bounce debouncer = Bounce();
bool state = false;
bool initialValueSent = false;

MyMessage msg(CHILD_ID, V_STATUS);

void setup()
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(10);

  // Make sure relays are off when starting up
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
}

void presentation()  {
  sendSketchInfo("Relay+button", "1.0");
  present(CHILD_ID, S_BINARY);
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msg.set(state?RELAY_ON:RELAY_OFF));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_STATUS);
    wait(2000, C_SET, V_STATUS);
  }
  if (debouncer.update()) {
    if (debouncer.read()==LOW) {
      state = !state;
      // Send new state and request ack back
      send(msg.set(state?RELAY_ON:RELAY_OFF), true);
    }
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
  }

  if (message.type == V_STATUS) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Change relay state
    state = (bool)message.getInt();
    digitalWrite(RELAY_PIN, state?RELAY_ON:RELAY_OFF);
    send(msg.set(state?RELAY_ON:RELAY_OFF));
  }
}
```

## SmartSleep

Sending a heartbeat, `I_HEARTBEAT_RESPONSE`, from the MySensors device to Home Assistant, using MySensors version 2.0 - 2.1, activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands. See the MySensors library API for information on how to send heartbeats and sleep the device.

In MySensors version 2.2 the serial API changed from using `I_HEARTBEAT_RESPONSE` to signal SmartSleep, to using `I_PRE_SLEEP_NOTIFICATION` and `I_POST_SLEEP_NOTIFICATION`. Home Assistant has been upgraded to support the new message types and will activate SmartSleep when receiving a message of type `I_PRE_SLEEP_NOTIFICATION`, if using MySensors version 2.2.x or higher. If Home Assistant is configured to use MySensors version 2.0 - 2.1 the old SmartSleep behavior is retained.

## Message validation

Messages sent to or from Home Assistant from or to a MySensors device will be validated according to the MySensors [serial API](https://www.mysensors.org/download/serial_api_20). If a message doesn't pass validation, it will be dropped and not be passed forward either to or from Home Assistant. Make sure you follow the serial API for your version of MySensors when writing your Arduino sketch.

The log should warn you of messages that failed validation or if a child value is missing that is required for a certain child type. Home Assistant will log failed validations of child values at warning level if e.g.,  one required value type for a platform has been received, but other required value types are missing.

Message validation was introduced in version 0.52 of Home Assistant.

## Debug logging

If you experience dropped messages or that a device is not added to Home Assistant, please turn on debug logging for the `mysensors` integration and the `mysensors` package. This will help you see what is going on. Make sure you use these logging settings to collect a log sample if you report an issue about the `mysensors` integration in our GitHub issue tracker.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.mysensors: debug
    mysensors: debug
```

Visit the [library API][MySensors library api] of MySensors for more information.

[MySensors library API]: https://www.mysensors.org/download

## Binary sensor

The following binary sensor types are supported:

### MySensors version 1.4 and higher

| S_TYPE   | V_TYPE    |
| -------- | --------- |
| S_DOOR   | V_TRIPPED |
| S_MOTION | V_TRIPPED |
| S_SMOKE  | V_TRIPPED |

### MySensors version 1.5 and higher

| S_TYPE       | V_TYPE    |
| ------------ | --------- |
| S_SPRINKLER  | V_TRIPPED |
| S_WATER_LEAK | V_TRIPPED |
| S_SOUND      | V_TRIPPED |
| S_VIBRATION  | V_TRIPPED |
| S_MOISTURE   | V_TRIPPED |

### Binary sensor example sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/binary
 */


#include <MySensor.h>
#include <SPI.h>
#include <Bounce2.h>

#define SN "BinarySensor"
#define SV "1.0"
#define CHILD_ID 1
#define BUTTON_PIN 3  // Arduino Digital I/O pin for button/reed switch.

MySensor gw;
Bounce debouncer = Bounce();
MyMessage msg(CHILD_ID, V_TRIPPED);

void setup()
{
  gw.begin();
  gw.sendSketchInfo(SN, SV);
  // Setup the button.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // After setting up the button, setup debouncer.
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(5);
  gw.present(CHILD_ID, S_DOOR);
  gw.send(msg.set(0));
}

void loop()
{
  if (debouncer.update()) {
    // Get the update value.
    int value = debouncer.read();
    // Send in the new value.
    gw.send(msg.set(value == LOW ? 1 : 0));
  }
}
```

## Climate

The following actuator types are supported:

### MySensors version 1.5 and higher

| S_TYPE | V_TYPE                                                                               |
| ------ | ------------------------------------------------------------------------------------ |
| S_HVAC | V_HVAC_FLOW_STATE*, V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_SPEED, V_TEMP |

V_HVAC_FLOW_STATE is mapped to the state of the Climate integration in Home Assistant as follows:

| Home Assistant State | MySensors State |
| -------------------- | --------------- |
| HVAC_MODE_COOL       | CoolOn          |
| HVAC_MODE_HEAT       | HeatOn          |
| HVAC_MODE_AUTO       | AutoChangeOver  |
| HVAC_MODE_OFF        | Off             |

Currently humidity, away_mode, aux_heat, swing_mode is not supported. This will be included in later versions as feasible.

Set the target temperature using V_HVAC_SETPOINT_HEAT in Heat mode, and V_HVAC_SETPOINT_COOL in Cool Mode. In case of any Auto Change Over mode you can use V_HVAC_SETPOINT_HEAT as well as V_HVAC_SETPOINT_COOL to set the both the low bound and the high bound temperature of the device.

You can use V_HVAC_SPEED to control the Speed setting of the Fan in the HVAC.

You can use V_TEMP to send the current temperature from the node to Home Assistant.

### Climate example sketch for MySensors 2.x

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h> // sketch tested with version 2.3.2

#define SENSOR_NAME "Heatpump Sensor"
#define SENSOR_VERSION "2.3"

#define CHILD_ID_HVAC 0

#define IR_PIN  3  // Arduino pin tied to the IR led using Arduino PWM


// Uncomment your heatpump model
//#include <FujitsuHeatpumpIR.h>
//#include <PanasonicCKPHeatpumpIR.h>
//#include <PanasonicHeatpumpIR.h>
//#include <CarrierHeatpumpIR.h>
//#include <MideaHeatpumpIR.h>
//#include <MitsubishiHeatpumpIR.h>
//#include <SamsungHeatpumpIR.h> // sketch tested with version 1.0.15, see http://librarymanager#HeatpumpIR by Toni Arte
//#include <SharpHeatpumpIR.h>
//#include <DaikinHeatpumpIR.h>

//Some global variables to hold the numeric states sent to the airco unit
int POWER_STATE;
int TEMP_STATE;
int FAN_STATE;
int MODE_STATE;
int VDIR_STATE;
int HDIR_STATE;

//Some global variables to hold the text states sent to the home assistant controller
String FAN_STATE_TXT;  // possible values ("Min", "Normal", "Max", "Auto")
String MODE_STATE_TXT; // possible values ("Off", "HeatOn", "CoolOn", or "AutoChangeOver")


IRSenderPWM irSender(IR_PIN);

//Change to your own Heatpump
//HeatpumpIR *heatpumpIR = new SamsungAQV12MSANHeatpumpIR();
/*
new PanasonicDKEHeatpumpIR()
new PanasonicJKEHeatpumpIR()
new PanasonicNKEHeatpumpIR()
new CarrierHeatpumpIR()
new MideaHeatpumpIR()
new FujitsuHeatpumpIR()
new MitsubishiFDHeatpumpIR()
new MitsubishiFEHeatpumpIR()
new SamsungAQVHeatpumpIR()
new SamsungFJMHeatpumpIR()
// new SamsungHeatpumpIR() is a protected generic method, cannot be created directly
new SharpHeatpumpIR()
new DaikinHeatpumpIR()
*/

MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

bool initialValueSent = false;

void presentation() {
  // Send the sketch version information to the gateway and Controller
  sendSketchInfo(SENSOR_NAME, SENSOR_VERSION);

  // Register all sensors to gw (they will be created as child devices) by their ID and S_TYPE
  present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
}

void setup() {
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!initialValueSent) {
    FAN_STATE_TXT = "Auto"; // default fan start state
    TEMP_STATE = 20; // default start temperature
    MODE_STATE_TXT = "Off"; // default mode state

    send(msgHVACSetPointC.set(TEMP_STATE));
    send(msgHVACSpeed.set(FAN_STATE_TXT.c_str()));
    send(msgHVACFlowState.set(MODE_STATE_TXT.c_str()));

    initialValueSent = true;
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
     return;
  }

  Serial.print("Incoming message for: ");
  Serial.print(message.sensor);

  String recvData = message.data;
  recvData.trim();

  Serial.print(", New status: ");
  Serial.println(recvData);
  switch (message.type) {
    case V_HVAC_SPEED:
      Serial.println("V_HVAC_SPEED");

      if(recvData.equalsIgnoreCase("auto")) FAN_STATE = 0;
      else if(recvData.equalsIgnoreCase("min")) FAN_STATE = 1;
      else if(recvData.equalsIgnoreCase("normal")) FAN_STATE = 2;
      else if(recvData.equalsIgnoreCase("max")) FAN_STATE = 3;
      FAN_STATE_TXT = recvData;
    break;

    case V_HVAC_SETPOINT_COOL:
      Serial.println("V_HVAC_SETPOINT_COOL");
      TEMP_STATE = message.getFloat();
      Serial.println(TEMP_STATE);
    break;

    case V_HVAC_FLOW_STATE:
      Serial.println("V_HVAC_FLOW_STATE");
      if (recvData.equalsIgnoreCase("coolon")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_COOL;
      }
      else if (recvData.equalsIgnoreCase("heaton")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_HEAT;
      }
      else if (recvData.equalsIgnoreCase("autochangeover")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_AUTO;
      }
      else if (recvData.equalsIgnoreCase("off")){
        POWER_STATE = 0;
      }
      MODE_STATE_TXT = recvData;
      break;
  }
  sendHeatpumpCommand();
  sendNewStateToGateway();
}

void sendNewStateToGateway() {
  Serial.println("Status update send to HA:");
  Serial.println("*************************");
  Serial.println("Mode = " + MODE_STATE_TXT + "(" + (String)MODE_STATE + ")");
  Serial.println("Fan = " + FAN_STATE_TXT + "(" + (String)FAN_STATE + ")");
  Serial.println("Temp = " + (String)TEMP_STATE);
  send(msgHVACFlowState.set(MODE_STATE_TXT.c_str()));
  send(msgHVACSpeed.set(FAN_STATE_TXT.c_str()));
  send(msgHVACSetPointC.set(TEMP_STATE));
}

void sendHeatpumpCommand() {
  Serial.println("Heatpump commands send to airco:");
  Serial.println("********************************");
  Serial.println("Power = " + (String)POWER_STATE);
  Serial.println("Mode = " + (String)MODE_STATE);
  Serial.println("Fan = " + (String)FAN_STATE);
  Serial.println("Temp = " + (String)TEMP_STATE);

  heatpumpIR->send(irSender, POWER_STATE, MODE_STATE, FAN_STATE, TEMP_STATE, VDIR_AUTO, HDIR_AUTO);
}
```

## Cover

The following actuator types are supported:

### MySensors version 1.4

| S_TYPE  | V_TYPE                                      |
| ------- | ------------------------------------------- |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_DIMMER or V_LIGHT] |

### MySensors version 1.5 and higher

| S_TYPE  | V_TYPE                                           |
| ------- | ------------------------------------------------ |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_PERCENTAGE or V_STATUS] |

All V_TYPES above are required. Use V_PERCENTAGE (or V_DIMMER) if you know the exact position of the cover in percent, use V_STATUS (or V_LIGHT) if you don't.

### Cover example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>

#define SN "Cover"
#define SV "1.1"

// Actuators for moving the cover up and down respectively.
#define COVER_UP_ACTUATOR_PIN 2
#define COVER_DOWN_ACTUATOR_PIN 3
// Sensors for finding out when the cover has reached its up/down position.
// These could be simple buttons or linear hall sensors.
#define COVER_UP_SENSOR_PIN 4
#define COVER_DOWN_SENSOR_PIN 5

#define CHILD_ID 0

// Internal representation of the cover state.
enum State {
  IDLE,
  UP, // Window covering. Up.
  DOWN, // Window covering. Down.
};

static int state = IDLE;
static int status = 0; // 0=cover is down, 1=cover is up
static bool initial_state_sent = false;
MyMessage upMessage(CHILD_ID, V_UP);
MyMessage downMessage(CHILD_ID, V_DOWN);
MyMessage stopMessage(CHILD_ID, V_STOP);
MyMessage statusMessage(CHILD_ID, V_STATUS);

void sendState() {
  // Send current state and status to gateway.
  send(upMessage.set(state == UP));
  send(downMessage.set(state == DOWN));
  send(stopMessage.set(state == IDLE));
  send(statusMessage.set(status));
}

void setup() {
  pinMode(COVER_UP_SENSOR_PIN, INPUT);
  pinMode(COVER_DOWN_SENSOR_PIN, INPUT);
}

void presentation() {
  sendSketchInfo(SN, SV);

  present(CHILD_ID, S_COVER);
}

void loop() {
  if (!initial_state_sent) {
    sendState();
    initial_state_sent = true;
  }

  if (state == IDLE) {
    digitalWrite(COVER_UP_ACTUATOR_PIN, LOW);
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, LOW);
  }

  if (state == UP && digitalRead(COVER_UP_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is up.");
    // Update status and state; send it to the gateway.
    status = 1;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }

  if (state == DOWN && digitalRead(COVER_DOWN_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is down.");
    // Update status and state; send it to the gateway.
    status = 0;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_UP) {
    // Set state to covering up and send it back to the gateway.
    state = UP;
    sendState();
    Serial.println("Moving cover up.");

    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_UP_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_DOWN) {
    // Set state to covering up and send it back to the gateway.
    state = DOWN;
    sendState();
    Serial.println("Moving cover down.");
    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_STOP) {
    // Set state to idle and send it back to the gateway.
    state = IDLE;
    sendState();
    Serial.println("Stopping cover.");

    // Actuators will be switched off in loop().
  }
}
```

#### Cover sketch example with position measurement based on motor running time

This sketch is ideally for star topology wiring. You can run up to 12 covers with a single Arduino Mega board and some relays. All you need to set is one line of parameters for one Cover. However, you can also use it for a single cover based on an Arduino Nano or even an ESP8266 board.

[Check out the code on GitHub.](https://github.com/gryzli133/RollerShutterSplit)

## Device tracker

The following sensor types are supported:

### MySensors version 2.0 and higher

| S_TYPE | V_TYPE     |
| ------ | ---------- |
| S_GPS  | V_POSITION |

### Device tracker example sketch for MySensors 2.x

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/gps
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>

#define SN "GPS Sensor"
#define SV "1.0"

// GPS position send interval (in milliseconds)
#define GPS_SEND_INTERVAL 30000
// The child id used for the gps sensor
#define CHILD_ID_GPS 1

MyMessage msg(CHILD_ID_GPS, V_POSITION);

// Last time GPS position was sent to controller
unsigned long lastGPSSent = -31000;

// Some buffers
char latBuf[11];
char lngBuf[11];
char altBuf[6];
char payload[30];

// Dummy values. Implementation of real GPS device is not done.
float gpsLocationLat = 40.741895;
float gpsLocationLng = -73.989308;
float gpsAltitudeMeters = 12.0;

void setup() {

}

void presentation() {
  sendSketchInfo(SN, SV);
  present(CHILD_ID_GPS, S_GPS);
}

void loop()
{
  unsigned long currentTime = millis();

  // Evaluate if it is time to send a new position
  bool timeToSend = currentTime - lastGPSSent > GPS_SEND_INTERVAL;

  if (timeToSend) {
    // Send current gps location
    // Build position and altitude string to send
    dtostrf(gpsLocationLat, 1, 6, latBuf);
    dtostrf(gpsLocationLng, 1, 6, lngBuf);
    dtostrf(gpsAltitudeMeters, 1, 0, altBuf);
    sprintf(payload, "%s,%s,%s", latBuf, lngBuf, altBuf);

    Serial.print(F("Position: "));
    Serial.println(payload);

    send(msg.set(payload));
    lastGPSSent = currentTime;
  }
}
```

## Light

The following actuator types are supported:

### MySensors version 1.4

| S_TYPE   | V_TYPE                |
| -------- | --------------------- |
| S_DIMMER | V_DIMMER\*, V_LIGHT\* |

### MySensors version 1.5 and higher

| S_TYPE       | V_TYPE                                                         |
| ------------ | -------------------------------------------------------------- |
| S_DIMMER     | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]      |
| S_RGB_LIGHT  | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]  |
| S_RGBW_LIGHT | V_RGBW*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE] |

V_TYPES with a star (\*) denote V_TYPES that should be sent at sketch startup. For an S_DIMMER, send both a V_DIMMER/V_PERCENTAGE and a V_LIGHT/V_STATUS message.  For an S_RGB_LIGHT, send both a V_RGB and a V_LIGHT/V_STATUS message with a V_DIMMER/V_PERCENTAGE message being optional. Same principal applies for S_RGBW_LIGHT and V_RGBW.

Sketch should acknowledge a command sent from controller with the same type.  If command invokes a change to off state (including a V_PERCENTAGE, V_RGB, or V_RGBW message of zero), only a V_STATUS of zero message should be sent.  See sketches below for examples.

#### Light example sketch for MySensors 2.x

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
#define MY_RADIO_NRF24

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

## Remote

The following type combinations are supported:

### MySensors version 1.4 and higher

| S_TYPE | V_TYPE             |
| ------ | ------------------ |
| S_IR   | V_IR_SEND, V_LIGHT |

### MySensors version 1.5 and higher

| S_TYPE | V_TYPE              |
| ------ | ------------------- |
| S_IR   | V_IR_SEND, V_STATUS |

V_LIGHT or V_STATUS is required to report the on / off state of the remote. Use either V_LIGHT or V_STATUS depending on library version.

### IR transceiver example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/ir
 */

#include <MySensor.h>
#include <SPI.h>
#include <IRLib.h>

#define SN "IR Sensor"
#define SV "1.0"
#define CHILD_ID 1

MySensor gw;

char code[10] = "abcd01234";
char oldCode[10] = "abcd01234";
MyMessage msgCodeRec(CHILD_ID, V_IR_RECEIVE);
MyMessage msgCode(CHILD_ID, V_IR_SEND);
MyMessage msgSendCode(CHILD_ID, V_LIGHT);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_IR);
  // Send initial values.
  gw.send(msgCodeRec.set(code));
  gw.send(msgCode.set(code));
  gw.send(msgSendCode.set(0));
}

void loop()
{
  gw.process();
  // IR receiver not implemented, just a dummy report of code when it changes
  if (String(code) != String(oldCode)) {
    Serial.print("Code received ");
    Serial.println(code);
    gw.send(msgCodeRec.set(code));
    strcpy(oldCode, code);
  }
}

void incomingMessage(const MyMessage &message) {
  if (message.type==V_LIGHT) {
    // IR sender not implemented, just a dummy print.
    if (message.getBool()) {
      Serial.print("Sending code ");
      Serial.println(code);
    }
    gw.send(msgSendCode.set(message.getBool() ? 1 : 0));
    // Always turn off device
    gw.wait(100);
    gw.send(msgSendCode.set(0));
  }
  if (message.type == V_IR_SEND) {
    // Retrieve the IR code value from the incoming message.
    String codestring = message.getString();
    codestring.toCharArray(code, sizeof(code));
    Serial.print("Changing code to ");
    Serial.println(code);
    gw.send(msgCode.set(code));
  }
}
```

## Sensor

The following sensor types are supported:

### MySensors version 1.4 and higher

| S_TYPE             | V_TYPE                                 |
| ------------------ | -------------------------------------- |
| S_TEMP             | V_TEMP                                 |
| S_HUM              | V_HUM                                  |
| S_BARO             | V_PRESSURE, V_FORECAST                 |
| S_WIND             | V_WIND, V_GUST, V_DIRECTION            |
| S_RAIN             | V_RAIN, V_RAINRATE                     |
| S_UV               | V_UV                                   |
| S_WEIGHT           | V_WEIGHT, V_IMPEDANCE                  |
| S_POWER            | V_WATT, V_KWH                          |
| S_DISTANCE         | V_DISTANCE                             |
| S_LIGHT_LEVEL      | V_LIGHT_LEVEL                          |
| S_IR               | V_IR_RECEIVE                           |
| S_WATER            | V_FLOW, V_VOLUME                       |
| S_AIR_QUALITY      | V_DUST_LEVEL                           |
| S_CUSTOM           | V_VAR1, V_VAR2, V_VAR3, V_VAR4, V_VAR5 |
| S_DUST             | V_DUST_LEVEL                           |
| S_SCENE_CONTROLLER | V_SCENE_ON, V_SCENE_OFF                |

#### MySensors version 1.5 and higher

| S_TYPE         | V_TYPE                            |
| -------------- | --------------------------------- |
| S_COLOR_SENSOR | V_RGB                             |
| S_MULTIMETER   | V_VOLTAGE, V_CURRENT, V_IMPEDANCE |
| S_SOUND        | V_LEVEL                           |
| S_VIBRATION    | V_LEVEL                           |
| S_MOISTURE     | V_LEVEL                           |
| S_LIGHT_LEVEL  | V_LEVEL                           |
| S_AIR_QUALITY  | V_LEVEL (replaces V_DUST_LEVEL)   |
| S_DUST         | V_LEVEL (replaces V_DUST_LEVEL)   |

### MySensors version 2.0 and higher

| S_TYPE          | V_TYPE                    |
| --------------- | ------------------------- |
| S_INFO          | V_TEXT                    |
| S_GAS           | V_FLOW, V_VOLUME          |
| S_GPS           | V_POSITION                |
| S_IR            | V_IR_RECORD               |
| S_WATER_QUALITY | V_TEMP, V_PH, V_ORP, V_EC |

### Custom unit of measurement

Some sensor value types are not specific for a certain sensor type. These do not have a default unit of measurement in Home Assistant. For example, the V_LEVEL type can be used for different sensor types, dust, sound, vibration etc.

By using V_UNIT_PREFIX, it's possible to set a custom unit for any sensor. The string value that is sent for V_UNIT_PREFIX will be used in preference to any other unit of measurement, for the defined sensors. V_UNIT_PREFIX can't be used as a stand-alone sensor value type. Sending a supported value type and value from the tables above is also required. V_UNIT_PREFIX is available with MySensors version 1.5 and later.

### Sensor example sketch for MySensors 2.x

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/light
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <BH1750.h>
#include <Wire.h>
#include <MySensors.h>

#define SN "LightLuxSensor"
#define SV "1.0"
#define CHILD_ID 1
unsigned long SLEEP_TIME = 30000; // Sleep time between reads (in milliseconds)

BH1750 lightSensor;
MyMessage msg(CHILD_ID, V_LEVEL);
MyMessage msgPrefix(CHILD_ID, V_UNIT_PREFIX);  // Custom unit message.
uint16_t lastlux = 0;
bool initialValueSent = false;

void setup()
{
  sendSketchInfo(SN, SV);
  present(CHILD_ID, S_LIGHT_LEVEL);
  lightSensor.begin();
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msgPrefix.set("custom_lux"));  // Set custom unit.
    send(msg.set(lastlux));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_LEVEL);
    wait(2000, C_SET, V_LEVEL);
  }
  uint16_t lux = lightSensor.readLightLevel();  // Get Lux value
  if (lux != lastlux) {
      send(msg.set(lux));
      lastlux = lux;
  }

  sleep(SLEEP_TIME);
}

void receive(const MyMessage &message) {
  if (message.type == V_LEVEL) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
  }
}
```

## Switch

The following actuator types are supported:

### MySensors version 1.4 and higher

| S_TYPE   | V_TYPE        |
| -------- | ------------- |
| S_DOOR   | V_ARMED       |
| S_MOTION | V_ARMED       |
| S_SMOKE  | V_ARMED       |
| S_LIGHT  | V_LIGHT       |
| S_LOCK   | V_LOCK_STATUS |

### MySensors version 1.5 and higher

| S_TYPE       | V_TYPE                |
| ------------ | --------------------- |
| S_LIGHT      | V_STATUS              |
| S_BINARY     | [V_STATUS or V_LIGHT] |
| S_SPRINKLER  | V_STATUS              |
| S_WATER_LEAK | V_ARMED               |
| S_SOUND      | V_ARMED               |
| S_VIBRATION  | V_ARMED               |
| S_MOISTURE   | V_ARMED               |

### MySensors version 2.0 and higher

| S_TYPE          | V_TYPE   |
| --------------- | -------- |
| S_WATER_QUALITY | V_STATUS |

All V_TYPES for each S_TYPE above are required to activate the actuator for the platform. Use either V_LIGHT or V_STATUS depending on library version for cases where that V_TYPE is required.

### Switch example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/relay
 */

#include <MySensor.h>
#include <SPI.h>

#define SN "Relay"
#define SV "1.0"
#define CHILD_ID 1
#define RELAY_PIN 3

MySensor gw;
MyMessage msgRelay(CHILD_ID, V_STATUS);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  // Initialize the digital pin as an output.
  pinMode(RELAY_PIN, OUTPUT);
  gw.present(CHILD_ID, S_BINARY);
  gw.send(msgRelay.set(0));
}

void loop()
{
  gw.process();
}

void incomingMessage(const MyMessage &message)
{
  if (message.type == V_STATUS) {
     // Change relay state.
     digitalWrite(RELAY_PIN, message.getBool() ? 1 : 0);
     gw.send(msgRelay.set(message.getBool() ? 1 : 0));
  }
}
```

## Text

The following sensor types are supported:

### MySensors version 2.0 and higher

| S_TYPE | V_TYPE |
| ------ | ------ |
| S_INFO | V_TEXT |

### Text example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>
#include <SPI.h>

#define SN "TextSensor"
#define SV "1.0"
#define CHILD_ID 1

MyMessage textMsg(CHILD_ID, V_TEXT);
bool initialValueSent = false;

void setup(void) {
}

void presentation() {
  sendSketchInfo(SN, SV);
  present(CHILD_ID, S_INFO, "TextSensor1");
}

void loop() {
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    // Send initial values.
    send(textMsg.set("-"));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_TEXT);
    wait(2000, C_SET, V_TEXT);
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_TEXT) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Dummy print
    Serial.print("Message: ");
    Serial.print(message.sensor);
    Serial.print(", Message: ");
    Serial.println(message.getString());
    // Send message to controller
    send(textMsg.set(message.getString()));
  }
}
```
