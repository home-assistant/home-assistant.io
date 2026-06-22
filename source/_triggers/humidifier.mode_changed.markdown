---
title: "Humidifier mode changed"
trigger: humidifier.mode_changed
domain: humidifier
description: "Triggers when the operation mode of one or more humidifiers changes."
related_triggers:
  - humidifier.turned_on
  - humidifier.turned_off
---

The **Humidifier mode changed** trigger fires after the operating mode of a humidifier {% term entity %} changes. Modes are device-specific and typically include options like **Normal**, **Eco**, **Sleep**, **Auto**, or **Baby**, though the exact modes available depend on your device. Use **Humidifier mode changed** to react when the mode changes, for example to automatically lower the target humidity on all your humidifiers when one of them switches to **Eco** mode, keeping your whole home in sync with a single mode change.

You can optionally filter the trigger to fire only when the humidifier switches to a specific mode. Leave the mode option empty to fire on any mode change.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Humidifier mode changed** in an automation, follow these steps:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier mode changed**.
6. Optionally, under **Mode**, select one or more modes you want to watch for. Leave it empty to trigger on any mode change.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple humidifiers are targeted.
8. Under **For at least**, set how long the humidifier must remain in the new mode before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: The mode or modes the humidifier must switch to for the trigger to fire. Typical modes include **Normal**, **Eco**, **Away**, **Boost**, **Comfort**, **Home**, **Sleep**, **Auto**, and **Baby**, though the exact modes available depend on your device. Default is empty, which fires on any mode change.
Trigger when:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted humidifier changes mode.
    - **First**: fires only on the first mode change.
    - **All**: fires only after every targeted humidifier changes mode.
For at least:
  description: How long the humidifier must remain in the new mode before the trigger fires. Useful to ignore brief transitional modes some devices cycle through during startup. If you set a short delay of a few seconds, it prevents your automation from firing on that momentary blip. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier mode changed** is referred to as `humidifier.mode_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.mode_changed
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This fires every time the bedroom humidifier switches to a different mode.

To fire only when the humidifier switches to a specific mode:

{% example %}
trigger: |
  trigger: humidifier.mode_changed
  target:
    entity_id: humidifier.bedroom
  options:
    mode: "sleep"
{% endexample %}

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
mode:
  description: >
    The mode or modes the humidifier must switch to for the trigger to fire. Accepts a single mode string or a list of modes. Typical modes include `normal`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, `auto`, and `baby`, though the exact modes available depend on your device. Omit to fire on any mode change.
  required: false
  type: string
  default: (empty, fires on any mode change)
behavior:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted humidifier changes mode.
    - `first`: fires only on the first mode change.
    - `all`: fires only after every targeted humidifier changes mode.
  required: false
  type: string
  default: each
for:
  description: |
    How long the humidifier must remain in the new mode before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:10` fires only after the humidifier has stayed in the new mode for 10 seconds, which is useful to ignore brief transitional modes some devices cycle through during startup.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The available modes depend entirely on the device. Check your humidifier's documentation or the Home Assistant entity's attributes to see which modes are supported.
- If you filter by mode, the trigger only fires when the humidifier _enters_ that mode, not when it leaves it.
- To check whether the humidifier is currently in a specific mode during a condition step, use the **Humidifier is in mode** condition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: set the scene when the humidifier enters sleep mode

When the bedroom humidifier switches to sleep mode, dim the lights and activate the night scene so the room feels ready for rest.

- **Trigger**: Humidifier mode changed
  - **Target**: Bedroom humidifier
  - **Mode**: sleep
  - **Trigger when**: Each
- **Action**: Light: Turn on (night scene)

{% details "YAML example for a sleep-mode scene" %}

{% example %}
automation: |
  alias: "Activate night scene on sleep mode"
  triggers:
    - trigger: humidifier.mode_changed
      target:
        entity_id: humidifier.bedroom
      options:
        mode: "sleep"
        behavior: each
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.bedroom_night
{% endexample %}

{% enddetails %}

### Automation: notify when any humidifier switches to Eco mode

When a humidifier in the house switches to Eco mode, send a notification confirming that energy-saving operation has started.

- **Trigger**: Humidifier mode changed
  - **Target**: All humidifiers (by label)
  - **Mode**: Eco
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for an Eco mode notification" %}

{% example %}
automation: |
  alias: "Notify on Eco mode"
  triggers:
    - trigger: humidifier.mode_changed
      target:
        label_id: all_humidifiers
      options:
        mode: "eco"
        behavior: each
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A humidifier switched to eco mode."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
