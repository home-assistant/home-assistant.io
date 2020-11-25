---
title: FireServiceRota
description: Instructions on how to configure the FireServiceRota integration for Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.119
ha_codeowners:
  - '@cyberjunky'
ha_config_flow: true
ha_domain: fireservicerota
---

FireServiceRota is a powerful and flexible availability, scheduling and dispatching system for firefighters.
It's the international brand of the Dutch [BrandweerRooster](https://www.brandweerrooster.nl), which is in use by more than 200 fire stations in The Netherlands.

The FireServiceRota integration provides you real-time information about incidents (emergency calls) from your local fire station and the ability to send a response depending on your duty schedule.

You will need a FireServiceRota or BrandweerRooster account.

<div class='note'>

A word of caution: Do not solely rely on this integration for your emergency calls!

</div>

This integration provides the following platforms:

- Sensor: Incoming emergency calls. Metadata contains _among other data_ the location of the incident and a text-to-speech URL. The integration uses a WebSocket client connection with the service to ensure a minimum delay.
- Binary Sensor: Your current duty status (as scheduled via the FireServiceRota mobile app and/or website).
- Switch: Enabled for 30 minutes after an emergency call. ‘on’ represents a confirmed response. Use this to automate your emergency call response and save valuable seconds.

On how to write automations using these platform read the 'Advanced Configuration' section below.

## Configuration

1. From Home Assistant, navigate to ‘Configuration’ then ‘Integrations’. Click the plus icon and type/select ‘FireServiceRota’.
1. Choose your platform `BrandweerRooster` or `FireServiceRota`.
1. Enter your login credentials.

1. Click the Save button.

## Entities

The following entity types are created:

### Incidents Sensor

This is the main entity of the integration containing the incident message as it's `value`, it has several attributes which are described here.
Generic attributes are `state`, `prio` e.g. `a1`, `a2`, `b1` or `b2`, `a` for ambulance and `b` for the fire department, and `type` with the type of alert, e.g. `incident_alert`.

The `trigger` attribute with values `new` or `update` denotes if this is a new incident, or an updated one. Date related are `created_at` and `can_respond_until` the lather is the date and time until a response is accepted.

Location related are `latitude` and `longitude` which holds the exact location of the incident, `address_type` e.g. `home` and `formatted_address` which ontains the address in string format.

Lastly `message_to_speech_url` which is a URL of the mp3 file containing the spoken text of the incident, this can be used in a automation.

### Duty Binary Sensor

This entity reflects the duty you have scheduled, `on` = on duty, `off` = no duty. When you have no duty the response switch is disabled which means you cannot respond to a call.

`start_time` and `end_time` denote the start and end of the active duty schedule, `active` can be `true` or `false`, the `type` attribute hold the type of the schedule e.g. `standby_duty`.

The skill(s) and function(s) you have assigned can be found in the following attributes: `assigned_function_ids` e.g. `540`, `skill_ids` e.g. `6, 8` and `assigned function` e.g. `Chauffeur`.

### Incident Response Switch

With this switch you can respond to a incident, by manually controlling the switch via the GUI, or by using an automation action.
It gets reset to `unknown` value with every incident received. Switching it to `on` means you send a response acknowledgement, switching it back `off` sends a response rejected.

The following attributes are available:
Time related `start_time`, incident response start time and `responded_at` the time you responded.

Status related are `status`, the status of response, e.g. `pending`, `reported_status` holds reported status, e.g. `shown_up`, `arrived_at_station` can contain `true` or `false`, same for `available_at_incident_creation`.

The `user_name` attribute contains your fullname. And `assigned_skill_ids` and `active_duty_function_ids` hold you skill and function id's.

## Advanced Configuration

With Automation you can configure one or more of the following useful actions:

1. Sound an alarm and/or switch on lights when an emergency incident is received.
1. Use text to speech to play incident details via a media player while getting dressed.
1. Respond with a response acknowledgment using a door-sensor when leaving the house or by pressing a button to let your teammates know you are underway.
1. Cast a FireServiceRota dashboard to a Chromecast device. (this requires a Nabu Casa subscription)

These are documented below.

### Example Automation

{% raw %}

```yaml
automation:
  - alias: 'Switch on a light when incident is received'
    trigger:
      platform: state
      entity_id: sensor.incidents
    action:
      service: light.turn_on
      entity_id: light.bedroom

  - alias: 'Play TTS incident details when incident is received'
    trigger:
      platform: state
      entity_id: sensor.incidents
      attribute: message_to_speech_url
    condition:
      - condition: not
        conditions:
          - condition: state
            entity_id: sensor.incidents
            attribute: message_to_speech_url
            state: None
    action:
      - service: media_player.play_media
        data_template:
          entity_id: media_player.nest_hub_bedroom
          media_content_id: >
              {{ state_attr('sensor.incidents','message_to_speech_url') }}
          media_content_type: 'audio/mp4'

  - alias: 'Send response acknowledgement when a button is pressed'
    trigger:
      platform: state
      entity_id: switch.response_button
    action:
      service: homeassistant.turn_on
      entity_id: switch.incident_response

  - alias: 'Cast FireServiceRota dashboard to Nest Hub'
    trigger: 
      platform: homeassistant
      event: start
    action:
      service: cast.show_lovelace_view
      data: 
        entity_id: media_player.nest_hub_bedroom
        view_path: fsr
```


### Example Lovelace Dashboard

```yaml
panel: true
title: Home
views:
  - badges: []
    cards:
      - entity: sensor.incidents
        type: entity
      - cards:
          - cards:
              - default_zoom: 15
                entities:
                  - entity: sensor.incidents
                hours_to_show: 0
                type: map
            type: vertical-stack
          - cards:
              - entities:
                  - entity: sensor.incidents
                hours_to_show: 1
                refresh_interval: 0
                type: history-graph
            type: vertical-stack
        type: horizontal-stack
      - content: |
          {{ states('sensor.incidents') }}
        title: Incident
        type: markdown
      - entities:
          - entity: binary_sensor.duty
          - entity: switch.incident_response
        type: entities
    path: fsr
    title: FireServiceRota
    type: horizontal-stack
```

{% endraw %}

### Screenshot

<img src='/images/integrations/fireservicerota/dashboard.png' alt='Example of a FireServiceRota dashboard' class="no-shadow"/> 

This screenshot shows what a FireServiceRota dashboard can look like.

## Debugging

The FireServiceRota integration will log additional information about WebSocket incidents received, response and duty status gathered, and other messages when the log level is set to `debug`. Add the relevant lines below to the `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fireservicerota: debug
    pyfireservicerota: debug
```
