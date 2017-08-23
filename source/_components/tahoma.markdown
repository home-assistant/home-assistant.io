---
layout: page
title: "Tahoma"
description: "Instructions on how to integrate Somfy Tahoma devices with Home Assistant."
date: 2017-07-18 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: somfy.png
ha_category: Hub
ha_release: 0.41
---


The `tahoma` component platform is used as an interface to the [tahomalink.com](https://www.tahomalink.com) website. It adds actually covers and the sun sensor from tahoma plattform.

To use your tahoma devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tahoma:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  exclude: [BridgeHUEComponent, HueLampHUEComponent, PodComponent]
```

Configuration variables:

- **username** (*Required*): Username for tahomalink.com.
- **password** (*Required*): Password for tahomalink.com.
- **exclude** (*optional*): Excludes devices
