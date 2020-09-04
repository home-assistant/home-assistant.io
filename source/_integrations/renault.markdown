---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 0.115
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners: '@epenet'
ha_domain: renault
---

The `Renault` integration offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Sensors - such as battery level, outside temperature, odometer, estimated range, and charging rate.

## Configuration

Home Assistant offers the Renault integration through **Configuration** -> **Integrations** -> **Renault**.

Enter username, password, select locale and Kameron account id and then continue.

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.
