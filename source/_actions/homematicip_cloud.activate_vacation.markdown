---
title: "Activate vacation"
action: homematicip_cloud.activate_vacation
domain: homematicip_cloud
description: "Activates the vacation mode until a given time."
related_actions:
  - homematicip_cloud.deactivate_vacation
  - homematicip_cloud.activate_eco_mode_with_period
  - homematicip_cloud.deactivate_eco_mode
---

The **Activate vacation** action turns on vacation mode on your Homematic IP access point until a date and time you choose, holding a target temperature in the meantime. At that time, vacation mode switches off again automatically.

{% include actions/ui_header.md %}

To activate vacation mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Activate vacation**.
6. Set the **Endtime** and the **Temperature** to hold.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Endtime:
  description: "The time when vacation mode should automatically be disabled, in the format `YYYY-MM-DD HH:MM`."
  required: true
Temperature:
  description: The set temperature to hold during vacation mode.
  required: true
Access point ID:
  description: The ID (Serialized Global Trade Item Number, or SGTIN) of the Homematic IP access point. If you have only one access point, you can leave this out.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.activate_vacation`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.activate_vacation
  data:
    endtime: "2019-09-17 18:00"
    temperature: 18.5
{% endexample %}

This activates vacation mode until the given time, holding 18.5 degrees.

### Options in YAML

{% options_yaml %}
endtime:
  description: >
    The time when vacation mode should automatically be disabled, in the
    format `YYYY-MM-DD HH:MM`.
  required: true
  type: string
temperature:
  description: >
    The set temperature to hold during vacation mode.
  required: true
  type: float
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
