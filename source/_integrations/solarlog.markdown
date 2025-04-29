---
title: Solar-Log
description: Instructions on how to integrate Solar-Log sensors within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.101
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Ernst79'
  - '@dontinelli'
ha_domain: solarlog
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
ha_quality_scale: platinum
---

The **Solarlog** {% term integration %} uses the open JSON interface on [Solar-Log PV monitoring systems](https://www.solar-log.com/) to get details from your Solar-Log device and integrate these into your Home Assistant installation. With the integration you may monitor the solar power production and power consumption as tracked with your Solar-Log device.

## Supported devices

The integration should work with all Solar-Log devices with [firmware 3.x](#known-limitations).

## Prerequisites

Before you can use the integration, you either need the password of the Solar-Log user or you must activate the open JSON interface on your Solar-Log device. 
- To activate the JSON interface on your Solar-Log device, on the device, go to the Configuration | System | Access control menu.
- When activating the interface, a red warning triangle with security information and risks is displayed. For security reasons, it is recommended to activate password protection and use the integration with the respective password.

The `solarlog` integration uses the default host address "http://solar-log" if you don't specify a host. If your device isn't accessible on this address, use its IP Address instead.

{% important %}
If password protection for the general user is deactivated, the open JSON interface is activated by default. For security reasons, it is recommended to activate the user's password.
Please note that the open JSON interface only exposes a limited amount of data. Even if the open JSON interface has been activated, without the user's password, only limited data is available in the integration [see available sensors](#sensors). For [full functionality](#additional-data), you either need the user's password or the user password should be deactivated (not recommended).
{% endimportant %}

{% include integrations/config_flow.md %}

To setup the integration you need the following information:

{% configuration_basic %}
Name:
  description: "The name for your Solar-Log device in Home Assistant. This will also be uses as prefix for the entity names."
Host:
  description: "The URL or IP address of your Solar-Log."
User password available:
  description: "Check the box, if you have the password for the Solar-Log user to securely access [all data](#additional-data)."
Password:
  description: "Password for the Solar-Log user. Will only be asked for in a second step, if in the first step the checkbox has been selected."
{% endconfiguration_basic %}

## Configuration options

The integration has no additional configuration options.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}

## Supported functionality
### Sensors

The following sensors are available via the open JSON interface:

| name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| last_update           |        | Time of latest data update.                |
| power_ac              | W      | Total output PAC from all of the inverters and meters in inverter mode. |
| power_dc              | W      | Total output PAC from all of the inverters. |
| voltage_ac            | V      | Average voltage AC from the inverter. |
| voltage_dc            | V      | Average voltage DC from the inverter |
| yield_day             | kWh    | Total yield for the day from all of the inverters |
| yield_yesterday       | kWh    | Total yield for the previous day from all of the inverters. |
| yield_month           | kWh    | Total yield for the month from all of the inverters. |
| yield_year            | kWh    | Total yield for the year from all of the inverters. |
| yield_total           | kWh    | Total yield from all of the inverters. |
| consumption_ac        | kWh    | Current total consumption AC from all of the consumption meters. |
| consumption_day       | kWh    | Total consumption for the day from all of the consumption meters. |
| consumption_yesterday | kWh    | Total consumption for the previous day from all of the consumption meters. |
| consumption_month     | kWh    | Total consumption for the month from all of the consumption meters. |
| consumption_year      | kWh    | Total consumption for the year from all of the consumption meters. |
| consumption_total     | kWh    | Accumulated total consumption from all consumption meters. |
| installed_peak_power  | W      | Installed solar peak power. |
| alternator_loss       | W      | Altenator loss (equals to power_dc - power_ac) |
| capacity              | %      | Capacity (equals to power_dc / total power) |
| efficiency            | %      | Efficiency (equals to power_ac / power_dc) |
| power_available       | W      | Available power (equals to power_ac - consumption_ac) | 
| usage                 | %      | Usage (equals to consumption_ac / power_ac) |

{% note %}
The solarlog integration is using the solarlog_cli pypi package to get the data from your Solar-Log device. The last five sensors are not reported by your Solar-Log device directly, but are computed by the library.
{% endnote %}

### Additional data

{% important %}
The additional data is only accessible if the user's password is available (or password protection is deactivated). Obviously, deactivating password protection is a security risk and should only be done in specific circumstances. In any event, you do this at your own risk.
{% endimportant %}

The following additional sensor becomes available:

| Name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| self_consumption_year | kWh    | Annual self-consumed solar power.          |

In addition, information from devices connected to the Solar-Log device becomes available. The following additional sensors become available (all values are per inverter/device):

| Name                  | Unit   | Description   |
|-----------------------|--------|:-------------------------------------------|
| current_power         | W      | Current power provided/used by the device. |
| consumption_year      | kWh    | Total energy provided/used by the device.  |

### Additional template sensor

In case you would like to get additional calculated sensors such as the amount of excess solar power available or the energy returned to the grid, you can use the [template platform](/integrations/template/).

{% raw %}

```yaml
# Example configuration.yaml entry for sensor template platform
template:
  - sensor:
    - name: "Solarlog return to grid"
      state: "{{ states('sensor.solarlog_consumption_year') | float(0) - states('sensor.self_consumption_year') | float(0) }}"
```

{% endraw %}

## Data updates

The integration fetches data from the device every minute.

## Actions

The integration provides no additional actions.

## Known limitations

The integration only provides the (limited) data exposed by means of the JSON interface. This also entails that the values for the self-consumption are rounded to full kWh.
Firmware versions below 3.x are not supported, as they do not expose the JSON interface. Please contact the Solar-Log support if you need assistance with updating the firmware of your Solar-Log device.
