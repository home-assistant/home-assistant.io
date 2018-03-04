---
layout: page
title: "Palo Alto Sensor"
description: "Palo Alto Device integration into Home Assistant."
date: 2018-03-04 16:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_iot_class: "Local Polling"
logo: palo_alto.png
ha_release: 0.65
---


The `paloalto` sensor platform is displaying the statistical summary of a [Palo Alto](https://www.paloaltonetworks.com/) device.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: paloalto
```

Configuration variables:

- **ip_address** (*Required*): The IP address of the Palo Alto device.
- **api_key** (*Required*): The `api_key` for authentication.
- **ssl** (*Optional*): If `true`, use SSL/TLS to connect to the Palo Alto device. Defaults to `False`.
- **verify_ssl** (*Optional*): Verify the certification of the system. Default to `True`.
- **scan_interval**: Indicates how often the sensor should update. Defaults to `120` seconds.
- **monitored_conditions** (*Optional*): Defines the stats to monitor as sensors.
  - **host_name**: Host Name of the device.
  - **up_time**: Up time of the device.
  - **serial_no**: Serial Number of the device.
  - **sw_version**: Software version installed on the device.
  - **gp_version**: Global Protect version installed on the device.
  - **logdb_version**: Log Db version installed on the device.
  - **operation_mode**: Operating mode of the device.
  - **core_temp**: Core temperature of the device.
  - **sys_temp**: System temperature of the device.
  - **gp_user_count**: Global Protect logged in user count.
  - **gp_users**: Global Protect logged in users (comma seperated list).
  - **loggedin_user_count**: Count of currently logged in users.
  - **loggedin_users**: Currently logged in users.

Sample configuration:

```yaml
# Sample configuration.yaml entry
sensor:
  - platform: paloalto
    api_key: !secret paloalto_authkey
    ip_address: !secret paloalto_hostip
    ssl: True
    verify_ssl: False
    scan_interval: 120
    monitored_conditions:
      - host_name
      - up_time
      - serial_no
      - sw_version
      - gp_version
      - logdb_version
      - operation_mode
      - core_temp
      - sys_temp
      - gp_users
      - gp_user_count
      - loggedin_user_count
      - loggedin_users
```
