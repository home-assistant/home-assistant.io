---
layout: component
title: "MQTT"
description: "Instructions how to setup MQTT within Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Hub
featured: true
---

MQTT (aka MQ Telemetry Transport) is a machine-to-machine or "Internet of Things" connectivity protocol on top of TCP/IP. It allows extremely lightweight publish/subscribe messaging transport.

To integrate MQTT into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
  port: 1883
  client_id: home-assistant-1
  keepalive: 60
  username: USERNAME
  password: PASSWORD
  certificate: /home/paulus/dev/addtrustexternalcaroot.crt
  protocol: 3.1
```

Configuration variables:

- **broker** (*Required*): The IP address of your MQTT broker, e.g. 192.168.1.32.
- **port** (*Optional*): The network port to connect to. Default is 1883.
- **client_id** (*Optional*): Client ID that Home Assistant will use. Has to be unique on the server. Default is a random generated one.
- **keepalive** (*Optional*): The keep alive in seconds for this client. Default is 60.
- **username** (*Optional*): The username to use with your MQTT broker.
- **password** (*Optional*): The corresponding password for the username to use with your MQTT broker.
- **certificate** (*Optional*): Certificate to use to encrypt communication with the broker.
- **protocol** (*Optional*): Protocol to use: 3.1 or 3.1.1. By default it connects with 3.1.1 and falls back to 3.1 if server does not support 3.1.

## {% linkable_title Picking a broker %}

The MQTT component needs you to run an MQTT broker for Home Assistant to connect to. There are three options, each with various degrees of ease of setup and privacy.

#### {% linkable_title Run your own %}

Most private option but requires a bit more work. There are two free and open-source brokers to pick from: [Mosquitto](http://mosquitto.org/) and [Mosca](http://www.mosca.io/).

```yaml
# Example configuration.yaml entry
mqtt:
  broker: 192.168.1.100
  port: 1883
  client_id: home-assistant-1
  keepalive: 60
  username: USERNAME
  password: PASSWORD
```

<p class='note warning'>
There is an issue with the Mosquitto package included in Ubuntu 14.04 LTS. Specify `protocol: 3.1` in your MQTT configuration to work around this issue.
</p>

#### {% linkable_title Public MQTT %}

The Mosquitto project runs a [public broker](http://test.mosquitto.org). Easiest to setup but there is 0 privacy as all messages are public. Use this only for testing purposes and not for real tracking of your devices.

```yaml
mqtt:
  broker: test.mosquitto.org
  port: 1883

  # Optional, replace port 1883 with following if you want encryption
  # (doesn't really matter because broker is public)
  port: 8883
  # Download certificate from http://test.mosquitto.org/ssl/mosquitto.org.crt
  certificate: /home/paulus/downloads/mosquitto.org.crt
```

#### {% linkable_title CloudMQTT %}

[CloudMQTT](https://www.cloudmqtt.com) is a hosted private MQTT instance that is free up to 10 connected devices. This is enough to get started with for example [OwnTracks](/components/device_tracker.owntracks/) and give you a taste of what is possible.

<p class='note'>
Home Assistant is not affiliated with CloudMQTT nor will receive any kickbacks.
</p>

 1. [Create an account](https://customer.cloudmqtt.com/login) (no payment details needed)
 2. [Create a new CloudMQTT instance](https://customer.cloudmqtt.com/subscription/create)
    (Cute Cat is the free plan)
 3. From the control panel, click on the _Details_ button.
 4. Create unique users for Home Assistant and each phone to connect<br>(CloudMQTT does not allow two
    connections from the same user)
      a. Under manage users, fill in username, password and click add
      b. Under ACLs, select user, topic `#`, check 'read access' and 'write access'
 5. Copy the instance info to your configuration.yaml:

```yaml
mqtt:
  broker: <Server>
  port: <SSL Port>
  username: <User>
  password: <Password>
```

<p class='note'>
Home Assistant will automatically load the correct certificate if you connect to an encrypted channel of CloudMQTT (port range 20 000 - 30 000).
</p>

## {% linkable_title Building on top of MQTT %}

 - [MQTT Sensor](/components/sensor.mqtt/)
 - [MQTT Switch](/components/switch.mqtt/)
 - [MQTT Device Tracker](/components/device_tracker.mqtt/)
 - [OwnTracks Device Tracker](/components/device_tracker.owntracks/)
 - [MQTT automation rule](/components/automation/#mqtt-based-automation)
 - [MQTT alarm](/components/alarm_control_panel.mqtt/)
 - Integrating it into own component. See the [MQTT example component](https://github.com/balloob/home-assistant/blob/dev/config/custom_components/mqtt_example.py) how to do this.

## {% linkable_title Testing your setup %}

For debugging purposes `mosquitto` is shipping commandline tools to send and recieve MQTT messages. For sending test messages to a broker running on localhost:

```bash
$ mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

Another way to send MQTT messages by hand is to use the "Developer Tools" in the Frontend. Choose "Call Service" and then `mqtt/mqtt_send` under "Available Services". Enter something similar to the example below into the "Service Data" field.

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

## {% linkable_title Processing JSON %}

The MQTT switch and sensor platforms support processing JSON over MQTT messages and parse them using JSONPath. JSONPath allows you to specify where in the JSON the value resides that you want to use. The following examples will always return the value `100`.

| JSONPath query | JSON |
| -------------- | ---- |
| `somekey` | `{ 'somekey': 100 }`
| `somekey[0]` | `{ 'somekey': [100] }`
| `somekey[0].value` | `{ 'somekey': [ { value: 100 } ] }`

To use this, add the following key to your `configuration.yaml`:

```yaml
switch:
  platform: mqtt
  state_format: 'json:somekey[0].value'
```

More information about the full JSONPath syntax can be found [here][JSONPath syntax].

[JSONPath syntax]: https://github.com/kennknowles/python-jsonpath-rw#jsonpath-syntax