---
title: "Enable Pure Boost on a Sensibo device"
action: sensibo.enable_pure_boost
domain: sensibo
description: "Enables and configures Pure Boost on a Sensibo Pure air purifier."
related_actions:
  - sensibo.enable_climate_react
---

Use this action to enable and configure Pure Boost on a Sensibo Pure air purifier. Pure Boost automatically manages the purifier based on the integrations you turn on, such as presence or air quality.

{% include actions/ui_header.md %}

To enable Pure Boost from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Enable Pure Boost**.
7. Set the integrations you want and the sensitivity.
8. Select **Save**.

### Options in the UI

{% options_ui %}
AC integration:
  description: Link Pure Boost with an air conditioner.
Geo integration:
  description: Link Pure Boost with presence.
Indoor air quality:
  description: Link Pure Boost with indoor air quality.
Outdoor air quality:
  description: Link Pure Boost with outdoor air quality.
Sensitivity:
  description: The sensitivity for Pure Boost, either normal or sensitive.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.enable_pure_boost`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.enable_pure_boost
  target:
    entity_id: climate.living_room
  data:
    ac_integration: true
    geo_integration: false
    indoor_integration: true
    outdoor_integration: false
    sensitivity: normal
{% endexample %}

### Options in YAML

{% options_yaml %}
ac_integration:
  description: Link Pure Boost with an air conditioner.
  required: true
  type: boolean
  default: false
geo_integration:
  description: Link Pure Boost with presence.
  required: true
  type: boolean
  default: false
indoor_integration:
  description: Link Pure Boost with indoor air quality.
  required: true
  type: boolean
  default: false
outdoor_integration:
  description: Link Pure Boost with outdoor air quality.
  required: true
  type: boolean
  default: false
sensitivity:
  description: The sensitivity for Pure Boost. Choose from normal or sensitive.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- The AC integration and Geo integration need to be set up in the Sensibo app before you use them for the first time.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
