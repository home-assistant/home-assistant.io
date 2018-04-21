---
layout: page
title: "Amcrest IP Camera Settings"
description: "Instructions on how to integrate settings for Amcrest IP Camera as switches within Home Assistant."
date: 2018-03-08 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Switch
ha_release: 0.67
ha_iot_class: "Local Polling"
---

The `amcrest` switch platform lets you control settings of [Amcrest IP Camera](https://home-assistant.io/components/camera.amcrest/) through Home Assistant.

Switches will be configured automatically. Please refer to the [component](/components/amcrest/) configuration on how to setup.

**In previous version switch devices in multiple cameras setups would not have specific entity_id causing them to randomly change after each home assistant restart. An updated version adds the name of the camera at the end of the entity_id of the switch making it specific. This means that in a multi camera system, the name option is required to distinguish the different cameras. This behavior now matches the sensor behavior for the amcrest component. It also means than old automation may require an update to the identity_id**
