---
title: "It is blue hour"
condition: sun.is_blue_hour
domain: sun
description: "Tests if it is blue hour, optionally for a specific period."
related_conditions:
  - sun.is_golden_hour
  - sun.is_evening_twilight
  - sun.is_morning_twilight
---

The **It is blue hour** condition passes during blue hour, the deeper part of twilight just before sunrise and just after sunset when the sky takes on a rich blue color. Blue hour is the period when the sun's elevation is between 6° and 4° below the horizon, just below golden hour. You can match any blue hour, or narrow it to the morning or the evening. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to run an automation during that short, blue-lit window, like turning on garden or path lighting as the sky darkens, or starting a calm evening scene once the sun is well down.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **It is blue hour**.
5. Under **Period**, select **Any**, **Morning**, or **Evening**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Period:
  description: |
    Which blue hour passes the condition:

    - **Any**: both the morning and the evening blue hour. This is the default.
    - **Morning**: only the blue hour before sunrise, while the sun is rising.
    - **Evening**: only the blue hour after sunset, while the sun is descending.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_blue_hour`. A basic example looks like this:

{% example %}
condition: |
  condition: sun.is_blue_hour
{% endexample %}

This passes during any blue hour. To match only the morning or the evening, add the `period` option:

{% example %}
condition: |
  condition: sun.is_blue_hour
  options:
    period: evening
{% endexample %}

### Options in YAML

{% options_yaml %}
period:
  description: >
    Which blue hour passes the condition. Accepts `any` (both the morning and the evening blue hour), `morning` (the blue hour before sunrise, while the sun is rising), or `evening` (the blue hour after sunset, while the sun is descending).
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Blue hour is the period when the sun's elevation is between -6° and -4°. Just above it, between -4° and 6°, is [It is golden hour](/conditions/sun.is_golden_hour/).
- Blue hour falls within civil twilight. For the wider twilight periods, use [It is morning twilight](/conditions/sun.is_morning_twilight/) and [It is evening twilight](/conditions/sun.is_evening_twilight/).
- The length of blue hour changes through the year and with your latitude. Near the poles, it can last much longer or fail to occur on some days, and the condition does not pass then.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on garden lights during evening blue hour

When someone is home during the evening blue hour, turn on the garden lights so the yard is lit as the sky darkens.

- **Trigger**: Someone comes home
- **Condition**: It is blue hour (Evening)
- **Action**: Turn on light
  - **Target**: Garden lights

{% details "YAML example for garden lights during blue hour" %}

{% example %}
automation: |
  alias: "Garden lights during blue hour"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: "home"
  conditions:
    - condition: sun.is_blue_hour
      options:
        period: evening
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garden
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
