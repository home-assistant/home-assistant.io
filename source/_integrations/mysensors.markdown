---
title: MySensors
description: Instructions on how to integrate MySensors into Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: 0.73
ha_codeowners:
  - '@MartinHjelmare'
  - '@functionpointer'
ha_domain: mysensors
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - device_tracker
  - light
  - notify
  - sensor
  - switch
ha_config_flow: true
---

The [MySensors](https://www.mysensors.org) project combines devices like Arduino, ESP8266, Raspberry Pi, NRF24L01+ and RFM69 to build affordable sensor networks. This integration will automatically add all available devices to Home Assistant, after [presentation](#presentation) is done. That is, you do not need to add anything to your configuration for the devices for them to be added. Go to the **states** section of the developer tools to find the devices that have been identified.

{% include integrations/config_flow.md %}

Configuration depends on the type of Gateway you use:

### Serial gateway

If you are using an original Arduino as a serial gateway, the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
ls /dev/ttyACM*
```

In addition to the serial device you also need to enter the baud rate.

### MQTT gateway

If you are using the MQTT gateway, you will need to enter topic prefixes for input and output. These need to be swapped
with the settings of the gateway. I.e. the input topic for Home Assistant needs to be the output (publish) topic of the gateway.

<div class='note'>
The MQTT gateway requires MySensors version 2.0+ and only the MQTT client gateway is supported.
</div>

### Ethernet gateway

To use an Ethernet gateway, you need to configure the IP address and port of the gateway.

### General options

A few options are available for all gateways:

- persistence file:
  Home Assistant will store detected nodes in a file. This means restarting Home Assistant will not require re-discovering of all the nodes. The persistence file option allows setting the path of the file. Leaving the option empty will make Home Assistant auto-generate a file name in the configuration directory.

- version:
  Enter the version of MySensors that you use for your gateway.

## Presentation

Present a MySensors sensor or actuator, by following these steps:

  Enter the version of MySensors that you use

1. Start Home Assistant and configure the MySensors integration
2. Write and upload your MySensors sketch to the sensor. Make sure you:
    - Send sketch name.
    - Present the sensor's `S_TYPE`.
    - Send at least one initial value per `V_TYPE`. In version 2.x of MySensors, this has to be done in the loop function. See below for an example in 2.0 of how to make sure the initial value has been received by the controller.
3. Start the sensor.

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/relay
 */

#define MY_DEBUG
#define MY_RADIO_NRF24
#define MY_REPEATER_FEATURE
#define MY_NODE_ID 1
#include <SPI.h>
#include <MySensors.h>
#include <Bounce2.h>

#define RELAY_PIN  5
#define BUTTON_PIN  3
#define CHILD_ID 1
#define RELAY_ON 1
#define RELAY_OFF 0

Bounce debouncer = Bounce();
bool state = false;
bool initialValueSent = false;

MyMessage msg(CHILD_ID, V_STATUS);

void setup()
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(10);

  // Make sure relays are off when starting up
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
}

void presentation()  {
  sendSketchInfo("Relay+button", "1.0");
  present(CHILD_ID, S_BINARY);
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msg.set(state?RELAY_ON:RELAY_OFF));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_STATUS);
    wait(2000, C_SET, V_STATUS);
  }
  if (debouncer.update()) {
    if (debouncer.read()==LOW) {
      state = !state;
      // Send new state and request ack back
      send(msg.set(state?RELAY_ON:RELAY_OFF), true);
    }
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
  }

  if (message.type == V_STATUS) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Change relay state
    state = (bool)message.getInt();
    digitalWrite(RELAY_PIN, state?RELAY_ON:RELAY_OFF);
    send(msg.set(state?RELAY_ON:RELAY_OFF));
  }
}
```

## SmartSleep

Sending a heartbeat, `I_HEARTBEAT_RESPONSE`, from the MySensors device to Home Assistant, using MySensors version 2.0 - 2.1, activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands. See the MySensors library API for information on how to send heartbeats and sleep the device.

In MySensors version 2.2 the serial API changed from using `I_HEARTBEAT_RESPONSE` to signal SmartSleep, to using `I_PRE_SLEEP_NOTIFICATION` and `I_POST_SLEEP_NOTIFICATION`. Home Assistant has been upgraded to support the new message types and will activate SmartSleep when receiving a message of type `I_PRE_SLEEP_NOTIFICATION`, if using MySensors version 2.2.x or higher. If Home Assistant is configured to use MySensors version 2.0 - 2.1 the old SmartSleep behavior is retained.

## Message validation

Messages sent to or from Home Assistant from or to a MySensors device will be validated according to the MySensors [serial API](https://www.mysensors.org/download/serial_api_20). If a message doesn't pass validation, it will be dropped and not be passed forward either to or from Home Assistant. Make sure you follow the serial API for your version of MySensors when writing your Arduino sketch.

The log should warn you of messages that failed validation or if a child value is missing that is required for a certain child type. Home Assistant will log failed validations of child values at warning level if e.g.,  one required value type for a platform has been received, but other required value types are missing.

Message validation was introduced in version 0.52 of Home Assistant.

## Debug logging

If you experience dropped messages or that a device is not added to Home Assistant, please turn on debug logging for the `mysensors` integration and the `mysensors` package. This will help you see what is going on. Make sure you use these logging settings to collect a log sample if you report an issue about the `mysensors` integration in our GitHub issue tracker.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.mysensors: debug
    mysensors: debug
```

Visit the [library API][MySensors library api] of MySensors for more information.

[MySensors library API]: https://www.mysensors.org/download

## Binary Sensor

The following binary sensor types are supported:

#### MySensors version 1.4 and higher

| S_TYPE   | V_TYPE    |
| -------- | --------- |
| S_DOOR   | V_TRIPPED |
| S_MOTION | V_TRIPPED |
| S_SMOKE  | V_TRIPPED |

#### MySensors version 1.5 and higher

| S_TYPE       | V_TYPE    |
| ------------ | --------- |
| S_SPRINKLER  | V_TRIPPED |
| S_WATER_LEAK | V_TRIPPED |
| S_SOUND      | V_TRIPPED |
| S_VIBRATION  | V_TRIPPED |
| S_MOISTURE   | V_TRIPPED |

#### Example sketch

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

## Cover

The following actuator types are supported:

#### MySensors version 1.4

| S_TYPE  | V_TYPE                                      |
| ------- | ------------------------------------------- |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_DIMMER or V_LIGHT] |

#### MySensors version 1.5 and higher

| S_TYPE  | V_TYPE                                           |
| ------- | ------------------------------------------------ |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_PERCENTAGE or V_STATUS] |

All V_TYPES above are required. Use V_PERCENTAGE (or V_DIMMER) if you know the exact position of the cover in percent, use V_STATUS (or V_LIGHT) if you don't.

#### Example sketch

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

#### Sketch example with position measurement based on motor running time

This sketch is ideally for star topology wiring. You can run up to 12 covers with a single Arduino Mega board and some relays. All you need to set is one line of parameters for one Cover. However, you can also use it for a single cover based on an Arduino Nano or even an ESP8266 board.

[Check out the code on GitHub.](https://github.com/gryzli133/RollerShutterSplit)
