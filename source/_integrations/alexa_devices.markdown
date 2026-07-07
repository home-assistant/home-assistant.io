---
title: Alexa Devices
description: Instructions on how to integrate Alexa Devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Media Player
  - Notifications
  - Select
  - Sensor
  - Switch
  - To-do list
ha_release: '2025.6'
ha_domain: alexa_devices
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - event
  - media_player
  - notify
  - select
  - sensor
  - switch
  - todo
ha_integration_type: hub
ha_quality_scale: platinum
---

The **Alexa Devices** {% term integration %} lets you control Alexa-enabled devices connected to your Amazon account.

The integration provides information on connected devices and enables control of the main features.

## Supported devices

There is support for the following device families within Home Assistant:

- **Amazon Echo Auto**
- **Amazon Echo Dot**
- **Amazon Echo Flex**
- **Amazon Echo Plus**
- **Amazon Echo Show**
- **Amazon Fire TV Stick**
- **Amazon Fire Tablet**
- **Amazon Air Quality Monitor**
- **Third-party devices** with built-in Alexa capabilities.

{% warning %}

This integration requires multi-factor authentication using an authentication app (such as Microsoft Authenticator, for example). To enable MFA, in your Amazon account settings select **Login & Security**, and then select **Your login approvals**. You must ensure the authenticator app is set up as your preferred method for 2FA.

