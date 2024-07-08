---
title: QNAP
description: Instructions on how to integrate the QNAP sensor within Home Assistant.
ha_category:
  - System monitor
ha_release: 0.38
ha_iot_class: Local Polling
ha_domain: qnap
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@disforw'
---

The QNAP integration allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

{% include integrations/config_flow.md %}

## Integration entities

The QNAP integration will add the following sensors:
- System: status, system temperature
- CPU: usage, temperature
- Memory: usage, free, used, total
- Volume: usage, used
- Folders: usage, used
- Drives: smart status, usage
- Network: bandwidth, status

### QNAP device support

This integration works with most (but not all) QNAP devices. A complete, up-to-date [list of compatible devices can be found here](https://github.com/colinodell/python-qnapstats#device-support).

If your QNAP device is running QTS 5, make sure you log into the device's web interface (with the same account you've configured in Home Assistant) and complete any agreements, warnings, wizards, setup, etc. as the QNAP API may block requests until those are completed.
