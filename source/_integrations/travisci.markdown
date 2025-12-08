---
title: Travis-CI
description: Instructions on how to integrate the test build results reported by Travis-CI within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.56
ha_iot_class: Cloud Polling
ha_domain: travisci
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

With this sensor platform, you will be able to integrate the test build results reported by [Travis-CI](https://travis-ci.org/) working within Home Assistant.

## Setup

Create a GitHub [access token](https://github.com/settings/tokens) with the following scopes:

- **read:org**
- **user:email**
- **repo_deployment**
- **repo:status**
- **write:repo_hook**

## Configuration

To enable this platform, please add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: travisci
    api_key: YOUR_ACCESS_TOKEN
```

{% configuration %}
api_key:
  description: The access token for GitHub.
  required: true
  type: string
branch:
  description: "Determine which default branch should be used by the **state** condition."
  required: false
  default: master
  type: string
monitored_conditions:
  description: Conditions to display in the frontend. If not specified, all conditions below will be enabled by default. The following conditions can be monitored.
  required: false
  type: list
  keys:
    last_build_id:
      description: Turn the last build job ID.
    last_build_duration:
      description: Return the time elapsed in seconds to run the last test job.
    last_build_finished_at:
      description: Return the timestamp of when the last test job finished.
    last_build_started_at:
      description: Return the timestamp of when the last test job started.
    last_build_state:
      description: "Return the state from the latest test job/PR. The conditions can be: 'passed', 'failed' or 'started'."
    state:
      description: "Return the build test from the branch specified at by **branch** parameter."
repository:
  description: Name from the GitHub repositories to be monitored. If not specified, all GitHub repositories linked to Travis-CI will be enabled by default.
  required: false
  type: list
{% endconfiguration %}
