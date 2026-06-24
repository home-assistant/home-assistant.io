---
title: "Set speed"
action: nzbget.set_speed
domain: nzbget
description: "Sets the NZBGet download queue speed limit."
related_actions:
  - nzbget.pause
  - nzbget.resume
---

The **Set speed** action sets the download speed limit for the NZBGet queue, in kilobytes per second. Set it to `0` to remove the limit and let downloads run at full speed.

This is handy for throttling downloads automatically, for example, capping the speed during the day and lifting the limit at night.

{% include actions/ui_header.md %}

To set the download speed limit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NZBGet: Set speed**.
6. Enter the **Speed** limit you want to apply.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Speed:
  description: The download speed limit, in kilobytes per second. Set to 0 for no limit.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nzbget.set_speed`. A basic example looks like this:

{% example %}
action: |
  action: nzbget.set_speed
  data:
    speed: 500
{% endexample %}

This limits the download queue to 500 kilobytes per second.

### Options in YAML

{% options_yaml %}
speed:
  description: >
    The download speed limit, in kilobytes per second. Set to 0 for
    no limit.
  required: false
  type: integer
  default: 1000
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: throttle downloads during the day

Cap the download speed during the day and lift the limit again overnight.

- **Trigger**: Time, 08:00
- **Action**: NZBGet: Set speed

{% details "YAML example for throttling downloads during the day" %}

{% example %}
automation: |
  alias: "Throttle downloads during the day"
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: nzbget.set_speed
      data:
        speed: 500
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
