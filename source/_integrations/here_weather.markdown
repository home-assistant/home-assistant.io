---
title: "HERE Destination Weather"
description: "Instructions on how to add HERE Destination Weather to Home Assistant."
logo: HERE_logo.svg
ha_category:
  - Weather
  - Sensor
ha_iot_class: Cloud Polling
ha_release: "0.103"
---

The `here_weather` integration provides weather information from the [HERE Destination Weather API](https://developer.here.com/documentation/weather/dev_guide/topics/overview.html).

This integration consists of the following platforms:

- [Sensor](#sensor)
- [Weather](#weather)

## Setup

You need to register for an API key (REST & XYZ HUB API/CLI) by following the instructions [here](https://developer.here.com/documentation/weather/dev_guide/common/credentials.html).

HERE offers a Freemium Plan which includes 250,000 free Transactions per month. For the Destination Weather API, one transaction equals one request. More information can be found [here](https://developer.here.com/faqs#payment-subscription).

By default HERE will deactivate your account if you exceed the free Transaction limit for the month. You can add payment details to reenable your account as described [here](https://developer.here.com/faqs).

## Sensor

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: here_weather
    app_id: "YOUR_APP_ID"
    app_code: "YOUR_APP_CODE"
```

The location to get the weather information for can be provided via `location_name`, `latitude/longitude` or `zip_code`(US Only).
If none of these is provided the `latitude` and `longitude` of the Homeassistance instance is used.

{% configuration %}
app_id:
  description: "Your application's API id (get one by following the instructions above)."
  required: true
  type: string
app_code:
  description: "Your application's API code (get one by following the instructions above)."
  required: true
  type: string
location_name:
  description: "The name of the location to get the weather information for. Cannot be used in combination with `latitude/longitude` or `zip_code`."
  required: false
  type: string
zip_code:
  description: "The ZIP code (US Only) of the location to get the weather information for. Cannot be used in combination with `latitude/longitude` or `location_name`."
  required: false
  type: string
latitude:
  description: "The latitude of the location to get the weather information for. Must be used in combination with `longitude`. Cannot be used in combination with `location_name` or `zip_code`."
  required: false
  type: string
longitude:
  description: "The latitude of the location to get the weather information for. Must be used in combination with `latitude`. Cannot be used in combination with `location_name` or `zip_code`."
  required: false
  type: string
name:
  description: A name to display on the sensor. The default is "here_weather".
  required: false
  type: string
  default: "here_weather"
mode:
  description: "You can choose between: `forecast_astronomy`, `forecast_hourly`, `forecast_7days`, `forecast_7days_simple`, `observation` or `truck`. The default is `forecast_7days_simple`. You can find more information on the modes [here](https://developer.here.com/api-explorer/rest/auto_weather). The sensors which get created differ between the modes."
  required: false
  type: string
  default: "forecast_7days_simple"
offset:
  description: "Which entry of the returned data to choose. This could be used to get the data of 5 days in the future from the point of request."
  required: false
  type: integer
  default: 0
unit_system:
  description: "You can choose between `metric` or `imperial`."
  required: false
  default: Defaults to `metric` or `imperial` based on the Home Assistant configuration.
  type: string
scan_interval:
  description: "Defines the update interval of the sensor in seconds. Defaults to 120 (2 minutes)."
  required: false
  type: integer
  default: 120
{% endconfiguration %}

### Advanced Example

```yaml
sensor:
  - platform: here_weather
    name: Mainz in 5 Hours
    app_id: "YOUR_APP_ID"
    app_code: "YOUR_APP_CODE"
    location_name: Mainz
    mode: forecast_hourly
    offset: 5
```

## Weather

To enable the weather integration, add the following lines to your `configuration.yaml` file:

```yaml
weather:
  - platform: here_weather
    app_id: "YOUR_APP_ID"
    app_code: "YOUR_APP_CODE"
```

The location to get the weather information for can be provided via `location_name`, `latitude/longitude` or `zip_code`(US Only).
If none of these is provided the `latitude` and `longitude` of the Homeassistance instance is used.

{% configuration %}
app_id:
  description: "Your application's API id (get one by following the instructions above)."
  required: true
  type: string
app_code:
  description: "Your application's API code (get one by following the instructions above)."
  required: true
  type: string
location_name:
  description: "The name of the location to get the weather information for. Cannot be used in combination with `latitude/longitude` or `zip_code`."
  required: false
  type: string
zip_code:
  description: "The ZIP code (US Only) of the location to get the weather information for. Cannot be used in combination with `latitude/longitude` or `location_name`."
  required: false
  type: string
latitude:
  description: "The latitude of the location to get the weather information for. Must be used in combination with `longitude`. Cannot be used in combination with `location_name` or `zip_code`."
  required: false
  type: string
longitude:
  description: "The latitude of the location to get the weather information for. Must be used in combination with `latitude`. Cannot be used in combination with `location_name` or `zip_code`."
  required: false
  type: string
name:
  description: A name to display on the sensor. The default is "HERE".
  required: false
  type: string
  default: "HERE"
mode:
  description: "You can choose between: `forecast_hourly`, `forecast_7days`, `forecast_7days_simple`, `observation` or `truck`. The default is `forecast_7days_simple`. You can find more information on the modes [here](https://developer.here.com/api-explorer/rest/auto_weather). The sensors which get created differ between the modes."
  required: false
  type: string
  default: "forecast_7days_simple"
unit_system:
  description: "You can choose between `metric` or `imperial`."
  required: false
  default: Defaults to `metric` or `imperial` based on the Home Assistant configuration.
  type: string
scan_interval:
  description: "Defines the update interval of the sensor in seconds. Defaults to 120 (2 minutes)."
  required: false
  type: integer
  default: 120
{% endconfiguration %}

### Advanced Example

```yaml
weather:
  - platform: here_weather
    name: Mainz Hourly
    app_id: "YOUR_APP_ID"
    app_code: "YOUR_APP_CODE"
    location_name: Mainz
    mode: forecast_hourly
```