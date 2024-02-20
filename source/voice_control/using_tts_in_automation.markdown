---
title: "Using Piper TTS in automations"
---

This procedure shows you how to create a text-to-speech {% term action %}. For this, we use our local text-to-speech engine, Piper, and the media player {% term service %}. Home Assistant can then speak to you over your media player as part of an {% term automation %}.

1. Go to **{% my automations title="Settings > Automations & Scenes" %}**, and select **Create automation**.
2. Select **Create new automation**, then **Add action**.
3. From the drop-down menu, select **Play media** and select the media player you want to use for this automation.
   ![Select your media player](/images/assist/tts_select_media_player.png)
4. Select **Pick media**, then, select **Text-to-speech**.
   ![Select your media source](/images/assist/tts_select_media_source.png)
5. To use fully local text-to-speech processing, select **Piper**.
   ![Select Piper](/images/assist/tts_select_piper.png)
6. Enter the text you want to hear for this automation.
   ![Enter text to be spoken](/images/assist/tts_enter_text.png)
7. Your text-to-speech action is now ready to be used in your script or automation.
   ![Enter text to be spoken](/images/assist/tts_action.png)
8. Save your action.
