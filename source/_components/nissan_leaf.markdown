---
layout: page
title: "Nissan Leaf"
description: "Instructions for how to integrate Nissan Leaf(s) into Home Assistant."
date: 2019-01-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nissan.png
ha_category: Car
ha_release: 0.85
ha_iot_class: "Cloud Polling"
redirect_from:
 - /components/binary_sensor.nissan_eaf/
 - /components/sensor.nissan_leaf/
 - /components/switch.nissan_leaf/
 - /components/device_tracker.nissan_leaf/
---

The `nissan_leaf` component offers integration with the 
[NissanConnect EV](http://youplus.nissan.co.uk/GB/en/YouPlus/ConnectedServices.html) cloud 
service. NissanConnect EV was previously known as Nissan Car Wings. It offers:

 * sensors for the battery status and range
 * a switch to start and stop the climate control  
 * a switch to start the car charging (cannot be stopped remotely - API limitation)
 * a device tracker to locate the car (only on later Leaf models)

## {% linkable_title Configuration %}

To use Nissan Leaf in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
```

A more advanced example for setting the update interval:

```yaml
# Example configuration.yaml entry
volvooncall:
  username: "john.smith@somewhere.com"
  password: "mysecurepassword"
  region: "NE"
  nissan_connect: true
  update_interval:
    hours: 1
  update_interval_charging:
    minutes: 15
  update_interval_climate:
    minutes: 5
  force_miles: true
```

{% configuration %}
username:
  description: The username associated with your NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
password:
  description: The password for your given NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
region:
  description: The region where the NissanConnect EV account is registered.  Should be one of the following, NE (for Europe), NNA (USA), NCI (Canada), NMA (Australia), NML (Japan)
  required: true
  type: string
nissan_connect:
  description: If your car has the updated head unit (Nissan Connect rather than Car Wings) then you can acquire the location (and maybe climate control). This will be exposed as a device tracker.  If you have a pre-2014 24kWh Leaf then you will have Car Wings and this should be set to false, or it will crash the component.
  required: false
  type: boolean
update_interval:
  description: The interval between updates if the climate control is off and the car is not charging. Set in any time unit (e.g. minutes, hours, days!).  Defaults to 1 hour.
  required: false
  type: time
update_interval_charging:
  description: The interval between updates if charging.  Defaults to 15 minutes.
  required: false
  type: time
update_interval_climate:
  description: The interval between updates if climate control on. Defaults to 5 minutes.
  required: false
  type: time
{% endconfiguration %}

_Notes:_ 
* The update interval will be limited to a minimum of two minutes.
* Requesting updates uses a small amount of power from the 12V battery. The 12V battery
  charges from the main traction battery when the car is not plugged in.  If the car is
  left plugged in for a long time, or if the main traction battery is 
  very low then the 12V battery may gradually discharge. A low update interval may
  cause the 12V battery to become flat.  When the 12V battery is flat the car will not
  start. _Do not set the update interval too low.  Use at your own risk._

Please report bugs using the following logger config.

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.nissan_leaf: debug
    homeassistant.components.device_tracker.nissan_leaf: debug
    homeassistant.components.sensor.nissan_leaf: debug
    homeassistant.components.switch.nissan_leaf: debug
```

