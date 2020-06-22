---
title: "MQTT Testing"
description: "Instructions on how to test your MQTT setup."
logo: mqtt.png
---

The `mosquitto` broker package ships commandline tools (often as `*-clients` package) to send and receive MQTT messages. As an alternative have a look at [hbmqtt_pub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_pub.html) and [hbmqtt_sub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_sub.html) which are provided by HBMQTT. For sending test messages to a broker running on localhost check the example below:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

If you are using the embedded MQTT broker, the command looks a little different because you need to add the MQTT protocol version and your [broker credentials](/docs/mqtt/broker#embedded-broker).

```bash
mosquitto_pub -V mqttv311 -u homeassistant -P <broker password> -t "hello" -m world
```

Another way to send MQTT messages by hand is to use the "Developer Tools" in the Frontend. Choose the "MQTT" tab. Enter something similar to the example below into the "Topic" field.

```bash
   home-assistant/switch/1/power
```

and in the Payload field

```bash
   ON
```

In the "Listen to a topic" field, type # to see everything, or "home-assistant/switch/#" to just follow the published topic. Press "Start Listening" and then press "Publish". The result should appear similar to the text below

```bash
Message 23 received on home-assistant/switch/1/power/stat/POWER at 12:16 PM:
ON
QoS: 0 - Retain: false
Message 22 received on home-assistant/switch/1/power/stat/RESULT at 12:16 PM:
{
    "POWER": "ON"
}
QoS: 0 - Retain: false
```

For reading all messages sent on the topic `home-assistant` to a broker running on localhost:

```bash
mosquitto_sub -h 127.0.0.1 -v -t "home-assistant/#"
```

For the embedded MQTT broker the command looks like:

```bash
mosquitto_sub -v -V mqttv311 -u homeassistant -P <broker password> -t "#"
```
