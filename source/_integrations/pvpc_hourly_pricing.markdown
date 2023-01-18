---
title: Spain electricity hourly pricing (PVPC)
description: Instructions on how to set up the PVPC Hourly Pricing sensor in Home Assistant.
ha_category:
  - Energy
ha_release: '0.108'
ha_iot_class: Cloud Polling
ha_quality_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@azogue'
ha_domain: pvpc_hourly_pricing
ha_platforms:
  - sensor
ha_integration_type: integration
---

This sensor uses the official API to get the hourly price of electricity in Spain from <https://www.esios.ree.es/en/pvpc>.

Specifically, it shows the current __active energy invoicing price (FEU)__ in €/kWh, which is the energy term hourly price applied in the consumers' electrical bill with a contracted power not exceeding 15 kW and which are under the PVPC (Voluntary Price for Small Consumer).

It includes the energy term of the access tolls, the charges and the production cost. It does not include taxes. The hourly prices and energy periods are the same throughout the Spanish territory regardless of the time zone, except for the cities of Ceuta and Melilla, where they are slightly different.

<iframe src="https://www.esios.ree.es/en/embed/active-energy-invoicing-price-pvpc" width="100%" height="608"></iframe>

More information available at <https://www.cnmc.es/en/> and <https://www.omie.es/en/>

## Configuration

To configure PVPC Hourly Pricing, set it up via the integrations panel in the configuration screen.

Set a name for the price sensor (default is `sensor.pvpc`), and select one of the two available tariffs,
according to your geographic position in Spain:

- `2.0TD`, for the Peninsula, the Balearic Islands and the Canary Islands.
- `2.0TD (Ceuta/Melilla)`, for the cities of Ceuta and Melilla.

Set also your contracted power (in kW) for the two power periods that apply with the new 2.0TD tariff
(one for P1/P2 and the other one for the valley period, P3), to show your available electric power as a sensor attribute.

In case you did nothing after the tariff change on 2021-06-01, both powers are equal, and the same you had for your existing contract.

You can add up to 2 sensors (one for each geographic zone) by adding them again through the integrations panel,
and you can change the sensor configuration anytime by going to the integration's options.

<div class='note'>

The sensor provides an hourly price for energy consumed, but the variable cost of energy is only one of the factors that add up to the electricity bill:

- Fixed cost of contracted power
- Fixed cost of energy consumed
- Variable cost of energy consumed (the sensor's value)
- Other fixed expenses, such as the rental of the electric meter
- Multiple taxes applied

</div>
