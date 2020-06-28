---
layout: page
title: "Aruba"
description: "Instructions on how to integrate Aruba routers into Home Assistant."
date: 2015-08-31 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: aruba.png
ha_category:
  - Presence Detection
ha_release: 0.7
redirect_from:
 - /components/device_tracker.aruba/
---


This platform allows you to detect presence by looking at connected devices to an [Aruba Instant](http://www.arubanetworks.com/products/networking/aruba-instant/) device.

The integration supports both REST API (preferrered) and SSH collection methods.  In order to enable the REST method, you must enable it on your access point:

```
(Instant AP)# conf t
(Instant AP)(config)# allow-rest-api
(Instant AP)(config)# end
(Instant AP)# commit-apply
```

Supported devices (tested):

- ARUBA AP-105
- ARUBA AP-225

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: aruba
    host: INSTANT_MASTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your Master Instant access point, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges, usually `admin`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
