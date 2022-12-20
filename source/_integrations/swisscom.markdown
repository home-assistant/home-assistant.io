---
title: Swisscom Internet-Box
description: Instructions on how to integrate Swisscom Internet-Box into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.32
ha_domain: swisscom
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

The `swisscom` platform offers presence detection by looking at connected devices to an [Internet-Box](https://www.swisscom.ch/en/residential/help/device/internet-router.html) router from [Swisscom](https://www.swisscom.ch) which is an Internet provider in Switzerland.

<div class='note'>
Swisscom releases a new router every now and then. The current platform has been tested on the Internet-Box 3 but the others should work as well because they use the same web interface. However, for older versions it might be necessary to deactivate SSL / HTTPS and use HTTP instead. If HTTPS is working but you want / need to use an IP address instead of the default hostname, SSL certificate verification needs to be turned off.
</div>

To use an Internet-Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: swisscom
```

{% configuration %}
host:
  description: The hostname or IP address of your router.
  required: false
  default: internetbox.swisscom.ch
  type: string
ssl:
  description: Use secure connection over SSL.
  required: false
  default: true
  type: boolean
verify_ssl:
  description: Verify SSL certificate chain.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
