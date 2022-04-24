---
title: Trafikverket Ferry
description: Instructions how to integrate Trafikverket Ferry within Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_release: 2022.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: trafikverket_ferry
ha_platforms:
  - sensor
ha_integration_type: integration
---

Retrieve ferry departure information from [Trafikverket](https://www.trafikverket.se/).

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Use cases

- Retrieve the next departure and information connected to it
- Destination harbour is optional and by leaving empty it will show next destination available from selected departure harbour.
- By choosing a specific time it will only show departures after this.
- By deselecting from the pre-filled days of week you can make selection such as only Monday to Friday if needed.

## Sensors

- Next departure date and time by made selections
- Departure harbour
- Destination harbour
- Modified time (this sensor is deactivated as standard)

Other information provided by Trafikverket related to the specific departure are shown as attribute on all sensors.

## Ferry harbour names

Click [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/373767.82/6890962.41/&Layers=Ferries%2b) to see examples of harbour names, use city name as harbour, as example "Ekerö", "Svanesund".
