---
layout: page
title: "Requesting location updates"
description: "Ask the device to send a location update remotely"
date: 2016-10-25 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

<p class="note warning">
**Do not rely on this functionality due to the time limits mentioned below.**
</p>

You can force a device to attempt to report its location by sending a special notification.

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.iOSApp
      data:
        message: "request_location_updates"
```

Assuming the device receives the notification, it will attempt to get a location update within 5 seconds and report it to Home Assistant. This is a little bit hit or miss since Apple imposes a maximum time allowed for the app to work with the notification and location updates sometimes take longer than usual due to factors such as waiting for GPS acquisition.

