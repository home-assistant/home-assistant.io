---
title: "Garage door is open"
condition: garage_door.is_open
domain: garage_door
description: "Tests if one or more garage doors are open."
related_conditions:
  - garage_door.is_closed
---

The **Garage door is open** condition passes when one or more targeted garage doors are currently open. Use it when an automation should continue only if a garage door is still open at the moment the automation runs.

This condition is useful for reminders, security checks, and routines that should warn you when a garage door has been left open.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Garage door is open**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your garage door is in, like your garage or driveway. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the garage door must have stayed open before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple garage doors are targeted, controls how results combine. Pick **Any** to pass if at least one targeted garage door is open, or **All** to pass only when every targeted garage door is open.
For at least:
  description: How long the garage door must have stayed open before the condition passes.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `garage_door.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: garage_door.is_open
  target:
    entity_id: cover.garage_door
{% endexample %}

This passes when `cover.garage_door` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple garage doors are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the garage door must have stayed open before the condition passes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The target must be a garage door contact sensor with the garage door device class or a garage door cover with the garage device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted garage door is open.
- With **All**, the condition passes only if every available targeted garage door is open. If every targeted garage door is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you at bedtime if the garage door is still open

If you have created a {% term helper %} to mark bedtime, this automation can use it to check whether the garage door is still open before you settle in for the night.

- **Trigger**: Bedtime helper turns on
- **Condition**: Garage door is open
  - **Target**: Garage door
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime garage door reminder" %}

{% example %}
automation: |
  alias: "Remind me at bedtime if the garage door is still open"
  triggers:
    - trigger: state
      entity_id: input_boolean.bedtime_mode
      to: "on"
  conditions:
    - condition: garage_door.is_open
      target:
        entity_id: cover.garage_door
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Garage door is open"
        message: "The garage door is still open at bedtime."
{% endexample %}

{% enddetails %}

### Automation: alert you if the garage door is still open after you leave home

When the last person leaves home, this automation checks whether the garage door is still open. If it is, Home Assistant sends an alert so you can close it before getting too far away.

- **Trigger**: Person leaves home zone
- **Condition**: Garage door is open
  - **Target**: Garage door
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for checking the garage door when leaving home" %}

{% example %}
automation: |
  alias: "Alert me if the garage door is open when leaving home"
  triggers:
    - trigger: zone
      entity_id: person.frenck
      zone: zone.home
      event: leave
  conditions:
    - condition: garage_door.is_open
      target:
        entity_id: binary_sensor.garage_door_contact
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
