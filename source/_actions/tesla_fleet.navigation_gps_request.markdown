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
8. _Optional_: set the **Order** to choose how the destination is added to the trip.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to send the destination to.
Location:
  description: The location to navigate to, as a latitude and longitude.
Order:
  description: How to add this destination to the trip. `1` replaces the trip, `2` adds it as the next stop, and `3` adds it as the last stop. Defaults to `1`.
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
    How to add this destination to the trip. `1` replaces the trip, `2` adds it as the next stop, and `3` adds it as the last stop.
  required: false
  type: integer
  default: 1
{% endoptions_yaml %}

## Good to know

- The vehicle is woken up if needed, and the **Vehicle Commands** scope is required.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: navigate home when leaving work

When you leave the work zone on a weekday, send your home location to the car so navigation is ready when you get in.

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
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: tesla_fleet.navigation_gps_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        gps:
          latitude: "{{ state_attr('zone.home', 'latitude') }}"
          longitude: "{{ state_attr('zone.home', 'longitude') }}"
{% endexample %}

{% enddetails %}

### Automation: add a stop on the way

Press a button on your dashboard to add a regular stop, such as a grocery store, as the next stop on the current trip. The button is an [input button](/integrations/input_button/) {% term helper %} that you create separately.

- **Trigger**: Input button: pressed
- **Action**: Navigate to coordinates, with **Order** set to `2`

{% details "YAML example for adding a stop on the way" %}

{% example %}
automation: |
  alias: "Add grocery store as next stop"
  triggers:
    - trigger: state
      entity_id: input_button.add_grocery_stop
  actions:
    - action: tesla_fleet.navigation_gps_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        gps:
          latitude: "{{ state_attr('zone.grocery_store', 'latitude') }}"
          longitude: "{{ state_attr('zone.grocery_store', 'longitude') }}"
        order: 2
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
