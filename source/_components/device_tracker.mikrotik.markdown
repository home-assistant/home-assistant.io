---
layout: page
title: "Mikrotik"
description: "Instructions on how to integrate Mikrotik/Routerboard based routers into Home Assistant."
date: 2017-04-28 16:03
sidebar: true
comments: false
sharing: true
footer: true
logo: mikrotik.png
ha_category: Presence Detection
ha_release: 0.44
---


The `mikrotik` platform offers presence detection by looking at connected devices to a [Mikrotik Routerboard](http://routerboard.com) based router.

You need to enable the RouterOS API to use this platform.

Terminal:

```bash
/ip service
set api disabled=no port=8728
```

Web Frontend:

Go to **IP** -> **Services** -> **API** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.

To use an Mikrotik router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mikrotik
    host: IP_ADDRESS
    username: ADMIN_USERNAME
    password: ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router.
- **username** (*Required*: The username of an user with administrative privileges.
- **password** (*Required*): The password for your given admin account.
- **port** (*Optional*): Mikrotik API port. Defaults to `8728`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
