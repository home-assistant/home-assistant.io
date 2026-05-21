---
title: Electrolux
description: Instructions on how to set up the Electrolux official integration within Home Assistant.
ha_release: 2026.6
ha_iot_class: Cloud Push
ha_codeowners:
  - '@electrolux-oss'
ha_domain: electrolux
ha_integration_type: hub
ha_config_flow: true
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://developer.electrolux.one/documentation
    title: Electrolux Group for Developers documentation
---

The **Electrolux** {% term integrations %} lets you connect and control your home appliances via the [official third-party API](https://developer.electrolux.one).

[Electrolux Group](https://www.electroluxgroup.com/) is a global appliance manufacturer that designs and produces solutions for taste, care, and wellbeing experiences. The company develops and sells products under several consumer brands, including **Electrolux**, **AEG**, and **Frigidaire**.

## Use cases

- Monitor multiple sensors of Electrolux Group appliances and trigger automations based on sensor data.
- Track the status of the appliances.

{% note %}
Note that feature availability may vary depending on the appliance model.
{% endnote %}

## Supported devices

The integration supports the following appliance types:

- **Oven**

## Prerequisites

1. Log in to the [Electrolux Group for Developers](https://developer.electrolux.one/login) site using the same account you use in the Electrolux Group mobile apps.
2. Navigate to the **Dashboard**.
3. Create a new **API key**.
4. Generate the **Access Token** and **Refresh Token**.

Once these credentials are obtained, you can use them to configure the Electrolux integration in Home Assistant.

{% include integrations/config_flow.md %}

Enter the following:
{% configuration_basic %}
API key:
    description: "Your developer API key from Electrolux Group for Developers."
Access Token:
    description: "The access token provided by Electrolux Group for Developers to access your devices."
Refresh Token:
    description: "The refresh token used to renew your access token."
{% endconfiguration_basic %}

## Supported functionality

The **Electrolux** integration provides the following entities.

{% note %}
Entity availability depends on the appliance type and model. Some entities may not be supported by certain appliances and could appear as unavailable or not appear at all.
{% endnote %}

### Sensors

{% details "List of sensors" %}

- **Appliance state**
  - **Description**: Reports the current appliance state.
  - **Available for appliance types**: Oven.
- **Current temperature**
  - **Description**: Reports the current cavity temperature.
  - **Available for appliance types**: Oven.
- **Food probe state**
  - **Description**: Reports the food probe state.
  - **Available for appliance types**: Oven.
- **Food probe temperature**
  - **Description**:  Reports food probe temperature.
  - **Available for appliance types**: Oven.
- **Remote control**
  - **Description**: Reports the remote control status.
  - **Available for appliance types**: Oven.

{% enddetails %}

## Known limitations

- The Electrolux Group third-party API does not provide full parity with the mobile app. Some options, or settings available in the app may be unavailable or limited when from Home Assistant.

## Removing the integration

{% include integrations/remove_device_service.md %}
