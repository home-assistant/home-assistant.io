---
title: GitHub
description: How to integrate the GitHub sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: github
---

The GitHub sensor integrates data from [GitHub](https://github.com/) to monitor your favorite repositories.

## Setup

To set up this sensor you will need a [personal access token](https://github.com/settings/tokens). You will need to check the `repo` scope for the sensor to function.

## Configuration

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **GitHub**.
After completing the configuration flow, the GitHub integration will be available.

## Sensors

This integration provides the following sensors:

_Some are not enabled by default. These can be enabled by via the integration's options._

| Name                      | Enabled by default | Description                                                                                   |
| ------------------------- | ------------------ | --------------------------------------------------------------------------------------------- |
| Clones                    | No                 | Clone traffic. Attributes contain unique clones. **_Requires push access to the repository_** |
| Forks                     | Always            | The amount of forks.                                                                           |
| Latest Commit             | Yes                | Latest commit sha. Attributes contain other data from the commit such as the message.         |
| Latest Open Issue         | No                 | The latest issue that is open in the repository.                                              |
| Latest Open Pull Request  | No                 | The latest open pull request in the repository.                                               |
| Latest Release            | No                 | The last release in the repository.                                                           |
| Stargazers                | Always             | Stars for your repository.                                                                    |
| Views                     | No                 | Viewer count. Attributes contain unique viewers. **_Requires push access to the repository_** |
| Watchers                  | Always             | The count of users watching the repository.                                                   |
