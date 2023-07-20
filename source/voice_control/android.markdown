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

1. On Android, go to **Settings** > **Apps** > **Default apps**.
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

## Assist on Wear OS

Assist is available on Wear OS using the [Home Assistant Companion App](https://companion.home-assistant.io/) for Android and "Assist" tile.

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Wear OS"></lite-youtube>

### Installation

After [installing the companion app](https://companion.home-assistant.io/docs/getting_started/) and connecting it to your Home Assistant, visit your watch companion app or the Wear OS app and click "Add tile" inside the Tiles area. Select the "Assist" tile to add it to your watch:

![Conversation tile](/images/assist/android_tile.png)


### Usage

Swipe left on your watch until the "Assist" button is visible:

![Assist button](/images/assist/android_watch_1.png)

After pressing "Assist", wait for "Speak Now" to be displayed:

![Assist button](/images/assist/android_watch_2.png)

Speak your command, then press the "play" icon on the right to send the command to Home Assistant:

![Assist button](/images/assist/android_watch_3.png)


### Setting up Home Assistant Assist as default assistant app on a Wear OS watch

This procedure was written using Wear OS version 3.5. The exact steps may vary depending on the watch and software version.

To define Home Assistant Assist as default assistant app, follow these steps:

1. On the watch, navigate to the **Apps screen** and select the cogwheel.
2. Go to **Apps** > **Choose default apps** > **Digital assistant app**.
3. From the list, select **Home Assistant**.
4. When you go back one step, under **Default app**, it now says **HA: Assist**.