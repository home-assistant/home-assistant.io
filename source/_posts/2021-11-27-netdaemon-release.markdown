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
Home Assistant is all about you controlling your home. And you want to do that using the tools you love. That can be using Blueprints, Home Assistant Scripts, or maybe Node Red. For a large group of Home Assistant users their preferred way of coding is in C#. For those users we have great news: NetDaemon has just released a new version of their amazing open source platform that allows you to write your applications or automations for Home Assistant in C# 10 for .Net 6

## The brand new HassModel API

This new release includes a whole new API called HassModel. HassModel is an API that makes it easier than ever to interact with Home Assistant from .Net. It allows you to do things like responding to state changes of entities and calling Home Assistant services. You get strong typed interfaces that are generated based on the entities in your own Home Assistant, their attributes and all available services and their parameters. Because the code is generated from your own Home Assistant you can use intellisense to discover all your entities and available services directly from your IDE.

## Simplified application model

Besides the new API we also made it easier to create apps in NetDaemon. A NetDaemon app can now consist of just a single .Net class that is decorated with a [NetDaemonApp] attribute. and a constructor that wires up some event handlers. Your apps will be loaded when NetDaemon starts, Typically using the NetDaemon docker container that you can install as a Home Assistant addon.

## .NET 6 and C# 10

Because you code for fun you would want to use the latest and greatest tools available. That's why with this release we also updated NetDeamon to .Net 6 an C# 10.

Check out the documentation and how to get started with NetDaemon [here](https://netdaemon.xyz/)