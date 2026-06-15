---
title: "Restart app"
action: hassio.app_restart
domain: hassio
description: "Restarts a Home Assistant app."
related_actions:
  - hassio.app_start
  - hassio.app_stop
  - hassio.app_stdin
---

Use this action to restart a running {% term app %}. A common use is to restart an app on a schedule, or to recover an app that has stopped responding, without restarting all of Home Assistant.

{% include actions/ui_header.md %}

To restart an app from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Restart app**.
6. Select the **App** to restart.
7. Select **Save**.

### Options in the UI

{% options_ui %}
App:
  description: The app to restart.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hassio.app_restart`. A basic example looks like this:

{% example %}
action: |
  action: hassio.app_restart
  data:
    app: core_ssh
{% endexample %}

Use the slug of the app, which you can find on the app's page under **Settings** > **Add-ons**.

### Options in YAML

{% options_yaml %}
app:
  description: The slug of the app to restart.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- This action is only available when you run {% term "Home Assistant Operating System" %} or the Supervised installation method. It is not available on {% term "Home Assistant Container" %} or {% term "Home Assistant Core" %}.

{% include actions/more_examples.md %}

### Automation: restart an app every night

Restart an app once a day to keep it running smoothly.

- **Trigger**: Time, at 04:00
- **Action**: Restart app

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Nightly app restart"
  triggers:
    - trigger: time
      at: "04:00:00"
  actions:
    - action: hassio.app_restart
      data:
        app: core_mosquitto
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
