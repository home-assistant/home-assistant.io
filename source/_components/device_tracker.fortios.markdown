
---
layout: page
title: "Device Tracker FortiOS"
description: "Instructions on how to use Fortinet FortiOS to track devices in Home Assistant."
date: 2019-06-25 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: fortinet.png
ha_category:
  - Presence Detection
ha_release: 0.96
---

This component enables Home Assistant to do device tracking of devices with a MAC address connected to a FortiGate from [Fortinet](https://www.fortinet.com).

The component relies on the [fortiosapi](https://pypi.org/project/fortiosapi/).
The component has been tested both on FortiGate appliance and FortiGate VM running SW FortiOS v. 6.0.x and 6.2.0.

All devices with a MAC address identified by FortiGate would be tracked, this covers both Ethernet and WiFi devices, including devices detected by LLDP.

The component is based on the Home Assistant `device_tracker` platform.

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fortios
    host: YOUR_HOST
    token: YOUR_API_USER_KEY
```

{% configuration %}
host:
    description: Hostname or IP address of the FortiGate.
    required: true
    type: string
token:
    description: See [Fortinet Developer Network](https://fndn.fortinet.com) for how to create an API token. Remember this component only needs read access to a FortiGate, so configure the API user to only to have limited and read-only access.
    required: true
    type: string
  verify_ssl:
    description: if the SSL certificate should be verified. In most home cases users do not have a verified certificate.
    required: false
    type: boolean
{% endconfiguration %}

