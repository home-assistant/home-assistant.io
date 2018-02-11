---
layout: page
title: "Netdata"
description: "Instructions how to integrate Netdata within Home Assistant."
date: 2016-12-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netdata.png
ha_category: System Monitor
ha_release: 0.35
ha_iot_class: "Local Polling"
---


The `netdata` sensor platform allows you to display information collected by [Netdata](http://my-netdata.io/).

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netdata
```

Configuration variables:

- **host** (*Optional*): The IP address or hostname of your Netdata instance. Defaults to `localhost`.
- **port** (*Optional*): The port that the Netdata instance is running on. Defaults to `19999`.
- **name** (*Optional*): Name of the sensor. Defaults to "Netdata".
- **resources** (*Optional*) array: List of details to monitor. Defaults is `memory_free`.
  - 'memory_free': Free memory
  - 'memory_used': Used memory
  - 'memory_cached': Cached memory
  - 'memory_buffers': Buffered memory
  - 'swap_free': Free swap
  - 'swap_used': Used swap
  - 'processes_running': Processes Running
  - 'processes_blocked': Processes Blocked
  - 'system_load': System Load 15 min
  - 'system_io_in': System I/O In
  - 'system_io_out': System I/O Out
  - 'ipv4_in': Amount of inbound IPv4 packets per second
  - 'ipv4_out': Amount of outbound IPv4 packets per second
  - 'disk_free': Free disk space
  - 'cpu_iowait': CPU spent spent waiting for IO operations
  - 'cpu_user': CPU time spent executing user tasks
  - 'cpu_system': CPU time spent executing system tasks
  - 'cpu_softirq': CPU time spent servicing soft interrupts
  - 'cpu_guest': CPU time spent on guest tasks (such as VMs)
  - 'uptime': Time (in seconds) since last boot
  - 'packets_received': Amount of packets received
  - 'packets_sent': Amount of packets sent
  - 'connections': Total active connections
