---
title: Alexa Devices
description: Instructions on how to integrate Alexa Devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Notify
  - Sensor
  - Switch
ha_release: '2025.6'
ha_domain: alexa_devices
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - notify
  - sensor
  - switch
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

- **Third-party devices** with built-in Alexa capabilities.

{% warning %}

This integration requires multifactor authentication using an authentication app (such as Microsoft Authenticator, for example). To enable MFA, in your Amazon account settings select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.

You must ensure the authenticator app is setup as your preferred method for 2FA.

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

## Actions

### Available Actions

Available actions: `notify.send_message`, `alexa_devices.send_sound`, `alexa_devices.send_text_command`

### Action: Send message

The `notify.send_message` action allows you to send messages to devices with appropriate functionality that have speak and announce notify entities created.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------------------------------------- |
| `message` | no | Text to be output (see below for advanced markup) |

{% tip %}
When sending notifications to multiple devices, you may experience delays due to rate limiting by Amazon. You can avoid this by sending notifications to speaker groups created in Alexa.
{% endtip %}

{% details "Advanced Message Markup" %}

Amazon provide markup to control not only what is said but how it is said and to add additional option such as pausing and playing certain audio clips.  Details of this are covered in [Amazon's documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html) where there are lots of examples (just pass everything between the `<speak>` and `</speak>` elements into the `message` parameter of the action).

Audio files must meet certain criteria on size, bit and sample rates and must be served over HTTPS (see [documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) for full details).  These restrictions make them fine for text and sound effects but you will not be able to play music this way.

Amazon provide a set of [sounds you can use](https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html) which contains the markup you will need for that clip.

{% enddetails %}

### Action: Send text command

The `alexa_devices.send_text_command` action allows you to control Alexa using text commands rather than speech. You should be able to request anything you would via speech using this action.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | no | Device on which you want to run action |
| `text_command` | no | Command to send |

### Action: Send sound

The `alexa_devices.send_sound` action allows you to play one of the built-in Alexa sounds. The full list of sounds is available in [Amazon's documentation (needs authentication)](https://alexa.amazon.com/api/behaviors/entities?skillId=amzn1.ask.1p.sound)

{%tip%}
Additional sounds are available through advanced markup using the `notify.send_message` [action](#action-notifysend_message)
{%endtip%}

| Data attribute | Optional | Description |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | no | Device on which you want to play sound |
| `sound` | no | The name of the sound to play |

## Sensors

The integration creates sensor entities when the connected device exposes that information. Not every device supports every sensor.

### Alarm, timer, and reminder sensors

All Alexa-enabled devices have timestamp sensors that show the next scheduled alarm, timer, and reminder along with their labels.

### Environmental and device sensors

- **Temperature**
- **Illuminance**
- **Wi-Fi and Bluetooth connectivity**

## Supported functionality

In addition to sensors, you can use the following entities:

- **Notify** - Speak and Announce notifications
- **Switch** - Do not disturb

## Examples

### Send announcement when you arrive home

```yaml
automation:
- alias: "Alexa Announce"
  id: "alexa_announce"
  triggers:
    - platform: state
      entity_id: person.simone
      to: "home"
  actions:
    - action: notify.send_message
      data:
        message: Welcome home Simone
      target:
        entity_id: notify.echo_dot_livingroom_announce
```

### Ask the time

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: whats the time
```

### Set volume

{% note %}
Once media player functionality is supported you will be able to achieve this through standard media player actions.
{% endnote %}

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: volume 7
```

### Control devices in Alexa

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: turn study lights off
```

### Play BBC Radio 6

```yaml
action: alexa_devices.send_text_command
data:
  device_id: 037d79c1af96c67ba57ebcae560fb18e
  text_command: play BBC Radio 6
```

### Play a doorbell sound

```yaml
action: alexa_devices.send_sound
data:
  sound: amzn_sfx_doorbell_chime_01
  device_id: 037d79c1af96c67ba57ebcae560fb18e
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

## Data updates

This integration {% term polling polls %} data from the device every five minutes by default.

## Known limitations

- This integration requires multifactor authentication using an authentication app (such as Microsoft Authenticator). To enable MFA, in your Amazon account settings, select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.
- Reminders may not be added to the sensor if the configured account is linked to an Alexa Household.
- [Amazon Japan](https://www.amazon.co.jp) appears to use a different login mechanism to other locations preventing setup of the integration.   This should be resolved in a future release.

## Troubleshooting

### Unable to setup

#### Symptom: "CannotAuthenticate"

##### Description

You will see `MFA OTP code not found on login page` or `Cannot find "auth-mfa-otpcode" in html source` in the logs when trying to set up the integration.   This is because the authentication details are incorrect.

You need to ensure you are:

- using the right credentials (The ones you would use to log in to the Alexa app and Amazon shopping site)
- set up to use app based 2FA
- not set up to receive SMS 2FA codes

To test this you should log in to your local Amazon shopping site in incognito/private mode in your browser and check you are prompted for the OTP code from your authenticator app, and you are able to log in successfully.

### Sensors unavailable

#### Symptom: "Too many requests"

You see something similar to

- `Error retrieving devices state: Too many requests for path ['listEndpoints']`
- `Error retrieving data: CannotRetrieveData('Request failed: Bad Request')`
- `Failed to obtain notification data.  Timers and alarms have not been updated`

In logs.

##### Description

This happens because of rate limits applied by Amazon. We are working to reduce these errors. If these errors are causing you issues, you can disable polling for the integration. Disabling polling will stop these errors, but it will also stop DND, sensors, and connectivity from being updated. However, speech, announcements, and text commands will continue to work.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
