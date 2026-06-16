---
title: "Arm away instant"
action: totalconnect.arm_away_instant
domain: totalconnect
description: "Arms the alarm panel in away mode with zero entry delay."
related_actions:
  - totalconnect.arm_home_instant
---

Use this action to arm your Total Connect alarm panel in away mode with no entry delay. With zero entry delay, the alarm sounds instantly if an entry or exit zone is faulted, instead of giving you time to disarm. This is equivalent to "arm away instant" on most alarm panels.

{% include actions/ui_header.md %}

To arm away instant from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Arm away instant**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `totalconnect.arm_away_instant`. A basic example looks like this:

{% example %}
action: |
  action: totalconnect.arm_away_instant
  target:
    entity_id: alarm_control_panel.home
{% endexample %}

This arms `alarm_control_panel.home` in away mode with zero entry delay.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="alarm_control_panel" %}

## Good to know

- With zero entry delay, there is no grace period to disarm. The alarm triggers immediately if an entry or exit zone opens while armed.
- For a normal entry delay, use [Arm alarm away](/actions/alarm_control_panel.alarm_arm_away/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: arm away instant when everyone leaves

Use this automation to arm the panel in away mode with no entry delay once the last person leaves home.

- **Trigger**: Everyone leaves the home zone
- **Action**: Arm away instant
  - **Target**: Home alarm panel

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Arm away instant when everyone leaves"
    triggers:
      - trigger: state
        entity_id: zone.home
        to: "0"
    actions:
      - action: totalconnect.arm_away_instant
        target:
          entity_id: alarm_control_panel.home
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
