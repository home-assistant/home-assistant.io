---
layout: component
title: "System Monitor"
description: "Instructions how to monitor the Home Assistant host."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

The `systemmonitor` sensor platform to allow you to monitor disk usage, memory usage, CPU usage, and running processes. This platform has superseded the process component which is now considered deprecated.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: systemmonitor
  resources:
    - type: disk_use_percent
      arg: /home
    - type: memory_free
    - type: processor_use
```

Configuration variables:

- **resources** array (*Required*): Contains all entries to display.
  - **type** (*Required*): The type of the information to display, please check the table below for details.
  - **arg** (*Optional*): Argument to use, please check the table below for details.

The table contains types and their argument to use in your `configuration.yaml` file.

| Type (- type:)      | Argument (arg:)          |
| :------------------ |:-------------------------|
| disk_use_percent    | Path, eg. '/'            |
| disk_use            |                          |
| disk_free           |                          |
| memory_use_percent  |                          |
| memory_use          |                          |
| memory_free         |                          |
| swap_use_percent    |                          |
| swap_use            |                          |
| swap_free           |                          |
| network_in          | Interface, eg. 'eth0'    |
| network_out         | Interface, eg. 'eth0'    |
| packets_in          | Interface, eg. 'eth0'    |
| packets_out         | Interface, eg. 'eth0'    |
| ipv4_address        | Interface, eg. 'eth0'    |
| ipv6_address        | Interface, eg. 'eth0'    |
| processor_use       | Interface, eg. 'eth0'    |
| process             | Binary, eg. 'octave-cli' |
| last_boot           |                          |
| since_last_boot     |                          |


