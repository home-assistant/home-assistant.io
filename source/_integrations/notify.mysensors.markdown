---
title: "MySensors Notify"
description: "Instructions on how to integrate MySensors notifications into Home Assistant."
ha_category:
  - DIY
  - Notifications
ha_release: 0.36
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors notifications into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

Setting the `target` key in the service call will target the name of the MySensors device in Home Assistant. MySensors device names follow the notation: "[Sketch name] [Node id] [Child id]".

## Automation example

```yaml
...
action:
  service: notify.mysensors
  data:
    message: Welcome home!
    target: "TextSensor 254 1"
```

The following sensor types are supported:

##### MySensors version 2.0 and higher

| S_TYPE | V_TYPE |
| ------ | ------ |
| S_INFO | V_TEXT |

For more information, visit the [API](https://www.mysensors.org/download/) page of MySensors.

### Example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

 #define MY_DEBUG
 #define MY_RADIO_NRF24
 #define MY_REPEATER_FEATURE

 #include <SPI.h>
 #include <MySensors.h>

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
