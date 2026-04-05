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

The **QNAP** {% term integration %} allows getting various statistics from your [QNAP NAS](https://www.qnap.com/en-us/).

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


In the case of QTS 5, the QNAP account that is being used by Home Assistant needs the following:
- Make sure you log into the device's web interface and complete any agreements, warnings, wizards, or setup steps, as the QNAP API may block requests until those are completed.
- The QNAP account must have access to System Monitoring. This can be achieved either by being an administrator or by having an administrator assign System Monitoring privileges (within QTS: ControlPanel > Privilege > Delegated Administration > System Monitoring).
