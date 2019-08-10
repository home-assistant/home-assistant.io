---
title: "MQTT Testing"
description: "Instructions on how to test your MQTT setup."
logo: mqtt.png
---

The `mosquitto` broker package ships commandline tools (often as `*-clients` package) to send and receive MQTT messages. As an alternative have a look at [hbmqtt_pub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_pub.html) and [hbmqtt_sub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_sub.html) which are provided by HBMQTT. For sending test messages to a broker running on localhost check the example below:

```bash
$ mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

If you are using the embedded MQTT broker, the command looks a little different because you need to add the MQTT protocol version and your [broker credentials](/docs/mqtt/broker#embedded-broker).

```bash
$ mosquitto_pub -V mqttv311 -u homeassistant -P <broker password> -t "hello" -m world
```

Another way to send MQTT messages by hand is to use the "Developer Tools" in the Frontend. Choose "Call Service" and then `mqtt.publish` under "Available Services". Enter something similar to the example below into the "Service Data" field.

```json
{
   "topic":"home-assistant/switch/1/on",
   "payload":"Switch is ON"
}
```

The message should appear on the bus:

```bash
... [homeassistant] Bus:Handling <Event MQTT_MESSAGE_RECEIVED[L]: topic=home-assistant/switch/1/on, qos=0, payload=Switch is ON>
```

For reading all messages sent on the topic `home-assistant` to a broker running on localhost:

```bash
$ mosquitto_sub -h 127.0.0.1 -v -t "home-assistant/#"
```

For the embedded MQTT broker the command looks like:

```bash
$ mosquitto_sub -v -V mqttv311 -u homeassistant -P <broker password> -t "#"
```

