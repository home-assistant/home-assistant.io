---
title: Google Wifi
description: Instructions on how to integrate Google Wifi/OnHub routers into Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: '0.50'
ha_domain: google_wifi
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `google_wifi` sensor {% term integration %} is displaying the exposed status of a Google Wifi (or OnHub) router.

The {% term integration %} is able to report network status, up-time, current IP address and firmware versions.

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: google_wifi
```

{% configuration %}
host:
  description: The address to retrieve status from the router. Valid options are `testwifi.here`, in some cases `onhub.here` or the router's IP address such as 192.168.86.1.
  required: false
  default: testwifi.here
  type: string
name:
  description: Name to give the Google Wifi sensor.
  required: false
  default: google_wifi
  type: string
monitored_conditions:
  description: Defines the data to monitor as sensors. Defaults to all of the listed options below.
  required: false
  type: list
  keys:
    current_version:
      description: Current firmware version of the router.
    new_version:
      description: Latest available firmware version. If router is up-to-date, this value shows to `Latest`.
    uptime:
      description: Days since router has been turned on.
    last_restart:
      description: Date of last restart. Format is `YYYY-MM-DD HH:mm:SS`.
    local_ip:
      description: Local public IP address.
    status:
      description: Reports whether the router is or is not connected to the internet.
{% endconfiguration %}
