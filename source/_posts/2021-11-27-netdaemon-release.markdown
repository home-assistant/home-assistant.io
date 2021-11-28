---
layout: post
title: "NetDaemon Release"
description: "NetDaemon just released a new version of their .Net platform for Home Assistant"
date: 2021-11-27 00:00:00
date_formatted: "November 27, 2021"
author: Frank Bakker
comments: true
categories:
- Announcement
og_image: /images/blog/2021-11-NetDaemon/NetDaemonLogo.png
---

<img src='/images/blog/2021-11-NetDaemon/NetDaemonLogo.png' style='border: 0;box-shadow: none; width: 25%; height: 25%; float: right;'>

With Home Assistant you're in control of your home and your data. This gives you the freedom to use the tools you love. That can be using Blueprints, Home Assistant Scripts, or maybe Node Red. For a group of Home Assistant users their preferred way of coding is in C# and for those users we have great news: [NetDaemon](https://netdaemon.xyz/) has just released a new version of their open source platform that allows you to use C# 10 for .Net 6 to write your applications or automations for Home Assistant.

This new release also includes a new API called [`HassModel`](https://netdaemon.xyz/docs/hass_model/hass_model). This API makes it easier than ever to interact with Home Assistant from .Net. It allows you to do things like responding to state changes of entities and calling Home Assistant services. You get strong typed interfaces that are generated based on the entities in your own Home Assistant instance, their attributes and all available services and their parameters. Because the code is generated from your own Home Assistant you can use intellisense to discover all your entities and available services directly from your IDE.

Besides the new API we also made it easier to create apps in NetDaemon. A NetDaemon app can now consist of just a single .Net class that is decorated with a `[NetDaemonApp]` attribute. and a constructor that wires up event handlers. Your apps will be loaded when NetDaemon starts, Typically using the NetDaemon docker container that you can install as a Home Assistant addon.

[Check out the documentation and how to get started with NetDaemon](https://netdaemon.xyz/)
