---
title: SynologyDSM
description: Instructions on how to integrate the SynologyDSM sensor within Home Assistant.
logo: synology.png
ha_category:
  - System Monitor
ha_release: 0.32
ha_iot_class: Local Polling
---

The `synologydsm` sensor platform allows getting various statistics from your [Synology NAS](https://www.synology.com).

## Configuration

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

{% configuration %}
name:
  description: The name to use in the frontend for your Synology device.
  required: false
  default: Synology DSM
  type: string
host:
  description: The IP address of the Synology NAS to monitor.
  required: true
  type: string
port:
  description: The port number on which the Synology NAS is reachable.
  required: false
  default: 5001
  type: integer
username:
  description: An user to connect to the Synology NAS (a separate account is advised, see the Separate User Configuration section below for details).
  required: true
  type: string
password:
  description: The password of the user to connect to the Synology NAS.
  required: true
  type: string
ssl:
  description: Determine if HTTPS should be used.
  required: false
  default: true
  type: boolean
volumes:
  description: "Array of volumes to monitor. Defaults to all volumes. Replace any spaces in the volume name with underscores, e.g., `volume 1` with `volume_1`."
  required: false
  type: list
disks:
  description: "Array of disks to monitor. Defaults to all disks. Use only disk names like `sda`, `sdb`, etc."
  required: false
  type: list
monitored_conditions:
  description: Defines a [template](/topics/templating/) to extract a value from the payload.
  required: true
  type: list
  keys:
    cpu_other_load:
      description: Displays unspecified load in percentage.
    cpu_user_load:
      description: Displays user load in percentage.
    cpu_system_load:
      description: Displays system load in percentage.
    cpu_total_load:
      description: Displays combined load in percentage.
    cpu_1min_load:
      description: Displays maximum load in past minute.
    cpu_5min_load:
      description: Displays maximum load in past 5 minutes.
    cpu_15min_load:
      description: Displays maximum load in past 15 minutes.
    memory_real_usage:
      description: Displays percentage of memory used.
    memory_size:
      description: Displays total size of memory in MB.
    memory_cached:
      description: Displays total size of cache in MB.
    memory_available_swap:
      description: Displays total size of available swap in MB.
    memory_available_real:
      description: Displays total size of memory used (based on real memory) in MB.
    memory_total_swap:
      description: Displays total size of actual memory in MB.
    memory_total_real:
      description: Displays total size of real memory in MB.
    network_up:
      description: Displays total up speed of network interfaces (combines all interfaces).
    network_down:
      description: Displays total down speed of network interfaces (combines all interfaces).
    disk_name:
      description: Displays the name of the hard disk (creates a new entry for each disk).
    disk_device:
      description: Displays the path of the hard disk (creates a new entry for each disk).
    disk_smart_status:
      description: Displays the S.M.A.R.T status of the hard disk (creates a new entry for each disk).
    disk_status:
      description: Displays the status of the hard disk (creates a new entry for each disk).
    disk_exceed_bad_sector_thr:
      description: Displays true / false to indicate if the hard disk exceeded the maximum bad sector threshold (creates a new entry for each disk).
    disk_below_remain_life_thr:
      description: Displays true / false to indicate if the hard disk dropped below the remain life threshold (creates a new entry for each disk).
    disk_temp:
      description: Displays the temperature of the hard disk (creates a new entry for each disk, uses the unit_system to display in C or F).
    volume_status:
      description: Displays the status of the volume (creates a new entry for each volume).
    volume_device_type:
      description: Displays the volume type (RAID, etc) (creates a new entry for each volume).
    volume_size_total:
      description: Displays the total size of the volume in GB's (creates a new entry for each volume).
    volume_size_used:
      description: Displays the used space on this volume in GB's (creates a new entry for each volume).
    volume_percentage_used:
      description: Displays the percentage used for this volume in GB's (creates a new entry for each volume).
    volume_disk_temp_avg:
      description: Displays the average temperature of all disks in the volume (creates a new entry for each volume).
    volume_disk_temp_max:
      description: Displays the maximum temperature of all disks in the volume (creates a new entry for each volume).
{% endconfiguration %}

<div class='note'>
After booting Home Assistant it can take up to 15 minutes for the sensors to show up. This is due to the fact that sensors are created after Home Assistant has fully been initialized.
</div>

<div class='note warning'>
This sensor will wake up your Synology NAS if it's in hibernation mode.
</div>

<div class='note warning'>

  If you set `ssl:` to `False`, you *have* to also explicitly set `port:` to **5000**.

</div>

## Separate User Configuration

Due to the nature of the Synology DSM API it is required to grant the user admin rights. This is related to the fact that utilization information is stored in the core module.

When creating the user it is possible to deny access to all locations and applications. By doing this the user will not be able to login to the web interface or view any of the files on the Synology NAS. It is still able to read the utilization and storage information using the API.
