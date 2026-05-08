---
title: Data Grand Lyon
description: Instructions on how to integrate Grand Lyon open data into Home Assistant.
ha_release: 2026.6
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Crocmagnon'
ha_domain: data_grand_lyon
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **Data Grand Lyon** {% term integration %} lets you monitor data from the [Grand Lyon open data platform](https://data.grandlyon.com/) (city of Lyon, France).

With this integration, you can track upcoming departure times at transit stops.

## Prerequisites

This integration uses data from the [Grand Lyon open data platform](https://data.grandlyon.com/).

You need an account on [data.grandlyon.com](https://data.grandlyon.com/). Sign up for a free account if you don't have one. Then, request access to the [dataset](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info). You can find more information about how to properly create an account and set a password [here](https://rdata-grandlyon.readthedocs.io/fr/latest/authentification.html) (fr).

You also need to know the stop IDs you want to monitor. You can find these on the [Grand Lyon data portal](https://data.grandlyon.com/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username on data.grandlyon.com."
  required: true
  type: string
Password:
  description: "Your password on data.grandlyon.com."
  required: true
  type: string
{% endconfiguration_basic %}

After setting up the integration, you can add transit stops as sub-entries from the integration's configuration page.

### Adding a transit stop

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add transit stop**.
3. Enter the following information:

{% configuration_basic %}
Line:
  description: "The transit line identifier (for example, `C1` or `T2`)."
  required: true
  type: string
Stop ID:
  description: "The stop identifier. You can find the stop identifier on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info). Zoom on the map and click on a stop. The ID will be displayed on the panel on the right, at the bottom. The field is called `id`."
  required: true
  type: integer
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Data Grand Lyon** integration provides the following entities.

#### Transit stop sensors

For each transit stop you add, the following sensor entities are created:

- **Next departure 1**
  - **Description**: The departure time of the next vehicle at this stop.

- **Next departure 1 direction**
  - **Description**: The direction (destination) of the next vehicle at this stop.

- **Next departure 1 type**
  - **Description**: Whether the departure time is _estimated_ (based on real-time vehicle tracking) or _theoretical_ (based on the scheduled timetable).

- **Next departure 2**
  - **Description**: The departure time of the second next vehicle at this stop.

- **Next departure 2 direction** (disabled by default)
  - **Description**: The direction (destination) of the second next vehicle at this stop.

- **Next departure 2 type** (disabled by default)
  - **Description**: Whether the departure time is _estimated_ or _theoretical_.

- **Next departure 3**
  - **Description**: The departure time of the third next vehicle at this stop.

- **Next departure 3 direction** (disabled by default)
  - **Description**: The direction (destination) of the third next vehicle at this stop.

- **Next departure 3 type** (disabled by default)
  - **Description**: Whether the departure time is _estimated_ or _theoretical_.

## Data updates

The integration polls data from the Data Grand Lyon API every 5 minutes by default.

## Known limitations

- The integration provides up to three upcoming departures per stop. If fewer departures are available, the remaining sensors show as unavailable.
- There is no estimated data for subways, only theoretical.

## Troubleshooting

### Can't set up the integration

#### Symptom: "Invalid authentication"

When trying to set up the integration, the form shows the message "Invalid authentication".

##### Description

This means the username or password you entered is incorrect.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure you are using your [data.grandlyon.com](https://data.grandlyon.com/) credentials.
2. Log in to the Grand Lyon data portal directly to verify your credentials work.
3. If you forgot your password, reset it on the Grand Lyon data portal.

### Transit stop shows no data

Make sure the line identifier and stop ID are correct. You can verify these on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
