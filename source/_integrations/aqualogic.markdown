---
title: AquaLogic
description: Instructions on how to integrate an AquaLogic controller within Home Assistant.
ha_category:
  - Device
  - Sensor
  - Switch
ha_release: '0.80'
ha_iot_class: Local Push
ha_domain: aqualogic
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: bronze
---

The **AquaLogic** {% term integration %} provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet adapter connected to the pool controller is required.

{% include integrations/config_flow.md %}

## Supported Functionality

### Sensors

The AquaLogic integration provides the following sensors.
*Note: not all AquaLogic controllers/setups provide data to all sensors.*

- **Air Temperature**
  *The air temperature.*
- **Pool Temperature**
  *The pool temperature.*
- **Spa Temperature**
  *The spa temperature.*
- **Pool Chlorinator**
  *The pool chlorinator setting.*
- **Spa Chlorinator**
  *The spa chlorinator setting.*
- **Salt Level**
  *The current salt level.*
- **Pump Speed**
  *The current pump speed (Hayward VS pumps only).*
- **Pump Power**
  *The current pump power usage (Hayward VS pumps only).*
- **Status**
  *The current system status.*

### Switches

The AquaLogic integration provides the following switches.
*Note: not all AquaLogic controllers/setups use/support all switches.*

- **Filter**
  *Controls the filter pump.*
- **Filter Low Speed**
  *Controls low speed mode on the filter pump (multi-speed pumps only).*
- **Lights**
  *Controls the Lights relay.*
- **Aux 1**
  *Controls the Aux 1 relay.*
- **Aux 2**
  *Controls the Aux 2 relay.*
- **Aux 3**
  *Controls the Aux 3 relay.*
- **Aux 4**
  *Controls the Aux 4 relay.*
- **Aux 5**
  *Controls the Aux 5 relay.*
- **Aux 6**
  *Controls the Aux 6 relay.*
- **Aux 7**
  *Controls the Aux 7 relay.*
