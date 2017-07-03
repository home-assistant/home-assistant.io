---
layout: page
title: "IntesisHome AC Controller"
description: "Instructions how to setup IntesisHome integration with Home Assistant"
date: 2017-07-03 21:38
sidebar: true
comments: false
sharing: true
footer: true
logo: intesishome.png
ha_category: Climate
ha_release: 0.49
ha_iot_class: "Cloud Push"
---

The `IntesisHome` climate platform let you control [IntesisHome](https://www.intesishome.com) devices. IntesisHome provide integrations with air conditioners including including Panasonic, Daikin, Fujitsu, Toshiba, LG and more.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: intesishome
    username: 'YOUR_USERNAME'
    password: 'YOUR_PASSWORD'
```

This component opens a TCP connection with the IntesisHome API to receive temperature and status updates, and to issue commands.
