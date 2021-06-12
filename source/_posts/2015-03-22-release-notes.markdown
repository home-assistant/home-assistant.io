---
title: "Release notes for March 22, 2015"
description: "New support added for SabNZBD, Pushover, scenes and scripts."
date: 2015-03-22 0:21 -0800
date_formatted: "March 22, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---
A new version of Home Assistant has just been pushed out. It contains bugfixes contributed by [jamespcole](https://github.com/jamespcole), [andythigpen](https://github.com/andythigpen), [trainman419](https://github.com/trainman419) and [me](https://github.com/balloob). It also adds a bunch of great new features:

__Script__
Andythigpen has contributed a script component. This allows users to create a sequence of service calls and delays. Scripts can be started using the service `script/turn_on` and interrupted using the service `script/turn_off`. A separate page has been added to the frontend to see the status of your scripts.

```yaml
# Example configuration.yaml entry
script:
  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: "Wake Up"
    sequence:
      - alias: "Bedroom lights on"
        execute_service: light.turn_on
        service_data:
          entity_id: group.bedroom
      - delay:
          # supports seconds, milliseconds, minutes, hours, etc.
          minutes: 1
      - alias: "Living room lights on"
        execute_service: light.turn_on
        service_data:
          entity_id: group.living_room
```

<!--more-->

__Scene__
I (Paulus) have contributed a scene component. A user can create scenes that capture the states you want certain entities to be. For example a scene can contain that light A should be turned on and light B should be bright red. Deactivating a scene will restore the previous state from before the scene was activated. Just like scripts, scenes have their own separate page to see which scenes are on.

```yaml
# Example configuration.yaml entry
scene:
  - name: Romantic
    entities:
      light.tv_back_light: on
      light.ceiling:
        state: on
        color: [0.33, 0.66]
        brightness: 200
```

<a name='sabnzbd'></a>
__SABnzbd__
<img src='/images/supported_brands/sabnzbd.png' style='border:none; box-shadow: none; float: right;' height='50' /> James Cole has contributed support to integrate SABnzbd. This will allow you to monitor your downloads from within Home Assistant and setup automation based on the information.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sabnzbd
    name: SAB
    api_key: YOUR_API_KEY
    # Example: http://192.168.1.32:8124/
    base_url: YOUR_SABNZBD_BASE_URL
    monitored_variables:
        - type: 'current_status'
        - type: 'speed'
        - type: 'queue_size'
        - type: 'queue_remaining'
        - type: 'disk_size'
        - type: 'disk_free'
```

<a name='pushover'></a>
__PushOver__
<img src='/images/supported_brands/pushover.png' style='border:none; box-shadow: none; float: right;' height='50' /> James Cole has also contributed support for <a href='https://pushover.net/'>the PushOver service</a> as a platform for the notify component. This allows components to send messages to the user using PushOver.

```yaml
# Example configuration.yaml entry
notify:
    platform: pushover
    # Get this by registering a new application on https://pushover.net
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    # Get this by logging into your account on https://pushover.net
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```
