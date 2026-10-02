---
title: "Restart required"
trigger: homeassistant.restart_required
domain: homeassistant
description: "Triggers when Home Assistant needs a restart to apply installed updates or changed settings."
related_triggers:
  - homeassistant.host_reboot_required
---

The **Restart required** trigger fires when Home Assistant starts needing a restart, for example after you installed an update of a custom integration, or changed a setting that only applies after a restart.

Use it to know about it without opening Home Assistant, for example to send a notification to your phone, so you can restart at a moment that suits you.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Restart required**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `homeassistant.restart_required`. It has no options:

{% example %}
trigger: |
  trigger: homeassistant.restart_required
{% endexample %}

In templates, `trigger.sources` holds the integrations that asked for the restart when the trigger fired, such as `["hacs"]`.

## Good to know

- The trigger fires once, when the first integration asks for a restart. More integrations asking after that do not fire it again, because the restart is already pending.
- The restart stays pending until Home Assistant restarts. Nothing else clears it.
- If a restart was already pending when the automation was turned on, the trigger does not fire for it. To check for a pending restart, use the [Restart required](/conditions/homeassistant.restart_required/) condition.
- If the host needs a reboot, use the [Host reboot required](/triggers/homeassistant.host_reboot_required/) trigger. A reboot restarts Home Assistant as well.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, install an update that needs a restart, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: notify when a restart is needed

When Home Assistant needs a restart, send a notification with the integrations that asked for it.

- **Trigger**: Restart required
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a restart notification" %}

{% example %}
automation: |
  alias: "Notify when a restart is needed"
  triggers:
    - trigger: homeassistant.restart_required
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Home Assistant needs a restart for: {{ trigger.sources | join(', ') }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
