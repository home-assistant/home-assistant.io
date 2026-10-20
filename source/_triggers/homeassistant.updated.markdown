---
title: "Home Assistant updated"
trigger: homeassistant.updated
domain: homeassistant
description: "Triggers once after Home Assistant starts on a different version than it ran before."
related_triggers:
  - homeassistant
  - homeassistant.restart_required
---

The **Home Assistant updated** trigger fires once after Home Assistant starts on a different version than the one it ran before. That is usually after an update, but going back to an older version, for example by restoring a backup, fires it too. The versions tell you which way it went.

Use it to act right after an update, for example to send a notification with the new version, or to run the checks you like to do after every update.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Home Assistant updated**.
5. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `homeassistant.updated`. It has no options:

{% example %}
trigger: |
  trigger: homeassistant.updated
{% endexample %}

In templates, `trigger.from_version` holds the version Home Assistant ran before, and `trigger.to_version` the version it runs now, such as `2026.10.3` and `2026.11.0`.

## Good to know

- The trigger fires once, right after Home Assistant has started on the new version. A restart on the same version does not fire it.
- The first start of a new installation does not fire it. There is no version from before to compare with.
- It works on every installation type, such as Home Assistant OS and Home Assistant Container.
- If the automation is turned on, or automations are reloaded, after Home Assistant has started, the trigger does not fire for that start. It only fires for automations that are ready when Home Assistant starts.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, update Home Assistant, or temporarily switch to a trigger you can control while you build the rest of the automation.

{% include triggers/more_examples.md %}

### Automation: notify after an update

When Home Assistant was updated, send a notification with both versions.

- **Trigger**: Home Assistant updated
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an update notification" %}

{% example %}
automation: |
  alias: "Notify after a Home Assistant update"
  triggers:
    - trigger: homeassistant.updated
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Home Assistant was updated from {{ trigger.from_version }}
          to {{ trigger.to_version }}.
{% endexample %}

{% enddetails %}

### Automation: run your checks after an update

After an update, run a {% term script %} you created with the checks you like to do after every update, such as testing a few devices or sending a status report.

- **Trigger**: Home Assistant updated
- **Action**: Turn on script
  - **Target**: After update checks (`script.after_update_checks`)

{% details "YAML example for running a script after an update" %}

{% example %}
automation: |
  alias: "Run checks after a Home Assistant update"
  triggers:
    - trigger: homeassistant.updated
  actions:
    - action: script.turn_on
      target:
        entity_id: script.after_update_checks
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
