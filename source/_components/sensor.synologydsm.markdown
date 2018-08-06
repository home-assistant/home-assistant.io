---
layout: page
title: "SynologyDSM Sensor"
description: "Instructions on how to integrate the SynologyDSM sensor within Home Assistant."
date: 2016-10-30 23:21
sidebar: true
comments: false
sharing: true
footer: true
logo: synology.png
ha_category: System Monitor
ha_release: 0.32
ha_iot_class: "Local Polling"
---


The `synologydsm` sensor platform allows getting various statistics from your [Synology NAS](https://www.synology.com).

## {% linkable_title Configuration %}

To use the `synologydsm` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: synologydsm
    host: IP_ADDRESS_OF_SYNOLOGY_NAS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    monitored_conditions:
      - cpu_total_load
      - memory_real_usage
      - network_up
```

Configuration variables:

- **host** (*Required*): The IP address of the Synology NAS to monitor.
- **port** (*Optional*): The port number on which the Synology NAS is reachable. Defaults to `5001`.
- **username** (*Required*): An user to connect to the Synology NAS (a separate account is advised, see the Separate User Configuration section below for details).
- **password** (*Required*): The password of the user to connect to the Synology NAS.
- **ssl** (*Optional*): Determine if HTTPS should be used. Defaults to `True` which by default runs on port `5001`.
- **volumes** (*Optional*): Array of volumes to monitor. Defaults to all volumes.
- **disks** (*Optional*): Array of disks to monitor. Defaults to all disks.
- **monitored_conditions** (*Required*): Defines a [template](/topics/templating/) to extract a value from the payload.
  - **cpu_other_load**: Displays unspecified load in percentage.
  - **cpu_user_load**: Displays user load in percentage.
  - **cpu_system_load**: Displays system load in percentage.
  - **cpu_total_load**: Displays combined load in percentage.
  - **cpu_1min_load**: Displays maximum load in past minute.
  - **cpu_5min_load**: Displays maximum load in past 5 minutes.
  - **cpu_15min_load**: Displays maximum load in past 15 minutes.
  - **memory_real_usage**: Displays percentage of memory used.
  - **memory_size**: Displays total size of memory in MB.
  - **memory_cached**: Displays total size of cache in MB.
  - **memory_available_swap**: Displays total size of available swap in MB.
  - **memory_available_real**: Displays total size of memory used (based on real memory) in MB.
  - **memory_total_swap**: Displays total size of actual memory in MB.
  - **memory_total_real**: Displays total size of real memory in MB.
  - **network_up**: Displays total up speed of network interfaces (combines all interfaces).
  - **network_down**: Displays total down speed of network interfaces (combines all interfaces).
  - **disk_name**: Displays the name of the hard disk (creates a new entry for each disk).
  - **disk_device**: Displays the path of the hard disk (creates a new entry for each disk).
  - **disk_smart_status**: Displays the S.M.A.R.T status of the hard disk (creates a new entry for each disk).
  - **disk_status**: Displays the status of the hard disk (creates a new entry for each disk).
  - **disk_exceed_bad_sector_thr**: Displays true / false to indicate if the hard disk exceeded the maximum bad sector threshold (creates a new entry for each disk).
  - **disk_below_remain_life_thr**: Displays true / false to indicate if the hard disk dropped below the remain life threshold (creates a new entry for each disk).
  - **disk_temp**: Displays the temperature of the hard disk (creates a new entry for each disk, uses the unit_system to display in C or F).
  - **volume_status**: Displays the status of the volume (creates a new entry for each volume).
  - **volume_device_type**: Displays the volume type (RAID, etc) (creates a new entry for each volume).
  - **volume_size_total**: Displays the total size of the volume in GB's (creates a new entry for each volume).
  - **volume_size_used**: Displays the used space on this volume in GB's (creates a new entry for each volume).
  - **volume_percentage_used**: Displays the percentage used for this volume in GB's (creates a new entry for each volume).
  - **volume_disk_temp_avg**: Displays the average temperature of all disks in the volume (creates a new entry for each volume).
  - **volume_disk_temp_max**: Displays the maximum temperature of all disks in the volume (creates a new entry for each volume).

<p class='note'>
After booting Home Assistant it can take up to 15 minutes for the sensors to show up. This is due to the fact that sensors are created after Home Assistant has fully been initialized.
</p>

<p class='note warning'>
This sensor will wake up your Synology NAS if it's in hibernation mode.
</p>

## {% linkable_title Separate User Configuration %}

Due to the nature of the Synology DSM API it is required to grant the user admin rights. This is related to the fact that utilization information is stored in the core module.

When creating the user it is possible to deny access to all locations and applications. By doing this the user will not be able to login to the web interface or view any of the files on the Synology NAS. It is still able to read the utilization and storage information using the API.
