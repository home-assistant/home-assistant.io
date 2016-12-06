---
layout: page
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
ha_release: pre 0.7
ha_iot_class: depends
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
  birth_message:
    topic: 'hass/status'
    payload: 'online'
    qos: 1
    retain: true
  will_message:
    topic: 'hass/status'
    payload: 'offline'
    qos: 1
    retain: true
```

Configuration variables:

- **broker** (*Required*): The IP address or hostname of your MQTT broker, e.g. 192.168.1.32.
- **port** (*Optional*): The network port to connect to. Default is 1883.
- **client_id** (*Optional*): The client ID that Home Assistant will use. Has to be unique on the server. Default is a randomly generated one.
- **keepalive** (*Optional*): The time in seconds between sending keep alive messages for this client. Default is 60.
- **username** (*Optional*): The username to use with your MQTT broker.
- **password** (*Optional*): The corresponding password for the username to use with your MQTT broker.
- **certificate** (*Optional*): The certificate authority certificate file that is to be treated as trusted by this client. This file should contain the root certificate of the certificate authority that signed your broker's certificate, but may contain multiple certificates. Example: `/home/user/identrust-root.pem`
- **client_key** (*Optional*): Client key (example: `/home/user/owntracks/cookie.key`)
- **client_cert** (*Optional*): Client certificate (example: `/home/user/owntracks/cookie.crt`)
- **protocol** (*Optional*): Protocol to use: 3.1 or 3.1.1. By default it connects with 3.1.1 and falls back to 3.1 if server does not support 3.1.
- **birth_message** (*Optional*):
  - **topic** (*Required*): The MQTT topic to publish the message.
  - **payload** (*Required*): The message content.
  - **qos** (*Optional*): The maximum QoS level of the topic. Default is 0.
  - **retain** (*Optional*): If the published message should have the retain flag on or not. Defaults to `True`.
- **will_message** (*Optional*):
  - **topic** (*Required*): The MQTT topic to publish the message.
  - **payload** (*Required*): The message content.
  - **qos** (*Optional*): The maximum QoS level of the topic. Default is 0.
  - **retain** (*Optional*): If the published message should have the retain flag on or not. Defaults to `True`.

## {% linkable_title Picking a broker %}

The MQTT component needs you to run an MQTT broker for Home Assistant to connect to. There are four options, each with various degrees of ease of setup and privacy.

### {% linkable_title Embedded broker %}

Home Assistant contains an embedded MQTT broker. If no broker configuration is given, the [HBMQTT broker](https://pypi.python.org/pypi/hbmqtt) is started and Home Assistant connects to it. Embedded broker default configuration:

| Setting | Value |
| ------- | ----- |
| Host | localhost
| Port | 1883
| Protocol | 3.1.1
| User | homeassistant
| Password | Your API [password](/components/http/)
| Websocket port | 8080

```yaml
# Example configuration.yaml entry
mqtt:
```

<p class='note'>
This broker does not currently work with OwnTracks because of a protocol version issue.
</p>

If you want to customize the settings of the embedded broker, use `embedded:` and the values shown in the [HBMQTT Broker configuration](http://hbmqtt.readthedocs.org/en/latest/references/broker.html#broker-configuration). This will replace the default configuration.

```yaml
# Example configuration.yaml entry
mqtt:
  embedded:
    # Your HBMQTT config here. Example at:
    # http://hbmqtt.readthedocs.org/en/latest/references/broker.html#broker-configuration
```

### {% linkable_title Run your own %}

This is the most private option but requires a bit more work. There are two free and open-source brokers to pick from: [Mosquitto](http://mosquitto.org/) and [Mosca](http://www.mosca.io/).

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

### {% linkable_title Public broker %}

The Mosquitto project runs a [public broker](http://test.mosquitto.org). This is the easiest to set up, but there is no privacy as all messages are public. Use this only for testing purposes and not for real tracking of your devices.

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

### {% linkable_title CloudMQTT %}

[CloudMQTT](https://www.cloudmqtt.com) is a hosted private MQTT instance that is free for up to 10 connected devices. This is enough to get started with for example [OwnTracks](/components/device_tracker.owntracks/) and give you a taste of what is possible.

<p class='note'>
Home Assistant is not affiliated with CloudMQTT nor will receive any kickbacks.
</p>

 1. [Create an account](https://customer.cloudmqtt.com/login) (no payment details needed)
 2. [Create a new CloudMQTT instance](https://customer.cloudmqtt.com/subscription/create)
    (Cute Cat is the free plan)
 3. From the control panel, click on the _Details_ button.
 4. Create unique users for Home Assistant and each phone to connect<br>(CloudMQTT does not allow two
    connections from the same user)
      1. Under manage users, fill in username, password and click add
      2. Under ACLs, select user, topic `#`, check 'read access' and 'write access'
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

 - [MQTT Alarm control panel](/components/alarm_control_panel.mqtt/)
 - [MQTT Binary sensor](/components/binary_sensor.mqtt/)
 - [MQTT Sensor](/components/sensor.mqtt/)
 - [MQTT Switch](/components/switch.mqtt/)
 - [MQTT Light](/components/light.mqtt/)
 - [MQTT Lock](/components/lock.mqtt/)
 - [MQTT Device Tracker](/components/device_tracker.mqtt/)
 - [OwnTracks Device Tracker](/components/device_tracker.owntracks/)
 - [MQTT automation rule](/getting-started/automation-trigger/#mqtt-trigger)

 - Integrating it into own component. See the [MQTT example component](/cookbook/python_component_mqtt_basic/) how to do this.

### {% linkable_title Publish service %}

The MQTT component will register the service `publish` which allows publishing messages to MQTT topics. There are two ways of specifying your payload. You can either use `payload` to hard-code a payload or use `payload_template` to specify a [template](/topics/templating/) that will be rendered to generate the payload.

```json
{
  "topic": "home-assistant/light/1/command",
  "payload": "on"
}
```

```json
{
  "topic": "home-assistant/light/1/state",
  "payload_template": "{% raw %}{{ states('device_tracker.paulus') }}{% endraw %}"
}
```

### {% linkable_title Logging %}

The [logger](/components/logger/) component allow the logging of received MQTT messages.

```yaml
# Example configuration.yaml entry
logger:
  default: warning
  logs:
    homeassistant.components.device_tracker.mqtt: debug
```

## {% linkable_title Testing your setup %}

The `mosquitto` broker package ships commandline tools to send and receive MQTT messages. As an alternative have a look at [hbmqtt_pub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_pub.html) and [hbmqtt_sub](http://hbmqtt.readthedocs.org/en/latest/references/hbmqtt_sub.html) which are provided by HBMQTT. For sending test messages to a broker running on localhost check the example below:

```bash
$ mosquitto_pub -h 127.0.0.1 -t home-assistant/switch/1/on -m "Switch is ON"
```

If you are using the embedded MQTT broker, the command looks a little different because you need to add the MQTT protocol version.

```bash
$ mosquitto_pub -V mqttv311 -t "hello" -m world
```

or if you are using a API password:

```bash
$ mosquitto_pub -V mqttv311 -u homeassistant -P <your api password> -t "hello" -m world
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

For the embedded MQTT broker the command looks like:

```bash
$ mosquitto_sub -v -V mqttv311 -t "#"
```

Add the username `homeassistant` and your API password if needed.

## {% linkable_title Processing JSON %}

The MQTT switch and sensor platforms support processing JSON over MQTT messages and parsing them using JSONPath. JSONPath allows you to specify where in the JSON the value resides that you want to use. The following examples will always return the value `100`.

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
