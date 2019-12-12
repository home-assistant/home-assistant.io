---
title: "Honeywell Thermostat"
description: "Instructions on how to integrate Honeywell thermostats within Home Assistant."
logo: honeywell.png
ha_category:
  - Climate
ha_release: pre 0.7
ha_iot_class: Cloud Polling
---

The `honeywell` climate platform integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

It does not support the home security functionality of TCC.

It uses the [somecomfort](https://github.com/kk7ds/somecomfort) client library.

<div class='note'>

There is some potential confusion over this integration because it was previously implemented as a combination of two _distinct_ climate systems, one being US-based, the other EU-based.

These two regions are _not_ interchangeable, and the `eu` region is now deprecated.  Ongoing support for such systems is available via the [evohome](/integrations/evohome/) integration.

</div>

### US-based Systems

These systems are based in North America, and temperatures are usually in Fahrenheit. They would likely be HVAC systems. They always use the [somecomfort](https://github.com/kk7ds/somecomfort) client library. In this integration, this is called the `us` region.

If your system is US-based, then you can access your system via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

### EU-based Systems

These systems are based in Europe (including the UK & Ireland), and temperatures are usually in Celsius. They would likely be heating-only systems. They always use the [evohome-client](https://github.com/watchforstock/evohome-client) client library. In this integration, this is called the `eu` region.

If your system is EU-based, then you can access it via [https://international.mytotalconnectcomfort.com/](https://international.mytotalconnectcomfort.com/) (note the `international`).

## Configuration

To set up this integration, add the following to the `climate:` section of your **configuration.yaml** file:

```yaml
climate:
# Example configuration.yaml entry
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    region: us
```

{% configuration %}
username:
  description: Email address of an account with access the TCC website for your region.
  required: true
  type: string
password:
  description: Password for the account.
  required: true
  type: string
region:
  description: Region identifier.
  required: true
  default: us
  type: string
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
{% endconfiguration %}
