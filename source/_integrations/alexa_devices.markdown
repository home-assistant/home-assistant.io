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

This integration requires multi-factor authentication using an authentication app (such as Microsoft Authenticator, for example). To enable MFA, in your Amazon account settings select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.

You must ensure the authenticator app is set up as your preferred method for 2FA.

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

This integration creates **Speak** and **Announce** notify entities for devices that support them. To make a device say something, use the generic [`notify.send_message`](/integrations/notify/) action and target one of these entities.

The **Speak** entity reads your message out loud on the device. The **Announce** entity plays the Alexa notification chime first and then reads your message.

To send a message, target one of these notify entities and set the **Message** field to the text you want the device to say.

{% tip %}
When sending notifications to multiple devices, you may experience delays due to rate limiting by Amazon. You can avoid this by sending notifications to speaker groups created in Alexa.
{% endtip %}

{% details "Advanced message markup" %}

Amazon provide markup to control not only what is said but how it is said and to add additional option such as pausing and playing certain audio clips. Details of this are covered in [Amazon's documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html) where there are lots of examples (just pass everything between the `<speak>` and `</speak>` elements into the `message` parameter of the action).

Audio files must meet certain criteria on size, bit and sample rates and must be served over HTTPS (see [documentation](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) for full details).  These restrictions make them fine for text and sound effects but you will not be able to play music this way.

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

## Data updates

This integration {% term polling polls %} data from the device every five minutes by default.

## Known limitations

- This integration requires multi-factor authentication using an authentication app (such as Microsoft Authenticator). To enable MFA, in your Amazon account settings, select **Login & Security** > **2-step verification** > **Backup methods** > **Add new app**. See [Amazon's documentation](https://www.amazon.com/gp/help/customer/display.html?nodeId=G9MX9LXNWXFKMJYU) for more information.
- Reminders may not be added to the sensor if the configured account is linked to an Alexa Household.
- [Amazon Japan](https://www.amazon.co.jp) appears to use a different login mechanism to other locations preventing setup of the integration.   This should be resolved in a future release.

## Troubleshooting

### Unable to set up

#### Symptom: "CannotAuthenticate"

##### Description

You will see `MFA OTP code not found on login page` or `Cannot find "auth-mfa-otpcode" in html source` in the logs when trying to set up the integration.   This is because the authentication details are incorrect.

You need to ensure you are:

- using the right credentials (The ones you would use to log in to the Alexa app and Amazon shopping site)
- set up to use app based 2FA
- not set up to receive SMS 2FA codes

To test this you should log in to your local Amazon shopping site in incognito/private mode in your browser and check you are prompted for the OTP code from your authenticator app, and you can log in successfully.

### Sensors unavailable

#### Symptom: "Too many requests"

You see something similar to

- `Error retrieving devices state: Too many requests for path ['listEndpoints']`
- `Error retrieving data: CannotRetrieveData('Request failed: Bad Request')`
- `Failed to obtain notification data. Timers and alarms have not been updated`

In logs.

##### Description

This happens because of rate limits applied by Amazon. We are working to reduce these errors. If these errors are causing you issues, you can disable polling for the integration. Disabling polling will stop these errors, but it will also stop DND, sensors, and connectivity from being updated. However, speech, announcements, and text commands will continue to work.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
