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

The latest documentation can be found here: [Snips Platform Documentation](https://github.com/snipsco/snips-platform-documentation/wiki)

![Snips Modules](/images/screenshots/snips_modules.png)

Snips takes voice or text as input, and produces *intents* as output, which are explicit representations of an intention behind an utterance, and which can subsequently be used by Home Assistant to perform appropriate actions.

![Snips Modules](/images/screenshots/snips_nlu.png)


## {% linkable_title The Snips Voice Platform %}

### Installation

The Snips Voice Platform is installed as a docker image on Raspberry Pi with the following command:

```sh
(pi) $ curl https://install.snips.ai -sSf | sh
```

Snips can also be installed on a Debian/Ubuntu machine as well:

```sh
sudo apt-get update
sudo apt-get install -y dirmngr
sudo bash -c  'echo "deb https://debian.snips.ai/$(lsb_release -cs) stable main" > /etc/apt/sources.list.d/snips.list'
sudo apt-key adv --keyserver pgp.mit.edu --recv-keys F727C778CCB0A455

sudo apt-get update
sudo apt-get install -y snips-platform-voice
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

Raspberry Pi:
```sh
(pi) $ snips
```
Debian/Ubuntu:
```sh
sudo systemctl start "snips-*"
```

Snips is now ready to take voice commands from the microphone. To trigger the listening, simply say

> Hey Snips

followed by a command, e.g.

> Set the lights to green in the living room

We should see the transcribed phrase in the logs, as well as a properly parsed intent. The intent is published on MQTT, on the `hermes/intent/<slotName>` topic. The Snips Home Assistant component subscribes to this topic, and handles the intent according to the rules defined in `configuration.yaml`, as explained below.

#### Optional: specifying an external MQTT broker

By default, Snips runs its own MQTT broker. But we can also tell Snips to use an external broker by specifying this when launching Snips. In this case, instead of running the `snips` command above (which assumes we are using the internal MQTT broker), we use the full launch command with explicitly specified parameters (replace `MQTT_BROKER_IP` and `MQTT_BROKER_PORT` with appropriate values):

Raspberry Pi:
```sh
$ docker run -t --rm --name snips --log-driver none -v /home/pi/.asoundrc:/root/.asoundrc -v /opt/snips/config:/opt/snips/config --privileged -v /dev/snd:/dev/snd snipsdocker/platform --mqtt MQTT_BROKER_IP:MQTT_BROKER_PORT
```
Debian/Ubuntu:

Edit the /etc/snips.toml file. See snips documentation for more information on configuring this

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

Alternatively, MQTT can be configured to bridge messages between servers if using a custom mqtt broker such as mosquitto.

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
The variables that can be used in the template are of the form 'slotName = value'

Snips intents that utilize builtin slot types will contain extended information along with the value and can be exposed using this format:

```yaml
SetTimer:
  speech:
    type: plain
    text: weather
  action:
    service: script.set_timer
    data_template:
      name: "{{ timer_name }}"
      duration: "{{ timer_duration }}"
      seconds: "{{ slots.timer_duration.value.seconds }}"
      minutes: "{{ slots.timer_duration.value.minutes }}"
      hours: "{{ slots.timer_duration.value.hours }}"
      ```
