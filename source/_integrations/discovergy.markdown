---
title: Discovergy
description: Instructions on how to integrate Discovergy within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2021.9'
ha_iot_class: Cloud Polling
ha_quality_scale: none
ha_codeowners:
  - '@jpbede'
ha_domain: discovergy
ha_config_flow: true
ha_platforms:
  - sensor
---

The `discovergy` integration allows users to integrate their [Discovergy](https://discovergy.com/) smart meters into Home Assistant.
The integration is using the [official REST API](https://api.discovergy.com/docs/#/) by Discovergy.

<div class='note info'>
Currently this integration is only supporting electricity smart meters. There is no support for gas meters at the moment.
</div>

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

## Prerequisites
For this integration you need a Discovergy smart meter, a [Discovergy account](https://my.discovergy.com/) and your credentials.

{% include integrations/config_flow.md %}

## Sensor
Sensor entities are being added for current active power usage, current active power usage per phase and the all-time total consumption.
In case you have a combined meter for consumption and production, the all-time total production is added as well.
