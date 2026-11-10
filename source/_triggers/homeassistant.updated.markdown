---
title: "Home Assistant updated"
trigger: homeassistant.updated
domain: homeassistant
description: "Triggers once after Home Assistant starts on a different version than it ran before."
related_triggers:
  - homeassistant
  - homeassistant.restart_required
---

The **Home Assistant updated** trigger fires once, after Home Assistant has started on a different version than it ran before, not only after an update. It doesn't fire on a normal restart.

Use it to do something after an update, for example, to send a notification with the version you updated from and to, or to reload something that needs the new version.

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

## Trigger variables

When the trigger reacts, the `trigger` variable contains the following data:

- `trigger.from_version`: The version that Home Assistant ran before.
- `trigger.to_version`: The version that Home Assistant runs now.

For the data that all triggers include, refer to [Trigger data in templates](/docs/automation/trigger-data/#properties-of-all-triggers).

## Good to know

- The trigger fires when Home Assistant has finished starting, once per version change.
- A downgrade, for example, after you restore an older backup, also counts as a version change.
- The automation must be turned on when Home Assistant starts. If you create or turn on the automation later, the trigger doesn't fire until the next update.
- To run an automation on every start of Home Assistant, not only after an update, use the [Home Assistant](/triggers/homeassistant/) trigger with **Start**.

{% include triggers/try_it.md %}

This trigger has no target entity to change. To test it, save and turn on the automation before the next Home Assistant version change. A normal restart won't fire it, and **Run actions** doesn't provide the version variables used by the notification example.

{% include triggers/more_examples.md %}

### Automation: Notify after an update

- **Trigger**: Home Assistant updated
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: `Home Assistant updated from {{ trigger.from_version }} to {{ trigger.to_version }}.`

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
        message: "Home Assistant updated from {{ trigger.from_version }} to {{ trigger.to_version }}."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}