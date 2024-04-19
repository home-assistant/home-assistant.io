---
title: Swidget
description: Integrate Swidget with Home Assistant.
ha_category:
  - Switch
  - Light
  - Sensor
  - Binary Sensor
ha_release: 2023.03
ha_iot_class: Local Polling
ha_domain: swidget
ha_codeowners:
  - '@swidget'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - light
  - switch
  - sensor
ha_integration_type: integration
---

# Home Assistant User Manual

## Components

Swidget Smart Home products are comprised of a *HOST* wiring device and one of an assortment of interchangeable smart inserts.

Each device combination has an assortment of Control capabilities, as well as Sensor capabilities. These are Home Assistant (HA) Entities.

### Setup

1. **Installation**

Place a Wi-Fi Insert into the *HOST* wiring device. The Insert will take approximately one minute to initiate.

2. **Discovery Mode**

When the Insert is blinking green, it is in *Discovery* mode and ready to be paired.

**Note: For security purposes, your Swidget Insert remains in discovery mode for 5 minutes. If the insert is no longer broadcasting, remove and reinsert into host.**

3. **Firmware and Updates**

Swidget Inserts must be running firmware V1.4 or later in order to support local control.

Firmware can be found at http://homeassistant.swidget.com

To check and/or update the firmware, connect a wi-fi enabled computer to the Swidget SSID being broadcast by the Swidget Insert.

Open a web browser and navigate to http://10.123.45.1:90 and check the version code

To update, select file, select the local control firmware and select Update

4. **Local Provisioning**

Once completed, reconnect to the Swidget SSID and navigate to https://10.123.45.1/provision

Enter the SSID and password of the network being used by the Control4 system.

**Optional - Enter a user-defined security key in the Set Key field. Record this key as it will be required later in the provisioning process.***

Select *Disable Authentication Method*

**Optional - Add a static IP address**

Note the IP Address to manually add Swidget device

## Connecting your Device to Home Assistant

### Installing Swidget Integration

Navigate to Settings from the left menu
Select Devices & Services
Select ADD INTEGRATION from the bottom right of the Integrations screen
Search for Swidget and select it
Click Submit to automatically find your Swidget devices or add manually with the IP address and key from the local provisioning step
Choose an Area

### Using your Device

Navigate to Overview on the left menu
Your Swidget device controls and all of the monitoring entities should be visible.
Click on any of the Controls or Sensors to find the corresponding Entity ID

### Device/Controls

Dimmer
Switch
Controlled Outlet
USB Outlet

### Entities


|                                 | Air Pressure | Air Quality | Carbon dioxide | Humidity | Motion | Signal Strength |
| ------------------------------- | ------------ | ----------- | -------------- | -------- | ------ | --------------- |
| Control                         |              |             |                |          |        | √               |
| USB                             |              |             |                |          |        | √               |
| Guide Light                     |              |             |                |          |        | √               |
| Power Out Light                 |              |             |                |          |        | √               |
| Motion                          |              |             |                |          | √      | √               |
| Temperature & Humidity          |              |             |                | √        |        | √               |
| Temperature, Humidity, & Motion |              |             |                | √        | √      | √               |
| Air Quality                     | √            | √           | √              | √        |        | √               |

|                                 |Plug 0 Current Consumption | Plug 1 Current Consumption |  Temperature | Volatile Organic Compounds |
| ------------------------------- |-------------------------- | -------------------------- |  ----------- | -------------------------- |
| Control                         |√                          | √                          |              |                            |
| USB                             |√                          | √                          |              |                            |
| Guide Light                     |√                          | √                          |              |                            |
| Power Out Light                 |√                          | √                          |              |                            |
| Motion                          |√                          | √                          |              |                            |
| Temperature & Humidity          |√                          | √                          |  √           |                            |
| Temperature, Humidity, & Motion |√                          | √                          |  √           |                            |
| Air Quality                     |√                          | √                          |  √           | √                          |