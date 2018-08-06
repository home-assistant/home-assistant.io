---
layout: page
title: "Linksys Access Points"
description: "Instructions on how to integrate Linksys Access Points into Home Assistant."
date: 2016-12-16 01:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
logo: linksys.png
ha_release: 0.37
---

The `linksys_ap` platform offers presence detection by looking at connected devices to a Linksys based access point.
It was tested with a LAPAC1750 AC1750 Dual Band Access Point.

To use a Linksys Access Point in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_ap
    host: 192.168.1.1
    username: admin
    password: password
```

Configuration variables:

- **host** (*Required*): The hostname or IP address of your access point, eg. `192.168.1.1`.
- **username** (*Required*: The username of an user with administrative privileges (read-only is sufficient).
- **password** (*Required*): The password for your given admin account.
- **verify_ssl** (*Optional*): Verify SSL certificate for https request. Defaults to true.

Example for all configuration options:
```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_ap
    host: 192.168.1.1
    username: admin
    password: password
    verify_ssl: true
    scan_interval: 6
    consider_home: 12
```

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
