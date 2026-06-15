---
title: "Resume"
action: nzbget.resume
domain: nzbget
description: "Resumes the NZBGet download queue."
related_actions:
  - nzbget.pause
  - nzbget.set_speed
---

The **Resume** action restarts the NZBGet download queue after it has been paused. It is the counterpart to [Pause](/actions/nzbget.pause/).

This is handy for picking downloads back up automatically, for example resuming them once a video call ends or overnight when your connection is quiet.

{% include actions/ui_header.md %}

To resume the download queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NZBGet: Resume**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nzbget.resume`. A basic example looks like this:

{% example %}
action: |
  action: nzbget.resume
{% endexample %}

This resumes the download queue.

### Options in YAML

This action has no additional options in YAML.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resume downloads overnight

When everyone is asleep, resume NZBGet so downloads run while the connection is quiet.

- **Trigger**: Time, 02:00
- **Action**: NZBGet: Resume

{% details "YAML example for resuming downloads overnight" %}

{% example %}
automation: |
  alias: "Resume downloads overnight"
  triggers:
    - trigger: time
      at: "02:00:00"
  actions:
    - action: nzbget.resume
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
