---
title: Trafikverket Train
description: Instructions how to integrate Trafikverket Train within Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@endor-force'
  - '@gjohansson-ST'
ha_domain: trafikverket_train
ha_platforms:
  - sensor
ha_integration_type: integration
---

Retrieve train departure information from [Trafikverket](https://www.trafikverket.se/).

## Use cases

- Retrieve the next departure between two stations.
- Retrieve information for specific departure time between two stations.
- Set up an alert or perform actions if your train is delayed or canceled.

## Retrieved data

- Next departure for the specific train line.
- Canceled status.
- Delayed time.
- Planned time if no delays occur.
- Estimated time of arrival if delays occur.
- Actual time - when it did arrive.
- Other information / additional texts.
- Deviations.

The next departure is calculated from actual, estimated, and planned to provide the most accurate information about departure.

## Prerequisites

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

{% include integrations/config_flow.md %}

## Train station names

Click [here](https://www.trafikverket.se/trafikinformation/tag/?ArrDep=departure&) to see examples of train station names.
