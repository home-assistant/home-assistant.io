---
title: QNAP
description: Instructions on how to integrate the QNAP sensor within Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.38
ha_iot_class: Local Polling
ha_codeowners:
  - '@colinodell'
ha_domain: qnap
---

This `qnap` sensor allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

## Configuration

To use the `qnap` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: qnap
    host: IP_ADDRESS_OF_QNAP_NAS
    username: USERNAME
    password: PASSWORD
    monitored_conditions:
      - status
      - cpu_usage
      - memory_percent_used
      - network_tx
      - volume_percentage_used
```

{% configuration %}
host:
  description: The IP address of the QNAP NAS to monitor.
  required: true
  type: string
port:
  description: The port number on which the QNAP NAS web interface is reachable.
  required: false
  default: 8080
  type: integer
ssl:
  description: Whether to connect via `https`.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Whether SSL certificates should be validated.
  required: false
  default: true
  type: boolean
timeout:
  description: How long (in seconds) to wait for a response from the QNAP device before giving up.
  required: false
  default: 10
  type: integer
username:
  description: An user to connect to the QNAP NAS.
  required: true
  type: string
password:
  description: The password of the user to connect to the QNAP NAS.
  required: true
  type: string
drivers:
  description: "Array of drives to monitor (ex: `0:1`)."
  required: false
  default: all drivers
  type: list
volumes:
  description: "Array of volumes to monitor (ex: `DataVol1`)."
  required: false
  default: all volumes
  type: list
nics:
  description: "Array of network interfaces to monitor (ex: `eth0`)."
  required: false
  default: all NICs
  type: list
monitored_conditions:
  description: Defines the stats to monitor as sensors.
  required: true
  type: list
  keys:
    status:
      description: Displays overall system health.
    system_temp:
      description: Displays the overall system temperature.
    cpu_temp:
      description: Displays the CPU's temperature.
    cpu_usage:
      description: Displays the CPU's utilization as a percentage.
    memory_free:
      description: Displays the size of available RAM in GB.
    memory_used:
      description: Displays the size of used RAM in GB.
    memory_percent_used:
      description: Displays the size of used RAM as a percentage of total RAM.
    network_link_status:
      description: Displays whether the network interfaces is up (creates a new entry for each interface).
    network_tx:
      description: Displays the upload speed of a network interface in MB/s (creates a new entry for each interface).
    network_rx:
      description: Displays the download speed of a network interface in MB/s (creates a new entry for each interface).
    drive_smart_status:
      description: Displays the S.M.A.R.T. status of the drive (creates a new entry for each drive).
    drive_temp:
      description: Displays the temperature of the drive (creates a new entry for each drive).
    volume_size_free:
      description: Displays the available space of the volume in GB (creates a new entry for each volume).
    volume_size_used:
      description: Displays the used space of the volume in GB (creates a new entry for each volume).
    volume_percentage_used:
      description: Displays the used space of the volume as a percentage (creates a new entry for each volume).
{% endconfiguration %}

### Self-signed certificates

If your QNAP device uses self-signed certificates, set the `verify_ssl` option to `false`.

### QNAP device support:

This integration has been tested on the following devices:

- TS-231P2 (QTS 4.4.2)
- TS-259 Pro+ (QTS 4.2.6)
- TS-410 (QTS 4.2.3)
- TS-419 (QTS 4.2.3)
- TS-451 (QTS 4.2.2)
- TS-470 (QTS 4.2.2)
- TS-639 (QTS 4.2.3)

Other QNAP NAS devices using similar firmware should work fine. For more information about supported devices, or to report issues with your device, please visit the [qnapstats project](https://github.com/colinodell/python-qnapstats#device-support).
