---
title: "Command"
action: webostv.command
domain: webostv
description: "Sends a generic command to an LG webOS TV."
related_actions:
  - webostv.button
  - webostv.select_sound_output
---

Use this action to send a generic command to your LG webOS TV. This is handy when you want to control something that doesn't have its own action, for example to open an app or call a specific endpoint on the TV.

You provide the endpoint of the command and, when needed, a payload with extra details. The full list of known endpoints is available in the [aiowebostv endpoints reference](https://github.com/home-assistant-libs/aiowebostv/blob/main/aiowebostv/endpoints.py).

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the TV you want to control.
6. From the actions shown for that target, select **Command**.
7. Set the **Command** and, if needed, a **Payload**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The endpoint of the command to send, for example system.launcher/open.
Payload:
  description: An optional payload to send with the command, as one or more key-value pairs.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `webostv.command`. A basic example that opens a web page looks like this:

{% example %}
action: |
  action: webostv.command
  target:
    entity_id: media_player.lg_webos_tv
  data:
    command: "system.launcher/open"
    payload:
      target: "https://www.google.com"
{% endexample %}

### Options in YAML

{% options_yaml %}
command:
  description: The endpoint of the command to send, for example system.launcher/open.
  required: true
  type: string
payload:
  description: An optional payload to send with the command, as one or more key-value pairs.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Response data

This action can return the raw response from the TV. The contents depend on the command you send, so the fields vary from one endpoint to another. To capture the response, set a `response_variable` and use it in a later step.

## Good to know

- The available endpoints and their payloads are defined by the TV, not by Home Assistant. See the [aiowebostv endpoints reference](https://github.com/home-assistant-libs/aiowebostv/blob/main/aiowebostv/endpoints.py) for known endpoints.
- To simulate a remote button press instead of sending an endpoint, use the [Button](/actions/webostv.button/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
