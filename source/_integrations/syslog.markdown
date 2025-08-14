---
title: Syslog
description: Instructions on how to add syslog notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_iot_class: Local Push
ha_domain: syslog
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `syslog` {% term integration %} allows you to deliver notifications from Home Assistant to the local syslog.

To enable syslog notifications in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: syslog
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
facility:
  description: Facility according to RFC 3164 (https://tools.ietf.org/html/rfc3164). Check the table below for entries.
  required: false
  default: syslog
  type: string
option:
  description: Log option. Check the table below for entries.
  required: false
  default: pid
  type: string
priority:
  description: Priority of the messages. Check the table below for entries.
  required: false
  default: info
  type: string
{% endconfiguration %}

The table contains values to use in your `configuration.yaml` file.

| facility | option | priority |
| :------- | :----- | :------- |
| kernel   | pid    | 5        |
| user     | cons   | 4        |
| mail     | ndelay | 3        |
| daemon   | nowait | 2        |
| auth     | perror | 1        |
| LPR      |        | 0        |
| news     |        | -1       |
| uucp     |        | -2       |
| cron     |        |          |
| syslog   |        |          |
| local0   |        |          |
| local1   |        |          |
| local2   |        |          |
| local3   |        |          |
| local4   |        |          |
| local5   |        |          |
| local6   |        |          |
| local7   |        |          |

For details about facility, option, and priority please consult the [wikipedia article](https://en.wikipedia.org/wiki/Syslog) and [RFC 3164](https://tools.ietf.org/html/rfc3164).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
