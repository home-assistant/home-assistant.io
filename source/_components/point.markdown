---
layout: page
title: "Minut Point"
description: "Instructions on how to integrate Minut Point into Home Assistant."
date: 2018-10-30
sidebar: true
comments: false
sharing: true
footer: true
logo: minut.svg
ha_category: Hub
featured: true
ha_iot_class: "Cloud Polling"
---

The Point component is the main component to integrate the [Minut Point](https://minut.se/). To connect Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` using the `callback url` shown in the integration flow.

<p class='note'>
The Point is just active occasionaly so the sensors are only updated every hour or so.
The events sent from the Point is sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](https://www.home-assistant.io/components/ifttt/) component on how to write automations for webhooks.
</p>

### {% linkable_title Configuration %}

Integration to Point is configured via the Integrations setting found in the Configuration section on your Home Assitant page.
Just follow the integration dialogs and make sure that your Home Assistant instance is accessable from the web (to be able to recieve webhooks).
