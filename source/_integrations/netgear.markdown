---
title: NETGEAR
description: Instructions on how to integrate NETGEAR routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: netgear
ha_platforms:
  - device_tracker
---

This platform allows you to detect presence by looking at connected devices to a [NETGEAR](https://www.netgear.com/) device.

<div class='note'>

A recent updates of Orbi APs introduced a bug which takes several hours to detects presence on your local network. The current workaround is to force this integration to use the Orbi's API v2 by adding the `accesspoints:` node to your configuration.

</div>

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: netgear
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
url:
  description: The base URL, e.g., `http://routerlogin.com:5000` for example. If not provided `host` and `port` are used. If none provided autodetection of the URL will be used.
  required: false
  type: string
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: false
  type: string
port:
  description: The port your router communicates with.
  required: false
  default: 5000
  type: integer
username:
  description: The username of a user with administrative privileges.
  required: false
  default: admin
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
devices:
  description: If provided only specified devices will be reported. Can be MAC address or the device name as reported in the NETGEAR UI.
  required: false
  type: list
exclude:
  description: Devices to exclude from the scan.
  required: false
  type: list
accesspoints:
  description: Also track devices on the specified APs. Only supports MAC address.
  required: false
  type: list
{% endconfiguration %}

When `accesspoints` is specified an extra device will be reported for each device connected to the APs specified here, as `MY-LAPTOP on RBS40`. `Router` will be reported as AP name for the main AP. Only tested with Orbi.

The use of `devices` or `exclude` is recommended when using `accesspoints` to avoid having a lot of entries.

List of models that are known to use port 80:

- Nighthawk X4S - AC2600 (R7800)
- Orbi
- XR500

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
