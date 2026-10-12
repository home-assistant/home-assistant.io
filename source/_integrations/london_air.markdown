---
title: London Air
description: Display the current status of London air quality by area and pollution type.
ha_category:
  - Health
ha_release: 0.52
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: london_air
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
---

The **London Air** {% term integration %} queries the [London air quality data feed](https://api.erg.ic.ac.uk/AirQuality/Hourly/MonitoringIndex/GroupName=London/Json) provided by Imperial College London. A sensor is added for each London borough you select. The state of each sensor is the overall air quality in that borough. All London boroughs can be selected, but not all of them have data available, and which ones do may change over time.

Boroughs can have multiple monitoring sites at different geographical positions within the borough, and each of those sites can monitor up to six different kinds of pollutant. The pollutants are carbon monoxide (CO), nitrogen dioxide (NO2), ozone (O3), sulfur dioxide (SO2), and PM2.5 and PM10 particulates, and are described in the [API documentation](https://api.erg.ic.ac.uk/AirQuality/Information/Species/Json). The `latitude` and `longitude` of each site are accessible through a `data` attribute of the sensor, as are details about the pollutants monitored at that site. The `sites` attribute of a sensor displays how many monitoring sites that sensor covers. The `updated` attribute of a sensor states when the data was last published.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Locations:
  description: "The London boroughs to track. All boroughs are selected by default."
{% endconfiguration_basic %}

To change the boroughs you track, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **London Air** integration, and select **Configure**.

## Data updates

The **London Air** integration polls the data feed every 30 minutes. The feed is updated hourly, but the timing can vary.

## Sensor attributes

To explore the data available within the `data` attribute of a sensor, use the {% my tools_template title="**Settings** > **Tools** > **Template**" %}. `data` contains a list of monitored sites, where the number of monitored sites is given by the `sites` attribute. If a sensor has four sites, access the fourth site by indexing the list of sites using `data[3]`. Each site is a dictionary with multiple fields, with entries for the `latitude` and `longitude` of that site, a `pollutants_status`, `site_code`, `site_name`, and `site_type`. The field `number_of_pollutants` states how many pollutants are monitored (of the possible six) and the field `pollutants` returns a list with data for each pollutant. To access the first pollutant in the list for site zero, use `attributes.data[0].pollutants[0]`. Each entry in `pollutants` is a dictionary with fields for the pollutant `code`, `description`, `index`, `quality`, and a `summary`. [Template sensors](/integrations/template) can then be added to display these attributes, for example:

```yaml
# Example template sensors
template:
  - sensor:
    - name: "Updated"
      state: "{{ state_attr('sensor.merton', 'updated') }}"
    - name: "Merton PM10"
      state: >
        {{ state_attr('sensor.merton', 'data')[0].pollutants
           | selectattr('code', 'eq', 'PM10')
           | map(attribute='summary')
           | first }}
    - name: "Westminster NO2"
      state: >
        {{ state_attr('sensor.westminster', 'data')[0].pollutants
           | selectattr('code', 'eq', 'NO2')
           | map(attribute='summary')
           | first }}
```
