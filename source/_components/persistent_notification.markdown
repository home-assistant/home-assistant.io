---
layout: page
title: "Persistent notification"
description: "Instructions on how to integrate persistant notifications into Home Assistant."
date: 2016-06-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.23
---

The `persistant_notification` can be used to show a message on the frontend that has to be dismissed by the user.

The service `persistent_notification/create`. Takes in `message`, `title`, and `notification_id`. If `notification_id` is given, it will overwrite the notification if there already was a notification with that id.
