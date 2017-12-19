---
layout: page
title: "deCONZ lights"
description: "Instructions how to integrate Zigbee lights from deCONZ into Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Light
ha_release: "0.60"
ha_iot_class: "Local Push"
---

See the [deCONZ main component](/components/deconz/) for configuration instructions.

Entity Ids names will be light.device_name, where device_name is defined in deCONZ. Light groups created in deCONZ will be created in Home Assistant as lights named light.group_name_in_deconz, allowing the user to control groups of lights with only a single API call to deCONZ.

#### {% linkable_title Verified to be supported sensors %}

- IKEA Trådfri bulb E14 WS opal 400lm
- IKEA Trådfri Bulb E27 WS Opal 980lm
- IKEA Trådfri Bulb E27 WS Opal 1000lm
- IKEA Trådfri Bulb GU10 W 400lm
- OSRAM Flex RGBW
- OSRAM Gardenpole RGBW
- Philips Hue White A19
- Philips Hue White Ambiance A19
