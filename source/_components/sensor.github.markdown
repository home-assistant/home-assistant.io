---
layout: page
title: "GitHub Sensor"
description: "How to integrate the GitHub Sensor into Home Assistant."
date: 2018-12-24 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: github.png
ha_category: Sensor
ha_release: 0.85
ha_iot_class: "Cloud Polling"
---

The GitHub sensor integrates data from [GitHub](https://github.com/) to monitor your favorite repositories.

## {% linkable_title Setup %}

You will need your GitHub username and password. You can also create an access token [here](https://github.com/settings/tokens). An access token is required if you use two-factor authentication with your account.

## {% linkable_title Configuration %}

To enable this platform, please add the following to your `configuration.yaml` file:

### {% linkable_title Username / Password %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: github
    username: 'githubusername'
    password: !secret github_password
    repositories:
      - path: 'home-assistant/home-assistant'
        name: 'Home Assistant'
      - path: 'hassio-addons/addon-ide'
        name: 'IDE add-on'
```

### {% linkable_title Access Token %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: github
    access_token: !secret github_access_token
    repositories:
      - path: 'home-assistant/home-assistant'
        name: 'Home Assistant'
      - path: 'hassio-addons/addon-ide'
        name: 'IDE add-on'
```

{% configuration %}
username:
  description: Your GitHub Username
  required: false
  type: string
password:
  description: Your GitHub Password
  required: false
  type: string
access_token:
  description: Your GitHub Access Token
  required: false
  type: string
repositories:
  description: A list of repository paths and optionally a name
  required: true
  type: list
  keys:
    path:
      description: Path to the repository. For Home Assistant this will be `home-assistant/home-assistant`
      required: true
      type: string
    name:
      description: Name of the sensor. Gives the sensor a custom name in Home Assistant. Defaults to the repository name from GitHub if not specified.
      required: false
      type: string
{% endconfiguration %}
