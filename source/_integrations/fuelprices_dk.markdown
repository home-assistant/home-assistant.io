---
description: Use current fuel prices from Danish fuel stations in Home Assistant using the Fuelprices.dk API.
ha_release: 2026.8
ha_domain: fuelprices_dk
related:
  - url: https://fuelprices.dk
    title: Fuelprices.dk
---

The **Fuelprices.dk** {% term integration %} uses the [Fuelprices.dk API](https://fuelprices.dk) as a source for fuel price data from Danish fuel companies.

All station data and prices are provided by [Fuelprices.dk](https://fuelprices.dk) and the fuel companies.

## Companies currently supported

To view a list of currently supported companies, refer to [Fuelprices.dk Companies](https://fuelprices.dk/selskaber).

## Prerequisites

To set up the integration, you need a valid [Fuelprices.dk](https://fuelprices.dk) API key.

1. Go to [Fuelprices.dk](https://fuelprices.dk).
2. Select **Registrering**.
3. Enter your `name` and `email address`.
4. Select **Opret bruger**.
5. Check your email and copy your API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: Your personal API key from the Fuelprices.dk registration email.
Select company:
  description: Choose a fuel company to show only its stations in the station list.
Select station:
  description: Choose the first station you want Home Assistant to create price sensors for.
{% endconfiguration_basic %}

### Add another station

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Fuelprices.dk**.
3. On the integration page, select **Add station**. If prompted, select the entry you want to add the station to.
4. In **Select company**, choose the fuel company and select **Submit**.
5. In **Select station**, choose the station you want to add and select **Submit**.

## Supported functionality

### Sensors

For each station you add, Home Assistant automatically creates one price sensor for every fuel product Fuelprices.dk reports for that station.

## Data updates

The integration {% term polling polls %} [Fuelprices.dk](https://fuelprices.dk) every hour.

The integration does not modify values. Home Assistant shows the values exactly as returned by [Fuelprices.dk](https://fuelprices.dk).

## Known limitations

- Data availability and freshness depend on [Fuelprices.dk](https://fuelprices.dk) and the fuel companies.
- Some stations may not provide all products.

## Troubleshooting

- **Invalid API key**: Verify that your API key is correct and still active.
- **Cannot connect**: Check your internet connection and try again later.
- **Rate limit exceeded**: Wait and try again later.
- **Missing prices for a product**: Verify that the selected station provides that product on [Fuelprices.dk](https://fuelprices.dk).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
