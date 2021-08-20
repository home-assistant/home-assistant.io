---
title: EnaSolar Solar Inverter
description: Instructions on how to connect your EnaSolar GT Solar Inverter to Home Assistant.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_release: '0.1.0'
ha_codeowners:
  - '@geustace'
ha_domain: enasolar
ha_platforms:
  - sensor
---

The `enasolar` sensor will poll a EnaTel EnaSolar GT solar inverter.  EnaTel are no longer in the solar market but their inverters were popular in Australia and New Zealand.

This sensor uses the inverter's web interface. To use it, you have to be able to connect to the solar inverter from your favorite web browser. Try http://your-inverter/settings.html

Note: Polling too frequently caused the web server in the inverter to become unresponsive, to reset turn the AC switch on the inverter Off and On again. The current implementation polls the meters every minute and the daily data every 10 minutes. Polling is also reduced at night.


## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enasolar
    host: IP_ADDRESS_OF_DEVICE
```

Some of the configuration values are extracted from the JScript in the header of the main inverter web page but if that fails or you want to set explicitly, they can be specified in the yaml file.

{% configuration %}
host:
  description: "The IP address or resolvable DNS name of the EnaSolar Solar Inverter."
  required: true
  type: string
name:
  description: "An optional name for your EnaSolar Solar Inverter."
  required: false
  type: string
sun_up:
  description: "Time to start polling."
  required: false
  default: "05:00"
  type: time
sun_down:
  description: "Time to stop polling."
  required: false
  default: "22:00"
  type: time
max_output:
  description: "Inverter model, used to calculate utilisation."
  required: false
  default: "Extracted, must be 1.5, 2.0, 3.0, 3.8, 4.0 or 5.0"
  type: float
dc_strings:
  description: "No. of strings in the solar array"
  required: false
  default: "Extracted, must be 1 or 2"
  type: integer
capability:
  description: "features available in the inverter, 9 bits, 1 has power meters, 2 has solar meters, 4 has temperature, 256 use Fahrenhiet"
  required: false
  default: "Extracted"
  type: integer
{% endconfiguration %}

## Sensors

Sensors available in the library:

Note: Some sensors are dependent on the features in the inverter and whilst returned in the polls may not have sensible values. If the capability 'bit' is not set, the sensor is not setup in HA even though it is returned by the inverter.

output_power, input_voltage_1, input_voltage_2, output_voltage, today_energy, yesterday_energy, total_energy, days_producing, today_hours, yesterday_hours, total_hours, utilisation, average_daily_power, meter_today, meter_yesterday, meter_lifetime, irradiance, insolation_today, insolation_yesterday, temperature.

## Full configuration example

If the logging for the integration is set to debug, you will see the results of the polls in the logs.

```yaml
logger:
  default: error
  logs:
    homeassistant.components.enasolar: debug
    pyenasolar: debug

sensor:
  - platform: enasolar
    host: 192.168.1.100
    sun_up: "7:00"
    sun_down: "21:00"
```
