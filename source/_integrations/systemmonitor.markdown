---
title: System Monitor
description: Instructions on how to monitor the Home Assistant host.
ha_category:
  - System Monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: systemmonitor
ha_platforms:
  - sensor
---

The `systemmonitor` sensor platform allows you to monitor disk usage,
memory usage, CPU usage, and running processes. 

To add this platform to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /config
      - type: memory_free
```

{% configuration %}
resources:
  description: Contains all entries to display.
  required: true
  type: list
  keys:
    type:
      description: The type of the information to display, please check the table below for details.
      required: true
    arg:
      description: Argument to use, please check the table below for details.
      required: false
{% endconfiguration %}

After restarting Home Assistant, these sensors will show up and update their
information every 15 seconds.

The table contains types and their argument to use in your `configuration.yaml`
file.

| Type (`type:`)         | Argument (`arg:`)         | Argument mandatory        |
| :--------------------- |:--------------------------|:--------------------------|
| disk_use_percent       | Path, e.g., `/`           | no                        |
| disk_use               | Path, e.g., `/`           | no                        |
| disk_free              | Path, e.g., `/`           | no                        |
| memory_use_percent     |                           |                           |
| memory_use             |                           |                           |
| memory_free            |                           |                           |
| swap_use_percent       |                           |                           |
| swap_use               |                           |                           |
| swap_free              |                           |                           |
| load_1m                |                           |                           |
| load_5m                |                           |                           |
| load_15m               |                           |                           |
| network_in             | Interface, e.g., `eth0`   | yes                       |
| network_out            | Interface, e.g., `eth0`   | yes                       |
| throughput_network_in  | Interface, e.g., `eth0`   | yes                       |
| throughput_network_out | Interface, e.g., `eth0`   | yes                       |
| packets_in             | Interface, e.g., `eth0`   | yes                       |
| packets_out            | Interface, e.g., `eth0`   | yes                       |
| ipv4_address           | Interface, e.g., `eth0`   | yes                       |
| ipv6_address           | Interface, e.g., `eth0`   | yes                       |
| processor_use          |                           |                           |
| processor_temperature  |                           |                           |
| process                | Binary, e.g., `octave-cli` | yes                       |
| last_boot              |                           |                           |

## Disk usage

If no path is provided via the optional argument, the integration defaults to '/' (root).

**Note:** The disk usage sensors do not support monitoring folder/directory sizes. Instead, it is only concerned with "disks" (more specifically mount points on Linux).

```bash
$ df -H
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        29G   12G   16G  42% /
devtmpfs        805M     0  805M   0% /dev
tmpfs           934M     0  934M   0% /dev/shm
/dev/mmcblk0p1  253M   54M  199M  22% /boot
```

Defining a `disk_use` sensor for `/` and `/home/pi` is redundant and will return the same values, since they both belong to the same "disk". However, defining separate sensors for `/dev` and `/dev/shm` is possible and provides different values, since those are treated as separate "disks" by the integration.

## Processor temperature

- If no hardware sensor data is available (e.g., because the integration runs in a virtualized environment), the sensor entity will not be created.
- The unit of measurement (Celsius vs. Fahrenheit) will be chosen based on the system configuration.
- Only the very first processor related hardware sensor is read, i.e., no individual core temperatures (even if the hardware sensor could provide that level of detail).

## Linux specific

To retrieve all available network interfaces on a Linux System, execute the
`ifconfig` command.

```bash
ifconfig -a | sed 's/[ \t].*//;/^$/d'
```

## Windows specific

When running this platform on Microsoft Windows, Typically,
the default interface would be called `Local Area Connection`,
so your configuration might look like:

```yaml
sensor:
  - platform: systemmonitor
    resources:
      - type: network_in
        arg: "Local Area Connection"
```

If you need to use some other interface, open a command line prompt and type `ipconfig` to list all interface names. For example a wireless connection output from `ipconfig` might look like:

```bash
Wireless LAN adapter Wireless Network Connection:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :
```

Where the name is `Wireless Network Connection`.
