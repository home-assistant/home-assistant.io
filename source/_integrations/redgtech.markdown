---
title: Redgtech
description: Integrate Redgtech smart devices with Home Assistant
ha_category:
  - Light
  - Switch
ha_release: 2025.1
ha_iot_class: cloud_polling
ha_domain: redgtech
ha_config_flow: true
ha_platforms:
  - light
  - switch
ha_quality_scale: bronze
ha_codeowners:
  - '@jonhsady'
  - '@luan-nvg'
---

The **Redgtech** integration allows you to control your Redgtech smart devices through Home Assistant. This integration provides seamless connectivity to your Redgtech ecosystem, enabling you to manage lights and switches from within your Home Assistant dashboard.

For more information about Redgtech, visit the [Redgtech website](https://redgtech.com.br/).

## Installation

The Redgtech integration is available in Home Assistant by default. No additional installation steps are required.

### Prerequisites

Before setting up the integration, ensure you have:

- A Redgtech account with active devices
- Your Redgtech devices connected to your network
- Internet connectivity for cloud communication

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address connected to your Redgtech account."
Password:
  description: "The account password."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the Redgtech app and remove the Home Assistant integration from there as well.

## Features

- **Smart Switch Control**: Turn your Redgtech switches on/off remotely
- **Smart Light Control**: Control brightness and on/off state of Redgtech lights
- **Real-time Status**: See the current state of your devices in real-time
- **Automation Support**: Use Redgtech devices in Home Assistant automations
- **Cloud Connectivity**: Access your devices from anywhere via Redgtech cloud

## Supported Devices

| Device Type | Models | Features |
|-------------|--------|----------|
| Smart Switch | X1, X2, X3 | On/Off control, Status monitoring |
| Smart Light | B1, B2, B3 | On/Off control, Brightness control |

## Troubleshooting

### Connection Issues

If you're experiencing connection issues:

1. Verify your internet connection
2. Check your Redgtech account credentials
3. Ensure your Redgtech devices are online in the Redgtech app
4. Restart Home Assistant if the issue persists

### Device Not Appearing

If your devices don't appear after setup:

1. Check that your devices are properly configured in the Redgtech app
2. Ensure your Redgtech account has access to the devices
3. Try removing and re-adding the integration

### Authentication Errors

If you receive authentication errors:

1. Verify your email and password are correct
2. Check if your Redgtech account is active
3. Try logging into the Redgtech app to confirm your credentials

For additional support, please contact [Redgtech support](mailto:contato.redgtech.dev@gmail.com) directly.
