---
title: Bizkaibus
description: Instructions on how to integrate timetable data for traveling on Bizkaibus within Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.93
ha_codeowners:
  - '@UgaitzEtxebarria'
ha_domain: bizkaibus
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `bizkaibus` sensor will give you the time until the next bus in the selected stop.

The next website can help to determine the id of your bus stop. You can check if this is correct by going to [next link](https://apli.bizkaia.net/APPS/DANOK/TQ/DATOS_PARADAS/DATOS_Paradas.xml) and look the PR_CODE for the STOP_ID.

For a correct use of the sensor the selected route must stop in the selected stop.

Then add the data to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bizkaibus
    stopid: STOP_ID
    route: ROUTE_ID
```

{% configuration %}
stopid:
  description: The ID of the bus stop to get the information for.
  required: true
  type: string
route:
  description: The ID of the bus route to get information for. This is the same as the bus number, e.g., `A3641`.
  required: true
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  default: Next Bus
  type: string
{% endconfiguration %}

The public RTPI information is coming from [Bizkaibus API](https://apli.bizkaia.net/APPS/DANOK/TQWS/TQ.ASMX).
