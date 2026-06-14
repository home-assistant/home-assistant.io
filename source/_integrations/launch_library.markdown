---
title: Launch Library
description: Instructions on how to integrate space launch information within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.83
ha_codeowners:
  - '@ludeeus'
  - '@DurgNomis-drol'
ha_domain: launch_library
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
---

The **Launch Library** {% term integration %} provides information about upcoming spaceflight, including the next planned rocket launch and the next SpaceX Starship launch and event.

You can use it to keep an eye on the next launch from a dashboard, get a notification when a launch is about to happen, or announce upcoming launches through your media players.

The data comes from the [Launch Library 2 API](https://thespacedevs.com/llapi) by The Space Devs.

## Prerequisites

There are no prerequisites. The integration uses a public data source, so you do not need an account or API key.

{% include integrations/config_flow.md %}

You can only add this integration once. It provides information about the next launch worldwide, not for a specific location or provider.

## Supported functionality

The integration creates the following {% term sensor %} entities:

- **Next launch**: The name of the next upcoming rocket launch. Additional attributes show the launch provider, the launch pad, the facility, and the provider's country code.
- **Launch time**: The scheduled date and time of the next launch. Additional attributes show the start and end of the launch window.
- **Launch probability**: The estimated probability of the launch happening, as a percentage. This is unavailable when the provider does not share a probability.
- **Launch status**: The current status of the next launch, such as whether it is confirmed, on hold, or in flight. An additional attribute shows the hold reason when there is one.
- **Launch mission**: The name of the mission for the next launch. Additional attributes show the mission type, the target orbit, and a description of the mission.
- **Next Starship launch**: The scheduled date and time of the next SpaceX Starship launch. Additional attributes show the mission title, status, target orbit, and a description.
- **Next Starship event**: The scheduled date and time of the next SpaceX Starship event. Additional attributes show the event title, location, a link to the stream, and a description.

## Data updates

The integration {% term polling polls %} the Launch Library 2 API once an hour for the latest information.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
