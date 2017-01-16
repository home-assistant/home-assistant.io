---
layout: page
title: "Volvo On Call"
description: "Instructions for how to integrate Volvo On Call into Home Assistant."
date: 2016-10-02 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: volvo.png
ha_category: Presence Detection
ha_release: "0.30"
---


The `volvooncall` platform offers presence detection by retrieving your car's information from the [Volvo On Call](http://www.volvocars.com/intl/own/connectivity/volvo-on-call) cloud service.

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: volvooncall
    username: username
    password: password
```

Configuration variables:

- **username** (*Required*): The username associated with your Volvo On Call account.
- **password** (*Required*): The password for your given Volvo On Call account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the cars to be tracked.
