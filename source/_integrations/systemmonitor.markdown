---
title: System monitor
description: Instructions on how to monitor the Home Assistant host.
ha_category:
  - System monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: systemmonitor
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@gjohansson-ST'
---

The **System monitor** {% term integration %} allows you to monitor disk usage, memory usage, network usage, CPU usage, and running processes.

{% include integrations/config_flow.md %}

## Sensors

{% note %}

All entities are disabled by default, you need to [enable the entities](/common-tasks/general/#enabling-or-disabling-entities) that you wish to use.

All sensors are also marked as diagnostic and won't be automatically added to automatic dashboards.

{% endnote %}

### Disks

One sensor per found disk/mount point will be created

- Disk free
- Disk use
- Disk usage (percent)

### Network

One sensor per found network interface will be created

- IPv4 address
- IPv6 address
- Network in
- Network out
- Packets in
- Packets out
- Network throughput in
- Network throughput out

### Other

- Last boot
- Load (15m)
- Load (5m)
- Load (1m)
- Memory free
- Memory use
- Memory usage (percent)
- Processor use
- Processor temperature
- Swap free
- Swap use
- Swap usage (percent)

## Add `process` binary sensor

The `process` binary sensor needs to be configured by the config entry options. Go to **{% my integrations title="Settings > Devices & services" %}**, select the **System Monitor** integration and select **Configure**.

You can select from the pre-populated list (current running processes) or manually enter the process name, to which a binary sensor will be created per selected `process`.

## Disk usage

{% note %}

The disk usage sensors do not support monitoring folder/directory sizes. Instead, it is only targeting "disks" (more specifically mount points on Linux).

{% endnote %}

**Example output from the Linux `df -H` command**

```bash

$ df -H
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        29G   12G   16G  42% /
devtmpfs        805M     0  805M   0% /dev
tmpfs           934M     0  934M   0% /dev/shm
/dev/mmcblk0p1  253M   54M  199M  22% /boot

```

## Processor temperature

- If no hardware sensor data is available (e.g., because the integration runs in a virtualized environment), the sensor entity will not be created.
- The unit of measurement (Celsius vs. Fahrenheit) will be chosen based on the system configuration.
- Only the very first processor related hardware sensor is read, i.e. no individual core temperatures are available (even if the hardware sensor provides that level of detail).
