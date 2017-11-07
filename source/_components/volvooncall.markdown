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
ha_category: Hub
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---


The `volvooncall` platform offers integration with the [Volvo On Call](http://www.volvocars.com/intl/own/connectivity/volvo-on-call) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

To use Volvo On Call in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: username
  password: password
```

Users registered with Volvo in North America or China will need to specify a service URL:

```yaml
# North America 
volvooncall:
  username: username
  password: password
  service_url: 'https://vocapi-na.wirelesscar.net/customerapi/rest/v3.0/'
```
```yaml
# China
volvooncall:
  username: username
  password: password
  service_url: 'https://vocapi-cn.wirelesscar.net/customerapi/rest/v3.0/'
```

A more advanced example for setting the vehicle name and selecting what resources to display:

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
- **service_url** (*Optional*): The service URL to use for Volvo On Call (defaults to https://vocapi.wirelesscar.net/customerapi/rest/v3.0/).
- **name** (*Optional*): Make it possible to provide a name for the vehicles.
- **resources** (*Optional*): A list of resources to display (defaults to all available).

