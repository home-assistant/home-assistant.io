---
title: "Alarm arm home instant"
action: elkm1.alarm_arm_home_instant
domain: elkm1
description: "Arms an Elk-M1 area in home instant mode."
related_actions:
  - elkm1.alarm_arm_night_instant
  - elkm1.alarm_arm_vacation
---

The **Alarm arm home instant** action arms an Elk-M1 area in *home instant* mode. This arms the system for staying at home, but without an entry delay, so any triggered zone sounds the alarm immediately.

This is useful when you want an automation to arm your system for being home with no entry delay, for example at bedtime.

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/ui_header.md %}

To arm an area in home instant mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Alarm arm home instant**.
6. Choose the Elk-M1 area to arm, then enter the **Code**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The alarm code to arm the alarm control panel.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.alarm_arm_home_instant`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.alarm_arm_home_instant
  target:
    entity_id: alarm_control_panel.home
  data:
    code: "1234"
{% endexample %}

This arms the area in home instant mode.

### Options in YAML

{% options_yaml %}
code:
  description: >
    The alarm code to arm the alarm control panel.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
