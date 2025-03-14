---
title: "Using Piper TTS in automations"
---

This procedure shows you how to create a text-to-speech {% term action %}. For this, we use our local text-to-speech engine, Piper, and the media player {% term service %}. Home Assistant can then speak to you over your media player as part of an {% term automation %}.

1. Go to **{% my automations title="Settings > Automations & Scenes" %}**, and select **Create automation**.
2. Select **Create new automation**, then **Add action**.
3. From the drop-down menu, search for or select **TTS: Speak**.
   ![Select the TTS action](/images/assist/speak-action.png)
4. To use fully local text-to-speech processing, select **piper** from the **Choose entity** control.
   ![Select Piper](/images/assist/select-entity.png)
5. Select the media player you want the automation to use.
6. Enter the text you want to hear for this automation.
   ![Enter text to be spoken](/images/assist/media-message.png)
7. Your text-to-speech action is now ready to be used in your script or automation.
8. Save your action.
