---
title: "Environment Canada Hydrometric Data"
description: "Hydrometric data from Environment Canada."
logo: environment_canada.png
ha_category:
  - Environment
  - Sensor
ha_release: 0.104
ha_iot_class: Cloud Polling
---

The `canada_hydrometric` integration provides hydrometric data for Canadian water features from [Environment Canada](https://wateroffice.ec.gc.ca/index_e.html).

## Location Selection

The platform automatically determines the closest hydrometric station. However, in some cases, you may need to override the automatic selection to use the desired station.

The location to use is determined according to the following hierarchy:

 - Station ID specified in platform configuration (optional)
 - Closest station to latitude/longitude specified in platform configuration (optional)
 - Closest station to latitude/longitude specified in Home Assistant core configuration

## Sensor

To add Environment Canada hydrometric sensors to your installation, add the desired lines from the following example to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: canada_hydrometric
```

- A sensor will be created for each of the following conditions:     
    - `water_level` - The most recent water level measurement in meters.
    - `discharge` - The most recent discharge measurement in m³/s.
- The platform automatically determines which station to use based on the system's latitude/longitude settings. For greater precision, it is also possible to specify either:
    - A specific station code of the form `ON/02KF005` based on those listed in [this CSV file](https://dd.weather.gc.ca/hydrometric/doc/hydrometric_StationList.csv), or
    - A specific latitude/longitude

{% configuration %}
latitude:
  description: Part of a set of coordinates to use when finding the closest station.
  required: inclusive
  type: float
longitude:
  description: Part of a set of coordinates to use when finding the closest station.
  required: inclusive
  type: float
station:
  description: The station code of a specific station to use. If provided, this station will be used and any latitude/longitude coordinates provided will be ignored. Station codes must be in the form of `ON/02KF005`, where `ON`is a provincial abbreviation and `02KF005` is a station code.
  required: false
  type: string
{% endconfiguration %}
