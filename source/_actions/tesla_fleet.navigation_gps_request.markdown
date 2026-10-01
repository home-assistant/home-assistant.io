---
title: "Navigate to coordinates"
action: tesla_fleet.navigation_gps_request
domain: tesla_fleet
description: "Sets the vehicle's navigation to a specific latitude and longitude."
related_actions:
  - tesla_fleet.navigation_request
---

The **Navigate to coordinates** action sends a latitude and longitude to your Tesla vehicle's navigation. Use it when you need an exact location rather than an address.

{% include actions/ui_header.md %}

To send a destination from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tesla Fleet: Navigate to coordinates**.
6. Select the **Vehicle** to send the destination to.
7. Set the **Location** to the coordinates you want to navigate to.
8. _Optional_: set the **Order** if you are sending more than one destination.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to send the destination to.
Location:
  description: The location to navigate to, as a latitude and longitude.
Order:
  description: The order for this destination when you send multiple destinations.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tesla_fleet.navigation_gps_request`. A basic example looks like this:

{% example %}
action: |
  action: tesla_fleet.navigation_gps_request
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    gps:
      latitude: -27.9699373
      longitude: 153.4081865
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to send the destination to.
  required: true
  type: string
gps:
  description: >
    The location to navigate to, as a mapping with `latitude` and `longitude` in degrees.
  required: true
  type: map
order:
  description: >
    The order for this destination when you send multiple destinations.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The vehicle is woken up if needed, and the **Vehicle Commands** scope is required.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: navigate home when leaving work

When you leave the work zone, send your home location to the car so navigation is ready when you get in.

- **Trigger**: Zone: you leave the work zone
- **Action**: Navigate to coordinates, with the location of your home zone

{% details "YAML example for navigating home when leaving work" %}

{% example %}
automation: |
  alias: "Navigate home when leaving work"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.work
      event: leave
  actions:
    - action: tesla_fleet.navigation_gps_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        gps:
          latitude: "{{ state_attr('zone.home', 'latitude') }}"
          longitude: "{{ state_attr('zone.home', 'longitude') }}"
{% endexample %}

{% enddetails %}

### Automation: navigate to a charger when the battery is low

When the battery level drops below 20%, send the location of your preferred charger to the car. The charger location is a [zone](/integrations/zone/) that you create separately.

- **Trigger**: Numeric state: the battery level sensor goes below 20
- **Action**: Navigate to coordinates, with the location of your charger zone

{% details "YAML example for navigating to a charger when the battery is low" %}

{% example %}
automation: |
  alias: "Navigate to charger when battery is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.my_tesla_battery_level
      below: 20
  actions:
    - action: tesla_fleet.navigation_gps_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        gps:
          latitude: "{{ state_attr('zone.charger', 'latitude') }}"
          longitude: "{{ state_attr('zone.charger', 'longitude') }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
