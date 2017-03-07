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
* A binary_sensor per camera that indicates whether motion detection is enabled
* A binary_sensor for the system that indicates if the system is armed or disarmed
* A sesnor per camera that reports temperature
* A sensor per camera that reports battery level
* A sensor per camera that reports unread notification (ie. detected motion events)

Since the cameras are battery operated, the images are only updated in Home Assistant when the user manually forces a new photo.  The image can only be updated in Home Assistant every 60 seconds in order to not overwhelm Blink's servers with API requests.

Services:
There are three services availiabe for the blink platform:
- arm_system
- arm_camera
- snap_picture

For arm_system, the value sent can be either "True" or "False" and will arm and disarm the whole blink system, respectively

Arm system example
```json
{
    "value": "True"
}
```

Arm camera follows a similar structure, but each indidivual camera can have motion detection enabled or disabled.  Because of this, you also need to supply a name.  For example, if I have a camera named "Living Room" and I want to turn off motion detection on that camera, I'd call the blink.arm_camera service with the following payload:
```json
{
    "name": "Living Room",
    "value": "False"
}
```

The blink.snap_picture service takes the camera name as the payload and with take a new picture with your camera.
```
{
    "name": "Living Room"
}
```

Configuration variables:

- **username** (*Required*): Your username to login to Blink
- **password** (*Required*): Your password to login to Blink

<p class='img'>
  <img src='{{site_root}}/images/screenshots/blink_example_frontend.png' />
</p>
