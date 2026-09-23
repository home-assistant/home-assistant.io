---
title: "Lock lock"
action: lock.lock
domain: lock
description: "Locks one or more locks."
related_actions:
  - lock.unlock
---

The **Lock lock** action lets you secure a door from an automation or script. Use it when you want Home Assistant to lock a door after a routine, like when everyone leaves, or after a door has been left unlocked for too long.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your lock is in, like your front door or garage entry. You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Lock lock**.
7. _Optional_: Enter **Code** if your lock requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to use when locking the door, if your lock requires one.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lock.lock`. A basic example looks like this:

{% example %}
action: |
  action: lock.lock
  target:
    entity_id: lock.front_door
{% endexample %}

This locks `lock.front_door`.

If your lock requires a code, include it in the `data` section:

{% example %}
action: |
  action: lock.lock
  target:
    entity_id: lock.front_door
  data:
    code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to use when locking the door, if your lock requires one.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Some locks require a code, and others do not.
- A lock may already have a default code configured by its integration.
- To do the opposite action, use [Unlock](/actions/lock.unlock/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lock the front door every night

If you want a simple nightly routine, lock the front door at the same time each evening. This automation locks the door at 11 PM.

- **Trigger**: Time: 23:00
- **Action**: Lock lock
- **Target**: Front door lock

{% details "YAML example for locking the front door every night" %}

{% example %}
automation: |
  alias: "Lock the front door every night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: lock the back door after it stays unlocked for 10 minutes

If a back door is often left unlocked, you can have Home Assistant secure it for you. This automation locks the back door after it has stayed unlocked for 10 minutes.

- **Trigger**: Lock unlocked
- **Target**: Back door lock
- **Trigger when**: Each
- **For at least**: 00:10:00
- **Action**: Lock lock

{% details "YAML example for locking a door after it stays unlocked" %}

{% example %}
automation: |
  alias: "Lock the back door after 10 minutes"
  triggers:
    - trigger: lock.unlocked
      target:
        entity_id: lock.back_door
      options:
        behavior: each
        for: "00:10:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.back_door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
