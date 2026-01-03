---
title: Edimax
description: Instructions on how to integrate Edimax switches into Home Assistant.
ha_category:
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: edimax
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `edimax` switch {% term integration %} allows you to control the state of your [Edimax](https://www.edimax.com/edimax/merchandise/merchandise_list/data/edimax/global/home_automation_smart_plug/) switches.

To use your Edimax switch in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: edimax
    host: 192.168.1.32
```

{% configuration %}
host:
  description: "The IP address of your Edimax switch, e.g., `192.168.1.32`."
  required: true
  type: string
username:
  description: Your username for the Edimax switch.
  required: false
  default: admin
  type: string
password:
  description: Your password for the Edimax switch.
  required: false
  default: 1234
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  default: Edimax Smart Plug
  type: string
{% endconfiguration %}

## Power consumption sensor

Starting with [version 2 of the firmware](https://www.edimax.com/edimax/download/download/data/edimax/global/download/), the Edimax switches can also report the current and accumulated daily power consumption in their state objects. Use a [template sensor](/integrations/template) to extract their values:

{% raw %}

```yaml
template:
  - sensor:
    - name: Edimax Current power consumption
      unit_of_measurement: "W"
      state: "{{ state_attr('switch.edimax_smart_plug', 'current_power_w') | default(0, true) }}"
      
    - name: Edimax Accumulated daily power consumption
      unit_of_measurement: "kWh"
      state: "{{ state_attr('switch.edimax_smart_plug', 'today_energy_kwh') | default(0, true) }}"
```

{% endraw %}

Note that if the smart plug is off, these states report the string `None`. By using a `replace()` in the template, these sensors report purely numerical values.
