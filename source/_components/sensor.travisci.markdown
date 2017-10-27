---
layout: page
title: "Travis-CI Sensor"
description: "Instructions on how to integrate the test build results reported by Travis-CI within Home Assistant."
date: 2017-09-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: travisci.svg
ha_category: Sensor
ha_release: "0.56"
ha_iot_class: "Cloud Polling"
---

With this sensor platform, you will be able to integrate the test build results reported by [Travis-CI](https://travis-ci.org/) working within Home Assistant.

To enable this platform, please add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: travisci
    api_key: 123456789
```

Configuration variables:

- **api_key** (*Required*): GitHub [access token](https://github.com/settings/applications) with the following scopes: *read:org*, *user:email*, *repo_deployment*, *repo:status*, *write:repo_hook*.
- **branch** (*Optional*): Determine which default branch should be used by the **state** condition. Defaults to *master*.
- **scan_interval** (*Optional*): How frequently to query for new data. Defaults to 30 seconds.
- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. If not specified, all conditions below will be enabled by default. The following conditions can be monitored.
  - **last_build_id**: Turn the last build job ID.
  - **last_build_duration**: Return the time elapsed in seconds to run the last test job.
  - **last_build_finished_at**: Return the timestamp of when the last test job finished.
  - **last_build_started_at**: Return the timestamp of when the last test job started.
  - **last_build_state**: Return the state from the latest test job/PR. The conditions can be: 'passed', 'failed' or 'started'.
  - **state**: Return the build test from the branch specified at by **branch** parameter.
- **repository:** array (*Optional*): Name from the GitHub repositories to be monitored. If not specified, all GitHub repositories linked to Travis-CI will be enabled by default.
