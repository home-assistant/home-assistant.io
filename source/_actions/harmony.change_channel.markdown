---
title: "Change channel"
action: harmony.change_channel
domain: harmony
description: "Sends a change channel command to the Harmony Hub."
related_actions:
  - harmony.sync
---

Use this action to send a change channel command to your Harmony Hub. You provide the channel number you want to switch to.

{% include actions/ui_header.md %}

To change the channel from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Harmony remote you want to control.
6. From the actions shown for that target, select **Change channel**.
7. Enter the **Channel** you want to switch to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Channel:
  description: The channel number to change to.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `harmony.change_channel`. A basic example looks like this:

{% example %}
action: |
  action: harmony.change_channel
  target:
    entity_id: remote.tv_room
  data:
    channel: 200
{% endexample %}

This changes the channel to `200` on `remote.tv_room`.

### Options in YAML

{% options_yaml %}
channel:
  description: The channel number to change to.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="remote" %}

## Good to know

- The Harmony Hub must be running an activity that controls the device you want to change the channel on, such as a Watch TV activity.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch to the news channel each evening

Tune to your news channel at a fixed time.

- **Trigger**: Time is 6:00 PM
- **Action**: Change channel
  - **Target**: TV room remote
  - **Channel**: `200`

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch to the news channel each evening"
    triggers:
      - trigger: time
        at: "18:00:00"
    actions:
      - action: harmony.change_channel
        target:
          entity_id: remote.tv_room
        data:
          channel: 200
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
