---
title: "Streaming updates"
description: "The frontend will now get the latest changes pushed while open."
date: 2015-02-24 22:41:27 0000
date_formatted: February 24, 2015
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Home Assistant has learned a new trick to get the latest information from the server: streaming updates. No longer will the frontend poll every 30 seconds for updates but instead it will keep a connection open and get the latest changes pushed as soon as they happen.

A new toggle has been added to the sidebar to turn streaming updates on and off. This preference will be saved on a per-browser basis using local storage. The toggle will also indicate when there is an error setting up a stream after which it will fall back to use polling.

<p class='img'><img src='/images/screenshots/streaming-updates.png' /></p>

<!--more-->

Streaming updates has been implemented using the HTML5 `EventSource` tag. Implementation is pretty straight forward as all the reconnection logic will be handled by the event source tag. The [server-side code](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/integrations/api/__init__.py) is 50 lines and the client-side code is 80 lines of code.

All events that happen on the server will now also be sent to the browser. This turns any browser running the UI into a fully functioning [slave instance](/developers/architecture/#multiple-connected-instances) of Home Assistant. This opens up new possibilities for Home Assistant components that live completely client-side.

Implementing EventSource was not without challenges. Here are some of the issues that had to be solved:

A connection can go stale in Chrome without any event handler being called. This happens when a device goes into standby. For computers this is rare but for phones this occurs quite often. This has been solved by sending a regular ping from the server. The frontend will assume the connection has gone stale when it hasn't heard any communication for a while. Sending a ping will also help the server detect broken connections and clean them up.

Another issue that I encountered is that Safari and Firefox would not fire the `open` event when the connection has been opened but when the first message has been received. To work around this the server will now fire a ping when the connection gets opened.
