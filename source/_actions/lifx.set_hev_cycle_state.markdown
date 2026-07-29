---
title: "Set HEV cycle state"
action: lifx.set_hev_cycle_state
domain: lifx
description: "Start or stop a HEV (Clean) cycle on a LIFX Clean bulb."
related_actions:
  - lifx.set_state
  - lifx.effect_pulse
---

The **Set HEV cycle state** action controls the HEV LEDs on a LIFX Clean bulb. Starting a cycle, also called a Clean cycle, switches the HEV LEDs on for a set time and then returns the bulb to its previous state. Stopping a cycle ends it early.

Only LIFX Clean bulbs have HEV LEDs. If you target a bulb without them, Home Assistant returns an error and nothing changes on that bulb.

{% include actions/ui_header.md %}

To start or stop a Clean cycle from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Set HEV cycle state**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your LIFX Clean bulbs are in (like your bathroom or kitchen). You can also select a floor, a device, a specific entity, or a label.
7. Turn **Enable** on to start a Clean cycle, or off to stop one. _Optional_: set **Duration** to control how long the cycle runs.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Enable:
  description: Turn this on to start a Clean cycle, or off to stop one that is already running.
  required: true
Duration:
  description: How long the HEV LEDs stay on, in seconds, from 0 to 86400 (24 hours). Leave this out to let the bulb use its own configured cycle duration.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lifx.set_hev_cycle_state`. A basic example looks like this:

{% example %}
action: |
  action: lifx.set_hev_cycle_state
  target:
    entity_id: light.bathroom
  data:
    power: true
    duration: 3600
{% endexample %}

This starts a one-hour Clean cycle on the bathroom bulb.

### Options in YAML

{% options_yaml %}
power:
  description: Set to true to start a Clean cycle, or false to stop one that is already running.
  required: true
  type: boolean
duration:
  description: How long the HEV LEDs stay on, in seconds, from 0 to 86400 (24 hours). Leave this out to let the bulb use its own configured cycle duration.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- Only LIFX Clean bulbs have HEV LEDs. Targeting any other LIFX bulb returns the error "does not have HEV LEDs".
- If you leave **Duration** out, Home Assistant asks the bulb to run for the duration configured on the bulb itself. Home Assistant does not apply a duration of its own, even though the field suggests 7200 seconds (two hours) when you open it in the UI.
- Duration is sent to the bulb as whole seconds, so a value with decimals is rounded.
- Home Assistant creates a **Clean cycle** {% term entity %} for every bulb that has HEV LEDs. It tells you whether a cycle is currently running, which is handy as a condition so you don't start a second cycle or stop one that was never running.
- The **Clean cycle** entity is refreshed every 10 seconds to keep network traffic low, so it may take a moment to catch up after you start or stop a cycle.
- Stopping a cycle returns the bulb to the color and brightness it had before the cycle started. To set it to something else instead, follow up with the [Set state](/actions/lifx.set_state/) action.
- This action only works on lights provided by the LIFX integration. If none of the targets is a LIFX light, Home Assistant returns an error.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run a Clean cycle overnight

Start a one-hour Clean cycle in the bathroom at 2:00 AM, when nobody is likely to be in the room.

- **Trigger**: Time: 02:00
- **Action**: Set HEV cycle state
  - **Target**: Bathroom light (`light.bathroom`)

{% example %}
automation: |
  alias: "Run a Clean cycle overnight"
  triggers:
    - trigger: time
      at: "02:00:00"
  actions:
    - action: lifx.set_hev_cycle_state
      target:
        entity_id: light.bathroom
      data:
        power: true
        duration: 3600
{% endexample %}

### Automation: stop the Clean cycle when someone walks in

If a motion sensor detects someone in the bathroom while a Clean cycle is running, stop the cycle straight away. The **Clean cycle** entity is used as a condition so the automation only acts when a cycle is actually running.

- **Trigger**: State: motion detected in the bathroom
- **Condition**: The bathroom Clean cycle is running
- **Action**: Set HEV cycle state
  - **Target**: Bathroom light (`light.bathroom`)

{% example %}
automation: |
  alias: "Stop the Clean cycle when someone walks in"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bathroom_motion
      to: "on"
  conditions:
    - condition: state
      entity_id: binary_sensor.bathroom_clean_cycle
      state: "on"
  actions:
    - action: lifx.set_hev_cycle_state
      target:
        entity_id: light.bathroom
      data:
        power: false
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
