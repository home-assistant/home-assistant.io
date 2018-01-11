---
layout: page
title: "Xcel Energy"
description: "Instructions on how to use Xcel data within Home Assistant"
date: 2018-01-09 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: xcel.png
ha_category: Energy
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

The `xcel` sensor platform collects and displays energy information on your
home/premise from [Xcel Energy®](https://www.xcelenergy.com).

## {% linkable_title Configuring the Platform %}

To integrate `xcel` into Home Assistant, add the following section to your
`configuration.yaml` file (adjusting the `monitored_conditions` list to your
liking):

```yaml
sensor:
  - platform: xcel
    username: <XCEL_USERNAME>
    password: <XCEL_PASSWORD>
    monitored_conditions:
      - average_temperature
      - balance_info
      - electric_commodity_adjustment_off_peak
      - electric_commodity_adjustment_on_peak
      - electricity_efficiency_comparison
      - electricity_usage
      - energy_efficiency_comparison
      - natural_gas_efficiency_comparison
      - natural_gas_usage
      - off_peak_energy
      - on_peak_energy
      - premise_grade
      - shoulder_peak_energy
      - total_energy_interval
      - total_energy_measured
```

{% configuration %}
  username:
    description: the username of the Xcel account
    required: true
    type: string
  password:
    description: the password for the Xcel account
    required: true
    type: string
  monitored_conditions:
    description: the metric types to monitor; valid values are specified below
    required: true
    type: list
  monitored_premises:
    description: the Xcel premises to monitor; default is to monitor all
    required: false
    type: list
{% endconfiguration %}

## {% linkable_title Finding Your Xcel Premise ID %}

In the case that you want to monitor only specific premises, it is necessary to
retrieve the Xcel Premise ID for that premise. To do so:

1. Log into [Xcel's](https://myaccount.xcelenergy.com/oam/index.jsp) website.
2. Click on "My Usage" on the left.
3. Select the premise you'd like to view.
4. Look for "Premises Information" on the lower right; use "Premises #" as the
ID.

## {% linkable_title Available Metrics %}

The following metrics can be monitored:

* Average Temperature (`average_temperature`): the average temperature at the
exterior of the house
* Balance information (`balance_info`): the current balance on the
account
* Electric Commodity Adjustment (Off-peak)
(`electric_commodity_adjustment_off_peak`): the off-peak cost of energy
utilized
* Electric Commodity Adjustment (On-peak)
(`electric_commodity_adjustment_on_peak`): the on-peak cost of energy utilized
* Electricity Efficiency Comparison (`electricity_efficiency_comparison`):
a percentage comparing your electricity efficiency to your most efficient
neighbors; negative numbers indicate lower-than efficiency and positive numbers
indicate higher-than efficiency
* Electricity Usage (`electricity_usage`): the total electricity usage of
the premise
* Energy Efficiency Comparison (`energy_efficiency_comparison`):
a percentage comparing your overall energy efficiency to your most efficient
neighbors; negative numbers indicate lower-than efficiency and positive numbers
indicate higher-than efficiency
* Natural Gas Efficiency Comparison (`natural_gas_efficiency_comparison`):
a percentage comparing your natural gas efficiency to your most efficient
neighbors; negative numbers indicate lower-than efficiency and positive numbers
indicate higher-than efficiency
* Natural Gas Usage (`natural_gas_usage`): the total natural gas usage of
the premise
* Off-peak Energy Usage (`off_peak_energy`): the total measured amount of
off-peak energy used
* On-peak Energy Usage (`on_peak_energy`): the total measured amount of on-peak
energy used
* Premise Grade (`premise_grade`): the overall "energy grade" given to the
premise by Xcel
* Shoulder-peak Energy Use (`shoulder_peak_energy`): the total measured amount
of shoulder-peak (after on-peak, before off-peak) energy used
* Total Energy Usage (Interval) (`total_energy_interval`): the total energy
usage of the premise (electricity and natural gas) for the most recent
interval
* Total Energy Usage (Measured) (`total_energy_measured`): the total energy
usage of the premise (electricity and natural gas) for all time

<p class='note warning'>
From time to time, the three efficiency sensors
(`energy_efficiency_comparison`, `electricity_efficiency_comparison`, and
`natural_gas_efficiency_comparison`) do not appear in the unofficial API's
responses. Until a solution can be determined from this, be advised that these
sensors may show `Unknown` at any moment.
</p>
