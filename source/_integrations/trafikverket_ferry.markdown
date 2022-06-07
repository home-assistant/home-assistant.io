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

- Retrieve the next departure and information connected to it.
- Destination harbor is optional and by leaving it empty it will show the next destination available from the selected departure harbor.
- By choosing a specific time it will only show departures after this.
- By deselecting from the pre-filled days of the week you can make selections such as only Monday to Friday if needed.

## Sensors

- Departure date and time by made selections.
- Departure sensor for following two departures after next (disabled by default)
- Departure harbor.
- Destination harbor.
- Modified time (this sensor is deactivated as standard).

Other information provided by Trafikverket related to the specific departure is shown as attribute on all sensors.

## Ferry harbour names

Click [here](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=1/373767.82/6890962.41/&Layers=Ferries%2b) to see examples of harbor names, use city name as harbor, as for example "Ekerö", "Svanesund".
