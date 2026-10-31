---
title: "Enable Recorder"
action: recorder.enable
domain: recorder
description: "Resumes recording events and state changes to the database."
related_actions:
  - recorder.disable
  - recorder.purge
  - recorder.purge_entities
  - recorder.get_statistics
---

Use this action to resume saving events and state changes to the database after you stopped it with the [Disable Recorder](/actions/recorder.disable/) action. This is handy when a temporary period of not recording is over and you want your history to pick up again.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To enable the recorder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Recorder: Enable Recorder**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.enable`. A basic example looks like this:

{% example %}
action: |
  action: recorder.enable
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- This action is the opposite of the [Disable Recorder](/actions/recorder.disable/) action. It only has an effect if recording was disabled earlier.
- Events and state changes that happened while the recorder was disabled are not recovered. Only new activity is recorded from this point on.

{% include actions/stuck.md %}

{% include actions/related.md %}
