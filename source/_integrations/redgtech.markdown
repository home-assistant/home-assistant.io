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

## Installation

The Redgtech integration is available in Home Assistant by default. No additional installation steps are required.

### Prerequisites

Before setting up the integration, ensure you have:

- A Redgtech account with active devices
- Your Redgtech devices connected to your network
- Internet connectivity for cloud communication

## Configuration

The Redgtech integration is configured through the Home Assistant user interface.

1. In Home Assistant, go to **Settings** > **Devices & Services**.
2. Click **Add Integration**.
3. Search for **Redgtech** and select it.
4. Enter your Redgtech account credentials (email and password).
5. Click **Submit**.

The integration will automatically discover and add your Redgtech devices.

## Removal

To remove the Redgtech integration:

1. Go to **Settings** > **Devices & Services**.
2. Find the **Redgtech** integration in the list.
3. Click on the integration.
4. Click the **Delete** button.
5. Confirm the removal when prompted.

**Note**: Removing the integration will also remove all associated devices and entities from Home Assistant. You can always re-add the integration later if needed.

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

For additional support, please refer to the [Redgtech support documentation](https://redgtech-dev.com/support) or contact Redgtech support directly.
