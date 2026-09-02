---
title: Flexit
description: Instructions on how to integrate a Flexit air handling unit into Home Assistant.
ha_category:
  - Climate
ha_release: 0.47
ha_iot_class: Local Polling
ha_domain: flexit
ha_platforms:
  - climate
ha_integration_type: device
ha_codeowners:
  - '@troelde'
ha_config_flow: true
ha_quality_scale: legacy
---

The **Flexit** {% term integration %} connects [Flexit](https://www.flexit.no/en/) air handling units equipped with a CI66 Modbus adapter to Home Assistant.

## Prerequisites

Your Flexit unit needs a [CI66 Modbus adapter](https://www.flexit.com/en/products/111647/modbus-adapter-ci66-k2-c2-uni/). Depending on how the adapter is connected, you need one of the following:

- **Serial (Modbus RTU)**: The CI66 adapter is connected through an RS-485 interface. You can use a USB-to-RS485 converter connected to your Home Assistant host. Alternatively, as an experimental option, an [ESPHome Serial Proxy](https://esphome.io/components/serial_proxy/) with an RS-485 interface can expose the connection to Home Assistant as a network-attached serial port.
- **Network (Modbus TCP) via bridge**: The CI66 adapter is wired to a Modbus TCP bridge or gateway on your network.

{% include integrations/config_flow.md %}

When you set up the integration, you're asked to choose between a serial or a network connection.

{% configuration_basic %}
Serial device:
  description: "The serial device your Flexit CI66 Modbus adapter is connected to. Only shown for a serial connection."
Baud rate:
  description: "The baud rate of the serial connection. Defaults to `57600`. Only shown for a serial connection."
Host:
  description: "The hostname or IP address of your Flexit CI66 Modbus bridge. Only shown for a network connection."
Port:
  description: "The port of your Flexit CI66 Modbus bridge. Defaults to `502`. Only shown for a network connection."
Unit ID:
  description: "The Modbus unit ID of your Flexit unit. Enter a value from `1` through `32`."
{% endconfiguration_basic %}

{% note %}
Home Assistant can share a Modbus connection between integrations when their connection settings are compatible. If another integration uses the same connection with incompatible settings, setup fails with a connection error.
{% endnote %}

## Migrating from YAML configuration

If you previously configured this integration through `configuration.yaml`, it can't be imported automatically. The Modbus connection details used to live in a separate `modbus:` section, which isn't accessible from the `climate` platform configuration.

1. Remove the `flexit` entry under `climate:` from your `configuration.yaml` file.
2. Set up the integration again from the Home Assistant UI, providing the Modbus connection details and unit ID of your Flexit unit.
3. Restart Home Assistant.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} will guide you through the same steps.

## Supported functionality

### Climate

The integration adds a climate entity for the Flexit unit. You can set a target temperature and choose a fan mode (**Off**, **Low**, **Medium**, or **High**). The current activity, such as heating, cooling, or idle, is shown as the entity's HVAC action.

## Data updates

The **Flexit** integration {% term polling polls %} the unit every 30 seconds.

## Troubleshooting

If setup fails with a connection error:

- Make sure the serial device or host and port are correct and reachable from Home Assistant.
- Make sure no other integration is already using the same connection with different settings.
- Make sure the unit ID matches the Modbus address configured on your CI66 adapter.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
