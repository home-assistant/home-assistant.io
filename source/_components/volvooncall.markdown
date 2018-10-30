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
ha_category: Car
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---

The `volvooncall` component offers integration with the [Volvo On Call](http://www.volvocars.com/intl/own/connectivity/volvo-on-call) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

## {% linkable_title Configuration %}

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Users registered with Volvo in North America or China will need to specify a region:

```yaml
# North America
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  region: na
```

or

```yaml
# China
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  region: cn
```

A more advanced example for setting the vehicle name and selecting what resources to display:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  name:
    abc123: 'Batmobile'
  resources:
    - doors
    - lock
    - heater
```

{% configuration %}
username:
  description: The username associated with your Volvo On Call account.
  required: true
  type: string
password:
  description: The password for your given Volvo On Call account.
  required: true
  type: string
region:
  description: The region where the Volvo is registered. Needs to be set for users in North America or China.
  required: false
  type: string
service_url:
  description: The service URL to use for Volvo On Call. Normally not necessary to specify.
  required: false
  type: string
name:
  description: Make it possible to provide a name for the vehicles.
  required: false
  type: string
resources:
  description: A list of resources to display (defaults to all available).
  required: false
  type: list
scandinavian_miles:
  description: If set to true, Scandinavian miles ("mil") are used for distances and fuel range.
  required: false
  type: boolean
  default: false
{% endconfiguration %}
