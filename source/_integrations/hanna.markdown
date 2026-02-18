---
title: Hanna
description: Instructions on how to integrate HannaCloud within Home Assistant.
ha_release: 2025.12
ha_category:
  - Sensor
ha_codeowners:
  - '@bestycame'
ha_quality_scale: bronze
ha_domain: hanna
ha_integration_type: hub
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_platforms:
  - sensor
---

The **Hanna** {% term integration %} fetches data from your [Hanna Pool Controller](https://www.hannainstruments.be/en/Applicatons-measure-analyze/swimming-pool/ph-chlorine-control/systems/) device, by connecting to your [HannaCloud](https://www.hannacloud.com) account.

## Supported devices

The following devices are known to be supported by the integration:
-  Hanna Instruments BL122
-  Hanna Instruments BL132

## Prerequisites

Before you can add the Hanna integration, you need:

- A [HannaCloud](https://www.hannacloud.com) account.
- Your HannaCloud login credentials (email and password).
- A Hanna Pool Controller device that is connected to your HannaCloud account.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
email:
  description: The email address of your HannaCloud account.
password:
  description: The password associated with your HannaCloud account
{% endconfiguration_basic %}

## Data updates

The integration will update its sensors by {% term polling %} the HannaCloud account for new values. 


## Supported functionality

### Entities

The Hanna integration provides the following entities.

#### Sensors
- **Chlorine flow rate**: Monitors chlorine dosing rate
- **Chlorine ORP value**: Measures oxidation-reduction potential with calibration data as attributes
- **pH Acid/base flow rate**: Monitors acid/base chemical dosing rate
- **pH value**: Measures pH level with calibration data as attributes
- **Air temperature**: Air temperature reported by the device
- **Water temperature**: Water temperature reported by the device


## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
