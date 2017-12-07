---
layout: page
title: "System Log"
description: "Summary of errors and warnings in Home Assistant during runtime."
date: 2017-11-11 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.58
---

The `system_log` component stores information about all logged errors and warnings in Home Assistant. All collected information is accessible directly in the frontend, just navigate to the `Info` section under `Developer Tools`. In order to not overload Home Assistant with log data, only the 50 last errors and warnings will be stored. Older entries are automatically discarded from the log. It is possible to change the amount of stored log entries using the parameter `max_entries`.

This component is automatically loaded by the `frontend` (so no need to do anything if you are using the frontend). If you are not doing so, or if you wish to change a parameter, add the following section to your `configuration.yaml` file: 

```yaml
system_log:
  max_entries: MAX_ENTRIES
```

{% configuration %}
max_entries:
  description: Number of entries to store (older entries are discarded).
  required: false
  type: int
  default: 50
{% endconfiguration %}

## {% linkable_title Services %}

### {% linkable_title Service `clear` %}

To manually clear the system log, call this service.

