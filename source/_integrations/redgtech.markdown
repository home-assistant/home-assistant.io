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

The **Redgtech** integration allows you to control your [Redgtech](https://redgtech.com.br/) smart devices through Home Assistant. This integration provides seamless connectivity to your Redgtech ecosystem, enabling you to manage lights and switches from within your Home Assistant dashboard.



## Prerequisites

- A Redgtech account with active devices.
- Your Redgtech devices connected to your network.
- Internet connectivity for cloud communication.

## Installation parameters

The Redgtech integration does not require any special installation parameters. The integration uses cloud-based communication and does not require:

- Local network configuration
- Port forwarding
- Static IP addresses
- Special firewall rules

All communication is handled through the Redgtech cloud service using standard HTTPS connections.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address connected to your Redgtech account."
Password:
  description: "The account password."
{% endconfiguration_basic %}


## Features

- **Smart switch control**: Turn your Redgtech switches on/off remotely.
- **Smart light control**: Control brightness and on/off state of Redgtech lights.
- **Real-time status**: See the current state of your devices in real time.
- **Automation support**: Use Redgtech devices in Home Assistant automations.
- **Cloud connectivity**: Access your devices from anywhere via Redgtech cloud.

## Supported devices

| Device Type | Models | Features |
|-------------|--------|----------|
| Smart Switch | X1, X2, X3 | On/Off control, Status monitoring |
| Smart Light | B1, B2, B3 | On/Off control, Brightness control |

## Data updates

The Redgtech integration uses a polling-based approach to keep device data synchronized:

- **Update interval**: Device states are updated every 60 seconds.
- **Authentication**: The integration automatically handles token renewal when needed.
- **Error handling**: If authentication fails, the integration will trigger a reauthentication flow.
- **Retry logic**: Temporary connection issues are handled with automatic retries.
- **Real-time control**: Device commands (on/off, brightness) are sent immediately without waiting for the next update cycle.

### Data flow

1. **Initial setup**: When you first configure the integration, it authenticates with the Redgtech API.
2. **Token management**: The integration stores an access token and automatically renews it when needed.
3. **Device discovery**: All available devices are fetched from your Redgtech account.
4. **Periodic updates**: Every 60 seconds, the integration polls the API for the latest device states.
5. **Command execution**: When you control a device, the command is sent immediately to the API.
6. **State synchronization**: Device states are updated in Home Assistant to reflect the current status.

## Automation examples

Here are some automation examples you can use with your Redgtech devices:

### Turn on lights when motion is detected

```yaml
automation:
  - alias: "Turn on Redgtech lights on motion"
    trigger:
      platform: motion
      entity_id: binary_sensor.motion_sensor
    action:
      service: light.turn_on
      target:
        entity_id: light.redgtech_bedroom_light
```

### Turn off all Redgtech switches when leaving home

```yaml
automation:
  - alias: "Turn off Redgtech switches when leaving"
    trigger:
      platform: state
      entity_id: person.your_name
      to: "not_home"
    action:
      service: switch.turn_off
      target:
        entity_id: switch.redgtech_*
```

### Schedule Redgtech devices

```yaml
automation:
  - alias: "Morning routine - Turn on bedroom light"
    trigger:
      platform: time
      at: "07:00:00"
    condition:
      condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
    action:
      service: light.turn_on
      target:
        entity_id: light.redgtech_bedroom_light
      data:
        brightness: 255
```

## Use cases

### Smart home automation
- **Morning routine**: Automatically turn on bedroom lights when your alarm goes off.
- **Evening routine**: Gradually dim lights as bedtime approaches.
- **Away mode**: Turn off all Redgtech devices when you leave home.
- **Security**: Turn on lights when motion is detected in specific areas.

### Energy management
- **Scheduled control**: Set timers to automatically turn off devices after a certain period.
- **Occupancy-based control**: Turn devices on/off based on room occupancy.
- **Sunset/sunrise**: Sync device behavior with natural light patterns.

### Convenience
- **Voice control**: Use voice assistants to control Redgtech devices.
- **Remote access**: Control devices from anywhere using the Home Assistant mobile app.
- **Scene control**: Create scenes that control multiple Redgtech devices simultaneously.

## Known limitations

- **Cloud dependency**: The integration requires internet connectivity to function.
- **Polling interval**: Device states are updated every 60 seconds, not in real time.
- **Single account**: Each integration instance can only connect to one Redgtech account.
- **No local control**: Devices cannot be controlled locally without internet connection.
- **API rate limits**: The Redgtech API has rate limits that may affect frequent updates.

## Troubleshooting

### Connection issues

If you're experiencing connection issues:

1. Verify your internet connection.
2. Check your Redgtech account credentials.
3. Ensure your Redgtech devices are online in the Redgtech app.
4. Restart Home Assistant if the issue persists.

### Device not appearing

If your devices don't appear after setup:

1. Check that your devices are properly configured in the Redgtech app.
2. Ensure your Redgtech account has access to the devices.
3. Try removing and re-adding the integration.

### Authentication errors

If you receive authentication errors:

1. Verify your email and password are correct.
2. Check if your Redgtech account is active.
3. Try logging into the Redgtech app to confirm your credentials.

For additional support, please contact [Redgtech support](mailto:contato.redgtech.dev@gmail.com) directly.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the Redgtech app and remove the Home Assistant integration from there as well.
