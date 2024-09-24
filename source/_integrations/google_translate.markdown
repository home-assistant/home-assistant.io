---
title: Google Translate text-to-speech
description: Instructions on how to setup Google Translate text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.35
ha_iot_class: Cloud Push
ha_domain: google_translate
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: integration
---

The `google_translate` text-to-speech platform uses the unofficial [Google Translate text-to-speech engine](https://translate.google.com/) to read a text with natural sounding voices. Contrary to what the name suggests, the integration only does text-to-speech and does not translate messages sent to it.

{% include integrations/config_flow.md %}

<details>
<summary><b>Supported Languages </b></summary>
  
All languages where the "Talk" feature is enabled in Google Translate are supported. The following is the current list of languages supported by Google. 
  
| Language Code | Language                      |
| ------------- | ----------------------------- |
| af            | Afrikaans                     |
| am            | Amharic                       |
| ar            | Arabic                        |
| bg            | Bulgarian                     |
| bn            | Bengali                       |
| bs            | Bosnian                       |
| ca            | Catalan                       |
| cs            | Czech                         |
| cy            | Welsh                         |
| da            | Danish                        |
| de            | German                        |
| el            | Greek                         |
| en            | English                       |
| es            | Spanish                       |
| et            | Estonian                      |
| eu            | Basque                        |
| fi            | Finnish                       |
| fil           | Filipino (Tagalog)            |
| fr            | French                        |
| gl            | Galician                      |
| gu            | Gujarati                      |
| ha            | Hausa                         |
| hi            | Hindi                         |
| hr            | Croatian                      |
| hu            | Hungarian                     |
| id            | Indonesian                    |
| is            | Icelandic                     |
| it            | Italian                       |
| iw            | Hebrew                        |
| ja            | Japanese                      |
| jw            | Javanese                      |
| km            | Khmer                         |
| kn            | Kannada                       |
| ko            | Korean                        |
| la            | Latin                         |
| lt            | Lithuanian                    |
| lv            | Latvian                       |
| ml            | Malayalam                     |
| mr            | Marathi                       |
| ms            | Malay                         |
| my            | Myanmar (Burmese)             |
| ne            | Nepali                        |
| nl            | Dutch                         |
| no            | Norwegian                     |
| pa            | Punjabi                       |
| pl            | Polish                        |
| pt            | Portuguese (Portugal, Brazil) |
| ro            | Romanian                      |
| ru            | Russian                       |
| si            | Sinhala (Sinhalese)           |
| sk            | Slovak                        |
| sq            | Albanian                      |
| sr            | Serbian                       |
| su            | Sundanese                     |
| sv            | Swedish                       |
| sw            | Swahili                       |
| ta            | Tamil                         |
| te            | Telugu                        |
| th            | Thai                          |
| tl            | Tagalog (Filipino)            |
| tr            | Turkish                       |
| uk            | Ukrainian                     |
| ur            | Urdu                          |
| vi            | Vietnamese                    |


</details>

Check the [complete list of supported tld](https://www.google.com/supported_domains) for allowed TLD values. This is used to force the dialect used when multiple fall into the same 2-digit language code(i.e., _US, UK, AU_)

You can also use supported BCP 47 tags like the below or the 2-2 digit format for your supported dialect(`en-gb` or `en-us`). Below is a list of the currently implemented mappings:

| Dialect | Language | TLD    |
| ------- | -------- | ------ |
| en-us   | en       | com    |
| en-gb   | en       | co.uk  |
| en-uk   | en       | co.uk  |
| en-au   | en       | com.au |
| en-ca   | en       | ca     |
| en-in   | en       | co.in  |
| en-ie   | en       | ie     |
| en-za   | en       | co.za  |
| fr-ca   | fr       | ca     |
| fr-fr   | fr       | fr     |
| pt-br   | pt       | com.br |
| pt-pt   | pt       | pt     |
| es-es   | es       | es     |
| es-us   | es       | com    |


## Action speak

The `tts.speak` action is the modern way to use Google translate TTS action. Add the `speak` action, select the entity for your Google translate TTS (it's named for the language you created it with), select the media player entity or group to send the TTS audio to, and enter the message to speak.

For more options about `speak`, see the Speak section on the main [TTS](/integrations/tts/#action-speak) building block page.

In YAML, your action will look like this:
```yaml
action: tts.speak
target:
  entity_id: tts.google_en_com
data:
  media_player_entity_id: media_player.giant_tv
  message: Hello, can you hear me now?
```

## Action say (legacy)

{% tip %}
The `google_translate_say` action can be used when configuring the legacy `google_translate` text-to-speech platform in `configuration.yaml`. We recommend new users to instead set up the integration in the UI and use the `tts.speak` action with the corresponding Google Translate text-to-speech entity as target.
{% endtip %}

The `google_translate_say` action supports `language` and also `options` for setting `tld`. The text for speech is set with `message`. Since release 0.92, the action name can be defined in the configuration `service_name` option.

Say to all `media_player` device entities:

```yaml
# Replace google_translate_say with <platform>_say when you use a different platform.
action: tts.google_translate_say
data:
  entity_id: all
  message: "May the force be with you."
```

Say to the `media_player.floor` device entity:

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
```

Say to the `media_player.floor` device entity in French:

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "Que la force soit avec toi."
  language: "fr"
```

Say to the `media_player.floor` device entity in UK English:

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
  language: "en-uk"
```

```yaml
action: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
  language: "en"
  options:
    tld: co.uk
```

With a template:

{% raw %}

```yaml
action: tts.google_translate_say
data:
  message: "Temperature is {{states('sensor.temperature')}}."
  cache: false
```

{% endraw %}

For more information about using text-to-speech with Home Assistant and more details on all the options it provides, see the [TTS documentation](/integrations/tts/).
