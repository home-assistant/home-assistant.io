---
layout: page
title: "Blink"
description: "Instructions for how to integrate Blink camera/security system within Home Assistant."
date: 2017-03-05 22:13
sidebar: true
comments: false
sharing: true
footer: true
logo: blink.png
ha_category: Hub
ha_release: "0.40"
---

The `blink` component lets you view camera images and motion events from [Blink](http://blinkforhome.com) camera and security systems.

You will need your blink login information (username, usually you email address, and password) to use this module.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
blink:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Once loaded, your front end will have the following components:
* A camera image for each camera in your system
* A switch per camera to manually take a new photo
* A switch per camera to manually arm/disarm that camera
* A switch for your system to arm/disarm motion detection 
    * Note, this must be enabled in order to detect any motion, despite arming individual cameras
* A sesnor per camera that reports temperature
* A sensor per camera that reports battery level
* A sensor per camera that reports unread notification (ie. detected motion events)

Since the cameras are battery operated, the images are only updated in Home Assistant when either the user manually forces a new photo or motion is detected.  In either case, the image can only be updated in Home Assistant every 60 seconds in order to not overwhelm Blink's servers with API requests.

Configuration variables:

- **username** (*Required*): Your username to login to Blink
- **password** (*Required*): Your password to login to Blink

<p class='img'>
  <img src='{{site_root}}/images/screenshots/blink_example_frontend.png' />
</p>
