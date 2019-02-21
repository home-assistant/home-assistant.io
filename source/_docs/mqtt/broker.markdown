---
layout: page
title: "MQTT Brokers"
description: "Instructions on how to setup MQTT brokers for Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

The MQTT component needs you to run an MQTT broker for Home Assistant to connect to. There are four options, each with various degrees of ease of setup and privacy.

### {% linkable_title Embedded broker %}

Home Assistant contains an embedded MQTT broker called [HBMQTT](https://pypi.python.org/pypi/hbmqtt). If you don't have an MQTT broker, you can configure this one to be used. If configured, Home Assistant will automatically connect to it.

| Setting        | Value |
| -------------- | ----- |
| Host           | localhost |
| Port           | 1883 |
| Protocol       | 3.1.1 |
| User           | homeassistant |
| Password       | _password set under mqtt settings_ |
| Websocket port | 8080 |

```yaml
# Example configuration.yaml entry
mqtt:
  password: hello
```

<p class='note'>
Before release 0.76, the embedded broker would use your API password as a password to the MQTT user. This is no longer the case.
</p>

<p class='note warning'>
There is [an issue](https://github.com/beerfactory/hbmqtt/issues/62) with the HBMQTT broker and the WebSocket connection that is causing a memory leak. If you experience this issue, consider using another broker like Mosquitto.
</p>

### {% linkable_title Owntracks%}

To use Owntracks with the internal broker a small configuration change must be made in order for the app to use MQTT protocol 3.1.1 (Protocol Level 4).

In the Owntracks preferences (Android: v1.2.3+, iOS: v9.5.1+) open **Configuration Management**; Find the value named `mqttProtocolLevel` and set the value to `4`. The application will now use MQTT 3.1.1 to connect, which is compatible with the embedded broker.

### {% linkable_title Settings %}

If you want to customize the settings of the embedded broker, use `embedded:` and the values shown in the [HBMQTT Broker configuration](http://hbmqtt.readthedocs.org/en/latest/references/broker.html#broker-configuration). This will replace the default configuration.

```yaml
# Example configuration.yaml entry
mqtt:
  embedded:
    # Your HBMQTT config here. Example at:
    # http://hbmqtt.readthedocs.org/en/latest/references/broker.html#broker-configuration
```

### {% linkable_title Run your own %}

Along with the embedded broker this is the most private option, but it requires a bit more work. There are multiple free and open-source brokers to pick from: e.g., [Mosquitto](http://mosquitto.org/), [EMQ](http://emqtt.io/), or [Mosca](http://www.mosca.io/).

```yaml
# Example configuration.yaml entry
mqtt:
  broker: 192.168.1.100
```

{% configuration %}
broker:
  required: false
  description: The IP address or hostname of your MQTT broker, e.g., 192.168.1.32.
  type: string
port:
  required: false
  description: The network port to connect to. Default is 1883.
  type: integer
client_id:
  required: false
  description: The client ID that Home Assistant will use. Has to be unique on the server. Default is a randomly generated one.
  type: string
keepalive:
  required: false
  description: The time in seconds between sending keep alive messages for this client. Default is 60.
  type: integer
username:
  required: false
  description: The username to use with your MQTT broker.
  type: string
password:
  required: false
  description: The corresponding password for the username to use with your MQTT broker.
  type: string
protocol:
  required: false
  description: "Protocol to use: 3.1 or 3.1.1. By default it connects with 3.1.1 and falls back to 3.1 if server does not support 3.1.1."
  type: string
certificate:
  required: false
  description: Path to the certificate file, e.g., `/home/user/.homeassistant/server.crt`.
  type: string
tls_insecure:
  required: false
  description: Set the verification of the server hostname in the server certificate.
  type: boolean
tls_version:
  required: false
  description: "TLS/SSL protocol version to use. Available options are: `'auto'`, `'1.0'`, `'1.1'`, `'1.2'`. Make sure to put quotes around the value. Defaults to `'auto'`."
  type: string
{% endconfiguration %}

<p class='note warning'>
There is an issue with the Mosquitto package included in Ubuntu 14.04 LTS. Specify `protocol: 3.1` in your MQTT configuration to work around this issue.

If you get this error `AttributeError: module 'ssl' has no attribute 'PROTOCOL_TLS'` then you need to set `tls_version: '1.2'`.
</p>

<p class='note'>
If you are running a Mosquitto instance on the same server as Home Assistant then you must ensure that the Mosquitto service starts before Home Assistant. For a Linux instance running Systemd (Raspberry Pi, Debian, Ubuntu and others) then you should edit the file `/etc/systemd/system/home-assistant@homeassistant.service` as `root` (e.g., `sudo nano /etc/systemd/system/home-assistant@homeassistant.service`) and add the Mosquitto service:
```
[Unit]
Description=Home Assistant
After=network.target mosquitto.service
```
</p>

<p class='note'>
If you are running a Mosquitto instance on a different server with proper SSL encryption using a service like Let's Encrypt you may have to set the certificate to the operating systems own `.crt` certificates file. In the instance of Ubuntu this would be `certificate: /etc/ssl/certs/ca-certificates.crt`
</p>

### {% linkable_title Public broker %}

The Mosquitto project runs a [public broker](http://test.mosquitto.org). This is the easiest to set up, but there is no privacy as all messages are public. Use this only for testing purposes and not for real tracking of your devices or controlling your home.

```yaml
mqtt:
  broker: test.mosquitto.org
  port: 1883 or 8883

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
 4. Create unique users for Home Assistant and each phone to connect<br>(CloudMQTT does not allow two connections from the same user)
      1. Under manage users, fill in username, password and click add
      2. Under ACLs, select user, topic `#`, check 'read access' and 'write access'
 5. Copy the instance info to your configuration.yaml:

```yaml
mqtt:
  broker: CLOUDMQTT_SERVER
  port: CLOUDMQTT_PORT
  username: CLOUDMQTT_USER
  password: CLOUDMQTT_PASSWORD
```

<p class='note'>
Home Assistant will automatically load the correct certificate if you connect to an encrypted channel of CloudMQTT (port range 20000-30000).
</p>
<p class='note'>
If you experience an error message like `Failed to connect due to exception: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed`, then add `certificate: auto` to your broker configuration and restart Home Assistant.
</p>

