---
title: "Vacuum paused cleaning"
trigger: vacuum.paused_cleaning
domain: vacuum
description: "Triggers when a vacuum cleaner pauses cleaning."
related_triggers:
  - vacuum.started_cleaning
  - vacuum.started_returning
---

The **Vacuum paused cleaning** trigger fires when a vacuum interrupts its cleaning session by pausing.
Use this to send reminders, alert for stuck devices, or to chain additional automations.

Use it to send a message when the robot needs help, turn on a nearby light so you can find it, or record how often it gets stuck in the same place.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vacuum: Vacuum paused cleaning**.
5. Under **Targets**, pick the vacuums, area, or group you want.
6. Under **Trigger when**, pick **First**, **Last**, or **Any**.
7. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: For multiple targets, pick when the trigger fires: **First**/ **Last**/ **Any** device paused.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

YAML example:

{% example %}
trigger: |
  trigger: vacuum.paused_cleaning
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: first
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: If multiple vacuums are targeted, controls whether the trigger fires on the first, last, or any vacuum pausing.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

target:
  description: Vacuum entity or group to monitor.
  required: true
  type: target

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger does not fire on recovery from unavailable/offline states—only on an actual pause event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: send a notification when the vacuum pauses

If the vacuum pauses unexpectedly, it may be stuck under furniture, wrapped in a cable, or waiting for you to empty the bin. This automation sends a phone alert so you can check on it.

- **Trigger**: Vacuum paused cleaning
- **Target**: Hallway vacuum
- **Action**: Notify mobile app

{% details "YAML example for a paused vacuum alert" %}

{% example %}
automation: |
  alias: "Vacuum paused alert"
  triggers:
    - trigger: vacuum.paused_cleaning
      target:
        entity_id: vacuum.hallway
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Vacuum paused"
        message: "The hallway vacuum paused and may need attention."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
