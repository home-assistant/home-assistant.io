---
title: Home Assistant Cloud
description: Enable the Home Assistant Cloud integration.
ha_release: '0.60'
ha_category:
  - Voice
  - Text-to-speech
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: cloud
ha_platforms:
  - binary_sensor
  - stt
  - tts
---

The Home Assistant Cloud allows you to quickly integrate your local Home Assistant with various cloud services like Amazon Alexa and Google Assistant. [Learn more.](/cloud)

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry to enable the cloud component
cloud:
```

Documentation of further configuration possibilites are located at [NabuCasa](https://www.nabucasa.com/config/)

Once activated, go to the configuration panel in Home Assistant and create an account and log in. If you are not seeing the **Configuration** panel, make sure you have the following option enabled in your `configuration.yaml` file.

```yaml
config:
```
