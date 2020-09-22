---

title: FireServiceRota

description: Instructions on how to configure the FireServiceRota integration for Home Assistant.

ha_category:

  - Binary Sensor

  - Sensor

  - Switch

ha_iot_class: Cloud Polling

ha_release: 0.116

ha_codeowners:

  - '@cyberjunky'

ha_config_flow: true

ha_domain: fireservicerota

---

FireServiceRota is a powerful and flexible availability, scheduling and dispatching system for firefighters.
It's the international brand of the Dutch [BrandweerRooster](https://www.brandweerrooster.nl), which is in use by more than 200 fire stations in The Netherlands.

The `fireservicerota` integration provides you realtime information about incidents (emergency calls) from your local fire station, and the ability to send a response depending on your duty schedule.

You will need a FireServiceRota or BrandweerRooster account.

<div class='note'>

A word of caution: Do not solely rely on this integration for your emergency calls!

</div>


This integration provides the following platforms:


* Sensor: Incoming emergency calls. Metadata contains -amoung other data- the location of the incident and a text-to-speech URL. The integration uses a websocket client connection with the service to ensure a minimum delay.

* Binary Sensor: Your current duty status (as scheduled via the FireServiceRota mobile app and/or website)

* Switch: Enabled for 30 minutes after any emergency call. ‘on’ represents a confirmed response. Use this to automate your emergency call response and save valuable seconds.

On how to write automations using these platform read the 'Advanced Configuration' section below.

## Configuration

1. From Home Assistant, navigate to ‘Configuration’ then ‘Integrations’. Click the plus icon and type/select ‘FireServiceRota’.
1. Enter your login credentials.
1. Choose your platform `www.brandweerrooster.nl` or `www.fireservicerota.co.uk`.
1. Click the Save button.


## Entities

The following entities are created:

### sensor.incidents

| Value      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value` | Incident text message.                                             |

| Attribute      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id` | Unique id for this incident.                                             |
| `trigger`    | Type of trigger, 'new' or 'update'.                                   |
| `state`  | The state of the incident.                                     |
| `created_at`        | Date and time when incident was created. |
| `start_time`         | Start date and time of incident.                                                                                                                                                                                               |
| `location`         | Message text and address string concatinated.                                                                                                                                                                                               |
| `message_to_speech_url`         | The URL of the mp3 file containing the spoken text of the incident.                                                                                                                                                                                               |
| `prio`         | Priority of the incident, 'a1', 'a2', 'b1' or 'b2'.                                                                                                                                                                                               |
| `type`         | Type of incident, e.g. 'incident_alert'.                                                                                                                                                                                               |
| `responder_mode`         | Modes of response, e.g. 'available_in_schedule_is_acknowledgment'.                                                                                                                                                                                               |
| `can_respond_until`         | Date and time until response is accepted.                                                                                                                                                                                               |
| `address_line1`         | Line 1 of address.                                                                                                                                                                                               |
| `address_line2`         | Line 2 of address.                                                                                                                                                                                               |
| `street_name`         | Street name.                                                                                                                                                                                               |
| `house_number`         | House number.                                                                                                                                                                                               |
| `postcode`         | Postal code.                                                                                                                                                                                               |
| `city`         | City, e.g. 'Rotterdam'.                                                                                                                                                                                               |
| `country`         | Country, e.g. 'NL'.                                                                                                                                                                                               |
| `latitude`         | Latitude.                                                                                                                                                                                               |
| `longitude`         | Longitude.                                                                                                                                                                                               |
| `address_type`         | Type of address, e.g. 'home'.                                                                                                                                                                                               |
| `formatted_address`         | Address in string format.                                                                                                                                                                                               |
### binary_sensor.duty

| Value      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value` | 'On' = on duty. 'Off' = no duty scheduled.                                             |

| Attribute      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `start_time`         | Start date and time of duty schedule.                                                                                                                                                                                               |
| `end_time`         | End date and time of duty schedule.                                                                                                                                                                                               |
| `available` | 'true of 'false'.                                             |
| `active` | 'true of 'false'.                                             |
| `assigned_function_ids` | Function id's, e.g. '540'.                                             |
| `detailed_availabilty` | Type of duty scheduled, e.g. standby_duty: true, recurring: false, active: true'.                                             |
| `skill_ids` | Skill id's, e.g. '6, 8'.                                             |
| `type` | Type, e.g. 'standby_duty'.                                             |
| `assigned function` | Assigned function, e.g. 'Chauffeur'.                                             |

### switch.incident_response

| Value      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value` | 'On' = response acknowledged. 'Off' = response rejected.                                             |

