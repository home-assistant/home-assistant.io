---
layout: page
title: "Notify My Android"
description: "Instructions on how to add NMA notifications to Home Assistant."
date: 2015-05-01 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nma.png
ha_category: Notifications
ha_release: pre 0.7
---


The `nma` platform uses [Notify My Android (NMA)](http://www.notifymyandroid.com/) to delivery notifications from Home Assistant to your Android device.

Go to the [NMA website](https://www.notifymyandroid.com) and create a new API key. If you are using the trial offer then keep in mind that your limit is five messages per day.

To add NMA to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: nma
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): The API key for NMA.

Details for the [API](https://www.notifymyandroid.com/api.jsp).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
