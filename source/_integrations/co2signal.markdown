---
title: CO2 Signal
description: Instructions on how to use CO2Signal data within Home Assistant
ha_category:
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - sensor
---

The `co2signal` sensor platform queries the [CO2Signal](https://www.co2signal.com/) API for the CO2 intensity of a specific region. Data can be collected via latitude/longitude or by country code. This API uses the same data as <https://www.electricitymap.org> Not all countries/regions in the world are supported so please consult this website to check local availability.

This platform requires a CO2Signal API key, which can be obtained [here](https://www.co2signal.com/). Note that this API key is for personal use only and other options exist when the data is used commercially.

At the moment, the free CO2Signal API only supports the average carbon intensity of a country and not the marginal carbon intensity.

<div class='note warning'>
The "free" API key is limited to a limited number of calls. Too many requests can result in data loss.
</div>

## Configuration

To set up this platform, get your [API key](https://www.co2signal.com/) and add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: co2signal
    token: YOUR_CO2SIGNAL_API_KEY
```

By default, the sensor will use your Home Assistant longitude and latitude. More detailed configurations to overwrite this can be found below.

{% configuration %}
token:
  description: Your CO2Signal API key.
  required: true
  type: string
latitude:
  description: The latitude of the location to monitor.
  required: false
  type: string
  default: "The latitude defined under the `homeassistant` key in `configuration.yaml`."
longitude:
  description: The longitude of the location to monitor.
  required: false
  type: string
  default: "The longitude defined under the `homeassistant` key in `configuration.yaml`."
country_code:
  description: The country code or region code.
  required: false
  type: string
{% endconfiguration %}

To enable the platform and gather data via a specific latitude/longitude, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: co2signal
    token: YOUR_CO2SIGNAL_API_KEY
    latitude: YOUR_LATITUDE
    longitude: YOUR_LONGITUDE
```

A similar result can be achieved by using the country code. In that case, use the following lines in your `configuration.yaml` file:

```yaml
sensor:
  - platform: co2signal
    token: YOUR_CO2SIGNAL_API_KEY
    country_code: YOUR_COUNTRY_CODE
```

## Example Configurations

Configuration using custom latitude and longitude:

```yaml
sensor:
  - platform: co2signal
    token: YOUR_CO2SIGNAL_API_KEY
    latitude: 55.4
    longitude: 5.5
```

Configuration using a country code:

```yaml
sensor:
  - platform: co2signal
    token: YOUR_CO2SIGNAL_API_KEY
    country_code: BE
```

## Sensor Types

When configured, the platform will create one sensor for each configured location.
