---
layout: page
title: "Local Git"
description: "Instructions on how to integrate local git repositories into Home Assistant."
date: 2018-06-08 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: git.png
ha_category: Version Control
ha_iot_class: "Local Polling"
ha_release: 0.72
---

The `local_git` platform enables polling of a local Git repository.

`local_git` exposes the following information:

- State of the given Git repository
- Current commit SHA
- Current commit message summary
- Currently active branch

## {% linkable_title Supported services %}

The following services are supported by `local_git`:

- **local_git_pull**: Performs a `git pull` command on the Git repository. Can be configured to reset the repository beforehand.
 
## {% linkable_title Configuration %}

To enable the local Git platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
version_control:
  - platform: local_git
    name: Home Assistant Configuration
    path: /config/home_assistant
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: true
  type: string
path:
  description: Location of the Git repository.
  required: true
  type: string
{% endconfiguration %}

See the [entity component options][entity-docs] to control how often the main component polls the local Git platform.

[entity-docs]: /docs/configuration/platform_options/
