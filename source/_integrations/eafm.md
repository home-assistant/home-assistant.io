---
title: UK Environment Agency Flood Monitoring
description: Monitor nearby water levels and be prepared for flooding with the UK Environment Agency API integration.
ha_category:
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jc2k'
---

The `eafm` integration offers integration with the [UK Environment Agency Flood Monitoring](https://flood-warning-information.service.gov.uk/) API to provide sensors for nearby water levels. Combined with Home Assistant notifications, you could give yourself a warning if a nearby river was likely to flood your local cycle path or the only road out of your village.

{% important %}

The UK Environment Agency Flood Monitoring only provides data for England - Northern Ireland, Scotland and Wales have their own flood agencies. 

{% endimportant %}

## Configuration

Home Assistant offers the flood monitoring integration through **Settings** -> **Devices & services** -> **Environment Agency Flood Gauges**.

You will be prompted to select a monitoring station. You can find the name of nearby monitoring stations on the Flood information service [website](https://flood-warning-information.service.gov.uk/river-and-sea-levels).

Sensors for that monitoring station should then appear in your Home Assistant instance.
