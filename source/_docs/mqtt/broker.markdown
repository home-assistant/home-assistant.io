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
There is [an issue](https://github.com/rabbitmq/rabbitmq-server/issues/154) with the RabbitMQ MQTT Plugin which breaks MQTT message retention.

</div>

## Connect to a public broker

The Mosquitto project runs a [public broker](https://test.mosquitto.org). This is the easiest to set up, but there is no privacy as all messages are public. Use this only for testing purposes and not for real tracking of your devices or controlling your home. To use the public mosquitto broker, configure the MQTT integration to connect to broker `test.mosquitto.org` on port 1183 or 8883.

<div class='note'>

If you experience an error message like `Failed to connect due to exception: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed`, then add `certificate: auto` to your broker configuration and restart Home Assistant.

</div>

## Broker configuration

MQTT broker settings are configured when the MQTT integration is first setup, and can be changed if needed. To change the settings, click on "Configure" in the integration page in the UI, then "Re-configure MQTT".

## Advanced broker configuration

Some broker configuration options can't be set via the user interface, but require changes of your `configuration.yaml` file.
Additional SSL certificate options are documented [here](/docs/mqtt/certificate/).

{% configuration %}
client_id:
  required: false
  description: The client ID that Home Assistant will use. Has to be unique on the server. Default is a randomly generated one.
  type: string
keepalive:
  required: false
  description: The time in seconds between sending keep alive messages for this client. Default is 60.
  type: integer
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

