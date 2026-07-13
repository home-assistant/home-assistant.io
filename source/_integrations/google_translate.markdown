---
title: Google Translate text-to-speech
description: Instructions on how to set up Google Translate text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.35
ha_iot_class: Cloud Push
ha_domain: google_translate
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
---

The **Google Translate text-to-speech** {% term integration %} uses the unofficial [Google Translate text-to-speech engine](https://translate.google.com/) to read text with natural-sounding voices. Despite the name, the integration only does text-to-speech and does not translate the messages you send to it.

{% include integrations/config_flow.md %}

{% details "Supported languages" %}

All languages where the "Talk" feature is enabled in Google Translate are supported. The current list of supported languages is:
  
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

{% enddetails %}

Check the [complete list of supported TLDs](https://www.google.com/supported_domains) for allowed TLD values. This is used to force the dialect when multiple dialects fall into the same 2-digit language code (for example, _US_, _UK_, or _AU_).

You can also use supported BCP 47 tags or the 2-2 digit format for your supported dialect (`en-gb` or `en-us`). The currently implemented mappings are:

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

## Using Google Translate text-to-speech in automations

To play a message with Google Translate text-to-speech from an automation or a script, use the [**Speak**](/actions/tts.speak/) action and select your Google Translate text-to-speech entity as the target. The entity is named for the language and top-level domain you created it with, for example `tts.google_en_com`.

To use this action from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your Google Translate text-to-speech entity.
6. From the actions shown for that target, select **Speak**.
7. Select the media player, enter the message, and set any other options.
8. Select **Save**.

You can use `language` to set the language for a specific message. You can use `options.tld` to set the Google Translate top-level domain, for example `co.uk` for UK English.

If you set up the legacy `google_translate` text-to-speech platform in {% term "configuration.yaml" %}, use the [**Say a TTS message**](/actions/tts.say/) action instead. The legacy action is registered as `tts.google_translate_say` unless you set a custom `service_name` in the platform configuration.

For more information about using text-to-speech with Home Assistant and more details on all the options it provides, see the [TTS documentation](/integrations/tts/).
