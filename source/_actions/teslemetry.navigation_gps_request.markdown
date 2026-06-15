---
title: "Navigate to coordinates"
action: teslemetry.navigation_gps_request
domain: teslemetry
description: "Sets the vehicle's navigation to a specific latitude and longitude."
related_actions:
  - teslemetry.set_scheduled_charging
  - teslemetry.set_scheduled_departure
  - teslemetry.valet_mode
---

The **Navigate to coordinates** action sends a destination to your Tesla vehicle's navigation system using latitude and longitude coordinates. The vehicle starts routing to that location, just as if you had searched for it on the in-car screen.

Use it to push a destination to the car from an automation, for example sending the address of an upcoming calendar appointment to the vehicle before you leave, or starting navigation home when you tap a button.

{% include actions/ui_header.md %}

To send a destination from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Navigate to coordinates**.
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

In YAML, refer to this action as `teslemetry.navigation_gps_request`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.navigation_gps_request
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    gps:
      latitude: -27.9699373
      longitude: 153.4081865
{% endexample %}

This sets the vehicle's navigation to the given coordinates.

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
  default: 1
{% endoptions_yaml %}

## Good to know

- The vehicle must be awake and online to receive the destination.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
