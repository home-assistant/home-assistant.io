---
title: Buienradar
description: Instructions on how to integrate buienradar.nl weather within Home Assistant.
ha_category:
  - Camera
  - Weather
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mjj4791'
  - '@ties'
  - '@Robbie1221'
ha_domain: buienradar
ha_platforms:
  - camera
  - sensor
  - weather
---

The `buienradar` integration uses [buienradar.nl](https://buienradar.nl/) as a source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a web service that provides detailed weather information for users in The Netherlands.

The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the Buienradar weather/sensor component).  A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0).

Besides the weather platform, there is currently support for the following additional device types:

- [Camera](#camera): Radar map
- [Sensor](#sensor): Extended weather data

{% include integrations/config_flow.md %}

## Configuration

To add the Buienradar weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
```

{% configuration %}
name:
  description: "You can specify a name of the component, but do not have to. If you specify a name, the weather integration will get an entity name of `weather.[name]`; if no name is specified, it will try to set its name to `weather.BR_[stationname]`. However at the moment in time, the entity is created, no data has been retrieved yet, so the entity will get named `weather.BR_unknown_station`. Later the station name will be known and get updated, but the entity name remains."
  required: false
  type: string
latitude:
  description: Latitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration but can be overridden/changed in this integration to select a different location for Buienradar.
  required: false
  type: float
longitude:
  description: Longitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration but can be overridden/changed in this integration to select a different location for Buienradar.
  required: false
  type: float
forecast:
  description: "`true` to add a temperature forecast, `false` to suppress it."
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Full configuration

A full configuration example:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
    name: "volkel"
    # Force 'Meetstation Volkel' to be used:
    latitude: 51.65
    longitude: 5.70
    forecast: true
```


<div class='note'>

This platform is an alternative to the [`buienradar`](/integrations/sensor.buienradar/) sensor.
The weather platform is easier to configure but less customizable.

</div>

## Camera

The `buienradar` camera platform uses [buienradar.nl](https://buienradar.nl/) as a source for the last rain radar map. The overview image of the whole of the Netherlands is loaded and shown as a camera in Home Assistant.

Internally this component uses the radar map image as [documented](https://www.buienradar.nl/overbuienradar/gratis-weerdata) on buienradar.nl.
The downloaded image is cached to prevent Home Assistant from making a new request to buienradar.nl multiple times a minute when Home Assistant checks for new stills from the camera.

To add `buienradar` camera to Home Assistant, add the following section to your
`configuration.yaml` file:
```yaml
# Example configuration.yaml entry
camera:
  - platform: buienradar
```

{% configuration %}
name:
  description: You can (optionally) specify the name of the camera. The name
    will be shown in the user interface below the radar image.
  required: false
  type: string
dimension:
  description: Size of the image to be loaded from buienradar.nl
    (120 to 700 pixels)
  required: false
  default: 512
  type: integer
delta:
  description: Time interval in seconds between image updates
  required: false
  default: 600
  type: integer
country_code:
  description: You can (optionally) specify the country code (NL or BE) of the
    country to display on the camera.
  required: false
  default: NL
  type: string
{% endconfiguration %}

### The `name` Variable

If you specify a name, the camera will get this name as its label. A slugified
version of the name will be used as the name of the entity.

With the default of "Buienradar loop" the entity name becomes
`camera.buienradar_loop`.

_[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
Buienradar makes free weather data available for use by individuals and businesses (website/intranet). The use of the weather data is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your use or to request permission._
