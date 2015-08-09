---
layout: page
title: "MQTT"
description: "Instructions how to setup MQTT within Home Assistant."
date: 2015-08-07 18:00
sidebar: false
comments: false
sharing: true
footer: true
---
MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport. 

The MQTT component needs an MQTT broker like [Mosquitto](http://mosquitto.org/) or [Mosca](http://www.mosca.io/). The Eclipse Foundation is running a public MQTT broker at [iot.eclipse.org](iot.eclipse.org) or the Mosquitto Project under [test.mosquitto.org](http://test.mosquitto.org). If you prefer to use a public, keep in mind to adjust the topic and that your messages may be publicly accessible.

To integrate MQTT into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
```
There are more optional entries available if your broker is using different settings or you have a special need.

```yaml
# Example configuration.yaml entry
mqtt:
  broker: 127.0.0.1
  port: 1883
  topic: home-assistant
  keepalive: 60
  qos: 0
  retain: 0
```
<img src='/images/supported_brands/preferences-system-sharing.png' class='brand pull-right' />
For debugging purposes `mosquitto` is shipping commandline tools to send and recieve MQTT messages. For sending test messages to a broker running on localhost:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

Another way to send MQTT messages by hand is to use the "Developer Tools" in the Frontend. Choose "Call Service" and then `mqtt/mqtt_send` under "Available Services". Enter something similar to the example below into the "Service Data" field.

```json
{
   "subtopic":"switch/1/on",
   "payload":"Switch is ON"
}
```

The message should appear on the bus:

```bash
... [homeassistant] Bus:Handling <Event MQTT_MESSAGE_RECEIVED[L]: topic=home-assistant/switch/1/on, qos=0, payload=Switch is ON>
```

For reading all messages sent on the topic `home-assistant` to a broker running on localhost:

```bash
mosquitto_sub -h 127.0.0.1 -v -t "home-assistant/#"
```

<p class='note'>
The MQTT component has no TLS support at the moment. This means that only plain-text communication is possible.
</p>
