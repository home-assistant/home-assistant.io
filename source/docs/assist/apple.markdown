---
title: "Assist on Apple devices"
---

Assist is integrated via [Home Assistant Companion](https://apps.apple.com/us/app/home-assistant/id1099568401) into Apple devices using the [Shortcuts app](https://support.apple.com/guide/shortcuts/welcome/ios). Assist can be used in the following ways on Apple devices:

- Activated by Siri by saying the shortcut name "Hey Siri, Assist"
- Added to your iPhone home screen
- Pinned to your Mac menu bar
- Activated via a keyboard shortcut on your Mac
- Added as an Apple Watch complication

<lite-youtube videoid="sQ7X7jz1SrA" videotitle="Assist on Apple HomePod"></lite-youtube>

## Installation

To get started make sure you're running the latest version of the [Home Assistant Companion app](https://apps.apple.com/us/app/home-assistant/id1099568401?itsct=apps_box_badge&itscg=30200) and have updated your Apple devices. Then download the two shortcuts and open them to import them:

- [Assist shortcut](https://www.icloud.com/shortcuts/4172210db1d74599bf9ae4f9e1e3d6ed)
- [Assist Button shortcut](https://www.icloud.com/shortcuts/73ebb68ca1a24ae1811b7d6971203334)

![Expanded Shortcuts Action](/images/assist/ios-expanded-shortcut-action.jpeg)

There are two versions of the shortcut. The normal shortcut works better with Siri while the Button shortcut has the ability to use speech-to-text when triggered outside of Siri and can customize the input language (instead of relying on the OS language)

[_Last updated: Jan 26, 2022_](#changelog)

### Adjusting the language

Shortcuts triggerd via Siri will always use the same language as Siri is set to. The Assist Button shortcut is meant to be manually triggered and can be configured for any language.

Open the shortcuts app, and edit the Button Assist shortcut. The text in quotes will be shown in the language of your device.

- Use the arrow to expand the _"Dictate text"_ action options, and select your language
- Use the arrow to expand the _"Assist with `Provided Input`"_ options, and select your language.

<p class='note'>
You can import the button shortcut multiple times to create versions for different languages, when asked if you would like to replace your Shortcut, choose "Keep Both".
</p>

## Multiple servers

The Assist shortcut works also if you have configured multiple Home Assistant servers. By default it will prompt you to pick the server to sent the command too. This is not very hands-off, and so you can update the shortcut to point at a specific server. You will need to import the shortcuts multiple times, once for each server.

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

### Version 1 - Jan 26, 2022

Initial release
