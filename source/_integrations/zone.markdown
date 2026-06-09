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
  - docs: /integrations/device_tracker/
    title: Device tracker
  - docs: /integrations/person/
    title: Person
  - docs: /docs/configuration/basic/
    title: Editing basic settings
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /getting-started/onboarding/
    title: Onboarding
  - docs: /getting-started/presence-detection/
    title: Presence detection
---

Zones allow you to specify certain regions on a map. They enable [zone presence-detection](/getting-started/presence-detection/). This information can be used in automations. For example, to start the vacuum after you left home or start the heating at home when you leave the office.

Create a zone for each area you want to automate on. For example, work, school, and home. Different technologies can be used to detect presence in these zones. A common method is app-based detection using a mobile phone. Zone automations work with [person](/integrations/person/) and [device tracker](/integrations/device_tracker/) entities.

<p class='img'>
    <img src="/images/screenshots/map.png" alt="Screenshot of a map dashboard in Home Assistant showing a school, work and home zone and two people."/>
    Map dashboard showing a school, work, and a home zone and the location of two people.
</p>

## About the home zone

During the [onboarding process](/getting-started/onboarding/), Home Assistant asked for your home location. You either entered this manually or asked Home Assistant to detect it automatically. This location was used to create the home zone with a 100&nbsp;m radius. The home zone is a special, pre-defined zone with a few characteristics that set it apart from other zones.

- The name of this zone is defined by the name of your Home Assistant installation name (which defaults to "Home").
- The home zone cannot be deleted and is designated with the home icon in the zone configuration page.
- The home zone's location is used by integrations that are location-based. For example, the [Sun integration](/integrations/sun/), which uses it to calculate the position of the sun relative to your home.
- During onboarding, Home Assistant used the location to define settings such as the unit system and time zone. If you change the location later, unit system and time zone will not be changed automatically anymore.
- Devices that are in the home zone will not appear on the map in the Home Assistant UI. For example, if you are using your phone for presence detection, you won't see your phone on the Map dashboard while you are at home.

## Adding a new zone or editing zones

1. Go to {% my zones title="**Settings** > **Areas, labels & zones**" %}.
2. To edit an existing zone, select the edit {% icon "mdi:edit" %} button. To add a new zone, select **Add zone**.
3. Give your zone a name, for example `Nina's office`, or `school`.
   - The home zone always has the name of your Home Assistant installation. To change the name of the home, go to {% my general title="**Settings** > **System** > **General**" %}.
4. Pick any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) and prefix the name with `mdi:`.
   - For example, `mdi:school`, `mdi:briefcase`, `mdi:home`, `mdi:cart`, or `mdi:castle`.
   - For the home zone, the icon cannot be changed.
5. To change location or radius, under **Edit location**, select edit.
   - To adjust the location, specify the GPS coordinates or drag the icon on the map
   - To change the zone radius, change the size of the zone circle or edit the **Radius** in meters.

    ![Screenshot of the UI for adding or editing a zone](/images/integrations/zone/zone_edit_ui.png)

6. If you want to hide the zone from the frontend and not use the zone for device tracker state, enable **Passive**. You can still use it in automations.
   - For the home zone, **Passive** is not available.
7. To save your changes, select **Update**.

## Editing zones in YAML

Zones can also be configured via {% term "`configuration.yaml`" %}. If you define these settings in YAML, they cannot be edited in the UI. They will appear greyed out.

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

To find the latitude and longitude of a certain place, you can use [Google Maps](https://www.google.com/maps/) or [Bing Maps](https://www.bing.com/maps). In Bing Maps, open the context menu for the location and copy the coordinates. In Google Maps, open the context menu for the location and select **What is here?**.

## State

The state of a zone is a number, which represents the number of {% my people title="persons" %} that are currently in a zone.

The number of persons in a zone can be helpful for automations. For example, you can determine if someone is home, if one person is home, or if no one is home. The same applies to all other zones.

## Supported functionality

Zones provide triggers and conditions for automations. You can use them to react when people or tracked devices enter or leave a zone, or to check whether a zone is occupied.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Zone automation examples

These examples show how you can use zone triggers and conditions in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: notify when Nina arrives at work

When Nina enters the work zone, this automation sends a notification to your phone.

- **Trigger**: Entered zone
  - **Target**: Nina (`person.nina`)
  - **Zone**: Work (`zone.work`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a work arrival notification" %}

{% example %}
automation: |
  alias: "Notify when Nina arrives at work"
  triggers:
    - trigger: zone.entered
      target:
        entity_id: person.nina
      options:
        zone: zone.work
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Nina arrived at work."
{% endexample %}

{% enddetails %}

### Automation: turn off the office fan when home is empty

When the home zone becomes empty, this automation checks that Nina is not in the home zone and turns off the office fan.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
- **Condition**: Is not in zone
  - **Target**: Nina (`person.nina`)
  - **Zone**: Home (`zone.home`)
- **Action**: Turn off fan
  - **Target**: Office fan (`fan.office`)

{% details "YAML example for turning off the office fan when home is empty" %}

{% example %}
automation: |
  alias: "Turn off the office fan when home is empty"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  conditions:
    - condition: zone.not_in_zone
      target:
        entity_id: person.nina
      options:
        zone: zone.home
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.office
{% endexample %}

{% enddetails %}
