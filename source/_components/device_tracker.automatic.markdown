---
layout: page
title: "Automatic"
description: "Instructions for how to integrate Automatic ODB readers into Home Assistant."
date: 2015-08-28 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: automatic.png
ha_category: Presence Detection
ha_release: 0.28
---


The `automatic` platform offers presence detection by retrieving your car's information from the [Automatic](http://automatic.com/) cloud service.

To use an Automatic ODB reader in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: automatic
    client_id: 1234567
    secret: 0987654321
    username: your@email.com
    password: your_password
    devices:
      - 2007 Honda Element
      - 2004 Subaru Impreza
```

Configuration variables:

- **client_id** (*Required*): The OAuth client id (get from https://developer.automatic.com/).
- **secret** (*Required*): The OAuth client secret (get from https://developer.automatic.com/).
- **username** (*Required*): The username associated with your ODB reader.
- **password** (*Required*): The password for your given ODB reader account.
- **devices** (*Optional*): The list of vehicle display names you wish to track. If not provided, all vehicles will be tracked.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the cars to be tracked.
