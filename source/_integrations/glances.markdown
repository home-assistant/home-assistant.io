---
title: Glances
description: Instructions on how to integrate Glances sensors into Home Assistant.
ha_category:
  - System Monitor
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

These sensors needs a running instance of `glances` on the host. The minimal supported version of `glances` is 2.3.
To start a Glances RESTful API server on its default port 61208 then test you can use the following command:

```bash
$ sudo glances -w
Glances web server started on http://0.0.0.0:61208/
```

Check if you are able to access the API located at `http://IP_ADRRESS:61208/api/3`. Don't use `-s` as this will start the XML-RPC server on port 61209. Home Assistant only supports the REST API of GLANCES.

The details about your memory usage is provided as a JSON response. If so, you are good to proceed.

```bash
$ curl -X GET http://IP_ADDRESS:61208/api/3/mem/free
{"free": 203943936}
```

If this doesn't work, try changing the `3` to `2`, if you don't have the latest version of Glances installed.

For details about auto-starting `glances`, please refer to [Start Glances through Systemd](https://github.com/nicolargo/glances/wiki/Start-Glances-through-Systemd).  

{% include integrations/config_flow.md %}

## Integration Entities

Glances integration will add the following sensors if available in the platform:

- For each detected disk (or mount point) the following sensors will be created:
  - disk_use_percent: The used disk space in percent.
  - disk_use: The used disk space.
  - disk_free: The free disk space.
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

Not all platforms are able to provide all metrics. For instance the cpu temp sensor requires installing and configuring `lmsensors` in Ubuntu, and may not be available at all in other platforms.
