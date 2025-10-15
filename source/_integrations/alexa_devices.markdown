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
ha_quality_scale: silver
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

{% note %}

When trying to set up the integration, the form may show the message "Cannot connect".
This means that the specified country may need a special setting.
Open a issue with all details to investigate
{% endnote %}

## Actions

### Available Actions

Available actions: `notify.send_message`, `alexa_devices.send_sound`, `alexa_devices.send_text_command`

#### Action `notify.send_message`

Devices with appropriate functionality will have speak and announce notify entities created. These can be used as the target for the `notify.send_message` action.

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

#### Action `alexa_devices.send_text_command`

This action essentially allows you to control Alexa using text commands rather than speech. You should be able to request anything you would via speech using this action.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | no | Device on which you want to run action |
| `text_command` | no | Command to send |

#### Action `alexa_devices.send_sound`

This action allows you to play one of the built-in Alexa sounds. The full list of sounds is available in [Amazon's documentation (needs authentication)](https://alexa.amazon.com/api/behaviors/entities?skillId=amzn1.ask.1p.sound)

| Data attribute | Optional | Description |
| -------------- | -------- | ----------------------------------------- |
| `device_id` | no | Device on which you want to play sound |
| `sound` | no | The name of the sound to play |

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

This integration {% term polling polls %} data from the device every 30 seconds by default.

## Supported functionality

The **Alexa Devices** {% term integration %} provides the following entities:

- Binary sensor - main and Bluetooth connectivity
- Notify - Speak and Announce notifications
- Sensor - temperature and illuminance sensors
- Switch - Do not disturb

## Known limitations

This integration requires multifactor authentication using an authentication app (such as Microsoft Authenticator). To enable MFA, in your Amazon account settings, select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.

## Troubleshooting

### Can’t set up the integration

#### Symptom: "Not found"

When trying to set up the integration, the form shows the message "Not found".

##### Description

This appears to indicate that your Alexa devices aren't owned by you, but are connected through Amazon Family.
This setup isn't supported by the Alexa Mobile app, so it's not supported by this integration.
Move the devices to your primary account.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
