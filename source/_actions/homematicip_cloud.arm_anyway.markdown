---
title: "Arm anyway"
action: homematicip_cloud.arm_anyway
domain: homematicip_cloud
description: "Arms the Homematic IP alarm system although sensors report a problem."
related_actions:
  - alarm_control_panel.alarm_arm_away
  - alarm_control_panel.alarm_arm_home
---

The **HomematicIP Cloud: Arm anyway** action arms a Homematic IP alarm system that refused to arm because a window is open or a device is unreachable. The sensors that block it stay unmonitored.

The action only skips the sensors named in the last refusal. If others block as well, it does not arm and names them in the error. Running the action again arms past them too.

{% include actions/ui_header.md %}

To arm the alarm system anyway from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Under **By target**, select the alarm control panel of your Homematic IP access point.
6. From the actions shown for that target, select **HomematicIP Cloud: Arm anyway**.
7. Select the **Mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "Arm the internal and external zone (**Away**) or only the external one (**Home**)."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.arm_anyway`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.arm_anyway
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    mode: away
{% endexample %}

This arms both zones of the alarm system and leaves the sensors that blocked the last attempt unmonitored.

### Options in YAML

{% options_yaml %}
mode:
  description: >
    Arm the internal and external zone (`away`) or only the external one
    (`home`).
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
