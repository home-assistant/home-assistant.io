---
title: EnaSolar Solar Inverter
description: Instructions on how to connect your EnaSolar Solar Inverter to Home Assistant.
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

The `enasolar` sensor will poll an EnaTel EnaSolar solar inverter and present the values as sensors in Home Assistant. Please note that EnaTel are no longer trading but the EnaSolar was a very popular inverter particularly in New Zealand and Australia.

This sensor uses the inverter's web interface. To use it, you have to be able to connect to the solar inverter from your favorite web browser. To Test, try to connect to http://<your inverter>/settings.htm

Note well: There is an issue with early firmware in the inverter where too frequent polling results in the web interface dying. If that happens, turning the AC switch on the inverter off and on again will reset it.


## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enasolar
    host: IP_ADDRESS_OF_DEVICE
```

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
  description: "When to start polling"
  required: false
  default: "5:00"
  type: time
sun_down:
  description: "When to stop polling"
  required: false
  default: "22:00"
  type: time 
max_output:
  description: "The inverter's rating - must be one of 1.5, 2.0, 3.0, 3.8, 4.0 or 5.0"
  required: false
  default: will be set by looking in jscript from inverters main web page
  type: float
dc_strings:
  description: "The number of DC strings attached to the inverter - must be 1 or 2"
  required: false
  default: will be set by looking in jscript from inverters main web page
  type: integer
capability:
  description: "9 bits ANDed indicating features of the inverter - 1 has power meter, 2 has solar meter, 4 has temperature meter, 256 fahrenhiet"
  required: false
  default: will be set by looking in jscript from inverters main web page
  type: integer
{% endconfiguration %}

## Sensors

Sensors available in the library:

average_daily_power, days_producing, input_voltage_1, input_voltage_2, output_power, output_voltage, today_energy, totay_hours, total_energy, total_hours, utilisation, yesterday_energy, yesterday_hours, meter_today, meter_yesterday, meter_total, irradiance, insolation_today, insolation_yesterday, temperature

Note: Not all of the sensors are available if they are not supported by the inverter.

## Full configuration example

When debug logging is enabled, all polling activity can be seen in the log. The meters are polled every 60 seconds, the longer lived data every 10 minutes

```yaml
logger:
  ...
  logs:
    homeassistant.components.enasolar: debug
    pyenasolar: debug 

sensor:
  - platform: enasolar
    host: 192.168.1.100
    sun_up: "7:00" 
    sun_down: "21:00"
    max_output: 4.0
```
