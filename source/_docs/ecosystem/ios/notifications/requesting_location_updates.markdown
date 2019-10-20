---
title: "Requesting location updates"
description: "Ask the device to send a location update remotely"
redirect_from: /ecosystem/ios/notifications/requesting_location_updates/
---

<div class="note warning">
Do not rely on this functionality due to the time limits mentioned below.
</div>

You can force a device to attempt to report its location by sending a special notification.

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        message: "request_location_update"
```

Assuming the device receives the notification, it will attempt to get a location update within 5 seconds and report it to Home Assistant. This is a little bit hit or miss since Apple imposes a maximum time allowed for the app to work with the notification and location updates sometimes take longer than usual due to factors such as waiting for GPS acquisition.

