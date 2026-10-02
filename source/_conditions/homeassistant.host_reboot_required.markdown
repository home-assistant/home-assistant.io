---
title: "Host reboot required"
condition: homeassistant.host_reboot_required
domain: homeassistant
description: "Tests if the host needs a reboot to apply installed updates or changed settings."
related_conditions:
  - homeassistant.restart_required
---

The **Host reboot required** condition passes while the system Home Assistant runs on needs a reboot, for example after an update of Home Assistant OS. This is only available on Home Assistant OS.

Use it to hold off a routine while a reboot is pending, or to be reminded about it at a moment that suits you.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Host reboot required**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `homeassistant.host_reboot_required`. It has no options:

{% example %}
condition: |
  condition: homeassistant.host_reboot_required
{% endexample %}

This passes while a reboot is pending.

## Good to know

- This condition only passes on Home Assistant OS. On other installation types, Home Assistant does not manage the host, so it never needs a reboot.
- The reboot stays pending until the host reboots, also when you restart Home Assistant in the meantime.
- To act the moment a reboot becomes pending, use the [Host reboot required](/triggers/homeassistant.host_reboot_required/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: weekly reboot reminder

Every Sunday morning, send a reminder, but only while the host needs a reboot.

- **Trigger**: Time
  - **At time**: 10:00:00 AM
  - **Weekdays**: Sunday
- **Condition**: Host reboot required
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a weekly reboot reminder" %}

{% example %}
automation: |
  alias: "Weekly reboot reminder"
  triggers:
    - trigger: time
      at: "10:00:00"
      weekday: sun
  conditions:
    - condition: homeassistant.host_reboot_required
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Home Assistant host still needs a reboot."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
