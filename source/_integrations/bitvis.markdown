---
title: Bitvis Power Hub
description: Read real-time electricity data from your smart meter with the Bitvis Power Hub integration for Home Assistant.
ha_release: 2026.4
ha_category:
  - Energy
  - Sensor
ha_platforms:
  - sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@MandusBorjesson'
  - '@simontegelid'
  - '@real-tintin'
ha_domain: bitvis
ha_integration_type: device
---

The **Bitvis Power Hub** {% term integration %} reads real-time electricity data from a [Bitvis Power Hub](https://bitvis.se/) device. The Power Hub connects to the <abbr title="Home Area Network">HAN</abbr> port (a standard port on European smart meters) on your smart electricity meter and pushes measurements to Home Assistant over your local network using UDP.

Because data is pushed directly from the device, no cloud connection or polling is required.

## Prerequisites

Before adding the integration, make sure:

- Your Bitvis Power Hub is connected to your local network.
- Your router or firewall allows UDP traffic from the Power Hub to Home Assistant on port 58220.

{% note %}
The Bitvis Power Hub and Home Assistant must be on the same network subnet, or your router/firewall must be configured to forward UDP traffic between them.
{% endnote %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Bitvis Power Hub on your local network.
Name:
  description: A friendly name for this device in Home Assistant.
{% endconfiguration_basic %}

## Sensors

The following sensors are provided, depending on the capabilities of your smart meter:

### Power

- **Active power import**
  - **Description**: Total active power consumed from the grid (kW).

- **Active power export**
  - **Description**: Total active power delivered to the grid (kW).

- **Active power import L1/L2/L3**
  - **Description**: Per-phase active power consumed (kW).

- **Active power export L1/L2/L3**
  - **Description**: Per-phase active power delivered (kW).

- **Reactive power import**
  - **Description**: Total reactive power consumed (kvar).

- **Reactive power export**
  - **Description**: Total reactive power delivered (kvar).

- **Reactive power import L1/L2/L3**
  - **Description**: Per-phase reactive power consumed (kvar).

- **Reactive power export L1/L2/L3**
  - **Description**: Per-phase reactive power delivered (kvar).

### Voltage and current

- **Voltage L1/L2/L3**
  - **Description**: Phase voltages (V).

- **Current L1/L2/L3**
  - **Description**: Phase currents (A).

### Energy

- **Active energy import**
  - **Description**: Cumulative active energy consumed from the grid (kWh).

- **Active energy export**
  - **Description**: Cumulative active energy delivered to the grid (kWh).

- **Reactive energy import**
  - **Description**: Cumulative reactive energy consumed (kvarh).

- **Reactive energy export**
  - **Description**: Cumulative reactive energy delivered (kvarh).

## Diagnostic sensors

The following diagnostic sensors are also available:

- **Uptime**
  - **Description**: Estimated time the device was last started. Timestamp.

- **Wi-Fi signal strength**
  - **Description**: Received signal strength (dBm).

- **HAN messages successfully parsed**
  - **Description**: Counter of successfully parsed HAN port messages.

- **HAN buffer overflows**
  - **Description**: Counter of HAN port buffer overflow events.

## Removing the integration

{% include integrations/remove_device_service.md %}
