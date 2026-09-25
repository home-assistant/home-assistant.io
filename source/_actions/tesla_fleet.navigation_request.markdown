---
title: "Navigate to destination"
action: tesla_fleet.navigation_request
domain: tesla_fleet
description: "Sets the vehicle's navigation to an address, place name, or map link."
related_actions:
  - tesla_fleet.navigation_gps_request
---

The **Navigate to destination** action sends an address, place name, or map link to your Tesla vehicle's navigation, the same as sharing a location to the car from your phone.

{% include actions/ui_header.md %}

To send a destination from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tesla Fleet: Navigate to destination**.
6. Select the **Vehicle** to send the destination to.
7. Enter the **Destination**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to send the destination to.
Destination:
  description: The address, place name, or map link to navigate to.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tesla_fleet.navigation_request`. A basic example looks like this:

{% example %}
action: |
  action: tesla_fleet.navigation_request
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    destination: "1600 Amphitheatre Parkway, Mountain View, CA"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to send the destination to.
  required: true
  type: string
destination:
  description: >
    The address, place name, or map link to navigate to.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The vehicle is woken up if needed, and the **Vehicle Commands** scope is required.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: navigate to your next appointment

Half an hour before a calendar event starts, send the event's location to the car.

- **Trigger**: Calendar: 30 minutes before an event starts
- **Condition**: The event has a location
- **Action**: Navigate to destination, with the event's location

{% details "YAML example for navigating to your next appointment" %}

{% example %}
automation: |
  alias: "Navigate to next appointment"
  triggers:
    - trigger: calendar
      entity_id: calendar.personal
      event: start
      offset: "-0:30:0"
  conditions:
    - condition: template
      value_template: "{{ trigger.calendar_event.location | default('', true) != '' }}"
  actions:
    - action: tesla_fleet.navigation_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        destination: "{{ trigger.calendar_event.location }}"
{% endexample %}

{% enddetails %}

### Automation: send a destination from your dashboard

Type a destination into a text field on your dashboard and send it to the car. The text field is an [input text](/integrations/input_text/) {% term helper %} that you create separately.

- **Trigger**: Input text: the value changes
- **Action**: Navigate to destination, with the new value

{% details "YAML example for sending a destination from your dashboard" %}

{% example %}
automation: |
  alias: "Send destination to car"
  triggers:
    - trigger: state
      entity_id: input_text.car_destination
  conditions:
    - condition: template
      value_template: "{{ trigger.to_state.state not in ['', 'unknown', 'unavailable'] }}"
  actions:
    - action: tesla_fleet.navigation_request
      data:
        device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
        destination: "{{ trigger.to_state.state }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
