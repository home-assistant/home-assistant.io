---
title: zimi
description: Access and control your Zimi Cloud Controller and its connected Zimi-based devices.
featured: false
ha_iot_class: Local Push
ha_release: 2025.6
ha_codeowners:
  - '@markhannon'
ha_category:
  - Cover
  - Fan
  - Light
  - Sensor
  - Switch
ha_domain: zimi
ha_platforms:
  - cover
  - fan
  - light
  - sensor
  - switch
ha_config_flow: true
quality_scale: bronze
integration_type: hub
related:
  - url: https://zimi.life/
ha_quality_scale: bronze
ha_integration_type: integration
---

The **Zimi Cloud Controller** {% term integration %} allows you to connect your Zimi Cloud Controller to Home Assistant and, via this integration, control local devices connected to the Zimi mesh.

For a detailed description of the Zimi portfolio, refer to the [Zimi's website](https://zimi.life/).

## Supported devices

This integration supports the following Zimi devices:

- Zimi Cloud Connect ([links to specifications](https://zimi.life/product/cloud-connect/))

## Unsupported devices

The following Zimi devices are yet to be supported:

- Zimi Matter Connect ([links to specifications](https://zimi.life/product/matter-connect/))

## Prerequisites

A configured Zimi Cloud Connect and internet connection is needed for this integration to work.

1. Open the app store and install the Zimi app.
2. Open the Zimi app and configure a Zimi network by adding and naming all Zimi devices.
3. Open the Zimi app and configure a Zimi Cloud Connect device.
4. Take a note of the Zimi Cloud Connect IP address and MAC address.
5. Configure the Zimi integration using standard configuration flow.

{% include integrations/config_flow.md %}

You will be prompted to configure the Zimi Cloud Connect through the Home Assistant interface.

If the Zimi discovery process is successful and there is a single Zimi Cloud Connect, then the integration will be configured without further user input.

If the Zimi discovery process is successful and there are multiple Zimi Cloud Connects present, then you will be prompted to select the desired Zimi Cloud Connect.

If the Zimi discovery process is unsuccessful (that is, if the Zimi Cloud Connect is not reachable on the local LAN), then you will be prompted for the following parameters:

{% configuration_basic %}
host:
  description: "The IP address of your Zimi Cloud Connect. You can find it via your router admin interface."
port:
  description: "The port number used to connect to your Zimi Cloud Connect. If no port number is entered, the integration will use the default port. (The default port will be correct in almost all deployment scenarios)"
{% endconfiguration_basic %}

It is possible to add multiple Zimi Cloud Connect devices.

## Supported functionality

The integration will support all Zimi devices. Note that the naming conventions and default integration types may not be what you expect.

1. Zimi devices that are generic switches will be shown in the UI as a switch and not as a light. The **Identify as light for voice control** is not available in the API to pass the necessary information to HA to correctly classify. For more details on the concept and how to change your device to the correct type after the initial integration, see [Change device type of a switch](/integrations/switch_as_x/).
2. Zimi devices and names will be mapped per HA guidelines in the table below. The user may change these names to more friendly names - see [Customizing entities](/docs/configuration/customizing-devices/).

When you add a supported device, the following entities will be created:

| Zimi product                    | HA device name | HA entities         | HA default friendly name                                         |
|---------------------------------|----------------|---------------------|------------------------------------------------------------------|
| Blind Controller                | Cover          | 1xCover             | Cover {Name}                                                     |
| Fan and Light Controller        | Fan            | 1xFan<br>1xSwitch   | Fan {Name}<br>Fan {Name}                                         |
| Garage Door Controller          | Cover          | 1xCover<br>2xSensor | Garage {Name}<br>Garage {Temperature}<br>Garage {Humidity}       |
| Light Dimmer Switch             | Light          | 1xLight             | Light {Name}                                                     |
| Multi Dimmer Switch (2 button)  | Light          | 1xLight             | Light {Name}                                                     |
| Multi Dimmer Switch (4 button)  | Light          | 2xLight             | Light {Name}<br>Light {Name}                                     |
| Multi-Purpose Switch (1 button) | Switch         | 1xSwitch            | Switch {Name}                                                    |
| Multi-Purpose Switch (2 button) | Switch         | 2xSwitch            | Switch {Name}<br>Switch {Name}                                   |
| Multi-Purpose Switch (3 button) | Switch         | 3xSwitch            | Switch {Name}<br>Switch {Name}<br>Switch {Name}                  |
| Multi-Purpose Switch (4 button) | Switch         | 4xSwitch            | Switch {Name}<br>Switch {Name}<br>Switch {Name}<br>Switch {Name} |
| Power Point                     | Outlet         | 2xOutlet            | Outlet {Name}                                                    |

### Zimi cover

- Cover entity: Basic open/close and open to percentage

### Zimi fan

- Fan entity: Basic on/off and speed control

### Zimi light

- Light entity: Basic on/off and brightness control

### Zimi sensor

- Battery Level (in %)
- Garage Temperature (in degrees)
- Garage Humidity (in %)
- Outside Temperature (in degrees)

### Zimi switch

- Switch entity: Basic on/off

## Data updates

The integration receives updates instantly from the Zimi Cloud Controller via the Zimi API.

## Known limitations

Entity name changes made in the Zimi app will not be reflected in Home Assistant until after a restart. This is because entity names are only read during integration setup and Home Assistant startup.

## Troubleshooting

### Missing Zimi devices

If there are missing Zimi devices after the initial integration, you may have to run the discovery process again.

To do this:

1. Go to **Settings** > **Devices & Services**.
2. Select **Zimi**.
3. Select **Add Hub**.
This will re-run the discovery process.

### Device authorization failure

Due to the authorization lifecycle of the Zimi Cloud Controller, the device implements rate limiting on authorization requests. If you exceed these limits
(typically more than 3-5 requests within a few minutes), the device will temporarily reject new connection attempts. If you encounter this issue, you'll
need to wait for the rate limit to reset.

To do this:

1. Remove the integration from {% my integrations title="**Settings** > **Devices & services**" %} > **Zimi**.
2. Wait for approximately 5 minutes.
3. Try adding the integration again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
