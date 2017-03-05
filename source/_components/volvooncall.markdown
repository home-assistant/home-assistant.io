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


The `volvooncall` platform offers integrates with the [Volvo On Call](http://www.volvocars.com/intl/own/owner-info/volvo-on-call#) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: username
  password: password
  name:
    abc123: 'Batmobile'
  resources:
    - doors
    - lock
    - heater
```

Configuration variables:

- **username** (*Required*): The username associated with your Volvo On Call account.
- **password** (*Required*): The password for your given Volvo On Call account.
- **name** (*Optional*): Make it possible to provide a name for the vehicles.
- **resources** (*Optional*): A list of resources to display (defaults to all available).

