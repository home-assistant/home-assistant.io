---
title: OpenRGB
description: Instructions on how to integrate OpenRGB within Home Assistant.
ha_category:
  - Light
ha_release: 2025.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@felipecrs'
ha_domain: openrgb
ha_platforms:
  - light
  - select
ha_integration_type: hub
ha_quality_scale: silver
---

The **OpenRGB** {% term integration %} is used to integrate the RGB lighting devices from computers running [OpenRGB](https://openrgb.org/).
OpenRGB provides a unified interface for controlling various RGB lighting hardware from different manufacturers.

## Prerequisites

To use this integration, you need the **OpenRGB** application installed on your computer with the SDK Server running.

To enable the OpenRGB SDK server:

1. In the OpenRGB application, go to **SDK Server** tab.
2. Select **Start Server**.
3. Optionally, go to the **Settings** tab and check **Start at Login**, **Start Minimized**, and **Start Server** for convenience.

**Note**: if you opted to **Install System Service** in the OpenRGB **Windows installer**, the SDK server is probably already running. You can check this in the **Services** application in Windows, looking for the **OpenRGB** service.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: A name for this integration entry, like the name of the computer running the OpenRGB SDK server (for example, `My Gaming PC`).
Host:
  description: The hostname or IP address of the computer running the OpenRGB SDK server (for example, `192.168.1.100`).
Port:
  description: The port number that the OpenRGB SDK server is running on (default is `6742`).
{% endconfiguration_basic %}

## Supported devices

This integration supports any RGB device that is compatible with OpenRGB. Refer to the [OpenRGB Supported Devices list](https://openrgb.org/devices.html).

## Supported functionality

The OpenRGB integration provides the following entities:

### Lights

For each RGB device connected to OpenRGB, the integration creates a light entity to control all the LEDs on that device as a single unit.

### Select

For each OpenRGB server device, a select entity is created that allows selecting the profiles configured in the OpenRGB application.

## Data updates

The **OpenRGB** integration {% term polling polls %} data from the OpenRGB SDK server **every 15 seconds**.

## Reconfiguration

If you need to update your OpenRGB SDK server connection details, you can reconfigure the integration:

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. Select **OpenRGB**. Select the three dots {% icon "mdi:dots-vertical" %} menu and then select **Reconfigure**.
3. Update the hostname/IP address and port number as needed.
4. Select **Submit**.

The integration will then reconnect to the OpenRGB SDK server with the new settings.

## Known limitations

- The light state shown in Home Assistant may not always reflect the actual device state. Most RGB devices don't report their status back to OpenRGB, so it assumes the state based on the last command sent. If other applications control the same devices, the state reported by OpenRGB (and thus Home Assistant) may be outdated.
- Changes made directly in the OpenRGB application may not be immediately reflected in Home Assistant (the integration polls for updates every 15 seconds).
- Some OpenRGB features like per-zone and per-LED control are not yet supported through Home Assistant.
- The profile select entity cannot be used to determine which profile is currently active as this information is not [currently](https://gitlab.com/CalcProgrammer1/OpenRGB/-/issues/5178) provided by the OpenRGB SDK server.

## Troubleshooting

### Connection errors

If you encounter connection errors:

- Verify that the **OpenRGB SDK server is running** in the OpenRGB application.
- Verify that the **SDK Server** > **Server Host** is set to `0.0.0.0` in the OpenRGB application.
- Confirm that the IP address of the computer running the OpenRGB SDK server matches the **Host** configured in the OpenRGB integration.
- Confirm that the **SDK Server** > **Server Port** matches the port configured in the OpenRGB integration.
- Check for firewall rules that may block the connection from Home Assistant to the OpenRGB SDK server.

### Devices not appearing

If your RGB devices don't appear in Home Assistant:

- Verify the devices are detected and working in the OpenRGB application first.

### Light effects not working

If lighting effects are not working:

- Verify the effect/mode can be applied in the OpenRGB application first.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
