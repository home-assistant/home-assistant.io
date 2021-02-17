---
title: Radio Thermostat
description: Instructions on how to integrate Radio Thermostat (3M Filtrete) thermostats within Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 0.7.6
ha_domain: radiotherm
ha_codeowners:
  - '@vinnyfuria'
ha_platforms:
  - climate
---

The `radiotherm` climate platform let you control a thermostat from [Radio Thermostat](https://www.radiothermostat.com/) or [3M Filtrete](https://www.filtrete.com/). Your thermostat must have the Wi-Fi module installed and connected to your network.

The underlying library supports:

- CT30 v1.75
- CT30 v1.92
- CT30 v1.94
- CT30 v1.99
- CT50 V1.09
- CT50 V1.88
- CT50 V1.92
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B1 V1.00
- CT80 Rev B2 V1.00
- CT80 Rev B2 V1.03
- CT80 Rev B2 V1.09

New models that are derivatives of the CT30 or CT80 should be detected automatically and basic functionality should work.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: radiotherm
```

{% configuration %}
host:
  description: List of your Radiotherm thermostats. If not provided the thermostats will be auto-detected.
  required: false
  type: list
hold_temp:
  description: Boolean to control if Home Assistant temperature adjustments hold (`true`) or are temporary (`false`).
  required: false
  default: false
  type: boolean
{% endconfiguration %}

Set `hold_temp: true` if you want temperature settings from Home Assistant to override a thermostat schedule on the thermostat itself. Otherwise Home Assistant will perform temporary temperature changes.

Multiple thermostats can be assigned by using `host:` if auto-detection is not used.

```yaml
climate:
  platform: radiotherm
  host:
    - 192.168.99.137
    - 192.168.99.202
```
Humidity is now available as the `current_humidity` attribute for each `climate.$HOST` entity. This only works for RadioThermostat devices that have a built in humidity sensor.
