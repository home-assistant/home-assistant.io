---
title: Wolflink
description: Instructions on how to integrate Wolf Smart-Set cloud within Home Assistant.
ha_category:
  - Heating
ha_release: 0.109
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@adamkrol93'
ha_domain: wolflink
---

The `wolflink` integration uses the [Wolf Smart-Set](https://www.wolf-smartset.com/) web service as a source to fetch you heating system status.

Currently integration is able to collect informations such as temperature, pressure heateing state. 

Remember that to integrate your heating device with Home Assistant you need to have WOLF LinkHome device connected to your heating device.

Currently integration fetch all data based on parameters which are exposed for your heating device.

### Tested devices
This integration was tested with Wolf Link Home Pro connected to FGB-28 device.

## Configuration

To add WolfLink to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **WOLF SmartSet**.