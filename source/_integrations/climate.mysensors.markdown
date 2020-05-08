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

```cpp
/*
* Documentation: https://www.mysensors.org
* Support Forum: https://forum.mysensors.org
*/

#define MY_RADIO_NRF24
#define CHILD_ID_HVAC 0

#include <MySensors.h>

// Uncomment your heatpump model
//#include <FujitsuHeatpumpIR.h>
//#include <PanasonicCKPHeatpumpIR.h>
//#include <PanasonicHeatpumpIR.h>
//#include <CarrierHeatpumpIR.h>
//#include <MideaHeatpumpIR.h>
//#include <MitsubishiHeatpumpIR.h>
//#include <SamsungHeatpumpIR.h>
//#include <SharpHeatpumpIR.h>
//#include <DaikinHeatpumpIR.h>

//Some global variables to hold the states
int POWER_STATE;
int TEMP_STATE;
int FAN_STATE;
int MODE_STATE;
int VDIR_STATE;
int HDIR_STATE;

IRSenderPWM irSender(3);       // IR led on Arduino digital pin 3, using Arduino PWM

//Change to your Heatpump
HeatpumpIR *heatpumpIR = new PanasonicNKEHeatpumpIR();

/*
new PanasonicDKEHeatpumpIR()
new PanasonicJKEHeatpumpIR()
new PanasonicNKEHeatpumpIR()
new CarrierHeatpumpIR()
new MideaHeatpumpIR()
new FujitsuHeatpumpIR()
new MitsubishiFDHeatpumpIR()
new MitsubishiFEHeatpumpIR()
new SamsungHeatpumpIR()
new SharpHeatpumpIR()
new DaikinHeatpumpIR()
*/

MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

bool initialValueSent = false;

void presentation() {
  sendSketchInfo("Heatpump", "2.1");
  present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
}

void setup() {
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!initialValueSent) {
    send(msgHVACSetPointC.set(20));
    send(msgHVACSpeed.set("Auto"));
    send(msgHVACFlowState.set("Off"));

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
      break;
  }
  sendHeatpumpCommand();
  sendNewStateToGateway();
}

void sendNewStateToGateway() {
  send(msgHVACSetPointC.set(TEMP_STATE));
  send(msgHVACSpeed.set(FAN_STATE));
  send(msgHVACFlowState.set(MODE_STATE));
}

void sendHeatpumpCommand() {
  Serial.println("Power = " + (String)POWER_STATE);
  Serial.println("Mode = " + (String)MODE_STATE);
  Serial.println("Fan = " + (String)FAN_STATE);
  Serial.println("Temp = " + (String)TEMP_STATE);

  heatpumpIR->send(irSender, POWER_STATE, MODE_STATE, FAN_STATE, TEMP_STATE, VDIR_AUTO, HDIR_AUTO);
}
```

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
