---
title: Data Grand Lyon
description: Instructions on how to integrate Grand Lyon open data into Home Assistant.
ha_release: 2026.6
ha_category:
  - Calendar
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Crocmagnon'
ha_domain: data_grand_lyon
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: platinum
---

The **Data Grand Lyon** {% term integration %} lets you monitor data from the [Grand Lyon open data platform](https://data.grandlyon.com/) (city of Lyon, France).

With this integration, you can:

- Track upcoming departure times at transit stops.
- Monitor real-time bike and dock availability at [Vélo'v](https://velov.grandlyon.com/) bike-sharing stations.
- Monitor real-time parking space availability at TCL park & ride (P+R) facilities.
- Follow traffic alerts on transit lines: disruptions, roadworks and service information.

## Prerequisites

This integration uses data from the [Grand Lyon open data platform](https://data.grandlyon.com/).

You need an account on [data.grandlyon.com](https://data.grandlyon.com/). Sign up for a free account if you don't have one. You can find more information about how to properly create an account and set a password [in their documentation](https://rdata-grandlyon.readthedocs.io/fr/latest/authentification.html) (fr).

{% note %}
Some users have reported issues with passwords containing special characters. If you have issues authenticating, try changing your password to remove them.
{% endnote %}

If you want to monitor transit stops, you also need to request access to the [realtime next departures dataset](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info). This is not required for Vélo'v stations.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username on data.grandlyon.com."
Password:
  description: "Your password on data.grandlyon.com."
{% endconfiguration_basic %}

After setting up the integration, you can add transit stops, Vélo'v bike-sharing stations, park & ride facilities, and transit lines as sub-entries from the integration's configuration page.

### Adding a transit stop

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add transit stop**.
3. Select the stop you want to monitor. You can filter the list by stop name, address or city, or enter a stop ID directly. Address and city aren't always available.
4. Select the line you want to monitor on that stop. The list is pre-filtered by known lines on this stop. You can enter a line identifier directly.

{% configuration_basic %}
Stop ID:
  description: "The stop identifier. You can find the stop identifier on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/points-arret-reseau-transports-commun-lyonnais/donnees). Zoom in on the map and select a stop. The ID will be displayed at the bottom of the panel displayed on the right of the screen. The field is called **id**."
Line:
  description: "The transit line identifier (for example, `C1` or `T2`)."
{% endconfiguration_basic %}

### Adding a Vélo'v station

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add Vélo'v station**.
3. Select the station you want to monitor. You can filter the list by station name, address or city, or enter a station ID directly. Address and city aren't always available.

{% configuration_basic %}
Station:
  description: "The Vélo'v station identifier. You can find station IDs on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/stations-velo-v-metropole-lyon/donnees). Zoom in on the map and select a station. The ID will be displayed at the top of the panel displayed on the right of the screen. The field is called **idstation**."
{% endconfiguration_basic %}

### Adding a park & ride

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add park & ride**.
3. Select the park & ride you want to monitor. You can search the list by name, or enter a park & ride ID directly.

{% configuration_basic %}
Park & ride:
  description: "The park & ride identifier. You can find park & ride IDs on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/parcs-relais-reseau-transports-commun-lyonnais-disponibilites-temps-reel/donnees). Zoom in on the map and select a park & ride. The ID will be displayed in the panel on the right of the screen."
{% endconfiguration_basic %}

### Adding a transit line

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Data Grand Lyon** integration.
2. Select **Add transit line**.
3. Select the line you want to follow. You can enter a line code directly if it isn't in the list: a few lines have no pictogram and are therefore missing from it.

{% configuration_basic %}
Line:
  description: "The transit line code, as displayed to passengers (for example, `C3`, `A` or `T1`)."
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
  - **Description**: The departure time of the second vehicle at this stop.

- **Next departure 2 direction**
  - **Description**: The direction (destination) of the second vehicle at this stop. Disabled by default.

- **Next departure 2 type**
  - **Description**: Whether the departure time is _estimated_ or _theoretical_. Disabled by default.

- **Next departure 3**
  - **Description**: The departure time of the third vehicle at this stop.

- **Next departure 3 direction**
  - **Description**: The direction (destination) of the third vehicle at this stop. Disabled by default.

- **Next departure 3 type**
  - **Description**: Whether the departure time is _estimated_ or _theoretical_. Disabled by default.

#### Vélo'v station binary sensors

For each Vélo'v station you add, the following binary sensor entity is created:

- **Station open**
  - **Description**: Whether the Vélo'v station is open. On means the station is open and available for use. Off means the station is closed.

#### Vélo'v station sensors

For each Vélo'v station you add, the following sensor entities are created:

- **Available bikes**
  - **Description**: The total number of bikes currently available at the station.

- **Available mechanical bikes**
  - **Description**: The number of mechanical (non-electric) bikes available at the station.

- **Available electrical bikes**
  - **Description**: The number of electrical bikes available at the station.

- **Available stands**
  - **Description**: The number of free docking stands available at the station.

- **Capacity**
  - **Description**: The total number of docking stands at the station. Disabled by default.

- **Electrical internal battery bikes**
  - **Description**: The number of electrical bikes with an internal battery available at the station. Disabled by default.

- **Electrical removable battery bikes**
  - **Description**: The number of electrical bikes with a removable battery available at the station. Disabled by default.

#### Park & ride sensors

For each park & ride you add, the following sensor entities are created:

- **Available parking spaces**
  - **Description**: The number of parking spaces currently available at the facility.

- **Capacity**
  - **Description**: The total number of parking spaces at the facility.

- **Accessible parking spaces**
  - **Description**: The number of parking spaces reserved for people with reduced mobility. Disabled by default.

- **Opening hours**
  - **Description**: The opening hours of the facility. Disabled by default.

- **Name**
  - **Description**: The name of the park & ride facility. Disabled by default.

#### Transit line calendar

For each transit line you add, one calendar entity is created:

- **Alerts**
  - **Description**: The traffic alerts published for this line. The entity is _on_ while an alert is in progress and _off_ otherwise. Each alert is an event whose summary is the title published by TCL, and whose description carries the full message along with the cause (for example, `travaux` or `accident voyageur`) and the alert type (`Perturbation`, `Information` or `Information ligne`).

Alert text is published in French by the transport operator.

{% note %}
The integration reports the alert type exactly as TCL publishes it and does not
rank alerts by how disruptive they are. TCL labels roughly three alerts in four
as a disruption, including a single stop being moved for months, so the label
alone doesn't tell you how badly your journey is affected. Read the alert to
judge, or automate on the `cause`.
{% endnote %}

## Examples

### Refresh data more frequently during a time window

Get fresher upcoming-departure data before your commute without raising the polling rate the rest of the day. This blueprint refreshes a transit stop's sensors at a configurable interval inside a time window — by default, every minute between 8:00 and 9:00.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/data_grand_lyon_refresh_during_time_window.yaml" %}

{% details "Example YAML" %}

```yaml
triggers:
  - trigger: time_pattern
    minutes: "/1"
conditions:
  - condition: time
    after: "08:00:00"
    before: "09:00:00"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: sensor.my_stop_next_departure_1
```

{% enddetails %}

### Get notified when a traffic alert starts on your line

{% raw %}

```yaml
automation:
  - alias: "Notify on TCL line alert"
    mode: queued
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.line_c3_alerts
    actions:
      - action: notify.notify
        data:
          title: "Alert on line C3"
          message: "{{ trigger.calendar_event.summary }}"
```

{% endraw %}

Use `mode: queued`, as the calendar documentation requires: several alerts can
start at the same time, and `single` would drop all but the first.

## Data updates

The integration polls data from the Data Grand Lyon API every 5 minutes by default.

Calendar triggers are a Home Assistant feature that re-reads calendars every 15 minutes, so an automation triggered by an alert can fire up to 15 minutes after the alert starts.

## Known limitations

- The integration provides up to three upcoming departures per stop. If fewer departures are available, the remaining sensors show as unavailable.
- There is no estimated data for subways, only theoretical.
- Some TCL alerts have end dates years in the future — special fare information running to 2100, for instance. A line whose only alert is one of those has a permanently active calendar.
- Alerts apply to a whole line, not to a specific stop. Adding a transit stop doesn't give you its line's alerts; add the line as well.

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

First, make sure the line identifier and stop ID are correct. You can verify these on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/prochains-passages-reseau-transports-commun-lyonnais-rhonexpress-disponibilites-temps-reel/info).

If the identifiers are correct, the source itself may not have real-time data for that stop. Real-time departures are not available for every stop or at every time of day. You can check whether the source has live data using the official [TCL app](https://www.tcl.fr/decouvrir/les-applications-tcl/lapplication-tcl). Open your stop in the app and look at the next departures:

- If the next departure shows a green real-time indicator, live data is available in the source and the integration should report departures.

  ![Screenshot of the TCL app showing departures with a green real-time indicator](/images/integrations/data_grand_lyon/tcl_live_data.jpeg)

- If the next departure is shown in gray (for example, as a fixed time or as **Terminus de la ligne**), there is very likely no live data available in the source.

  ![Screenshot of the TCL app showing departures in gray without real-time data](/images/integrations/data_grand_lyon/tcl_no_live_data.jpeg)

When the source has no live data, it often comes back later. Sometimes the data returns after a few hours, and sometimes it takes a few days.

### Vélo'v station shows no data

Make sure the station ID is correct. You can verify it on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/stations-velo-v-metropole-lyon/donnees).

### Park & ride shows no data

Make sure the park & ride ID is correct. You can verify it on the [Grand Lyon open data platform](https://data.grandlyon.com/portail/fr/jeux-de-donnees/parcs-relais-reseau-transports-commun-lyonnais-disponibilites-temps-reel/donnees).

### Transit line shows no alerts

An empty calendar means the line currently has no published alert, which is the
normal state for most lines. If you expect one, check that the line code matches
the one TCL shows passengers — the code is case-sensitive and has no space.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
