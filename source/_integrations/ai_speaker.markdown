---
title: AI-Speaker
description: How to set up the AI-Speaker media player integration
ha_category:
  - Media Player
ha_release: 2020.02
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@asystentka-jolka'
ha_domain: ai_speaker
---

The `AI-Speaker` platform allows you to control a [AI-Speaker](https://ai-speaker.com/) media player from Home Assistant.

## Configuration

In Home Assistant go to **Menu** -> **Configuration** -> **Integrations**

then click on the `+ ADD INTEGRATION` button to add an integration,

next click on **AI-Speaker**, 

and finally input the host of the AI-Speaker device in your local network.

<p class='img'>
  <img src='/images/integrations/ai_speaker/add_ais_integraion.png' alt='Screenshot: Add AIS Integration'>
</p>


<div class='note'>
You can use this integration in basic functionality without the AI-Speaker gateway / loudspeaker. All you need to do is install the free Android <a href="https://play.google.com/store/apps/details?id=pl.sviete.dom&hl=pl&gl=US">AIS-dom application from Google Play</a> and turn on the player function in it.
</div>
