---
layout: page
title: "Blink4Home Camera"
description: "Instructions on how configure the Blink4Home camera platform within Home Assistant."
date: 2016-12-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: blink4home.png
ha_category: Camera
ha_release: 0.36
---


The [Blink4Home](https://blinkforhome.com/) platform allows you to arm and disarm your Blink4Home camera network (as configured through the app) in Home Assistant. Besides providing these two services, it also allows you to add a binary sensor that will indicate if the camera network is armed or not.

To enable your Blink4Home camera network in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
blink4home:
    username: "<your e-mailadress>"
    password: "<your Blink4Home password>"
```

Configuration variables:

- **username** (*Required*): The emailadress that you use for the Blink4Home camera's.
- **password** (*Required*): The password that you use for the Blink4Home camera's.
- **network_id** (*Optional*): The id of the network you wan't to control (in case you have more than one network).

