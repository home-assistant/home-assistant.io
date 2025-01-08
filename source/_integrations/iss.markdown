---
title: International Space Station (ISS)
description: Show the ISS location and how many people are in space
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: iss
ha_platforms:
  - sensor
ha_codeowners:
  - '@DurgNomis-drol'
ha_config_flow: true
ha_integration_type: service
---

The International Space Station (ISS) integration uses the
[Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
to let you know where the station is.

It will also tell you how many people are in space.

{% include integrations/config_flow.md %}

{% note %}

If you enable "Show on map" in the options for this integration then the location attributes 
are named `latitude` and `longitude`. The default name of the location attributes is
`lat` and `long` to avoid showing them on the map.

{% endnote %}
