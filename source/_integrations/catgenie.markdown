---
title: CatGenie
description: Instructions on how to integrate the CatGenie cat toilet into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kclif9'
ha_domain: catgenie
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
related:
  - url: https://www.catgenie.com/
    title: CatGenie
---

The **CatGenie** {% term integration %} is used to integrate with the devices of [CatGenie](https://www.catgenie.com/). CatGenie creates automatic cat toilets.
Use case: You can automatically trigger an exhaust fan when the CatGenie is running to remove any lingering odour.

## Supported devices

The following devices are known to be supported by the integration:

- CatGenie A.I.
- CatGenie Whoosh

## Unsupported devices

The following devices are not supported by the integration:

- CatGenie 120
- Appliances that do not support the CatGenie App

## Prerequisites

1. Your device must support the CatGenie App
2. Your device must be setup in the CatGenie App prior to setting up this integration

{% include integrations/config_flow.md %}

## Supported functionality

The **My integration** integration provides the following entities.

### Sensor

- **Clean progress**
  - **Description**: Provides the percentage through the current clean cycle.
  - **Available for machines**: all

- **Last clean**
  - **Description**: Advises when the last clean was performed.
  - **Available for machines**: all

- **Sani solution**
  - **Description**: Provides the number of remaining clean cycles in the Sani Solution cartridge.
  - **Available for machines**: all

- **Status**
  - **Description**: Provides the current status of the unit.
  - **Available for machines**: all

- **Total cycles**
  - **Description**: Provides the total number of clean cycles the unit has completed.
  - **Available for machines**: all

## Examples

You can utilise this integration to:

### Turn on an exhaust fan when the unit is running

You can automatically set a fan to run when the sensor 'status' is in the 'cleaning' mode, and turn off when the status is in the 'idle' mode.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}