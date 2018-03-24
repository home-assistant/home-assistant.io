---
layout: page
title: "QNAP Sensor"
description: "Instructions on how to integrate the QNAP sensor within Home Assistant."
date: 2017-02-02 06:39
sidebar: true
comments: false
sharing: true
footer: true
logo: qnap.png
ha_category: Sensor
ha_release: 0.38
ha_iot_class: "Local Polling"
---


This `qnap` sensor allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

To use the `qnap` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
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

Configuration variables:

- **host** (*Required*): The IP address of the QNAP NAS to monitor
- **port** (*Optional*): The port number on which the QNAP NAS web interface is reachable. Defaults to `8080`.
- **ssl** (*Optional*): Whether to connect via `https`. Defaults to `false`.
- **verify_ssl** (*Optional*): Whether SSL certificates should be validated. Defaults to `true`.
- **timeout** (*Optional*): How long (in seconds) to wait for a response from the QNAP device before giving up. Defaults to `10`.
- **username** (*Required*): An user to connect to the QNAP NAS.
- **password** (*Required*): The password of the user to connect to the QNAP NAS.
- **drives** (*Optional*): Array of drives to monitor (ex: `0:1`). Defaults to all drives.
- **volumes** (*Optional*): Array of volumes to monitor (ex: `DataVol1`). Defaults to all volumes.
- **nics** (*Optional*): Array of network interfaces to monitor (ex: `eth0`). Defaults to all NICs.
- **monitored_conditions** (*Required*): Defines the stats to monitor as sensors.
  - **status**: Displays overall system health.
  - **system_temp**: Displays the overall system temperature.
  - **cpu_temp**: Displays the CPU's temperature.
  - **cpu_usage**: Displays the CPU's utilization as a percentage.
  - **memory_free**: Displays the size of available RAM in GB.
  - **memory_used**: Displays the size of used RAM in GB.
  - **memory_percent_used**: Displays the size of used RAM as a percentage of total RAM.
  - **network_link_status**: Displays whether the network interfaces is up (creates a new entry for each interface).
  - **network_tx**: Displays the upload speed of a network interface in MB/s (creates a new entry for each interface).
  - **network_rx**: Displays the download speed of a network interface in MB/s (creates a new entry for each interface).
  - **drive_smart_status**: Displays the S.M.A.R.T. status of the drive (creates a new entry for each drive).
  - **drive_temp**: Displays the temperature of the drive (creates a new entry for each drive).
  - **volume_size_free**: Displays the available space of the volume in GB (creates a new entry for each volume).
  - **volume_size_used**: Displays the used space of the volume in GB (creates a new entry for each volume).
  - **volume_percentage_used**: Displays the used space of the volume as a percentage (creates a new entry for each volume).

### Self-signed certificates

If your QNAP device uses self-signed certificates, set the `verify_ssl` option to `false`.

### QNAP device support:

This component has been tested on the following devices:

 - TS-259 Pro+ (QTS 4.2.6)
 - TS-410 (QTS 4.2.3)
 - TS-419 (QTS 4.2.3)
 - TS-451 (QTS 4.2.2)
 - TS-470 (QTS 4.2.2)
 - TS-639 (QTS 4.2.3)

Other QNAP NAS devices using similar firmware should work fine. For more information about supported devices, or to report issues with your device, please visit the [qnapstats project](https://github.com/colinodell/python-qnapstats#device-support).
