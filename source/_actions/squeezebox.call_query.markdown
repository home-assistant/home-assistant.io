---
title: Call query
action: squeezebox.call_query
domain: squeezebox
description: "Call a custom Squeezebox JSON-RPC API query and store the result on the player."
related_actions:
  - squeezebox.call_method
---

Use this action to run a custom query against the Squeezebox JSON-RPC API. Unlike [Call method](/actions/squeezebox.call_method/), this action stores the result of the query in the `query_result` attribute of the Squeezebox player, so you can read it back in a later step.

You can find the available commands in the API documentation at `http://HOST:PORT/html/docs/cli-api.html?player=`, where `HOST` and `PORT` are the host name and port of your Lyrion Music Server.

{% include actions/ui_header.md %}

To run a query from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Squeezebox players you want to query.
6. From the actions shown for that target, select **Call query**.
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

In YAML, refer to this action as `squeezebox.call_query`. A basic example looks like this:

{% example %}
action: |
  action: squeezebox.call_query
  target:
    entity_id: media_player.kitchen
  data:
    command: albums
    parameters:
      - "0"
      - "20"
      - "search:Revolver"
{% endexample %}

This queries the server for albums matching "Revolver" and stores the result in the player's `query_result` attribute.

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

- The result of the query is stored in the `query_result` attribute of the targeted Squeezebox player. You can read it in a later step using a template, for example `{{ state_attr('media_player.kitchen', 'query_result') }}`.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
