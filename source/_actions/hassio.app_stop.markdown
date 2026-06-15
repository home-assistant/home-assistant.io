---
title: "Stop app"
action: hassio.app_stop
domain: hassio
description: "Stops a Home Assistant app."
related_actions:
  - hassio.app_start
  - hassio.app_restart
  - hassio.app_stdin
---

Use this action to stop a running app. Apps were previously called add-ons. A common use is to pair it with **Start app** so an app only runs during the hours you actually need it.

{% include actions/ui_header.md %}

To stop an app from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Stop app**.
6. Select the **App** to stop.
7. Select **Save**.

### Options in the UI

{% options_ui %}
App:
  description: The app to stop.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.app_stop`. A basic example looks like this:

{% example %}
action: |
  action: hassio.app_stop
  data:
    app: core_ssh
{% endexample %}

Use the slug of the app, which you can find on the app's page under **Settings** > **Add-ons**.

### Options in YAML

{% options_yaml %}
app:
  description: The slug of the app to stop.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.

{% include actions/more_examples.md %}

### Automation: stop a download app in the morning

Stop a download client in the morning, so it doesn't compete with your daytime internet use.

- **Trigger**: Time, at 07:00
- **Action**: Stop app

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Stop downloads in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: hassio.app_stop
      data:
        app: a0d7b954_transmission
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
