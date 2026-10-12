---
title: "Open lock"
action: lock.open
domain: lock
description: "Unlatches one or more locks that support opening."
related_actions:
  - lock.unlock
---

The **Open lock** action lets you unlatch a supported lock from an automation or script. Use it when you want Home Assistant to open a door for a short, specific moment, like letting someone in after you verify who is there.

The difference between **Open lock** and [Unlock lock](/actions/lock.unlock/) is that **Open lock** unlatches the door on locks that support that feature, while **Unlock lock** only changes the lock to the unlocked state. If you want the door ready to push open right away, use **Open lock**. If you only want to unlock the door, use [Unlock lock](/actions/lock.unlock/).

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Open lock**.
7. _Optional_: Enter **Code** if your lock requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to use when opening the lock, if your lock requires one.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lock.open`. A basic example looks like this:

{% example %}
action: |
  action: lock.open
  target:
    entity_id: lock.front_door
{% endexample %}

This unlatches `lock.front_door`.

If your lock requires a code, include it in the `data` section:

{% example %}
action: |
  action: lock.open
  target:
    entity_id: lock.front_door
  data:
    code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to use when opening the lock, if your lock requires one.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for locks that support opening or unlatching.
- Some locks require a code, and others do not.
- A lock may already have a default code configured by its integration.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: open the front gate when you arrive home

If you have a lockable gate that supports opening, Home Assistant can unlatch it when you arrive. This automation opens the front gate when your person entity changes to home.

- **Trigger**: Person changes to home
- **Action**: Open lock
- **Target**: Front gate lock

{% details "YAML example for opening the front gate on arrival" %}

{% example %}
automation: |
  alias: "Open the front gate on arrival"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: home
  actions:
    - action: lock.open
      target:
        entity_id: lock.front_gate
{% endexample %}

{% enddetails %}

### Automation: open the building door after a button press

If you use a user-created {% term helper %} to expose a dashboard button, you can use that helper to open a supported door. This automation opens the building door when the helper is turned on. Create the helper separately before using this example.

- **Trigger**: User-created helper turns on
- **Action**: Open lock
- **Target**: Building door lock

{% details "YAML example for opening a door from a helper" %}

{% example %}
automation: |
  alias: "Open the building door from a helper"
  triggers:
    - trigger: state
      entity_id: input_boolean.open_building_door
      to: "on"
  actions:
    - action: lock.open
      target:
        entity_id: lock.building_door
    - action: input_boolean.turn_off
      target:
        entity_id: input_boolean.open_building_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
