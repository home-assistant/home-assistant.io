---
title: GitHub
description: Instructions on how to integrate the GitHub integration into Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_domain: github
ha_platforms:
  - diagnostics
  - sensor
ha_codeowners:
  - '@timmo001'
  - '@ludeeus'
ha_integration_type: integration
---

The GitHub integration allows you to monitor your favorite [GitHub][github] repositories.

{% include integrations/config_flow.md %}

When you set up this integration, you will first be guided to allow the integration to use the [GitHub API][github_api] on your behalf. If you do not yet have a [GitHub][github] account you will be prompted to create one during the configuration of the integration.

When you have authorized the integration, you select repositories you want to monitor, the list contains repositories you have created and [starred][github_starred] on GitHub with your account.

## Remove authorization

After you have removed the integration from {% my integrations title="Settings -> Devices & Services" %}, you need to manually revoke OAuth app authorization.

1. Go to your [Authorized OAuth Apps][github_apps]
2. Find the "Home Assistant GitHub Integration" application
3. Click the 3 dots (`...`) to the right of the name
4. Select "Revoke"

[github]: https://github.com/
[github_api]: https://docs.github.com/en/rest
[github_starred]: https://github.com/stars
[github_apps]: https://github.com/settings/applications
