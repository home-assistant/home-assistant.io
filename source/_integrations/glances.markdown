---
title: "Glances"
description: "Instructions on how to integrate Glances sensors into Home Assistant."
logo: glances.png
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.7.3
---


The `glances` sensor platform is consuming the system information provided by the [Glances](https://github.com/nicolargo/glances) API. This enables one to track remote host and display their stats in Home Assistant.

## Setup

This sensors needs a running instance of `glances` on the host. The minimal supported version of `glances` is 2.3.
To start a Glances RESTful API server on its default port 61208, the a test the following command can be used:

```bash
$ sudo glances -w
Glances web server started on http://0.0.0.0:61208/
```

Check if you are able to access the API located at `http://IP_ADRRESS:61208/api/2`. Don't use `-s` as this will start the XMLRPC server on port 61209. Home Assistant only supports the REST API of GLANCES.

The details about your memory usage is provided as a JSON response. If so, you are good to proceed.

```bash
$ curl -X GET http://IP_ADDRESS:61208/api/2/mem/free
{"free": 203943936}
```

If this doesn't work, try changing the `2` for `3`, if you have installed the latest version of Glances.

For details about auto-starting `glances`, please refer to [Start Glances through Systemd](https://github.com/nicolargo/glances/wiki/Start-Glances-through-Systemd).

## Configuration

To enable the Glances sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: glances
    host: IP_ADDRESS
    resources:
      - 'disk_use_percent'
```

{% configuration %}
host:
  description: IP address of the host where Glances is running.
  required: false
  type: string
  default: localhost
port:
  description: The port where Glances is listening.
  required: false
  type: integer
  default: 61208
name:
  description: The prefix for the sensors.
  required: false
  type: string
  default: Glances
username:
  description: Your username for the HTTP connection to Glances.
  required: false
  type: string
password:
  description: Your password for the HTTP connection to Glances.
  required: false
  type: string
ssl:
  description: "If `true`, use SSL/TLS to connect to the Glances system."
  required: false
  type: boolean
  default: false
verify_ssl:
  description: Verify the certification of the system.
  required: false
  type: boolean
  default: true
version:
  description: "The version of the Glances API. Supported version: `2` and `3`."
  required: false
  type: integer
  default: 2
resources:
  description: Entries to monitor.
  required: false
  type: list
  default: disk_use
  keys:
    disk_use_percent:
      description: The used disk space in percent.
    disk_use:
      description: The used disk space.
    disk_free:
      description: The free disk space.
    memory_use_percent:
      description: The used memory in percent.
    memory_use:
      description: The used memory.
    memory_free:
      description: The free memory.
    swap_use_percent:
      description: The used swap space in percent.
    swap_use:
      description: The used swap space.
    swap_free:
      description: The free swap space.
    processor_load:
      description: The load.
    process_running:
      description: The number of running processes.
    process_total:
      description: The total number of processes.
    process_thread:
      description: The number of threads.
    process_sleeping:
      description: The number of sleeping processes.
    cpu_use_percent:
      description: The used CPU in percent.
    cpu_temp:
      description: The CPU temperature (may not be available on all platforms).
    docker_active:
      description: The count of active Docker containers.
    docker_cpu_use:
      description: The total CPU usage in percent of Docker containers.
    docker_memory_use:
      description: The total memory used by Docker containers.
docker_containers:
  description: List of Docker container names to monitor
  required: false
  type: list
{% endconfiguration %}

Not all platforms are able to provide all metrics. For instance `cpu_temp` is requires installing and configuring `lmsensors` in Ubuntu, and may not be available at all in other platforms.
