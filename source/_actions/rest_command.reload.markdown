---
title: "Reload"
action: rest_command.reload
domain: rest_command
description: "Reloads YAML-defined RESTful commands."
related_actions:
  - rest_command.call_endpoint
---

The **Reload** action reloads RESTful commands defined in `configuration.yaml` without restarting Home Assistant. UI-managed endpoints are not changed.

{% include actions/ui_header.md %}

To reload YAML-defined RESTful commands:

1. Go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
2. Search for and select **Reload**.
3. Select **Perform action**.

This action does not support action targets or additional options.

### Options in the UI

The action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rest_command.reload`:

{% example %}
action: |
  action: rest_command.reload
{% endexample %}

### Options in YAML

The action has no YAML options.

## Good to know

- Home Assistant validates the replacement YAML before changing registered RESTful Command actions.
- The `rest_command.reload` action name is reserved and cannot be used as a YAML command name.
- For backward compatibility, a YAML command named `call_endpoint` takes precedence over the action for UI-managed endpoints.
- Reloading YAML-defined commands does not reload or reconfigure UI-managed endpoints.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload commands after a configuration workflow

Call the action from a script after you have updated and checked your YAML configuration.

- **Action**: Reload

{% details "YAML example for a RESTful Command reload script" %}

{% example %}
script: |
  reload_restful_commands:
    alias: "Reload RESTful commands"
    sequence:
      - action: rest_command.reload
{% endexample %}

{% enddetails %}

### Automation: reload commands at Home Assistant start

Reload YAML-defined RESTful commands when Home Assistant starts. This can be useful when another startup workflow updates an included YAML file before this automation runs.

- **Trigger**: Home Assistant starts
- **Action**: Reload

{% details "YAML example for reloading commands at startup" %}

{% example %}
automation: |
  alias: "Reload RESTful commands at startup"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: rest_command.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
