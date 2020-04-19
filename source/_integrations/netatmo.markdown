---
title: Netatmo
description: Instructions on how to integrate Netatmo integration into Home Assistant.
ha_category:
  - Hub
  - Environment
  - Weather
  - Sensor
  - Climate
  - Camera
ha_release: '0.20'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@cgtobi'
ha_config_flow: true
ha_domain: netatmo
---

The `netatmo` integration platform is the main integration to integrate all Netatmo related platforms.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)
- [Climate](#climate)
- [Sensor](#sensor)
- [Webhooks](#webhooks)

## Configuration

To enable the Netatmo component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
netatmo:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

{% configuration %}
client_id:
  description: The `client id` from your Netatmo app.
  required: true
  type: string
client_secret:
  description: The `client secret` from your Netatmo app.
  required: true
  type: string
{% endconfiguration %}

**After the client_id and client_secret is added to your `configuration.yaml` you must enable Netatmo through the integrations page.**

### Extra configuration of the integration

Configuration of Netatmo public weather stations is offered from the front end. Enter the Netatmo integration and press the cogwheel.

### Get API and Secret Key

To get your API credentials, you have to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/). Sign in using your username and password from your regular Netatmo account.
Open the [app creator](https://dev.netatmo.com/apps/createanapp#form) form.

<p class='img'>
<img src='/images/screenshots/netatmo_create.png' />
</p>
You have to fill the form, but only two fields are required: Name and Description. It doesn't really matter what you put into those. Just write something that make sense to you. To submit your new app, click on create at the bottom of the form.

<p class='img'>
<img src='/images/screenshots/netatmo_app.png' />
</p>

That's it. You can copy and paste your new `client id` and `client secret` in your Home Assistant configuration file just as described above, in the configuration example.

<p class='img'>
<img src='/images/screenshots/netatmo_api.png' />
</p>

## Camera

The `netatmo` camera platform is consuming the information provided by a [Netatmo Smart Indoor](https://www.netatmo.com/en-gb/security/cam-indoor) or [Outdoor](https://www.netatmo.com/en-gb/security/cam-outdoor) camera. This integration allows you to view the current live stream created by the camera.

## Climate

The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat) or [Netatmo Smart Radiator Valve](https://www.netatmo.com/en-gb/energy/additional-valve). This integration allows you to view the current temperature and control the setpoint.

## Sensor

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Smart Home Weather Station](https://www.netatmo.com/en-us/weather/weatherstation) a
[Netatmo Smart Indoor Air Quality Monitor](https://www.netatmo.com/en-us/aircare/homecoach) device or Netatmo Public Weather Stations.

## Webhooks

The [Netatmo Smart Indoor](https://www.netatmo.com/en-gb/security/cam-indoor) or [Outdoor](https://www.netatmo.com/en-gb/security/cam-outdoor) cameras, [Smart Door and Window Sensors](https://www.netatmo.com/en-gb/security/cam-indoor/tag), as well as the [Netatmo Smart Smoke Alarm](https://www.netatmo.com/en-gb/security/smoke-alarm), send instant events to Home Assistant by using webhooks. It is required to have your camera enabled in Home Assistant.

To be able to receive events from [Netatmo](https://www.netatmo.com/en-gb/), your Home Assistant instance needs to be accessible from the web over port `80` or `443`. To achieve this you can either use your Nabu Casa account or for example Duck DNS ([Home Assistant instructions](/addons/duckdns/)). You also need to have the `base_url` configured for the HTTP integration ([documentation](/integrations/http/#base_url)).

Events coming in from Netatmo will be available as an event in Home Assistant and are fired as `netatmo_event`, along with their data. You can use these events to trigger automations.

You can find the available event types at the [official Netatmo API documentation](https://dev.netatmo.com/apidocumentation/security#events).

Example:

{% raw %}

```yaml
# Example automation for webhooks based Netatmo events
- alias: Netatmo event example
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

{% endraw %}

Example:

{% raw %}

```yaml
# Example automation for Netatmo Welcome
- alias: Motion at home
  description: 'Motion detected at home'
  trigger:
  - event_type: netatmo_event
    platform: event
    event_data:
      type: movement
  action:
  - data_template:
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
- alias: Motion at home
  description: 'Motion detected at home'
  trigger:
  - event_type: netatmo_event
    platform: event
    event_data:
      type: human # other possible types: animal, vehicle
  action:
  - data_template:
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
- alias: door or window open or movement
  description: 'Notifies which door or window is open or was moved'
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
  - data_template:
      message: >
        {{ trigger.event.data["data"]["message"] }}  
      title: Netatmo event
    service: persistent_notification.create
```

{% endraw %}
