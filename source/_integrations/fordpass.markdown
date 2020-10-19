---
title: FordPass
description: Instructions on how to integrate FordPass (Ford Vehicle) into Home Assistant.
ha_category:
  - Car  
  - Lock
ha_release: 0.117
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@clarkd'
ha_domain: fordpass
---

The `FordPass` integration offers integration with the [FordPass](https://www.ford.co.uk/owner/owner-services/fordpass) API/app and provides a lock entity allowing the vehicle to be locked/unlocked remotely.

This integration provides the following platforms:

- Lock - Lock/Unlock the doors of the vehicle

## Configuration

Home Assistant offers the FordPass integration through **Configuration** -> **Integrations** -> **Fordpass**.

Enter username, password and the VIN number of your vehicle and then continue.