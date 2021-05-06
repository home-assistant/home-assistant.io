---
title: "MQTT Broker"
description: "Instructions on how to setup a MQTT broker for Home Assistant."
logo: mqtt.png
---

The MQTT integration needs you to run an MQTT broker for Home Assistant to connect to.

### Run your own

The most private option is running your own MQTT broker.

The recommended setup method is to use the [Mosquitto MQTT broker add-on](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/DOCS.md).

</div>

<div class='note warning'>

Neither ActiveMQ MQTT broker nor the RabbitMQ MQTT Plugin are supported, use a known working broker like Mosquitto instead.
There are [at least two](https://issues.apache.org/jira/browse/AMQ-6360) [issues](https://issues.apache.org/jira/browse/AMQ-6575) with the ActiveMQ MQTT broker which break MQTT message retention.
There is [an issue](https://github.com/rabbitmq/rabbitmq-mqtt/issues/154) with the RabbitMQ MQTT Plugin which breaks MQTT message retention.

</div>

## Configuration

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
  description: Path to the certificate file, e.g., `/ssl/server.crt`.
  type: string
tls_insecure:
  required: false
  description: Set the verification of the server hostname in the server certificate.
  type: boolean
  default: false
{% endconfiguration %}

<div class='note'>

If you are running a Mosquitto instance on a different server with proper SSL encryption using a service like Let's Encrypt you may have to set the certificate to the operating systems own `.crt` certificates file. In the instance of Ubuntu this would be `certificate: /etc/ssl/certs/ca-certificates.crt`

</div>

### Public broker

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

### HiveMQ Cloud

HiveMQ Cloud is a fully managed MQTT broker that provides you a private broker. A free plan for up to 100 devices is available.

Home Assistant is not affiliated with HiveMQ Cloud nor will receive any kickbacks.

1. [Create an account](http://console.hivemq.cloud) <links to signup>
2. With your signup you will receive automatically the free plan that allows you to connect up to 100 devices
3. Create MQTT credentials in the Access Management tab of your Cluster Detail View you can use to connect Home Assistant and any MQTT device.
![image2](../../images/mqtt/image2.png)
4. Download the trusted certificate from let’s encrypt to ensure secure communication between Home Assistant and your HiveMQ Cloud cluster. <link: https://letsencrypt.org/certs/trustid-x3-root.pem >
5. Copy the broker info to your configuration.yaml. You can find the Broker Hostname in the Cluster Overview. Use the credentials you just created as username and password and the path from the downloaded certificate: 
![image3](../../images/mqtt/image3.png)

```yaml
mqtt:
  broker: HIVEMQ_BROKER_HOSTNAME
  port: 8883
  username: MQTT_USERNAME
  password: MQTT_PASSWORD
  certificate: PATH_TO_STORED_CERTIFICATE
```
6. Your HiveMQ Cloud will appear as MQTT Integration in Home Assistant
![image1](../../images/mqtt/image1.png)

### CloudMQTT

[CloudMQTT](https://www.cloudmqtt.com) is a hosted private MQTT instance. Plans start at 5$ per month.

<div class='note'>
Home Assistant is not affiliated with CloudMQTT nor will receive any kickbacks.
</div>

 1. [Create an account](https://customer.cloudmqtt.com/login)
 2. [Create a new CloudMQTT instance](https://customer.cloudmqtt.com/subscription/create)
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

<div class='note'>
Home Assistant will automatically load the correct certificate if you connect to an encrypted channel of CloudMQTT (port range 20000-30000).
</div>

<div class='note'>

If you experience an error message like `Failed to connect due to exception: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed`, then add `certificate: auto` to your broker configuration and restart Home Assistant.

</div>
