---
layout: page
title: "GitLab"
description: "Instructions on how to integrate gitlab repositories into Home Assistant."
date: 2018-06-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: gitlab.png
ha_category: Version Control
ha_iot_class: "Cloud Polling"
ha_release: 0.72
---

The `gitlab` platform enables polling of a local Git repository.

`gitlab` exposes the following information:

- Current commit SHA
- Current commit message title
- Currently pipeline status (if applicable)
 
## {% linkable_title Configuration %}

To enable the `gitlab` platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
version_control:
  - platform: gitlab
    name: Home Assistant Configuration
    token: YOUR_ACCESS_TOKEN
    project: YOUR_GROUP/YOUR_PROJECT
    branch: master
    url: https://gitlab.com
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: true
  type: string
token:
  description: GitLab Access token with API access.
  required: true
  type: string
project:
  description: Project to monitor.
  required: true
  example: godfat/gitlab-ce
  type: string
branch:
  description: Branch to monitor.
  required: false
  type: string
  default: master
url:
  description: Url to GitLab instance.
  required: false
  type: url
  default: https://gitlab.com
{% endconfiguration %}

See the [entity component options][entity-docs] to control how often the main component polls the local Git platform.

[entity-docs]: /docs/configuration/platform_options/
