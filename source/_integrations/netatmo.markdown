---
title: Netatmo
description: Instructions on how to integrate Netatmo integration into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Cover
  - Environment
  - Fan
  - Hub
  - Light
  - Media source
  - Sensor
  - Switch
  - Weather
ha_release: '0.20'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@cgtobi'
ha_config_flow: true
ha_domain: netatmo
ha_homekit: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - diagnostics
  - fan
  - light
  - select
  - sensor
  - switch
ha_integration_type: hub
---

The Netatmo integration platform is the main integration to integrate all Netatmo related platforms.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Camera](#camera)
- [Climate](#climate)
- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Sensor](#sensor)
- [Switch](#switch)
- [Webhook Events](#webhook-events)

{% include integrations/config_flow.md %}

### Extra configuration of the integration

Configuration of Netatmo public weather stations is offered from the front end. Enter the Netatmo integration and press the "CONFIGURE", then set "Area name" for new area.

In the dialog, it is possible to create, edit and remove public weather sensors. For each area a unique name has to be set along with an area to be covered and whether to display average, maximum or minimum values.

To edit an existing area, enter its name and follow the dialog.

## Binary sensor

The `netatmo` binary sensor platform is showing the connectivity for the [Netatmo Smart Home Weather Station](https://www.netatmo.com/smart-weather-station).

## Button

The `netatmo` button sensor platform provides support for moving compatible shutters to a preferred position.
Not all covers support this functionality, and we cannot automatically determine the capability, so these entities are disabled by default.

## Camera

The `netatmo` camera platform is consuming the information provided by a [Netatmo Smart Indoor](https://www.netatmo.com/smart-indoor-camera), [Outdoor](https://www.netatmo.com/smart-outdoor-camera) and [Netatmo Smart Video Doorbell](https://www.netatmo.com/smart-video-doorbell) camera. This integration allows you to view the current live stream created by the camera (exception: video doorbell).

The doorbell is currently not supported with the Home Assistant Cloud link mode (configured in the integration). Please use a [Netatmo dev account](#development--testing-with-your-own-client-id). Note that: if you have already created the Netatmo integration, you must remove it and configure it with the Netatmo dev account as explained in the previous link. Then you will see a Smart Doorbell device with a camera sensor.

## Climate

The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat), [Smart Modulating Thermostat](https://www.netatmo.com/smart-modulating-thermostat) and [Netatmo Smart Radiator Valve](https://www.netatmo.com/additional-smart-radiator-valve). This integration allows you to view the current temperature and control the setpoint.

## Cover

The `netatmo` cover platform provides support for Bubendorff shutters. 

## Fan

The `netatmo` fan plaform provides support for Legrand centralized ventilation control.

## Light

The `netatmo` light platform is consuming information provided by a [Netatmo Smart Outdoor](https://www.netatmo.com/smart-outdoor-camera) camera and requires an active webhook. This integration allows you to turn on/off the flood lights.
It further provides support for Legrand/BTicino dimmers.

## Sensor

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Smart Home Weather Station](https://www.netatmo.com/smart-weather-station) a
[Netatmo Smart Indoor Air Quality Monitor](https://www.netatmo.com/smart-indoor-air-quality-monitor) device or [Netatmo Public Weather Stations](https://weathermap.netatmo.com/).

## Switch

The `netatmo` switch platform provides support for Legrand/BTicino switches and power plugs.

## Actions

### Set Outdoor Camera Light Mode

`set_camera_light_mode`

Set the outdoor camera light mode.

| Data attribute | Required | Description                |
| ---------------------- | -------- | -------------------------- |
| `camera_light_mode`    | Yes      | Outdoor camera light mode. |

### Set Schedule

`set_schedule`

Set the heating schedule.

| Data attribute | Required | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `schedule_name`        | Yes      | The name of the schedule to activate. |

### Set preset mode with end date & time

`set_preset_mode_with_end_datetime`

Set the preset mode for a Netatmo climate device. The preset mode must match a preset mode configured at Netatmo.

| Data attribute | Required | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `preset_mode`          | Yes      | Climate preset mode such as Schedule, Away, or Frost Guard. |
| `end_datetime`         | Yes      | Date & time until which the preset will be active.          |

### Set temperature with end date & time

`set_temperature_with_end_datetime`

Sets the target temperature for a Netatmo climate device with an end date & time.

| Data attribute | Required | Description                                              |
| ---------------------- | -------- | -------------------------------------------------------- |
| `target_temperature`   | Yes      | The target temperature for the device.                   |
| `end_datetime`         | Yes      | Date & time the target temperature will be active until. |

### Set temperature with time period

`set_temperature_with_time_period`

Sets the target temperature for a Netatmo climate device as well as the time period during which this target temperature applies.

| Data attribute | Required | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `target_temperature`   | Yes      | The target temperature for the device.                      |
| `time_period`          | Yes      | Time period during which the target temperature is applied. |

### Clear temperature setting

`clear_temperature_setting`

Clears any temperature setting for a Netatmo climate device reverting it to the current preset or schedule.

### Set Person Home

`set_persons_home`

Set a list of persons as at home. Person's name must match a name known by the Netatmo Smart Indoor Camera.

| Data attribute | Required | Description    |
| ---------------------- | -------- | -------------- |
| `persons`              | Yes      | List of names. |

### Set Person Away

`set_person_away`

Set a person away. If no person is set the home will be marked as empty. Person's name must match a name known by the Netatmo Smart Indoor Camera.

| Data attribute | Required | Description    |
| ---------------------- | -------- | -------------- |
| `person`               | Yes      | Person's name. |

### (Un-)Register Webhooks

`register_webhook` and `unregister_webhook`

Actions to manually register and unregister the webhook.

## Webhook Events

The Netatmo backend sends instant events to Home Assistant by using webhooks which unlocks improved responsiveness of most devices with the exception of [Netatmo Smart Home Weather Station](https://www.netatmo.com/smart-weather-station),
[Netatmo Smart Indoor Air Quality Monitor](https://www.netatmo.com/smart-indoor-air-quality-monitor) or [Netatmo Public Weather Stations](https://weathermap.netatmo.com/).

{% warning %}
Netatmo webhook events have known issues with Home Assistant Cloud Link.
It is therefore recommended to use [an individual development account](#development--testing-with-your-own-client-id).
{% endwarning %}

To be able to receive events from [Netatmo](https://www.netatmo.com/), your Home Assistant instance needs to be accessible from the web over port `443`. To achieve this you can either use your Nabu Casa account or for example Duck DNS ([Home Assistant instructions](/addons/duckdns/)). You also need to have the external URL configured in the Home Assistant [configuration](/integrations/homeassistant/#allowlist_external_urls).

Events coming in from Netatmo will be available as an event in Home Assistant and are fired as `netatmo_event`, along with their data. You can use these events to trigger automations.

You can find the available event types at the [official Netatmo API documentation](https://dev.netatmo.com/apidocumentation/security#events).

Example:

```yaml
# Example automation for webhooks based Netatmo events
- alias: "Netatmo event example"
  description: "Count all events pushed by the Netatmo API"
  triggers:
    - trigger: event
      event_type: netatmo_event
  actions:
    - action: counter.increment
      entity_id: counter.event_counter
```

Example:

{% raw %}

```yaml
# Example automation for Netatmo Welcome
- alias: "Motion at home"
  description: "Motion detected at home"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: movement
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: "Netatmo event"
```

{% endraw %}

Example:

{% raw %}

```yaml
# Example automation for Netatmo Presence
- alias: "Motion at home"
  description: "Motion detected at home"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: human # other possible types: animal, vehicle
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: Netatmo event
```

{% endraw %}

Example:

{% raw %}

```yaml
# Example automation
- alias: "Door or window open or movement"
  description: "Notifies which door or window is open or was moved"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_open
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_big_move
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_small_move
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}
        title: "Netatmo event"
```

{% endraw %}

## Development / Testing with your own client ID

To enable the Netatmo integration with your own development credentials, you have
to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/).

Sign in using your username and password from your regular Netatmo account.

{% important %}
In your Netatmo Application configuration, do not enter a 'redirect URI' or a 'webhook URI'.  The 'webhook URI' is automatically registered by this integration based on the external URL configured in the Home Assistant [configuration](/integrations/homeassistant/#editing-the-general-settings-in-yaml).
{% endimportant %}

See [Application Credentials](/integrations/application_credentials) for instructions on how to configure your *Client ID* and *Client Secret*, then enable Netatmo through the integrations page.

Menu: **Settings** > **Devices & services**.

Click on the `+` sign to add an integration and click on **Netatmo**.
After completing the configuration flow, the Netatmo integration will be available.

## Troubleshooting

### Receiving events

To confirm your Home Assistant instance is receiving events via webhooks, you can listen to `netatmo_event` in {% my developer_events title="Developer Tools -> Events" %}.

### Light

If the lights show as unavailable the issue usually is that webhook is banned by Netatmo. To solve that [unregister](#un-register-webhooks) the webhook, go to the [Netatmo Developer Page](https://dev.netatmo.com/) to unban your webhook and then [register](#un-register-webhooks) the webhook.
