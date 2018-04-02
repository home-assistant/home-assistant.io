---
layout: page
title: "MySensors"
description: "Instructions on how to integrate MySensors sensors into Home Assistant."
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
```

{% configuration %}
  gateways:
    description: A list of gateways to set up.
    required: true
    type: map
    keys:
      device:
        description: The path to the serial gateway where it is connected to your Home Assistant host, or the address of the TCP Ethernet gateway, or `mqtt` to setup the MQTT gateway. Resolving DNS addresses is theoretically supported but not tested.
        required: true
        type: string
      baud_rate:
        description: Specifies the baud rate of the connected serial gateway.
        required: false
        type: int
        default: 115200
      persistence_file:
        description: The path to a file to save sensor information. The file extension determines the file type. Currently supported file types are 'pickle' and 'json'.
        required: false
        type: string
        default: path/to/config/directory/mysensors.pickle
      tcp_port:
        description: Specifies the port of the connected TCP Ethernet gateway.
        required: false
        type: int
        default: 5003
      topic_in_prefix:
        description: Set the prefix of the MQTT topic for messages coming from the MySensors gateway in to Home Assistant.
        required: false
        type: string
        default: ''
      topic_out_prefix:
        description: Set the prefix of the MQTT topic for messages going from Home Assistant out to the MySensors gateway.
        required: false
        type: string
        default: ''
      nodes:
        description: A mapping of node ids to node settings, eg custom name.
        required: false
        type: map
        keys:
          name:
            description: The name the node will be renamed to. This nodename becomes part of the entity_id. Default entity_id is [sketch_name]\_[node_id]\_[child_id] and when this name is set, the entity_id becomes [name]\_[child_id].
            required: true
            type: string
  persistence:
    description: Enable or disable local persistence of sensor information. If this is disabled, then each sensor will need to send presentation messages after Home Assistant starts.
    required: false
    type: int
    default: true
  version:
    description: Specifies the MySensors protocol version to use. Supports 1.4, 1.5 and 2.0.
    required: false
    type: string
    default: '1.4'
  optimistic:
    description: Enable or disable optimistic mode for actuators (switch/light). Set this to true if no state feedback from actuators is possible. Home Assistant will assume that the command succeeded and change state.
    required: false
    type: int
    default: false
  retain:
    description: Enable or disable retain flag for published messages from Home Assistant when using the MQTT gateway.
    required: false
    type: int
    default: true
{% endconfiguration %}

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

### {% linkable_title Extended configuration example %}

```yaml
# Example configuration.yaml entry
mysensors:
  gateways:
    - device: '/dev/ttyUSB0'
      persistence_file: 'path/mysensors.json'
      baud_rate: 38400
      nodes:
        1:
          name: 'kitchen'
        3:
          name: 'living_room'
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
  optimistic: false
  persistence: true
  retain: true
  version: '2.0'
```

### {% linkable_title Presentation %}

Present a MySensors sensor or actuator, by following these steps:

1. Connect the serial gateway to your computer or the Ethernet or MQTT gateway to your network.
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

### {% linkable_title SmartSleep %}

Sending a heartbeat, `I_HEARTBEAT_RESPONSE`, from the MySensors device to Home Assistant, using MySensors version 2.0 - 2.1, activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands. See the MySensors library API for information on how to send heartbeats and sleep the device.

In MySensors version 2.2 the serial API changed from using `I_HEARTBEAT_RESPONSE` to signal SmartSleep, to using `I_PRE_SLEEP_NOTIFICATION` and `I_POST_SLEEP_NOTIFICATION`. Home Assistant has been upgraded to support the new message types and will activate SmartSleep when receiving a message of type `I_PRE_SLEEP_NOTIFICATION`, if using MySensors version 2.2.x or higher. If Home Assistant is configured to use MySensors version 2.0 - 2.1 the old SmartSleep behavior is retained.

### {% linkable_title Message validation %}

Messages sent to or from Home Assistant from or to a MySensors device will be validated according to the MySensors [serial API](https://www.mysensors.org/download/serial_api_20). If a message doesn't pass validation, it will be dropped and not be passed forward either to or from Home Assistant. Make sure you follow the serial API for your version of MySensors when writing your Arduino sketch.

If you experience dropped messages or that a device is not added to Home Assistant, please turn on debug logging for the `mysensors` component and the `mysensors` package.
```yaml
logger:
  default: info
  logs:
    homeassistant.components.mysensors: debug
    mysensors: debug
```
The log should inform you of messages that failed validation or if a child value is missing that is required for a certain child type. Note that the log will log all possible combinations of platforms for a child type that failed validation. It is normal to see some platforms fail validation if the child type supports multiple platforms and your sketch doesn't send all corresponding value types. Eg. the S_BARO child type supports both V_PRESSURE and V_FORECAST value types. If you only send a V_PRESSURE value, an S_BARO entity with V_PRESSURE value will be set up for the sensor platform. But the log will inform of a sensor platform that failed validation due to missing V_FORECAST value type for the S_BARO child. Home Assistant will log failed validations of child values at warning level if one required value type for a platform has been received, but other required value types are missing. Most failed validations are logged at debug level.

Message validation was introduced in version 0.52 of Home Assistant.


Visit the [library api][MySensors library api] of MySensors for more information.

[MySensors library api]: http://www.mysensors.org/download
