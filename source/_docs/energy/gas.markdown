---
title: "Integrating your gas usage"
description: "Learn how to add information about your gas usage to Home Assistant home energy management."
---

Some homes are connected to gas. Gas is being used to heat water, cook and heat up the home.

Home Assistant allows you to track your gas usage and easily compare it against your energy usage for the same period of time.

## Hardware

Home Assistant will need to know the amount of gas that is being consumed.

### Connect to your meter

The best way to get this data is directly from your gas meter that sits between your house and the grid. In certain countries these meters contain standardized ways of reading out the information locally or provide this information via the electricity meter.

#### Electronic gas meters

The P1 port is a standardized port on electricity meters in the Netherlands, Belgium and Luxembourg which also provides gas consumption information. A P1 reader can connect to this port and receive real-time information.

We have worked with creator [Marcel Zuidwijk](https://www.zuidwijk.com) to develop [SlimmeLezer](https://www.slimmelezer.nl). It's an affordable P1 reader powered by [ESPHome](https://esphome.io) that will seamlessly integrate this information in Home Assistant. It is being sold on [his website](https://www.slimmelezer.nl) and the firmware is open source [on GitHub](https://github.com/zuidwijk/dsmr).

![Photo of SlimmeLezer attached to a smart electricity meter](/images/docs/energy/slimmelezer.jpg)

#### Mechanical gas meters

In some countries, the gas is measured by mechanical (diaphragm/membrane) meters. Some devices are directly equipped with pulse counters and those without them can be easily retrofitted by devices like Honeywell's [IN-Z61](https://www.elster-instromet.com/en/product-details/519/en/IN-Z61).

When a pulse counter is fitted to gas meter, its values can be reported to Home Assistant by simple pulse counting circuit build from ESP8266 and 10kOhm resistor.

Following [ESPHome](https://esphome.io) example configuration reads data from common BK-G4 (+IN-Z61) gas meter:

```yaml
sensor:
  - platform: pulse_counter
    pin: GPIO0
    name: "Gas Counter"
    device_class: gas
    update_interval: 60s
    internal_filter: 100ms
    count_mode:
      rising_edge: DISABLE
      falling_edge: INCREMENT
    total:
      state_class: total_increasing
      device_class: gas
      name: "Gas Total Counter"
      unit_of_measurement: m³
      accuracy_decimals: 2
      filters:
        - multiply: 0.01
```
