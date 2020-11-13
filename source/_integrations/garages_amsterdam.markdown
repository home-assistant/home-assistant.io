---
title: Garages Amsterdam
description: Instructions on how to integrate Garages Amsterdam within Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_release: 0.119
ha_codeowners:
  - '@klaasnicolaas'
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: garages_amsterdam
---

The `garages_amsterdam` integration uses an API provided by the municipality of Amsterdam, to measure the occupancy of Amsterdam parking garages in the Netherlands.

## Configuration

To add **Garages Amsterdam** to your installation, go to **Configuration** -> **Integrations** in the UI, click on the button with `+ Add Integration` sign and from the list of integrations search for **Garages Amsterdam**. After this you will get a list of parking garages in Amsterdam that you can monitor. If you want to include multiple garages in your config, you repeat this process.

### Sensor

When you add a parking garage, 4 sensors are created in your configuration by default:

- **Free space long** - Number of free parking spaces for cardholders or reserved spaces
- **Free space short** - Number of free parking spaces for regular paid parking
- **Long capacity** - Total of parking spaces for cardholders or reserved spaces
- **Short capacity** - Total of parking spaces for regular paid parking

<div class='note warning'>

  Some parking garages don't keep long-term parking data, in which case the 2 specific **Long** sensors will be disabled by default.

</div>

### Binary Sensor

Each parking garage also has a binary sensor, which indicates whether there are problems in the data provision from the API. When it indicates `ok` everything is fine. If the state changes to `problem`, the data is no longer up to date and the sensors will not be updated anymore.