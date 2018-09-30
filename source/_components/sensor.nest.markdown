---
layout: page
title: "Nest Sensor"
description: "Instructions on how to integrate Nest sensors within Home Assistant."
date: 2016-01-13 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Sensor
ha_release: pre 0.7
ha_iot_class: "Cloud Push"
---


The `nest` sensor platform lets you monitor sensors connected to your [Nest](https://nest.com) devices.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors. The sensors will be setup if the `nest` component is configured and the required configuration for the `nest sensor` is set.
</p>

## {% linkable_title Configuration %}

To enable sensors and customize which sensors are setup, you can extend the [Nest component](/components/nest/) configuration in your `configuration.yaml` file with the following settings:
```yaml
# Example configuration.yaml entry
nest:
  sensors:
    monitored_conditions:
      - 'temperature'
      - 'target'
```

By default all sensors for your available Nest devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the [Nest component](/components/nest/).

Configuration variables:

- **monitored_conditions** array (*Optional*): States to monitor.

The following conditions are available by device:

- Nest Home:
  - eta: Estimated time of arrival.
  - security\_state: `ok` or `deter`. [Security State](#security-state). Only available when Nest Camera exists.
- Nest Thermostat:
  - humidity
  - operation\_mode
  - temperature
  - target
  - hvac\_state: The currently active state of the HVAC system, `heating`, `cooling`, or `off`.
- Nest Protect:
  - co\_status: `Ok`, `Warning`, or `Emergency`
  - smoke\_status: `Ok`, `Warning`, or `Emergency`
  - battery\_health: `Ok` or `Replace`
  - color\_status: `gray`, `green`, `yellow`, or `red`. Indicates device status by color in the Nest app UI. It is an aggregate condition for battery+smoke+CO states, and reflects the actual color indicators displayed in the Nest app.
- Nest Camera: none

## {% linkable_title Security State %}

<p class='note warning'>
This feature is not designed to transfer your Home Assitant to a security system, neither Home Assistant nor Nest be liable to You for damages,
or consequential damages of any character arising as a result of use this feature.
  
This feature does not depend on the [Nest Secure alarm system](https://nest.com/alarm-system/overview/) and is not a reflection of the status of that system,
nor does it react to state changes in that system.
</p>

<p class='note'>
This feature uses a new [Nest Security API](https://developers.nest.com/documentation/cloud/security-guide).
You may need to change your ["Product"](https://developers.nest.com/products) permission setting to include `Security State Read`.
After this permission change, you may need to re-authorize your client.
</p>

If a Nest Cam detects the presence of a person (see `person_detected` in [binary_sensor.nest](/components/binary_sensor.nest/)) while the structure is in `away` mode (see `away` in [binary_sensor.nest](/components/binary_sensor.nest/)), the structure enters `deter` mode.

A `deter` state is re-evaluated after several minutes and relaxed to `ok` if no further `person_detected` events have occurred.

The `security_state` automatically switches to `ok` when the structure state is `home`.
