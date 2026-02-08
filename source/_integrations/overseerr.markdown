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
  - '@AmGarera'
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

The Overseerr integration provides a couple of entities to Home Assistant.
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

The integration provides statistics for both requests and issues stored in Overseerr.

#### Request sensors

There are sensors for:
 - Total requests
 - Movie requests
 - TV requests
 - Pending requests
 - Declined requests
 - Processing requests
 - Available requests

#### Issue sensors

There are sensors for:
 - Total issues
 - Open issues
 - Closed issues
 - Video issues
 - Audio issues
 - Subtitle issues

## Actions

The Overseerr integration has the following actions:

### Request actions

- `overseerr.get_requests` - Get a list of media requests

### Get requests

Get a list of media requests using the `overseerr.get_requests` action.

- **config_entry_id** (*Required*): The ID of the Overseerr config entry to get data from.
- **status** (*Optional*): The status to filter the results on.
- **sort_order** (*Optional*): The sort order to sort the results in (`added`/`modified`).
- **requested_by** (*Optional*): Filter the requests based on the user ID of the requester.


## Use cases

The integration can be used to build automations to help and notify you of new media requests and issues.

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

{% details "Send notification when open issues exceed threshold" %}

{% raw %}

```yaml
alias: "Notify when too many open issues"
description: "Alert when open issues in Overseerr exceed 10"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.overseerr_open_issues
    above: 10
actions:
  - action: notify.mobile_app
    data:
      message: >-
        Warning: {{ states('sensor.overseerr_open_issues') }} open issues in Overseerr!
      title: "High Issue Count"
```

{% endraw %}
{% enddetails %}

{% details "Track audio issues trend with statistics sensor" %}

{% raw %}

```yaml
alias: "Monitor audio issue trends"
description: "Create a statistics sensor to track audio issue trends over time"
sensor:
  - platform: statistics
    name: "Audio Issues Statistics"
    entity_id: sensor.overseerr_audio_issues
    state_characteristic: mean
    max_age:
      days: 7
    sampling_size: 100
```

{% endraw %}
{% enddetails %}

{% details "Alert when video issues spike" %}

{% raw %}

```yaml
alias: "Video issues spike alert"
description: "Notify when video issues increase significantly"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.overseerr_video_issues
    above: 5
actions:
  - action: notify.mobile_app
    data:
      message: >-
        Video issues are elevated: {{ states('sensor.overseerr_video_issues') }} issues detected
      title: "Video Quality Alert"
```

{% endraw %}
{% enddetails %}

{% details "Daily issue report" %}

{% raw %}

```yaml
alias: "Daily Overseerr issue summary"
description: "Send a daily report of all issue types"
triggers:
  - trigger: time
    at: "09:00:00"
conditions:
  - condition: numeric_state
    entity_id: sensor.overseerr_total_issues
    above: 0
actions:
  - action: notify.mobile_app
    data:
      title: "Overseerr Daily Report"
      message: >-
        Total Issues: {{ states('sensor.overseerr_total_issues') }}
        Open: {{ states('sensor.overseerr_open_issues') }}
        Closed: {{ states('sensor.overseerr_closed_issues') }}
        Video: {{ states('sensor.overseerr_video_issues') }}
        Audio: {{ states('sensor.overseerr_audio_issues') }}
        Subtitle: {{ states('sensor.overseerr_subtitle_issues') }}
```

{% endraw %}
{% enddetails %}

{% details "Create dashboard badge for subtitle issues" %}

{% raw %}

```yaml
type: entity
entity: sensor.overseerr_subtitle_issues
name: Subtitle Issues
icon: mdi:subtitles
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

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Failed to register Overseerr webhook" %}

Make sure your Overseerr instance is able to reach your Home Assistant instance.
{% enddetails %}
