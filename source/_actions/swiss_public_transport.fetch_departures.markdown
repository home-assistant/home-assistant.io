---
title: "Fetch departures"
action: swiss_public_transport.fetch_departures
domain: swiss_public_transport
response: required
description: "Fetches a list of upcoming departures from a Swiss public transport stationboard."
---

Use this action to fetch a list of upcoming departures for one of your Swiss public transport stationboards. A stationboard is an entry you set up with **Departures from a station**. The action returns the next departures from its stations, and only those that match its **Stops at** stations if you set any.

For example, you can show more than the next three departures on a dashboard, or send the next departures in a notification.

{% include actions/ui_header.md %}

To fetch departures from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Swiss public transport: Fetch departures**.
6. Select the stationboard as the **Instance** to fetch departures for. Optionally, set a **Limit** for the number of departures to return. In the **Response variable** field, enter a name to store the departures in, such as `departures`.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Instance:
  description: The Swiss public transport stationboard to fetch departures for.
  required: true
Limit:
  description: The number of departures to fetch. Defaults to 3.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `swiss_public_transport.fetch_departures`. A basic example looks like this:

{% example %}
action: |
  action: swiss_public_transport.fetch_departures
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
    limit: 3
  response_variable: departures
{% endexample %}

This fetches the next three departures for the selected stationboard. Replace `YOUR_CONFIG_ENTRY_ID` with the ID of your stationboard. If you paste the example into the visual editor, you can select the stationboard under **Instance** instead.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Swiss public transport stationboard to fetch departures for.
  required: true
  type: string
limit:
  description: >
    The number of departures to fetch, between 1 and 15. Defaults to 3.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

{% include actions/response.md %}

The action returns a `departures` list. Each departure includes the following information:

- `departure`: The departure time.
- `delay`: The departure delay, in minutes.
- `platform`: The platform or stop the departure leaves from.
- `line`: The line name of the departure.
- `destination`: The name of the final stop.

## Good to know

- When you do not set a limit, the action returns three departures.
- This action only works with stationboards. For a connection between two stations, use [Fetch connections](/actions/swiss_public_transport.fetch_connections/) instead.
- If the stationboard has **Stops at** stations and the stop is very busy, the action can return fewer departures than the limit.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: sending the next departures before you leave

Get the next five departures from your stop as a notification on your phone every morning, so you know when to leave the house.

- **Trigger**: Time: at 07:00
- **Action**: Fetch departures
  - **Instance**: Your stationboard
  - **Limit**: 5
  - **Response variable**: `stationboard`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: A template that lists the time, line, and destination of each departure. Copy it from the YAML example.

{% details "YAML example for sending the next departures in the morning" %}

Replace `YOUR_CONFIG_ENTRY_ID` by selecting your stationboard under **Instance** after you paste the example.

{% example %}
automation: |
  alias: "Send the next departures in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: swiss_public_transport.fetch_departures
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
        limit: 5
      response_variable: stationboard
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% for departure in stationboard.departures %}
          {{ as_timestamp(departure.departure) | timestamp_custom('%H:%M') }}
          {{ departure.line }} to {{ departure.destination }}.
          {% endfor %}
{% endexample %}

{% enddetails %}

### Automation: sending the next departures when you leave work

Get the next departures from the stop near your workplace as soon as you leave. This example uses a stationboard for that stop and a zone named **Work**.

- **Trigger**: Person leaves a zone
  - **Target**: Your person (`person.me`)
  - **Zone**: Work (`zone.work`)
- **Action**: Fetch departures
  - **Instance**: Your stationboard
  - **Limit**: 3
  - **Response variable**: `stationboard`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: A template that lists the time, line, and destination of each departure. Copy it from the YAML example.

{% details "YAML example for sending the next departures when you leave work" %}

Replace `YOUR_CONFIG_ENTRY_ID` by selecting your stationboard under **Instance** after you paste the example.

{% example %}
automation: |
  alias: "Send the next departures when leaving work"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.work
      event: leave
  actions:
    - action: swiss_public_transport.fetch_departures
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
        limit: 3
      response_variable: stationboard
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% for departure in stationboard.departures %}
          {{ as_timestamp(departure.departure) | timestamp_custom('%H:%M') }}
          {{ departure.line }} to {{ departure.destination }}.
          {% endfor %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
