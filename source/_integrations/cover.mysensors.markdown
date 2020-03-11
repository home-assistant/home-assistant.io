---
title: "MySensors Cover"
description: "Instructions on how to integrate MySensors covers into Home Assistant."
ha_category:
  - DIY
  - Cover
ha_release: "0.30"
ha_iot_class: Local Push
ha_domain: mysensors
---

Integrates MySensors covers into Home Assistant. See the [main integration](/integrations/mysensors/) for configuration instructions.

The following actuator types are supported:

## MySensors version 1.4

| S_TYPE  | V_TYPE                                      |
| ------- | ------------------------------------------- |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_DIMMER or V_LIGHT] |

## MySensors version 1.5 and higher

| S_TYPE  | V_TYPE                                           |
| ------- | ------------------------------------------------ |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_PERCENTAGE or V_STATUS] |

All V_TYPES above are required. Use V_PERCENTAGE (or V_DIMMER) if you know the exact position of the cover in percent, use V_STATUS (or V_LIGHT) if you don't.

For more information, visit the [serial API](https://www.mysensors.org/download/serial_api_20) of MySensors.

## Example sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>
#define SN "Cover"
#define SV "1.1"

// Actuators for moving the cover up and down respectively.
#define COVER_UP_ACTUATOR_PIN 2
#define COVER_DOWN_ACTUATOR_PIN 3
// Sensors for finding out when the cover has reached its up/down position.
// These could be simple buttons or linear hall sensors.
#define COVER_UP_SENSOR_PIN 4
#define COVER_DOWN_SENSOR_PIN 5

#define CHILD_ID 0

// Internal representation of the cover state.
enum State {
  IDLE,
  UP, // Window covering. Up.
  DOWN, // Window covering. Down.
};

static int state = IDLE;
static int status = 0; // 0=cover is down, 1=cover is up
static bool initial_state_sent = false;
MyMessage upMessage(CHILD_ID, V_UP);
MyMessage downMessage(CHILD_ID, V_DOWN);
MyMessage stopMessage(CHILD_ID, V_STOP);
MyMessage statusMessage(CHILD_ID, V_STATUS);

void sendState() {
  // Send current state and status to gateway.
  send(upMessage.set(state == UP));
  send(downMessage.set(state == DOWN));
  send(stopMessage.set(state == IDLE));
  send(statusMessage.set(status));
}

void setup() {
  pinMode(COVER_UP_SENSOR_PIN, INPUT);
  pinMode(COVER_DOWN_SENSOR_PIN, INPUT);
}

void presentation() {
  sendSketchInfo(SN, SV);

  present(CHILD_ID, S_COVER);
}

void loop() {
  if (!initial_state_sent) {
    sendState();
    initial_state_sent = true;
  }

  if (state == IDLE) {
    digitalWrite(COVER_UP_ACTUATOR_PIN, LOW);
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, LOW);
  }

  if (state == UP && digitalRead(COVER_UP_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is up.");
    // Update status and state; send it to the gateway.
    status = 1;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }

  if (state == DOWN && digitalRead(COVER_DOWN_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is down.");
    // Update status and state; send it to the gateway.
    status = 0;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_UP) {
    // Set state to covering up and send it back to the gateway.
    state = UP;
    sendState();
    Serial.println("Moving cover up.");

    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_UP_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_DOWN) {
    // Set state to covering up and send it back to the gateway.
    state = DOWN;
    sendState();
    Serial.println("Moving cover down.");
    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_STOP) {
    // Set state to idle and send it back to the gateway.
    state = IDLE;
    sendState();
    Serial.println("Stopping cover.");

    // Actuators will be switched off in loop().
  }
}
```
