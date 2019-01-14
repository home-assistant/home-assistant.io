---
layout: page
title: "GitLab-CI Sensor"
description: "How to integrate GitLab-CI Job status within Home Assistant."
date: 2018-09-10 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: gitlab.png
ha_category: Sensor
ha_release: 0.80
ha_iot_class: "Cloud Polling"
---

The `gitlab_ci` sensor platform integrates results reported by CI/CD Pipeline Jobs in [GitLab](https://gitlab.com/).

## {% linkable_title Setup %}

You will need a GitLab repository ID. On the **Details** page for your GitLab repo, just below the project name is **Project ID:**.

Alternatively, you can use `GitLab_Username/GitLab_RepositoryName`, e.g., `MyCoolUsername/MyCoolRepository`.

A GitLab token with at least the API permission scope is needed, which can be created on the [GitLab Personal Access Tokens](https://gitlab.com/profile/personal_access_tokens) page of your GitLab User Settings.

## {% linkable_title Configuration %}

To enable this platform, please add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gitlab_ci
    gitlab_id: YOUR_GITLAB_ID
    token: YOUR_GITLAB_TOKEN
```

{% configuration %}
gitlab_id:
  description: The GitLab repository identifier.
  required: true
  type: string
token:
  description: The GitLab API token.
  required: true
  type: string
name:
  description: Sensor name as it appears in Home Assistant.
  required: false
  type: string
  default: GitLab CI Status
url:
  description: The GitLab repository URL. Used for self-hosted repositories.
  required: false
  type: string
  default: https://gitlab.com
{% endconfiguration %}
