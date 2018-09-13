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
ha_release: 0.78
ha_iot_class: "Cloud Polling"

---

The GitLab_CI sensor integrates results reported by CI/CD Pipeline Jobs in [GitLab](https://gitlab.com/).

## {% linkable_title Setup %}

You will need a GitLab repository ID. On the "Details" page for your GitLab repo, just below the project name is "Project ID:"
Alternatively, you can use "{GitLab_Username}/{GitLab_RepositoryName}", ex: "MyCoolUsername/MyCoolRepository"

You will also need a GitLab API token with at least API permissions. To get a token, they are generated here: [GitLab API Token](https://gitlab.com/profile/personal_access_tokens)

## {% linkable_title Configuration %}

To enable this platform, please add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: gitlab_ci
    gitlab_id: '1234567'
    token: 'aaaaaaaaaaAAAAAAAAAA'
```

{% configuration %}

gitlab_id:
  description: GitLab repository ID or "username/repository"
  required: true
  type: string
token:
  description: GitLab API Token
  required: true
  type: string
scan_interval:
  description: How frequently to query for new data. Defaults to 300 seconds.
  required: false
  type: time
url:
  description: GitLab repository URL. Defaults to 'https://gitlab.com'. Used for self-hosted repositories.
  required: false
  type: string
{% endconfiguration %}
