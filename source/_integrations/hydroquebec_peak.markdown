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

Peak events occur during Québec winters (December 1 to March 31). Hydro-Québec announces them when cold weather drives electricity demand high. Customers enrolled in a peak savings offer, such as the Winter Credit Option or Rate Flex D, reduce their consumption during these events. In return, they receive bill credits or lower rates. This integration exposes the event schedule so your automations can prepare for and react to peak events. For example, you can preheat your home before an event starts and lower thermostats while one is in progress.

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

- **Peak event begins**
  - **Description**: Start time of the peak event in progress, or of the next upcoming event. The state is `unknown` when no event is scheduled.
- **Peak event ends**
  - **Description**: End time of the peak event in progress, or of the next upcoming event. The state is `unknown` when no event is scheduled.

## Hydro-Québec Peak Events automation examples

### Automation: Run actions around a peak event

This blueprint runs actions at three moments: a configurable time before a peak event begins, when the event begins, and when the event ends. For example, the automation can preheat the home ahead of the event, lower the thermostats when it begins, and restore the normal temperature when it ends. Hydro-Québec recommends preheating about two hours before an event begins.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/hydroquebec_peak_event_actions.yaml" %}

## Data updates

The integration {% term polling polls %} Hydro-Québec's open data every 15 minutes. Between updates, the sensors also refresh automatically when an event starts or ends, and at midnight, so the information stays current.

## Known limitations

- Event availability, timing, and lead time are determined entirely by Hydro-Québec. The integration displays the data as published. Outside the winter season (December through March), no events are published for most offers.
- This integration covers Hydro-Québec peak events only. It is not related to the Hilo demand response program, which is a separate service with its own eligibility and scheduling.
- The integration provides the event schedule only. It does not report your consumption or the credits you earn; those are available in your Hydro-Québec account.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
