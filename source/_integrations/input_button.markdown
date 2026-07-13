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

The **Input button** {% term integration %} lets you create a button {% term helper %}: an entity you can press, but that does not store an on or off {% term state %}. Because the button is not tied to a physical device, you can use it to start something from the user interface, such as running a script or triggering an {% term automation %}. For example, you can create a button helper to ring a doorbell chime, restart a routine, or send yourself a notification.

When you press a button helper, Home Assistant records the timestamp of the press. Your automations can use that press as a trigger, which makes a button helper a convenient way to start an action from a dashboard.

## Configuration


1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, and select **Create helper**.
2. Select **{% my config_flow_start domain="input_button" title="Button" %}**.

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
an action.

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

{% include integrations/actions.md %}

## Troubleshooting

### The Button helper option is missing from the user interface

#### Symptom

When you go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} to add a helper, the **Button** option is not listed.

#### Description

Button helpers are provided through [`default_config:`](/integrations/default_config/), which is part of your {% term "`configuration.yaml`" %} by default. If you removed `default_config:`, the option is no longer available.

#### Resolution

1. Add `input_button:` to your {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. After the restart, create your button helpers from the user interface.
