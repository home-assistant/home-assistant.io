---
title: "Call a Kodi JSON-RPC API method"
action: kodi.call_method
domain: kodi
description: "Calls a Kodi JSON-RPC API method with optional parameters."
related_actions:
  - kodi.add_to_playlist
---

Use this action to call a [Kodi JSON-RPC API](https://kodi.wiki/view/JSON-RPC_API) method, for example to trigger a library scan or run an add-on. You can pass any parameters the method accepts.

{% include actions/ui_header.md %}

To call a method from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Kodi media player.
6. From the actions shown for that target, select **Kodi: Call method**.
7. Enter the **Method** and any parameters it needs.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Method:
  description: The name of the Kodi JSON-RPC API method to call.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kodi.call_method`. A basic example looks like this:

{% example %}
action: |
  action: kodi.call_method
  target:
    entity_id: media_player.kodi
  data:
    method: VideoLibrary.Scan
{% endexample %}

### Options in YAML

{% options_yaml %}
method:
  description: The name of the Kodi JSON-RPC API method to call.
  required: true
  type: string
{% endoptions_yaml %}

In addition to the `method`, you can pass any parameters that the API method accepts.

{% include actions/targets.md domain="media_player" %}

## Good to know

When the Kodi JSON-RPC API returns data, Home Assistant fires a `kodi_call_method_result` event on the event bus, which you can use as an automation trigger. The event data looks like this:

```yaml
entity_id: media_player.kodi
result_ok: true
input: <the input parameters of the action>
result: <the data received from the Kodi API>
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
