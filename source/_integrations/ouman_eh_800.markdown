---
title: Ouman EH-800
description: Instructions on how to integrate the Ouman EH-800 heating controller with Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2026.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Markus98'
ha_domain: ouman_eh_800
ha_platforms:
  - climate
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
related:
  - url: https://ouman.fi/en/product/ouman-eh-800-and-eh-800b/
    title: Ouman EH-800 manufacturer website
  - url: https://ouman.fi/wp-content/uploads/2022/04/XM1054B-N-00.pdf
    title: Ouman EH-800 user manual
---

The **Ouman EH-800** {% term integration %} integrates the [Ouman EH-800](https://ouman.fi/en/product/ouman-eh-800-and-eh-800b/) heating controller with Home Assistant. It allows you to monitor your EH-800 device directly from Home Assistant over your local network.

The Ouman EH-800 is a heating controller used for water-based central heating systems. It supports up to two heating circuits (H1 and H2) with control curves based on the outside temperature.

## Supported devices

The following devices are supported by this integration:

- **Ouman EH-800**

The Ouman EH-800B is **not supported** as it does not have network connectivity.

## Prerequisites

Before setting up the Ouman EH-800 integration, make sure:

- Your Ouman EH-800 controller is connected to your local network.
- The device has a reachable <abbr title="Internet Protocol">IP</abbr> address, subnet mask, and a configured username and password. Refer to the [device manual](https://ouman.fi/wp-content/uploads/2022/04/XM1054B-N-00.pdf#page=41) for setup instructions.
- The device's web interface (`http://<ip_address>:<port>`) is reachable from Home Assistant.

{% warning %}
The Ouman EH-800 only supports unencrypted <abbr title="HyperText Transfer Protocol">HTTP</abbr> and does not adhere to modern security standards. In addition, the device exposes all of its values to anyone who can reach it over the network. Authentication is not required for read operations, only for writes. Keep the device on your local network only. Exposing the device directly to the internet is **strongly discouraged**.
{% endwarning %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
URL:
  description: The <abbr title="Uniform Resource Locator">URL</abbr> of the Ouman EH-800 web interface, for example `http://192.168.1.100`.
Username:
  description: The username configured on the Ouman EH-800 device.
Password:
  description: The password configured on the Ouman EH-800 device.
{% endconfiguration_basic %}

## Supported functionality

The integration creates one **Ouman EH-800** device for the controller and one sub-device for each active heating circuit. Sub-devices are named **Heating circuit 1** and **Heating circuit 2** (referred to as H1 and H2 throughout this document and on the controller), with the circuit name configured on the controller appended when available (for example, `Heating circuit 1 Radiator heating`). Climate and sensor entities are assigned to the device they belong to.

### Climate entities

The integration exposes one climate entity per active heating circuit that has a room sensor installed. The entity reports the room temperature and lets you adjust the room temperature setpoint.

The HVAC mode shown on the climate card reflects the heating circuit's operation mode: **Heat** when the controller is running a mode that uses the room temperature setpoint, **Off** otherwise. The three heating sub-modes that use the setpoint (**Automatic**, **Temperature drop**, **Big temperature drop**) are exposed as **presets**. Switching the HVAC mode to **Heat** defaults the heating preset to **Automatic**.

The HVAC action reflects the current heating status: **Heating** when the mixing valve is open, **Idle** when it is closed, **Off** when the circuit isn't using the setpoint.

{% note %}
Operation modes other than the three heat sub-modes (for example **Normal temperature** and **Manual valve control**) ignore the room temperature setpoint. The climate entity reports **Off** for those modes.
{% endnote %}

### Sensors

The exact set of sensors depends on which features and circuits are active on your device. Sensors enabled by default include:

- **Outside temperature**: The outside temperature measured by the controller.
- **H1/H2 supply water temperature**: The current supply water temperature for the heating circuit.
- **H1/H2 supply water temperature setpoint**: The target supply water temperature calculated by the controller.
- **H1/H2 valve position**: The current position of the mixing valve, in percent.
- **H1/H2 room temperature**: The room temperature measured by the room sensor (when installed).
- **H1/H2 room temperature setpoint**: The target room temperature.

Additional diagnostic sensors are exposed but disabled by default. See [enabling or disabling entities](/common-tasks/general/#enabling-or-disabling-entities) to enable them if needed:

- **H1/H2 curve supply water temperature**: The supply water temperature derived from the heating curve.
- **H1/H2 delayed room temperature**: A smoothed/delayed room temperature reading.
- **H1 fine adjustment effect**: The temperature offset from the manual fine-adjustment.
- **H1 room sensor potentiometer**: The room temperature offset from the room sensor's adjustment knob.
- **H2 delayed outdoor temperature effect**: The delayed outdoor temperature effect applied to the H2 setpoint.

## Data updates

This integration uses local {% term polling %} to fetch data from the Ouman EH-800 controller every 60 seconds.

## Known limitations

- **Limited write support**: Apart from the room temperature setpoint and heat/off control exposed via the climate entity, adjusting other setpoints, changing the operation mode beyond the heat sub-modes, or controlling the relay is not yet supported.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
