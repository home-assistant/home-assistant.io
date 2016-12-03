---
layout: page
title: "MySensors HVAC"
description: "Instructions how to integrate MySensors climate into Home Assistant."
date: 2016-10-01 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Climate
ha_release: 0.29
ha_iot_class: "Local Push"
---

Integrates MySensors HVAC into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.5 and higher

S_TYPE | V_TYPE
-------|-----------------------------------------------------------------------------
S_HVAC | V_HVAC_FLOW_STATE*, V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_SPEED, V_TEMP

V_HVAC_FLOW_STATE is mapped to the state of the Climate component in Home Assistant as follows:

Home Assistant State | MySensors State
---------------------|----------------
STATE_COOL           | CoolOn
STATE_HEAT           | HeatOn
STATE_AUTO           | AutoChangeOver
STATE_OFF            | Off

Currently humidity, away_mode, aux_heat, swing_mode is not supported. This will be included in later versions as feasible.

Set the target temperature using V_HVAC_SETPOINT_HEAT in Heat mode, and V_HVAC_SETPOINT_COOL in Cool Mode. In case of any Auto Change Over mode you can use V_HVAC_SETPOINT_HEAT as well as V_HVAC_SETPOINT_COOL to set the both the low bound and the high bound temperature of the device.

You can use V_HVAC_SPEED to control the Speed setting of the Fan in the HVAC.

You can use V_TEMP to send the current temperature from the node to Home Assistant.

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch %}

```cpp
/*
* Documentation: http://www.mysensors.org
* Support Forum: http://forum.mysensors.org
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

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
