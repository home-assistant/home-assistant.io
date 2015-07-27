---
layout: page
title: "Generic IP Camera"
description: "Instructions how to integrate IP cameras within Home Assistant."
date: 2015-07-11 0:36
sidebar: false
comments: false
sharing: true
footer: true
---
<img src='/images/supported_brands/camera-web.png' class='brand pull-right' />

This component allows you to integrate any IP camera into Home Assistant. It supports fetching images from a url with optional HTTP authentication.

Home Assistant will serve the images via its server, making it possible to view your IP camera's while outside of your network.

```yaml
# Example configuration.yaml entry
camera:
  platform: generic
  name: my sample camera
  username: MY_USERNAME
  password: MY_PASSWORD
  still_image_url: http://194.218.96.92/jpg/image.jpg
```
