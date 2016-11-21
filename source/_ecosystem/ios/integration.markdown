---
layout: page
title: "Integration"
description: "Examples of how Home Assistant for iOS can be integrated with other apps"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant for iOS supports opening from other apps via URL.

Query parameters are passed as a dictionary in the call.

## Call service
Example: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Fire event

Example `homeassistant://fire_event/custom_event?entity_id=device_tracker.entity`

## Send one shot location

Example: `homeassistant://send_location/`
