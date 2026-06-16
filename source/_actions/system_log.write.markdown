---
title: "Write to system log"
action: system_log.write
domain: system_log
description: "Writes a custom entry to the Home Assistant system log."
related_actions:
  - system_log.clear
---

The **Write to system log** action adds your own entry to the system log. This is handy for debugging automations: you can record that a certain step ran, or log a message at a chosen severity so it stands out in your logs.

{% include actions/ui_header.md %}

To write to the system log from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Log: Write to system log**.
6. Enter the **Message**, and optionally a **Level** and a **Logger**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Message:
  description: The message to write to the log.
  required: true
Level:
  description: The severity to log the message at. One of debug, info, warning, error, or critical. Defaults to error.
  required: false
Logger:
  description: The logger name to write the message under. Defaults to homeassistant.components.system_log.external.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_log.write`. A basic example looks like this:

{% example %}
action: |
  action: system_log.write
  data:
    message: "Something went wrong"
    level: error
{% endexample %}

This writes the message `Something went wrong` to the log at the error level.

### Options in YAML

{% options_yaml %}
message:
  description: >
    The message to write to the log.
  required: true
  type: string
level:
  description: >
    The severity to log the message at. One of debug, info, warning,
    error, or critical.
  required: false
  type: string
  default: error
logger:
  description: >
    The logger name to write the message under.
  required: false
  type: string
  default: homeassistant.components.system_log.external
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
