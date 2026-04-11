---
title: Data Grand Lyon
description: Instructions on how to integrate Grand Lyon open data into Home Assistant.
ha_release: 2026.5
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
ha_quality_scale: bronze
---

The **Data Grand Lyon** {% term integration %} lets you monitor data from the [Grand Lyon open data platform](https://data.grandlyon.com/) (city of Lyon, France).

With this integration, you can:

- Track upcoming departure times at transit stops, including whether times are estimated or theoretical.
- Monitor Vélo'v bike-sharing station availability, with a breakdown of electrical bikes, mechanical bikes and stands.

## Prerequisites

This integration uses data from the [Grand Lyon open data platform](https://data.grandlyon.com/).

- **For transit stop monitoring**: You need an account on [data.grandlyon.com](https://data.grandlyon.com/). Sign up for a free account if you don't have one. Then, request access to the [dataset](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info).
- **For Vélo'v station monitoring**: No account is required.

You also need to know the stop IDs or station IDs you want to monitor. You can find these on the [Grand Lyon data portal](https://data.grandlyon.com/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username on data.grandlyon.com. Required if you want to monitor transit stops."
  required: inclusive
  type: string
Password:
  description: "Your password on data.grandlyon.com. Required if you want to monitor transit stops."
  required: inclusive
  type: string
{% endconfiguration_basic %}

After setting up the integration, you can add transit stops and Vélo'v stations as sub-entries from the integration's configuration page.

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
Name:
  description: "An optional custom name for this stop. If left empty, a default name is generated from the line and stop ID."
  required: false
  type: string
{% endconfiguration_basic %}

### Adding a Vélo'v station

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add Vélo'v station**.
3. Enter the following information:

{% configuration_basic %}
Station ID:
  description: "The Vélo'v station ID. You can find this on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/stations-velo-v-metropole-lyon/donnees). Zoom on the map and click on a station. The ID will be displayed on the panel on the right, at the top. The field is called `idstation`."
  required: true
  type: integer
{% endconfiguration_basic %}

The station name is automatically retrieved from the API.

## Supported functionality

### Entities

The **Data Grand Lyon** integration provides the following entities.

#### Transit stop sensors

For each transit stop you add, the following sensor entities are created:

- **Next passage 1**
  - **Description**: The departure time of the next vehicle at this stop.
  - **Attributes**: Line, direction, and type (estimated or theoretical).

- **Next passage 2**
  - **Description**: The departure time of the second next vehicle at this stop.
  - **Attributes**: Line, direction, and type (estimated or theoretical).

- **Next passage 3**
  - **Description**: The departure time of the third next vehicle at this stop.
  - **Attributes**: Line, direction, and type (estimated or theoretical).

The passage type indicates whether the time is an _estimated_ arrival (based on real-time vehicle tracking) or a _theoretical_ arrival (based on the scheduled timetable).

#### Vélo'v station sensors

For each Vélo'v station you add, the following sensor entities are created:

- **Available bikes**: The total number of bikes currently available at the station.
- **Available electrical bikes**: The number of electrical bikes available.
- **Available mechanical bikes**: The number of mechanical bikes available.
- **Available bike stands**: The number of free parking stands at the station.

## Data updates

The integration polls data from the Data Grand Lyon API every minute.

## Known limitations

- Transit stop monitoring requires an account on data.grandlyon.com. Without credentials, you can only monitor Vélo'v stations.
- The integration provides up to three upcoming passages per stop. If fewer passages are available, the remaining sensors show as unavailable.
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

### Vélo'v station not found

Make sure the station ID is correct. You can find station IDs on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/stations-velo-v-metropole-lyon/donnees).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
