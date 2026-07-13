---
title: Fuelprices.dk
description: Use current fuel prices from Danish fuel stations in Home Assistant using the Fuelprices.dk API.
ha_category:
  - Sensor
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - "@MTrab"
ha_domain: fuelprices_dk
ha_config_flow: true
ha_integration_type: hub
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://fuelprices.dk
    title: Fuelprices.dk
---

The **Fuelprices.dk** {% term integration %} uses the [Fuelprices.dk API](https://fuelprices.dk) as a source for fuel price data from Danish fuel companies.

All station data and prices are provided by [Fuelprices.dk](https://fuelprices.dk) and the fuel companies.

## Companies currently supported

To view a list of currently supported companies, refer to [Fuelprices.dk Companies](https://fuelprices.dk/selskaber).

## Prerequisites

To set up the integration, you need a valid [Fuelprices.dk](https://fuelprices.dk) API key

1. Go to [Fuelprices.dk](https://fuelprices.dk).
2. Select **Registrering**.
3. Enter your `name` and `email address`.
4. Select **Opret bruger**.
5. Check your email and copy your API key.

After setup, you can reconfigure selected products for each station from the integration settings.

{% include integrations/config_flow.md %}

{% configuration_basic %}
api_key:
  description: Your API key as specified in the email received after registration on [Fuelprices.dk](https://fuelprices.dk)
{% endconfiguration_basic %}

## Supported functionality

## Sensors
The integration creates sensor entities for the selected station:

- One price sensor per selected product (for example **Blyfri 92**, **Oktan 95**, and **Diesel**)

## Data updates

The integration {% term polling polls %} [Fuelprices.dk](https://fuelprices.dk) every hour.

The integration does not modify values. Home Assistant shows the values exactly as returned by [Fuelprices.dk](https://fuelprices.dk).

## Known limitations

- Data availability and freshness depend on [Fuelprices.dk](https://fuelprices.dk) and the fuel companies.
- Some stations may not provide all products.
- API rate limits can temporarily delay updates.

## Troubleshooting

- **Invalid API key**: Verify that your API key is correct and still active.
- **Cannot connect**: Check your internet connection and try again later.
- **Rate limit exceeded**: Wait and try again later.
- **Missing prices for a product**: Verify that the selected station provides that product on [Fuelprices.dk](https://fuelprices.dk).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
