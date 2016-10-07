---
layout: page
title: "Simplepush"
description: "Instructions how to add Simplepush notifications to Home Assistant."
date: 2016-09-11 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: simplepush.png
ha_category: Notifications
ha_release: 0.29
---


The `simplepush` platform uses [Simplepush](https://simplepush.io/) to delivery notifications from Home Assistant to your Android device. Unlike similar apps the Simplepush app requires no registration.

To add Simplepush to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: simplepush
    device_key: ABCDE
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **device_key** (*Required*): The device key of your device.

To test if the service works, just send a message with `curl` from the command-line.

```bash
$ curl 'https://api.simplepush.io/send/device_key/title/message'
```

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
