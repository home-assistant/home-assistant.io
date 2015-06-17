---
layout: page
title: "Syslog notification support"
description: "Instructions how to add syslog notifications to Home Assistant."
date: 2015-06-09 16:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/applications-system.png' class='brand pull-right' />
The syslog platform allows you to deliver notifications from Home Assistant to the local syslog.

To enable syslog notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  platform: syslog
  facility: SYSLOG_FACILITY
  option: SYSLOG_LOG_OPTION
  priority: SYSLOG_PRIORITY
```

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

For details about facility, option, and priority please consult the [wikpedia article](http://en.wikipedia.org/wiki/Syslog) and [RFC 3164](http://tools.ietf.org/html/rfc3164).

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
