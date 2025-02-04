---
title: Nord Pool
description: Instructions on how to integrate with the Nord Pool Energy market prices.
ha_category:
  - Energy
  - Finance
  - Sensor
ha_release: 2024.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: nordpool
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
---

The **Nord Pool** {% term integration %} integrates [Nord Pool Group](https://www.nordpoolgroup.com/) energy prices into Home Assistant.

The {% term integration %} provides the public market prices displayed on the [Nord Pool Auction page](https://data.nordpoolgroup.com/auction/day-ahead/prices).

Most European energy is traded via the Nord Pool Group marketplace. If your energy provider doesn't have a dedicated Home Assistant integration and you have a spot-price-based contract, you can use the **Nord Pool** {% term integration %}. This integration provides spot prices for your selected market, which you can, as an example, use in a {% term template %} to calculate prices for your [energy dashboard](#energy-dashboard).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Areas:
  description: Select one or multiple market areas to create sensors for.
Currency:
  description: Currency to display prices in. EUR is the base currency in Nord Pool prices.
{% endconfiguration_basic %}

{% tip %}
Only a single integration entry is supported. To modify the settings, you can use the reconfigure option from the integration entry.

EUR is the base currency for market prices. If you choose another currency, you can find the conversion rate in the `Exchange rate` sensor.
All prices are displayed as `[Currency]/kWh`.
{% endtip %}

## Data fetching and limitations

Data is polled from the **Nord Pool** API on an hourly basis, exactly on the hour, to ensure the price sensors are displaying the correct price.

If polling cannot happen because of no connectivity or a malfunctioning API, it will wait a retry a few times before failing.
The user can use the [`homeassistant.update_entity`](homeassistant#action-homeassistantupdate_entity) action to manually try again later, in the case the user has solved the connectivity issue.

## Troubleshooting

This service is reliant on an internet connection and that the **Nord Pool** API is available. Here are the things you can try before raising an issue:

- Check that internet is available from your Home Assistant instance.
- Check that the **Nord Pool** API is available by clicking [here](https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices). You should get a JSON back with the title `Unauthorized`.
- Use `curl` in a terminal on your Home Assistant instance using the same URL as previously opened in the browser. `curl https://dataportal-api.nordpoolgroup.com/api/DayAheadPrices`

## Sensors

The integration will create entities showing today's energy prices for the configured market area. Only the base energy price is shown. VAT and other additional costs are not included.

### Main sensors

| Sensor                    | Type              | Description                                                                       |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| Current price             | [Currency]/kWh    | The current (hourly) energy price.                                                |
| Previous price            | [Currency]/kWh    | The price of the previous hour.                                                   |
| Next price                | [Currency]/kWh    | The price of the next hour.                                                       |
| Daily average             | [Currency]/kWh    | The average of today's energy prices.                                             |
| Lowest price              | [Currency]/kWh    | Today's lowest price (start and end time are provided in state attributes)        |
| Highest price             | [Currency]/kWh    | Today's highest price (start and end time are provided in state attributes)       |

### Peak & off-peak sensors

Additional sensors are provided for peak and off-peak blocks.

- Peak refers to the price of the period from 8am to 8pm.
- Off-peak 1 refers to the price of the time period from midnight to 8am.
- Off-peak 2 refers to the average price of the time period from 8pm to midnight.

<p class='img'>
  <img src='/images/integrations/nordpool/nordpool-blocks.png' alt='Time blocks'>
</p>

| Sensor                          | Type              | Description                                                                       |
| ------------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| [peak/off-peak] highest price   | [Currency]/kWh    | The hightest hourly price during the given timeframe.                             |
| [peak/off-peak] lowest  price   | [Currency]/kWh    | The lowest hourly price during the given timeframe.                               |
| [peak/off-peak] average         | [Currency]/kWh    | The average price of the given timeframe.                                         |
| [peak/off-peak] time from       | Datetime          | The start date/time of the given timeframe.                                       |
| [peak/off-peak] time until      | Datetime          | The end date/time of the given timeframe.                                         |

The block price sensors are not enabled by default.

### Diagnostic sensors

| Sensor                    | Type              | Description                                                                       |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------- |
| Currency                  | [Currency]        | The configured currency.                                                          |
| Exchange rate             | Integer           | The exchange rate between the configure currency and Euro's.                      |
| Last updated              | Datetime          | The time when the market prices were last updated.                                |

## Actions

### Get price for date

The integration entities provide price information only for the current date. Use the "Get price for date" action to retrieve pricing information for any date within the last two months or for tomorrow.

The areas and currency parameters are optional. If omitted, the values configured in the integration will be used.

See [examples](#examples) how to use in a trigger template sensor.

{% configuration_basic %}
Nord Pool configuration entry:
  description: Select the Nord Pool configuration entry to target.
Date:
  description: Pick the date to fetch prices for (see note about possible dates below).
Areas:
  description: Select one market area to create output for. If omitted it will use the areas from the configuration entry.
Currency:
  description: Currency to display prices in. EUR is the base currency in Nord Pool prices.  If omitted it will use the currency from the configuration entry.
{% endconfiguration_basic %}

{% note %}

The public API only allows us to see past pricing information for up to 2 months.

Tomorrow's prices are typically released around 13:00 CET, and trying to get them before that time will generate an error that needs to be considered in such a case.

{% endnote %}

#### Example action with data

{% raw %}

```yaml
action: nordpool.get_prices_for_date
data:
  config_entry: 1234567890a
  date: "2024-11-10"
  areas:
    - SE3
    - SE4
  currency: SEK
```

{% endraw %}

## Examples

A template sensor to add VAT and fixed cost is useful to get the actual energy cost in the energy dashboard.

### UI Template

Create a helper using the UI.

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %} and at the top, choose the **Helpers** tab.
2. In the bottom right corner, select **Create helper**.
3. Select **Template** and **Template a sensor**.
4. Enter the fields as shown below.

The template below takes the current price attributes, adds 0.1293 EUR as fixed costs and adds 21% VAT.

<p class='img'>
  <img src='/images/integrations/nordpool/nordpool_create_template.png' alt='Screenshot: Create template sensor'>
</p>

### YAML Template

A template sensor to add VAT and a fixed cost from an helper entity `input_number.add_fixed_cost`.

{% raw %}

```yaml
template:
  - sensor:
      - name: "Nordpool"
        unit_of_measurement: "EUR/kWh"
        state_class: measurement
        state: >
          # create a variable with the current price
          {% set cost = states('sensor.nord_pool_nl_current_price') | float(0) %}
          # create a variable with the additional fixed cost
          {% set add_cost = states('input_number.add_fixed_cost') | float(0) %}
          # Add cost and additional fixed cost. Add VAT (25%) by multiplying with 1.25 and round to 2 digits: 
          {{ ((cost + add_cost) * 1.25) | round(2, default=0) }}
```

{% endraw %}

### Tomorrow's lowest price

Using a trigger template, you can create a template sensor to calculate tomorrow's lowest price which also puts the list of all prices in the attributes of the sensor. All prices are returned in [Currency]/MWh.

{% note %}
You need to replace the `config_entry` with your own Nord Pool config entry id.

Below example will convert the action call response to kWh prices in the selected currency and add all prices for tomorrow as a list in an attribute.
{% endnote %}

{% raw %}

```yaml
template:
  - trigger:
      - trigger: time_pattern
        minutes: /10
      - trigger: homeassistant
        event: start
    action:
      - action: nordpool.get_prices_for_date
        data:
          config_entry: 01JEDAR1YEHJ6DZ376MP24MRDG
          date: "{{ now().date() + timedelta(days=1) }}"
          areas: SE3
          currency: SEK
        response_variable: tomorrow_price
    sensor:
      - name: Tomorrow lowest price
        unique_id: se3_tomorrow_low_price
        state: >
          {% if not tomorrow_price %}
            unavailable
          {% else %}
            {% set data = namespace(prices=[]) %}
            {% for state in tomorrow_price['SE3'] %}
              {% set data.prices = data.prices + [(state.price / 1000)] %}
            {% endfor %}
            {{min(data.prices)}}
          {% endif %}
        attributes:
          data: >
            {% if not tomorrow_price %}
              []
            {% else %}
              {% set data = namespace(prices=[]) %}
              {% for state in tomorrow_price['SE3'] %}
                {% set data.prices = data.prices + [{'start':state.start, 'end':state.end, 'price': state.price/1000}] %}
              {% endfor %}
              {{data.prices}}
            {% endif %}
```

{% endraw %}

<p class='img'>
  <img src='/images/integrations/nordpool/nordpool_tomorrow_lowest_price.png' alt='Screenshot: Trigger template: Tomorrow lowest price'>
</p>

### Energy Dashboard

To use the Nordpool integration in the **Energy** dashboard, when configuring grid consumption and production, use the **Use an entity with current price** option.

<p class='img'>
  <img src='/images/integrations/nordpool/nordpool_energy_dashboard.png' alt='Screenshot: Create template sensor'>
</p>

## Remove the integration

{% include integrations/remove_device_service.md %}
