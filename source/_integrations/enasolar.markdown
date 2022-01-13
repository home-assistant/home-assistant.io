---
title: EnaSolar Solar Inverter
description: Instructions on how to connect your EnaSolar GT Solar Inverter to Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: '2021.12.8'
ha_codeowners:
  - '@geustace'
ha_domain: enasolar
ha_platforms:
  - sensor
---

## Setup

The `enasolar` sensor will poll an EnaTel EnaSolar GT solar inverter.  EnaTel are no longer in the solar market but their inverters were popular in Australia and New Zealand.

This integration uses the inverter's web interface. Home Assistant must be able to connect to the solar inverter. From the same network as Home Assistant you can test this using your favorite web browser. Try browsing to http://your-inverter/settings.html you should get a page showing various firmware revisions.

Note: Polling too frequently caused the web server in the inverter to become unresponsive, to reset turn the AC switch on the inverter Off and On again. The current implementation polls the meters every minute and the daily data every 10 minutes. Polling is also reduced at night.


## Configuration

1. Select Integrations from the Home Assistant Configuration page
2. Select ADD INTEGRATION
3. Search for EnaSolar.

Fill in the connection form. Note: Naming the inverter isn't particularly helpful unless you have more than one. select NEXT. If the connection succeeded the next form will have been pre-filled with values extracted from the inverter.  You may choose to over-ride a value if is incorrect.

Max AC Output Power: is used to calculate the utilisation. It should be one of - 1.5, 2.0, 3.0, 3.8, 4.0 or 5.0
Number of DC strings in the array: It should be either - 1 or 2
Capability: indicates which optional features are present in the inverter.

## Sensors

Sensors available in the library:

Note: Some sensors are dependent on the features in the inverter and whilst they are returned in the polls, they may not have sensible values. If the capability 'bit' is not set, the sensors are not setup in Home Assistant even though they are returned by the inverter.

output_power, input_voltage_1, input_voltage_2, output_voltage, today_energy, yesterday_energy, total_energy, days_producing, today_hours, yesterday_hours, total_hours, utilisation, average_daily_power, meter_today, meter_yesterday, meter_lifetime, irradiance, insolation_today, insolation_yesterday, temperature.

## Debug Logging

If the logging level for the integration is set to debug, the results of the polls will appear in the log. This can be useful to confirm that the inverter is being polled successful and that the values being returned are sensible.

```yaml
logger:
  default: error
  logs:
    homeassistant.components.enasolar: debug
    pyenasolar: debug
```
