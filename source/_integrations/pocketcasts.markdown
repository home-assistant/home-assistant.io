---
description: Instructions on how to set up Pocket Casts sensors within Home Assistant.
ha_release: 0.39
ha_domain: pocketcasts
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Pocket Casts** {% term integration %} lets you monitor how many unplayed episodes you have of your favorite podcasts at [Pocket Casts](https://play.pocketcasts.com/). This integration requires a [Pocket Casts + Plus](https://www.pocketcasts.com/plus/) subscription to work!

## Configuration

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pocketcasts
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username to access the PocketCasts service.
  required: true
  type: string
password:
  description: The password for the given username.
  required: true
  type: string
{% endconfiguration %}
