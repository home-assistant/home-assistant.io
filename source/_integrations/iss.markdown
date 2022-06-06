---
title: International Space Station (ISS)
description: Know if or when ISS will be above your home location
ha_category:
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: iss
ha_platforms:
  - binary_sensor
ha_codeowners:
  - '@DurgNomis-drol'
ha_config_flow: true
ha_integration_type: integration
---

The `iss` platform uses the
[Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
to let you know if the station is above your home location.
This means that ISS is 10° above the horizon of your home.

You can check in the attributes of the sensor to see the timestamp for the next
rise of the station, its current coordinates, and the number of people in space.

{% include integrations/config_flow.md %}

<div class='note warning'>

If you enable "Show on map" in the options for this integration then the location attributes 
are named `latitude` and `longitude`. The default name of the location attributes is
`lat` and `long` to avoid showing them on the map.

</div>
