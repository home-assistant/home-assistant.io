---
title: Glances
description: Instructions on how to integrate Glances sensors into Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.7.3
ha_config_flow: true
ha_codeowners:
  - '@engrbm87'
ha_domain: glances
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `glances` integration allows you to monitor the system information provided by the [Glances](https://github.com/nicolargo/glances) API. This enables one to track remote host and display their stats in Home Assistant.

## Setup

{% important %}
Support for Glances api version 2 is deprecated. It is recommended to upgrade your Glances server to version 3. Once upgraded, reload the integration to connect again.
{% endimportant %}

These sensors needs a running instance of `glances` in [Web Server Mode](https://glances.readthedocs.io/en/latest/quickstart.html#web-server-mode) on the host. The minimal supported version of `glances` is 2.3.

For details about auto-starting `glances`, please refer to [Start Glances through Systemd](https://github.com/nicolargo/glances/wiki/Start-Glances-through-Systemd).  


{% include integrations/config_flow.md %}

## Integration entities

Glances integration will add the following sensors if available in the platform:

- For each detected disk (or mount point) the following sensors will be created:
  - disk_use_percent: The used disk space in percent.
  - disk_use: The used disk space.
  - disk_free: The free disk space.
- For each detected physical disk, the following sensors will be created:
  - diskio_read: Average rate of data read from the device in megabytes per second.
  - diskio_write: Average rate of data written to the device in megabytes per second.
- memory_use_percent: The used memory in percent.
- memory_use: The used memory.
- memory_free: The free memory.
- swap_use_percent: The used swap space in percent.
- swap_use: The used swap space.
- swap_free: The free swap space.
- processor_load: The load.
- process_running: The number of running processes.
- process_total: The total number of processes.
- process_thread: The number of threads.
- process_sleeping: The number of sleeping processes.
- cpu_use_percent: The used CPU in percent.
- sensor_temp: A temperature sensor for each device that provides temperature (depends on platform).
- docker_active: The count of active Docker containers.
- docker_cpu_use: The total CPU usage in percent of Docker containers.
- docker_memory_use: The total memory used by Docker containers.
- For each detected raid the following sensors will be created:
  - raid_available: The number of available devices for the raid.
  - raid_used: The number of devices used by the raid.
- For each detected network interface, the following sensors will be created:
  - network_rx: Average rate of data received since last update in Megabits per second.
  - network_tx: Average rate of data sent since last update in Megabits per second.
- For each detected GPU (video card) the following sensors will be created:
  - memory_use: The amount of available VRAM used in percent.
  - processor_use: The load on the GPU processor in percent.
  - temperature: The temperature that the GPU reports, in degrees Celsius.
  - fan_speed: The speed of the GPU fan, in percent.
- uptime: The server uptime.

Not all platforms are able to provide all metrics. For instance the GPU sensors require installing the py3nvml Python package, and the cpu temp sensor requires installing and configuring `lmsensors` in Ubuntu, and may not be available at all in other platforms.
