---
title: Bosch Smart Home Controller Integration
description: Instructions on how to integrate Bosch Smart Home Controller into Home Assistant.
ha_category:
  - Binary Sensor
ha_release: 0.109
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@tschamm'
  - '@cabrust'
ha_domain: boschshc
---

The `boschshc` integration allows you to integrate your [Bosch SHC](https://www.bosch-smarthome.com) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)

## Configuration

You will need the IP Address of your SHC and a registered client with a valid SSL certificate/key pair to use this module.

To add `Bosch SHC` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Bosch Smart Home Controller**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
boschshc:
   ip_address: YOUR_SHC_IP
   ssl_certificate: YOUR_SSL_CERT
   ssl_key: YOUR_SSL_KEY
```

{% configuration %}
ip_address:
  description: The IP address of your Bosch SHC.
  required: true
  type: string
ssl_certificate:
  description: Path to the SSL certificate of your client registered on the Bosch SHC.
  required: true
  type: string
ssl_key:
  description: Path to the SSL key of your client registered on the Bosch SHC.
  required: true
  type: string
{% endconfiguration %}

### Binary Sensor

The binary sensor platform allows you to monitor the states of your Shutter Contacts and Smoke Detectors. Binary sensors are added for each Door/Window Contact and Smoke Detector.

## Client registration

Before accessing the Bosch Smart Home Controller, a client must be registered on the controller. For this, a valid SSL cert/key pair must be registered on the controller. To start the client registration, press and hold the button on the controller until the LED starts flashing. For more information, follow the [client registration](https://github.com/BoschSmartHome/bosch-shc-api-docs/tree/master/postman#register-a-new-client-to-the-bosch-smart-home-controller) steps described in the Bosch SHC API documentation.
