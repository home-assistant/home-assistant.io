---
title: Tilt Pi
description: Instructions on how to configure a Tilt Pi.
ha_category:
  - Sensor
ha_release: '2025.7'
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@michaelheyman'
ha_domain: tilt_pi
ha_platforms:
  - sensor
related:
  - url: https://tilthydrometer.com/collections/tilt-pi
    title: Tilt Pi product page
ha_integration_type: integration
---

The **Tilt Pi** {% term integration %} allows you to connect a Tilt Pi to Home Assistant to
automatically discover Tilt Hydrometer devices.

The Tilt Pi is a Raspberry Pi-based device that can read data from Tilt
Hydrometers and broadcast it over the network. The Tilt Pi can be used to
monitor the fermentation of beer, wine, cider, and other beverages.

The benefit of the Tilt Pi is that it can be placed in a location with better
reception than the Tilt Hydrometer itself, allowing for more reliable data
collection.

{% note %}
For instances where you only have a Tilt Hydrometer and not a Tilt Pi, consider
using the [Tilt Hydrometer integration](/integrations/tilt_ble).
{% endnote %}

## Prerequisites

1. Have a Raspberry Pi with the Tilt Pi software installed.
2. Have a Tilt Hydrometer in range of the Tilt Pi.
3. Have the IP address or hostname of the Tilt Pi.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Host:
    description: "The hostname or IP address of the Tilt Pi."
Port:
    description: "The port of the Tilt Pi. The default port is 1880."
{% endconfiguration_basic %}

## Supported functionality

### Entities

After adding the integration, you can add the Tilt Pi device to your Home
Assistant. If the Tilt Pi was found and there are Tilt Hydrometers in its range,
then entities will be created for each Tilt Hydrometer.

You may then use these entities in automations, scripts, dashboards, and other
integrations.

#### Sensors

- **Tilt Hydrometer temperature**
  - **Description**: Current temperature of the Tilt Hydrometer.
  - **Entity name**: `tilt_<tilt-pi-color>_temperature`

- **Tilt Hydrometer gravity**
  - **Description**: Current specific gravity of the Tilt Hydrometer.
  - **Entity name**: `tilt_<tilt-pi-color>_gravity`

## Data updates

The Tilt Pi integration {% term polling polls %} the Tilt Pi for data every 60 seconds. This
interval is currently not configurable.

## Supported devices

The following devices are known to be supported by the integration:

- [Tilt™ Pi v2 Bookworm May24](https://tilthydrometer.com/collections/tilt-pi/products/tilt-pi-v2-bookworm-may24-raspberry-pi-sd-card-image-download)

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
