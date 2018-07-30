---
layout: page
title: "Buienradar"
description: "Instructions on how to integrate buienradar.nl weather within Home Assistant."
date: 2017-05-15 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: buienradar.png
ha_category: Weather
ha_release: 0.47
ha_iot_class: "Cloud Polling"
---

The `buienradar` platform uses [buienradar.nl](http://buienradar.nl/) as a source for current meteorological data for your location. The weather forecast is delivered by Buienradar, who provides a web service that provides detailed weather information for users in The Netherlands.

The relevant weather station used will be automatically selected based on the location specified in the Home Assistant configuration (or in the Buienradar weather/sensor component).  A map of all available weather stations can be found [here](https://www.google.com/maps/d/embed?mid=1NivHkTGQUOs0dwQTnTMZi8Uatj0).

## {% linkable_title Configuration %}

To add the Buienradar weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
```

Configuration variables:

- **name** (*Optional*): You can specify a name of the component, but do not have to. If you specify a name, the weather component will get an entity name of `weather.[name]`; if no name is specified, it will try to set its name to `weather.BR_[stationname]`. However at the moment in time, the entity is created, no data has been retrieved yet, so the entity will get named `weather.BR_unknown_station`. Later the station name will be known and get updated, but the entity name remains.
- **latitude** (*Optional*): Latitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration but can be overridden/changed in this component to select a different location for Buienradar.
- **longitude**(*Optional*): Longitude to use for selection of data source location. Longitude and latitude will be taken from Home Assistant configuration but can be overridden/changed in this component to select a different location for Buienradar.
- **forecast** (*Optional*): 'true' to add a temperature forecast, 'false' to suppress it.


A full configuration example:

```yaml
# Example configuration.yaml entry
weather:
  - platform: buienradar
    name: 'volkel'
    # Force 'Meetstation Volkel' to be used:
    latitude: 51.65
    longitude: 5.70
    forecast: true
```

<p class='note'>
This platform is an alternative to the [`buienradar`](/components/sensor.buienradar/) sensor.
The weather platform is easier to configure but less customizable.
</p>

[Usage statement:](https://www.buienradar.nl/overbuienradar/gratis-weerdata)
> Buienradar makes free weather data available for use by individuals and businesses (website/intranet). The use of the weather data is allowed for **non-commercial purposes**. Please refer to the full usage statement linked above to confirm your use or to request permission.
