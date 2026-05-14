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

The **Radio Browser** {% term integration %} allows you to use the directory of
radio stations collected on [Radio Browser](https://www.radio-browser.info)
in Home Assistant.

{% include integrations/config_flow.md %}

To start the Radio Browser, in Home Assistant, go to **Media** > **Radio Browser** and select the speaker.
![Starting the radio browser](/images/integrations/radio_browser/radio_browser.png)

## Automation

You can also use the Radio Browser in automations. When creating an automation in the UI, use the **Play Media** action to browse the Radio Browser directory and select a station. The station identifier is filled in automatically. This allows you, for example, to create an automation that starts playing your favorite radio station on your Cast devices.

If you prefer to write an automation in YAML, you need the station's UUID. To find it:

1. Open the [Radio Browser website](https://www.radio-browser.info).
2. Search for the station you want.
3. Select the station to open its details page. The UUID is shown on that page and is also part of the station's URL.

Then use the UUID in the `media_content_id` as shown below:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.YOUR_MEDIA_PLAYER
data:
  media_content_id: >-
    media-source://radio_browser/963ccae5-0601-11e8-ae97-52543be04c81
  media_content_type: audio/mpeg
```

See [Media Player](/integrations/media_player) for more options.
