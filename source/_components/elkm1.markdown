---
layout: page
title: "Elk-M1 Controller"
description: "Instructions to setup the Elk-M1 controller."
date: 2018-10-07 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: elkproducts.png
ha_release: 0.81
ha_category: Hub
ha_iot_class: "Local Push"
---

The Elk-M1 is a home security and automation controller that is capable of alarm control panel functions and automation.

The Elk-M1 controller is manufactured by [Elk Products](https://www.elkproducts.com).

## {% linkable_title Configuration %}

To integrate Elk-M1 controller with Home Assistant, add the following
section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
elkm1:
  host: elk://IP_ADDRESS
```

{% configuration %}
host:
  description: Connection string to Elk of the form `<method>://<address>[:port]`. `<method>` is `elk` for non-secure connection, `elks` for secure connection, and `serial` for serial port connection. `<address>` is IP address or domain or for `serial` the serial port that the Elk is connected to. Optional `<port>` is the port to connect to on the Elk, defaulting to 2101 for `elk` and 2601 for `elks`.
  required: true
  type: string
username:
  description: Username to login to Elk. Only required if using `elks` connection method.
  required: false
  type: string
password:
  description: Password to login to Elk. Only required if using `elks` connection method.
  required: false
  type: string
temperature_unit:
  description: The temperature unit that the Elk panel uses. Valid values are `C` and `F`.
  required: false
  type: string
  default: F
area:
  description: Elk areas to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
counter:
  description: Elk counters to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
keypad:
  description: Elk keypads to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
output:
  description: Elk outputs to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
setting:
  description: Elk settings to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
task:
  description: Elk tasks to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
thermostat:
  description: Elk thermostats to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
plc:
  description: Elk PLC lights to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
zone:
  description: Elk zones to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a postive integer or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or a X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
{% endconfiguration %}

Example configuration of the above:
```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  area:
    exclude: [5-8]
  zone:
    exclude: [11-16, 19-192, 199-208]
  plc:
    include: [a1-d16, 192]
    exclude: [b12-d5]
```
