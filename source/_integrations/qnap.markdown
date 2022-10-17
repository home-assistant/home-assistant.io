---
title: QNAP
description: Instructions on how to integrate the QNAP sensor within Home Assistant.
ha_category:
  - System Monitor
ha_release: 2022.10
ha_iot_class: Local Polling
ha_domain: qnap
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The QNAP integration allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

## Configuration
{% include integrations/config_flow.md %}

## Integration Entities
The QNAP integration will add the following sensors:
- System: status, system temperature
- CPU: usage, temperature
- Memory: usage, free, used, total
- Volume: usage, used
- Folders: usage, used
- Drives: smart status, usage
- Network: bandwidth, status


### SSL and Self-signed certificates
If your QNAP device uses self-signed certificates, set the `verify_ssl` option to `false`. If you configured your device to accept SSL-only connections, please also check that you set `port` accordingly, or you might get an `SSL: WRONG_VERSION_NUMBER` error.

