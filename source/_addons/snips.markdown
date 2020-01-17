---
title: "Snips.ai"
description: "Enhance your Hass.io installation with a local voice assistant."
---

[Snips.ai](https://snips.ai/) is an AI-powered voice assistant that runs on the Raspberry Pi 3 and x86 platforms. It runs on-device and is Private by Design.

<div class='warning note'>

The Snips add-on depends on the Mosquitto add on to bridge to Home Assistant, so make sure that is installed.

</div>

Home Assistant comes with certain Intents builtin to handle common tasks. A complete list of Intents can be found in this wiki [Hass Snips Bundle](https://github.com/tschmidty69/hass-snips-bundle-intents/wiki).

The Snips add-on by default comes with an assistant that allows you to turn on lights or switches, open covers, or add and list items to a [Shopping List](/integrations/shopping_list/) if that integration is enabled.

If using a USB microphone and speakers plugged into the Raspberry Pi output, Snips will work without any change to the configuration. Trying saying things like:

```txt
Turn on kitchen light
Open garage door
What is on my shopping list
```

To get started creating your own configuration, follow [their tutorial](https://docs.snips.ai/getting-started/quick-start-console) to create an assistant and download the training data. You can also add the Home Assistant Skill to your assistant to enable the built-in intents, and add or create your own intents to do more complex tasks.

Now install and activate the [Samba](/addons/samba/) add-on so you can upload your training data. Connect to the "share" Samba share and copy your assistant over. Name the file `assistant.zip` or whatever you have configured in the configuration options.

Now it's time to start Snips for the first time. You can configure the microphone and sound card using the Add-on interface. Now start the add-on.

### Add-On configuration

```json
{
  "mqtt_bridge": {
    "active": true,
    "host": "172.17.0.1",
    "port": 1883,
    "user": "",
    "password": ""
  },
  "assistant": "assistant.zip",
  "language": "en",
  "custom_tts": false,
  "tts_platform": "amazon_polly"
}
```

{% configuration %}
assistant:
  description: The name of your custom assistant in `/share`. If no assistant is found then a default assistant will be used.
  type: string
language:
  description: Language. This is used to select the default custom assistant, Currently `en`, `de` and `fr` are supported.
  type: string
custom_tts:
  description: Whether to use a TTS provider from Home Assistant for a variety of voices.
  type: boolean
  default: false
tts_platform:
  description: Which TTS platform to use.
  type: string
{% endconfiguration %}

### Home Assistant configuration

A simple configuration just requires this. Consult [Snips.ai integration](/integrations/snips/) for more options.

```yaml
snips:
```

### Home Assistant configuration

There is an active [discord](https://discordapp.com/invite/3939Kqx) channel and [Snips forum](https://forum.snips.ai/) for further support.

### Examples

So now you can turn lights on and off, let's check the weather. Log on to the [console](https://console.snips.ai/). If this is your first time, create a new assistant and add the Home Assistant skill, along with the Weather skill by snips. Download your assistant manually and copy it to the `/share` folder on your Hass.io installation using the Samba add-on.

Next create a weather sensor, e.g., one for [Dark Sky](/integrations/darksky/), and put the `api_key` in your `secrets.yaml` file. For this example to work you will need to have a valid API key from [Dark Sky](https://darksky.net/dev).

```yaml
- platform: darksky
  name: "Dark Sky Weather"
  api_key: !secret dark_sky_key
  update_interval:
    minutes: 10
  monitored_conditions:
    - summary
    - hourly_summary
    - temperature
    - temperature_max
    - temperature_min
```

Next add this to your `configuration.yaml` file to reference a new `intent_script` integration. This is a good practice to [split your configuration files](/docs/configuration/splitting_configuration/) up.

```yaml
intent_script: !include intent_script.yaml
```

Finally, create this `intent_script.yaml` file in your configuration directory.

{% raw %}

```yaml
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

Now just restart Hass.io and ask it what the weather is like.

[their tutorial]: https://github.com/snipsco/snips-platform-documentation/wiki/2.-Create-an-assistant-using-an-existing-bundle
