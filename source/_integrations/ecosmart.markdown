---
title: ecosmart
description: Instructions on how to integrate ecosmart wholesale electricity prices into Home Assistant.
ha_categories:
  - energy.energy_prices
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Daryn-L'
ha_domain: ecosmart
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://www.ecosmart.co.nz/electricity/api/home-assistant/
    title: ecosmart API documentation
---

[ecosmart](https://www.ecosmart.co.nz/) is a New Zealand electricity retailer that passes the half-hourly wholesale (spot) price of electricity straight through to its customers.

The **ecosmart** {% term integration %} brings that price into Home Assistant, so you can move consumption into the cheap half hours.

ecosmart publishes the price signal. It never controls your inverter, battery, or charger.

## Prerequisites

You need an ecosmart electricity account with at least one connected property, and an API key that you create yourself.

To create a key, open the ecosmart app and go to **More** > **Settings** > **Advanced** > **API keys**.

{% important %}
Creating a new key disables the previous one. If you already use your ecosmart API key somewhere else, creating a key for Home Assistant stops that other tool working. Creating a key elsewhere later stops Home Assistant working until you remove the integration and add it again with the new key.
{% endimportant %}

If your switch to ecosmart has not completed yet, a key can already exist while no connection point is attached to it. Setup then reports that the key has no connection points. Try again once the property is live.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you created in the ecosmart app under **More** > **Settings** > **Advanced** > **API keys**."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one service device for every <abbr title="Installation Control Point">ICP</abbr> the API key can reach. An ICP is the fifteen-character number that identifies a New Zealand electricity connection, and it appears on your bill. If you have several properties, you get one device per property, each named by its ICP and modeled by its grid exit point, which is the substation where the local network draws power off the national grid.

Every device carries one sensor. It reports cents per kWh including <abbr title="goods and services tax">GST</abbr>, the unit New Zealand power bills are written in. This is the wholesale energy price, not the complete retail rate; network losses, lines charges, metering, levies, and the ecosmart service fee are not included. Prices can be negative when the market is oversupplied. That is genuine, and the sensor passes it straight through.

### Sensors

- **Spot price**
  - **Description**: The wholesale price at your grid exit point right now.

{% include integrations/actions.md %}

## Data updates

The integration {% term polling polls %} the ecosmart API for each grid exit point rather than for each ICP, so several properties behind the same substation share one request.

The market republishes the spot price roughly every five minutes, and the integration polls on the same cadence.

## Known limitations
### Price availability

The sensor does not guess. When it does not have a value it can stand behind, it reports `unavailable`, and your automations should handle that.

- The spot price is unavailable when the most recent published price is stale, or carries no value. A price more than about fifteen minutes old must never be what tells a battery to charge.
- The spot price is unavailable while the ecosmart API cannot be reached, and it recovers on the next successful poll.

### API key replacement

Re-authentication is not supported yet. If a newer key has replaced the one Home Assistant holds, remove the integration and add it again with the current key.

### Energy dashboard costs

The spot price is in cents per kWh, and it is the wholesale price only. Don't use it as the electricity price in the [Energy dashboard](/docs/energy/). The dashboard would treat the value as dollars per kWh, so costs would come out 100 times too high, and they would still leave out line charges, losses, and fees.

### Adding or removing a property

New properties on your ecosmart account are added when you reload the integration. A property that leaves your account keeps its device in Home Assistant until you remove the integration and add it again.

## Troubleshooting

{% details "Setup reports that the key has no connection points" %}

### Symptom: The API key has no connection points

During setup, the form reports that the key has no connection points yet. The key is valid, but no property is attached to it. This is normal while a switch to ecosmart is still in progress.

#### Resolution

Try again once the property is live.

{% enddetails %}

{% details "The sensor stopped updating and the entry reports an authentication failure" %}

### Symptom: Authentication fails after replacing the API key

The sensor stops updating and the integration reports an authentication failure after the API key was replaced. Creating a key anywhere else disables the key Home Assistant is using.

#### Resolution

Remove the integration, create a new key in the ecosmart app, and add the integration again. Entity IDs are derived from the ICP, so they come back identical and your automations keep working.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not revoke the API key. To revoke it, create a new key in the ecosmart app, which disables the old one.
