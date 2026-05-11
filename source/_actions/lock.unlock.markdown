---
title: "Unlock lock"
action: lock.unlock
domain: lock
description: "Unlocks one or more locks."
related_actions:
  - lock.lock
  - lock.open
---

The **Unlock lock** action lets you release a lock from an automation or script. Use it when you want Home Assistant to let someone in, prepare for an arrival, or remove one step from an emergency exit path.

The difference between **Unlock lock** and [Open lock](/actions/lock.open/) is that **Unlock lock** only changes the lock to the unlocked state, while **Open lock** unlatches the door on locks that support that feature. If you want to unlock the door but not unlatch it, use **Unlock lock**. If you want the door ready to push open right away, use [Open lock](/actions/lock.open/).

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Unlock lock**.
7. _Optional_: Enter **Code** if your lock requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to use when unlocking the door, if your lock requires one.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lock.unlock`. A basic example looks like this:

{% example %}
action: |
  action: lock.unlock
  target:
    entity_id: lock.front_door
{% endexample %}

This unlocks `lock.front_door`.

If your lock requires a code, include it in the `data` section:

{% example %}
action: |
  action: lock.unlock
  target:
    entity_id: lock.front_door
  data:
    code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to use when unlocking the door, if your lock requires one.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Some locks require a code, and others do not.
- A lock may already have a default code configured by its integration.
- To release a latch on a supported lock instead of only unlocking it, use [Open](/actions/lock.open/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: unlock the front door when you arrive home

If you want a smoother arrival, Home Assistant can unlock the front door when you get home. This automation unlocks the door when your person entity changes to home.

- **Trigger**: Person changes to home
- **Action**: Unlock lock
- **Target**: Front door lock

{% details "YAML example for unlocking the front door on arrival" %}

{% example %}
automation: |
  alias: "Unlock the front door on arrival"
  triggers:
    - trigger: state
      entity_id: person.alex
      to: home
  actions:
    - action: lock.unlock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: unlock the front door during a smoke alarm

If you want to remove one step during an emergency, Home Assistant can unlock the front door when smoke is detected. This automation unlocks the door as soon as a smoke sensor reports smoke.

- **Trigger**: Smoke detected
- **Action**: Unlock lock
- **Target**: Front door lock

{% details "YAML example for unlocking a door during a smoke alarm" %}

{% example %}
automation: |
  alias: "Unlock the front door when smoke is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hall_smoke
      to: "on"
  actions:
    - action: lock.unlock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
