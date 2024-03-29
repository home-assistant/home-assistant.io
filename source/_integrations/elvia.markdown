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
You can use the Elvia integration, regardless of which provider you are subscribed to, as long as Elvia operates the grid. If you are unsure if this works for you, log in to [Min side](https://www.elvia.no/logg-inn/) and check. If you see a meter there, you can use it.

Unlike most other integrations, this integration provides no entities. The imported data can be used in the [Energy dashboard](/docs/energy/) and with the [statistics-graph card](/dashboards/statistics-graph/).

## Prerequisites

To use this integration, you need to create an API token.

1. Start by logging in to your [Min side](https://www.elvia.no/logg-inn/).
2. Once logged in, select your main account (Usually the one with your name on it).
3. Select the **Tilganger** tab.
4. Under the **Tilgang til data** section, select the **Opprett token for målerverdier i API**.
5. In the dialog, select the meter(s) ([see note below about multiple meters](#multiple-meters-for-a-single-api-token)) you want to import values for, give it a name (like "Home Assistant integrasjon") and use the **Opprett** button to create your token.
6. Copy the token shown in the dialog and paste that into the integration configuration.

{% include integrations/config_flow.md %}

## Updates

The integration will fetch new data every hour.
The first time it runs, the data for the past three years will be imported.

The integration is scheduled to be updated hourly, so there will be some delay when you see the updated data inside Home Assistant compared to [Min side](https://www.elvia.no/logg-inn/) and Elvia's mobile apps.

If you are interested in real-time monitoring, this integration is not for you. In this case, you need to use a real-time metering integration like [Tibber](/integrations/tibber/).

## Multiple meters for a single API token

While you can select multiple meters when you create your token, the integration will only allow 1 meter for each configuration.
So, if you are using the same token for multiple meters, you must add the integration multiple times and select a different meter each time.
