---
title: GitLab-CI
description: How to integrate GitLab-CI Job status within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.8
ha_iot_class: Cloud Polling
ha_domain: gitlab_ci
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `gitlab_ci` sensor {% term integration %} integrates results reported by CI/CD Pipeline Jobs in [GitLab](https://gitlab.com/).

## Setup

You will need a GitLab repository ID. On the **Details** page for your GitLab repository, just below the project name is **Project ID:**.

Alternatively, you can use `GitLab_Username/GitLab_RepositoryName`, e.g., `MyCoolUsername/MyCoolRepository`.

A GitLab token with at least the API permission scope is needed, which can be created on the [GitLab Personal Access Tokens](https://gitlab.com/profile/personal_access_tokens) page of your GitLab User Settings.

## Configuration

To enable this {% term integration %}, please add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
