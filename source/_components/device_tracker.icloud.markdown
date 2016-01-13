---
layout: component
title: "iCloud"
description: "Instructions how to use iCloud to track devices in Home Assistant."
date: 2015-12-15 1000
sidebar: true
comments: false
sharing: true
footer: true
logo: icloud.png
ha_category: Presence Detection
---


The `icloud` platform allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices. 

It does require that your device has beend registered with "Find My iPhone".

To integrate iCloud in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: icloud
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **username** (*Required*): The username for the iCloud account.
- **password** (*Required*): The password for your given username.

<p class='note warning'>
This may cause battery drainage as it wakes up your device to get the current location.
</p>

<p class='note warning'>
You may receive an email from Apple stating that someone has logged into your account.
</p>

