---
title: Irish Rail Transport
description: Instructions on how to integrate timetable data for traveling on Irish Rail within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
ha_codeowners:
  - '@ttroy50'
ha_domain: irish_rail_transport
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `irish_rail_transport` sensor will give you the time until the next two departures (within 90 minutes) from an Irish Rail station using the RTPI information.

A station name is the full station name as specified on the Irish Rail search site, for example, `Tara Street` or `Dublin Connolly`.

To activate the sensor add the data to your {% term "`configuration.yaml`" %} file as shown in the example:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: irish_rail_transport
    station: "Tara Street"
    name: "To Greystones"
```

{% configuration %}
station:
  description: The name of the station.
  required: true
  type: string
direction:
  description: The direction of the train. Typically either `Northbound` or `Southbound`.
  required: false
  type: string
destination:
  description: The name of the destination station to filter by.
  required: false
  type: string
stops_at:
  description: An optional filter based on the name of a station that the train stops at.
  required: false
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  default: Next Train
  type: string
{% endconfiguration %}

Using the `stops_at` option will cause an extra request per train found. Therefore, if you are looking at a busy station, it is recommended that you also use at least one other filter. For example:

```yaml
# Example full configuration.yaml entry
sensor:
  - platform: irish_rail_transport
    station: "Tara Street"
    direction: Southbound
    destination: Greystones
    stops_at: "Dun Laoghaire"
    name: "To Greystones"
```

The above example will show the next 2 `Southbound` trains that leave `Tara Street` station, going to `Greystones` via `Dun Laoghaire`:
