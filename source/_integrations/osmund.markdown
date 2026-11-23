---
title: Osmund
description: Instructions on how to integrate electricity prices from Osmund into Home Assistant.
ha_release: 2027.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@maziarzamani'
ha_domain: osmund
ha_integration_type: service
ha_config_flow: true
ha_platforms:
  - sensor
ha_quality_scale: bronze
ha_categories:
  - energy.energy_prices
---

The **Osmund** {% term integration %} shows your electricity prices from [Osmund](https://osmundenergi.dk/), a licensed Danish electricity supplier. It reads them from the [Osmund API](https://osmundenergi.dk/docs/osmund-api/) and never changes anything on your account.

Use case: Start the dishwasher at the time of today's lowest price, or show on a dashboard what electricity costs now and next.

## Prerequisites

1. Be an Osmund customer with a location that has API access. See [Access](https://osmundenergi.dk/docs/osmund-api/#tag/access) for who can use the API.
2. Sign in to [**Min side**](https://osmundenergi.dk/min-side#api), Osmund's customer page.
3. Under **API-adgang**, select **Opret nøgle**. The key starts with `osm_` and is shown only once.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "Your personal key from **Min side**. It starts with `osm_`."
{% endconfiguration_basic %}

## Supported functionality

The **Osmund** integration creates a device for each of your locations with API access, with the following entities.

### Sensors

Prices are per hour, or per quarter hour where your meter measures quarter hours, in DKK/kWh including <abbr title="value-added tax">VAT</abbr>.

- **Electricity price now**
  - **Description**: The price of the current hour or quarter hour.
- **Next electricity price**
  - **Description**: The price of the next hour or quarter hour. After the last one of the day, it is unknown until tomorrow's prices are published.
- **Lowest electricity price today**
  - **Description**: The price of the cheapest hour or quarter hour of the day.
- **Highest electricity price today**
  - **Description**: The price of the most expensive hour or quarter hour of the day.
- **Average electricity price today**
  - **Description**: The average price of the day.
- **Time of lowest electricity price today**
  - **Description**: When the cheapest hour or quarter hour of the day starts. If several are equally cheap, the earliest.
- **Time of highest electricity price today**
  - **Description**: When the most expensive hour or quarter hour of the day starts. If several are equally expensive, the earliest.

## Osmund automation examples

{% include docs/paste_yaml_tip.md %}

### Start the dishwasher at today's lowest price

Fill the dishwasher, and let it start when the cheapest hour or quarter hour of the day begins. A time trigger only fires at a time that is still ahead, so if the cheapest time has already passed, the dishwasher waits for tomorrow's.

- **Trigger**: Time: at the time of the sensor **Time of lowest electricity price today**
- **Action**: Turn on the switch of the dishwasher

{% details "YAML example for starting the dishwasher at today's lowest price" %}

In this example, `hjem` is the name of the location, and `switch.dishwasher` is the switch of the dishwasher.

{% example %}
automation: |
  alias: "Start the dishwasher at today's lowest price"
  triggers:
    - trigger: time
      at: sensor.hjem_time_of_lowest_electricity_price_today
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

## Data updates

The **Osmund** integration {% term polling polls %} the Osmund API every 30 minutes. It reads today's prices once, and tomorrow's from 13:00 Danish time until they are published. The sensors move to the next price when it starts, without a new call.

The API counts the calls of all your keys together. The integration uses about 50 to 60 calls a day for one location. When the API answers that the calls are used up, the integration waits as long as the API says. See [Limits](https://osmundenergi.dk/docs/osmund-api/#tag/limits).

## Known limitations

- A key works for at most a year. When it expires, remove the integration and add it again with a new key.
- You can have one active key at a time, so Home Assistant and your other tools share it.
- Prices are for today and tomorrow only.
- One Osmund account can be set up. A key reads every location of the account.

## Troubleshooting

{% details "The key is refused during setup" %}

### Symptom: "This is not an Osmund key"

#### Description

The text you pasted does not start with `osm_`. It is not a key from **Min side**, or part of it is missing.

#### Resolution

Copy the whole key again. If you no longer have it, it cannot be shown again: on **Min side**, under **API-adgang**, revoke it and create a new one.

### Symptom: "Invalid authentication"

#### Description

The key has expired or has been revoked.

#### Resolution

Create a new key on **Min side**, under **API-adgang**, and use it.

### Symptom: "The key cannot read prices"

#### Description

The key was created without access to prices.

#### Resolution

On **Min side**, under **API-adgang**, revoke the key, create a new one, and use it.

{% enddetails %}

{% details "None of your locations has API access" %}

### Symptom: "None of your locations has API access"

#### Description

The key works, but none of the locations on your account has API access. See [Access](https://osmundenergi.dk/docs/osmund-api/#tag/access) for who can use the API.

#### Resolution

Contact [Osmund's customer service](https://osmundenergi.dk/kundeservice).

{% enddetails %}

{% details "The Osmund API is busy" %}

### Symptom: "The Osmund API is busy right now"

#### Description

The calls of all your keys together have reached the limit for now. See [Limits](https://osmundenergi.dk/docs/osmund-api/#tag/limits).

#### Resolution

Wait a minute and try again. If it keeps happening, check what else uses your key.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing it, you can revoke the key on **Min side**, under **API-adgang**.
