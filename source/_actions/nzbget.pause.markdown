---
title: "Pause"
action: nzbget.pause
domain: nzbget
description: "Pauses the NZBGet download queue."
related_actions:
  - nzbget.resume
  - nzbget.set_speed
---

The **Pause** action pauses the NZBGet download queue. Downloads stop until you resume them again with [Resume](/actions/nzbget.resume/).

This is handy for freeing up your internet connection automatically, for example, pausing downloads while you are on a video call or streaming a movie.

{% include actions/ui_header.md %}

To pause the download queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NZBGet: Pause**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nzbget.pause`. A basic example looks like this:

{% example %}
action: |
  action: nzbget.pause
{% endexample %}

This pauses the download queue.

### Options in YAML

This action has no additional options in YAML.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause downloads during a video call

When a video call starts, pause NZBGet so it does not compete for bandwidth.

- **Trigger**: A "video call" helper turns on
- **Action**: NZBGet: Pause

{% details "YAML example for pausing downloads during a call" %}

{% example %}
automation: |
  alias: "Pause downloads during calls"
  triggers:
    - trigger: state
      entity_id: input_boolean.video_call
      to: "on"
  actions:
    - action: nzbget.pause
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
