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
The [PushOver service](https://pushover.net/) is a platform for the notify component. This allows components to send messages to the user using PushOver.

To use PushOver notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
    name: NOTIFIER_NAME
    platform: pushover
    # Get this by registering a new application on https://pushover.net
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    # Get this by logging into your account on https://pushover.net
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Setting the optional parameter `name` allows multiple notifiers to be created.
The default value is `notify`. The notifier will bind to the service
`notify.NOTIFIER_NAME`.

### Automation example

Notifications are great to be used within Home Automation. Below is a an example configuration that you can add to your `configuration.yaml` to be notified when the sun sets.

```
automation:
  alias: Sun set notification

  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  execute_service: notify.NOTIFIER_NAME
  service_data: {"message":"YAY"}
```

For more automation examples, see the [getting started with automation page]({{site_root}}/components/automation.html).

[James Cole](https://github.com/jamespcole) has contributed the PushOver platform.
