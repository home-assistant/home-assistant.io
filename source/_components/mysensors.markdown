---
layout: page
title: "MySensors"
description: "Instructions how to integrate MySensors sensors into Home Assistant."
date: 2016-10-01 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Hub
featured: true
ha_iot_class: "Local Push"
---

The [MySensors](https://www.mysensors.org) project combines Arduino boards with NRF24L01 radio boards to build sensor networks. The component will automatically add all available devices to Home Assistant, after [presentation](#presentation) is done.

### {% linkable_title Configuration %}

Integrate your Serial, Ethernet or MQTT Client MySensors Gateway by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mysensors:
  gateways:
    - device: '/dev/ttyUSB0'
      persistence_file: 'path/mysensors.json'
      baud_rate: 38400
    - device: '/dev/ttyACM0'
      persistence_file: 'path/mysensors2.json'
      baud_rate: 115200
    - device: '192.168.1.18'
      persistence_file: 'path/mysensors3.json'
      tcp_port: 5003
    - device: mqtt
      persistence_file: 'path/mysensors4.json'
      topic_in_prefix: 'mygateway1-out'
      topic_out_prefix: 'mygateway1-in'
  debug: true
  optimistic: false
  persistence: true
  retain: true
  version: 2.0
```

Configuration variables:

- **device** (*Required*): The path to the serial gateway where it is connected to your Home Assistant host, or the address of the tcp ethernet gateway, or `mqtt` to setup the MQTT gateway. Resolving DNS addresses is theoretically supported but not tested.
- **baud_rate** (*Optional*): Specifies the baud rate of the connected serial gateway. Default is 115200.
- **tcp_port** (*Optional*): Specifies the port of the connected tcp ethernet gateway. Default is 5003.
- **topic_in_prefix** (*Optional*): Set the prefix of the MQTT topic for messages coming from the MySensors gateway in to Home Assistant. Default is an empty string.
- **topic_out_prefix** (*Optional*): Set the prefix of the MQTT topic for messages going from Home Assistant out to the MySensors gateway. Default is an empty string.
- **debug** (*Optional*): Enable or disable verbose debug logging. Default is false.
- **persistence** (*Optional*): Enable or disable local persistence of sensor information. If this is disabled, then each sensor will need to send presentation messages after Home Assistant starts. Default is true.
- **persistence_file** (*Optional*): The path to a file to save sensor information. The file extension determines the file type. Currently supported file types are 'pickle' and 'json'.
- **version** (*Optional*): Specifies the MySensors protocol version to use. Supports 1.4, 1.5 and 2.0. Default is 1.4.
- **optimistic** (*Optional*): Enable or disable optimistic mode for actuators (switch/light). Default is false. Set this to true if no state feedback from actuators is possible. Home Assistant will assume that the command succeeded and change state.
- **retain** (*Optional*): Enable or disable retain flag for published messages from Home Assistant when using the MQTT gateway. Default is true.

<p class='note'>
Not all features of MySensors 2.0 are yet supported by Home Assistant. As more features are added, they will be described here in the documentation. Go to the MySensors platform pages under "related components" to see what message types are currently supported.
</p>

If you are using an original Arduino as a serial gateway, the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
$ ls /dev/ttyACM*
```

If using the MQTT gateway, you also need to have the [MQTT component](/components/mqtt/) configured in Home Assistant. See below for a minimum MQTT configuration:

```yaml
mqtt:
  client_id: home-assistant-1
```

<p class='note'>
The MQTT gateway requires MySensors version 2.0 and only the MQTT client gateway is supported.
</p>

### {% linkable_title Presentation %}

Present a MySensors sensor or actuator, by following these steps:

1. Connect the serial gateway to your computer or the ethernet or MQTT gateway to your network.
2. Configure the MySensors component in `configuration.yaml`.
3. Start hass.
4. Write and upload your MySensors sketch to the sensor. Make sure you:
    - Send sketch name.
    - Present the sensor's S_TYPE.
    - Send at least one initial value per V_TYPE. In version 2.0 of MySensors this has to be done in the loop function. See below for an example in 2.0 of how to make sure the initial value has been received by the controller.
5. Start the sensor.

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/relay
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

### {% linkable_title Heartbeats %}

Sending a heartbeat from the MySensors device to Home Assistant activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands.  See the MySensors library API for information on how to send heartbeats and sleep device.  


Visit the [library api] of MySensors for more information.

[MySensors library api]: http://www.mysensors.org/download
