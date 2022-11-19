---
title: Kostal Piko Solar Inverter
description: Instructions on how to integrate Kostal Piko solar inverter within Home Assistant.
ha_category:
  - Energy
ha_release: 2022.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@scheidtdav'
  - '@bedmanforever'
ha_domain: kostal_piko
---

The Kostal Piko integration allows you to get data from [Kostal Piko](https://www.kostal-solar-electric.com/) solar inverters and integrate them into your Home Assistant installation.

The integration uses the proprietary API interface which is also used by the
integrated Web-UI.
Therefore all values available through the web interface can be accessed through
Home Assistant and the same username and password is used.

The integration is tested with the following inverter models:

- [Piko BA 8.0](https://www.kostal-solar-electric.com/en-gb/download/archiv/#Solar%20Inverter/PIKO%20BA%206.0%20-%2010/United%20Kingdom/)

{% include integrations/config_flow.md %}

## Sensors

By default the integration enables all available sensors representing the values
of the inverters web interface. However the API does not allow to request all
values at once, so requests are batched.
Disabling entities on the *Entity* page therefore may reduce the load on the
inverters network interface.

<div class='note'>
It may up to 15 seconds for the sensor values to show up after initial setup of
the integration.
</div>

The following sensors are available in the library:

| Name                          | Unit        | Description                                                                     |
| ----------------------------- | ----------- | :------------------------------------------------------------------------------ |
| Analog Input 1                | V           |                                                                                 |
| Analog Input 2                | V           |                                                                                 |
| Analog Input 3                | V           |                                                                                 |
| Analog Input 4                | V           |                                                                                 |
| Battery Voltage               | V           | Current voltage of the connected battery (if any)                               |
| Battery Charge                | %           | Charge of the connected battery (if any)                                        |
| Battery Current               | A           | (Dis)charging current of the battery (if any)                                   |
| Battery Charging State        |             | State of the battery charging (defaults to charging, even when current is zero) |
| Battery Charge Cycles         |             | Number of charging cycles on the battery                                        |
| Battery Temperature           | Temperature | Current temperature of the battery                                              |
| Grid Output Power             | W           |                                                                                 |
| Grid Frequency                | Hz          | Frequency of the electricity grid                                               |
| Power Factor                  | %           | Power factor of the inverter                                                    |
| Limitation                    | %           | Limit of power feed-in to the grid                                              |
| Voltage L1                    | V           | Voltage of L1 Phase                                                             |
| Current L1                    | A           | Current of L1 Phase                                                             |
| Power L1                      | W           | Power of L1 Phase                                                               |
| Voltage L2                    | V           | Voltage of L2 Phase                                                             |
| Current L2                    | A           | Current of L2 Phase                                                             |
| Power L2                      | W           | Power of L2 Phase                                                               |
| Voltage L3                    | V           | Voltage of L1 Phase                                                             |
| Current L3                    | A           | Current of L2 Phase                                                             |
| Power L3                      | W           | Power of L3 Phase                                                               |
| Home Consumption from Solar   | W           | Current power consumption from the solar cells                                  |
| Home Consumption from Battery | W           | Current power consumption from the battery system                               |
| Home Consumption from Grid    | W           | Current power consumption from the grid                                         |
| Home Consumption L1           | W           | Current power consumption on L1 phase                                           |
| Home Consumption L2           | W           | Current power consumption on L2 phase                                           |
| Home Consumption L3           | W           | Current power consumption on L3 phase                                           |
| DC Power PV                   | W           | Current DC power from the solar cells                                           |
| Self Consumption              | W           | Power used by the inverter                                                      |
| Operating Status              |             | Inverter Status                                                                 |
| DC 1 Voltage                  | V           | Voltage of string 1                                                             |
| DC 1 Current                  | A           | Current of string 1                                                             |
| DC 1 Power                    | W           | Power of string 1                                                               |
| DC 2 Voltage                  | V           | Voltage of string 2                                                             |
| DC 2 Current                  | A           | Current of string 2                                                             |
| DC 2 Power                    | W           | Power of string 2                                                               |
| DC 3 Voltage                  | V           | Voltage of string 3                                                             |
| DC 3 Current                  | A           | Current of string 3                                                             |
| DC 3 Power                    | W           | Power of string 3                                                               |
| S0 In Pulses                  |             |                                                                                 |
| Log Interval                  | s           |                                                                                 |
| Daily Yield                   | Wh          | Today's power yield                                                             |
| Daily Home Consumption        | Wh          | Today's home power consumption                                                  |
| Daily Self Consumption        | Wh          | Today's inverter power consumption                                              |
| Daily Self Consumption Rate   | %           | Today's percentage of generated power used                                      |
| Daily Autonomy Degree         | %           | Today's degree of autonomy                                                      |
| Total Yield                   | kWh         | Total power yield                                                               |
| Total Operating Time          | h           | Total number of hours of operation                                              |
| Total Home Consumption        | kWh         | Total home power consumption                                                    |
| Total Self Consumption        | kWh         | Total inverter power consumption                                                |
| Total Self Consumption Rate   | %           | Total percentage of generated power used                                        |
| Total Autonomy Degree         | %           | Total degree of autonomy                                                        |
