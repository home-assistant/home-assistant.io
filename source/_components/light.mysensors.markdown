---
layout: page
title: "MySensors Light"
description: "Instructions how to integrate MySensors lights into Home Assistant."
date: 2016-04-13 14:20 +0100
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Light
featured: false
---

Integrates MySensors lights into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.4

S_TYPE   | V_TYPE
---------|--------------
S_DIMMER | V_DIMMER\*, V_LIGHT\*

##### MySensors version 1.5 and higher

S_TYPE      | V_TYPE
------------|-------------
S_DIMMER    | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]
S_RGB_LIGHT | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]

V_TYPES with a star (\*) denotes required V_TYPES. Use either V_LIGHT or V_STATUS and either V_DIMMER or V_PERCENTAGE for an applicable actuator.

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/dimmer
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

[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
