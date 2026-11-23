---
description: Instructions on how to integrate ecosmart wholesale electricity prices into Home Assistant.
ha_release: 2026.11
ha_domain: ecosmart
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
Creating a new key disables the previous one. If you already use your ecosmart API key somewhere else, creating a key for Home Assistant stops that other tool working. If you create another key later, Home Assistant asks you for it; see [Replacing the API key](#replacing-the-api-key).
{% endimportant %}

If your switch to ecosmart has not completed yet, a key can already exist while no connection point is attached to it. Setup then reports that the key has no connection points. Try again once the property is live.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you created in the ecosmart app under **More** > **Settings** > **Advanced** > **API keys**."
{% endconfiguration_basic %}

## Replacing the API key

Creating a new key in the ecosmart app disables the one Home Assistant is using. You do not need to remove the integration. Give Home Assistant the new key in either of these ways:

If Home Assistant has already noticed that the old key was rejected, the ecosmart entry shows under **Needs attention**. This happens within about five minutes. Select **Reconfigure** there and enter the new key.

To enter the new key straight away:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **ecosmart**.
2. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Enter the new key and select **Submit**.

The new key must belong to the same ecosmart account. A key for a different account is refused and the old key stays in place. To add another account, add the integration again.

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not revoke the API key. To revoke it, create a new key in the ecosmart app, which disables the old one.
