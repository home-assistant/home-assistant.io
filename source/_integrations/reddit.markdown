---
title: Reddit
description: How to integrate the Reddit sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_domain: reddit
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The Reddit sensor integrates data from [Reddit](https://reddit.com/) to monitor your favorite subreddits.

## Setup

To set up this sensor, you will need to generate a `client_id` and `client_secret` for the user account you will use to connect. Follow the first steps in [this Wiki page](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example).

{% important %}
This integration does not support Reddit's two-factor authentication. If you use two-factor authentication for your Reddit account, create a separate Reddit account without two-factor authentication for use with Home Assistant.
{% endimportant %}

## Configuration

To enable this {% term integration %}, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: reddit
    username: !secret reddit_username
    password: !secret reddit_password
    client_id: !secret reddit_client_id
    client_secret: !secret reddit_client_secret
    subreddits:
      - news
      - worldnews
```

{% configuration %}
username:
  description: Your Reddit account username.
  required: true
  type: string
password:
  description: Your Reddit account password.
  required: true
  type: string
client_id:
  description: Your Reddit account client ID.
  required: true
  type: string
client_secret:
  description: Your Reddit account client secret
  required: true
  type: string
subreddits:
  description: List of subreddits you want to get data on.
  required: true
  type: list
sort_by:
  description: "Sort reddit posts by `new`, `top`, `controversial` and `hot`."
  required: false
  type: string
  default: hot
{% endconfiguration %}
