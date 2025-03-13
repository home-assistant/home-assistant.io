---
title: Airios
description: Instructions on how to integrate Airios ventilation units into Home Assistant.
ha_category:
  - Climate
  - Fan
ha_config_flow: true
ha_release: 2025.4
ha_iot_class: Local Polling
ha_domain: airios
ha_platforms:
  - fan
ha_codeowners:
  - '@scabrero'
ha_integration_type: hub
---

The **Airios** {% term integration %} allows you to control and monitor ventilation units and accessories from different manufacturers.

**Airios** develops and produces components for residential ventilation systems that final manufacturers use to build their products upon, from controller boards to remote controls or sensors. These components communicate over a proprietary RF protocol from Honeywell called Ramses II in the 868Mhz band.


This {% term integration %} has been tested with the following manufacturers.

## Prerequisites

An RF bridge is needed for Home Assistant to access the RF network. There are two bridge models with different interfaces. The **Airios** BRDG-02R13 has a RS485 serial interface (Modbus-RTU) and the BRDG-02EM23 is an Ethernet device (Modbus-TCP).

- Before you can use this integration, make sure you have the **Airios** BRDG-02R13 with the RS485 serial bridge. The BRDG-02EM23 Ethernet device is not supported.

{% include integrations/config_flow.md %}

## Platforms

### Fan

The fan platform allows you to turn the unit on/off using the toggle switch and select the speed preset:

- `Away`
- `Low`
- `Medium`
- `High`
- `Boost`
- `Auto`
- `Low (temporary override)`
- `Medium (temporary override)`
- `High (temporary override)`

{% note %}
The available presets depend on the unit capabilities.
{% endnote %}

{% note %}
If a `temporary override` preset is selected it will be active for **1 hour**, automatically returning to the previous preset after the override period.
{% endnote %}
