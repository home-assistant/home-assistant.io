---
title: TrackR
description: Instructions on how to use TrackR to track devices in Home Assistant.
ha_release: 0.36
ha_category:
  - Presence Detection
ha_iot_class: Cloud Polling
ha_domain: trackr
ha_platforms:
  - device_tracker
---

The `trackr` platform allows you to detect presence using [TrackR](https://www.thetrackr.com/) devices.

The official TrackR mobile app handles the tracking of the TrackR devices using your phones Bluetooth and GPS.

To integrate TrackR in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: trackr
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address for the TrackR account.
  required: true
  type: string
password:
  description: The password for your given username.
  required: true
  type: string
{% endconfiguration %}
