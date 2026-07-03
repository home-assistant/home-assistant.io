---
title: Linksys Smart Wi-Fi
description: Instructions on how to integrate Linksys Smart Wi-Fi Router into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.48
ha_codeowners:
  - '@jmalcic'
ha_domain: linksys_smart
ha_config_flow: true
ha_platforms:
  - device_tracker
ha_integration_type: hub
---

The **Linksys Smart Wi-Fi** {% term integration %} tracks devices connected to a Linksys Smart Wi-Fi router, so you can use device presence in your automations and dashboards.

## Prerequisites

For certain devices, before adding this integration, you may need to disable the **Access via wireless** option in the **Local Management Access** section of your router's administration page. If this option is not disabled, the integration may not authenticate correctly because the router expects only a password, but the integration sends both a username and a password. Not all devices require this option to be disabled.

## Supported devices

The following routers are known to work with this integration:

- Linksys WRT3200ACM MU-MIMO Gigabit Wi-Fi Wireless Router
- Linksys WRT1900ACS Dual-band Wi-Fi Router
- Linksys EA6900 AC1900 Dual-Band Wi-Fi Router
- Linksys EA8300 Max-Stream AC2200 Tri-Band Wi-Fi Router
- Linksys Velop MX4200

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Linksys router, for example `192.168.1.1`. If your router was discovered automatically, this is pre-filled."
Username:
  description: "The admin username for your Linksys router. This field is optional on many router models where it defaults to `admin`."
Password:
  description: "The admin password for your Linksys router."
{% endconfiguration_basic %}

## Supported functionality

### Device tracker entities

The integration creates a {% term "device tracker" %} {% term entity %} for each device that has been seen connected to your router. Each entity reflects whether the device is currently connected and provides the following attributes:

- **IP address**: The current IP address of the device
- **Hostname**: The hostname of the device as reported by the router

You can link these entities to people in Home Assistant to track presence at home. See the [device tracker integration page](/integrations/device_tracker/) for instructions.

## Data updates

The integration polls your Linksys router every 30 seconds for the list of connected devices.

## Troubleshooting

### Cannot connect to the router

Make sure Home Assistant can reach your router on the network. Try opening your router's admin page (for example, `http://192.168.1.1`) in a browser from the same network segment as Home Assistant.

### Invalid credentials

If Home Assistant reports an authentication error, verify your router admin password in the router's administration page. If your credentials have changed, remove the integration and add it again with the updated password.

### Authentication fails even with the correct password

If the integration cannot authenticate even after entering the correct password, check that the **Access via wireless** option is disabled in the **Local Management Access** section of your router's administration page. See [Prerequisites](#prerequisites) for details.

## Removing the integration

{% include integrations/remove_device_service.md %}
