---
description: Instructions on how to integrate Pure Energie within Home Assistant.
ha_release: 2022.3
ha_domain: pure_energie
---

The **Pure Energie** {% term integration %} integrates the [Pure Energie Monitor](https://pure-energie.nl/kennisbank/pure-energie-meter/)
device with Home Assistant.

The Pure Energie meter is a product that allows you to read the data
from your smart meter via the serial port (P1), such as your energy
consumption and power flow.

{% note %}
The product of Pure Energie is a white label product of Net2Grid,
other white label products may be found by zeroconf and work with
this integration.
{% endnote %}

{% include integrations/config_flow.md %}

### SmartBridge

Read out what your meter readings are for energy consumption/production
and see what your current power flow is.

- Power Flow (W)
- Energy Consumption (kWh)
- Energy Production (kWh)
