---
title: Apprise
description: Instructions on how to add Apprise notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.101
ha_codeowners:
  - '@caronc'
ha_domain: apprise
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The [Apprise service](https://github.com/caronc/apprise/) is an all-in-one solution to open up Home Assistant to _just about_ every Notification platform (such as Amazon SNS, Discord, Telegram, Slack, MSTeams, Twilio, etc.)

## Configuration

To use Apprise supported notifications, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry using URLs
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    url: YOUR_APPRISE_URLS
```

You can also predefine your own configuration files while storing them either remotely or locally. Simply just use the `config` option.

```yaml
# Example configuration.yaml entry using externally located Apprise
# Configuration Files/Sites:
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: YOUR_APPRISE_CONFIG_URLS
```

There is no restriction on the number of URLs or Apprise Configuration locations you wish to define. You can also use both of the lines in conjunction with one another:

```yaml
# Example configuration.yaml entry using all options
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: YOUR_APPRISE_CONFIG_URLS
    url: YOUR_APPRISE_URLS
```

{% configuration %}
name:
  description: The notifier will bind to the action `notify.NAME`.
  required: false
  type: string
  default: notify
url:
  description: One or more Apprise URLs
  required: false
  type: string
config:
  description: One or more Apprise Configuration URLs
  required: false
  type: string
{% endconfiguration %}

## Example action

```yaml
- action: notify.NOTIFIER_NAME
  data:
    message: "A message from Home Assistant"
```

If you're using configuration files to store your Apprise URLs in, then you have the added bonus of associating tags with them. By default, Apprise in Home Assistant will only notify the elements that have no tags associated with them. You can optionally focus on only notifying a specific service based on the tag(s) you assigned them like so:

```yaml
- action: notify.NOTIFIER_NAME
  data:
    message: "A message from Home Assistant"
    target: [
      "tag_name1",
    ]
```

The tag `all` is reserved to notify absolutely everything, whether you have a tag associated with a URL or not.

## Notes

There are over 50 supported Notification services supported by Apprise. Each has their own tweaks and customizations you can leverage.

- For instructions on how to construct the URLs, visit [here](https://github.com/caronc/apprise/wiki#notification-services).
- For instructions on how you can customize your own Apprise configuration files (referenced through the `config` directive), check out the following:
  - [Text Formatted URLs](https://github.com/caronc/apprise/wiki/config_text)
  - [YAML Formatted URLs](https://github.com/caronc/apprise/wiki/config_yaml)
