---
title: "Power command"
action: system_bridge.power_command
domain: system_bridge
description: "Sends a power command to a System Bridge server."
related_actions:
  - system_bridge.send_keypress
  - system_bridge.send_text
---

The **Power command** action sends a power command to a System Bridge server, such as putting it to sleep, locking it, or shutting it down.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To send a power command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Power command**.
6. Select the **Bridge** server and the **Command** to send.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to talk to.
  required: true
Command:
  description: The power command to send. One of hibernate, lock, logout, restart, shutdown, or sleep.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.power_command`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.power_command
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    command: sleep
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to talk to.
  required: true
  type: string
command:
  description: >
    The power command to send. One of `hibernate`, `lock`, `logout`,
    `restart`, `shutdown`, or `sleep`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response confirms the command that was sent and includes the following fields:

- `id`: The ID of the request.
- `type`: The result type, such as `POWER_SLEEPING`.
- `data`: Any additional data returned with the result.
- `message`: A human-readable result message.

An example of the response looks like this:

```yaml
id: abc123
type: POWER_SLEEPING
data:
message: Sleeping
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
