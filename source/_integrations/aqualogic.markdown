---
title: AquaLogic
description: Instructions on how to integrate an AquaLogic controller within Home Assistant.
ha_category:
  - Hub
  - Sensor
  - Switch
ha_release: '0.80'
ha_iot_class: Local Push
ha_domain: aqualogic
ha_config_flow: true
ha_platforms:
  - sensor
  - switch
ha_integration_type: hub
---

The **AquaLogic** {% term integration %} provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet adapter connected to the pool controller is required.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
    description: "Hostname or IP address of your AquaLogic controller. For example, `192. 168.1.50`."
Port:
    description: "TCP port used to connect to the AquaLogic controller. For example, `8899`."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The AquaLogic integration provides the following sensors.

{% note %}
Not all AquaLogic controllers/setups provide data to all sensors.
{% endnote %}

- **Air Temperature**
  - **Description**: The air temperature.
- **Pool Temperature**
  - **Description**: The pool temperature.
- **Spa Temperature**
  - **Description**: The spa temperature.
- **Pool Chlorinator**
  - **Description**: The pool chlorinator setting.
- **Spa Chlorinator**
  - **Description**: The spa chlorinator setting.
- **Salt Level**
  - **Description**: The current salt level.
- **Pump Speed**
  - **Description**: The current pump speed (Hayward VS pumps only).
- **Pump Power**
  - **Description**: The current pump power usage (Hayward VS pumps only).
- **Status**
  - **Description**: The current system status.

### Switches

The AquaLogic integration provides the following switches.

{% note %}
Not all AquaLogic controllers/setups use/support all switches.
{% endnote %}

- **Filter**
  - **Description**: Controls the filter pump.
- **Filter Low Speed**
  - **Description**: Controls low speed mode on the filter pump (multi-speed pumps only).
- **Lights**
  - **Description**: Controls the Lights relay.
- **Aux 1**
  - **Description**: Controls the Aux 1 relay.
- **Aux 2**
  - **Description**: Controls the Aux 2 relay.
- **Aux 3**
  - **Description**: Controls the Aux 3 relay.
- **Aux 4**
  - **Description**: Controls the Aux 4 relay.
- **Aux 5**
  - **Description**: Controls the Aux 5 relay.
- **Aux 6**
  - **Description**: Controls the Aux 6 relay.
- **Aux 7**
  - **Description**: Controls the Aux 7 relay.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}