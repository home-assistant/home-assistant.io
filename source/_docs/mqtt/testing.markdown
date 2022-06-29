---
title: "MQTT Testing"
description: "Instructions on how to test your MQTT setup."
logo: mqtt.png
---

The `mosquitto` broker package ships commandline tools (often as `*-clients` package) to send and receive MQTT messages. For sending test messages to a broker running on `localhost` check the example below:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

Another way to send MQTT messages manually is to use the "MQTT" integration in the frontend. Choose "Settings" on the left menu, click "Devices & Services", and choose "Configure" in the "Mosquitto broker" tile. Enter something similar to the example below into the "topic" field under "Publish a packet" and press "PUBLISH" .

```bash
   home-assistant/switch/1/power
```

and in the Payload field

```bash
   ON
```

In the "Listen to a topic" field, type `#` to see everything, or "home-assistant/switch/#" to just follow a published topic, then press "START LISTENING". The messages should appear similar to the text below:

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
