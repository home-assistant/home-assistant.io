---
description: Instructions on how to integrate Airzone Cloud within Home Assistant.
ha_release: 2023.6
ha_domain: airzone_cloud
---

This {% term integration %} interacts with the Cloud API of [Airzone devices](https://www.airzone.es/en/).

{% important %}
Airzone charges a subscription to control some devices from outside your home. Local control stays free. When Home Assistant is on the same network as your Airzone device, this integration works without a subscription. Which devices need a subscription depends on your device. For details, refer to [Airzone support](https://support.airzonecontrol.com/aa/en/faqs/wird-sich-die-integration-mit-drittanbietersystemen-alexa-google-home-knx-bacnet-modbus-usw-mit-dem-neuen-modell-andern/).

If your device supports the local API, you can also use the [Airzone](/integrations/airzone/) integration, which doesn't use the cloud.
{% endimportant %}

There are two main types of Airzone devices:
- [Aidoo](https://www.airzonecontrol.com/aa/en/control-solutions/aidoo/wi-fi/) / [Aidoo Pro](https://www.airzonecontrol.com/aa/en/control-solutions/aidoo/pro/)
- [Easyzone (US)](https://www.airzonecontrol.com/aa/en/control-solutions/easyzone/) / [Flexa (EU)](https://www.airzonecontrol.com/ib/es/soluciones-de-control/flexa/)

## Aidoo / Aidoo Pro

These devices are Wi-Fi controllers that are normally connected to a single air conditioner split system.

## Easyzone (US) / Flexa (EU)

These devices are connected to ducted air conditioners, motorized grilles, and individual thermostats for every room (zone). Therefore, with a single ducted air conditioning system, the user can turn on and off the air conditioner and set different desired temperatures in each room.

A typical Airzone HVAC system consists of a parent device and child devices. The [HVAC mode](/integrations/climate/#action-set-hvac-mode) can only be changed on the parent device. On child devices, you can only enable or disable the HVAC and adjust the desired temperature for that specific device.

Note that multiple HVAC systems can be connected to the same Airzone web server. In this case, there will be one *parent zone* per HVAC system and there may also be *child zones* for each HVAC system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Cloud API username"
Password:
  description: "Cloud API password"
{% endconfiguration_basic %}

## Binary sensors

For each Airzone system (HVAC machine), the following *binary sensors* are created:

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| problems            | Indicates that the current system has errors or warnings. |

For each Airzone zone (thermostat), the following *binary sensors* are created:

| Condition           | Description                                             |
| :------------------ | :------------------------------------------------------ |
| air_quality_active  | Indicates that the air quality control is running.      |
| problems            | Indicates that the current zone has errors or warnings. |

## Climate

For each Airzone Aidoo (HVAC Wi-Fi controller), a climate entity is created.

For each Airzone zone (thermostat), a climate entity is created.

**HVAC mode can only be changed on a *parent zone*.**

*Child zones* can only enable/disable the current HVAC mode selected on the corresponding *parent zone*. Attempting to change the HVAC mode on a *child zone* will result in a Home Assistant error.

## Select

For each Airzone zone (thermostat), the following *selects* are created:

| Condition           | Description                                         |
| :------------------ | :-------------------------------------------------- |
| air_quality         | Selects the desired Air Quality working mode.       |

## Sensors

For each Airzone Aidoo (HVAC Wi-Fi controller), the following *sensors* are created:

| Condition           | Description                                        |
| :------------------ | :------------------------------------------------- |
| temperature         | Measures the temperature from the HVAC thermostat. |

For each Airzone zone (thermostat), the following *sensors* are created:

| Condition           | Description                                               |
| :------------------ | :-------------------------------------------------------- |
| air_quality_index   | Indicates the Air Quality Index in the current zone.      |
| humidity            | Measures the relative humidity in the current zone.       |
| pm1                 | Concentration of particles with a diameter of less than 1&nbsp;µm.   |
| pm2_5               | Concentration of particles with a diameter of less than 2.5&nbsp;µm. |
| pm10                | Concentration of particles with a diameter of less than 10&nbsp;µm.  |
| temperature         | Measures the temperature in the current zone.             |

For each Airzone WebServer (HVAC Wi-Fi controller), the following *sensors* are created:

| Condition           | Description                                        |
| :------------------ | :------------------------------------------------- |
| rssi                | Wi-Fi RSSI.                                        |

## Switch

For each Airzone zone (thermostat), a switch entity is created to turn the thermostat on or off (without changing the HVAC mode).

## Water heater

For each Airzone device, a *water heater entity* is created if supported.

## Troubleshooting

{% details "Setup fails with a 402 Payment Required error" %}

### Symptom: "402 Payment Required"

The integration can't connect to the Airzone Cloud API and reports an HTTP `402 Payment Required` error.

### Description

Without a subscription, Airzone only allows this integration when Home Assistant and the Airzone device are on the same network. If your network uses IPv6, the Airzone Cloud API might not recognize that they're on the same network, and it returns this error.

### Resolution

- Make sure Home Assistant and the Airzone device are on the same network.
- If your network uses IPv6, make Home Assistant connect to `m.airzonecloud.com` over IPv4, for example with a DNS rule in your router that doesn't return IPv6 addresses for that host. Don't turn off IPv6 on the Home Assistant host, because other integrations, such as Matter, need it.
- If your device supports the local API, use the [Airzone](/integrations/airzone/) integration instead.
- If the error continues, contact Airzone support to check your subscription.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
