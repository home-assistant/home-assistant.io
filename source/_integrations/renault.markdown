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

You need two API keys: one for Gigya and one for Kamereon and they shouldn't be confused with your API credentials. Instructions can be found at [https://github.com/jamesremuscat/pyze#obtaining-api-keys]

After entering the API keys and selecting the locale, you should be able to enter your username and password, and finally select the correct Kameron account id.

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.
