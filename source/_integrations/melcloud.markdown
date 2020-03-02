---
title: MELCloud
description: MELCloud integration
logo: melcloud.png
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

- Air-to-Air heat pumps, e.g., AC units - **Supported**
- Air-to-Water heat pumps - **Work in progress**
- Energy recovery ventilators - **Not supported**
- Other - **Not supported**

## Configuration

The integration should be configured through the user interface ("Configurations -> Integrations") using the MELCloud login details. While not optimal, **the provided password is not stored**.

An expired token needs to be updated manually by adding the MELCloud integration again with the same email address.

Configuration is also possible through `configuration.yaml`. The required authentication token can be found in `X-MitsContextKey` header when logged into the MELCloud. The language needs to be set to English and the "Remember me" option needs to be selected.

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

An Air-to-Air heat pump provides `climate` and `sensor` platforms. Device capabilities can limit the available parameters and sensors.

### Climate

The following parameters can be controlled for the `climate` platform entities:

- Power (using HVAC mode)
- Target temperature
- Operation mode (HVAC mode)
- Fan speed

### Sensor

The following attributes are available for `sensor` platform entities:

- Room temperature
- Energy - The total consumed energy in kWh. **Not supported by all models.**
