---
title: Elvia
description: Documentation for the Elvia integration.
ha_category:
  - Energy
ha_release: 9999.9 #placeholder version
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ludeeus'
ha_domain: elvia
ha_config_flow: true
ha_integration_type: integration
---

The Elvia integration will import you grid consumption.
You can use the Elvia integration, regardless of which provider you are subscribed to as long as Elvia operates the grid.

The imported data can be used in the [Energy dashboard](/docs/energy/) and with the [statistics-graph card](/dashboards/statistics-graph/).

## Setup

To use this integration, you need to create an API token.

1. Start by logging in to your [Min side](https://www.elvia.no/logg-inn/)
2. Once you are logged in, select your main account (This will usually be the one with your name on it).
3. Select the "Tilganger" tab.
4. Under the "" section, select the "Opprett token for målerverdier i API"
5. In the dialog select the meter(s) ([see note below about multiple meters](#multiple-meters-for-a-single-api-token)) you want to import values for, give it a name (like "Home Assistant integrasjon") and use the "Opprett" button to create your token.
6. Copy the token shown in the dialog, and paste that in the integration configuration.

{% include integrations/config_flow.md %}

## Updates

The integration will fetch new data every hour.
The first time it runs the data for the past year will be imported.

## Multiple meters for a single API token

While you can select multiple meters when you create your token, the integration will only allow 1 meter for each configuration of it.
So if you are using the same token for multiple meters, you need to add the integration multiple times and selecting a different meter each time.
