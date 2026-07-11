---
title: "Dusk"
trigger: sun.dusk
domain: sun
description: "Triggers at dusk, when civil, nautical, or astronomical twilight ends."
related_triggers:
  - sun.dawn
  - sun.sunset
  - sun.elevation_crossed_threshold
---

The **Dusk** trigger fires at dusk, the moment the evening twilight ends and the last daylight fades after the sun has set. You choose how dark "dusk" is with the twilight type: civil, nautical, or astronomical. Home Assistant calculates the exact time for every day from your [home location](/docs/configuration/basic/).

Use it to close blinds for the night, switch to evening lighting, or arm a routine once it is genuinely dark outside rather than at a fixed clock time.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Dusk**.
5. Under **Twilight type**, select **Civil**, **Nautical**, or **Astronomical** to choose how dark the end of dusk is.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Twilight type:
  description: |
    The phase of twilight that marks the end of dusk:

    - **Civil**: the sun is 6° below the horizon. The brightest twilight, with enough light for most outdoor activities. This is the default.
    - **Nautical**: the sun is 12° below the horizon. The horizon is still faintly visible at sea.
    - **Astronomical**: the sun is 18° below the horizon. The sky is, for most purposes, fully dark.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `sun.dusk`. A basic example looks like this:

{% example %}
trigger: |
  trigger: sun.dusk
{% endexample %}

This fires at civil dusk every day. To pick a different twilight phase, add the `type` option:

{% example %}
trigger: |
  trigger: sun.dusk
  options:
    type: astronomical
{% endexample %}

### Options in YAML

{% options_yaml %}
type:
  description: >
    The phase of twilight that marks the end of dusk. Accepts `civil` (sun 6° below the horizon), `nautical` (12° below), or `astronomical` (18° below).
  required: false
  type: string
  default: civil
{% endoptions_yaml %}

## Good to know

- This trigger does not use a target. It applies to the sun at your configured home location.
- Dusk always happens after sunset. [Sunset](/triggers/sun.sunset/) comes first, then civil dusk, then nautical, then astronomical dusk last.
- The length of twilight changes through the year and with your latitude. Near the poles, a twilight phase can fail to occur on some days. When that happens, the trigger does not fire for that day.
- For the matching moment in the morning, use [Dawn](/triggers/sun.dawn/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next dusk, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: close the blinds at dusk

When civil dusk falls, close the blinds throughout the house for the evening.

- **Trigger**: Dusk
  - **Twilight type**: Civil
- **Action**: Close cover
  - **Target**: All blinds (label)

{% details "YAML example for closing blinds at dusk" %}

{% example %}
automation: |
  alias: "Close blinds at dusk"
  triggers:
    - trigger: sun.dusk
  actions:
    - action: cover.close_cover
      target:
        label_id: blinds
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
