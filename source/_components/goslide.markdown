---
title: "GoSlide"
description: "Instructions on how to integrate the Innovation in Motion GoSlide covers with Home Assistant."
logo: goslide.png
ha_category:
  - Hub
  - Cover
ha_iot_class: Cloud Polling
ha_release: 0.98
---

The `goslide` implementation allows you to integrate your [slide.store](https://slide.store/) devices in Home Assistant using the [official API](https://documenter.getpostman.com/view/6223391/S1Lu2pSf?version=latest).

### Configuration

```yaml
# Example configuration.yaml entry
goslide:
  username: YOUR_SLIDE_APP_USERNAME
  password: YOUR_SLIDE_APP_PASSWORD
```

{% configuration %}
username:
  description: Username needed to log in to Slide App.
  required: true
  type: string
password:
  description: Password needed to log in to Slide App.
  required: true
  type: string
scan_interval:
  description: "Minimum time interval between updates."
  required: false
  default: 30 seconds
  type: integer
timeout:
  description: "How long in seconds to wait for a response from the service before giving up and disconnecting."
  required: false
  default: 30 seconds
  type: integer
retry:
  description: "Interval between retries if the GoSlide Cloud API is down during startup."
  required: false
  default: 120 seconds
  type: integer
{% endconfiguration %}

