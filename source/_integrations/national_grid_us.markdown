---
title: National Grid US
description: Monitor energy usage and costs from your National Grid US account
ha_category:
  - Energy
  - Sensor
ha_release: 2023.8
ha_domain: national_grid_us
ha_integration_type: integration
ha_codeowners:
  - '@masterkoppa'
  - '@virtitnerd'
ha_config_flow: true
ha_platforms:
  - sensor
ha_iot_class: Cloud Polling
---

The **National Grid US** {% term integration %} lets you monitor your energy usage and costs from your [National Grid](https://www.nationalgridus.com/) account directly in Home Assistant. It supports both gas and electric meters, and you can connect multiple accounts if needed.

## Migrating from the Opower-based integration

This integration replaces the previous National Grid US integration that was powered by Opower. If you had the old integration set up, Home Assistant will create a repair issue prompting you to remove the existing integration entry and set it up again using the new integration. Follow the steps in the repair issue to complete the migration.

## Supported meters

The integration supports the following meter types:

- Electric meters
- Gas meters

If your National Grid account has multiple meters, the integration creates sensors for each one.

## Prerequisites

Before setting up the integration, make sure you have:

- An active [National Grid US](https://www.nationalgridus.com/) online account.
- Access to your National Grid account credentials (username and password).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The username for your National Grid US online account."
Password:
  description: "The password for your National Grid US online account."
{% endconfiguration_basic %}

You can add the integration multiple times if you have more than one National Grid account.

## Supported functionality

### Sensors

The integration provides the following sensors for each meter on your account.

Each meter provides the following sensors:

- **Latest daily usage**: The most recent daily usage reading for the meter, in kilowatt-hours for electric meters and therms for gas meters.
- **Last billing cost**: The cost from the most recent billing record for the account.

## Data updates

The **National Grid US** integration {% term polling polls %} data from the National Grid cloud service. Usage and cost data may be delayed by up to a few days, depending on when National Grid processes your meter readings.

## Known limitations

- The usage sensor reports the most recent daily reading, not a billing-period or monthly total. Historical and forecasted usage are not yet supported.
- Cost is reported per account, not per meter. When an account has multiple meters of the same fuel, those meters share the same cost figure, because the National Grid API only exposes cost at the account level.
- Only meters that are AMI smart meters report usage; other meters expose the sensor without a value.
- Data from National Grid may be delayed by up to a few days.

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
