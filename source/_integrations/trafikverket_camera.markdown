---
title: Trafikverket Camera
description: Instructions how to integrate Trafikverket Camera within Home Assistant.
ha_category:
  - Camera
ha_release: 2023.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: trafikverket_camera
ha_platforms:
  - camera
ha_integration_type: integration
---

Retrieve camera feed from [Trafikverket](https://www.trafikverket.se/).

The name of the location needs to be precisely as Trafikverket has them. See examples and look for your camera [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=)

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Additional attributes

- Location (placement of camera)
- Description (free text description)
- Type (Type of camera)
