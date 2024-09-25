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

The GitHub integration allows you to monitor your favorite [GitHub](https://github.com/) repositories.

{% include integrations/config_flow.md %}

When you set up this integration, you will first be guided to allow the integration to use the [GitHub API](https://docs.github.com/en/rest) on your behalf. If you do not yet have a [GitHub](https://github.com/) account you will be prompted to create one during the configuration of the integration.

When you have authorized the integration, you select repositories you want to monitor, the list contains repositories you have created and [starred](https://github.com/stars) on GitHub with your account.

The integration works by subscribing to events on the repository to provide a push-like experience for the entities, which means that when a new issue is created or when someone open up a pull request with some fixes or when that new release you have been waiting for just got released this integration will help you get the information as soon as it happens.

## Remove authorization

After you have removed the integration from {% my integrations title="Settings -> Devices & services" %}, you need to manually revoke OAuth app authorization.

1. Go to your [Authorized OAuth Apps](https://github.com/settings/applications)
2. Find the "Home Assistant GitHub Integration" application
3. Click the 3 dots (`...`) to the right of the name
4. Select "Revoke"

## Action

When you configure a repository to be tracked in this integration it will be represented as a service in the device panel and all entities related to the repository will be nested under that device. The device also provides a link to the repository on GitHub and an option to download [diagnostics](/integrations/diagnostics) for the service.

<picture>
  <source srcset="/images/integrations/github/service_dark.png" media="(prefers-color-scheme: dark)">
  <img src="/images/integrations/github/service_light.png">
  <p>
</picture>

## Provided entities

### Latest commit

This sensor shows the message of the latest commit done in the default branch as
the state.

The sensor provides additional attributes for the latest commit:

- `sha`: The SHA for the commit
- `url`: A URL that will show you the commit on GitHub

### Latest discussion

This sensor shows the title of the latest discussion that was created as the state.

The sensor provides additional attributes for the latest discussion:

- `number`: The numerical ID that discussion was assigned
- `url`: A URL that will show you the discussion on GitHub

### Latest issue

This sensor shows the title of the latest issue that was created as the state.

The sensor provides additional attributes for the latest issue:

- `number`: The numerical ID that issue was assigned
- `url`: A URL that will show you the issue on GitHub

### Latest pull request

This sensor shows the title of the latest pull request that was created as the state.

The sensor provides additional attributes for the latest pull request:

- `number`: The numerical ID that pull request was assigned
- `url`: A URL that will show you the pull request on GitHub

### Latest release

This sensor shows the title of the latest release that was created in the repository.

The sensor provides additional attributes for the latest release:

- `tag`: The tag name that the release is created for
- `url`: A URL that will show you the release on GitHub

### Latest tag

This sensor shows the title of the latest tag that was created in the repository.

The sensor provides additional attributes for the latest tag:

- `url`: A URL that will show you the commit the tag was created for on GitHub

### Diagnostic entities

These entities are simpler diagnostic entities without any additional attributes:

- **Discussions**: Shows the number of discussions
- **Forks**: Shows the number of forks
- **Issues**: Shows the number of open issues
- **Pull requests**: Shows the number of open pull requests
- **Stars**: Shows the number of stars
- **Watchers**: Shows the number of watchers

## Automation

Here are some small examples on how you can automate using the provided entities from this integration.

{% note %}
Remember that the action names and entity IDs used in these examples are examples as well,
you need to replace it with actions and entities that you have in your installation.
{% endnote %}

### Notify new releases

This example uses the [Latest release](#latest-release) entity provided by this integration, and a [notify](/integrations/notify) action,

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.awesome_repository_latest_release
actions:
  - action: notify.notify
    data:
      title: "New github/repository release"
      message: >-
        Link to the new release:
        https://github.com/github/repository/releases/{{ trigger.to_state.state }}

```

{% endraw %}

### Notify new stars

This example uses the [Stars](#diagnostic-entities) diagnostic entity provided by this integration, and a [notify](/integrations/notify) action,

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.awesome_repository_stars
actions:
  - action: notify.notify
    data:
      title: "New github/repository new star"
      message: >-
        github/repository was starred again!
        Total stars are now: {{ trigger.to_state.state }}
```

{% endraw %}
