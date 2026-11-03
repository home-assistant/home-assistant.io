---
title: "Push alarm state"
action: ifttt.push_alarm_state
domain: ifttt
description: "Updates the state of an IFTTT alarm control panel."
related_actions:
  - ifttt.trigger
---

Use this action to tell Home Assistant the current state of an alarm system you control through [IFTTT](/integrations/ifttt/). It updates the state of an [IFTTT alarm control panel](/integrations/alarm_control_panel.ifttt/), without sending anything to the alarm system itself.

This action is only available when you set up an IFTTT alarm control panel in your {% term "`configuration.yaml`" %} file.

{% include actions/ui_header.md %}

To push an alarm state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IFTTT: Push alarm state**.
6. In **Entity ID**, select the IFTTT alarm control panel.
7. In **State**, enter the new state, such as `armed_away`.
8. Select **Save**.

This action does not support targets. You choose the alarm control panel with the **Entity ID** option instead.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The IFTTT alarm control panel to update.
  required: true
State:
  description: "The new state of the alarm: `disarmed`, `armed_home`, `armed_away`, or `armed_night`."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ifttt.push_alarm_state`. A basic example looks like this:

{% example %}
action: |
  action: ifttt.push_alarm_state
  data:
    entity_id: alarm_control_panel.home
    state: armed_away
{% endexample %}

This sets the state of `alarm_control_panel.home` to armed away.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The IFTTT alarm control panel or panels to update.
  required: true
  type: [string, list]
state:
  description: "The new state of the alarm: `disarmed`, `armed_home`, `armed_away`, or `armed_night`."
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Most of the time, IFTTT calls this action for you. An IFTTT applet sends a web request to Home Assistant when your alarm system changes state. See [Required IFTTT applets](/integrations/alarm_control_panel.ifttt/#required-ifttt-applets).
- Other alarm states, like `triggered` or `pending`, are ignored.
- This action only changes what Home Assistant shows. To arm or disarm the alarm system, use the regular alarm control panel actions, which send an event to IFTTT.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
