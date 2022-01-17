---
title: GitHub
description: How to integrate the GitHub into Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_domain: github
ha_platforms:
  - sensor
ha_codeowners:
  - '@timmo001'
  - '@ludeeus'
---

The GitHub integration allows you to monitor your favorite [GitHub][github] repositories.

{% include integrations/config_flow.md %}

When you setup this integration, you will first be guided to allow the integration to use the [GitHub API][github_api] on your behalf. If you do not yet have a [GitHub][github] account you will be promoted to create one during the configuration of the integration.

When you have authorized the integration, you select repositories you want to monitor, the list of repositories contain repositories you have [starred][github_starred] on GitHub with your account.

Most of the entities provided by this integration are disabled by default, you can enable these by going to the {% my entities title="entities panel" %}.

[github]: https://github.com/
[github_api]: https://docs.github.com/en/rest
[github_starred]: https://github.com/stars
