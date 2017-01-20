---
layout: page
title: "Avion"
description: "Instructions on how to setup GE Avion Bluetooth dimmers within Home Assistant."
date: 2017-01-17 23:17
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Assumed State"
featured: false
ha_release: 0.37
---

Support for the Avion Bluetooth dimmer switch [Avi-On](http://avi-on.com/). To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: avion
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: Gr35a/rt3RgaRenl9ag8Ba==
      00:21:3D:20:00:a1:
        name: Bulb 2
        api_key: Gr35a/rt3RgaRenl9ag8Ba==
```

Configuration variables:

- **devices**: A list of devices with their bluetooth address, a custom name to use in the frontend and the API key. The API key can be obtained by executing the following command:

```
curl -X POST -H "Content-Type: application/json" -d '{"email": "fakename@example.com", "password": "password"}' https://admin.avi-on.com/api/sessions | jq
```

with the email and password fields replaced with those used when registering the device via the mobile app. The passphrase field of the output should be used as the API key in the configuration.
