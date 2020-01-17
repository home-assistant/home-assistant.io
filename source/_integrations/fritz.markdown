---
title: AVM Fritzbox
description: Instructions on how to integrate AVM FRITZ!Box based routers into Home Assistant.
logo: avm.png
ha_category:
  - Presence Detection
ha_release: '0.10'
---

The `fritz` platform offers presence detection by looking at connected devices to a [AVM Fritz!Box](https://avm.de/produkte/fritzbox/) based router.

## Configuration

To use an Fritz!Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fritz
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
  required: false
  type: string
username:
  description: The username of an user with administrative privileges, usually `admin`.
  required: false
  type: string
password:
  description: The password for your given admin account.
  required: false
  type: string
{% endconfiguration %}

<div class='note'>
It seems that it is not necessary to use the password in current generation Fritz!Box routers because the necessary data can be retrieved anonymously.
</div>

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
