---
title: Synology DSM
description: Instructions on how to integrate the Synology DSM sensor within Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.32
ha_iot_class: Local Polling
ha_domain: synology_dsm
ha_codeowners:
  - '@ProtoThis'
  - '@Quentame'
ha_config_flow: true
---

The `synology_dsm` sensor platform provides access to various statistics from your [Synology NAS](https://www.synology.com).

## Configuration

There are two ways to integrate your Synology DSM into Home Assistant.

### Via the frontend

Menu: *Configuration* -> *Integrations*. Search for "Synology DSM", fill in the configuration form with your username and password, and then click **Submit**.

### Via the configuration file

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
synology_dsm:
  - host: IP_ADDRESS_OR_HOSTNAME_OF_SYNOLOGY_NAS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address or DNS hostname of the Synology NAS to monitor.
  required: true
  type: string
port:
  description: The port number on which the Synology NAS is reachable.
  required: false
  default: 5001 if `ssl` is true, 5000 if `ssl` is false
  type: integer
ssl:
  description: Determine if HTTPS should be used.
  required: false
  default: true
  type: boolean
username:
  description: The account username to connect to the Synology NAS. Using a separate account is advised, see the [Separate User Configuration](#separate-user-configuration) section below for details.
  required: true
  type: string
password:
  description: The password of the user to connect to the Synology NAS.
  required: true
  type: string
volumes:
  description: "Array of volumes to monitor. Defaults to all volumes. Replace any spaces in the volume name with underscores. For example, replace `volume 1` with `volume_1`."
  required: false
  type: list
disks:
  description: "Array of disks to monitor. Defaults to all disks. Use only disk names like `sda`, `sdb`, and so on."
  required: false
  type: list
{% endconfiguration %}


<div class='note warning'>

This sensor will wake up your Synology NAS if it's in hibernation mode.

</div>

## Separate User Configuration

Due to the nature of the Synology DSM API, it is required to grant the user admin rights. This is related to the fact that utilization information is stored in the core module.

When creating the user, it is possible to deny access to all locations and applications. By doing this, the user will not be able to login to the web interface or view any of the files on the Synology NAS. It is still able to read the utilization and storage information using the API.

<div class='note warning'>

The Home Assistant integration doesn't support two-factor authentication for Synology DSM accounts. Use a strong, randomly generated password to improve security.

</div>


## Created sensors

Sensors are:
- `cpu_other_load`: Displays unspecified (that is, not user or system) load in percentage.
- `cpu_user_load`: Displays user load in percentage.
- `cpu_system_load`: Displays system load in percentage.
- `cpu_total_load`: Displays combined load in percentage.
- `cpu_1min_load`: Displays maximum load in past minute.
- `cpu_5min_load`: Displays maximum load in past 5 minutes.
- `cpu_15min_load`: Displays maximum load in past 15 minutes.
- `memory_real_usage`: Displays percentage of memory used.
- `memory_size`: Displays total size of memory in MB.
- `memory_cached`: Displays total size of cache in MB.
- `memory_available_swap`: Displays total size of available swap in MB.
- `memory_available_real`: Displays total size of memory used (based on real memory) in MB.
- `memory_total_swap`: Displays total size of actual memory in MB.
- `memory_total_real`: Displays total size of real memory in MB.
- `network_up`: Displays total up speed of network interfaces (combines all interfaces).
- `network_down`: Displays total down speed of network interfaces (combines all interfaces).
- `disk_name`: Displays the name of the hard disk (creates a new entry for each disk).
- `disk_device`: Displays the path of the hard disk (creates a new entry for each disk).
- `disk_smart_status`: Displays the S.M.A.R.T status of the hard disk (creates a new entry for each disk).
- `disk_status`: Displays the status of the hard disk (creates a new entry for each disk).
- `disk_exceed_bad_sector_thr`: Displays true / false to indicate if the hard disk exceeded the maximum bad sector threshold (creates a new entry for each disk). (Does not work with DSM 5.x)
- `disk_below_remain_life_thr`: Displays true / false to indicate if the hard disk dropped below the remain life threshold (creates a new entry for each disk). (Does not work with DSM 5.x)
- `disk_temp`: Displays the temperature of the hard disk (creates a new entry for each disk, uses the unit_system to display in C or F).
- `volume_status`: Displays the status of the volume (creates a new entry for each volume).
- `volume_device_type`: Displays the volume type (RAID, etc) (creates a new entry for each volume).
- `volume_size_total`: Displays the total size of the volume in GB's (creates a new entry for each volume).
- `volume_size_used`: Displays the used space on this volume in GB's (creates a new entry for each volume).
- `volume_percentage_used`: Displays the percentage used for this volume in GB's (creates a new entry for each volume).
- `volume_disk_temp_avg`: Displays the average temperature of all disks in the volume (creates a new entry for each volume).
- `volume_disk_temp_max`: Displays the maximum temperature of all disks in the volume (creates a new entry for each volume).
