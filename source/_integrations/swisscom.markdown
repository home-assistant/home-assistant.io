---
title: Swisscom Internet-Box
description: Instructions on how to integrate the Swisscom Internet-Box into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.32
ha_domain: swisscom
ha_iot_class: Local Polling
ha_config_flow: true
ha_platforms:
  - device_tracker
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
---

The **Swisscom Internet-Box** {% term integration %} offers presence detection by looking at the devices connected to your [Internet-Box](https://www.swisscom.ch/en/residential/help/device/internet-router.html) router. The Internet-Box is the router provided by [Swisscom](https://www.swisscom.ch), an Internet provider in Switzerland.

With this integration, you can use the presence of phones, tablets, and other devices on your home network to trigger automations. For example, you can turn the lights off when everyone leaves home, or send a notification when someone arrives.

## Supported devices

The following Internet-Box models are supported:

- Internet-Box light
- Internet-Box standard
- Internet-Box plus

All models share the same web interface, so they work the same way with this integration.

## Prerequisites

To set up the integration, you need the following:

- The IP address of your Internet-Box. By default, this is `192.168.1.1`.
- The administrator username. By default, this is `admin`.
- The administrator password for your Internet-Box. This is the password you use to sign in to the router's web interface.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your Internet-Box. By default, this is `192.168.1.1`."
Username:
  description: "The administrator username for your Internet-Box. By default, this is `admin`."
Password:
  description: "The administrator password for your Internet-Box. This is the password you use to sign in to the router's web interface."
{% endconfiguration_basic %}

## Migrating from YAML configuration

If you previously configured the Swisscom Internet-Box through `configuration.yaml`:

1. Set up the integration through the UI to provide your administrator credentials.
2. Remove the `device_tracker` Swisscom entry from your `configuration.yaml` file.
3. Restart Home Assistant.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} will guide you through the same steps.

## Supported functionality

The integration creates a {% term "device tracker" %} entity for each device known to your Internet-Box. Each entity reports whether the device is currently connected to your network, along with the following attributes:

- Hostname
- IP address
- MAC address

You can use these entities to track the presence of people in your home. For more information on how to assign tracked devices to people, see the [device tracker integration page](/integrations/device_tracker/).

## Data updates

Home Assistant {% term polling polls %} your Internet-Box every 30 seconds to retrieve the list of connected devices and update their connection status.

## Troubleshooting

If the setup fails or the integration stops working, check the following:

- Make sure the IP address of your Internet-Box is correct and reachable from Home Assistant.
- Make sure the administrator password is correct. The integration signs in to your Internet-Box to read the list of connected devices, so it needs valid administrator credentials.

{% include integrations/remove_device_service.md %}