{% endwarning %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
  username:
    description: The email address of your Amazon account.
  password:
    description: The password of your Amazon account.
  otp:
    description: One-time password via Authenticator App.
{% endconfiguration_basic %}

{% include integrations/actions.md %}

## Notifications

This integration creates **Speak** and **Announce** notify entities for devices that support them. To make a device say something, use the generic [`notify.send_message`](/integrations/notify/) action.

The **Speak** entity reads your message out loud on the device. The **Announce** entity plays the Alexa notification chime first and then reads your message.

To send a message, target one of these notify entities and set the **Message** field to the text you want the device to say.

{% tip %}
When sending notifications to multiple devices, you may experience delays due to rate limiting by Amazon. You can avoid this by sending notifications to speaker groups created in Alexa.
{% endtip %}

{% details "Advanced message markup" %}

Amazon provide markup to control not only what is said but how it is said and to add additional option such as pausing and playing certain audio clips. Details of this are covered in [Amazon's documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-ssml.html).

Audio files must meet certain criteria on size, bit and sample rates and must be served over HTTPS (see [documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-ssml.html)).

Amazon provide a set of [sounds you can use](https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html) which contains the markup you will need for that clip.

{% enddetails %}

## Sensors

The integration creates sensor entities when the connected device exposes that information. Not every device supports every sensor.

### Alarm, timer, and reminder sensors

All Alexa-enabled devices have timestamp sensors that show the next scheduled alarm, timer, and reminder along with their labels.

### Environmental and device sensors

- **Temperature**
- **Illuminance**
- **Wi-Fi and Bluetooth connectivity**

#### Air Quality Monitor sensors

- **Particulate Matter** - 10 μm & 2.5 μm
- **Carbon Monoxide**
- **Volatile Organic Compounds Index**
- **Air Quality Index**

## Supported functionality

In addition to sensors, you can use the following entities:

- **Button** - Execute Alexa routines
- **Media Player** - Play audio/video from several sources
- **Notify** - Speak and Announce notifications
- **Select** - Select Drop In status
- **Switch** - Do not disturb
- **To-do list** - Shopping, to-do, and custom lists.

## Communications

The integration provides configuration entities for managing communication settings on Alexa devices. You can toggle communications and announcements, or use a select entity to change the drop-in mode.

{% warning %}

Amazon applies rate limits to these configuration changes. Rate limit warnings may appear in the logs, but the integration caches entity values to prevent them from appearing as unavailable.

{% endwarning %}

<img width="346" height="351" alt="configuration_controls" src="https://github.com/user-attachments/assets/9aba2655-bb3e-4432-9607-7d0102b3039f" />

## Media players

The integration includes media player support for echo devices and third-party devices that have built-in Alexa. Media player entities are added as typical Home Assistant media players with support for volume control, muting, play/pause, and media selection.

Currently, Fire Stick, Fire Cube, and other FireTV devices do not include media player support, but support may be added in a future update.

<img width="346" height="167" alt="media_player_entity" src="https://github.com/user-attachments/assets/6105acbc-124f-403d-add7-3af72131d911" />

## To-do

To-do list support has been added to Alexa Devices. Users can add items to and remove items from their Alexa Shopping List, as well as the Alexa To-do List and any custom lists created by the user. Lists can be accessed from the To-do lists tab in the Home Assistant menu bar. Sensor entities are created for each list and appear under the user's account in the Alexa Devices integration page (the same page that includes the user's Alexa Routine buttons). These sensors will show a state of how many items are on the list. Supported features include Create todo item, Delete todo item, and Update todo item.

## Voice attributes

The integration includes voice event entities for each Alexa device. The entity state displays a timestamp for when the device was last spoken to or activated. The entity attributes provide additional details about the last voice interaction, including the event type, intent, voice command, voice reply, and friendly name. You can use these attributes to create template helpers.

<img width="580" height="473" alt="voice_event" src="https://github.com/user-attachments/assets/7448d260-4daa-4a30-a89f-09cadf0f9de8" />

## Examples

### Send announcement when you arrive home

```yaml
automation:
- alias: "Alexa Announce"
  id: "alexa_announce"
  triggers:
    - trigger: state
      entity_id: person.simone
      to: "home"
  actions:
    - action: notify.send_message
      data:
        message: Welcome home Simone
      target:
        entity_id: notify.echo_dot_living_room_announce
```

### Using advanced markup in a notification

```yaml
action: notify.send_message
data:
  message: >
    Hello, lets have some examples.
    <amazon:emotion name="excited" intensity="medium"> This is me being mildly excited! </amazon:emotion>
    The farmer's dog was called <say-as interpret-as='spell-out'>bingo</say-as>.
    <prosody pitch='high'> I can sing high </prosody> <prosody pitch='low'> and I can sing low </prosody>
target:
  entity_id: notify.study_dot_speak
```

```yaml
action: notify.send_message
data:
  message: >
    Stop! <break time='3s'/> Hammer Time. Watch out
    <audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_laser_gun_battle_01"/>
    Shields up! <audio src="soundbank://soundlibrary/scifi/amzn_sfx_scifi_shields_up_01" />
    <amazon:effect name="whispered">
      <prosody rate="x-slow"><prosody volume="loud">Enough now</prosody></prosody>
    </amazon:effect>
target:
  entity_id: notify.study_dot_speak

```

### Last device templates

Many users would like to know which Alexa device was last used, especially when spoken to, which can help in scripts, automations, and blueprints.

```yaml
{% raw %}
{% set entity =
  integration_entities('alexa_devices')
  | select('match', 'event.')
  | select('has_value')
  | expand
  | sort(attribute='state', reverse=true)
  | first
%}
{{ entity.attributes.friendly_name | regex_replace(' ?Voice event$', '') }}
{% endraw %}
```

<img width="579" height="474" alt="last_called_device" src="https://github.com/user-attachments/assets/ee7c5fd1-5879-49dc-83f2-95ef39f9cf74" />

This template can be modified to provide a user with any information they need from the voice attributes, such as including what was the exact voice command used during the event.

```yaml
{% raw %}
{% set entity =
  integration_entities('alexa_devices')
  | select('match', 'event.')
  | select('has_value')
  | expand
  | sort(attribute='state', reverse=true)
  | first
%}
{{ entity.attributes.friendly_name | regex_replace(' ?Voice event$', '') }}
{{ entity.attributes.voice_command }}
{% endraw %}
```

<img width="580" height="472" alt="last_called_event" src="https://github.com/user-attachments/assets/be6b7130-29d2-49ec-aab4-1e19dd5af140" />

You can also template the attributes for a specific entity_id, making it even simpler to use in scripts, automations, and blueprints.

```yaml
{% raw %}
{{
  integration_entities('alexa_devices')
  | select('match', 'event.')
  | select('has_value')
  | expand
  | sort(attribute='state', reverse=true)
  | map(attribute='entity_id')
  | first
  | default(none)
  | device_id
  | device_entities
  | select('match', 'notify.*_speak')
  | list
}}
{% endraw %}
```

<img width="581" height="475" alt="last_called_entity" src="https://github.com/user-attachments/assets/7edb9479-81dc-49e2-a450-30b0517a1b49" />

## Data updates

This integration {% term polling polls %} data from the device every five minutes by default.

## Known limitations

- This integration requires multi-factor authentication using an authentication app (such as Microsoft Authenticator). To enable MFA, in your Amazon account settings, select **Login & Security**, and then select **Your login approvals**.
- Reminders may not be added to the sensor if the configured account is linked to an Alexa Household.
- [Amazon Japan](https://www.amazon.co.jp) appears to use a different login mechanism to other locations preventing setup of the integration. This should be resolved in a future release.

## Troubleshooting

### Unable to set up

#### Symptom: "CannotAuthenticate"

##### Description

You will see `MFA OTP code not found on login page` or `Cannot find "auth-mfa-otpcode" in html source` in the logs when trying to set up the integration. This is because the authentication details are not being provided correctly.

You need to ensure you are:

- using the right credentials (The ones you would use to log in to the Alexa app and Amazon shopping site)
- set up to use app based 2FA
- not set up to receive SMS 2FA codes

To test this you should log in to your local Amazon shopping site in incognito/private mode in your browser and check you are prompted for the OTP code from your authenticator app, and you can log in.

### Sensors unavailable

#### Symptom: "Too many requests"

You see something similar to

- `Error retrieving devices state: Too many requests for path ['listEndpoints']`
- `Error retrieving data: CannotRetrieveData('Request failed: Bad Request')`
- `Failed to obtain notification data. Timers and alarms have not been updated`

In logs.

##### Description

This happens because of rate limits applied by Amazon. We are working to reduce these errors. If these errors are causing you issues, you can disable polling for the integration. Disabling polling will allow you to use the integration without these errors.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
