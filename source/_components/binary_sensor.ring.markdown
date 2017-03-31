---
layout: page
title: "Ring"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
date: 2017-03-10 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ring.png
ha_category: Binary Sensor
ha_release: 0.40
---

The `ring` binary sensor allows you to integrate your [Ring.com](https://ring.com/) devices in Home Assistant.

Currently only doorbells are supported by this sensor.

To enable device linked in your [Ring.com](https://ring.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ring
    username: USERNAME
    password: PASSWORD
    monitored_conditions:
      - ding
      - motion
```

Configuration variables:

- **username** (*Required*): The username for accessing your Ring account.
- **password** (*Required*): The password for accessing your Ring account.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **ding**: Return a boolean value when the doorbell button was pressed.
  - **motion**: Return a boolean value when the a moviment was detected by the Ring doorbell.
