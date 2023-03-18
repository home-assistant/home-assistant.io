---
title: Google Translate Text-to-Speech
description: Instructions on how to setup Google Translate Text-to-Speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 0.35
ha_iot_class: Cloud Push
ha_domain: google_translate
ha_platforms:
  - tts
ha_integration_type: integration
---

The `google_translate` text-to-speech platform uses the unofficial [Google Translate Text-to-Speech engine](https://translate.google.com/) to read a text with natural sounding voices. Contrary to what the name suggests, the integration only does text-to-speech and does not translate messages sent to it.

## Configuration

To enable text-to-speech with Google, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_translate
```

{% configuration %}
language:
  description: "The default speech language to use."
  required: false
  type: string
  default: "`en`"
tld:
  description: "The default Google domain you want to use to choose dialect."
  required: false
  type: string
  default: "`com`"
{% endconfiguration %}

Check the [complete list of supported languages](https://translate.google.com/intl/en_ALL/about/languages/) (languages where "Talk" feature is enabled in Google Translate) for allowed values.
Use the 2-digit language code which you can find at the end of the URL when you click on the language name. 

Check the [complete list of supported tld](https://www.google.com/supported_domains) for allowed TLD values. This is used to force the dialect used when multiple fall into the same 2-digit language code(i.e., *US, UK, AU*)

You can also use supported BCP 47 tags like the below or the 2-2 digit format for your supported dialect(`en-gb` or `en-us`). Below is a list of the currently implemented mappings:

| Dialect | Language | TLD |
|---------|----------|-----|
|en-us|en|com|
|en-gb|en|co.uk|
|en-uk|en|co.uk|
|en-au|en|com.au|
|en-ca|en|ca|
|en-in|en|co.in|
|en-ie|en|ie|
|en-za|en|co.za|
|fr-ca|fr|ca|
|fr-fr|fr|fr|
|pt-br|pt|com.br|
|pt-pt|pt|pt|
|es-es|es|es|
|es-us|es|com|


## Full configuration example

A full configuration sample including optional variables:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google_translate
    language: "de"
    tld: com
```

## Service say

The `google_translate_say` service supports `language` and also `options` for setting `tld`. The text for speech is set with `message`. Since release 0.92, the service name can be defined in the configuration `service_name` option.

Say to all `media_player` device entities:

```yaml
# Replace google_translate_say with <platform>_say when you use a different platform.
service: tts.google_translate_say
data:
  entity_id: all
  message: "May the force be with you."
```

Say to the `media_player.floor` device entity:

```yaml
service: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
```

Say to the `media_player.floor` device entity in French:

```yaml
service: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "Que la force soit avec toi."
  language: "fr"
```

Say to the `media_player.floor` device entity in UK English:

```yaml
service: tts.google_translate_say
data:
  entity_id: media_player.floor
  message: "May the force be with you."
  language: "en-uk"
```

```yaml
service: tts.google_translate_say
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
service: tts.google_translate_say
data:
  message: "Temperature is {{states('sensor.temperature')}}."
  cache: false
```

{% endraw %}

For more information about using text-to-speech with Home Assistant and more details on all the options it provides, see the [TTS documentation](/integrations/tts/).
