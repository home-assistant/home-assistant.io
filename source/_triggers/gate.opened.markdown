---
title: "Gate opened"
trigger: gate.opened
domain: gate
description: "Triggers when one or more gates open."
related_triggers:
  - gate.closed
---

The **Gate opened** trigger fires when a targeted gate changes to open. Use it when you want Home Assistant to react as soon as a driveway, courtyard, or community gate opens.

This trigger is useful for arrival lighting, security notifications, and routines that should begin the moment a gate gives access to your property.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Gate opened**.
5. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your gate is in, like your driveway or courtyard. You can also select a floor, a device, a specific entity, or a label.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, enter how long the gate must stay open before the trigger fires. Leave it at zero to fire right away.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple gates are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted gate opens, **First** to fire only when the first targeted gate opens, or **All** to fire only after every targeted gate is open.
For at least:
  description: How long the gate must stay open before the trigger fires. Set it to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `gate.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: gate.opened
  target:
    entity_id: cover.driveway_gate
{% endexample %}

This fires when `cover.driveway_gate` opens.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple gates are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the gate must stay open before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a cover entity with the gate device class.
- If a gate comes back from **Unavailable** or **Unknown**, that recovery does not count as the gate opening.
- The **For at least** option only fires the automation if the gate stays open for the entire time you set.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the driveway lights when the gate opens after dark

If you come home after sunset, this automation turns on the driveway lights as soon as the gate opens. That gives you light where you need it without leaving the lights on all evening.

- **Trigger**: Gate opened
   - **Target**: Driveway gate
- **Action**: Turn on light

{% details "YAML example for driveway lights when the gate opens" %}

{% example %}
automation: |
  alias: "Turn on driveway lights when the gate opens after dark"
  triggers:
    - trigger: gate.opened
      target:
        entity_id: cover.driveway_gate
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.driveway
{% endexample %}

{% enddetails %}

### Automation: notify you if the gate opens while you are away

If the gate opens after everyone has left home, this automation sends a notification right away. It helps you spot an unexpected visitor or a gate that someone forgot to secure.

- **Trigger**: Gate opened
  - **Target**: Driveway gate
  - **For at least**: 00:00:10
- **Action**: Send a notification message
  - **Target**: Mobile app

{% details "YAML example for a gate-opened alert while away" %}

{% example %}
automation: |
  alias: "Notify when the gate opens while I am away"
  triggers:
    - trigger: gate.opened
      target:
        entity_id: cover.driveway_gate
      options:
        for: "00:00:10"
  conditions:
    - condition: state
      entity_id: person.frenck
      state: "not_home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_mobile_app
      data:
        title: "Gate opened"
        message: "The driveway gate opened while you were away."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
