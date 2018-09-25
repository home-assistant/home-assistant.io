---
layout: page
title: "deCONZ Covers"
description: "Instructions on how to integrate Zigbee covers from deCONZ into Home Assistant."
date: 2018-09-20 23:32
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Cover
ha_release: "0.79"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

Covers are devices like ventilation dampers.

Note that devices in the cover platform identify as lights, so there is a manually curated list that defines which "lights" are covers.

The `entity_id` name will be `cover.device_name`, where `device_name` is defined in deCONZ.

#### {% linkable_title Verified supported covers %}

- Keen vents
