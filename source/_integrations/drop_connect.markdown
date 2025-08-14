---
title: DROP
description: Instructions on how to integrate DROP into Home Assistant.
ha_category:
  - Binary sensor
  - Select
  - Sensor
  - Switch
ha_config_flow: true
ha_codeowners:
  - '@ChandlerSystems'
  - '@pfrazer'
ha_domain: drop_connect
ha_iot_class: Local Push
ha_mqtt: true
ha_release: '2024.1'
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The DROP integration provides connectivity with
[DROP smart water system](https://dropconnect.com) devices via a local MQTT API.

### Supported devices

There is currently support for the following DROP products within Home Assistant:

- **DROP Hub**: centralized system status and control.
- **Leak Detector**: reports detected leaks around the home.
- **Softener**: improves water quality by decreasing water hardness with integral water shutoff.
- **Filter**: improves water quality by removing contaminants with integral water shutoff.
- **Protection Valve**: automatic water shutoff with slow leak detection.
- **Pump Controller**: smart replacement for an FSG pressure switch.
- **RO Filter**: reverse osmosis drinking water filtration.
- **Salt Sensor**: alerts when the salt level in the softener brine tank is low.
- **Alert**: monitors both the water level in a sump pit and electrical power to the sump pump.

### Prerequisites

To use DROP with Home Assistant, you must have already configured the [MQTT](/integrations/mqtt/) platform.

To enable the DROP integration, use the DROP Connect app to connect your DROP Hub to your MQTT broker:

- Start the DROP Connect app and connect to your DROP Hub.
- In the **Hub Network Settings** section on the **System > Advanced** page, tap the **Configure MQTT** button.
- Enter the MQTT broker address, port number, username, and password.
- Click **Connect** and confirm that the DROP Hub has connected to the MQTT broker.

Once the DROP Hub is connected to your MQTT broker, the devices on your DROP system should be discovered by Home
Assistant.

{% details "Manual configuration steps" %}

- Browse to your Home Assistant instance.
- Go to **{% my integrations title="Settings > Devices & services" %}**.
- Set up the new discovered devices.

{% enddetails %}

{% important %}
The MQTT broker address and port used for the DROP Hub must be the same as configured for the Home Assistant MQTT integration.
{% endimportant %}
