---
title: APsystems
description: Control and monitor your APsystems EZ1 microinverters locally without the cloud
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2024.6
ha_category:
  - Energy
ha_domain: apsystems
ha_platforms:
  - number
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@mawoka-myblock'
  - '@SonnenladenGmbH'
---

The **APsystems** {% term integration %} allows you to read the data from your [APsystems EZ1](https://emea.apsystems.com/diy/ez1/) microinverter. It also allows you to set the output limit to any number between 30 and 800 watts.
The following data is provided by the integration:

- Lifetime production (Per input and in total)
- Current production (Per input and in total)
- Today's production (Per input and in total)

The following data can be set by the integration:

- Maximal output in watts

## Prerequisites

Make sure the local API is activated and set to **Continuously**. For that, connect to the inverter via Bluetooth using the app and go to **Settings** > **Local Mode**, set the switch **Enable Local Mode** to on and make sure to set this to **Continuously**.

{% include integrations/config_flow.md %}
