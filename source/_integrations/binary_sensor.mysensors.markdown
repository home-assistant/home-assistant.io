---
title: "MySensors Binary Sensor"
description: "Instructions on how to integrate MySensors binary sensors into Home Assistant."
ha_category:
  - DIY
  - Binary Sensor
ha_release: 0.14
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors binary sensors into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

The following sensor types are supported:

## MySensors version 1.4 and higher

| S_TYPE   | V_TYPE    |
| -------- | --------- |
| S_DOOR   | V_TRIPPED |
| S_MOTION | V_TRIPPED |
| S_SMOKE  | V_TRIPPED |

## MySensors version 1.5 and higher

| S_TYPE       | V_TYPE    |
| ------------ | --------- |
| S_SPRINKLER  | V_TRIPPED |
| S_WATER_LEAK | V_TRIPPED |
| S_SOUND      | V_TRIPPED |
| S_VIBRATION  | V_TRIPPED |
| S_MOISTURE   | V_TRIPPED |

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## Example sketch

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
