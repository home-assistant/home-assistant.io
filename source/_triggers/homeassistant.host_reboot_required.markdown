---
title: "Host reboot required"
trigger: homeassistant.host_reboot_required
domain: homeassistant
description: "Triggers when the host needs a reboot to apply installed updates or changed settings."
related_triggers:
  - homeassistant.restart_required
---

The **Host reboot required** trigger fires when the system Home Assistant runs on needs a reboot, for example after an update of Home Assistant OS. This is only available on Home Assistant OS.

Use it to know about it without opening Home Assistant, for example to send a notification to your phone, so you can reboot at a moment that suits you.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Host reboot required**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `homeassistant.host_reboot_required`. It has no options:

{% example %}
trigger: |
  trigger: homeassistant.host_reboot_required
{% endexample %}

## Good to know

- This trigger only fires on Home Assistant OS. On other installation types, Home Assistant does not manage the host, so it never needs a reboot.
- The reboot stays pending until the host reboots, also when you restart Home Assistant in the meantime.
- If a reboot was already pending when the automation was turned on, the trigger does not fire for it. To check for a pending reboot, use the [Host reboot required](/conditions/homeassistant.host_reboot_required/) condition.
- A reboot restarts Home Assistant as well, so a pending reboot also takes care of a pending [restart](/triggers/homeassistant.restart_required/).

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, wait for the next update that needs a reboot, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: notify when a reboot is needed

When the host needs a reboot, send a notification.

- **Trigger**: Host reboot required
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a reboot notification" %}

{% example %}
automation: |
  alias: "Notify when a reboot is needed"
  triggers:
    - trigger: homeassistant.host_reboot_required
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Home Assistant host needs a reboot."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
