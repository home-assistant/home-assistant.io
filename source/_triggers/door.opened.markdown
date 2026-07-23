---
title: "Door opened"
trigger: door.opened
domain: door
description: "Triggers when one or more doors open."
related_triggers:
  - door.closed
---

The **Door opened** trigger fires when a targeted door changes to open. Use it when you want Home Assistant to respond the moment someone opens a front door, patio door, or garage door.

This trigger is useful for entry lighting, arrival notifications, security checks, and automations that should start as soon as access to a room or building changes.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Door opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your door is in, like your entryway or garage. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the door must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple doors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted door opens, **First** to fire only when the first targeted door opens, or **All** to fire only after every targeted door is open.
For at least:
  description: How long the door must stay open before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `door.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: door.opened
  target:
    entity_id: binary_sensor.front_door
{% endexample %}

This fires when `binary_sensor.front_door` opens.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple doors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the door must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with door contact sensors and door covers, like garage doors, as long as they use the `door` device class.
- If an entity comes back from `unavailable` or `unknown`, that recovery does not count as opening the door.
- The `for` option only fires the automation if the door stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the entry light when the front door opens after dark

If someone comes home after sunset, this automation turns on the entry light as soon as the front door opens. It gives you light right where you need it instead of leaving the hallway dark.

- **Trigger**: Door opened
- **Target**: Front door sensor
- **Action**: Turn on light

{% details "YAML example for entry lighting on arrival" %}

{% example %}
automation: |
  alias: "Turn on entry light when front door opens after dark"
  triggers:
    - trigger: door.opened
      target:
        entity_id: binary_sensor.front_door
  conditions:
    - condition: numeric_state
      entity_id: sun.sun
      attribute: elevation
      below: 0
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entryway
{% endexample %}

{% enddetails %}

### Automation: notify you if the garage door opens after you leave home

If the garage door opens after you leave home, you probably want to know right away. This automation waits 30 seconds, then sends a notification so brief movement does not alert you unnecessarily.

- **Trigger**: Door opened
  - **Target**: Garage door
  - **For at least**: 00:00:30
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a garage-door alert after leaving home" %}

{% example %}
automation: |
  alias: "Notify when garage door opens after leaving home"
  triggers:
    - trigger: door.opened
      target:
        entity_id: cover.garage_door
      options:
        for: "00:00:30"
  conditions:
    - condition: state
      entity_id: person.frenck
      state: "not_home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Garage door opened"
        message: "The garage door has been open for 30 seconds after you left home."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
