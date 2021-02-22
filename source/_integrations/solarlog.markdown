---
title: Solar-Log
description: Instructions on how to integrate Solar-Log sensors within Home Assistant.
ha_category: Sensor
ha_release: 0.101
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Ernst79'
ha_domain: solarlog
ha_platforms:
  - sensor
---

The `solarlog` integration uses the open JSON interface on [Solar-Log PV monitoring systems](https://www.solar-log.com/) to allow you to get details from your Solar-Log device and integrate these into your Home Assistant installation.

Before being able to use the integration, you have to activate the open JSON interface on your Solar-Log device. This can be activated from the Configuration | System | Access control menu of your Solar-Log device. 
When activating the interface, a red warning triangle with security information and risks is displayed.

The `solarlog` integration uses the default host address "http://solar-log" if you don't specify a host. If your device isn't accessible on this address, use its IP Address instead.

<div class='note warning'>
The open JSON interface is deactivated by default. To activate the open JSON interface, a user password must first be set. The password isn't needed for accessing the open JSON interface.
</div>

{% include integrations/config_flow.md %}

## Additional template sensor

In case you would like to convert the values, for example, to Wh instead of the default kWh, you can use the [template platform](/integrations/template/).

{% raw %}

```yaml
# Example configuration.yaml entry for sensor template platform
sensor:
  - platform: template
    sensors:
      solarlog_yield_day_template:
        value_template: "{{ (states('sensor.solarlog_yield_day') | float * 1000) | round(0) }}"
```

{% endraw %}

## Sensors

The following sensors are available in the library:

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
| total_power           | Wp     | Installed generator power. |
| alternator_loss       | W      | Altenator loss (equals to power_dc - power_ac) |
| capacity              | %      | Capacity (equals to power_dc / total power) |
| efficiency            | % W/Wp | Efficiency (equals to power_ac / power_dc |
| power_available       | W      | Available power (equals to power_ac - consumption_ac) | 
| usage                 |        | Usage (equals to consumption_ac / power_ac) |

<div class='note'>
The solarlog integration is using the sunwatcher pypi package to get the data from your Solar-Log device. The last five sensors are not reported by your Solar-Log device directly, but are computed by the sunwatcher package.
</div>
