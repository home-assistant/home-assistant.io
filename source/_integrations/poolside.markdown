---
title: Poolside
description: Instructions on how to integrate your Poolside Tech Attendant pool and spa controller with Home Assistant.
ha_release: 2026.9
ha_category:
  - Climate
  - Fan
  - Light
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: poolside
ha_platforms:
  - climate
  - fan
  - light
  - select
  - sensor
  - switch
ha_zeroconf: true
ha_codeowners:
  - '@PoolsideStan'
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Poolside** {% term integration %} connects your Poolside Tech Attendant pool and spa controller to Home Assistant over your local network. It exposes the full set of capabilities for managing controls, just like the native Poolside app. The integration synchronizes your Attendant configuration in real time, making every option and parameter available in Home Assistant. You can also use it to monitor the state and telemetry of pool equipment connected to the Attendant, such as pumps, heaters, salt chlorinators, valve actuators, and more.

The connection is local and encrypted. The controller pushes updates to Home Assistant as they happen, so no cloud account is needed and changes show up immediately.

## Supported devices

The following devices are supported by this integration:

- Poolside Tech Attendant
- Poolside Tech Attendant Mini

Your controller must be running software version 2.7.0 or later to be compatible with this integration. 

All pool equipment that is set up on your controller, such as heaters, chillers, lights, pumps, water features, cleaners, filters, and blowers, becomes available in Home Assistant through the controller.

## Prerequisites

- Your Poolside controller must be connected to the same local network as Home Assistant.
- You need access to the controller you're integrating with via the Poolside app to approve the pairing request during setup. You must have administrator permissions to the controller to perform pairing.
- If your controller is not discovered automatically, you need its hostname or IP address.

{% include integrations/config_flow.md %}

During setup, Home Assistant sends a pairing request to your controller:

1. On your Poolside controller or in the Poolside app, approve the pairing request from Home Assistant.
2. Confirm that the code shown on the controller matches the code shown in Home Assistant.

Only one pairing request can be pending on the controller at a time. If another pairing request is already in progress, wait a few minutes and try again.

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Expose pool devices:
  description: Create read-only telemetry devices for the physical pool equipment (pumps, heaters, lights, and actuators) the controller operates. Enabled by default.
{% endconfiguration_basic %}

## Supported functionality

### Climate

- **Thermostat**: One thermostat is created for each body of water that is capable of temperature management. You can set the target water temperature and change the mode. The available modes (**Off**, **Heat**, **Cool**, or **Heat/Cool**) depend on what your equipment supports.

### Fans

- **Water Features**: One fan entity is created for each water feature, cleaner, or filter that supports multiple speeds. You can turn it on or off and set the speed. The speed steps match the steps your equipment supports.

### Lights

- **Pool and spa lights**: One light entity is created for each light. Lights that support dimming can be adjusted in brightness. Named colors and light shows from your equipment are available as effects.

### Selects

- **Heating mode**: For each thermostat control, a select entity lets you choose how the water is heated, for example **Smart**, **Solar**, **Heat pump**, or **Fuel**. Only the modes your equipment supports are shown.

- **Cooling mode**: For each thermostat control, a select entity lets you choose how the water is cooled, for example **Smart**, **Heat pump**, or **Chiller**. Only the modes your equipment supports are shown.

### Sensors

- **Temperature**: The current water temperature, one for each body of water.
- **Water state**: What the body of water is currently doing, for example **Off**, **Filtering**, **Heating**, or **Cooling**.
- **Water chemistry**: Depending on the probes connected to your controller, sensors for ORP, pH, free chlorine, total chlorine, dissolved oxygen, and salt level.
- **Disabled reason**: A diagnostic sensor for each control that explains why it is currently unavailable, for example **Winterized**, **Freeze protection**, or **Pool cover closed**.
- **Controller mode**: A diagnostic sensor that shows the mode the controller is in, for example **Normal** or **Installer**.
- **Pool equipment telemetry**: If **Expose pool devices** is enabled, read-only sensors for the physical equipment the controller operates, such as pump speed, power use, pressure, and flow rate. The available sensors depend on your equipment.

### Switches

- **On/off equipment**: One switch is created for each water feature, cleaner, filter, or blower that only supports on and off.

## Data updates

The integration keeps an encrypted connection to the controller over your local network. The controller pushes updates to Home Assistant as they happen, so the integration does not poll for data.

If the connection is lost, the integration reconnects automatically and refreshes all data. If your pool installer changes the site configuration on the controller, the integration reloads automatically to pick up the new equipment layout.

## Known limitations

- Lights do not support freely selectable colors. The named colors and light shows provided by your equipment are available as effects instead.


## Troubleshooting

### The pairing request times out or is rejected

- Approve the pairing request on the Attendant controller or in the Poolside app before it times out, and confirm the code matches the one shown in Home Assistant.
- Only one pairing request can be pending at a time. If the controller reports that another pairing request is in progress, wait a few minutes and try again.

### Entities are unavailable

- If all entities are unavailable, Home Assistant has lost the connection to the controller. Check that the controller is powered on and reachable on your network. The integration reconnects automatically.
- If only some controls are unavailable, the equipment may be winterized, protected against freezing, or blocked by a closed pool cover. Check the control's **Disabled reason** sensor to see why.
- While the controller is in installer mode, controls are unavailable. Check the **Controller mode** sensor.

### Home Assistant asks to reauthenticate

If the pairing is removed or revoked on the controller, Home Assistant asks you to reauthenticate. Follow the steps to approve a new pairing request on the controller, just like during the initial setup.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also remove Home Assistant from the list of paired clients on your Poolside controller.
