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

<p class='note warning'>
In previous versions, switch devices in setups with multiple cameras, would not have specific entity ID causing them to change randomly after each Home Assistant restart. The current version adds the name of the camera at the end of the switch entity ID, making it more specific and consistent and causes the name option to be required in a multi-camera system. This behavior matches the sensor behavior of the Amcrest component. Because of this, older automations may require updates to the entity ID.
</p>
