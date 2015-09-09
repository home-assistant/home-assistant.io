---
layout: page
title: "Transmission switch support"
description: "Instructions how to integrate Transmission within Home Assistant."
date: 2015-06-02 09:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/transmission.png' class='brand pull-right' />
The transmission platform allows you to control your [Transmission](http://www.transmissionbt.com/) client from within Home Assistant. The platform enables you switch to your 'Alternative Speed Limits' (aka 'Turtle mode') setting. 

To add Transmission to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: transmission
  host: 192.168.1.26
  port: 9091
  name: Transmission
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **host** (*Required*): This is the IP address of your Transmission daemon, e.g. 192.168.1.32.
- **port** (*Optional*): The port your Transmission daemon uses, defaults to 9091.
- **name** (*Optional*): The name to use when displaying this Transmission instance.
- **username** (*Required*): Your Transmission username, if you use authentication.
- **password** (*Required*): Your Transmission password, if you use authentication.

