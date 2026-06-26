---
title: "It is morning twilight"
condition: sun.is_morning_twilight
domain: sun
description: "Tests if it is morning twilight, optionally of a specific type."
related_conditions:
  - sun.is_evening_twilight
  - sun.is_up
  - sun.is_night
---

The **It is morning twilight** condition passes during the gradually brightening period before sunrise, while the sun is below the horizon but the sky is no longer completely dark. You can match any morning twilight, or narrow it to a specific phase: civil, nautical, or astronomical. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to run an automation in that pre-dawn window, like starting a gentle wake-up routine or raising the blinds as the sky begins to lighten.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: It is morning twilight**.
5. Under **Twilight type**, select **Any**, **Civil**, **Nautical**, or **Astronomical**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Twilight type:
  description: |
    Which phase of morning twilight passes the condition:

    - **Any**: any twilight, from the end of night up to sunrise. This is the default.
    - **Civil**: the sun is between 6° below the horizon and sunrise. The brightest twilight.
    - **Nautical**: the sun is between 12° and 6° below the horizon.
    - **Astronomical**: the sun is between 18° and 12° below the horizon. The darkest twilight, closest to night.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_morning_twilight`. A basic example looks like this:

{% example %}
condition: |
  condition: sun.is_morning_twilight
{% endexample %}

This passes during any morning twilight. To match a specific phase, add the `type` option:

{% example %}
condition: |
  condition: sun.is_morning_twilight
  options:
    type: civil
{% endexample %}

### Options in YAML

{% options_yaml %}
type:
  description: >
    Which phase of morning twilight passes the condition. Accepts `any` (any twilight up to sunrise), `civil` (sun between 6° below the horizon and sunrise), `nautical` (between 12° and 6° below), or `astronomical` (between 18° and 12° below).
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Morning twilight is the rising side of the day. The matching period after sunset is [It is evening twilight](/conditions/sun.is_evening_twilight/).
- The phases are stacked: astronomical is darkest and comes first, then nautical, then civil, then [Sun is up](/conditions/sun.is_up/) at sunrise. **Any** covers all three.
- The length of twilight changes through the year and with your latitude. Near the poles, a phase can fail to occur on some days, and the condition does not pass then.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: gentle wake-up light at civil dawn

When your alarm helper is on, fade the bedroom light in during civil morning twilight so you wake with the brightening sky.

- **Trigger**: Bedroom motion detected
- **Condition**: Sun: It is morning twilight (Civil)
- **Action**: Turn on light (at low brightness)
  - **Target**: Bedroom light

{% details "YAML example for a pre-dawn wake-up light" %}

{% example %}
automation: |
  alias: "Wake-up light at civil dawn"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_motion
      to: "on"
  conditions:
    - condition: sun.is_morning_twilight
      options:
        type: civil
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedroom
      data:
        brightness_pct: 20
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
