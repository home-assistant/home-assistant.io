---
title: "Set continuous mode"
action: nuki.set_continuous_mode
domain: nuki
description: "Enables or disables continuous mode on a Nuki Opener."
related_actions:
  - nuki.lock_n_go
---

Use this action to turn continuous mode on or off for a Nuki Opener. Continuous mode is similar to the Ring-to-Open feature, but without a time limit. While it is enabled, the door opens whenever the buzzer button is pressed, like at a doctor's office or a business during opening hours. On other Nuki products, this action does nothing.

{% include actions/ui_header.md %}

To set continuous mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Set continuous mode**.
7. Turn **Enable** on to enable continuous mode, or leave it off to disable it.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Enable:
  description: "Turn on to enable continuous mode, or leave off to disable it."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nuki.set_continuous_mode`. A basic example looks like this:

{% example %}
action: |
  action: nuki.set_continuous_mode
  target:
    entity_id: lock.front_door_opener
  data:
    enable: true
{% endexample %}

This enables continuous mode on `lock.front_door_opener`.

### Options in YAML

{% options_yaml %}
enable:
  description: "Whether to enable or disable continuous mode."
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="lock" %}

## Good to know

- Continuous mode only applies to the Nuki Opener. Running this action on other Nuki devices has no effect.
- Unlike Ring-to-Open, continuous mode stays active until you disable it, so remember to turn it off when you no longer want the door to open on the buzzer.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable continuous mode during office hours

Use this automation to enable continuous mode every morning and disable it again in the evening, so visitors can come in while you're open.

- **Trigger**: Time: 09:00
- **Action**: Set continuous mode
  - **Target**: Front door opener
  - **Enable**: On

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Enable continuous mode during office hours"
    triggers:
      - trigger: time
        at: "09:00:00"
    actions:
      - action: nuki.set_continuous_mode
        target:
          entity_id: lock.front_door_opener
        data:
          enable: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
