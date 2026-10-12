---
title: "Add meter reading"
action: tado.add_meter_reading
domain: tado
description: "Adds a meter reading to Tado Energy IQ."
related_actions:
  - tado.set_climate_timer
  - tado.set_water_heater_timer
  - tado.set_climate_temperature_offset
---

The **Add meter reading** action sends a meter reading to Tado Energy IQ. With Energy IQ, you can track your energy consumption and keep an eye on your heating costs.

A common use is an automation that reads a gas or electricity meter sensor and submits the value to Tado on a daily schedule.

{% include actions/ui_header.md %}

To add a meter reading from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tado: Add meter reading**.
6. Select the **Config entry** and enter the **Reading**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Tado config entry to add the meter reading to.
  required: true
Reading:
  description: The meter reading in m³ or kWh, without decimals.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tado.add_meter_reading`. A basic example looks like this:

{% example %}
action: |
  action: tado.add_meter_reading
  data:
    config_entry: ef2e84b3dfc0aee85ed44ac8e8038ccf
    reading: 1234
{% endexample %}

To find your config entry ID, set this action up in the UI first, then switch to YAML mode to read the generated value.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The Tado config entry to add the meter reading to.
  required: true
  type: string
reading:
  description: >
    The meter reading in m³ or kWh, without decimals.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: submit a daily meter reading

Send a gas meter reading to Tado Energy IQ every night.

{% details "YAML example for a daily meter reading" %}

{% example %}
automation: |
  alias: "Submit daily gas reading to Tado"
  triggers:
    - trigger: time
      at: "00:00:00"
  actions:
    - action: tado.add_meter_reading
      data:
        config_entry: ef2e84b3dfc0aee85ed44ac8e8038ccf
        reading: "{{ states('sensor.gas_consumption') | int }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
