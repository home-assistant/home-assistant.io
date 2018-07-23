---
layout: page
title: "Insteon (local) Light"
description: "Instructions on how to setup the Insteon Hub Lights locally within Home Assistant."
date:  2016-12-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Light
ha_release: 0.36
ha_iot_class: "Local Push"
redirect_from: /components/light.insteon_hub/
---

The `insteon_local` light component lets you control your lights connected to an [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

To get your Insteon lights working with Home Assistant, follow the instructions for the general [Insteon local component](/components/insteon_local/). The lights will be automatically discovered and added to Home Assistant. The device names will be the Insteon address of the lights.
