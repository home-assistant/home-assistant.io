---
title: "MySensors Switch"
description: "Instructions on how to integrate MySensors switches into Home Assistant."
ha_category:
  - DIY
  - Switch
ha_iot_class: Local Push
ha_release: 0.11
ha_domain: mysensors
---

Integrates MySensors switches into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

## Supported actuator types

The following actuator types are supported:

### MySensors version 1.4 and higher

| S_TYPE   | V_TYPE             |
| -------- | ------------------ |
| S_DOOR   | V_ARMED            |
| S_MOTION | V_ARMED            |
| S_SMOKE  | V_ARMED            |
| S_LIGHT  | V_LIGHT            |
| S_LOCK   | V_LOCK_STATUS      |
| S_IR     | V_IR_SEND, V_LIGHT |

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

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## Services

The MySensors switch platform exposes a service to change an IR code attribute for an IR switch device and turn the switch on. The IR switch will automatically be turned off after being turned on, if `optimistic` is set to `true` in the [configuration](/integrations/mysensors/#configuration) for the MySensors component. This will simulate a push button on a remote. If `optimistic` is `false`, the MySensors device will have to report its updated state to reset the switch. See the [example sketch](#ir-switch-sketch) for the IR switch below.

| Service                | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| mysensors.send_ir_code | Set an IR code as a state attribute for a MySensors IR device switch and turn the switch on. |

The service can be used as part of an automation script. For example:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: "Turn HVAC on"
    trigger:
      platform: time
      at: "5:30:00"
    action:
      service: mysensors.send_ir_code
      target:
        entity_id: switch.hvac_1_1
      data:
        V_IR_SEND: "0xC284"  # the IR code to send

  - alias: "Turn HVAC off"
    trigger:
      platform: time
      at: "0:30:00"
    action:
      service: mysensors.send_ir_code
      target:
        entity_id: switch.hvac_1_1
      data:
        V_IR_SEND: "0xC288"  # the IR code to send
```

## Example sketches

### Switch sketch

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

### IR switch sketch

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
