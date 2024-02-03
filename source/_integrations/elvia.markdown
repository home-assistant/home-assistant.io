---
title: Elvia
description: Documentation for the Elvia integration.
ha_category:
  - Energy
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ludeeus'
ha_domain: elvia
ha_config_flow: true
ha_integration_type: integration
---

The Elvia integration will import your historical grid consumption.
You can use the Elvia integration, regardless of which provider you are subscribed to as long as Elvia operates the grid, if you are unsure about if this can work for you. Login to [Min side](https://www.elvia.no/logg-inn/) if you see a meter there, you can use it.

The imported data can be used in the [Energy dashboard](/docs/energy/) and with the [statistics-graph card](/dashboards/statistics-graph/).

## Prerequisites

To use this integration, you need to create an API token.

1. Start by logging in to your [Min side](https://www.elvia.no/logg-inn/).
2. Once logged in, select your main account (Usually the one with your name on it).
3. Select the **Tilganger** tab.
4. Under the "" section, select the **Opprett token for målerverdier i API**.
5. In the dialog, select the meter(s) ([see note below about multiple meters](#multiple-meters-for-a-single-api-token)) you want to import values for, give it a name (like "Home Assistant integrasjon") and use the **Opprett** button to create your token.
6. Copy the token shown in the dialog, and paste that in the integration configuration.

{% include integrations/config_flow.md %}

## Updates

The integration will fetch new data every hour.
The first time it runs, the data for the past 3 years will be imported.

The consumption data that is shown both on [Min side](https://www.elvia.no/logg-inn/) and in Elvia's app is the same data as this integration will use. And until the data is updated in those dashboards (which happens once every hour), the data will not be available in Home Assistant.

If you are after instant monitoring of your consumption you would have to use another integration, like [Tibber](/integrations/tibber/).

## Multiple meters for a single API token

While you can select multiple meters when you create your token, the integration will only allow 1 meter for each configuration.
So if you are using the same token for multiple meters, you must add the integration multiple times and select a different meter each time.
