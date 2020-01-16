---
title: Netatmo
description: Instructions on how to integrate Netatmo integration into Home Assistant.
logo: netatmo.png
ha_category:
  - Hub
  - Environment
  - Weather
  - Binary Sensor
  - Sensor
  - Climate
  - Camera
ha_release: '0.20'
ha_iot_class: Cloud Polling
---

The `netatmo` integration platform is the main integration to integrate all Netatmo related platforms.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Climate](#climate)
- [Sensor](#sensor)

## Configuration

To enable the Netatmo component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
netatmo:
  api_key: YOUR_CLIENT_ID
  secret_key: YOUR_CLIENT_SECRET
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
api_key:
  description: The `client id` from your Netatmo app.
  required: true
  type: string
secret_key:
  description: The `client secret` from your Netatmo app.
  required: true
  type: integer
username:
  description: Username for the Netatmo account.
  required: true
  type: string
password:
  description: Password for the Netatmo account.
  required: true
  type: string
discovery:
  description: Whether to discover Netatmo devices automatically. Set it to False, if you want to choose which Netatmo device you want to add. Do not use discovery and manual configuration at the same time.
  required: false
  type: boolean
  default: true
webhooks:
  description: Enable webhooks for instant events of the Welcome and Presence cameras.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### Get API and Secret Key

To get your API credentials, you have to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/). Sign in using your username and password from your regular Netatmo account.
Click on 'Create an App' at the top of the page.

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

### Webhooks

The Welcome and Presence cameras can send instant events to Home Assistant by using webhooks. There are different types of events, each with slightly different data attached. To enable the webhooks add `webhooks: true` to your configuration. It is also required to have your camera enabled in Home Assistant. You can do this either by manually setting up the [platform](/integrations/netatmo#camera) or by enabeling [discovery](/integrations/netatmo/#discovery).

To be able to receive events from Netatmo, your Home Assistant instance needs to be accessible from the web ([Hass.io instructions](/addons/duckdns/)) and you need to have the base_url configured for the HTTP integration ([docs](/integrations/http/#base_url)).

Events coming in from Netatmo will be available as events in Home Assistant and are fired as netatmo_*, along with their data. You can use this event to trigger automations.

#### Events

The following events are available:

- netatmo_person (Welcome)
- netatmo_movement (Welcome & Presence)
- netatmo_human (Presence)
- netatmo_animal (Presence)
- netatmo_vehicle (Presence)
- netatmo_other (Welcome & Presence)

All events (except `netatmo_other`) contain the following attributes:

| Attribute | Description |
| --------- | ----------- |
| event_type | Type of event. E.G. `movement`.
| home_name | Name of the home the camera belongs to.
| camera_id | MAC address of the camera.
| message | Message describing what has been seen by the camera.

The Presence camera additionally has these attributes:

| Attribute | Description |
| --------- | ----------- |
| snapshot_url | URL to a picture of the full frame of the event.
| vignette_url | URL to a picture cropped down to the area of interest.

The Welcome camera additionally has these attributes for `netatmo_person` events:

| Attribute | Description |
| --------- | ----------- |
| id | ID of the person that has been seen.
| name | Name of the person that has been seen.
| is_known | Boolean value if the person is known.
| face_url | URL to a picture of the person.

The `netatmo_other` event passes all the webhook data through for all webhook events that don't match any of the above. Set the [level of logging](/integrations/logger/) for the `netatmo` integration to `debug` to view the data in the Home Assistant logs.

### Services (only for webhooks)

There are two services to manually add and drop the webhooks. This might be useful if your webhook has been banned and you want to readd the webhook without restarting Home Assistant.

| Service | Description |
| ------- | ----------- |
| addwebhook | Subscribe to webhooks. By default the automatically generated URL will be used. But you can pass `{"url": "https://yourdomain.com/yourwebhook/"}` as service data to the service call if you want to use a manually created [webhook trigger](/docs/automation/trigger/#webhook-trigger). In this case you have to manually process the data that is sent by Netatmo.
| dropwebhook | Unsubscribe existing webhooks.

## Binary Sensor

This integration allows you to get the latest event seen by the camera.

### Binary Sensor Advanced configuration

If you want to select a specific sensor,
set discovery to `false` for [netatmo](/integrations/netatmo/)
and add the following lines to your `configuration.yaml`:

{% configuration %}
home:
  description: Will use the cameras of this home only.
  required: false
  type: string
timeout:
  description: >
    The Welcome/Presence binary sensors will
    stay on for X seconds after detection.
  required: false
  type: integer
  default: 90
cameras:
  description: List of cameras entity IDs to display.
  required: false
  type: list
welcome_sensors:
  description: >
    List of monitored conditions. Possible values are
    'Someone known', 'Someone unknown' and 'Motion'.
  required: false
  type: list
presence_sensors:
  description: >
    List of monitored conditions. Possible values are 'Outdoor motion',
    'Outdoor human', 'Outdoor animal' and 'Outdoor vehicle'.
  required: false
  type: list
{% endconfiguration %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: netatmo
  home: home_name
  timeout: 90
  cameras:
    - camera_name1
  welcome_sensors:
    - Someone known
    - Someone unknown
    - Motion
  presence_sensors:
    - Outdoor motion
    - Outdoor human
    - Outdoor animal
    - Outdoor vehicle
```

If **home** and **cameras** is not provided, all cameras will be used.
If multiple cameras are available then each monitored conditions
will create a specific sensor for each camera

## Camera

The `netatmo` camera platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) camera. This integration allows you to view the current photo created by the Camera.

### Camera Advanced configuration

If you want to select a specific camera,
set discovery to `false` for [netatmo](/integrations/netatmo/)
and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
camera:
  - platform: netatmo
```

{% configuration %}
home:
  description: Will display the cameras of this home only.
  required: false
  type: string
cameras:
  description: Cameras to use. Multiple entities allowed.
  required: false
  type: list
  keys:
    camera_name:
      description: Name of the camera to display.
quality:
  description: Quality of the live stream. (`'high'`, `'medium'`, `'low'` or `'poor'`)
  required: false
  type: string
  default: high
{% endconfiguration %}

If **home** and **cameras** are not provided, all cameras will be displayed. For more control over your cameras check the configuration sample below.

```yaml
# Example configuration.yaml entry
camera:
  platform: netatmo
  home: home_name
  quality: medium
  cameras:
    - camera_name1
    - camera_name2
```

### Services (only for camera)

The services below permit to control whether the camera should monitor and alert on motion detection. Also, it allows to control the status of the flood light (only for Presence model).

| Service | Description |
| ------- | ----------- |
| enable_motion_detection | Enable motion detection and alert. 
| disable_motion_detection | Disable motion detection and alert. 
| set_light_auto | Presence model only : Set flood light on automatic mode.
| set_light_on | Presence model only : Set flood light on.
| set_light_off | Presence model only : Set flood light off.

## Climate

The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat) thermostat. This integration allows you to view the current temperature and setpoint.

### Camera Advanced configuration

If you want to select specific homes or specific rooms,
set discovery to `false` for [netatmo](/integrations/netatmo/)
and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  - platform: netatmo
```

{% configuration %}
homes:
  description: Will display the thermostats of the homes listed.
  required: false
  type: list
  keys:
    name:
      required: true
      description: The home name.
    rooms:
      description: Rooms to be displayed. Multiple entities allowed.
      required: false
      type: [list, string]
      description: List of the names of the rooms to be displayed.
{% endconfiguration %}

If **homes** and **rooms** are not provided, all thermostats will be displayed.

```yaml
# Example configuration.yaml entry
climate:
  platform: netatmo
  homes:
    - name: home1_name
      rooms:
        - room1_name
        - room2_name
    - name: home2_name
      rooms:
        - room3_name
        - room4_name
        - room5_name
```

## Sensor

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Weather Station](https://www.netatmo.com/en-us/weather/weatherstation), a
[Netatmo Home Coach](https://www.netatmo.com/en-us/aircare/homecoach) [Netatmo](https://www.netatmo.com) device or the public sensors of others available via the [Netatmo API](https://weathermap.netatmo.com/) even if you don't own a Netatmo device.

Public sensors have to be set up manually.

## Advanced sensor configuration

If you want to select a specific sensor, set discovery to False for [netatmo](/integrations/netatmo/) and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  # Personal sensors
  - platform: netatmo
    station: STATION_NAME
    modules:
      - module_name1
      - module_name2

  # Public sensor
  - platform: netatmo
    areas:
      - lat_ne: 40.719
        lon_ne: -73.735
        lat_sw: 40.552
        lon_sw: -74.105
```

{% configuration %}
station:
  required: false
  description: The name of the weather station. Needed if several stations are associated with the account.
  type: string
modules:
  required: false
  description: Modules to use. Multiple entries allowed. Please check the next section about how to retrieve the module names.
  type: list
  keys:
    module_name:
      type: list
      required: true
      description: Name of the module.
areas:
  description: The list contains one or more areas to add as sensors.
  required: false
  type: map
  keys:
    lat_ne:
      description: Latitude of north-eastern corner of area.
      required: true
      type: string
    lon_ne:
      description: Longitude of north-eastern corner of area.
      required: true
      type: string
    lat_sw:
      description: Latitude of south-western corner of area.
      required: true
      type: string
    lon_sw:
      description: Longitude of south-western corner of area.
      required: true
      type: string
    name:
      description: Name of the sensor.
      required: false
      type: string
      default: Netatmo Public Data
    mode:
      description: "How to calculate the value of the sensor if there are multiple stations reporting data. Accepts `max` or `avg`."
      required: false
      type: string
      default: avg
{% endconfiguration %}

## Find your modules name

You can find your modules name in your [online NetAtmo account](https://my.netatmo.com/app/station). These names can be found and changed in parameters. You have to provide these name in your Home Assistant `configuration.yaml` file.

<p class='img'>
<img src='/images/screenshots/netatmo_module.png' />
</p>
