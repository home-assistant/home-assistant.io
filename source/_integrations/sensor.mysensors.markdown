---
title: "MySensors Sensor"
description: "Instructions on how to integrate MySensors sensors into Home Assistant."
ha_category:
  - DIY
  - Sensor
ha_iot_class: Local Push
ha_release: 0.7
ha_domain: mysensors
---

Integrates MySensors sensors into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

## Supported sensor types

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

### MySensors version 1.5 and higher

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
| S_WATER_QUALITY | V_TEMP, V_PH, V_ORP, V_EC |

## Custom unit of measurement

Some sensor value types are not specific for a certain sensor type. These do not have a default unit of measurement in Home Assistant. For example, the V_LEVEL type can be used for different sensor types, dust, sound, vibration etc.

By using V_UNIT_PREFIX, it's possible to set a custom unit for any sensor. The string value that is sent for V_UNIT_PREFIX will be used in preference to any other unit of measurement, for the defined sensors. V_UNIT_PREFIX can't be used as a stand-alone sensor value type. Sending a supported value type and value from the tables above is also required. V_UNIT_PREFIX is available with MySensors version 1.5 and later.

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## Example sketches

### MySensors 1.5 example sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/light
 */

#include <SPI.h>
#include <MySensor.h>
#include <BH1750.h>
#include <Wire.h>

#define SN "LightLuxSensor"
#define SV "1.0"
#define CHILD_ID 1
unsigned long SLEEP_TIME = 30000; // Sleep time between reads (in milliseconds)

BH1750 lightSensor;
MySensor gw;
MyMessage msg(CHILD_ID, V_LEVEL);
MyMessage msgPrefix(CHILD_ID, V_UNIT_PREFIX);  // Custom unit message.
uint16_t lastlux = 0;

void setup()
{
  gw.begin();
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_LIGHT_LEVEL);
  lightSensor.begin();
  gw.send(msg.set(lastlux));
  gw.send(msgPrefix.set("lux"));  // Set custom unit.
}

void loop()
{
  uint16_t lux = lightSensor.readLightLevel();  // Get Lux value
  if (lux != lastlux) {
      gw.send(msg.set(lux));
      lastlux = lux;
  }

  gw.sleep(SLEEP_TIME);
}
```

### MySensors 2.x example sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/light
 */

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
