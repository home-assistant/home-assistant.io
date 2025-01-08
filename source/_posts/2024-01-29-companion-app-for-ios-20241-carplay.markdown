---
layout: post
title: "Companion app for iOS 2024.1: CarPlay is here!"
description: "Home Assistant arrives in CarPlay; open your garage with a simple tap!"
date: 2024-01-29 00:00:02
date_formatted: "January 29, 2024"
author: Bruno Pantaleão
comments: true
categories: iOS Release-Notes
og_image: /images/blog/2024-01-ios-carplay/ios-og.png
---

Hey, this is Bruno. I have recently joined Nabu Casa to work full-time on the Home Assistant iOS app (thanks Home Assistant Cloud subscribers!). Today I have big news: Home Assistant is now available on Apple CarPlay! The release is rolling out and should be hitting your iOS devices soon (version 2024.1).

CarPlay support now gives Home Assistant users easy access to their devices and areas and the ability to create custom actions. Custom actions allow users to create advanced action sequences like unlocking the front door and turning on the porch lights. And all of this works across the multiple Home Assistant servers that you have configured in the app.

<lite-youtube videoid="u__oD7OhdJI" videotitle="Carplay is here!"></lite-youtube>

<img src="/images/blog/2024-01-ios-carplay/dxspark.png" style="border:none; box-shadow: none; float: right;" height="50"> Big thanks to DXspark for helping us make the foundation of CarPlay and kicking off the project.

<!--more-->

## CarPlay features

The app is divided into four tabs to easily access the different functionality. We’ve followed Apple’s guidelines to give the user a familiar experience that they know from other CarPlay apps.

You don’t have to configure the CarPlay app separately. It will automatically pick up your Home Assistant servers as configured in your app. 

## Actions

Actions are a concept in the Home Assistant iOS app that allows you to execute automation in Home Assistant. This means that you can execute any automation you want, such as:

- “Open the garage and start heating my home to 22 degrees Celsius”
- “Close the garage and announce in the kitchen that I arrived”
- “Turn the front yard lights on and unlock the front door”

These actions have been available in the Home Assistant for Apple Watch app and can be called from the Home Assistant widgets. With today’s release, you can also easily trigger them from your CarPlay dashboard. This is the feature that has already become part of my daily routine.

If you haven’t created an Action yet, the CarPlay App can send a notification to your phone to guide you to get started.

![Create your first CarPlay Action](/images/blog/2024-01-ios-carplay/firstaction.png)
![CarPlay Actions](/images/blog/2024-01-ios-carplay/actions.png)

## Controls

The controls tab will group your devices and entities by their domain. We have started small and included the most useful domains first:

- Button
- Cover
- Input boolean
- Input button
- Light
- Lock
- Scene
- Script
- Switch

For these domains, you can toggle lights and switches, activate buttons, script, scene actions, and of course, toggle your garage door or gate.


![Create your first CarPlay Action](/images/blog/2024-01-ios-carplay/controls.png)

## Areas

The areas tab allows you to find your devices and entities based on their area. Quickly scroll through an area to see the current states and toggle devices.

![CarPlay Areas](/images/blog/2024-01-ios-carplay/areas.png)

## Servers

When you’re driving to your parents, you might want to be able to notify them or open their garage door as you arrive. With the “Servers” tab, you will be able to quickly change and control a different Home Assistant server.

This feature builds upon the multiple server support that has been part of the Home Assistant iOS app for a couple of years now.

![CarPlay Servers](/images/blog/2024-01-ios-carplay/servers.png)

I hope you will enjoy using Home Assistant on CarPlay. Please let us know what else you would like to see available for CarPlay!

## Release notes

- The app is now available for iOS 15+
- CarPlay support was added for iOS 16+
- The Bulgarian language was added
- Improvements for iOS Actions so they’re easier to use
- In macOS, the window size will be restored when you open the app again

