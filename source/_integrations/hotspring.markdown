---
title: Hot Spring
description: Instructions on how to integrate Hot Spring spas into Home Assistant.
ha_release: 2026.8
ha_category:
  - Water heater
ha_iot_class: Local Polling
ha_codeowners:
  - '@Moustachauve'
ha_domain: hotspring
ha_platforms:
  - water_heater
ha_integration_type: device
---

The **Hot Spring** {% term integration %} allows you to monitor and control your [Hot Spring](https://www.hotspring.com/) spa equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) module directly from Home Assistant.

## Supported devices

- Hot Spring Spas equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) local network module.

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
When setting up or reconfiguring the integration, ensure you enter the IP address of the **HNA (Home Network Adapter)** and **not** the IP address of the **SNA (Spa Network Adapter)**.
{% endnote %}

### Reconfiguration

If the IP address of your Hot Spring spa changes, you can reconfigure the integration by going to {% my integrations title="**Settings** > **Devices & services**" %}, selecting the **Hot Spring** integration, selecting {% icon "mdi:dots-vertical" %}, and then choosing **Reconfigure**.

## Supported functionality

The **Hot Spring** integration provides the following entities:

### Water heater

- **Water heater**
  - **Description**: Displays the current water temperature and allows setting the target water temperature.
  - **Temperature Range**: 80.0 °F to 104.0 °F
  - **Remarks**: Turning the water heater on or off is not supported by the integration.

## Data updates

The **Hot Spring** integration uses local {% term polling %} to fetch status updates directly from the spa module on your local network.

## Troubleshooting

### Cannot connect to Hot Spring spa

If Home Assistant cannot establish a connection to your Hot Spring spa:

1. Make sure your Hot Spring spa module is powered on and connected to your local network.
2. Verify that you are using the IP address of the **HNA (Home Network Adapter)** and not the **SNA (Spa Network Adapter)**.
3. Verify that you can locate the device on your local network router client list.
4. Double-check that the IP address or hostname entered is correct and reachable from your Home Assistant instance.
5. Try restarting the Hot Spring spa module and reloading the integration in Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
