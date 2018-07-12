---
layout: page
title: "Tank Utility Sensor"
description: "How to integrate Tank Utility sensors within Home Assistant."
date: 2017-08-24 08:21
sidebar: true
comments: false
sharing: true
footer: true
logo: tank_utility.png
ha_category: Sensor
ha_release: "0.53"
---

Add [Tank Utility](https://www.tankutility.com/) propane tank monitors to Home Assistant.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tank_utility
    email: EMAIL
    password: PASSWORD
    devices:
      - 000000000000000000000000
```

Configuration variables:

* **email** *(Required)*: [https://app.tankutility.com](https://app.tankutility.com) email address
* **password** *(Required)*: [https://app.tankutility.com](https://app.tankutility.com) password
* **devices** *(Required)*: List of devices

Authentication:

Authentication for the Tank Utility API is performed with the same email and password credentials used at
[https://app.tankutility.com](https://app.tankutility.com).

Devices:

Each item in the list of devices is a 24 character string.  These values can be found by clicking on the **Usage
Reports** link at the bottom of the graph on the [Tank Utility devices page](https://app.tankutility.com/#/devices).
The device item value is the last segment of the URL path, e.g., the URL
[https://app.tankutility.com/#/reports/000000000000000000000000](https://app.tankutility.com/#/reports/000000000000000000000000)
would indicate `000000000000000000000000` as a device value.
