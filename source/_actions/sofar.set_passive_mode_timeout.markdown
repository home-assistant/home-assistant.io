---
title: "Set passive mode timeout"
action: sofar.set_passive_mode_timeout
domain: sofar
description: "Sets how long a passive-mode command holds, and what the inverter does when it expires."
related_actions:
  - sofar.set_passive_mode_power
  - sofar.set_feed_in_limit
  - sofar.set_active_power_limit
---

Use this action to control how long a [passive-mode power command](/actions/sofar.set_passive_mode_power/) stays in effect before the inverter falls back to its normal behavior, and what "falling back" means. Only available on inverters with battery storage.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the passive-mode timeout from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sofar: Set passive mode timeout**.
6. Select the **Inverter**, the **Timeout**, and the **Timeout action**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Inverter:
  description: The Sofar inverter to send this to.
  required: true
Timeout:
  description: How long a passive-mode command holds, in seconds.
  required: true
Timeout action:
  description: What the inverter does once the timeout expires.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sofar.set_passive_mode_timeout`. A basic example looks like this:

{% example %}
action: |
  action: sofar.set_passive_mode_timeout
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    timeout: 300
    action: return_to_previous_mode
{% endexample %}

This sets a 300-second timeout, after which the inverter returns to whatever mode it was in before passive mode started.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Sofar inverter to send this to.
  required: true
  type: string
timeout:
  description: >
    How long a passive-mode command holds, in seconds.
  required: true
  type: integer
action:
  description: >
    What the inverter does once the timeout expires: return to whatever
    mode it was in before (`return_to_previous_mode`), or go to standby
    (`force_standby`).
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action is only available on inverters with battery storage. If the config entry you select doesn't serve the passive-mode registers, the action fails with an error instead of doing nothing silently.
- Set the timeout before, or together with, your first [Set passive mode power](/actions/sofar.set_passive_mode_power/) call, so a script that stops running unexpectedly doesn't leave the inverter following a stale command indefinitely.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep a short leash on passive mode

When you script passive-mode power directly, it's easy to forget to set a sensible timeout. This automation sets a 2-minute timeout with a fallback to the inverter's previous mode every time Home Assistant starts, so passive mode can never run away with a stale command after a restart.

- **Trigger**: Home Assistant, started
- **Action**: Sofar: Set passive mode timeout

{% details "YAML example for a startup timeout reset" %}

{% example %}
automation: |
  alias: "Reset Sofar passive-mode timeout on startup"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: sofar.set_passive_mode_timeout
      data:
        config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        timeout: 120
        action: return_to_previous_mode
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
