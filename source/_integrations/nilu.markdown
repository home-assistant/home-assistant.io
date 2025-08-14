---
title: Norwegian Institute for Air Research (NILU)
description: Instructions on how to integrate air pollution data from NILU within Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.87
ha_codeowners:
  - '@hfurubotten'
ha_domain: nilu
ha_platforms:
  - air_quality
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `nilu` air quality {% term integration %} shows measurements of current air quality from NILU (Norsk Institutt for luftforskning/Norwegian Institute for Air Research) sensor stations within Norway. Makes data from the open API at [luftkvalitet.info](https://www.luftkvalitet.info) and [nilu.no](https://nilu.no/) available in Home Assistant.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: nilu
```

{% configuration %}
latitude:
  description: Manually specify latitude. By default, the value will be taken from the Home Assistant configuration.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
longitude:
  description: Manually specify longitude. By default, the value will be taken from the Home Assistant configuration.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: NILU
  type: string
area:
  description: Name of an area to get sensor stations from. See available areas below.
  required: exclusive
  type: string
stations:
  description: Name of a specific station to get measurements from.
  required: exclusive
  type: string
show_on_map:
  description: Option to show the position of the sensor station on the map.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Health risk index explanations

Under the attributes from a NILU station, there will be a `nilu pollution index`. This indicates how polluted the air is in the area around the sensor station. Following is a longer explanation of what the indexes mean.

### Low

Low or no health risk linked to measured air pollution. Outdoor activities are recommended.

### Moderate

Health effects may occur in some asthmatics and people with other respiratory diseases, as well as serious cardiovascular diseases. Outdoor activity can be recommended for the vast majority, but some should consider their activity in areas with high traffic or high emissions.

### High

Health effects may occur in asthmatics and people with other respiratory diseases, as well as serious cardiovascular disease. Children with respiratory distress (asthma, bronchitis) and adults with severe cardiac or respiratory distress should reduce outdoor activity and not stay in the most polluted areas.

### Extremely high

Sensitive groups in the population can have health effects. Respiratory irritation and discomfort may occur in healthy subjects. People with heart or respiratory distress should reduce outdoor activity and not stay in the most polluted areas.

Source: [Health Recommendations and Pollution Classes](https://luftkvalitet.miljodirektoratet.no/artikkel/en/articles/health-recommendations-and-pollution-classes/)

## Available areas

The `area` configuration is restricted to the areas NILU has defined. Here is the list of available areas:

- `Bergen`
- `Birkenes`
- `Bodø`
- `Brumunddal`
- `Bærum`
- `Drammen`
- `Elverum`
- `Fredrikstad`
- `Gjøvik`
- `Grenland`
- `Halden`
- `Hamar`
- `Harstad`
- `Hurdal`
- `Karasjok`
- `Kristiansand`
- `Kårvatn`
- `Lillehammer`
- `Lillesand`
- `Lillestrøm`
- `Lørenskog`
- `Mo i Rana`
- `Moss`
- `Narvik`
- `Oslo`
- `Prestebakke`
- `Sandve`
- `Sarpsborg`
- `Stavanger`
- `Sør-Varanger`
- `Tromsø`
- `Trondheim`
- `Tustervatn`
- `Zeppelinfjellet`
- `Ålesund`

## Configuration examples

Example of adding health risk monitoring from sensor stations around the Home Assistant location.

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
air_quality:
  - platform: nilu
```

Example where the sensors are also added to the map.

```yaml
# Example configuration.yaml entry
# Adds all sensor stations within 20km.
# Additionally adds the sensors to the map.
air_quality:
  - platform: nilu
    show_on_map: True
```

Example of a specific station.

```yaml
# Example configuration.yaml entry
# Monitors stations 'Alnabru'
air_quality:
  - platform: nilu
    stations:
      - Alnabru
```

Example of getting stations from a specified area, giving the sensors a custom name.

```yaml
# Example configuration.yaml entry
# Stations from specific area, 'Bergen'
# Custom name for the sensors.
air_quality:
  - platform: nilu
    area: Bergen
    name: Forurensing Bergen
```
