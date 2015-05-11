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

<img src='/images/supported_brands/pushover.png' class='brand pull-right' />
James Cole has contributed support for the [PushOver service](https://pushover.net/) as a platform for the notify component. This allows components to send messages to the user using PushOver.

```yaml
# Example configuration.yaml entry
notify:
    platform: pushover
    # Get this by registering a new application on https://pushover.net
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    # Get this by logging into your account on https://pushover.net
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
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
