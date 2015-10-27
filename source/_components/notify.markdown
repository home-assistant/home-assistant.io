---
layout: component
title: "Notifications"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
---

One of the things most people want at some point in their home automation is to get notified when certain events occur. For this reason there is a `notify` component in Home Assistant.

Home Assistant currently supports a wide range of services for notifications. Please check the sidebar for a full list of platforms.

If your are running into troubles with your notification platform, a simple way to test it is to use **Call Service** from the **Developer Tools**. Choose your service (*notify/xyz*) from the list of **Available services:** and enter something like the sample below into  the **Service Data** field and hit **CALL SERVICE**.

```json
{"title":"Test", "message":"A simple test message from HA."}
```

This will send a single message to your notification platform configured in your `configuration.yaml` file.

## {% linkable_title Examples %}

### {% linkable_title Automation %}

Notifications are great to be used within Home Automation. Below is a an example configuration that you can add to your `configuration.yaml` file to be notified when the sun sets.

```yaml
automation:
  alias: Sun set notification

  platform: state
  state_entity_id: sun.sun
  state_from: above_horizon
  state_to: below_horizon

  execute_service: notify.NOTIFIER_NAME
  service_data: {"message":"YAY"}
```

For more automation examples, see the [getting started with automation page]({{site_root}}/components/automation/).
