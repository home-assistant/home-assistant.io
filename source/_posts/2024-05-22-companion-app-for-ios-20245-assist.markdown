---
layout: post
title: "Companion app for iOS 2024.5: Let me Assist you 🍎"
description: "Assist on iOS and companion App progress so far."
date: 2024-05-22 00:00:02
date_formatted: "May 22, 2024"
author: Bruno Pantaleão
comments: true
categories: iOS Release-Notes
og_image: /images/blog/2024-05-ios-assist/ios-og.jpg
---

Hey, this is Bruno. It has been a great few months since I joined Nabu Casa to work full-time on the Home Assistant iOS app, again a big thanks to our Home Assistant Cloud subscribers for making this possible. Today, I would like to recap what has been introduced since [the last blog post for version 2024.1](/blog/2024/01/29/companion-app-for-ios-20241-carplay/) and discuss more about how Assist is being integrated into the Apple ecosystem - along with a number of other improvements to the app.

![Companion App for iOS 2024.5](/images/blog/2024-05-ios-assist/ios-og.jpg)

<!--more-->

## Assist on iOS

I am very happy to bring Assist for iOS with a new native UI, integrated with iOS shortcuts and widgets, so let’s start with a quick demo:

<lite-youtube videoid="AW_eslcO6AU" videotitle="Assist in Companion App for iOS"></lite-youtube>

In this demo, you see Assist being triggered from the iPhone 15 Pro “action button” and lock screen widget. Those are a few ways of interacting with Assist, but as it’s an iOS shortcut, you can trigger it in all sorts of creative ways. You can create an automation triggered by scanning an NFC tag that launches Assist, or even add it to an existing shortcut you already use.

### “What if I don’t have an iPhone 15 pro to use the action button?”

It would be ideal if we could replace Siri with Assist in the power button long press, but since Apple doesn’t allow that. The second best option becomes the action button. For iPhones without it, there is a third option, the accessibility feature called “back tap”. Follow [this guide on the Apple page](https://support.apple.com/en-gb/guide/shortcuts/apd897693606/ios) to learn how to configure it.

### Widgets

If back tap doesn’t work for you, Assist can be activated via our widgets from the home screen or with our very first iOS lock screen widget, which looks great:

![Assist Widgets](/images/blog/2024-05-ios-assist/widgets.png)

### Accessibility feature alternative

There is “one more thing” that you can use to launch Assist, iOS has an accessibility feature called “Voice Control” which allows a user to basically navigate an iPhone completely using voice commands. On top of that they allow you to add “custom commands” so… Yes! You can just add “Ok Nabu”, then use the option **Run shortcut** and have it trigger “Assist In App”.

There are a couple of things to take into consideration. I tried this last weekend, and although it’s pretty cool, it’s not as fast as calling Siri. You will also have full voice control enabled, so you trigger other commands every once in a while.

<lite-youtube videoid="ovFqaIiefuo" videotitle="Assist in iOS using accessibility voice control"></lite-youtube>

## Other highlights

- We have introduced the ability to run your Action widgets in the background, so you can quickly trigger them instead of having to wait for the app to launch to see the result.

- This version introduced a simple way to create an automation for your iOS Action: simply tap on the “create automation” button.

- We started improving our widgets' performance and capabilities. I know you all have great ideas, and I am currently working on the foundation to allow those to happen, but please continue sending feature requests to our Home Assistant Community.

- When we first released CarPlay integration, we missed out on displaying all areas due to a limitation in the number of items allowed on a list. Since 2024.2, we have worked around this by using the first and last rows of the areas list as pagination arrows, so you can now see all your rooms.

- The Actions UI in CarPlay was aligned to display the same information as in Apple Watch, previously we were displaying the “Identifier” and ”Text”, now we display just the “Text” so we keep consistency between platforms.

- We also added a button to reload your widgets, since sometimes they may become blank for a few users after an update. For actions, we added a button to update server-created Actions manually, so you don't need to reopen the app for that (but remember to restart HA after adding or removing Actions from YAML).

- Memory usage and performance issues on our macOS client are big topics in our GitHub right now, and we are aware of them and are working towards improving them. As this release is the first iteration in that direction, we would like your feedback since this issue is not easily reproducible in all instances.

Before wrapping up, I would like to say how important reporting issues on GitHub is for the development of these companion apps. We are addressing them as fast as we can and with the attention necessary to make sure your problems are resolved. I would also like to take this opportunity to invite iOS devs (aspiring or established) who wish to contribute to jump in. Drop me a message so we can work together and move faster, I will be happy to help you get started.