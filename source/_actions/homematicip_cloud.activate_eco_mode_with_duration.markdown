---
title: "Activate eco mode with duration"
action: homematicip_cloud.activate_eco_mode_with_duration
domain: homematicip_cloud
description: "Activates the eco mode for a specified duration."
related_actions:
  - homematicip_cloud.activate_eco_mode_with_period
  - homematicip_cloud.deactivate_eco_mode
  - homematicip_cloud.activate_vacation
---

The **Activate eco mode with duration** action turns on eco mode on your Homematic IP access point for a set number of minutes. After the duration passes, eco mode switches off again automatically.

{% include actions/ui_header.md %}

To activate eco mode for a duration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Activate eco mode with duration**.
6. Set the **Duration** in minutes.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Duration:
  description: The duration of eco mode in minutes.
  required: true
Access point ID:
  description: The ID (SGTIN) of the Homematic IP access point. If you have only one access point, you can leave this out.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.activate_eco_mode_with_duration`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.activate_eco_mode_with_duration
  data:
    duration: 60
{% endexample %}

This activates eco mode for 60 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    The duration of eco mode in minutes.
  required: true
  type: integer
accesspoint_id:
  description: >
    The ID (SGTIN) of the Homematic IP access point. If you have only one
    access point, you can leave this out.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
