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

Home Assistant currently supports a wide range of services for notifications:

- [E-Mail](/components/notify.smtp.html)
- [File](/components/notify.file.html)
- [Instapush](/components/notify.instapush.html)
- [Jabber (XMPP)](/components/notify.xmpp.html)
- [Notify My Android (NMA)](/components/notify.nma.html)
- [PushBullet](/components/notify.pushbullet.html)
- [PushOver](/components/notify.pushover.html)
- [Slack](/components/notify.slack.html)
- [Syslog](/components/notify.syslog.html)

### Automation example

Notifications are great to be used within Home Automation. Below is a an example configuration that you can add to your `configuration.yaml` to be notified when the sun sets.

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

For more automation examples, see the [getting started with automation page]({{site_root}}/components/automation.html).
