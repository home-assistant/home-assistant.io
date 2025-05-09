---
title: Snips
description: Instructions on how to integrate Snips within Home Assistant.
ha_category:
  - Voice
ha_release: 0.48
ha_domain: snips
ha_iot_class: Local Push
ha_integration_type: integration
ha_quality_scale: legacy
---

{% warning %}
The Snips Console no longer available due to acquisition by Sonos. For more details, read the [announcement on the Snips forum](http://web.archive.org/web/20200109164247/https://forum.snips.ai/t/important-message-regarding-the-snips-console/4145).
{% endwarning %}

The [Snips Voice Platform](https://www.snips.ai) allows users to add powerful voice assistants to their Raspberry Pi devices without compromising on privacy. It runs 100% on-device, and does not require an internet connection. It features Hotword Detection, Automatic Speech Recognition (ASR), Natural Language Understanding (NLU) and Dialog Management.

The latest documentation can be found here: [Snips Platform Documentation](https://docs.snips.ai/).

![Snips Modules](/images/screenshots/snips_modules.png)

Snips takes voice or text as input and produces *intents* as output, which are explicit representations of an intention behind an utterance and which can subsequently be used by Home Assistant to perform appropriate actions.

![Snips Modules](/images/screenshots/snips_nlu.png)

## The Snips Voice Platform

### Installation

The Snips platform can be installed via the Snips APT/Debian repository.

```bash
sudo apt-get update
sudo apt-get install -y dirmngr
sudo bash -c  'echo "deb https://raspbian.snips.ai/$(lsb_release -cs) stable main" > /etc/apt/sources.list.d/snips.list'
sudo apt-key adv --fetch-keys https://raspbian.snips.ai/531DD1A7B702B14D.pub
sudo apt-get update
sudo apt-get install -y snips-platform-voice
```

Note that if the keyserver pgp.mit.edu is down then try to use another one in the 4th line, like pgp.surfnet.nl:

```bash
sudo apt-key adv --keyserver pgp.surfnet.nl --recv-keys D4F50CDCA10A2849
```

### Creating an assistant

Head over to the [Snips Console](https://console.snips.ai) to create your assistant. Launch the training and download by clicking on the "Download Assistant" button.

The next step is to get the assistant to work on your device. Unzip and copy the `assistant` folder that you downloaded from the web console to the path. Assuming your downloaded `assistant` folder is on your desktop, just run:

```bash
scp -r ~/Desktop/assistant pi@<raspi_hostname.local_or_IP>:/home/pi/.
```

Now ssh into your Raspberry Pi:

```bash
ssh pi@<raspi_hostname.local_or_IP>
```

By default, this command is `ssh pi@raspberrypi.local`, if you are using the default Raspberry Pi hostname.

Then, move the assistant to the right folder:

```bash
(pi) $ sudo mv /home/pi/assistant /usr/share/snips/assistant
```

Note that if you already have an assistant installed and wish to replace it then start by removing the previous one and then move the new one in its place:

```bash
(pi) $ sudo rm -r /usr/share/snips/assistant
(pi) $ sudo mv /home/pi/assistant /usr/share/snips/assistant
```

### Running Snips

Make sure that a microphone is plugged to the Raspberry Pi. If you are having trouble setting up audio, we have written a guide on [Raspberry Pi Microphones](https://docs.snips.ai/articles/raspberrypi/hardware/microphones).

Start the Snips Voice Platform by starting the `snips-*` actions:

```bash
sudo systemctl start "snips-*"
```

Snips is now ready to take voice commands from the microphone. To trigger the listening, simply say

_Hey Snips_

followed by a command, e.g.

_Set the lights to green in the living room_

As the Snips Platform parses this query into an intent, it will be published on MQTT, on the `hermes/intent/<intentName>` topic. The Snips Home Assistant integration subscribes to this topic, and handles the intent according to the rules defined in {% term "`configuration.yaml`" %} file, as explained below.

#### Optional: specifying an external MQTT broker

By default, Snips runs its own MQTT broker. But we can also tell Snips to use an external broker by specifying this when launching Snips. In this case, we need to specify this in the `/etc/snips.toml` configuration file. For more information on configuring this, see the [Snips Platform Configuration](https://docs.snips.ai/articles/platform/platform-configuration) article.

## Home Assistant configuration

{% configuration %}
feedback_sounds:
  description: Turn on feedbacks sounds for Snips.
  required: false
  type: string
  default: false
site_ids:
  description: A list of siteIds if using multiple Snips instances. Used to make sure feedback is toggled on or off for all sites.
  required: false
  type: string
probability_threshold:
  description: Threshold for intent probability. Range is from 0.00 to 1.00, 1 being highest match. Intents under this level are discarded.
  require: false
  type: float
{% endconfiguration %}

### Specifying the MQTT broker

Messages between Snips and Home Assistant are passed via MQTT. We can either point Snips to the MQTT broker used by Home Assistant, as explained above, or tell Home Assistant which [MQTT broker](/integrations/mqtt) to use by adding the following entry to the {% term "`configuration.yaml`" %} file:

```yaml
mqtt:
  broker: MQTT_BROKER_IP
  port: MQTT_BROKER_PORT
```

By default, Snips runs an MQTT broker on port 9898. So if we wish to use this broker, and if Snips and Home Assistant run on the same device, the entry will look as follows:

```yaml
mqtt:
  broker: 127.0.0.1
  port: 9898
```

Alternatively, MQTT can be configured to bridge messages between servers if using a custom MQTT broker such as [mosquitto](https://mosquitto.org/).

### Triggering actions

In Home Assistant, we trigger actions based on intents produced by Snips using the [`intent_script`](/integrations/intent_script) integration. For instance, the following block handles a `ActivateLightColor` intent to change light colors:

Note: If your Snips action is prefixed with a username (e.g., `john:playmusic` or `john__playmusic`), the Snips integration in Home Assistant will try and strip off the username. Bear this in mind if you get the error `Received unknown intent` even when what you see on the MQTT bus looks correct. Internally the Snips integration is trying to match the non-username version of the intent (i.e., just `playmusic`).

{% raw %}

```yaml
snips:

intent_script:
  ActivateLightColor:
    action:
      - action: light.turn_on
        target:
          entity_id: 'light.{{ objectLocation | replace(" ","_") }}'
        data:
          color_name: "{{ objectColor }}"
```

{% endraw %}

In the `data` block, we have access to special variables, corresponding to the slot names for the intent. In the present case, the `ActivateLightColor` has two slots, `objectLocation` and `objectColor`.

### Special slots

Several special values for slots are populated with the `siteId` the intent originated from and the probability value for the intent, the `sessionId` generate by the dialogue manager, and `slote_name` raw which will contain the raw, uninterpreted text of the slot value.

In the above example, the slots are plain strings. However, Snips has a duration builtin value used for setting timers and this will be parsed to a seconds value.

In this example if we had an intent triggered with 'Set a timer for five minutes', `duration:` would equal 300 and `duration_raw:` would be set to 'five minutes'. The duration can be easily used to trigger Home Assistant events and the `duration_raw:` could be used to send a human readable response or alert.

{% raw %}

```yaml
SetTimer:
  speech:
    type: plain
    text: "Set a timer"
  action:
    action: script.set_timer
    data:
      name: "{{ timer_name }}"
      duration: "{{ timer_duration }}"
      siteId: "{{ site_id }}"
      sessionId: "{{ session_id }}"
      duration_raw: "{{ raw_value }}"
      probability: "{{ probability }}"
```

{% endraw %}

### Sending TTS Notifications

You can send TTS notifications to Snips using the `snips.say` and `snips.say_action` actions. `say_action` starts a session and waits for user response, "Would you like me to close the garage door?", "Yes, close the garage door".

#### Action `snips.say`

| Data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `text`                 |       no | Text to say.                                           |
| `site_id`              |      yes | Site to use to start session.                          |
| `custom_data`          |      yes | custom data that will be included with all messages in this session. |

#### Action `snips.say_action`

| Data attribute | Optional | Description                                            |
|------------------------|----------|--------------------------------------------------------|
| `text`                 |       no | Text to say.                                           |
| `site_id`              |      yes | Site to use to start session.                          |
| `custom_data`          |      yes | custom data that will be included with all messages in this session. |
| `can_be_enqueued`      |      yes | If True, session waits for an open session to end, if False session is dropped if one is running. |
| `intent_filter`        |      yes | Array of Strings - A list of intents names to restrict the NLU resolution to on the first query. |

### Configuration Examples

#### Turn on a light

```yaml
intent_script:
  turn_on_light:
    speech:
      type: plain
      text: "OK, turning on the light"
    action:
      action: light.turn_on
```

##### Open a Garage Door

```yaml
intent_script:
  OpenGarageDoor:
    speech:
      type: plain
      text: "OK, opening the garage door"
    action:
      - action: cover.open_cover
        target:
          entity_id: garage_door
```

##### Intiating a query

Here is a more complex example. The automation is triggered if the garage door is open for more than 10 minutes. Snips will then ask you if you want to close it and if you respond with something like "Close the garage door" it will do so. Unfortunately there is no builtin support for yes and no responses.

```yaml
automation:
  garage_door_has_been_open:
    triggers:
     - trigger: state
        entity_id: binary_sensor.my_garage_door_sensor
        from: "off"
        to: "on"
        for:
          minutes: 10
    sequence:
      action: snips.say_action
        data:
          text: "Garage door has been open 10 minutes, would you like me to close it?"
          intent_filter:
            - closeGarageDoor

# This intent is fired if the user responds with the appropriate intent after the above notification
intent_script:
  closeGarageDoor:
    speech:
      type: plain
      text: "OK, closing the garage door"
    actions:
      - action: script.garage_door_close
```

##### Weather

So now you can open and close your garage door, let's check the weather. Add the Weather by Snips Skill to your assistant. Create a weather sensor, in this example [Dark Sky](/integrations/darksky) and the `api_key` in the `secrets.yaml` file.

```yaml
- platform: darksky
  name: "Dark Sky Weather"
  api_key: !secret dark_sky_key
  scan_interval:
    minutes: 10
  monitored_conditions:
    - summary
    - hourly_summary
    - temperature
    - temperature_max
    - temperature_min
```

Then add this to your configuration file.

{% raw %}

```yaml
intent_script:
  searchWeatherForecast:
    speech:
      type: plain
      text: >
        The weather is currently
        {{ states('sensor.dark_sky_weather_temperature') | round(0) }}
        degrees outside and {{ states('sensor.dark_sky_weather_summary') }}.
        The high today will be
        {{ states('sensor.dark_sky_weather_daily_high_temperature') | round(0)}}
        and {{ states('sensor.dark_sky_weather_hourly_summary') }}
```

{% endraw %}
