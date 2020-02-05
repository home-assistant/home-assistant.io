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
  type: integer
{% endconfiguration %}

Once that is configured you can enable it from the integrations page.

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

## Binary Sensor

This integration allows you to get the latest event seen by the camera.

If multiple cameras are available then each monitored condition
will create a specific sensor for each camera

## Camera

The `netatmo` camera platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) camera. This integration allows you to view the current live stream created by the Camera.

## Climate

The `netatmo` thermostat platform is consuming the information provided by a [Netatmo Smart Thermostat](https://www.netatmo.com/product/energy/thermostat) thermostat. This integration allows you to view the current temperature and setpoint.

## Sensor

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Weather Station](https://www.netatmo.com/en-us/weather/weatherstation) or a
[Netatmo Home Coach](https://www.netatmo.com/en-us/aircare/homecoach) [Netatmo](https://www.netatmo.com) device.
