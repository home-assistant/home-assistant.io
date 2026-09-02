---
title: Eltako Series 14
description: Connect and control your Eltako Series 14 devices
ha_release: 2026.2
ha_category:
  - Hub
  - Switch
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@jtjart'
ha_domain: eltako_series14
ha_integration_type: hub
---

The **Eltako Series 14** {% term integration %} is used to integrate with the devices of [Eltako's](https://www.eltako.com) Series 14.

## Supported gateways

The following gateways are known to be supported by the integration:

- [FAM14](https://www.eltako.com/catalog/products/850/fam14/)
- [FGW14-USB](https://www.eltako.com/catalog/products/893/fgw14-usb/)
- [FAM-USB](https://www.eltako.com/catalog/products/481/fam-usb/)

## Prerequisites

1. Install the program [PCT14](https://www.eltako.com/en/service/downloads-zone/)
2. Configure the Eltako devices in the ID tables to be controllable by the controller (Using the Teach-In is currently not supported and will be added in the future).
3. Connect the gateway to your Home Assistant

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
    description: "The name of the gateway, that is visible in the GUI."
Base ID:
    description: "The base sending ID of the gateway. The sending IDs will be based on it. This is not the device's ID inside the Eltako BUS. For wired devices it is recommended to use 00-00-B0-00. For wireless devices like the USB300 you need to add its very own base ID (FF-XX-XX-XX)."
Model:
    description: "The gateway's device model."
Serial Port:
    description: "The USB port, where the gateway is connected."
Automatic Reconnect:
    description: "The gateway automatically tries to reconnect after the connection is lost."
Fast Status Change:
    description: "It takes some time for the Eltako actuators to send a confirmation once a command has been send. Therefore this option will directly change the state in the UI, to create a more responsive experience."
Message delay:
    description: "The delay between two sending messages to prevent buffer overflow on the gateway."
{% endconfiguration_basic %}

## Supported devices

The **Eltako Series 14** integration provides the following {% term devices %}.

{% details "Manual configuration steps" icon="mdi:cursor-hand" %}

- Browse to your Home Assistant instance.
- Go to **{% my integrations icon title="Settings > Devices & services" %}**.
- Go to the gateway that you added in the step before
- In the upper right corner, select the **+ Add device** button.
- From the list, select the device type.
- Follow the instructions on screen to complete the setup.

{% enddetails %}

### Switches

- **Normal switch**
  - **Supported models**: [FSR14-2x](https://www.eltako.com/catalog/products/852/fsr14-2x/), [FSR14-4x](https://www.eltako.com/catalog/products/851/fsr14-4x/)
  - **Device setup**: Configure the device with PCT14 to be controlled by a controller.
  - **Entities**: Switch
- **Dumb switch**
  - **Supported models**: [FMS14](https://www.eltako.com/catalog/products/853/fms14/)
  - **Device setup**: Configure the device with PCT14 to be controlled by a direction switch with the top pushbutton for switching on.
  - **Entities**: Switch

{% configuration_basic %}
Name:
    description: "The name of the switch, that is visible in the GUI."
ID:
    description: "The ID of the device. For devices on the RS485 bus you need to use the hexadecimal address (e.g. the device with the address 12 need to be added as 00-00-00-0C)."
Sender ID:
    description: "The ID to control the device sent by Home Assistant. This is the ID, that needs to be added to the configuration in PCT14."
Model:
    description: "The device model."
{% endconfiguration_basic %}

## Data updates

The **Eltako** devices push their state to the integration.

## Known limitations

The integration currently does not support the ability to use the Teach-In functionality. The devices need to be configured using the software [PCT14](https://www.eltako.com/en/service/downloads-zone/).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.
After deleting the integration, you may want to remove the taught IDs for the Eltako devices in PCT14.

{% include integrations/remove_device_service.md %}
