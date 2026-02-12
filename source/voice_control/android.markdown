---
title: "Assist on Android"
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing devices to Assist
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - docs: /voice_control/about_wake_word/
    title: About wake words
  - url: https://companion.home-assistant.io/docs/getting_started/
    title: Home Assistant Companion App
  - url: https://support.nabucasa.com/hc/categories/24451727188125
    title: Voice Preview Edition
---

## Assist on Android phones

Assist can be used on Android phones and tablets using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/).

### Prerequisites

- [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) installed
- Have an Assistant set up: either [cloud](/voice_control/voice_remote_cloud_assistant/) (recommended, more performant) or [local](/voice_control/voice_remote_local_assistant/).
- The devices you want to control with Assist are [exposed to Assist](/voice_control/voice_remote_expose_devices/) and you have checked most of the [best practices](/voice_control/best_practices/)

### Starting Assist in Home Assistant

1. On your phone, open Home Assistant.
2. In the top-right corner, select the three-dots menu and select **Assist**.
3. [Give a command](/voice_control/custom_sentences/).

### About wake word detection on Android

Wake word detection allows you to activate Assist hands-free by saying a wake word like "Hey Jarvis" or "Hey Nabu". Your Android device uses [microWakeWord](/voice_control/about_wake_word/#about-on-device-wake-word-processing-microwakeword) to process wake words locally on the device, which means your audio stays private and no audio is sent to Home Assistant until after the wake word is detected.

{% important %}
Wake word detection continuously monitors audio for wake words, which has a noticeable impact on battery life. Consider disabling wake word detection when you don't need it or [control it remotely from Home Assistant](#controlling-wake-word-detection-from-home-assistant) to turn it on only when needed.
{% endimportant %}

{% note %}
Wake word detection on Android uses more battery than "Ok Google" because Google Assistant has access to dedicated low-power hardware for wake word detection on supported devices. Unfortunately, Google does not make this specialized hardware accessible to third-party app developers, forcing apps like Home Assistant to rely on standard audio processing, which consumes more power by keeping the CPU on all the time. This platform limitation means third-party voice assistants cannot achieve the same battery efficiency as Google's built-in assistant.
{% endnote %}

Wake word detection runs entirely on your Android device, which means it works without an active internet connection (though executing commands still requires connectivity to your Home Assistant instance). When multiple devices detect the same wake word simultaneously (like another Android phone or a Voice Preview Edition), only the first device to capture the wake word will keep the Assist session open while other devices automatically cancel their sessions.

### Enabling wake word detection on Android

To enable wake word detection on your Android device, follow these steps:
#### Prerequisites

- Home Assistant Companion App version 2026.2.3 or later
- Assist set as the [default assistant app](#setting-up-home-assistant-assist-as-default-assistant-app)
- [Home Assistant Cloud](/voice_control/voice_remote_cloud_assistant/) or a manually configured [local Assist pipeline](/voice_control/voice_remote_local_assistant)

#### To enable wake word detection

1. On your Android phone, open the **Home Assistant** app.
2. Go to **Settings** > **Companion app**.
3. Open **Assist for Android**.
4. Enable **Wake word detection**.
5. Select a wake word from the available options:
   - Hey Nabu
   - Hey Jarvis
   - Hey Mycroft
   **Result**:  Once enabled, wake word detection works even when your device is locked or the app is in the background.
6. To use Assist on Android, say your chosen wake word, wait for the listening prompt, and then speak your command.

#### Controlling wake word detection from Home Assistant

You can turn wake word detection on or off remotely from Home Assistant. This is useful for automations that enable wake word detection only when you're at home or during specific times to save battery.

Use the `command_wake_word_detection` command with `turn_on` or `turn_off` to control wake word detection. For details on how to send commands to the companion app, see the [notification commands documentation](https://companion.home-assistant.io/docs/notifications/notification-commands/).

### Setting up Home Assistant Assist as default assistant app

This section was written using an Android 13. Depending on your flavor of Android, the exact steps may vary.

To define Home Assistant Assist as default assistant app on your Android phone, follow these steps:

1. On the Android phone, go to **Settings** > **Apps** > **Default apps**.
2. Under **Digital assistant app**, select **Default digital assistant app**.
   - On some Android versions, this might be under **Digital & voice input** > **Default digital assistant app** > **Voice Assistant**.
3. Select **Home Assistant**.

   - On some Android versions, you might be able to change the assistant's language settings here by selecting the cogwheel {% icon "mdi:cog-outline" %}.
4. Go back one step. The **Default digital assistant app** should now show *Home Assistant* as the default.
5. Leave the **Settings**.
6. Start Assist using the gesture to start an assistant. The gesture may differ depending on the version.
   - Swipe from the bottom left corner.
   - Long press the power button.
   - Hold the home button (square button at the bottom).
7. You can now also start Assist from your lock screen.
   <lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

### Using Assist with multiple Home Assistant servers

Once Assist has been defined as the default digital assistant on your phone, you can use Assist with multiple servers. This can be useful for example, if you maintain a Home Assistant instance for someone else's home.

1. Make sure you have a voice assistant set up on the Home Assistant servers.
2. Make sure the servers are added to the companion app.
   - On the Android phone, go to **Settings** > **Companion app** and select **Add server**.
   - From the list, select the additional server.
3. Start Assist using the gesture to start an assistant. The gesture may differ depending on the version.
   - Swipe from the bottom left corner.
   - Long press the power button.
   - Hold the home button (square button at the bottom).
4. Open the assistant drop-down menu.

   ![Using Assist with multiple servers](/images/assist/android_multi-server_01.png)

5. Select the assistant from the instance you want to speak to.
   - Speak your command.

### Using Assist via shortcut

1. On your phone, open the **Widgets** panel.
2. From the list, select **Home Assistant**.
3. Long tap the **Assist** icon and drag it onto your home screen.
4. Select the server and the assistant.
5. If you want to be able to use voice control, enable the **Start listening** toggle.
6. Repeat this procedure for each server you want to connect to, for example, if you support someone else's home.

## Assist on Wear OS

Assist is available on Wear OS using the [Home Assistant Companion App](https://companion.home-assistant.io/) for Android and "Assist" tile.

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Wear OS"></lite-youtube>

### Setting up Assist on Wear OS

The way how Assist can be set up on your phone may differ depending on your version of Wear OS.

1. After [installing the companion app](https://companion.home-assistant.io/docs/getting_started/) on your watch and connecting it to your Home Assistant, Assist appears automatically on the **Apps screen**.
    
    ![Assist app](/images/assist/wearos_assist_app.png)

2. To add an Assist tile, in the Wear OS app, go to the **Tiles** area, select **Add tile** > **Assist**.
    
    ![Conversation tile](/images/assist/android_tile.png)

### Adding Assist to the watch face

1. On your phone, open the **Watch** app and select **Watch faces**.
2. Make sure you select a watch face that supports complications (little shortcut icons).
3. Tap **Edit**.
4. In the **Complications** section, select one of the slots and choose **Assist**.
   - If you just recently added the Home Assistant app, Assist may not be listed yet.
   - After rebooting your watch, under **Complications**, there should be a section with Home Assistant icons.
5. Save your changes. You should now see Assist as a complication on your watch face.
   
     ![Assist complication](/images/assist/android_watch_5.png)

### Using Assist on Wear OS

1. On your watch, open Assist. 
   - For example, swipe left until the **Assist** button is visible.
   
    ![Assist button](/images/assist/android_watch_1.png)

2. After tapping **Assist**, wait for **How can I assist?** to be displayed and the microphone to start pulsing.
   
    ![How can I assist](/images/assist/android_watch_2.png)

3. Speak your command.
   
    ![Assist speak your command](/images/assist/android_watch_3.png)

4. To change the assistant, tap the current assistant (**Home Assistant Cloud** in the screenshot above).
   - Select the assistant from the list.
    
   ![List of assistants](/images/assist/android_watch_6.png)

### Setting up Home Assistant Assist as default assistant app on a Wear OS watch

This procedure was written using Wear OS version 4.0. The exact steps may vary depending on the watch and software version.

To define Home Assistant Assist as default assistant app, follow these steps:

1. On the watch, navigate to the **Apps screen** and select the cogwheel {% icon "mdi:cog-outline" %}.
2. Go to **Apps** > **Choose default apps** > **Digital assistant app**.
3. From the list, select **Home Assistant**.
4. When you go back one step, under **Default app**, it now says **HA: Assist**.
5. On some watches, you can now start Assist by pressing the crown key.
   - If this does not work, you can manually assign Assist to a button.
6. Now, use your key and speak a command.

### Assigning a button to Assist

Depending on your watch, you can assign Assist to a button so that you can start it directly with a long or double press.

1. On your watch, go to **Settings** > **Advances features** > **Customize keys**.
2. Assign a key:
   - To use double press, tap **Home key** > **Double press**. From the list of apps, select **HA: Assist**.
   - On a Galaxy watch, if Assist is set as the default, you can use long press. Tap **Home key**, then tap **press and hold**. Select **Assistant**. 
     - Then long press the home key, and from the selection, select **HA: Assist**.
     - Select **Always**.
      
     ![List of assistants](/images/assist/android_watch_7.png)
3. Now, use your key and speak a command.
