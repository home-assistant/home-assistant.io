---
layout: page
title: "deCONZ Switches"
description: "Instructions on how to integrate Zigbee switches from deCONZ into Home Assistant."
date: 2018-07-31 23:32
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Switch
ha_release: "0.76"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

Switches are devices like power plugs and sirens.

Note that devices in the switch platform identify as lights, so there is a manually curated list that defines which "lights" are switches.

The `entity_id` name will be `switch.device_name`, where `device_name` is defined in deCONZ.

#### {% linkable_title Verified supported switches %}

- Innr SP120
- Osram Outdoor plug
- Heiman siren
