---
title: Weblink
description: Instructions on how to setup Links within Home Assistant.
logo: home-assistant.png
ha_category:
  - Front End
ha_release: 0.13
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
---

The `weblink` integration allows you to display links in the Home Assistant frontend.

<div class='note'>

The below documentation applies to the classic "States" user interface.
The `weblink` integration has been **deprecated** and pending for removal in Home Assistant 0.107.0.

Starting with Home Assistant 0.86, Lovelace is the new default interface. For information on configuring weblinks in Lovelace please follow [these instructions](/lovelace/entities/#weblink) instead.

</div>

## Configuration

To use this integration in your installation, add something like the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weblink:
  entities:
    - name: Router
      url: http://192.168.1.1/
    - name: Home Assistant
      url: https://www.home-assistant.io
    - name: Grafana
      url: /grafana
```

{% configuration %}
name:
  description: Text for the link.
  required: true
  type: string
url:
  description: The URL (absolute URL or absolute path) for the link.
  required: true
  type: string
icon:
  description: Icon for entry.
  required: false
  type: icon
{% endconfiguration %}

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
