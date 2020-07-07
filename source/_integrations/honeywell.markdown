---
title: Honeywell Total Connect Comfort (US)
description: Instructions on how to integrate Honeywell thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@zxdavb'
ha_domain: honeywell
---

The `honeywell` climate platform integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

It uses the [somecomfort](https://github.com/kk7ds/somecomfort) client library. It does not support the home security functionality of TCC.

If your system is compatible with this integration, then you will be able access your it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

## Configuration

To set up this integration, add the following to the `climate:` section of your `configuration.yaml` file:

```yaml
climate:
# Example configuration.yaml entry
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    region: us
    scan_interval: 120
```

{% configuration %}
username:
  description: Email address of an account with access to the TCC website.
  required: true
  type: string
password:
  description: Password for the account.
  required: true
  type: string
region:
  description: region the user is in. Must be us - see note above.
  required: true
away_cool_temperature:
  description: "Cooling setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 88
  type: integer
away_heat_temperature:
  description: "Heating setpoint when away mode is on, in degrees Fahrenheit."
  required: false
  default: 61
  type: integer
thermostat:
  description: ID of thermostat to restrict the integration to.
  required: false
  type: string
location:
  description: ID of location to restrict the integration to.
  required: false
  type: string
scan_interval:
  description: time in seconds between polling TCC cloud service. If too low TCC may block further requests.
{% endconfiguration %}
