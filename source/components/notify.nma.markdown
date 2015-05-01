---
layout: page
title: "Notify My Android (NMA) notification support"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-05-01 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/nma.png' class='brand pull-right' />
The nma platform uses [Notify My Android (NMA)](http://www.notifymyandroid.com/) to delivery notifications from Home Assistant to your Android device.

To add NMA to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
    platform: nma
    # Get this by registering a new application on http://www.notifymyandroid.com/
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
