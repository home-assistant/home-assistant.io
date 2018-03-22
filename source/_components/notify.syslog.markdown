---
layout: page
title: "Syslog"
description: "Instructions on how to add syslog notifications to Home Assistant."
date: 2015-06-09 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: syslog.png
ha_category: Notifications
ha_release: pre 0.7
---


The `syslog` platform allows you to deliver notifications from Home Assistant to the local syslog.

To enable syslog notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: syslog
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **facility** (*Optional*): Facility according to RFC 3164 (http://tools.ietf.org/html/rfc3164). Default is 'syslog' if no value is given. Check the table below for entries.
- **option** (*Optional*): Log option. Default is 'pid' if no value is given. Check the table below for entries.
- **priority** (*Optional*): Priority of the messages. Default is 'info' if no value is given. Check the table below for entries.

The table contains values to use in your `configuration.yaml` file.

| facility  | option  | priority  |
| :-------- |:--------| :---------|
| kernel    | pid     | 5         |
| user      | cons    | 4         |
| mail      | ndelay  | 3         |
| daemon    | nowait  | 2         |
| auth      | perror  | 1         |
| LPR       |         | 0         |
| news      |         | -1        |
| uucp      |         | -2        |
| cron      |         |           |
| syslog    |         |           |
| local0    |         |           |
| local1    |         |           |
| local2    |         |           |
| local3    |         |           |
| local4    |         |           |
| local5    |         |           |
| local6    |         |           |
| local7    |         |           |

For details about facility, option, and priority please consult the [wikipedia article](http://en.wikipedia.org/wiki/Syslog) and [RFC 3164](http://tools.ietf.org/html/rfc3164).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
