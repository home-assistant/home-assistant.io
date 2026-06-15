---
title: "Set Home Assistant location"
action: homeassistant.set_location
domain: homeassistant
description: "Updates the location of the Home Assistant home zone."
related_actions:
  - homeassistant.reload_core_config
---

Use this action to update the location of your Home Assistant home zone, which is usually named "Home". A common use is to keep the home location accurate on a mobile install, such as a camper or a boat, so that sun, weather, and presence work correctly as you move.

{% include actions/ui_header.md %}

To set the location from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Set Home Assistant location**.
6. Set the **Latitude** and **Longitude**, and the **Elevation** if you want.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Latitude:
  description: The latitude of your location.
Longitude:
  description: The longitude of your location.
Elevation:
  description: The elevation of your location above sea level.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.set_location`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.set_location
  data:
    latitude: 32.87336
    longitude: 117.22743
    elevation: 120
{% endexample %}

### Options in YAML

{% options_yaml %}
latitude:
  description: The latitude of your location.
  required: true
  type: float
longitude:
  description: The longitude of your location.
  required: true
  type: float
elevation:
  description: The elevation of your location above sea level, in meters.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- This updates the home zone location until the next time the Core configuration is loaded. To make a change permanent, set the location in your configuration.

{% include actions/stuck.md %}

{% include actions/related.md %}
