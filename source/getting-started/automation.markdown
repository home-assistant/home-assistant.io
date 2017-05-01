---
layout: page
title: "Automating Home Assistant"
description: "Instructions to get started with Automation using Home Assistant."
date: 2016-09-26 21:00
sidebar: true
comments: false
sharing: true
footer: true
---

When your devices are set up, it's time to put the cherry on the pie: **automation**. Home Assistant offers [a few built-in automations](/components/#automation) – but you'll be using the automation component to set up your own rules, for the most part.

If you added a random sensor in the previous step then you can use that sensor for your very first automation:

```yaml
automation:
  - alias: Check sensor value and show notification
    trigger:
      platform: numeric_state
      entity_id: sensor.random_sensor
      above: 10
    action:
      service: persistent_notification.create
      data:
        message: "Sensor value greater than 10"
```

For further details about automation, please take the next step or the [automation documentation](/docs/automation/).

### [Next step: Home Assistant Automation Part 2 &raquo;](/getting-started/automation-2/)
