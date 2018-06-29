---
layout: page
title: "Sensibo A/C controller"
description: "Instructions on how to integrate Sensibo A/C controller into Home Assistant."
date: 2017-04-01 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: sensibo.png
ha_category: Climate
ha_release: 0.44
ha_iot_class: "Cloud Polling"
---

Integrates [Sensibo](https://sensibo.com) Air Conditioning controller into Home Assistant.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: sensibo
    api_key: <your_key_here>
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **id** (*Optional*): A unit ID or a list of IDs. If none specified then all units accessible by the `api_key` will be used.

To get your API key visit <https://home.sensibo.com/me/api>

<p class="note">
If you create the API key using a dedicated user (and not your main user), 
then in the Sensibo app log you will be able to distinguish between actions 
done in the app and actions done by Home Assistant.
</p>

### {% linkable_title Full config example %}
```yaml
climate:
  - platform: sensibo
    api_key: deadbeaf
    id:
      - id1
      - id2
```
