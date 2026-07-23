---
title: "Open URL"
action: system_bridge.open_url
domain: system_bridge
description: "Opens a URL on a System Bridge server with the default application."
related_actions:
  - system_bridge.open_path
---

The **Open URL** action opens a URL on a System Bridge server using the default application, such as the default web browser.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To open a URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Open URL**.
6. Select the **Bridge** server and enter the **URL** to open.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to talk to.
  required: true
URL:
  description: The URL to open.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.open_url`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.open_url
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    url: "https://www.home-assistant.io"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to talk to.
  required: true
  type: string
url:
  description: The URL to open.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response confirms the URL that was opened and includes the following fields:

- `id`: The ID of the request.
- `type`: The result type, such as `OPENED`.
- `data`: The data that was sent, such as the `url` that was opened.
- `message`: A human-readable result message.

An example of the response looks like this:

```yaml
id: abc123
type: OPENED
data:
  url: https://www.home-assistant.io
message: URL opened
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
