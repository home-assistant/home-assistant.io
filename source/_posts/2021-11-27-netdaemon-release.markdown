---
layout: post
title: "New NetDaemon Release: Use C# to automate Home Assistant"
description: "NetDaemon just released a new version of their .Net platform for Home Assistant"
date: 2021-11-27 00:00:00
date_formatted: "November 27, 2021"
author: Frank Bakker
comments: true
categories:
- Release-Notes
og_image: /images/blog/2021-11-NetDaemon/NetDaemonLogo.png
---

<img src='/images/blog/2021-11-NetDaemon/NetDaemonLogo.png' style='border: 0;box-shadow: none; width: 25%; height: 25%; float: right;'>

Great news for Home Assistant users who's preferred way of coding is C#: [NetDaemon](https://netdaemon.xyz/) has just released a new version of their open source platform that allows you to use C# 10 for .Net 6 to write your applications or automations for Home Assistant.

This release includes a new API called [`HassModel`](https://netdaemon.xyz/docs/hass_model/hass_model) which makes it easier than ever to interact with Home Assistant from .Net. It generates strong typed interfaces based on the entities in your own Home Assistant instance, their attributes and all available services and their parameters. Intellisense can be used to discover all your entities and available services directly from your IDE.

[Check out the documentation and how to get started with NetDaemon](https://netdaemon.xyz/)

_This project is not affiliated with Home Assistant, but leverages our [open API](https://developers.home-assistant.io/docs/api/websocket)._
