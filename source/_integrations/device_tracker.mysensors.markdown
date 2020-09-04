---
title: "MySensors Device Tracker"
description: "Instructions on how to use MySensors to track devices in Home Assistant."
ha_category:
  - DIY
  - Presence Detection
ha_release: 0.38
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors device trackers into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

The following sensor types are supported:

## MySensors version 2.0 and higher

| S_TYPE | V_TYPE     |
| ------ | ---------- |
| S_GPS  | V_POSITION |

For more information, visit the [serial API](https://www.mysensors.org/download) of MySensors.

## MySensors 2.x example sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/gps
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
// Enable and select radio type attached
#define MY_RADIO_NRF24
//#define MY_RADIO_RFM69

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
