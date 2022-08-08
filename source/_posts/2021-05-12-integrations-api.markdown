---
title: "Why Home Assistant doesn't have an external API for integrations"
description: "How our API design promotes an open IoT ecosystem."
date: 2021-05-12 00:00:00
date_formatted: "May 12, 2021"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
og_image: /images/blog/2021-05-integrations-api/social.png
---

Home Assistant is the world’s largest home automation platform talking with [over 1900 different devices and services](/integrations/). Home Assistant works with these via “integrations”.

Each integration runs inside Home Assistant. They convert the data from the device into data that Home Assistant understands and forward commands from Home Assistant back to the device. For this to work a device or service needs to have an application programming interface (API).

It is not possible for a device or service to provide lights, switches or other device types via the Home Assistant API without an integration. It can be faked, but it won’t work correctly. We explicitly did not add this feature because of interoperability.

If Home Assistant were to offer this option, devices and services would no longer be required to create an API for control – they could just implement ours. This creates vendor lock-in, locks other home automation platforms out and hurts the open Internet of Things ecosystem.

You should be able to access your data from your devices without any restrictions. Requiring a specific application to get to your data is not the solution.

Our goal is a home where all smart devices can be managed locally.

This stance will hurt us in the short term because we get less integrations. It is more work for a manufacturer to create an API and a Home Assistant integration.

In the long term the user will win. Devices with local APIs will still work 10 years from now and no one will be held hostage by vendor lock-in because some of their devices only work with Home Assistant.

_Note about Home Assistant APIs: Home Assistant does have [an API](https://developers.home-assistant.io/docs/api/websocket/), just not for integrations. It allows you to access all your data in real-time. We also have a [data science portal](https://data.home-assistant.io/) that documents how you can query the historical data stored on disk._
