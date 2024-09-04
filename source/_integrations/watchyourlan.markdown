---
title: WatchYourLAN
description: Instructions on how to integrate WatchYourLAN sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.9
ha_iot_class: Local Polling
ha_domain: watchyourlan
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `watchyourlan` sensor platform is the API endpoint which is exposed by a the [WatchYourLAN](https://github.com/aceberg/WatchYourLAN/blob/main/docs/API.md) project.

```yaml
# Example configuration.yaml entry
watchyourlan:
  host: "127.0.0.1"
  port: 8840
  ssl: false
  update_interval: 5
```

{% configuration %}
host:
  description: The hostname or IP of the WatchYourLAN server
  required: true
  type: string
port:
  description: The TCP port the WatchYourLAN service is being served on
  required: false
  type: integer
  default: 8840
ssl:
  description: Whether SSL (i.e. https) should be used to access the WatchYourLAN service
  required: false
  type: boolean
  default: False
update_interval:
  description: The frequency (in minutes) to fetch the latest data from the API
  required: false
  type: integer
  default: 1
{% endconfiguration %}
