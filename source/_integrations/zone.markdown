---
title: Zone
description: Instructions on how to set up zones within Home Assistant.
ha_category:
  - Organization
  - Presence detection
ha_release: 0.69
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: zone
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Editing basic settings
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /getting-started/onboarding/
    title: Onboarding
---

Zones allow you to specify certain regions on a map. When a device tracker sees a device to be within a zone, the state will take the name from the zone. Zones can also be used as a [trigger](/docs/automation/trigger#zone-trigger) or [condition](/docs/scripts/conditions/#zone-condition) inside automations. For example, for showing the weather, opening the shades at sunrise, or starting the vacuum when you leave the home.

As part of the default [onboarding process](/getting-started/onboarding/), Home Assistant can detect your location from IP address geolocation.

<p class='img'><img src='/images/getting-started/onboarding_location.png' style='border: 0;box-shadow: none;' alt="Screenshot showing how to define your location during onboarding">The screenshot shows how location of your home zone is defined during the onboarding process. The location of your home zone can be changed later on.</p>

Home Assistant will automatically select a unit system and time zone based on this location. If you didn’t adjust this directly during onboarding, you can do it later. Follow the steps described below.

## Editing your home zone

1. To edit your home zone, go to {% my general title="**Settings** > **System** > **General**" %}.
2. To change the name of your home zone, under **Name**, enter the new name. Then select **Update**.
3. To change location or radius, under **Edit location**, select edit.
   - To adjust the location, specify the GPS coordinates or drag the icon on the map
   - To change the zone radius, change the size of the zone circle or edit the **Radius** in meters.
      <img class="no-shadow" src='/images/docs/configuration/change_location_radius.webp' alt='Screencast showing how to zoom and pan to change location and radius on the Edit home page'>
4. To save your changes, select **Update**.

## Adding a new zone or editing zones

1. Go to {% my zones title="**Settings** > **Areas, labels & zones**" %}.
2. To edit an existing zone, select the edit {% icon "mdi:edit" %} button. To add a new zone, select **Add zone**.
3. Give your zone a name, for example `Nina's office`, or `school`.
4. Pick any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) and prefix the name with `mdi:`.
   - For example `mdi:school`, `mdi:briefcase`, `mdi:home`, `mdi:cart`, or `mdi:castle`.
   - Note: the icon cannot be changed for the home zone.
5. To change location or radius, under **Edit location**, select edit.
   - To adjust the location, specify the GPS coordinates or drag the icon on the map
   - To change the zone radius, change the size of the zone circle or edit the **Radius** in meters.

  ![Screenshot of the UI for adding or editing a zone](/images/integrations/zone/zone_edit_ui.png)

6. If you want to hide the zone from the frontend and not use the zone for device tracker state, enable **Passive**. You can still use it in automations.
   - **Passive** is not available for the home zone.
7. To save your changes, select **Update**.

## Editing zones in YAML

Zones can also be configured via {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
zone:
  - name: School
    latitude: 32.8773367
    longitude: -117.2494053
    radius: 250
    icon: mdi:school

  - name: Work
    latitude: 32.8753367
    longitude: -117.2474053

  # This will override the default home zone
  - name: Home
    latitude: 32.8793367
    longitude: -117.2474053
    radius: 100
    icon: mdi:account-multiple
```

{% configuration %}
name:
  description: The friendly name of the zone.
  required: true
  type: string
latitude:
  description: The latitude of the center point of the zone.
  required: true
  type: float
longitude:
  description: The longitude of the center point of the zone.
  required: true
  type: float
radius:
  description: The radius of the zone in meters.
  required: false
  type: integer
  default: 100
icon:
  description: The icon to show instead of name.
  required: false
  type: string
passive:
  description: To only use the zone for automation and hide it from the frontend and not use the zone for device tracker state.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

To find the latitude/longitude of a certain place you can use [Google Maps](https://www.google.com/maps/) or [Bing Maps](https://www.bing.com/maps). Just right click and copy the coordinates from there (Bing) or click on the "What is here?" (Google)

## Home zone

If no configuration is given, the `zone` integration will create a zone for home. This zone will use location provided in the `configuration.yaml` file and have a radius of 100 meters. To override this, create a zone configuration in `configuration.yaml` (see above) and name it **'Home'**. Overriding the Home zone via the UI is not supported.

{% note %}
Devices that are in the zone **'Home'** will not appear on the map in the Home Assistant UI. To apply the changes to the **'Home'** `zone`, you must restart Home Assistant.
{% endnote %}

## State

The state of a zone is a number, which represents the number of
{% my people title="persons" %} that are currently in a zone.

The number of persons in a zone can be helpful for automations, for example,
to determine if someone is home, or home alone, or no-one is at home at all.
The same applies to all other zones.
