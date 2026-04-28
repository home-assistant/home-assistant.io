---
title: "Humidifier started drying"
trigger: humidifier.started_drying
domain: humidifier
description: "Triggers after one or more humidifiers start actively drying (dehumidifying)."
related_triggers:
  - humidifier.turned_on
  - humidifier.started_humidifying
---

The **Humidifier started drying** trigger fires when a humidifier {% term entity %} begins actively removing moisture from the air. This typically applies to dehumidifiers and devices with a dehumidification device class that pause once the target humidity is reached and then resume when the air becomes too humid again. This trigger fires every time the device moves from idle back into active drying, giving you a precise moment to react to excess moisture in the room.

Use this trigger to track dehumidification cycles, send alerts when the air becomes too humid, or coordinate other actions that should happen while the device is actively removing moisture.

When you target more than one humidifier, the trigger's **behavior** option controls when it fires.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your dehumidifier is in (like your basement or bathroom). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier started drying**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last** to control how the trigger behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must be actively drying before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple devices are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted device starts drying, **First** to fire only on the first, or **Last** to fire only after every targeted device starts drying.
  required: true
For at least:
  description: How long the device must be actively drying before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `humidifier.started_drying`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.started_drying
  target:
    entity_id: humidifier.basement_dehumidifier
{% endexample %}

This fires every time `humidifier.basement_dehumidifier` starts actively removing moisture from the air.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple devices are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: >
    Duration the device must be actively drying before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires independently of [Humidifier turned on](/triggers/humidifier.turned_on/). A dehumidifier can be on but idle (the air is already dry enough), and this trigger fires only when active drying begins.
- To react to active humidification starting instead, use [Humidifier started humidifying](/triggers/humidifier.started_humidifying/).
- This trigger is most useful with devices that have the dehumidifier device class, but it also applies to multi-mode devices that can switch between humidifying and drying.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: alert when the basement gets too humid

When the basement dehumidifier starts running again, it means the air has become too humid. Send a notification so you can check whether there is a moisture problem that needs attention.

- **Trigger**: Humidifier started drying
- **Target**: Basement dehumidifier
- **Trigger when**: Any
- **For at least**: 00:05:00
- **Action**: Send a mobile notification

{% details "YAML example for a basement humidity alert" %}

{% example %}
automation: |
  alias: "Alert when basement dehumidifier starts"
  triggers:
    - trigger: humidifier.started_drying
      target:
        entity_id: humidifier.basement_dehumidifier
      options:
        behavior: any
        for: "00:05:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "Basement dehumidifier started drying. Humidity may be high."
{% endexample %}

{% enddetails %}

### Automation: close the windows when the dehumidifier kicks in

When the dehumidifier starts drying, close any open windows automatically to prevent more humid air from coming in and making the device work harder.

- **Trigger**: Humidifier started drying
- **Target**: Basement dehumidifier
- **Trigger when**: Any
- **For at least**: 00:00:00
- **Action**: Cover: Close cover

{% details "YAML example for closing windows on dehumidification start" %}

{% example %}
automation: |
  alias: "Close windows when dehumidifier starts"
  triggers:
    - trigger: humidifier.started_drying
      target:
        entity_id: humidifier.basement_dehumidifier
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: cover.close_cover
      target:
        area_id: basement
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
