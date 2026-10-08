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
  - conversation
  - stt
  - tts
ha_integration_type: system
related:
  - url: https://support.nabucasa.com/hc/categories/24734619902749
    title: Home Assistant Cloud user documentation
  - docs: /voice_control/voice_remote_cloud_assistant/
    title: Setting up a voice Assistant with Home Assistant Cloud
---

The Home Assistant Cloud allows you to quickly integrate your local Home Assistant with various cloud services, such as the following:

- [Amazon Alexa](https://support.nabucasa.com/hc/articles/25619363899677)
- [Google Assistant](https://support.nabucasa.com/hc/articles/25619376817053)
- [Secure remote access](https://support.nabucasa.com/hc/sections/26496346499997)
- [Speech-to-text](https://support.nabucasa.com/hc/articles/29718084245149)
- [Text-to-speech](https://support.nabucasa.com/hc/articles/25619386304541)
- [Offsite backup location](https://support.nabucasa.com/hc/sections/26353804834973)
- [Webhooks support](https://support.nabucasa.com/hc/articles/25619382358685)
- [Better WebRTC](https://support.nabucasa.com/hc/articles/25619464018461) for camera streaming

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

{% include integrations/actions.md %}

## Home Assistant Cloud automation examples

With the remote access actions, you decide when your Home Assistant is reachable from outside your home.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on remote access when you leave home

Only open up remote access when you actually need it. This automation turns it on when you leave home.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Leave
- **Action**: Home Assistant Cloud: Enable Home Assistant Cloud remote access

{% details "YAML example for turning on remote access when you leave" %}

{% example %}
automation: |
  alias: "Turn on remote access when I leave"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: leave
  actions:
    - action: cloud.remote_connect
{% endexample %}

{% enddetails %}

### Automation: turn off remote access when you get home

When you're home, you reach Home Assistant on your local network. This automation turns remote access off when you arrive.

- **Trigger**: Zone
  - **Entity with location**: You (`person.you`)
  - **Zone**: Home
  - **Event**: Enter
- **Action**: Home Assistant Cloud: Disable Home Assistant Cloud remote access

{% details "YAML example for turning off remote access when you get home" %}

{% example %}
automation: |
  alias: "Turn off remote access when I get home"
  triggers:
    - trigger: zone
      entity_id: person.you
      zone: zone.home
      event: enter
  actions:
    - action: cloud.remote_disconnect
{% endexample %}

{% enddetails %}
