---
title: "It is evening twilight"
condition: sun.is_evening_twilight
domain: sun
description: "Tests if it is evening twilight, optionally of a specific type."
related_conditions:
  - sun.is_morning_twilight
  - sun.is_set
  - sun.is_night
---

The **It is evening twilight** condition passes during the gradually darkening period after sunset, while the sun is below the horizon but still sinking. You can match any evening twilight, or narrow it to a specific phase: civil, nautical, or astronomical. Home Assistant works this out from your [home location](/docs/configuration/basic/).

Use it to run an automation in that post-sunset window, like switching to evening lighting or closing the blinds as the sky fades.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Sun: It is evening twilight**.
5. Under **Twilight type**, select **Any**, **Civil**, **Nautical**, or **Astronomical**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Twilight type:
  description: |
    Which phase of evening twilight passes the condition:

    - **Any**: any twilight, from sunset down to the start of night. This is the default.
    - **Civil**: the sun is between sunset and 6° below the horizon. The brightest twilight.
    - **Nautical**: the sun is between 6° and 12° below the horizon.
    - **Astronomical**: the sun is between 12° and 18° below the horizon. The darkest twilight, closest to night.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `sun.is_evening_twilight`. A basic example looks like this:

{% example %}
condition: |
  condition: sun.is_evening_twilight
{% endexample %}

This passes during any evening twilight. To match a specific phase, add the `type` option:

{% example %}
condition: |
  condition: sun.is_evening_twilight
  options:
    type: civil
{% endexample %}

### Options in YAML

{% options_yaml %}
type:
  description: >
    Which phase of evening twilight passes the condition. Accepts `any` (any twilight after sunset), `civil` (sun between sunset and 6° below the horizon), `nautical` (between 6° and 12° below), or `astronomical` (between 12° and 18° below).
  required: false
  type: string
  default: any
{% endoptions_yaml %}

## Good to know

- This condition does not use a target. It checks the sun at your configured home location.
- Evening twilight is the sinking side of the day. The matching period before sunrise is [It is morning twilight](/conditions/sun.is_morning_twilight/).
- The phases are stacked: civil comes first right after sunset, then nautical, then astronomical, and finally [It is night](/conditions/sun.is_night/). **Any** covers all three.
- The length of twilight changes through the year and with your latitude. Near the poles, a phase can fail to occur on some days, and the condition does not pass then.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: switch to evening lighting at dusk

When the living room is occupied during civil evening twilight, switch the lights to a warm evening scene.

- **Trigger**: Living room occupancy detected
- **Condition**: It is evening twilight (Civil)
- **Action**: Activate the evening lighting scene

{% details "YAML example for evening lighting at dusk" %}

{% example %}
automation: |
  alias: "Evening lighting at dusk"
  triggers:
    - trigger: state
      entity_id: binary_sensor.living_room_occupancy
      to: "on"
  conditions:
    - condition: sun.is_evening_twilight
      options:
        type: civil
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.living_room_evening
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
