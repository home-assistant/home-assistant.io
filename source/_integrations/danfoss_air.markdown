---
description: How to integrate Danfoss Air HRV in Home Assistant.
ha_release: 0.87
ha_domain: danfoss_air
---

The **Danfoss Air** {% term integration %} allows you to access information from your Danfoss Air HRV unit through its Air CCM module.

{% note %}
The Danfoss Air CCM only accepts one TCP connection at a time. Because of this, the integration will not work while you have the HRV PC-Tool open.
{% endnote %}

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
    description: "The hostname or IP address of the Danfoss Air CCM module. For example, `192.168.1.50`."
{% endconfiguration_basic %}

If you configured Danfoss Air in your {% term "`configuration.yaml`" %} file, that configuration is imported automatically when Home Assistant starts. Once Danfoss Air appears under {% my integrations title="**Settings** > **Devices & services**" %}, remove the `danfoss_air` entry from your {% term "`configuration.yaml`" %} file. If the import fails, for example because the CCM module cannot be reached, a repair issue explains what went wrong. The import is tried again at the next restart.

## Supported functionality

### Binary sensors

- **Bypass active**
  - **Description**: Whether heat recovery is currently bypassed.
- **Away mode active**
  - **Description**: Whether the unit is in away mode.

### Sensors

- **Outdoor temperature**
  - **Description**: Outdoor air temperature.
- **Supply temperature**
  - **Description**: Temperature of the air supplied to the house.
- **Extract temperature**
  - **Description**: Temperature of the air extracted from the house.
- **Exhaust temperature**
  - **Description**: Temperature of the exhausted air.
- **Remaining filter lifetime**
  - **Description**: Remaining filter lifetime in percent.
- **Humidity**
  - **Description**: Relative humidity in percent.
- **Fan step**
  - **Description**: Fan step.
- **Exhaust fan speed**
  - **Description**: Speed of the exhaust fan.
- **Supply fan speed**
  - **Description**: Speed of the supply fan.
- **Dial battery**
  - **Description**: Battery level of the Air Dial in percent.

### Switches

- **Boost**
  - **Description**: Manually activates boost.
- **Bypass**
  - **Description**: Manually activates bypass.
- **Automatic bypass**
  - **Description**: Enables automatic bypass.

## Data updates

The integration polls the Danfoss Air CCM module for new data every 30 seconds, and reads all values at most once a minute. If the module cannot be reached, the entities become unavailable until it responds again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
