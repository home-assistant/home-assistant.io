---
title: Pico TTS
description: Instructions on how to setup Pico text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: picotts
ha_platforms:
  - tts
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `picotts` text-to-speech {% term integration %} uses [Pico TTS library](https://github.com/naggety/picotts) to read out text with natural sounding voices.
Pico TTS is a powerful open-source engine that runs locally (cloudless) so it can work even without an internet connection.

## Configuration

To enable text-to-speech with Pico, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
```

{% configuration %}
language:
  description: "The language to use. Supported languages are `en-US`, `en-GB`, `de-DE`, `es-ES`, `fr-FR` and `it-IT`."
  required: false
  type: string
  default: "`en-US`"
{% endconfiguration %}

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
    language: "fr-FR"
```
