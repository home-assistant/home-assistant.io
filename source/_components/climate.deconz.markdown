---
layout: page
title: "deCONZ Climate"
description: "Instructions on how to integrate Zigbee climate devices from deCONZ into Home Assistant."
date: 2019-02-06 20:15
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Climate
ha_release: "0.88"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

Climate currently represent thermostats.

Note that devices in the climate platform identify as sensors, so there is a manually curated list that defines which "sensors" are climate devices.

The `entity_id` name will be `climate.device_name`, where `device_name` is defined in deCONZ.

#### {% linkable_title Verified supported climate devices %}

- Bitron Thermostat 902010/32
