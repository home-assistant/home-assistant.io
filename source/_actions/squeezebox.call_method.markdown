---
title: Call method
action: squeezebox.call_method
domain: squeezebox
description: "Call a custom Squeezebox JSON-RPC API command on a Lyrion Music Server."
related_actions:
  - squeezebox.call_query
---

Use this action to call a custom command on the Squeezebox JSON-RPC API. This lets you reach Squeezebox features that do not have their own action in Home Assistant, so you can wire almost any Squeezebox command into an automation or script.

You can find the available commands in the API documentation at `http://HOST:PORT/html/docs/cli-api.html?player=`, where `HOST` and `PORT` are the host name and port of your Lyrion Music Server.

{% include actions/ui_header.md %}

To call a method from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Squeezebox players you want to run the command on.
6. From the actions shown for that target, select **Call method**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The command to pass to the Lyrion Music Server (`p0` in the CLI documentation).
Parameters:
  description: A list of additional parameters to pass to the Lyrion Music Server (`p1` to `pN` in the CLI documentation).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `squeezebox.call_method`. A basic example looks like this:

{% example %}
action: |
  action: squeezebox.call_method
  target:
    entity_id: media_player.squeezebox_radio
  data:
    command: mixer
    parameters:
      - muting
{% endexample %}

This toggles the muting state of the player by calling the `mixer` command with the `muting` parameter.

### Options in YAML

{% options_yaml %}
command:
  description: The command to pass to the Lyrion Music Server (`p0` in the CLI documentation).
  required: true
  type: string
parameters:
  description: A list of additional parameters to pass to the Lyrion Music Server (`p1` to `pN` in the CLI documentation).
  required: false
  type: list
{% endoptions_yaml %}

## Good to know

- In the visual editor, each parameter must be preceded by a hyphen and a space so it populates the list correctly.
- When a parameter is an increment or decrement, put the value in quotes. For example, to raise the volume by five percent, use the `mixer` command with the parameters `volume` and `"+5"`.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
