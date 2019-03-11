---
layout: page
title: "Aruba ClearPass"
description: "Instructions on how to integrate Aruba ClearPass into Home Assistant."
date: 2019-03-05 10:45
sidebar: true
comments: false
sharing: true
footer: true
logo: aruba.png
ha_category: Presence Detection
ha_release: "0.90"
ha_iot_class: Local Polling
---

This platform allows you to detect presence by looking at connected devices to [Aruba Clearpass](https://www.arubanetworks.com/products/security/network-access-control/).

Supported platforms (tested):

- Aruba ClearPass 6.7.5

<p class='note warning'>
You must first creat an API client from here: https://clearpass.server.com/guest/api_clients.php
</p>

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: cppm_tracker
    host: clearpass.server.org
    client_id: clearpassapi
    api_key: 00000004qyO513hTdCfjIO2ZWWnmex8QZ5000000000
```

{% configuration %}
host:
  description: "The IP address or hostname of the ClearPass server, e.g., `clearpass.server.com`."
  required: true
  type: string
client_id:
  description: "The client ID from here: `https://clearpass.server.com/guest/api_clients.php`"
  required: true
  type: string
api_key:
  description: "Secret from here: `https://clearpass.server.com/guest/api_clients.php`"
  required: true
  type: string
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions on how to configure the people to be tracked.
