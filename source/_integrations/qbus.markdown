---
title: Qbus
description: Instructions on how to integrate your Qbus installation with Home Assistant.
ha_category:
  - Switch
ha_platforms:
  - switch
ha_iot_class: Local Push
ha_codeowners:
  - '@Qbus-iot'
  - '@thomasddn'
ha_release: 2025.2
ha_domain: qbus
ha_integration_type: hub
ha_config_flow: true
ha_quality_scale: bronze
---

The **Qbus** {% term integration %} allows you to integrate your [Qbus Control](https://www.qbus.be) into Home Assistant. **Qbus** is a Belgian manufacturer of Home Automation systems.

## Prerequisites

This integration communicates with a **Qbus** controller over an MQTT server.

The controllers cannot communicate directly with MQTT. Therefore, you need to install the Qbus gateway before enabling this integration. The Qbus gateway is a software tool that runs on all Linux platforms. It can be installed by running a script or a Docker container. For detailed instructions, please refer to the [Qbus MQTT Gateway documentation](https://github.com/Qbus-iot/qbus-mqttgw).

For information on setting up Home Assistant with a **Qbus** controller, refer to the [Qbus documentation](https://iot.qbus.be/). The documentation is currently only available in Dutch, but translations are planned for the future.

Once the Qbus controller is connected to the MQTT server, you need to set up an MQTT client in Home Assistant to enable communication between Home Assistant and your **Qbus** system. This client should connect to the same MQTT Server as your Qbus controller. For detailed instructions, refer to the [MQTT integration documentation](https://www.home-assistant.io/integrations/mqtt/).

{% include integrations/config_flow.md %}

## Supported devices

There is currently support for the following **Qbus** products within Home Assistant:

- **CTD 3.0**: main controller.
- **CTD 3.5**: main controller.
- **Toggle**: toggle outputs on controllers.

## Available entities

- **Switch**: toggles on/off outputs.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

All data from **Qbus** entities are pushed to Home Assistant over MQTT.

## Known limitations

The integration does not provide a way to update the firmware on the devices. This can only be done with the configuration software System Manager.

## Troubleshooting

### Can’t set up the device

#### Symptom: "No devices are discovered"

When trying to set up the integration, no devices are discovered.

##### Description

This means that the integration did not receive a valid configuration from the gateway.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure your controller is online and not connected to System Manager.
2. Make sure you have an MQTT broker running.
3. Make sure that the gateway software is up and running (see [Prerequisites](#prerequisites)) and connected to the broker.
4. Make sure you have an MQTT client integration (see [Prerequisites](#prerequisites)) connected to the broker.
