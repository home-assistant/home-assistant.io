---
title: System Monitor
description: Instructions on how to monitor the Home Assistant host.
ha_category:
  - System Monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: systemmonitor
---

The `systemmonitor` sensor platform allows you to monitor disk usage,
memory usage, CPU usage, and running processes. This platform has superseded the
process integration which is now considered deprecated.

To add this platform to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
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

The table contains types and their argument to use in your `configuration.yaml`
file.

| Type (`type:`)         | Argument (`arg:`)         |
| :--------------------- |:--------------------------|
| disk_use_percent       | Path, e.g., `/`           |
| disk_use               | Path, e.g., `/`           |
| disk_free              | Path, e.g., `/`           |
| memory_use_percent     |                           |
| memory_use             |                           |
| memory_free            |                           |
| swap_use_percent       |                           |
| swap_use               |                           |
| swap_free              |                           |
| load_1m                |                           |
| load_5m                |                           |
| load_15m               |                           |
| network_in             | Interface, e.g., `eth0`   |
| network_out            | Interface, e.g., `eth0`   |
| throughput_network_in  | Interface, e.g., `eth0`   |
| throughput_network_out | Interface, e.g., `eth0`   |
| packets_in             | Interface, e.g., `eth0`   |
| packets_out            | Interface, e.g., `eth0`   |
| ipv4_address           | Interface, e.g., `eth0`   |
| ipv6_address           | Interface, e.g., `eth0`   |
| processor_use          |                           |
| process                | Binary, e.g., `octave-cli` |
| last_boot              |                           |

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
        arg: 'Local Area Connection'
```

If you need to use some other interface, open a command line prompt and type `ipconfig` to list all interface names. For example a wireless connection output from `ipconfig` might look like:

```bash
Wireless LAN adapter Wireless Network Connection:

   Media State . . . . . . . . . . . : Media disconnected
   Connection-specific DNS Suffix  . :
```

Where the name is `Wireless Network Connection`.
