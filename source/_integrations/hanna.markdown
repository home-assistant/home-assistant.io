---
title: Hanna
description: Instructions on how to integrate HannaCloud within Home Assistant.
ha_release: 2025.7
ha_category:
  - Sensor
ha_codeowners:
  - '@bestycame'
ha_quality_scale: bronze
ha_domain: hanna
ha_integration_type: device
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_zeroconf: false
ha_platforms:
  - sensor
---

The **Hanna** {% term integration %} fetches data from your [Hanna Pool Controller](https://www.hannainstruments.be/en/Applicatons-measure-analyze/swimming-pool/ph-chlorine-control/systems/) device, by connecting to your [HannaCloud](https://www.hannacloud.com) account.

## Prerequisites

Before you can add the Hanna integration, you need:

- A [HannaCloud](https://www.hannacloud.com) account.
- Your HannaCloud login credentials (email and password).
- A Hanna Pool Controller device that is connected to your HannaCloud account.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
email:
  description: The email address of your [HannaCloud](https://www.hannacloud.com) account.
password:
  description: The password assiciated with your [HannaCloud](https://www.hannacloud.com) account
{% endconfiguration_basic %}

## Data updates

The integration will update its sensors by {% term polling %} the [HannaCloud](https://www.hannacloud.com) account every 5 seconds for new values. 


## Available sensors

The following sensors are supported:

- **Air temperature**: Air temperature reported by the device
- **Alarms**: Binary sensor with alarm and warning details as attributes
- **Chlorine flow rate**: Monitors chlorine dosing rate
- **Chlorine ORP value**: Measures oxidation-reduction potential with calibration data as attributes
- **Chlorine pump status**: Indicates if the pump is running or not
- **pH Acid/base flow rate**: Monitors acid/base (pH-) chemical dosing rate
- **pH Pump status**: Indicates if the pump is running or not
- **pH value**: Measures pH level with calibration data as attributes
- **Service status**: Reports the condition of the device's service light
- **System status**: Reports the overall system status
- **Water temperature**: Water temperature reported by the device

All sensors include a `last_updated` attribute with the timestamp of the last data update.

## Troubleshooting

There are no commonly known issues with this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
