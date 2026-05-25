---
title: Ouman EH-800
description: Instructions on how to integrate the Ouman EH-800 heating controller with Home Assistant.
ha_category:
  - Select
  - Sensor
ha_release: 2026.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Markus98'
ha_domain: ouman_eh_800
ha_platforms:
  - select
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

The integration creates one **Ouman EH-800** device for the controller and one sub-device for each active heating circuit. Sub-devices are named **Heating circuit 1** and **Heating circuit 2** (referred to as H1 and H2 throughout this document and on the controller), with the circuit name configured on the controller appended when available (for example, `Heating circuit 1 Radiator heating`). Sensors and select entities are assigned to the device they belong to.

### Select entities

The integration exposes select entities for the device's enum-based controls. The exact set depends on which features are active on your device:

- **Home/Away mode** (on the main device): Switch between **Home**, **Away**, and **Off**.
- **H1/H2 Operation mode** (on each heating circuit): Switch between **Auto**, **Temperature drop**, **Big temperature drop**, **Normal temperature**, **Standby**, and **Manual valve control**.
- **Relay control** (on the main device, when the relay is configured for temperature, temperature-difference, H1 valve position, or time-program modes): Switch between **Auto**, **On**, and **Off**.
- **Pump summer stop** (on the main device, when the relay is configured for pump summer stop mode): Switch between **Auto**, **Stop**, and **Run**.

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

- **No numerical setpoint control**: Adjusting numerical setpoints (such as the room temperature setpoint, valve position, or heating curve points) is not supported.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
