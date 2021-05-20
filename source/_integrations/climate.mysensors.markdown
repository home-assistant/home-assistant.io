---
title: "MySensors HVAC"
description: "Instructions on how to integrate MySensors climate into Home Assistant."
ha_category:
  - DIY
  - Climate
ha_release: 0.29
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors HVAC into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

The following actuator types are supported:

## MySensors version 1.5 and higher

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

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## Example sketch for MySensors 2.x

{% raw %}

```cpp
/**
 * The MySensors Arduino library handles the wireless radio link and protocol
 * between your home built sensors/actuators and HA controller of choice.
 * The sensors forms a self healing radio network with optional repeaters. Each
 * repeater and gateway builds a routing tables in EEPROM which keeps track of the
 * network topology allowing messages to be routed to nodes.
 *
 * Created by Henrik Ekblad <henrik.ekblad@mysensors.org>
 * Copyright (C) 2013-2015 Sensnology AB
 * Full contributor list: https://github.com/mysensors/Arduino/graphs/contributors
 *
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 *
 *******************************
 *
 * REVISION HISTORY
 * Version 1.0 - Toni A - https://github.com/ToniA/arduino-heatpumpir
 * Version 2.1 - Author unknown - example script from the Home Assistant website : https://www.home-assistant.io/integrations/climate.mysensors
 * Version 2.2 - Eric Van Bocxlaer - based on the example script from the Home Assistant website : https://www.home-assistant.io/integrations/climate.mysensors
 *                                 - https://community.home-assistant.io/t/mysensors-hvac-not-showing-up/22540
 * Version 2.3 - Eric Van Bocxlaer - correction states send back to home assistant, is expecting text values and not numeric values                               
 * 
 * DESCRIPTION
 * Heatpump controller
 */

// Enable debug prints to serial monitor
//#define MY_DEBUG
// Enable specific RFM69 debug prints to serial monitor
//#define MY_DEBUG_VERBOSE_RFM69

#define MY_NODE_ID 3  // set the node ID manually because a MQTT gateway will not assign automatically a node Id - this must be set before the mysensors.h call

// Enable and select radio type attached. Replace the defines if you use other radio type hardware.
#define MY_RADIO_RFM69
#define MY_RFM69_FREQUENCY RFM69_868MHZ // Set your frequency here
#define MY_IS_RFM69HW // Omit if your RFM is not "H"
#define MY_RFM69_NEW_DRIVER  // soft spi for rfm69 radio works only with new driver

//enable radio communication encryption
// more information can be found on https://forum.mysensors.org/topic/10382/security-signing-messages-and-encryption-of-messages-a-guide-or-more-a-summary-of-my-tests?_=1588348189475
//#define MY_ENCRYPTION_SIMPLE_PASSWD "your16bitpassword"
//enable simple signing
//#define MY_SIGNING_SIMPLE_PASSWD "your32bitpassword"
//#define MY_SIGNING_SIMPLE_PASSWD "your16bitpassword"
//enable simple signing and encryption
//#define MY_SECURITY_SIMPLE_PASSWORD "your16bitpassword"
//enable simple signing and encryption
#define MY_SECURITY_SIMPLE_PASSWORD "your32bitpassword"
//enable soft signing
//#define MY_SIGNING_SOFT
//#define MY_SIGNING_REQUEST_SIGNATURES
//#define MY_SIGNING_SOFT_RANDOMSEED_PIN A0 
// following hex codes are dummy hex codes, replace by your hexcodes (see the link above how to generate)
//#define MY_SIGNING_NODE_WHITELISTING {{.nodeId = 0,.serial = {0x99,0x88,0x77,0x66,0x55,0x44,0x33,0x22,0x11}},{.nodeId = 1,.serial = {0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x99}}}

#include <MySensors.h> // sketch tested with version 2.3.2, see http://librarymanager/all#MySensors

#define SENSOR_NAME "Heatpump Sensor"
#define SENSOR_VERSION "2.3"

#define CHILD_ID_HVAC 0 // Each radio node can report data for up to 254 different child sensors. You are free to choose the child id yourself. 
                        // You should avoid using child-id 255 because it is used for things like sending in battery level and other (protocol internal) node specific information.
                        
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

{% endraw %}

## Example sketch for MySensors 1.x

```cpp
/*
* Documentation: https://www.mysensors.org
* Support Forum: https://forum.mysensors.org
*/

#include <MySensor.h>
/*
* Include all the other Necessary code here.
* The example code is limited to message exchange for mysensors
* with the controller (ha).
*/

#define CHILD_ID_HVAC  0  // childId
MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

/*
* Include all the other Necessary code here.
* The example code is limited to message exchange for mysensors
* with the controller (ha).
*/

void setup()
{
  // Startup and initialize MySensors library.
  // Set callback for incoming messages.
  gw.begin(incomingMessage);

  // Send the sketch version information to the gateway and Controller
  gw.sendSketchInfo("HVAC", "0.1");

  gw.present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
  gw.send(msgHVACFlowState.set("Off"));
  gw.send(msgHVACSetPointC.set(target_temp));
  gw.send(msgHVACSpeed.set("Max"));
}

void loop() {
  // Process incoming messages (like config from server)
  gw.process();
}

void incomingMessage(const MyMessage &message) {
  String recvData = message.data;
  recvData.trim();
  switch (message.type) {
    case V_HVAC_SPEED:
    if(recvData.equalsIgnoreCase("auto")) fan_speed = 0;
    else if(recvData.equalsIgnoreCase("min")) fan_speed = 1;
    else if(recvData.equalsIgnoreCase("normal")) fan_speed = 2;
    else if(recvData.equalsIgnoreCase("max")) fan_speed = 3;
    processHVAC();
    break;
    case V_HVAC_SETPOINT_COOL:
    target_temp = message.getFloat();
    processHVAC();
    break;
    case V_HVAC_FLOW_STATE:
    if(recvData.equalsIgnoreCase("coolon") && (!Present_Power_On )){
      togglePower();
    }
    else if(recvData.equalsIgnoreCase("off") && Present_Power_On ){
      togglePower();
    }
    break;
  }
}
```
