---
title: Powerfox Local
description: Instructions on how to integrate a Powerfox device locally with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: powerfox_local
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
ha_zeroconf: true
---

The **Powerfox Local** {% term integration %} allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) device directly over your local network, without relying on the Powerfox cloud API.

[Powerfox](https://www.powerfox.energy/) is a German company that provides smart meters (Poweropti) for reading electricity, water, gas, and heat. This integration communicates directly with the device on your local network, offering faster updates and no dependency on internet connectivity or the Powerfox cloud service.

{% note %}
This integration only supports **power meters**. If you need support for water, gas, or heat meters, or prefer using the Powerfox cloud API, see the [Powerfox](/integrations/powerfox) integration.
{% endnote %}

## Prerequisites

- A **powerfox PRO Service** subscription is required to use the local interface. The PRO Service can be purchased in the [powerfox Shop](https://shop.powerfox.energy/).
- Your Poweropti device must be running **firmware version v2.02.07 or higher**.

## Supported devices

The local interface is available for the following Poweropti models:

- PA 201901
- PA 201902
- PB 202001 (poweropti+)

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: The hostname or IP address of your Poweropti device on your local network.
API key:
  description: The API key of your Poweropti device. The default value is the 12-character device ID printed on the label of the device (for example, `1097bd725557`).
{% endconfiguration_basic %}

## Automatic discovery

If your Poweropti device is on the same network as Home Assistant, it will be discovered automatically via mDNS/Zeroconf. You only need to confirm the setup. No manual entry of the host or API key is required.

## Data updates

The integration {% term polling polls %} the Poweropti device every 5 seconds and provides real-time measurements.

## Actions

This integration does not provide additional actions.

## Examples

### Get alerted when power usage spikes

Use this automation to keep an eye on sudden peaks in your electricity usage. When the Poweropti sensor reports more than 4 kW for two minutes, Home Assistant sends a notification so you can react quickly (for example by switching off large loads).

{% details "Example YAML automation" %}
{% raw %}

```yaml
alias: "Powerfox high usage alert"
description: "Notify me when the Poweropti meter reports sustained high power draw."
triggers:
  - trigger: numeric_state
    entity_id: sensor.poweropti_power
    above: 4000
    for:
      minutes: 2
actions:
  - action: notify.mobile_app_phone
    data:
      title: "High consumption detected"
      message: "Poweropti currently reports {{ states('sensor.poweropti_power') }} W."
```

{% endraw %}
{% enddetails %}

Replace the threshold value and the `notify` target with the entities that exist in your installation.

## Supported functionality

The Powerfox Local platform provides sensors that you can use in your [energy dashboard](/energy).

### Power meter

It will create the following sensors:

- **Power (W)**: Active power that is currently measured.
- **Energy usage (Wh)**: Total energy used since installation.
- **Energy usage - high tariff (Wh)**: Energy usage on the high tariff.
- **Energy usage - low tariff (Wh)**: Energy usage on the low tariff.
- **Energy return (Wh)**: Energy returned to the grid.

## Troubleshooting

{% details "Cannot connect to the device" %}

1. Make sure the Poweropti device is powered on and connected to the same network as Home Assistant. 
2. Verify that the host (IP address or hostname) and API key are correct. 
   - The default API key is the 12-character device ID printed on the label of the device.

{% enddetails %}

{% details "401 Unauthorized error" %}

The local interface is only available with an active **powerfox PRO Service** subscription. 

1. Verify that your device is activated for the PRO Service in the Powerfox app or shop. 
2. Also, make sure the firmware version of your device is *v2.02.07 or higher*.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
