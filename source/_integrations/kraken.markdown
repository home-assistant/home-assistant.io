---
title: Kraken
description: Instructions on how to integrate Kraken.com sensors into Home Assistant.
logo: kraken.svg
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.113
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
---

The `kraken` integration allows you to monitor exchange rates on [kraken.com](https://www.kraken.com/).
For a list of tradable asset pairs check this [this kraken support article](https://support.kraken.com/hc/en-us/articles/201893658-Currency-pairs-available-for-trading-on-Kraken).

## Configuration

Set up the integration through **Configuration -> Integrations -> Kraken**.

{% configuration %}
source_asset:
  description: The Source Asset of your exchange pair.
  required: true
  type: string
target_asset:
  description: The Target Asset of your exchange pair.
  required: true
  type: string
{% endconfiguration %}

## Integration Entities

Each added configuration entry for this integration will create the following sensors for the tracked asset pair:

`ask`,`ask_volume`, `bid`, `bid_volume`, `volume_today`, `volume_last_24h`, `volume_weighted_average_today`, `volume_weighted_average_last_24h`,
`number_of_trades_today`, `number_of_trades_last_24h`, `last_trade_closed`, `low_today`, `low_last_24h`, `high_today`, `high_last_24h`, `opening_price_today`

For example the entity_id for  the ask price for the pair `ETH` and `EUR` will look like `sensor.eth_eur_ask`.
