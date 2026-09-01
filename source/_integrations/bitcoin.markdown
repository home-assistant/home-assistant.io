---
title: Bitcoin
description: Instructions on how to integrate Bitcoin data within Home Assistant.
ha_category:
  - Finance
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: bitcoin
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@Nihvel'
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs
ha_config_flow: true
ha_quality_scale: legacy
---

The **Bitcoin** {% term integration %} shows you details about the [Bitcoin](https://bitcoin.org) network, such as the current exchange rate, the network hash rate, and how busy the network has been over the last 24 hours. The data comes from the public [blockchain.com](https://www.blockchain.com/explorer) API, so you do not need an account or an API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Currency:
  description: "The currency the Bitcoin exchange rate is shown in. The list only offers currencies that blockchain.com quotes, and defaults to `USD`."
{% endconfiguration_basic %}

To change the currency later:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select the **Bitcoin** integration.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Reconfigure**.
3. Select the new currency, and then select **Submit**.

## Supported functionality

The **Bitcoin** integration provides the following entities. All of them are created, so if you only want a few, hide or disable the rest in the entity settings. They are all filled from the same two API calls, so hiding an entity does not change how often Home Assistant contacts blockchain.com.

### Sensors

- **Exchange rate (1 BTC)**
  - **Description**: Price of 1 BTC in the currency you selected, based on the 15 minute average price.
- **Market price**
  - **Description**: Price of 1 BTC in USD.
- **Trade volume**
  - **Description**: BTC traded on major exchanges in the last 24 hours.
- **Trade volume**
  - **Description**: The same trade volume, expressed in USD.
- **Miners revenue**
  - **Description**: Coins earned by miners in the last 24 hours, in USD.
- **Miners revenue**
  - **Description**: The same revenue, expressed in BTC.
- **Mined**
  - **Description**: New BTC created in the last 24 hours.
- **Mined Blocks**
  - **Description**: Number of blocks mined in the last 24 hours.
- **Block size**
  - **Description**: Combined size of the blocks mined in the last 24 hours, in bytes.
- **Difficulty**
  - **Description**: How hard it currently is to mine a block.
- **Time between Blocks**
  - **Description**: Average number of minutes between blocks.
- **No. of Transactions**
  - **Description**: Number of transactions confirmed in the last 24 hours.
- **Hash rate**
  - **Description**: Estimated computing power of the whole network, in PH/s.
- **Total fees**
  - **Description**: Transaction fees paid to miners in the last 24 hours, in BTC.
- **Total sent**
  - **Description**: Value of all transaction outputs in the last 24 hours, in BTC.
- **Estimated sent**
  - **Description**: Estimate of the same value with change outputs left out, in BTC.
- **Total**
  - **Description**: All BTC in circulation.
- **Total Blocks**
  - **Description**: Number of blocks in the chain.
- **Next retarget**
  - **Description**: Block height at which the mining difficulty changes next.
- **Est. Transaction volume**
  - **Description**: Estimated value moved in the last 24 hours, in USD.
- **Timestamp**
  - **Description**: When blockchain.com produced these numbers.

Two names are used twice. **Trade volume** and **Miners revenue** each exist once in BTC and once in USD, so one of each pair gets a `_2` suffix in its entity ID: `sensor.trade_volume` is the BTC one and `sensor.trade_volume_2` the USD one, while `sensor.miners_revenue` is the USD one and `sensor.miners_revenue_2` the BTC one.

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
   - You had the `bitcoin` sensor platform listed more than once with different currencies. Bitcoin can only be set up once, so only the first currency was imported. Remove the YAML, then select **Reconfigure** on the integration to pick the currency you want.

Your existing sensors keep the entity IDs they already had, so dashboards and automations that use them keep working. You do get extra sensors: the YAML `display_options` setting is gone, because a config flow should not ask you to pick entities, so all 21 sensors are now created. Hide or disable the ones you do not want in the entity settings.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
