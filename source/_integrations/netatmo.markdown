---
title: Netatmo
description: Instructions on how to integrate Netatmo integration into Home Assistant.
ha_category:
  - Camera
  - Climate
  - Cover
  - Environment
  - Hub
  - Light
  - Media Source
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
  - camera
  - climate
  - cover
  - diagnostics
  - light
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The Netatmo integration platform is the main integration to integrate all Netatmo related platforms.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Sensor](#sensor)
- [Switch](#switch)
- [Webhook Events](#webhook-events)

{% include integrations/config_flow.md %}

### Extra configuration of the integration

Configuration of Netatmo public weather stations is offered from the front end. Enter the Netatmo integration and press the "CONFIGURE", then set "Area name" for new area.

In the dialog, it is possible to create, edit and remove public weather sensors. For each area a unique name has to be set along with an area to be covered and whether to display average or maximum values.

To edit an existing area, enter its name and follow the dialog.

## Camera

The `netatmo` camera platform is consuming the information provided by a [Netatmo Smart Indoor](https://www.netatmo.com/en-gb/security/cam-indoor), [Outdoor](https://www.netatmo.com/en-gb/security/cam-outdoor) and [Netatmo Smart Video Doorbell](https://www.netatmo.com/en-gb/security/doorbell) camera. This integration allows you to view the current live stream created by the camera (exception: video doorbell).

## Climate

The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat), [Smart Modulating Thermostat](https://www.netatmo.com/en-gb/energy/modulating-thermostat) and [Netatmo Smart Radiator Valve](https://www.netatmo.com/en-gb/energy/additional-valve). This integration allows you to view the current temperature and control the setpoint.

## Cover

The `netatmo` cover platform provides support for Bubendorff shutters. 

## Light

The `netatmo` light platform is consuming information provided by a [Netatmo Smart Outdoor](https://www.netatmo.com/en-gb/security/cam-outdoor) camera and requires an active webhook. This integration allows you to turn on/off the flood lights.
It further provides support for Legrand/BTicino dimmers.

## Sensor

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Smart Home Weather Station](https://www.netatmo.com/en-us/weather/weatherstation) a
[Netatmo Smart Indoor Air Quality Monitor](https://www.netatmo.com/en-us/aircare/homecoach) device or [Netatmo Public Weather Stations](https://weathermap.netatmo.com/).

## Switch

The `netatmo` switch platform provides support for Legrand/BTicino switches and power plugs.

## Services

### Set Outdoor Camera Light Mode

`set_camera_light_mode`

Set the outdoor camera light mode. This requires an entity id and a valid state.

### Set Schedule

`set_schedule`

Set the heating schedule. This requires an entity id and a schedule name.

### Set Person Home

`set_persons_home`

Set a list of persons as at home. Person's name must match a name known by the Netatmo Smart Indoor Camera.

### Set Person Away

`set_person_away`

Set a person away. If no person is set the home will be marked as empty. Person's name must match a name known by the Netatmo Smart Indoor Camera.

### (Un-)Register Webhooks

`register_webhook` and `unregister_webhook`

Service to manually register and unregister the webhook.

## Webhook Events

The Netatmo backend sends instant events to Home Assistant by using webhooks which unlocks improved responsiveness of most devices with the exception of [Netatmo Smart Home Weather Station](https://www.netatmo.com/en-us/weather/weatherstation),
[Netatmo Smart Indoor Air Quality Monitor](https://www.netatmo.com/en-us/aircare/homecoach) or [Netatmo Public Weather Stations](https://weathermap.netatmo.com/).

<div class='note warning'>

Netatmo webhook events have known issues with Home Assistant Cloud Link.
It is therefore recommended to use [an individual development account](#development--testing-with-your-own-client-id).

</div>

To be able to receive events from [Netatmo](https://www.netatmo.com/en-gb/), your Home Assistant instance needs to be accessible from the web over port `443`. To achieve this you can either use your Nabu Casa account or for example Duck DNS ([Home Assistant instructions](/addons/duckdns/)). You also need to have the external URL configured in the Home Assistant [configuration](/docs/configuration/basic).

Events coming in from Netatmo will be available as an event in Home Assistant and are fired as `netatmo_event`, along with their data. You can use these events to trigger automations.

You can find the available event types at the [official Netatmo API documentation](https://dev.netatmo.com/apidocumentation/security#events).

Example:

```yaml
# Example automation for webhooks based Netatmo events
- alias: "Netatmo event example"
  description: "Count all events pushed by the Netatmo API"
  trigger:
    - event_data: {}
      event_type: netatmo_event
      platform: event
  action:
    - data: {}
      entity_id: counter.event_counter
      service: counter.increment
```

Example:

{% raw %}

```yaml
# Example automation for Netatmo Welcome
- alias: "Motion at home"
  description: "Motion detected at home"
  trigger:
    - event_type: netatmo_event
      platform: event
      event_data:
        type: movement
  action:
    - data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: Netatmo event
      service: persistent_notification.create
```

{% endraw %}

Example:

{% raw %}

```yaml
# Example automation for Netatmo Presence
- alias: "Motion at home"
  description: "Motion detected at home"
  trigger:
    - event_type: netatmo_event
      platform: event
      event_data:
        type: human # other possible types: animal, vehicle
  action:
    - data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: Netatmo event
      service: persistent_notification.create
```

{% endraw %}

Example:

{% raw %}

```yaml
# Example automation
- alias: "door or window open or movement"
  description: "Notifies which door or window is open or was moved"
  trigger:
    - event_type: netatmo_event
      platform: event
      event_data:
        type: tag_open
    - event_type: netatmo_event
      platform: event
      event_data:
        type: tag_big_move
    - event_type: netatmo_event
      platform: event
      event_data:
        type: tag_small_move
  action:
    - data:
        message: >
          {{ trigger.event.data["data"]["message"] }}
        title: Netatmo event
      service: persistent_notification.create
```

{% endraw %}

## Development / Testing with your own client ID

To enable the Netatmo component with your own development credentials, you have
to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/).

Sign in using your username and password from your regular Netatmo account.

<div class='note warning'>
 
In your Netatmo Application configuration, do not enter a 'redirect URI' or a 'webhook URI'.  The 'webhook URI' is automatically registered by this integration based on the external URL configured in the Home Assistant [configuration](/docs/configuration/basic).
  
</div>

See [Application Credentials](/integrations/application_credentials) for instructions on how to configure your *Client ID* and *Client Secret*, then enable Netatmo through the integrations page.

Menu: **Settings** -> **Devices & Services**.

Click on the `+` sign to add an integration and click on **Netatmo**.
After completing the configuration flow, the Netatmo integration will be available.

## Troubleshooting

### Receiving events

To confirm your Home Assistant instance is receiving events via webhooks, you can listen to `netatmo_event` in {% my developer_events title="Developer Tools -> Events" %}.

### Light

If the lights show as unavailable the issue usually is that webhook is banned by Netatmo. To solve that [unregister](#un-register-webhooks) the webhook, go to the [Netatmo Developer Page](https://dev.netatmo.com/) to unban your webhook and then [register](#un-register-webhooks) the webhook.
