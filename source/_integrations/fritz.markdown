---
title: AVM FRITZ!Box
description: Instructions on how to integrate AVM FRITZ!Box based routers into Home Assistant.
ha_category:
  - Presence Detection
ha_release: '0.10'
ha_domain: fritz
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
---

The `fritz` platform offers presence detection by looking at connected devices to a [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) based router.

## Configuration

To use an FRITZ!Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fritz
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.178.1`. It is optional since every FRITZ!Box is also reachable by using the IP address 169.254.1.1.
  required: false
  type: string
  default: 169.254.1.1
username:
  description: The username of an user with administrative privileges, usually `admin`.
  required: false
  type: string
  default: admin
password:
  description: The password for your given admin account.
  required: false
  type: string
{% endconfiguration %}

<div class='note'>
TR-064 needs to be enabled in the FRITZ!Box network settings for Home Assistant to login and read device info.
</div>

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
