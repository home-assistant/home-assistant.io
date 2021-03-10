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
---

This sensor uses the official API to get the hourly price of electricity in Spain from https://www.esios.ree.es/en/pvpc.

Specifically, it shows the current __active energy invoicing price (FEU)__ in €/kWh, 
which is the energy term hourly price applied in the consumers' electrical bill 
with a contracted power not exceeding 10 kW and which are under the PVPC 
(Voluntary Price for Small Consumer).

It includes the energy term of the access tolls, the charges and the production cost. It does not include taxes.
The hourly prices are the same throughout the Spanish territory regardless of the time zone.

It can be set up via the integrations panel in the configuration screen.

<iframe src="https://www.esios.ree.es/en/embed/active-energy-invoicing-price-pvpc" width="100%" height="608"></iframe>

More information available at http://www.cnmc.es/en/ and http://www.omie.es/en/

## Configuration

To configure PVPC Hourly Pricing, you can set it up via the integrations panel in the configuration screen.

Set a name for the price sensor (default is `sensor.pvpc`) and select one of the three tariffs, 
corresponding to your contracted rate, according to the number of billing periods per day 
(one / peak + valley / shifted peak + valley).

- 1 period: `normal`, for the "Default PVPC tariff, (2.0 A)".
- 2 periods: `discrimination`, for the "Efficiency 2 periods (2.0 DHA)", with 10h peak interval from 11:00 UTC to 21:00 UTC.
- 3 periods: `electric_car`, for the "Electric vehicle tariff (2.0 DHS)", optimized for electric car owners to charge at night.

The default is `discrimination`, with 2 periods, as it is usually the cheapest one for home consumers. 

You can add multiple sensors (up to 3, one per tariff) by adding them again through the integrations panel.

### Advanced configuration

PVPC Hourly Pricing allows manual configuration by adding a section to your `configuration.yaml`. 

```yaml
# Set up electricity price sensors as a component:
pvpc_hourly_pricing:
  - name: PVPC manual ve
    tariff: electric_car
  - name: PVPC manual nocturna
    tariff: discrimination
```

{% configuration %}
name:
  description: Custom name for the sensor.
  required: true
  type: string
tariff:
  description: Contracted electric tariff.
  required: true
  default: discrimination
  type: string
{% endconfiguration %}


<div class='note'>

The sensor provides an hourly price for energy consumed, but the variable cost of energy is only one of the factors that add up to the electricity bill:
* Fixed cost of contracted power
* Fixed cost of energy consumed
* Variable cost of energy consumed (the sensor's value)
* Other fixed expenses, such as the rental of the electric meter
* Multiple taxes applied

</div>
