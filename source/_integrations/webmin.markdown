---
title: Webmin
description: Instructions on how to set up Webmin with Home Assistant.
ha_category:
  - System monitor
ha_release: 2024.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: webmin
ha_integration_type: device
ha_platforms:
  - diagnostics
  - sensor
---

[Webmin](https://webmin.com) is a web-based interface for the system administration of Unix-like servers.

This {% term integration %} provides sensors for monitoring the CPU and memory usage of your server.

## Prerequisites

For best security, create a specific Webmin user for Home Assistant with a strong password and only "Can accept RPC calls" permission (under "Permissions for all modules") and remove the "Can accept RPC calls" permission for all other users.

{% note %}
Be aware that the Webmin API ignores any 2FA set up via the frontend, e.g. it is even with enabled 2FA possible to use the API with only username and password.
{% endnote %}

{% include integrations/config_flow.md %}

## Sensors

**All entities are disabled by default, you need to enable the entities that you wish to use.**

Following sensors will be added:

- Load (1m)
- Load (5m)
- Load (15m)
- Memory total
- Memory free
- Swap total
- Swap free
- Total space for all disks
- Free space for all disks
- Used space for all disks
- For each filesystem mountpoint:
  - Used space
  - Free space
  - Total space
  - Used inodes
  - Free inodes
  - Total inodes
  - Disk usage in percent
  - Inode usage in percent
