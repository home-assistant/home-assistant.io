---
title: "Restart required"
condition: homeassistant.restart_required
domain: homeassistant
description: "Tests if Home Assistant needs a restart to apply installed updates or changed settings."
related_conditions:
  - homeassistant.host_reboot_required
---

The **Restart required** condition passes while Home Assistant needs a restart, for example after you installed an update of a custom integration, or changed a setting that only applies after a restart.

Use it to hold off a routine while a restart is pending, or the opposite: to restart at night, but only when a restart is actually needed.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Restart required**.
5. Select **Save**.

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `homeassistant.restart_required`. It has no options:

{% example %}
condition: |
  condition: homeassistant.restart_required
{% endexample %}

This passes while a restart is pending.

## Good to know

- The restart stays pending until Home Assistant restarts. Nothing else clears it.
- To act the moment a restart becomes pending, use the [Restart required](/triggers/homeassistant.restart_required/) trigger.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: restart at night when needed

Every night at 4:00, restart Home Assistant, but only when a restart is pending.

- **Trigger**: Time
  - **At time**: 4:00:00 AM
- **Condition**: Restart required
- **Action**: Restart Home Assistant

{% details "YAML example for a nightly restart" %}

{% example %}
automation: |
  alias: "Restart at night when needed"
  triggers:
    - trigger: time
      at: "04:00:00"
  conditions:
    - condition: homeassistant.restart_required
  actions:
    - action: homeassistant.restart
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
