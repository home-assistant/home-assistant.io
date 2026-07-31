---
title: "Garage door opened"
trigger: garage_door.opened
domain: garage_door
description: "Triggers when one or more garage doors open."
related_triggers:
  - garage_door.closed
---

The **Garage door opened** trigger fires when a targeted garage door changes to open. Use it when you want Home Assistant to respond as soon as a garage door starts to open or is detected as open.

This trigger is useful for turning on lights when you arrive, sending alerts if the garage opens while nobody is home, and starting routines that depend on access to the garage.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Garage door opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your garage door is in, like your garage or driveway. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the garage door must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple garage doors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted garage door opens, **First** to fire only when the first targeted garage door opens, or **All** to fire only after every targeted garage door is open.
For at least:
  description: How long the garage door must stay open before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `garage_door.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: garage_door.opened
  target:
    entity_id: cover.garage_door
{% endexample %}

This fires when `cover.garage_door` opens.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple garage doors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the garage door must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a garage door contact sensor with the garage door device class or a garage door cover with the garage device class.
- If an entity comes back from `unavailable` or `unknown`, that recovery does not count as the garage door opening.
- The `for` option only fires the automation if the garage door stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the garage entry light when the garage door opens after dark

If you come home after sunset, this automation turns on the light near the garage entry as soon as the garage door opens.

- **Trigger**: Garage door opened
  - **Target**: Garage door
- **Action**: Turn on light

{% details "YAML example for turning on the garage entry light" %}

{% example %}
automation: |
  alias: "Turn on the garage entry light when the garage door opens after dark"
  triggers:
    - trigger: garage_door.opened
      target:
        entity_id: cover.garage_door
  conditions:
    - condition: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: 0
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garage_entry
{% endexample %}

{% enddetails %}

### Automation: notify you if the garage door opens while nobody is home

If the garage door opens after everyone has left, this automation sends a notification right away so you can check what happened.

- **Trigger**: Garage door opened
  - **Target**: Garage door
- **Condition**: Numeric state
  - **Entity**: Home zone
  - **Below**: 1
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying you when the garage door opens away from home" %}

{% example %}
automation: |
  alias: "Notify if the garage door opens while nobody is home"
  triggers:
    - trigger: garage_door.opened
      target:
        entity_id: binary_sensor.garage_door_contact
  conditions:
    - condition: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Garage door opened"
        message: "The garage door opened while nobody was home."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
