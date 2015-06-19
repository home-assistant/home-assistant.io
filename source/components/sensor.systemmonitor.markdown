---
layout: page
title: "Monitor server resources"
description: "Instructions how to integrate server resources within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/utilities-system-monitor.png' class='brand pull-right' />
The system monitoring sensor platform to allow you to monitor disk usage, memory usage, CPU usage, and running processes. This platform has superseded the process component which is now considered deprecated.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
      - type: memory_free
      - type: processor_use
```

The table contains types and their argument to use in your `configuration.yaml` file.

| Type                | Argument                 |
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


[Theodor Lindquist](https://github.com/theolind) has contributed the System monitoring platform.
