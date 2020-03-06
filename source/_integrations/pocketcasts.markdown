---
title: Pocket Casts
description: Instructions on how to set up Pocket Casts sensors within Home Assistant.
logo: pocketcasts.png
ha_category:
  - Multimedia
ha_release: 0.39
ha_iot_class: Cloud Polling
---

The `pocketcasts` sensor platform lets you monitor how many unplayed episodes you have of your favorite podcasts at [Pocket Casts](https://play.pocketcasts.com/).

## Configuration

<div class='note warning'>
  
  This integration requires a [Pocket Casts + Plus](https://www.pocketcasts.com/plus/) subscription to work!
  
</div>

To enable this sensor, add the following lines to your `configuration.yaml`:

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
