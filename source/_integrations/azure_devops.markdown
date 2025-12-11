---
title: Azure DevOps
description: Instructions on how to integrate Azure DevOps with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: azure_devops
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Azure DevOps integration allows you to control and monitor your
Azure DevOps instance in Home Assistant.

{% include integrations/config_flow.md %}

## Sensors

This integration provides a sensor for Azure DevOps:

- Latest build - The build number of the latest build.
- Latest build id - The ID of the latest build.
- Latest build reason - The reason the build was triggered.
- Latest build result - The build result.
- Latest build source branch - The source git branch.
- Latest build source version - This is the version i.e. the tag if set, or the commit.
- Latest build status - The build status.
- Latest build queue time - How long the latest build was queued.
- Latest build start time - The time when the latest build actually started.
- Latest build finish time - The time when the latest build finished.
- Latest build URL - The URL to the latest build. 
- Work item count - The number of work items for each work item type and state in the project.
