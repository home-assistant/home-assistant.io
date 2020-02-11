---
title: MELCloud
description: MELCloud integration
logo: home-assistant.png
ha_category:
  - Climate
ha_release: 0.106
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@vilppuvuorinen'
---

The `melcloud` integration integrates Mitsubishi Electric's [MELCloud](https://www.melcloud.com/) enabled devices into Home Assistant.

## Device support

- Air-to-Air heat pumps, e.g. AC units - **Supported**
- Air-to-Water heat pumps - **Work in progress**
- Energy recovery ventilators - **Not supported**
- Other - **Not supported**

## Configuration

The integration should be configured through the user interface ("Configurations -> Integrations") using the MELCloud login details. While not optimal, **the provided password is not stored**.

The stored access token can later be updated by adding the MELCloud integration again with the same email address.

Configuration is also possible through `configuration.yaml`. The token can be found from `X-MitsContextKey` header when logged into MELCloud. The language needs to be set to English and the "Remember me" option needs to be selected.

```yaml
melcloud:
  username: xxxx@xxxxxxx
  token: xxxxxxxxxxxxxxxxxxx
```

{% configuration %}
username:
  description: Email address used to login to MELCloud
  required: true
  type: string
token:
  description: X-MitsContextKey access token
  required: true
  type: string
{% endconfiguration %}

## Air-to-Air device

Air-to-Air heat pump provides `climate` and `sensor` platforms.

### Climate

The following parameters can be controlled for the `climate` platform entities:

- Target temperature
- Operation mode (HVAC mode) with emulated power off.
- Fan speed

### Sensor

The following attributes are available for `sensor` platform entities:

- Room temperature
- Energy - total consumed energy in kWh.
