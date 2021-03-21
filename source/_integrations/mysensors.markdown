---
title: MySensors
description: Instructions on how to integrate MySensors sensors into Home Assistant.
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

## Configuration

To integrate your Serial, Ethernet (LAN) or MQTT MySensors Gateway, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integration select **MySensors**.

Configuration depends on the type of Gateway you use:

### Serial gateway

If you are using an original Arduino as a serial gateway, the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
ls /dev/ttyACM*
```

In addition to the serial device you also need to enter the baud rate.

### MQTT gateway

If you are using the MQTT gateway, enter `mqtt` instead of an IP address or serial device.
You will also need to enter topic prefixes for input and output. These need to be swapped
with the settings of the gateway. I.e. the input topic for Home Assistant needs to be the output (publish) topic of the gateway.

<div class='note'>
The MQTT gateway requires MySensors version 2.0+ and only the MQTT client gateway is supported.
</div>

### Ethernet gateway

To use an Ethernet gateway, you need to configure the IP address and port of the gateway.

### General options

A few options are available for all gateways:

- optimistic  
  If the optimistic option is selected, Home Assistant will assume any requested changes (turn on light, open cover) are applied immediately without waiting for feedback from the node.

- persistence  
  If the persistence option is selected, Home Assistant will store detected nodes in a file. This means restarting Home Assistant will not require re-discovering of all the nodes.

- versions  
  Enter the version of MySensors that you use
<div class='note'>
Not all features of MySensors 2.x are supported by Home Assistant yet. As more features are added, they will be described here in the documentation. Go to the MySensors platform pages under "related components" to see what message types are currently supported.
</div>

### Presentation

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

### SmartSleep

Sending a heartbeat, `I_HEARTBEAT_RESPONSE`, from the MySensors device to Home Assistant, using MySensors version 2.0 - 2.1, activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands. See the MySensors library API for information on how to send heartbeats and sleep the device.

In MySensors version 2.2 the serial API changed from using `I_HEARTBEAT_RESPONSE` to signal SmartSleep, to using `I_PRE_SLEEP_NOTIFICATION` and `I_POST_SLEEP_NOTIFICATION`. Home Assistant has been upgraded to support the new message types and will activate SmartSleep when receiving a message of type `I_PRE_SLEEP_NOTIFICATION`, if using MySensors version 2.2.x or higher. If Home Assistant is configured to use MySensors version 2.0 - 2.1 the old SmartSleep behavior is retained.

### Message validation

Messages sent to or from Home Assistant from or to a MySensors device will be validated according to the MySensors [serial API](https://www.mysensors.org/download/serial_api_20). If a message doesn't pass validation, it will be dropped and not be passed forward either to or from Home Assistant. Make sure you follow the serial API for your version of MySensors when writing your Arduino sketch.

The log should warn you of messages that failed validation or if a child value is missing that is required for a certain child type. Home Assistant will log failed validations of child values at warning level if e.g.,  one required value type for a platform has been received, but other required value types are missing.

Message validation was introduced in version 0.52 of Home Assistant.

### Debug logging

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
