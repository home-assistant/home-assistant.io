---
title: Tami4 Edge / Edge+
description: Tami4 Edge Integration
ha_release: 2023.11
ha_category:
  - Button
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Guy293'
ha_domain: tami4
ha_platforms:
  - button
  - sensor
ha_integration_type: integration
---

The **Tami4 Edge** {% term integration %} allows you to control and monitor [Tami4 Edge / Edge+ by Strauss](https://www.tami4.co.il/tami4edge-collection) devices in Home Assistant.

You can boil water and get filter / UV information, such as when you need to replace them.
Also, all of your personal drinks will be available as buttons for you to use.

You can easily pair your device by confirming your phone number which is registered with your Edge app account.

## Prerequisites

- Strauss'es Tami4 Edge / Edge+ device
- Tami4 Edge account and app
- Have your phone number registered with your Edge app account

{% include integrations/config_flow.md %}

## Entities

The Tami4 Edge integration provides the following entities.

### Buttons

- **Boil water**: Select this button to start boiling the water.
- **Prepare drink**: Select this button to start preparing the drink. There's a button for each predefined drink.

### Sensors

**UV upcoming replacement**: Date when the UV lamp needs to be replaced.
**UV installed**: Date when the UV lamp was installed.
**Filter upcoming replacement**: Date when the filter needs to be replaced.
**Filter installed**: Date when the filter was installed.
**Filter water passed**: Amount of water (in liters) that has been filtered with the currently installed filter.
