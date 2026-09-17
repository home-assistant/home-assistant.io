---
title: "Identify a light"
action: elgato.identify
domain: elgato
description: "Briefly blinks an Elgato Light to identify it or as a visual notification."
---

Use this action to briefly blink an Elgato Light. It was originally meant as a way to identify which light you are talking to, but it also works well as a visual notification, for example to flash a light when your doorbell is pressed.

{% include actions/ui_header.md %}

To identify a light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Identify**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elgato.identify`. A basic example looks like this:

{% example %}
action: |
  action: elgato.identify
  target:
    entity_id: light.elgato_key_light
{% endexample %}

This blinks `light.elgato_key_light`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="light" %}

## Good to know

- This action only works with Elgato Light entities.
- If the light entity is `unavailable`, the action cannot run until the entity is available again.
- The identify action does not take extra fields. You only need to select the target.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: visual doorbell notification

Briefly flash the Elgato Light when your doorbell is pressed.

- **Trigger**: Doorbell turns on
- **Action**: Identify a light
  - **Target**: Elgato Key Light

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Visual doorbell notification"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell
        to: "on"
    actions:
      - action: elgato.identify
        target:
          entity_id: light.elgato_key_light
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
