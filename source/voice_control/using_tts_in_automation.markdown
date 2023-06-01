---
title: "Using Piper TTS in automations"
---

This procedure shows you how to create a text-to-speech {% term action %}. For this, we use our local text-to-speech engine, Piper, and the media player {% term service %}. Home Assistant can then speak to you over your media player as part of an {% term automation %}.

1. Go to **{% my automations title="Settings > Automations & Scenes" %}**, and select **Create automation**.
1. Select **Create new automation**, then **Add action**.
1. From the drop-down menu, select **Play media** and select the media player you want to use for this automation.
   ![Select your media player](/images/assist/tts_select_media_player.png)
1. Select **Pick media**, then, select **Text-to-speech**.
    ![Select your media source](/images/assist/tts_select_media_source.png)
1. To use fully local text-to-speech processing, select **Piper**.
    ![Select Piper](/images/assist/tts_select_piper.png)
1. Enter the text you want to hear for this automation.
    ![Enter text to be spoken](/images/assist/tts_enter_text.png)
1. Your text-to-speech action is now ready to be used in your script or automation.
    ![Enter text to be spoken](/images/assist/tts_action.png)
1. Save your action.
1. If you want, you can edit this service in YAML.

    ```yaml
    service: media_player.play_media
    target:
    entity_id: media_player.m5stack_atom_echo_a61920
    data:
    media_content_id: media-source://tts/tts.piper?message=Your+coffee+is+ready%21+Enjoy.
    media_content_type: provider
    metadata:
    title: Your coffee is ready! Enjoy.
    thumbnail: https://brands.home-assistant.io/_/tts/logo.png
    media_class: app
    children_media_class: null
    navigateIds:
        - {}
        - media_content_type: app
        media_content_id: media-source://tts
        - media_content_type: provider
        media_content_id: media-source://tts/tts.piper?message=Your+coffee+is+ready%21+Enjoy.
    ```
