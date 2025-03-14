---
title: Home Assistant Cloud
description: Enable the Home Assistant Cloud integration.
ha_release: '0.60'
ha_category:
  - Backup
  - Speech-to-text
  - Text-to-speech
  - Voice
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: cloud
ha_platforms:
  - binary_sensor
  - stt
  - tts
ha_integration_type: system
---

The Home Assistant Cloud allows you to quickly integrate your local Home Assistant with various cloud services like Amazon Alexa and Google Assistant. It also enables a secure remote connection, speech-to-text, text-to-speech, an offsite backup location, Webhooks support, and better WebRTC. [Learn more.](/cloud)

## Configuration

This {% term integration %} is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry to enable the cloud component
cloud:
```

Documentation of further configuration possibilities are located at [NabuCasa](https://www.nabucasa.com/config/)

Once activated, go to the configuration panel in Home Assistant, create an account, and log in. If you are not seeing the **Settings** panel, make sure you have the following option enabled in your {% term "`configuration.yaml`" %} file.

```yaml
config:
```
