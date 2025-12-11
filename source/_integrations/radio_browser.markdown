---
title: Radio Browser
description: Instructions on how to integrate Radio Browser into Home Assistant.
ha_category:
  - Media source
  - Multimedia
ha_release: 2022.3
ha_iot_class: Cloud Polling
ha_domain: radio_browser
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The Radio Browser integration allows you to use the directory of
radio stations collected on [Radio Browser](https://www.radio-browser.info)
in Home Assistant.

{% include integrations/config_flow.md %}

To start the Radio Browser, in Home Assistant, go to **Media** > **Radio Browser** and select the speaker.
![Starting the radio browser](/images/integrations/radio_browser/radio_browser.png)

## Automation

You can also use the Radio Browser in automations. When creating an automation, use the **Play Media** action to pick a station from the directory. This allows you, for example, to create
an automation that starts playing your favorite radio station on your Cast devices. 

If you want to use a YAML for the automation, you would look like this:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.YOUR_MEDIA_PLAYER
data:
  media_content_id: media-source://radio_browser/963ccae5-0601-11e8-ae97-52543be04c81
  media_content_type: audio/mpeg
```

See [Media Player](/integrations/media_player) for more options.
