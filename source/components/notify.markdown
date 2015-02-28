---
layout: page
title: "Notifications"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

One of the things most people want at some point in their home automation is to get notified when certain events occur. For this reason there is a `notify` component in Home Assistant.

Home Assistant currently supports the awesome [PushBullet](https://www.pushbullet.com/), a free service to send information between your phones, browsers and friends.

To add PushBullet to your installation, add the following to your `configuration.yaml` file:

```
notify:
  platform: pushbullet
  api_key: YOUR_API_KEY
```

### Automation example

Notifications are great to be used within Home Automation. Below is a an example configuration that you can add to your `configuration.yaml` to be notified when the sun sets.

```
automation:
  alias: Sun set notification

  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  execute_service: notify.notify
  service_data: {"message":"YAY"}
```

For more automation examples, see the [getting started with automation page]({{site_root}}/components/automation.html).
