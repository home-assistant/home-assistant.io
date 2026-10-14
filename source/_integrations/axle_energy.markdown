---
title: Axle Energy
description: Instructions on how to use Axle Energy grid event schedules in Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Herbertmt978'
ha_domain: axle_energy
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Axle Energy** {% term integration %} shows the grid event schedule for your [Axle Energy](https://www.axle.energy/) account. You can use the event direction and start and end times in your automations to prepare for an import or export event.

## Prerequisites

You need an Axle account with access to a Home Assistant authentication token. Axle provides this token in **Events Only** mode.

To create a token:

1. Sign in to your Axle account and open **Account Settings**.
2. Open the [**Home Assistant** section](https://vpp.axle.energy/app/account/home-assistant).
3. Select **Generate Token**.
4. Copy the token for use during setup.

If the **Home Assistant** section is unavailable, check your account mode and refer to [Axle's Home Assistant setup instructions](https://vpp.axle.energy/landing/home-assistant).

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "Enter the Home Assistant token generated in your Axle account. Paste the token on its own, without a `Bearer ` prefix."
{% endconfiguration_basic %}

## Supported functionality

Each configured feed creates one service device with three sensor entities:

- **Event type** shows whether the published event requests import from or export to the grid.
- **Event start** shows when the event starts.
- **Event end** shows when the event ends.

You see event timestamps in your configured time zone. You can use the timestamp sensors with a [time trigger](/docs/automation/trigger/#time-trigger) in your own automations.

## Axle Energy automation examples

Use the event timestamps to schedule notifications from the latest event information received from Axle. Create an automation in {% my automations title="**Settings** > **Automations & scenes**" %} with the trigger, condition, and action below.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when an export event starts

This example creates a notification in Home Assistant when the scheduled export event starts.

- **Trigger**: Time, using the Axle Energy **Event start** sensor
- **Condition**: State, with the Axle Energy **Event type** sensor set to `export`
- **Action**: Create persistent notification
  - **Message**: Your Axle export event is starting.

{% details "YAML example for an export event notification" %}

Replace the entity IDs if you have renamed your Axle sensors.

{% example %}
automation: |
  alias: "Notify when an Axle export event starts"
  triggers:
    - trigger: time
      at: sensor.axle_energy_event_start
  conditions:
    - condition: state
      entity_id: sensor.axle_energy_event_type
      state: "export"
  actions:
    - action: persistent_notification.create
      data:
        message: "Your Axle export event is starting."
{% endexample %}

{% enddetails %}

### Automation: Notify when an event ends

This example creates a notification at the scheduled end of an import or export event.

- **Trigger**: Time, using the Axle Energy **Event end** sensor
- **Action**: Create persistent notification
  - **Message**: Your Axle event has reached its scheduled end.

{% details "YAML example for an event end notification" %}

Replace the entity ID if you have renamed your Axle sensor.

{% example %}
automation: |
  alias: "Notify when an Axle event ends"
  triggers:
    - trigger: time
      at: sensor.axle_energy_event_end
  actions:
    - action: persistent_notification.create
      data:
        message: "Your Axle event has reached its scheduled end."
{% endexample %}

{% enddetails %}

### Automation: Notify one hour before an export event

This example creates a persistent notification one hour before a scheduled Axle export event starts.

- **Trigger**: Time, using the Axle Energy **Event start** sensor
- **Condition**: State, with the Axle Energy **Event type** sensor set to `export`
- **Action**: Create notification
  - **Message**: Your Axle export event starts in one hour.

To set the reminder in the UI, select **Value of a date/time helper or timestamp-class sensor** in the **Time** trigger, choose your **Event start** sensor, and enter `-01:00:00` in **Offset**. To send the reminder two hours before the event, change the offset to `-02:00:00` and update the automation alias and notification message to say two hours.

{% details "YAML example for an export event reminder" %}

Replace the entity IDs if you have renamed your Axle sensors.

{% example %}
automation: |
  alias: "Notify one hour before an Axle export event"
  triggers:
    - trigger: time
      at:
        entity_id: sensor.axle_energy_event_start
        offset: "-01:00:00"
  conditions:
    - condition: state
      entity_id: sensor.axle_energy_event_type
      state: "export"
  actions:
    - action: persistent_notification.create
      data:
        message: "Your Axle export event starts in one hour."
{% endexample %}

{% enddetails %}

## Template helper examples

You can create optional Template helpers from the Axle Energy timestamp sensors. These helpers are separate from the entities created by the integration.

### Event later today

Create an optional, user-created [Template helper](/integrations/template/#creating-a-template-helper-from-the-user-interface) to show whether the next Axle Energy event starts later today. The helper is separate from the Axle Energy entities. It shows **Off** when there is no event, the timestamp is invalid, the event is not today, or its start time has passed. It shows **Unavailable** when the source sensor is unavailable.

{% details "Create an event later today helper" %}

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select **Create helper**.
2. Select **Template**, then **Binary sensor**.
3. Enter `Axle Energy event later today` as the **Name**.
4. Paste this into **State**. Replace the entity ID if you renamed your Axle sensor.

{% example %}
template: |
  {% set raw = states('sensor.axle_energy_event_start') %}
  {% set start = as_timestamp(raw, none) %}
  {% set current = as_timestamp(now()) %}
  {% set local_now = as_local(as_datetime(current)) %}
  {% if raw == 'unknown' %}
    {{ false }}
  {% elif start is not none %}
    {% set event_date = as_local(as_datetime(start)).date() %}
    {{ event_date == local_now.date()
       and start > current }}
  {% else %}
    {{ false }}
  {% endif %}
{% endexample %}

5. Expand **Additional options** and paste this into **Availability**, using the same entity ID.

{% example %}
template: |
  {{ not is_state('sensor.axle_energy_event_start', 'unavailable') }}
{% endexample %}

6. Select **Submit**. You can then add the helper to your dashboard.

{% enddetails %}

The helper updates when its source sensor changes and at the start of each minute. It uses the event timestamp to check whether the start time is still in the future and the local calendar date to determine whether the event is today. An invalid timestamp is handled as **Off** instead of causing a template error.

### Event phase

Create an optional, user-created [Template helper](/integrations/template/#creating-a-template-helper-from-the-user-interface) to show the phase of an Axle Energy event. The helper is separate from the Axle Energy entities. It shows `No event` when both sensors are **Unknown**, and **Unknown** when only one timestamp is present, either timestamp is invalid, or the end is not after the start. It shows **Unavailable** when either source sensor is unavailable.

{% details "Create an event phase helper" %}

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select **Create helper**.
2. Select **Template**, then **Sensor**.
3. Enter `Axle Energy event phase` as the **Name**. Leave **Unit of measurement**, **Device class**, and **State class** empty.
4. Paste this into **State**. Replace the entity IDs if you renamed your Axle sensors.

{% example %}
template: |
  {% set start_raw = states('sensor.axle_energy_event_start') %}
  {% set end_raw = states('sensor.axle_energy_event_end') %}
  {% set current = as_timestamp(now()) %}
  {% if start_raw == 'unknown' and end_raw == 'unknown' %}
    No event
  {% else %}
    {% set start = as_timestamp(start_raw, none) %}
    {% set end = as_timestamp(end_raw, none) %}
    {% if start is none or end is none or end <= start %}
      {{ none }}
    {% elif current < start %}
      Upcoming
    {% elif current < end %}
      In progress
    {% else %}
      Finished
    {% endif %}
  {% endif %}
{% endexample %}

5. Expand **Additional options** and paste this into **Availability**, using the same entity IDs.

{% example %}
template: |
  {{ not is_state('sensor.axle_energy_event_start', 'unavailable')
     and not is_state('sensor.axle_energy_event_end', 'unavailable') }}
{% endexample %}

6. Select **Submit**. You can then add the helper to your dashboard.

{% enddetails %}

The helper updates when either source sensor changes and at the start of each minute. Its custom states are `Upcoming`, `In progress`, and `Finished`. **Finished** is shown only while Axle retains that event in its current sensor data. The helper uses only the current event data. Its state history is retained according to your Recorder settings.

### Minutes until an event starts

For a numeric countdown, you can create an optional [Template helper](/integrations/template/#creating-a-template-helper-from-the-user-interface) from the existing **Event start** and **Event end** sensors. This helper is separate from the entities created by the Axle Energy integration.

It shows the minutes until the event starts, rounded up to the next whole minute. It shows `0` while the event is in progress, **Unknown** when there is no event or the event has ended, and **Unavailable** when either source sensor is unavailable. The helper updates when either source changes and at the start of each minute, without requesting data from Axle. For an automation at an exact event time, use the timestamp sensors with a [time trigger](/docs/automation/trigger/#time-trigger).

{% details "Create a minutes until event start helper" %}

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select **Create helper**.
2. Select **Template**, then **Sensor**.
3. Enter `Axle Energy minutes until event start` as the **Name** and `min` as the **Unit of measurement**. Leave **Device class** and **State class** empty.
4. Paste the following into **State**. Replace the entity IDs if you have renamed your Axle sensors.

{% example %}
template: |
  {% set start = as_timestamp(states('sensor.axle_energy_event_start'), none) %}
  {% set end = as_timestamp(states('sensor.axle_energy_event_end'), none) %}
  {% set current = as_timestamp(now()) %}
  {% if start is not none and end is not none and end > current %}
    {{ [0, ((start - current) / 60) | round(0, 'ceil') | int] | max }}
  {% else %}
    {{ none }}
  {% endif %}
{% endexample %}

5. Expand **Additional options** and paste the following into **Availability**, using the same entity IDs.

{% example %}
template: |
  {{ not is_state('sensor.axle_energy_event_start', 'unavailable')
     and not is_state('sensor.axle_energy_event_end', 'unavailable') }}
{% endexample %}

6. Select **Submit**. You can then add the helper to your dashboard.

{% enddetails %}

### Minutes remaining in an event

To see how much time is left in an active event, create an optional [Template helper](/integrations/template/#creating-a-template-helper-from-the-user-interface) from the existing **Event start** and **Event end** sensors. This helper is separate from the entities created by the Axle Energy integration.

It shows the minutes remaining, rounded up to the next whole minute, while the event is in progress. It shows `0` before the event starts or after it ends, **Unknown** when either timestamp is missing or invalid, and **Unavailable** when either source sensor is unavailable. The helper updates when either source changes and at the start of each minute, without requesting data from Axle. For an automation at an exact event time, use the timestamp sensors with a [time trigger](/docs/automation/trigger/#time-trigger).

{% details "Create a minutes remaining helper" %}

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} and select **Create helper**.
2. Select **Template**, then **Sensor**.
3. Enter `Axle Energy minutes remaining` as the **Name** and `min` as the **Unit of measurement**. Leave **Device class** and **State class** empty.
4. Paste the following into **State**. Replace the entity IDs if you have renamed your Axle sensors.

{% example %}
template: |
  {% set start = as_timestamp(states('sensor.axle_energy_event_start'), none) %}
  {% set end = as_timestamp(states('sensor.axle_energy_event_end'), none) %}
  {% set current = as_timestamp(now()) %}
  {% if start is not none and end is not none and end > start %}
    {% if start <= current < end %}
      {{ ((end - current) / 60) | round(0, 'ceil') | int }}
    {% else %}
      {{ 0 }}
    {% endif %}
  {% else %}
    {{ none }}
  {% endif %}
{% endexample %}

5. Expand **Additional options** and paste the following into **Availability**, using the same entity IDs.

{% example %}
template: |
  {{ not is_state('sensor.axle_energy_event_start', 'unavailable')
     and not is_state('sensor.axle_energy_event_end', 'unavailable') }}
{% endexample %}

6. Select **Submit**. You can then add the helper to your dashboard.

{% enddetails %}

## Data updates

The integration {% term polling polls %} Axle every 10 minutes. All three sensors use the same update. Changes to the published schedule appear after the next successful update.

When Axle returns an empty schedule, the sensors show an unknown state. Events you have opted out of are excluded. If a request fails because of a temporary connection or service error, the sensors become unavailable and recover after a successful update. Authentication failures stop polling; follow the steps in [Authentication fails](#authentication-fails) to replace the token.

## Known limitations

- Each entry uses its own Axle API key. You can add another feed with a different key.
- The integration reads the event schedule. It does not control your battery or inverter, or change your Axle participation mode.
- Countdown, event activity, and calendar entities are not provided.
- The event information depends on Axle's cloud service and may change between updates.

## Troubleshooting

### Authentication fails

Check that you copied the full token from the **Home Assistant** section of your Axle account. Enter only the token in **API key**, without a `Bearer ` prefix.

If Axle rejects the token for an existing feed, Home Assistant asks you to authenticate again:

1. Open the [**Home Assistant** section of your Axle account](https://vpp.axle.energy/app/account/home-assistant) and copy the displayed token. If **Generate Token** is available, select it first.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Reconfigure** on the authentication notification for the affected Axle Energy entry.
3. Enter the copied token in **API key** and submit the form.

Home Assistant validates the token and resumes updates. Your existing sensors and their entity IDs are preserved, so automations can continue using them. Each configured feed needs its own token.

If the token is already used by another entry, the form stays open so you can enter a different token.

If Axle still rejects the token from your account, contact [Axle support](https://help.axle.energy/). You can also contact support for guidance on revoking an existing token.

### The sensors are unavailable

Check your internet connection and whether you can access your Axle account. The integration retries connection failures automatically. If authentication fails, follow the token replacement steps above. If the problem continues, check {% my logs title="**Settings** > **System** > **Logs**" %} for an Axle error.

### The sensors show an unknown state

Check whether Axle has scheduled an event for your account and whether you have opted out of it. An empty schedule is a valid response and does not indicate a connection failure.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration does not close your Axle account or change your participation mode.
