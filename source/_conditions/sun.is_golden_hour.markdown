---
title: "It is golden hour"
condition: sun.is_golden_hour
domain: sun
description: "Tests if it is golden hour, optionally for a specific period."
related_conditions:
  - sun.is_blue_hour
  - sun.is_up
  - sun.elevation
---

The **It is golden hour** condition passes during golden hour, the time around sunrise and sunset when the sun sits low in the sky and the light turns warm and soft. Golden hour is the period when the sun's elevation is between 4° below the horizon and 6° above it. You can match any golden hour, or narrow it to the morning or the evening. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to run an automation only while that warm, low light lasts, like setting a cozy scene, dimming the lights to match the mood outside, or lowering the blinds against a low sun.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **It is golden hour**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Period:
  description: |
    Which golden hour passes the condition:

    - **Any**: both the morning and the evening golden hour. This is the default.
    - **Morning**: only the golden hour around sunrise, while the sun is rising.
    - **Evening**: only the golden hour around sunset, while the sun is descending.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_golden_hour`. A basic example looks like this:

{% example %}
condition: |
  condition: sun.is_golden_hour
{% endexample %}

This passes during any golden hour. To match only the morning or the evening, add the `period` option:

{% example %}
condition: |
  condition: sun.is_golden_hour
  options:
    period: evening
{% endexample %}

### Options in YAML

{% options_yaml %}
period:
  description: >
    Which golden hour passes the condition. Accepts `any` (both the morning and the evening golden hour), `morning` (the golden hour around sunrise, while the sun is rising), or `evening` (the golden hour around sunset, while the sun is descending).
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Golden hour is the period when the sun's elevation is between -4° and 6°. Just below it, between -6° and -4°, is [It is blue hour](/conditions/sun.is_blue_hour/).
- The morning golden hour happens while the sun is rising, and the evening golden hour while it is descending. To tell the two apart on their own, use [Sun is ascending](/conditions/sun.is_ascending/) and [Sun is descending](/conditions/sun.is_descending/).
- The length of golden hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days, and the condition does not pass then.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warm the living room during evening golden hour

When motion is detected in the living room during the evening golden hour, turn on the lamps at a warm color so the indoor light matches the low sun outside.

- **Trigger**: Living room motion detected
- **Condition**: It is golden hour (Evening)
- **Action**: Turn on light
  - **Target**: Living room lamps

{% details "YAML example for warm light during golden hour" %}

{% example %}
automation: |
  alias: "Warm living room during golden hour"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_motion
      to: "on"
  conditions:
    - condition: sun.is_golden_hour
      options:
        period: evening
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lamps
      data:
        color_temp_kelvin: 2700
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