| Attribute      | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id` | Incident response id.                                             |
| `incident_id` | Unique id for active incident.                                             |
| `membership_id` | Membership id.                                             |
| `group_id` | Group id.                                             |
| `user_name` | Your username.                                             |
| `user_id` | User id.                                             |
| `assigned_skill_ids` | Assigned skill id's.                                             |
| `responded_at` | Time responded.                                             |
| `start_time` | Incident repsonse start time.                                             |
| `channel` | Channel.                                             |
| `status` | Status of repsonse, e.g. 'pending'.                                             |
| `reported_status` | Reported status, e.g. 'shown_up'.                                             |
| `arrived_at_station` | 'true' or 'false'.                                             |
| `available_at_incident_creation` | 'true' or 'false'.                                             |
| `active_duty_function_ids` | Active function id's, e.g. '540'.                                             |


## Advanced Configuration

Practical use can be sounding an alarm and/or blinking lights when an emergency incident is received, use text to speech to play incident details while getting dressed, respond with an acknowledge using a door-sensor leaving house or a button or something else connected to Home Assistant to let your teammates know you are underway.

### FireServiceRota Dashboard

If you want to have your browser to function as audio player, and have screen control you need to install the 'browser_mod' integration (via HACS)

Set the device alias below to match your media player id.

You also need to install the following plugins for Lovelace (again HACS is your friend)
- 'custom:layout-card'
- 'custom:bignumber-card'
- 'custom:vertical-stack-in-card'
- 'custom:home-feed-card'

{% raw %}

```yaml
browser_mod:
  devices:
    3184e47f_bac9b576:  # <--- change this id to your browser id
      name: bwr-nesthub

sensor:
  - platform: template
    sensors:
      incidents_speech:
        friendly_name: "Speech Sensor"
        value_template: "{{ state_attr('sensor.incidents', 'message_to_speech_url') }}"

input_boolean:
  bwr_tts:
    name: Text to Speech
    icon: mdi:text-to-speech

homeassistant:
  customize:
    light.bwr_nesthub:
      friendly_name: 'Display On/Off'

automation:
  - alias: Play Incident Speech
    trigger:
      platform: state
      entity_id: sensor.incidents
    action:
      - service: media_player.play_media
        data_template:
          entity_id: media_player.bwr_nesthub
          media_content_id: >
              {{ states('sensor.incidents_speech') }}
          media_content_type: 'audio/mp4'
      - service: homeassistant.turn_on
        data_template: 
          entity_id: >
              light.bwr_nesthub
      - service: timer.start
        data:
          entity_id: timer.bwr_nesthub
    condition:
      condition: and
      conditions:
      - condition: time
        after: '06:30:00'
        before: '23:00:00'
      - condition: template
        value_template: "{{ not is_state('sensor.incidents_speech', 'None') }}"
      - condition: state
        entity_id: input_boolean.bwr_tts
        state: 'on'

  - alias: Turn off Nest Hub screen 2 minutes after trigger
    trigger:
      platform: event
      event_type: timer.finished
      event_data:
        entity_id: timer.bwr_nesthub
    action:
      service: light.turn_off
      data:
        entity_id:
          - light.bwr_nesthub

  - alias: Cast to Nest Hub
    trigger: 
      platform: homeassistant
      event: start
    action:
      service: cast.show_lovelace_view
      data: 
        entity_id: media_player.nest_hub_slaapkamer
        view_path: bwr

timer:
  bwr_nesthub:
    duration: '00:02:00'
    name: Nest Hub Screen Timer
```

{% endraw %}

Example Lovelace Dashboard

```yaml
title: BWR
path: bwr
panel: true
icon: mdi:fire-truck
cards:
  - type: 'custom:layout-card'
    cards:
      - type: 'custom:bignumber-card'
        entity: sensor.incidents
        scale: 15px
      - type: map
        entities:
          - entity: sensor.incidents
        hours_to_show: 0
        default_zoom: 15
      - type: 'custom:vertical-stack-in-card'
        cards:
          - type: history-graph
            entities:
              - entity: sensor.incidents
            hours_to_show: 1
            refresh_interval: 0
          - type: 'custom:home-feed-card'
            show_empty: false
            entities:
              - entity: sensor.incidents
                max_history: 3
                include_history: true
          - type: entities
            show_header_toggle: false
            entities:
              - input_boolean.bwr_tts
              - light.bwr_nesthub
          - type: 'custom:bignumber-card'
            entity: sensor.time
            scale: 25px
```


You can cast this dashboard to a Nest Hub or other ChromeCast capable device using a Nabu Casa subscription or 'Catt to Cast'.

Below is the result of above code, an audio player via 'browser_mod' player play text to speech data, the screen gets enabled when an incident arrives and goes dark after 2 minutes. You can toggle TTS and screen display on/off.

I have muted the announcements outside 23:00-6:30h using a automation condition, if you are on duty that's something to remove/change.

### Example

<p class='img'>
  <img src='{{site_root}}/images/integrations/fireservicerota/dashboard.png' />
</p>

## Debugging

The FireServiceRota integration will log additional information about websocket incidents received, response and duty status gathered, and other messages when the log level is set to `debug`. Add the the relevant lines below to the `configuration.yaml`:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fireservicerota: debug
    pyfireservicerota: debug
