---
layout: page
title: "Lutron Caseta Cover"
description: "Instructions how to setup the Lutron Caseta covers within Home Assistant."
date: 2017-05-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Cover
ha_iot_class: "Local Polling"
---

To get your Lutron Caseta covers (Serena Shades) working with Home Assistant, first,follow the instructions for the general [Lutron Caseta component](/components/lutron_caseta/).

You also need to configure lutron caseta as a cover platform in configuration.yaml:

cover:
  - platform: lutron_caseta

Your Lutron Caseta shades will be pulled into Home Assistant with the names they were assigned in the Lutron Caseta app.  You will need to restart Home Assistant for your shades to be pulled into Home Assistant..
