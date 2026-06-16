---
title: "Set lock rule"
action: unifi_access.set_lock_rule
domain: unifi_access
description: "Applies a temporary lock rule to a UniFi Access door."
---

Use this action to apply a temporary lock rule to a specific UniFi Access door from an automation or a script. It complements the **Door Lock Rule** select entity and adds support for setting how long the rule stays active.

This action is available for controllers that support temporary lock rules.

{% include actions/ui_header.md %}

To set a lock rule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Access: Set lock rule**.
6. Select the **Device** for the UniFi Access door you want to update.
7. Select the **Rule** you want to apply.
8. Optionally, set the **Interval** to control how long a custom rule stays active.
9. Select **Save**.

This action does not support targets. In the UI, you select the door through the **Device** field instead of choosing an area, device, entity, or label as a target.

### Options in the UI

{% options_ui %}
Device:
  description: The UniFi Access door to update.
  required: true
Rule:
  description: "The lock rule to apply: `keep_lock`, `keep_unlock`, `custom`, `reset`, or `lock_early`."
  required: true
Interval:
  description: How long a `custom` rule stays active, as a duration. Defaults to 10 minutes when left empty. The minimum is 1 minute and the maximum is 8 hours.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifi_access.set_lock_rule`. A basic example looks like this:

{% example %}
action: |
  action: unifi_access.set_lock_rule
  data:
    device_id: 0123456789abcdef0123456789abcdef
    rule: keep_lock
{% endexample %}

This keeps the door locked.

### Options in YAML

{% options_yaml %}
device_id:
  description: The UniFi Access door to update.
  required: true
  type: string
rule:
  description: "The lock rule to apply: `keep_lock`, `keep_unlock`, `custom`, `reset`, or `lock_early`."
  required: true
  type: string
interval:
  description: How long a `custom` rule stays active, as a duration. Defaults to 10 minutes when omitted. The minimum is 1 minute and the maximum is 8 hours.
  required: false
  type: string
{% endoptions_yaml %}

### Automation: keep a door unlocked for half an hour

Apply a custom rule that keeps a door unlocked for 30 minutes when an automation runs.

{% details "YAML example for a timed custom lock rule" %}

{% example %}
automation: |
  alias: "Unlock front door for deliveries"
  triggers:
    - trigger: state
      entity_id: input_boolean.delivery_mode
      to: "on"
  actions:
    - action: unifi_access.set_lock_rule
      data:
        device_id: 0123456789abcdef0123456789abcdef
        rule: custom
        interval:
          hours: 0
          minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}
