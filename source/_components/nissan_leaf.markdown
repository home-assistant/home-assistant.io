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
ha_release: 0.89
ha_iot_class: "Cloud Polling"
---

The `nissan_leaf` component offers integration with the [NissanConnect EV](http://youplus.nissan.co.uk/GB/en/YouPlus/ConnectedServices.html) cloud service. NissanConnect EV was previously known as Nissan Carwings. It offers:

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
  description: The region where the NissanConnect EV account is registered. Should be one of the following, NE (for Europe), NNA (USA), NCI (Canada), NMA (Australia), NML (Japan).
  required: true
  type: string
nissan_connect:
  description: If your car has the updated head unit (NissanConnect rather than Carwings) then the location can be aquired and exposed via a device tracker. If you have a pre-2014 24 kWh Leaf then you will have Carwings and this should be set to false.
  required: false
  type: boolean
scan_interval:
  description: The interval between updates if the climate control is off and the car is not charging. Set in any time unit (e.g. minutes, hours, days!).
  required: false
  default: 1 hour
  type: time
update_interval_charging:
  description: The interval in minutes between updates if charging.
  required: false
  default: 15
  type: time
update_interval_climate:
  description: The interval in minutes between updates if climate control on.
  required: false
  default: 5
  type: time
{% endconfiguration %}

## {% linkable_title Full configuration sample %}

A more advanced example for setting the update interval:

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
  nissan_connect: true
  scan_interval:
    hours: 1
  update_interval_charging:
    minutes: 15
  update_interval_climate:
    minutes: 5
  force_miles: true
```

## {% linkable_title Updating on-demand using Automation %}

You can also use the `nissan_leaf.update` service to request an on-demand update. To update almost exclusively via the service set the `update_interval` to a high value in the component configuration.  The service requires you to provide the vehicle identification number (VIN) as a parameter. You can see the VIN on the attributes of all the entities created by this component, except the device_tracker.

```yaml
- id: update_when_driver_not_home
  alias: 'Update when driver not home'
  initial_state: on
  trigger:
    - platform: time_pattern
      minutes: '/30'
  condition:
    - condition: state
      entity_id: device_tracker.drivername   # replace
      state: 'not_home'
  action:
    - service: nissan_leaf.update
      data:
        vin: '1HGBH41JXMN109186'             # replace
```

## {% linkable_title Hints %}

* The update interval has a minimum of two minutes.
* Requesting updates uses a small amount of power from the 12 V battery. The 12 V battery charges from the main traction battery when the car is not plugged in. If the car is left plugged in for a long time, or if the main traction battery is very low then the 12 V battery may gradually discharge. A low update interval may cause the 12 V battery to become flat.  When the 12 V battery is flat the car will not start. _Do not set the update interval too low.  Use at your own risk._
* This component communicates with the Nissan Servers which then communicate with the car. The communication between the car and the Nissan Servers is very slow, and takes up to five minutes to get information from the car, therefore the default polling interval is set to one hour to not overwhelm the connection.
* Responses from the Nissan servers are received separately for the battery/range, climate control and location. The `updated_on` attribute will show the last time the data was retrieved from the server. There are separate attributes for when the `next_update` is scheduled, and if an `update_inprogress`. The `nissan_leaf.update` service will reset the `next_update` attribute.

Please report bugs using the following logger configuration.

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.nissan_leaf: debug
    homeassistant.components.device_tracker.nissan_leaf: debug
    homeassistant.components.sensor.nissan_leaf: debug
    homeassistant.components.switch.nissan_leaf: debug
```
