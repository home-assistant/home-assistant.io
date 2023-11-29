---
title: "Hello PushBullet, nice talking to you"
description: "Introducing the new notify component and PushBullet platform"
date: 2015-01-04 13:29:07 -0800
date_formatted: January 4, 2015
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

One of the things that was missing in Home Assistant for a while was a way to communicate with users. Wouldn't it be nice to get a message when important events happen like the lights being turned on while no one is home? Since the Home Assistant frontend runs as a web application on the phone, we have no way to bring ourselves to the front. This is where the new notify component comes in, powered by PushBullet.

The new notify component will take in messages and tells them to the user. For now this will be powered by the very awesome [PushBullet](https://www.pushbullet.com/) but any other messaging platform can be easily added.

<p class='img'>
  <img src='/images/screenshots/pushbullet_moto360.png' />
  A message triggered by the simple_alarm component is shown by PushBullet on the Moto360.
</p>

Read on to learn how to enable the notify component and integrate it with other components.

<!--more-->

### Enabling the notify component

To enable the new notify component, add the following to your `home-assistant.conf`:

```conf
[notify]
platform=pushbullet
api_key=ABCDEFGHJKLMNOPQRSTUVXYZ
```

You can get your api key from [your account page on PushBullet.com](https://www.pushbullet.com/#settings/account).

### Sending messages from your component

To be able to send messages, the notify component has to be loaded and initialized successfully.

```python
import homeassistant.loader as loader

def setup(hass, config):
    notify = loader.get_component('notify')
    notify.send_message(hass, "Hello from my component!")
```
