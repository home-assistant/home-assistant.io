---
title: GitHub
description: How to integrate the GitHub sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_domain: github
ha_platforms:
  - sensor
---

The GitHub sensor allows you to monitor your favorite [GitHub](https://github.com/) repositories. Monitored information includes the amount of stargazers, forks, open issues and pull requests, the latest commit message, and more. 

## Setup

To set up this sensor you will need a GitHub [personal access token](https://github.com/settings/tokens). You will need to check the `repo` scope for the sensor to function.

## Configuration

To enable this platform, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: github
    access_token: !secret github_access_token
    repositories:
      - path: 'home-assistant/core'
```

{% configuration %}
access_token:
  description: Your GitHub Access Token
  required: true
  type: string
url:
  description: If you are using a GitHub Enterprise server, add it's URL here. For example, `https://mygithubserver.com`
  required: false
  type: string
repositories:
  description: A list of repository paths and optionally a name
  required: true
  type: list
  keys:
    path:
      description: Path to the repository. For Home Assistant this will be `home-assistant/core`
      required: true
      type: string
    name:
      description: Name of the sensor. Gives the sensor a custom name in Home Assistant. Defaults to the repository name from GitHub if not specified.
      required: false
      type: string
{% endconfiguration %}
