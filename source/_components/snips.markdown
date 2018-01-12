---
layout: page
title: "Snips"
description: "Instructions how to integrate Snips within Home Assistant."
date: 2017-06-22 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: snips.png
ha_category: Voice
ha_release: 0.48
---

The [Snips Voice Platform](https://www.snips.ai) allows users to add powerful voice assistants to their Raspberry Pi devices without compromising on Privacy. It runs 100% on-device, and does not require an Internet connection. It features Hotword Detection, Automatic Speech Recognition (ASR), Natural Language Understanding (NLU) and Dialog Management.

![Snips Modules](/images/screenshots/snips_modules.png)

Snips takes voice or text as input, and produces *intents* as output, which are explicit representations of an intention behind an utterance, and which can subsequently be used by Home Assistant to perform appropriate actions.

![Snips Modules](/images/screenshots/snips_nlu.png)


## {% linkable_title The Snips Voice Platform %}

### Installation

The Snips Voice Platform is installed on Raspberry Pi with the following command:

```sh
(pi) $ curl https://install.snips.ai -sSf | sh
```

### Creating an assistant

<div class='videoWrapper'>
<iframe src="https://player.vimeo.com/video/223255884" width="700" height="380" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

Snips assistants are created via the [Snips Console](https://console.snips.ai). Once trained, the assistant should be downloaded and copied to the Raspberry Pi:

```sh
$ scp assistantproj_XXX.zip pi@pi_hostname:/home/pi/assistant.zip
```

and installed locally via the `snips-install-assistant` helper script:

```sh
(pi) $ sudo snips-install-assistant assistant.zip
```

### Running Snips

Make sure that a microphone is plugged to the Raspberry Pi. If you are having trouble setting up audio, we have written a guide on [Raspberry Pi Audio Configuration](https://github.com/snipsco/snips-platform-documentation/wiki/1.-Setup-the-Snips-Voice-Platform-on-your-Raspberry-Pi#configuring-the-audio).

Start the Snips Voice Platform using the `snips` command:

```sh
(pi) $ snips
```

Snips is now ready to take voice commands from the microphone. To trigger the listening, simply say

> Hey Snips

followed by a command, e.g.

> Set the lights to green in the living room

We should see the transcribed phrase in the logs, as well as a properly parsed intent. The intent is published on MQTT, on the `hermes/nlu/intentParsed` topic. The Snips Home Assistant component subscribes to this topic, and handles the intent according to the rules defined in `configuration.yaml`, as explained below.

#### Optional: specifying an external MQTT broker

By default, Snips runs its own MQTT broker. But we can also tell Snips to use an external broker by specifying this when launching Snips. In this case, instead of running the `snips` command above (which assumes we are using the internal MQTT broker), we use the full launch command with explicitly specified parameters (replace `MQTT_BROKER_IP` and `MQTT_BROKER_PORT` with appropriate values):

```sh
$ docker run -t --rm --name snips --log-driver none -v /home/pi/.asoundrc:/root/.asoundrc -v /opt/snips/config:/opt/snips/config --privileged -v /dev/snd:/dev/snd snipsdocker/platform --mqtt MQTT_BROKER_IP:MQTT_BROKER_PORT
```

For more details on launch options, check the documentation on [Snips Platform Commands](https://github.com/snipsco/snips-platform-documentation/wiki/6.--Learn-more:-Platform-Commands#using-a-custom-mqtt-bus).

## Home Assistant configuration

### Specifying the MQTT broker

Messages between Snips and Home Assistant are passed via MQTT. We must tell Home Assistant which MQTT broker to use by adding the following entry to `configuration.yaml`:

```yaml
mqtt:
  broker: MQTT_BROKER_IP
  port: MQTT_BROKER_PORT
```

As explained above, Snips by default runs an MQTT broker on port 9898. So if we wish to use this broker, the entry will look as follows:

```yaml
mqtt:
  broker: 127.0.0.1
  port: 9898
```
### Triggering actions

In Home Assistant, we trigger actions based on intents produced by Snips using the [`intent_script`](/components/intent_script) component. For instance, the following block handles `ActivateLightColors` intents (included in the Snips IoT intent bundle) to change light colors:

```yaml
snips:

intent_script:
  ActivateLightColor:
    action:
      - service: light.turn_on
        data_template:
          entity_id: light.{% raw %}{{ objectLocation | replace(" ","_") }}{% endraw %}
          color_name: {% raw %}{{ objectColor }}{% endraw %}
```
### Sending TTS Notifications

You can send TTS notifications to Snips using the snips.say and snips.say_action services. Say_action starts a session and waits for user response, "Would you like me to close the garage door?", "Yes, close the garage door".

#### {% linkable_title Service `snips/say` %}

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `text`                 |       no | Text to say.                                           |
| `siteId`               |      yes | Site to use to start session.                          |
| `customData`           |      yes | custom data that will be included with all messages in this session. |

#### {% linkable_title Service `snips/say_action` %}

| Service data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `text`                 |       no | Text to say.                                           |
| `siteId`               |      yes | Site to use to start session.                          |
| `customData`           |      yes | custom data that will be included with all messages in this session. |
| `canBeEnqueued         |      yes | If True, session waits for an open session to end, if False session is dropped if one is running. |
| `intentFilter           |      yes | Array of Strings - A list of intents names to restrict the NLU resolution to on the first query. |

#### Configuration Examples
```yaml
script:
  turn_on_light:
    sequence:
      service: script.turn_on_light
      service: snips.say
        data:
          text: 'OK, the light is now on'

automation:
  query_garage_door:
    trigger:
     - platform: state
        entity_id: binary_sensor.my_garage_door_sensor
        from: 'off'
        to: 'on'
        for:
          minutes: 10
    sequence:
      service: snips.say_action
        data:
          text: 'Garage door has been open 10 minutes, would you like me to close it?'
          intentFilter:
            - closeGarageDoor

# This intent is fired if the user responds with the appropriate intent after the above notification
intent_script:
  closeGarageDoor:
    speech:
      type: plain
      text: 'OK, closing the garage door'
    action:
      - service: script.garage_door_close
```
