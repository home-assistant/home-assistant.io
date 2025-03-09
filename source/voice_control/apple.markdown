---
title: "Assist on Apple devices"
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

## Assist on iPhones

Assist is available on iPhones, iPads, and Macbooks.

Demo showing Assist being triggered from the iPhone 15 Pro action button and from the lock screen widget.

<lite-youtube videoid="AW_eslcO6AU" videotitle="Assist in Companion App for iOS"></lite-youtube>

### Prerequisites

- [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) installed
- Have an Assistant set up: either [cloud](/voice_control/voice_remote_cloud_assistant/) (recommended, more performant) or [local](/voice_control/voice_remote_local_assistant/).
- The devices you want to control with Assist are [exposed to Assist](/voice_control/voice_remote_expose_devices/) and you have checked most of the [best practices](/voice_control/best_practices/)

### Starting Assist in Home Assistant

1. On your phone, open Home Assistant.
2. In the top-right corner, select the three-dots menu and select **Assist**.
3. [Give a command](/voice_control/custom_sentences/).

### Starting Assist on your iPhone using a shortcut

This section was written using an iOS 18. Depending on your model and version, the exact steps may vary.

To use Home Assistant Assist as your voice assistant, follow these steps:

1. Create a shortcut to **Assist in app**
2. Choose one of following options to activate Assist:
   - [Start Assist using a back tap](#to-start-assist-using-a-back-tap).
   - [Start Assist using the action button](#to-start-assist-using-the-action-button).
   - [Start Assist using control center](#to-start-assist-using-control-center).
   - [Start Assist from Lock Screen](#to-start-assist-from-lock-screen).
3. [Give a command](/voice_control/custom_sentences/).

#### To create a shortcut to Assist in App

1. On the phone, open the **Shortcuts** app, and select **New**.
2. Type `Home Assistant` and select **Assist in app**.
3. **Choose** the pipeline.
4. Select **Done**. You now have a shortcut to **Assist in app**.

#### To start Assist using a back tap

1. Follow the Apple documentation on [Running shortcuts by tapping the back of your iPhone](https://support.apple.com/en-gb/guide/shortcuts/apd897693606/ios) and select the shortcut to **Assist in app**.
2. Start Assist by tapping the back of your phone.

#### To start Assist using the Action button

1. Go to **Settings** > **Action Button**, and scroll until you see **Controls**.
2. Under **Home Assistant**, select **Assist**.
3. Select your preferred pipeline.
4. Start the Assist by holding the action button.

For control center and lock screen:

#### To start Assist using control center

1. Open control center.
2. Press and hold an empty space and look for **Home Assistant**.
3. Select **Assist**.
4. After you see the icon in control center, tap on it again to choose which pipeline you want to use.

#### To start Assist from Lock Screen

1. Tap and hold an empty space in Lock Screen.
2. Choose one of the two bottom items where you want to replace using Assist.
3. Remove the item.
4. Tap on it to add a new item and find **Home Assistant Assist** in the list.
5. After you see the icon in lock screen, tap once more to choose which pipeline you want to use.
6. Alternatively you can execute the same steps but add a widget below the lock screen clock.

## Adjusting the language

Shortcuts triggered via Siri will always use the same language as Siri is set to. The Assist Button shortcut is meant to be manually triggered and can be configured for any language.

Open the shortcuts app, and edit the Button Assist shortcut. The text in quotes will be shown in the language of your device.

- Use the arrow to expand the _"Dictate text"_ action options, and select your language
- Use the arrow to expand the _"Assist with `Provided Input`"_ options, and select your language.

{% important %}
You can import the button shortcut multiple times to create versions for different languages, when asked if you would like to replace your Shortcut, choose "Keep Both".
{% endimportant %}

## Multiple servers

The Assist shortcut works also if you have configured multiple Home Assistant servers. By default it will prompt you to pick the server to sent the command to. This is not very hands-off, and so you can update the shortcut to point at a specific server. You will need to import the shortcuts multiple times, once for each server.

Open the shortcuts app and edit each Assist shortcut. The text in quotes will be shown in the language of your device.

- Use the arrow to expand the _"Assist with `Provided Input`"_ action, and select your Home Assistant server.
