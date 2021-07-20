---
title: QNAP
description: Instructions on how to integrate the QNAP sensor within Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.38
ha_iot_class: Local Polling
ha_codeowners:
  - '@colinodell'
  - '@cyr-ius'
ha_domain: qnap
ha_platforms:
  - sensor
---

This `qnap` sensor allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

{% include integrations/config_flow.md %}

## Integration Entities

The QNAP integration will add the following sensors.

Sensors:
- system: status, system temperature
- cpu : usage, temperature
- memory : usage, free, used, total
- volume : usage, used
- folders : usage, used
- drives: smart status, usage
- networks uplink : bandwidth, status

### SSL and Self-signed certificates

If your QNAP device uses self-signed certificates, set the `verify_ssl` option to `false`. If you configured your device to accept SSL-only connections, please also check that you set `port` accordingly, or you might get an `SSL: WRONG_VERSION_NUMBER` error.

### QNAP device support

This integration works with most (but not all) QNAP devices. A complete, up-to-date [list of compatible devices can be found here](https://github.com/colinodell/python-qnapstats#device-support).
