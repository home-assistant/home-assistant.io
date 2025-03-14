---
title: Input button
description: Instructions on how to use the input button helper with Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 2022.2
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_button
ha_integration_type: helper
---

The **Input button** helper integration allows you to define buttons that
can be pressed via the user interface, and can be used to trigger things,
like an automation.

## Configuration

The preferred way to configure button helpers is via the user interface.
To add one, go to **{% my helpers title="Settings -> Devices & services -> Helpers" %}**
and click the add button; next choose the **{% my config_flow_start domain="input_button" title="Button" %}** option.

To be able to add **Helpers** via the user interface you should have
`default_config:` in your {% term "`configuration.yaml`" %}, it should already be there by
default unless you removed it. If you removed `default_config:` from your
configuration, you must add `input_button:` to your `configuration.yaml` first,
then you can use the UI.

Input buttons can also be configured via {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
input_button:
  ring_bell:
    name: Ring bell
    icon: mdi:bell
```

{% configuration %}
input_button:
  description: Alias for the input. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the input.
      required: false
      type: string
    icon:
      description: Icon to display in front of the input element in the frontend.
      required: false
      type: icon
{% endconfiguration %}

## Automation examples

The `input_button` entity is stateless, as in, it cannot have a state like the
`on` or `off` state that, for example, a normal switch entity has.

Every input button entity does keep track of the timestamp of when the last time
the input button entity has been pressed in the Home Assistant UI or pressed via
a service call.

Because the state of a input button entity in Home Assistant is a timestamp, it
means we can use it in our automations. For example:

```yaml
triggers:
  - trigger: state
    entity_id: input_button.my_button
actions:
  - action: notify.frenck
    data:
      message: "My button has been pressed!"
```

## Actions

The input button entities exposes a single action:
{% my developer_call_service service="input_button.press" %}

This action can be used to trigger a button press for that entity.

```yaml
- action: input_button.press
  target:
    entity_id: input_button.my_button
```
