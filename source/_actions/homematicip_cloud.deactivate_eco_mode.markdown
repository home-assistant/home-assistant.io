---
title: "Deactivate eco mode"
action: homematicip_cloud.deactivate_eco_mode
domain: homematicip_cloud
description: "Deactivates the eco mode immediately."
related_actions:
  - homematicip_cloud.activate_eco_mode_with_duration
  - homematicip_cloud.activate_eco_mode_with_period
  - homematicip_cloud.deactivate_vacation
---

The **Deactivate eco mode** action turns off eco mode on your Homematic IP access point right away, regardless of any duration or end time that was set.

{% include actions/ui_header.md %}

To deactivate eco mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Deactivate eco mode**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Access point ID:
  description: The ID (SGTIN) of the Homematic IP access point. If you have only one access point, you can leave this out.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.deactivate_eco_mode`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.deactivate_eco_mode
{% endexample %}

This deactivates eco mode immediately.

### Options in YAML

{% options_yaml %}
accesspoint_id:
  description: >
    The ID (SGTIN) of the Homematic IP access point. If you have only one
    access point, you can leave this out.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
