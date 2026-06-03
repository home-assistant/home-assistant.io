---
title: "Home Assistant"
trigger: homeassistant
domain: homeassistant
description: "Triggers when Home Assistant starts up or shuts down."
related_triggers:
  - event
  - time
---

The **Home Assistant** trigger is useful when you want an automation to run when Home Assistant starts or begins shutting down. Use it to restore part of your setup after a restart, send a status message, or save state before maintenance.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select the type of trigger to add.
5. Select **Home Assistant**.
6. Under **Event:**, select **Start** or **Shutdown**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Event:
  description: Select whether the automation should run when Home Assistant starts or shuts down.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: homeassistant` with `event: start` or `event: shutdown`. A basic example looks like this:

{% example %}
trigger: |
  trigger: homeassistant
  event: start
{% endexample %}

This runs when Home Assistant starts.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `homeassistant`.
  required: true
  type: string
event:
  description: The Home Assistant lifecycle event to watch. Use `start` or `shutdown`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Use `start` to run an automation after Home Assistant finishes starting.
- Use `shutdown` to run an automation before Home Assistant stops. Shutdown automations have 20 seconds to run.
- This trigger does not use a target because it applies to the Home Assistant instance itself.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, restart Home Assistant from {% my restart title="**Settings** > **System** > **Restart**" %}.

{% include triggers/more_examples.md %}

### Automation: send a notification when Home Assistant starts

If you restart Home Assistant for an update or maintenance, this automation lets you know when it is ready again.

- **Trigger**: Home Assistant
  - **Event**: Start
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when Home Assistant starts" %}

{% example %}
automation: |
  alias: "Notify when Home Assistant starts"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Home Assistant has started."
{% endexample %}

{% enddetails %}

### Automation: save persistent states before Home Assistant shuts down

If you are about to restart or stop Home Assistant, this automation tells Home Assistant to save persistent states right away.

- **Trigger**: Home Assistant
  - **Event**: Shutdown
- **Action**: Save persistent states

{% details "YAML example for saving persistent states before shutdown" %}

{% example %}
automation: |
  alias: "Save persistent states before shutdown"
  triggers:
    - trigger: homeassistant
      event: shutdown
  actions:
    - action: homeassistant.save_persistent_states
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
