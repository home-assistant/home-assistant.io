---
title: London Air
description: Display the current status of London air quality by area and pollution type.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.52
ha_domain: london_air
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `london_air` {% term integration %} [queries](https://api.erg.kcl.ac.uk/AirQuality/Hourly/MonitoringIndex/GroupName=London/Json) the London air quality [data feed](https://www.londonair.org.uk/LondonAir/API/) provided by Kings College London. A single sensor will be added for each `location` ([local authority district or borough](https://en.wikipedia.org/wiki/List_of_London_boroughs)) specified in the configuration file. The state of each sensor is the overall air quality in that borough. Note that only 28 of the 32 boroughs have data available.

Boroughs can have multiple monitoring sites at different geographical positions within the borough, and each of those sites can monitor up to six different kinds of pollutant. The pollutants are described [here](https://api.erg.kcl.ac.uk/AirQuality/Information/Species/Json) and are Carbon Monoxide ([CO](https://www.londonair.org.uk/LondonAir/guide/WhatIsCO.aspx)), Nitrogen Dioxide ([NO2](https://www.londonair.org.uk/LondonAir/guide/WhatIsNO2.aspx)), Ozone ([O3](https://www.londonair.org.uk/LondonAir/guide/WhatIsO3.aspx)), Sulfur Dioxide ([SO2](https://www.londonair.org.uk/LondonAir/guide/WhatIsSO2.aspx)), PM2.5 & PM10 [particulates](https://www.londonair.org.uk/LondonAir/guide/WhatIsPM.aspx). The `latitude` and `longitude` of each site is accessible through a `data` attribute of the sensor, as are details about the pollutants monitored at that site. The `sites` attribute of a sensor displays how many monitoring sites that sensor covers. The `updated` attribute of a sensor states when the data was last published. Nominally data is published hourly, but in my experience this can vary. To limit the number of requests made by the sensor, a single API request is made every 30 minutes.

To add sensors to Home Assistant for all possible areas/boroughs add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry for a single sensor
sensor:
  - platform: london_air
    locations:
      - Barking and Dagenham
      - Bexley
      - Brent
      - Camden
      - City of London
      - Croydon
      - Ealing
      - Enfield
      - Greenwich
      - Hackney
      - Haringey
      - Harrow
      - Havering
      - Hillingdon
      - Islington
      - Kensington and Chelsea
      - Kingston
      - Lambeth
      - Lewisham
      - Merton
      - Redbridge
      - Richmond
      - Southwark
      - Sutton
      - Tower Hamlets
      - Wandsworth
      - Westminster
```

{% configuration %}
locations:
  description: Areas/boroughs in London to monitor.
  required: false
  default: All location with data available.
  type: list
{% endconfiguration %}

To explore the data available within the `data` attribute of a sensor use the `dev-template` tool on the Home Assistant frontend. `data` contains a list of monitored sites, where the number of monitored sites are given by the `sites` attribute. If a sensor has four sites, access the fourth site by indexing the list of sites using data[3]. Each site is a dictionary with multiple fields, with entries for the `latitude` and `longitude` of that site, a `pollution_status`, `site_code`, `site_name` and `site_type`. The field `number_of_pollutants` states how many pollutants are monitored (of the possible six) and the field `pollutants` returns a list with data for each pollutant. To access the first pollutant in the list for site zero use `attributes.data[0].pollutants[0]`. Each entry in `pollutants` is a dictionary with fields for the pollutant `code`, `description`, `index`, `quality` and a `summary`. [Template sensors](/integrations/template) can then be added to display these attributes, for example:

{% raw %}

```yaml
# Example template sensors
template:
  - sensor:
    - name: "Updated"
      state: "{{ state_attr('sensor.merton', 'updated') }}"
    - name: "Merton PM10"
      state: "{{ state_attr('sensor.merton', 'data')[0].pollutants[0].summary }}"
    - name: "Westminster S02"
      state: "{{ state_attr('sensor.westminster', 'data')[0].pollutants[3].summary }}"
```

{% endraw %}
