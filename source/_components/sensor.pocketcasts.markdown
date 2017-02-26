---
layout: page
title: Fedex Sensor
description: "Instructions on how to set up FedEx sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: fedex.png
ha_category: Sensor
ha_release: 0.39
---

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pocketcasts
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the FedEx Sensor:

- **username** (*Required*): The username to access the PocketCasts service.
- **password** (*Required*): The password for the given username.
