---
title: Assist - Talking to Home Assistant
---

<img src='/images/assist/assist-logo.png' class='no-shadow' alt='Assist logo' style='width: 150px; float: right'>

Assist is our feature to allow you to control Home Assistant using natural language. It is built on top of an open voice foundation and powered by knowledge provided by our community. 

_Want to use Home Assistant with Google Assistant or Amazon Alexa? Get started with [Home Assistant Cloud](https://www.nabucasa.com/config/)._

With Assist, you can use the [built-in sentences](/voice_control/builtin_sentences) to control entities and areas, or [create your own](/voice_control/custom_sentences).

[List of supported languages.](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages)

Assist is available to use on most platforms that can interface with Home Assistant. Look for the Assist icon <img src='/images/assist/assist-icon.svg' alt='Assist icon' style='height: 32px' class='no-shadow'>:

- Inside the Home Assistant app in the top-right corner
- On Apple devices via [Siri and Assist shortcuts](/voice_control/apple)
- On Wear OS watches using [Assist tile](/voice_control/android)

Did Assist not understand your sentence? [Contribute them.](https://developers.home-assistant.io/docs/voice/intent-recognition/)

The Assist icon doesn't show up? Make sure the [conversation](/integrations/conversation/) integration is enabled. If you use YAML for configuration and have removed `default_config:`, the conversation integration may not be included in the config file.
 
_Assist was introduced in Home Assistant 2023.2._

<lite-youtube videoid="sQ7X7jz1SrA" videotitle="Assist on Apple HomePod"></lite-youtube>

## Setting up an Assist button on your dashboard

If you are using Home Assistant in kiosk mode, for example if you have a tablet mounted on the wall, a dashboard button lets you start Assist.

1. On your dashboard, select **Add card** and select the **Button** card.
2. Clear the **Entity** field and give the card a name, such as *Assist - listen*.
3. Select an icon, such as `mdi:account-tie-voice`.
4. From the **Action** dropdown menu, select **Assist**.
5. From the **Assist** dropdown menu, select the assistant you want to use, for example **Home Assistant Cloud**.
   - You can use any assistant you have previously set up.
   - If you have assistants in different languages, you can add a button for each of these languages.
6. If you are using Assist with your voice, enable **Start listening**.
   - If you don't want to use voice but just want to type, you do not need to enable listening. 
7. **Save** your new button card.
