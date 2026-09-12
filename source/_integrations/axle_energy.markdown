---
title: Axle Energy
description: Instructions on how to use Axle Energy grid event schedules in Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: "2026.10"
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

- **Import / Export** shows whether the published event requests import from or export to the grid.
- **Event start** shows when the event starts.
- **Event end** shows when the event ends.

You see event timestamps in your configured time zone. You can use the timestamp sensors with a [time trigger](/docs/automation/trigger/#time-trigger) in your own automations.

## Axle Energy automation examples

Use the event timestamps to schedule notifications from the latest event information received from Axle. Create an automation in {% my automations title="**Settings** > **Automations & scenes**" %} with the trigger, condition, and action below.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when an export event starts

This example creates a notification in Home Assistant when the scheduled export event starts.

- **Trigger**: Time, using the Axle Energy **Event start** sensor
- **Condition**: State, with the Axle Energy **Import / Export** sensor set to `export`
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
      entity_id: sensor.axle_energy_import_export
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

## Data updates

The integration {% term polling polls %} Axle every 10 minutes. All three sensors use the same update. Changes to the published schedule appear after the next successful update.

When Axle returns an empty schedule, the sensors show an unknown state. Events you have opted out of are excluded. If the event request fails, the sensors become unavailable and recover after a successful update.

## Known limitations

- Each entry uses its own Axle API key. You can add another feed with a different key.
- The integration reads the event schedule. It does not control your battery or inverter, or change your Axle participation mode.
- Countdown, event activity, and calendar entities are not provided.
- The event information depends on Axle's cloud service and may change between updates.

## Troubleshooting

### Authentication fails

Check that you copied the full token from the **Home Assistant** section of your Axle account. Enter only the token in **API key**, without a `Bearer ` prefix. If the token has been revoked, generate a new one in Axle. Remove the affected Axle Energy entry from {% my integrations title="**Settings** > **Devices & services**" %}, then add it again with the new token. Check the entity IDs used in your automations after adding it again.

### The sensors are unavailable

Check your internet connection and whether you can access your Axle account. The integration retries connection failures automatically. If authentication fails, follow the token replacement steps above. If the problem continues, check {% my logs title="**Settings** > **System** > **Logs**" %} for an Axle error.

### The sensors show an unknown state

Check whether Axle has scheduled an event for your account and whether you have opted out of it. An empty schedule is a valid response and does not indicate a connection failure.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration does not close your Axle account or change your participation mode.
