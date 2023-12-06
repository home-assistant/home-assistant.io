---
title: DROP
description: Instructions on how to integrate DROP into Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_codeowners:
  - '@ChandlerSystems'
  - '@pfrazer'
ha_domain: drop_connect
ha_iot_class: Local Push
ha_mqtt: true
ha_release: '2024.1'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The DROP integration provides connectivity with 
[DROP smart water system](https://dropconnect.com) devices via a local MQTT API.

### Supported devices

There is currently support for the following DROP products within Home Assistant:

- **DROP Hub**: centralized system status and control.
- **Leak Detector**: reports detected leaks around the home.
- **Softener**: improves water quality by decreasing water hardness with integral water shutoff.
- **Filter**: improves water quality by removing comtaminants with integral water shutoff.
- **Protection Valve**: automatic water shutoff with slow leak detection.
- **Pump Controller**: smart replacement for an FSG pressure switch.
- **RO Filter**: reverse osmosis drinking water filtration.
- **Salt Sensor**: alerts when the salt level in the softener brine tank is low.

### Configuration

To use DROP with Home Assistant, you must have already configured the [MQTT](/integrations/mqtt/) platform.

To enable the DROP integration, use the DROP Connect app to connect your DROP Hub to your MQTT broker:
- Start the DROP Connect app and connect to your DROP Hub.
- In the 'Hub Network Settings' section on the System > Advanced page, tap the 'Configure MQTT' button.
- Enter the MQTT broker address, port number, username, and password.
- Click 'Connect' and confirm that the DROP Hub has connected to the MQTT broker.

Once the DROP Hub is connected to your MQTT broker, the devices on your DROP system will be discovered by Home Assistant.
Go to Settings > Devices & Services in the Home Assistant UI to add your DROP devices.

