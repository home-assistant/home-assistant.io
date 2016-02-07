---
layout: page
title: "Tomato"
description: "Instructions how to integrate Tomato routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
---


Tomato requires an extra config variable called `http_id`. The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: tomato
  host: YOUR_ROUTER_IP_ADDRESS
  username: YOUR_ADMIN_USERNAME
  password:  YOUR_ADMIN_PASSWORD
  http_id: YOUR_HTTP_ID
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.
- **http_id** (*Required*): The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
