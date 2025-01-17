---
title: Overseerr
description: Instructions on how to set up Overseerr with Home Assistant.
ha_category:
  - Event
  - Multimedia
  - Sensor
ha_release: 2025.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: overseerr
ha_integration_type: service
ha_platforms:
  - event
  - sensor
---

Overseerr is a service that allows you to manage media requests and to integrate these media requests with Plex, Radarr, and Sonarr. The **Overseerr** {% term integration %} allows you to integrate your [Overseerr](https://overseerr.dev/) instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
    description: "The URL of your overseerr instance."
    required: true
    type: string
API key:
    description: "The API key of your overseerr instance, which can be found in the Overseerr settings."
    required: true
    type: string
{% endconfiguration_basic %}

## Supported functionality

The Overseerr intergation provides a couple of entities to Home Assistant.
Below is an overview of these entities.

### Events

Overseerr provides an event entity for updates around media.
The possible events that this entity has are:
 - `pending`
 - `approved`
 - `available`
 - `failed`
 - `declined`
 - `auto_approved`

Relevant data about the request are stored in the attributes.

### Sensors

The integration also provides statistics for the requests stored in Overseerr.
There are sensors for:
 - Total requests
 - Movie requests
 - TV requests
 - Pending requests
 - Declined requests
 - Processing requests
 - Available requests

## Data updates

When loading the integration, it will try to configure the webhook in Overseerr to give updates to Home Assistant.
This makes the integration a push-based integration.

When the integration receives an update about the requests, it updates the statistics to make sure they are up to date.
In addition, the integration checks for updates every 5 minutes.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
