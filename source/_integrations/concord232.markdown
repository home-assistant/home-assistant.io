---
title: Concord232
description: Instructions on how to integrate Interlogix/GE Concord4 into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_iot_class: Local Polling
ha_release: 0.31
ha_domain: concord232
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Concord232** {% term integration %} provides integration with GE, Interlogix (and other brands) alarm panels that support the RS-232 Automation Control Panel interface module (or have it built in). Supported panels include Concord 4.

To use this integration, you will need to have the external concord232 server installed and running on the device which is connected to the automation module's serial port. For additional details in setting up and testing the server, see the [concord232 project on GitHub](https://github.com/JasonCarter80/concord232).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the concord232 server.
Port:
  description: The port the concord232 server listens on. The default is 5007.
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Alarm code:
  description: A code required to arm and disarm the panel from Home Assistant. When no code is configured, the panel can be armed without one and disarming sends no code to the panel.
Arm home mode:
  description: Whether arming in home mode is audible or silent.
{% endconfiguration_basic %}

## Supported functionality

The integration provides the following entities, grouped under one panel device:

- **Alarm control panel**: arm home, arm away and disarm the first partition reported by the panel.
- **Binary sensors**: one per zone reported by the panel. The device class (motion, smoke, moisture, safety or opening) is guessed from the zone name and can be changed per entity in the UI.

## Migration from YAML

Configuration of this integration via `configuration.yaml` is deprecated. An existing YAML configuration is imported into a config entry automatically and can then be removed from `configuration.yaml`.

The previous `exclude_zones` and `zone_types` options of the binary sensor platform are not imported: disable unwanted zone entities and override device classes from the entity settings in the UI instead.
