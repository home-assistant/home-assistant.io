---
title: "Assist on Android"
---

## Assist on Android phones

Assist is available on Android phones and tablets using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) for Android.

### Prerequisites

- The devices you want to control with Assist are [exposed to Assist](/voice_control/voice_remote_expose_devices/)

### Setting up Home Assistant Assist as default assistant app on an Android phone

This section was written using an Android 13. Depending on your flavor of Android, the exact steps may vary.

To define Home Assistant Assist as default assistant app, follow these steps:

1. On the Android phone, go to **Settings** > **Apps** > **Default apps**.
2. Under **Digital assistant app**, select **Default digital assistant app**.
   - On some Android versions, this might be under **Digital & voice input** > **Default digital assistant app** > **Voice Assistant**.
3. Select **Home Assistant**.
   - On some Android versions, you might be able to change the assistants language settings here by selecting the cogwheel.
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

### Using Assist via shortcuts

You can create up to 5 shortcuts on your phone. The shortcut can point to any Home Assistant server you choose.

1. Create a new dashboard which only contains an [Assist button](/voice_control/start_assist_from_dashboard/).
   - Call it **assist**.
2. On the Android phone, go to **Settings** > **Companion app** and select **Manage shortcuts**.
3. Define the shortcut.
   - Select an icon, such as `message`.
   - Add a shortcut label and description.
   - Select the server (the Home Assistant instance you want to use).
   - Under **Shortcut type**, select **Dashboard**.
   - Under **Dashboard view**, enter the path to the Assist button. For example, `/lovelace/assist/`.
   - Select **Add shortcut**.
4. If you want to access multiple servers via Assist, repeat step 2 and step 3 for each server.
   - Make sure to use a different icon for each.
5. Place the shortcut.
   - On your home screen, long-tap the Home Assistant app.
   - The shortcuts should be listed.
   - Drag and drop the shortcuts to your home screen.


## Assist on Wear OS

Assist is available on Wear OS using the [Home Assistant Companion App](https://companion.home-assistant.io/) for Android and "Assist" tile.

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Wear OS"></lite-youtube>

### Setting up Assist on Wear OS

The way how Assist can be set up on your phone may differ depending on your version of Wear OS.

1. After [installing the companion app](https://companion.home-assistant.io/docs/getting_started/) and connecting it to your Home Assistant, Assist might appear automatically on the **Apps screen**.
2. If it does not, visit your watch companion app or the Wear OS app and select **Add tile** inside the **Tiles** area.
3. Tap the **Assist** tile to add it to your watch:
    
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

1. On your watch, swipe left until the **Assist** button is visible.
   
    ![Assist button](/images/assist/android_watch_1.png)

2. After tapping **Assist**, wait for **How can I assist?** to be displayed and the microphone to start pulsing.
   
    ![How can I assist](/images/assist/android_watch_2.png)

3. Speak your command.
   
    ![Assist speak your command](/images/assist/android_watch_3.png)

4. To change the assistant, tap the current assistant (**Home Assistant Cloud** in the screenshot above).
   - Select the assistant from the list.
    
   ![List of assistants](/images/assist/android_watch_6.png)


### Setting up Home Assistant Assist as default assistant app on a Wear OS watch

This procedure was written using Wear OS version 3.5. The exact steps may vary depending on the watch and software version.

To define Home Assistant Assist as default assistant app, follow these steps:

1. On the watch, navigate to the **Apps screen** and select the cogwheel.
2. Go to **Apps** > **Choose default apps** > **Digital assistant app**.
3. From the list, select **Home Assistant**.
4. When you go back one step, under **Default app**, it now says **HA: Assist**.
5. On some watches, you can now start Assist by pressing the crown key.
   - If this does not work, you need to assign Assist to a button: 
   - On your watch, go to **Settings** > **Advances features** > **Customize keys**.
   - Tap **Home key**, then tap **Double press**.
   - From the list of apps, select **HA: Assist**.
6. Now, use your key and speak a command.