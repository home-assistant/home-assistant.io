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

The Point component is the main component to integrate the [Minut Point](https://minut.se/). To connect Point, you will have to [sign up for a developer account](https://minut.com/community/developers/) and get a `client_id` and `client_secret` using the `callback url`  as `base_url` + `/api/minut` eg. `http://localhost:8123/api/minut`. The `client_id` and `client_secret` should be used as below. 

Once Home Assistant is started, a configurator will pop up asking you to Authenticate your Point account via a link when you follow the link and have clicked on **Accept** you will be redirected to the `callback url` and the Point integration will be automatically configures and you can go back to the original dialog and press **Submit**.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
point:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```


<p class='note'>
The Point is just active occasionally so the sensors are only updated every hour or so.
The events sent from the Point is sent as a webhook back to Home Assistant with `event_type` as `point_webhook_received`, please consider the documentation for the [IFTT](https://www.home-assistant.io/components/ifttt/) component on how to write automations for webhooks.
</p>
