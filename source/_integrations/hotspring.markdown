---
title: Hot Spring
description: Instructions on how to integrate Hot Spring spas into Home Assistant.
ha_release: 2026.8
ha_category:
  - Number
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Moustachauve'
ha_domain: hotspring
ha_platforms:
  - number
ha_integration_type: device
---

The **Hot Spring** {% term integration %} allows you to monitor and control your [Hot Spring](https://www.hotspring.com/) spa equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) module directly from Home Assistant.

## Supported devices

- Hot Spring spas equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) local network module.

## Prerequisites

1. Install and set up the **HotSpring Connected Spa Kit 2** on your spa following the manufacturer's quick start guide.
2. Use the official **HotSpring Connected Spa** app to connect the spa module to your home Wi-Fi or local network.
3. Verify that your Home Assistant instance and the Hot Spring spa module are on the same local network subnet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Hot Spring HNA (Home Network Adapter) on your local network (for example, `192.168.1.150`)."
{% endconfiguration_basic %}

{% note %}
When setting up or reconfiguring the integration, ensure you enter the IP address of the **HNA** (Home Network Adapter) and _not_ the IP address of the **SNA** (Spa Network Adapter).
{% endnote %}

### Reconfiguration

If the IP address of your Hot Spring spa changes, reconfigure the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Hot Spring** integration.
3. Select **Menu** {% icon "mdi:dots-vertical" %} > **Reconfigure**.

## Supported functionality

The **Hot Spring** integration provides the following entities:

### Number

- **Target temperature**
  - **Description**: Allows setting the target water temperature for the spa.
  - **Range**: 80 °F to 104 °F

## Data updates

The **Hot Spring** integration uses local {% term polling %} to fetch status updates directly from the spa module on your local network.

## Troubleshooting

### Cannot connect to Hot Spring spa

If Home Assistant cannot establish a connection to your Hot Spring spa:

- Make sure your Hot Spring spa module is powered on and connected to your local network.
- Verify that you are using the IP address of the **HNA (Home Network Adapter)** and not the **SNA (Spa Network Adapter)**.
- Verify that you can locate the device on your local network router client list.
- Double-check that the IP address or hostname entered is correct and reachable from your Home Assistant instance.
- Restart the Hot Spring spa module and reload the integration in Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
