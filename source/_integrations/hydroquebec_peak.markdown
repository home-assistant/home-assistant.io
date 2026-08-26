---
title: Hydro-Québec Peak Events
description: Instructions on how to integrate Hydro-Québec peak events into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Beat-YT'
ha_domain: hydroquebec_peak
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://www.hydroquebec.com/residential/energy-wise/offers-to-save-this-winter/
    title: Hydro-Québec winter savings offers
  - url: https://www.hydroquebec.com/documents-data/open-data/
    title: Hydro-Québec open data
  - url: https://donnees.hydroquebec.com/explore/dataset/evenements-pointe/information/
    title: Peak demand events – Winter dataset
---

The **Hydro-Québec Peak Events** {% term integration %} tracks winter peak demand events (_événements de pointe_) published by [Hydro-Québec](https://www.hydroquebec.com/), the electricity utility of Québec, Canada.

During Québec winters (December 1 to March 31), Hydro-Québec announces peak events when electricity demand is high due to cold weather. Customers enrolled in a peak savings offer — such as the Winter Credit Option or Rate Flex D — reduce their consumption during these events and receive bill credits or lower rates in return. This integration exposes the event schedule so your automations can prepare for and react to peak events, for example by preheating your home before an event and lowering thermostats while one is in progress.

The integration uses [Hydro-Québec's public open data](https://www.hydroquebec.com/documents-data/open-data/). It does not connect to your Hydro-Québec account and requires no credentials.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Offer:
  description: The Hydro-Québec peak savings offer you are enrolled in. The list is retrieved from Hydro-Québec's open data for the current season and includes residential and business offers.
{% endconfiguration_basic %}

To track more than one offer, add the integration again and select another offer. Each configured offer appears as its own device with its own set of entities.

## Supported functionality

For each configured offer, the integration provides the following entities. Events are published by Hydro-Québec a few hours before they occur, typically the day before.

### Sensors

- **Event begins**
  - **Description**: Start time of the peak event in progress, or of the next upcoming event. The state is `unknown` when no event is scheduled.
- **Event ends**
  - **Description**: End time of the peak event in progress, or of the next upcoming event. The state is `unknown` when no event is scheduled.

## Hydro-Québec Peak Events automation examples

### Automation: Preheat the home before a peak event

Preheat the home before a peak event by using the **Event begins** sensor with a time offset:

{% note %}
This example uses a time trigger with an offset, which requires the YAML editor. The visual automation editor does not support the offset field on time triggers.
{% endnote %}

{% example %}
automation: |
  alias: "Preheat before a peak event"
  triggers:
    - trigger: time
      at:
        entity_id: sensor.hydroquebec_peak_cpc_d_event_begins
        offset: "-03:00:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 23
{% endexample %}

### Automation: Lower the thermostat when a peak event starts

Lower the thermostat when a peak event begins by using a time trigger directly on the **Event begins** sensor:

{% example %}
automation: |
  alias: "Lower the thermostat when a peak event starts"
  triggers:
    - trigger: time
      at:
        entity_id: sensor.hydroquebec_peak_cpc_d_event_begins
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 18
{% endexample %}

### Automation: Restore the temperature when a peak event ends

Restore the thermostat to a normal temperature when a peak event ends by using a time trigger on the **Event ends** sensor:

{% example %}
automation: |
  alias: "Restore the thermostat when a peak event ends"
  triggers:
    - trigger: time
      at:
        entity_id: sensor.hydroquebec_peak_cpc_d_event_ends
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: 21
{% endexample %}

## Data updates

The integration {% term polling "polls" %} Hydro-Québec's open data every 15 minutes. The feed is served from a content delivery network and the integration uses conditional requests, so polling is lightweight. Entity states also update at event boundaries and at midnight, independently of polling.

## Known limitations

- Event availability, timing, and lead time are determined entirely by Hydro-Québec. The integration displays the data as published. Outside the winter season (December through March), no events are published for most offers.
- This integration covers Hydro-Québec peak events only. It is not related to the Hilo demand response program, which is a separate service with its own eligibility and scheduling.
- The integration provides the event schedule only. It does not report your consumption or the credits you earn; those are available in your Hydro-Québec account.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
