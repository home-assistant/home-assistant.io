---
title: "Assist on Android"
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing devices to Assist
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
  - url: https://companion.home-assistant.io/docs/getting_started/
    title: Home Assistant Companion App
  - url: https://voice-pe.home-assistant.io/
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
