---
title: "Looking at the past"
description: "Introducing history tracking for Home Assistant."
date: 2015-02-08 9:01:23 -0800
date_formatted: "February 8, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Ever since the launch of Home Assistant you have been able to track the state of your house. But the view has always been limited to what the current state is. Not what it was. Today we are going to change that by introducing two brand new components:

- Recorder component that will record every event to a SQLite database
- History component that will query and aggregate the recorded events

By adding this view into the past, we are adding an extra dimension into the state of your house. This brings great new possibilities for future features. The focus of today's release is on getting the recording component to you to start recording and getting some data. To show what is being recorded a view has been added that shows the last 24 hours of your house. Expect more extensive tools to explore your history in the future.

Adding history to the UI was a challenge on itself because the old UI did not support easy navigation. So to add to the awesomeness of this release, Home Assistant also got a face lift.

The history component will be enabled for new users by default. For current users, run `scripts/update` to upgrade to the latest version and add `[history]` to your `home-assistant.conf` file.

<p class='img'>
  <a href='/images/screenshots/component_history_24h.png'>
    <img src='/images/screenshots/component_history_24h.png' />
  </a>
</p>

{% note %}
Events are saved in a local database. Google Graphs is used to draw the graph. Drawing is happening 100% in your browser - no data is transferred to anyone at any time.
{% endnote %}

<!--more-->

Tracking history is an exciting next step for Home Assistant and will power the next generation of features. Here a list of some of the cool things that can now be build:

 - Time Machine: explore the state of your house at any point in the past
 - Smart Home: analyze behavior and use it to automate your house
 - Summarize usage of the different components of your house
