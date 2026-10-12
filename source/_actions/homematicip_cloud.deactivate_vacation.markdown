---
title: "Deactivate vacation"
action: homematicip_cloud.deactivate_vacation
domain: homematicip_cloud
description: "Deactivates the vacation mode immediately."
related_actions:
  - homematicip_cloud.activate_vacation
  - homematicip_cloud.deactivate_eco_mode
  - homematicip_cloud.activate_eco_mode_with_duration
---

The **Deactivate vacation** action turns off vacation mode on your Homematic IP access point right away, regardless of the end time that was set.

{% include actions/ui_header.md %}

To deactivate vacation mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Deactivate vacation**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Access point ID:
  description: The ID (Serialized Global Trade Item Number, or SGTIN) of the Homematic IP access point. If you have only one access point, you can leave this out.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.deactivate_vacation`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.deactivate_vacation
{% endexample %}

This deactivates vacation mode immediately.

### Options in YAML

{% options_yaml %}
accesspoint_id:
  description: >
    The ID (Serialized Global Trade Item Number, or SGTIN) of the Homematic IP access point. If you have only one
    access point, you can leave this out.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
