---
title: "Set lock configuration"
action: zwave_js.set_lock_configuration
domain: zwave_js
description: "Sets the configuration of a Z-Wave lock."
related_actions:
  - zwave_js.set_lock_usercode
  - zwave_js.clear_lock_usercode
---

Use this action to set the configuration of a Z-Wave lock, such as the operation type, auto-relock time, and twist assist. This is handy when you want a lock to relock itself automatically after a set time, or to fine-tune how the motor behaves.

{% include actions/ui_header.md %}

To set the lock configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the locks to configure.
6. From the actions shown for that target, select **Set lock configuration**.
7. Set the **Operation type** and any other options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Operation type:
  description: The operation type of the lock, either timed or constant.
Lock timeout:
  description: Seconds until lock mode times out. Only use this with the timed operation type.
  required: false
Autorelock time:
  description: Seconds until the lock returns to the locked state. Only enforced with the constant operation type.
  required: false
Hold and release time:
  description: Seconds the latch stays retracted.
  required: false
Twist Assist:
  description: Whether the motor should help in locking and unlocking.
  required: false
Block to Block:
  description: Whether the lock should run the motor until it hits resistance.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.set_lock_configuration`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.set_lock_configuration
  target:
    entity_id: lock.front_door
  data:
    operation_type: constant
    auto_relock_time: 30
{% endexample %}

### Options in YAML

{% options_yaml %}
operation_type:
  description: The operation type of the lock, either timed or constant.
  required: true
  type: string
lock_timeout:
  description: Seconds until lock mode times out. Only use this with the timed operation type.
  required: false
  type: integer
auto_relock_time:
  description: Seconds until the lock returns to the locked state. Only enforced with the constant operation type.
  required: false
  type: integer
hold_and_release_time:
  description: Seconds the latch stays retracted.
  required: false
  type: integer
twist_assist:
  description: Whether the motor should help in locking and unlocking.
  required: false
  type: boolean
  default: false
block_to_block:
  description: Whether the lock should run the motor until it hits resistance.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Use the lock timeout with the timed operation type, and the autorelock time with the constant operation type.
- Not every lock supports every option.

{% include actions/stuck.md %}

{% include actions/related.md %}
