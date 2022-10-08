---
title: Trafikverket Camera
description: Instructions how to integrate Trafikverket Camera within Home Assistant.
ha_category:
  - Camera
ha_release: 2022.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: trafikverket_camera
ha_platforms:
  - camera
ha_integration_type: integration
---

Retrieve cameras from [Trafikverket](https://www.trafikverket.se/).

The name of the location needs to be precisely as Trafikverket has them. See examples and look for your camera [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=)

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Additional attributes

- Deleted (is the camera discountinued)
- Description (free text description)
- Direction (which heading has the camera)
- Full size photo (support full size photo)
- Last modified
- Photo time
- Photo url
- Status
- Type (Type of camera)

Other information provided by Trafikverket related to the specific departure is shown as attribute on all sensors.
