---
title: Enphase Envoy
description: Instructions on how to setup Enphase Envoy with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: enphase_envoy
ha_zeroconf: true
ha_config_flow: true
ha_codeowners:
  - '@gtdiehl'
ha_platforms:
  - sensor
---

A sensor platform for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy-and-combiner) solar energy gateway. Works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S).

{% include integrations/config_flow.md %}

### Obtaining the password

For newer models, the username `envoy` without a password will grant access to the device. For older models, the password for the `installer` user can be obtained with this: [tool](https://thecomputerperson.wordpress.com/2016/08/28/reverse-engineering-the-enphase-installer-toolkit/).

### Using Energy Dashboard with firmware <3.9

Older firmware will round the value of lifetime energy production, sometimes to MWh. Unless you are an energy company, MWh will not offer enough precision; so you may wish to configure a template entity with the *daily energy production* measurement. Make sure to set `state_class` and `last_reset` so long-term statistics are supported.

{% raw %}

```yaml
template:
  - sensor:
      - name: "My Daily Production"
        state: "{{ states('sensor.envoy_today_s_energy_production') }}"
        unique_id: "envoy_daily_energy_consumption_last_reset"
        unit_of_measurement: Wh
        icon: mdi:solar-power
        device_class: energy
        state_class: measurement
        attributes:
          last_reset: "{{ now().replace(hour=0, minute=0, second=0, microsecond=0).isoformat() }}"
```

{% endraw %}
