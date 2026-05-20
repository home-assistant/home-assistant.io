---
title: "Door is open"
condition: door.is_open
domain: door
description: "Tests if one or more doors are open."
related_conditions:
  - door.is_closed
---

The **Door is open** condition passes when one or more targeted doors are currently open. Use it when an automation should continue only if a door is still open at the moment the automation runs.

This condition is useful for reminders, security checks, and routines that should stop or warn you when a front door, patio door, or garage door has not been closed yet.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Door is open**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your door is in, like your entryway or garage. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the door must have stayed open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple doors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted door is open, or **All** to pass only when every targeted door is open.
For at least:
  description: How long the door must have stayed open before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `door.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: door.is_open
  target:
    entity_id: binary_sensor.patio_door
{% endexample %}

This passes when `binary_sensor.patio_door` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple doors are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the door must have stayed open before the condition passes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with door contact sensors and door covers, like garage doors, as long as they use the `door` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted door is open.
- With **All**, the condition passes only if every available targeted door is open. If every targeted door is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn you if any exterior door is still open at bedtime

If you have created a {% term helper %} to mark bedtime, this automation can use it to check whether any exterior door is still open. If one is, Home Assistant sends a notification instead of letting you discover it later.

- **Trigger**: Bedtime helper turns on
- **Condition**: Door is open
  - **Target**: Front door, patio door, and garage door
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime door check" %}

{% example %}
automation: |
  alias: "Warn if a door is open at bedtime"
  triggers:
    - trigger: state
      entity_id: input_boolean.bedtime_mode
      to: "on"
  conditions:
    - condition: door.is_open
      target:
        entity_id:
          - binary_sensor.front_door
          - binary_sensor.patio_door
          - cover.garage_door
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "A door is still open"
        message: "Check the front door, patio door, or garage door before bed."
{% endexample %}

{% enddetails %}

### Automation: alert you if the garage door is still open when you leave home

When the last person leaves home, this automation checks whether the garage door is still open. If it is, Home Assistant sends an alert so you can close it before getting too far away.

- **Trigger**: Person leaves home zone
- **Condition**: Door is open
  - **Target**: Garage door
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking the garage door when leaving" %}

{% example %}
automation: |
  alias: "Warn if garage door is open when leaving home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: leave
  conditions:
    - condition: door.is_open
      target:
        entity_id: cover.garage_door
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Garage door is open"
        message: "The garage door is still open, and you just left home."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
