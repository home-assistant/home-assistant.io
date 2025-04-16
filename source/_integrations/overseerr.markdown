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
  - diagnostics
  - event
  - sensor
ha_quality_scale: platinum
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

## Supported versions

The latest version of Overseerr is supported by this integration.

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

## Actions

The Overseerr integration has the following actions:

- Get requests

### Action get requests

Get a list of media requests using `overseerr.get_requests`.

| Data attribute    | Optional | Description                                                 |
|-------------------|----------|-------------------------------------------------------------|
| `config_entry_id` | No       | The ID of the Overseerr config entry to get data from.      |
| `status`          | Yes      | The status to filter the results on.                        |
| `sort_order`      | Yes      | The sort order to sort the results in (`added`/`modified`). |
| `requested_by`    | Yes      | Filter the requests based on the user ID of the requester.  |


## Use cases

The integration can be used to build automations to help and notify you of new media requests.
The provided actions can be used to provide extra context to voice assistants.

## Example automations

{% details "Send me a push notification on a new request" %}

{% raw %}

```yaml
alias: "Overseerr push notification"
description: "Send me a push notification on a new media request"
triggers:
  - trigger: state
    entity_id:
      - event.overseerr_last_media_event
    not_from:
      - unknown
      - unavailable
conditions:
  - condition: template
    value_template: >-
      {{ state_attr('event.overseerr_last_media_event', 'event_type') ==
      'pending' }}
actions:
  - action: notify.mobile_app
    metadata: {}
    data:
      message: >-
        {{ state_attr('event.overseerr_last_media_event', 'subject') }} has been
        requested
```

{% endraw %}
{% enddetails %}

## Data updates

When loading the integration, it will try to configure the webhook in Overseerr to give updates to Home Assistant.
This makes the integration a push-based integration.

When the integration receives an update about the requests, it updates the statistics to make sure they are up to date.
In addition, the integration checks for updates every 5 minutes.

## Known limitations

There are a few known limitations for using the integration:
- Overseerr is only capable of having one webhook set up at a time.
This means you can only have 1 Home Assistant instance connected to your Overseerr instance at a time.
- The integration is not able to function with <abbr title="cross-site request forgery">CSRF</abbr> protection turned on. In Overseer, go to **Settings** and turn off the **CSRF Protection**.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Failed to register Overseerr webhook" %}

Make sure your Overseerr instance is able to reach your Home Assistant instance.
{% enddetails %}
