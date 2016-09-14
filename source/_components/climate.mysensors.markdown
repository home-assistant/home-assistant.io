---
layout: page
title: "MySensors HVAC"
description: "Instructions how to integrate MySensors climate into Home Assistant."
date: 2016-09-14 18:20 +0100
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Climate
featured: false
ha_release: 0.28+
---

Integrates MySensors HVAC into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.5 and higher

S_TYPE      | V_TYPE
------------|-------------
S_HVAC      | [V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_FLOW_STATE, V_HVAC_FLOW_MODE, V_HVAC_SPEED]

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 */

#include <MySensor.h>
...
...
...

#define CHILD_ID_HVAC  0  // childId
MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSetPointH(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);
...
...
...
void setup()
{

        // Startup and initialize MySensors library. Set callback for incoming messages.
        gw.begin(incomingMessage);

        // Send the sketch version information to the gateway and Controller
        gw.sendSketchInfo("HVAC", "0.1");

        gw.present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
        gw.send(msgHVACFlowState.set("Off"));
        gw.send(msgHVACSetPointC.set(target_temp));
        gw.send(msgHVACSetPointH.set(target_temp));
        gw.send(msgHVACSpeed.set("Max"));
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
        case V_HVAC_SETPOINT_HEAT:
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

void loop() {

        // Process incoming messages (like config from server)
        gw.process();

}
```

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
