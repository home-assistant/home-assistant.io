---
layout: page
title: "Volvo On Call"
description: "Instructions for how to integrate Volvo On Call into Home Assistant."
date: 2017-03-07 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: volvo.png
ha_category: Hub
featured: false
ha_release: 0.39
---


The `volvooncall` platform offers integrates with the [Volvo On Call](http://www.volvocars.com/intl/own/owner-info/volvo-on-call#) cloud service and offers presence detection (if available) as well as sensors such as odometer and fuel level.

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: username
  password: password
  name:
    abc123: Batmobile
  resources:
    - doors
    - lock
    - heater
```

Configuration variables:

- **username** (*Required*): The username associated with your Volvo On Call account.
- **password** (*Required*): The password for your given Volvo On Call account.
- **name** (*Optional*): A name for each vehicle to be displayed in the user interface (defaults to registration number).
- **resources** (*Optional*): A list of resources to display (defaults to all available).

