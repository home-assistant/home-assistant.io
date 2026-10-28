---
description: Instructions on how to integrate Bitcoin data within Home Assistant.
ha_release: pre 0.7
ha_domain: bitcoin
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs
---

The **Bitcoin** {% term integration %} shows you details about the [Bitcoin](https://bitcoin.org) network, such as the current exchange rate, the network hash rate, and how busy the network has been over the last 24 hours. The data comes from the public [blockchain.com](https://www.blockchain.com/explorer) API, so you do not need an account or an API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Currency:
  description: "The currency the Bitcoin exchange rate is shown in. The list only offers currencies that blockchain.com quotes, and defaults to `USD`."
{% endconfiguration_basic %}

To change the currency later, remove the integration and add it again with the new currency.

## Supported functionality

The **Bitcoin** integration provides the following entities. All of them are created and filled from the same two API calls. If you only need a few, hide or disable the others in the entity settings.

### Sensors

- **Exchange rate**
  - **Description**: Price of 1 BTC in the currency you selected, based on the 15 minute average price.
- **Market price**
  - **Description**: Price of 1 BTC in USD.
- **Trade volume**
  - **Description**: BTC traded on major exchanges in the last 24 hours.
- **Trade volume in USD**
  - **Description**: The same trade volume, expressed in USD.
- **Miners revenue**
  - **Description**: Coins earned by miners in the last 24 hours, in BTC.
- **Miners revenue in USD**
  - **Description**: The same revenue, expressed in USD.
- **Mined**
  - **Description**: New BTC created in the last 24 hours.
- **Mined blocks**
  - **Description**: Number of blocks mined in the last 24 hours.
- **Blocks size**
  - **Description**: Combined size of the blocks mined in the last 24 hours, in bytes.
- **Difficulty**
  - **Description**: How hard it currently is to mine a block.
- **Time between blocks**
  - **Description**: Average number of minutes between blocks.
- **Transactions**
  - **Description**: Number of transactions confirmed in the last 24 hours.
- **Hash rate**
  - **Description**: Estimated computing power of the whole network, in PH/s.
- **Total fees**
  - **Description**: Transaction fees paid to miners in the last 24 hours, in BTC.
- **Total sent**
  - **Description**: Value of all transaction outputs in the last 24 hours, in BTC.
- **Estimated sent**
  - **Description**: Estimate of the same value with change outputs left out, in BTC.
- **Total supply**
  - **Description**: All BTC in circulation.
- **Total blocks**
  - **Description**: Number of blocks in the chain.
- **Next retarget**
  - **Description**: Block height at which the mining difficulty changes next.
- **Estimated transaction volume**
  - **Description**: Estimated value moved in the last 24 hours, in USD.
- **Statistics timestamp**
  - **Description**: When blockchain.com produced these numbers.

The entity IDs come from these names, for example `sensor.bitcoin_trade_volume_in_usd`. Sensors that already existed in Home Assistant keep the entity IDs they had, so an older setup can have two trade volume sensors or two miners revenue sensors told apart by a `_2` suffix, for example `sensor.trade_volume` and `sensor.trade_volume_2`.

## Data updates

The **Bitcoin** integration {% term polling polls %} blockchain.com every 5 minutes. One poll refreshes every entity. This interval is not configurable.

## Known limitations

Both **Miners revenue** sensors report `0`, and **Total fees** reports a negative value. These numbers come straight from the blockchain.com statistics API, which currently returns them incorrectly.

The exchange rate is a 15 minute average price rather than a live price, so it lags the market slightly.

## Troubleshooting

If no tip here resolves your issue, feel free to [open a bug](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=Bitcoin&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Fbitcoin) and make sure to include the [debug logs](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

### Can't set up the integration

#### Symptom: "Failed to connect"

When you try to add the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant asks blockchain.com which currencies it quotes before it shows you the form. If that request does not succeed, there is nothing to offer you in the currency list, so the setup stops.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure your Home Assistant instance can reach the internet.
2. Open the [currency ticker](https://blockchain.info/ticker) the integration uses in a browser to check that the service is up.
3. Add the integration again.

### A repair issue asks you to remove the YAML configuration

#### Symptom: "The Bitcoin YAML configuration is being removed"

After an upgrade, the repairs dashboard shows a Bitcoin issue.

#### Description

The integration is now set up from the UI. On restart, Home Assistant reads the currency from your existing YAML configuration and creates the integration for you.

#### Resolution

To resolve this issue, try the following steps:

1. Remove the `bitcoin` sensor platform from your {% term "`configuration.yaml`" %} file.
2. Restart Home Assistant.
3. If a second issue says the import did not succeed, it also says why:
   - Home Assistant could not reach blockchain.com. Restart Home Assistant later to try again.
   - The currency in your YAML file is not one that blockchain.com quotes. Correct it and restart, or remove the YAML and add the integration from the UI.
   - You had the `bitcoin` sensor platform listed more than once with different currencies. Bitcoin can only be set up once, so only the first currency was imported. Remove the YAML, then remove the integration and add it again with the currency you want.

The imported sensors get new entity IDs from the new names, for example `sensor.exchange_rate_1_btc` becomes `sensor.bitcoin_exchange_rate`. Update the dashboards and automations that use them. You also get extra sensors: the YAML `display_options` setting is gone, because a config flow should not ask you to pick entities, so all 21 sensors are now created.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
