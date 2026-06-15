---
title: "Write data to app stdin"
action: hassio.app_stdin
domain: hassio
description: "Writes data to the standard input of a Home Assistant app."
related_actions:
  - hassio.app_start
  - hassio.app_stop
  - hassio.app_restart
---

Use this action to send data to the standard input (stdin) of an app. Apps were previously called add-ons. This only works for apps that are built to read commands from stdin, so check the app's documentation before you use it.

{% include actions/ui_header.md %}

To write to an app's stdin from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Write data to app stdin**.
6. Select the **App** to write to, and enter the **Input** to send.
7. Select **Save**.

### Options in the UI

{% options_ui %}
App:
  description: The app to write to.
Input:
  description: The data to write to the app's standard input.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.app_stdin`. A basic example looks like this:

{% example %}
action: |
  action: hassio.app_stdin
  data:
    app: core_ssh
    input:
      command: "restart"
{% endexample %}

Use the slug of the app, which you can find on the app's page under **Settings** > **Add-ons**.

### Options in YAML

{% options_yaml %}
app:
  description: The slug of the app to write to.
  required: true
  type: string
input:
  description: The data to write to the app's standard input.
  required: true
  type: map
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.
- The app has to be running and built to read from stdin. Check the app's documentation for the data it expects.

{% include actions/stuck.md %}

{% include actions/related.md %}
