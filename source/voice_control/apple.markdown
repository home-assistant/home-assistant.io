---
title: "Assist on Apple devices"
---

Assist can be used on Apple devices via [Home Assistant Companion App](https://apps.apple.com/us/app/home-assistant/id1099568401).

## Assist on iPhones

Assist is available on iPhones, iPads, and Macbooks.

### Prerequisites

- [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) installed
- Have an Assistant set up: either [cloud](https://www.home-assistant.io/voice_control/voice_remote_cloud_assistant/) (recommended, more performant) or [local](https://www.home-assistant.io/voice_control/voice_remote_local_assistant/).
- The devices you want to control with Assist are [exposed to Assist](/voice_control/voice_remote_expose_devices/)

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

## Customizing the Siri experience

Siri allows activating shortcuts by their name. If you change the name of the "Assist" shortcut, you will also have to refer to it by its new name: "Hey Siri, my new name". Be aware that Siri can get confused and might not work if your shortcut name overlaps with actual Siri commands.

It is possible to change the text that Siri says when activating the Assist shortcut. Open the shortcuts app and edit each your Assist shortcut. The text in quotes will be shown in the language of your device.

- Find _"Ask for `Text`"_ and tap on _`How can I assist?`_ and change it to your desired prompt.

You can also use the share action to [add a Shortcut to your Home Screen](https://support.apple.com/guide/shortcuts/apd735880972/ios) or set an [Accessibility Shortcut](https://support.apple.com/en-gb/HT204390) to run this Shortcut when you triple-click the Side button.

## Troubleshooting

The latest version of Siri on the Apple Watch contains an annoying bug where it will not remember that the shortcut is allowed to talk to Home Assistant. This requires the user to tap or say "Allow" for every invocation of the Assist shortcut. The workaround is to remove the Home Assistant application from your watch, which will have the shortcut execute on your phone which does not have this problem. Removing the app prevents you from triggering actions via the Home Assistant interface for Apple Watch. It does not prevent you from adding shortcuts to trigger assist from a complication.

## Changelog

### Version 1 - Jan 26, 2023

Initial release
