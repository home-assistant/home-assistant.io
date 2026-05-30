---
title: Apprise
description: Instructions on how to use Apprise to send notifications from Home Assistant to more than 140 notification services.
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

The Apprise integration connects Home Assistant to [more than 140 notification services](https://appriseit.com/services/), including Amazon SNS, Discord, Telegram, Slack, Microsoft Teams, Twilio, and many more. A single Apprise configuration can route alerts to multiple services at once, so your automations stay simple and provider-independent.

Apprise is built into Home Assistant Core. You do not need to install a custom component or add-on.

## Configuration

To use Apprise notifications, add the following to your {% term "`configuration.yaml`" %} file and restart Home Assistant.
{% include integrations/restart_ha_after_config_inclusion.md %}

### Direct URL

The simplest setup. Add one or more Apprise URLs directly to your configuration. Visit the [Apprise services directory](https://appriseit.com/services/) to find the right URL format for your service:

```yaml
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    url: YOUR_APPRISE_URL
```

You can pass a list to notify multiple services at once:

```yaml
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    url:
      - YOUR_FIRST_URL
      - YOUR_SECOND_URL
```

Every service listed under `url` is always notified together on every action call. If you need to selectively notify different services depending on the situation, use the configuration file approach instead, which supports tag-based targeting.

### Configuration file

To notify multiple services or use tag-based routing, store your service URLs in a separate file and reference it:

```yaml
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: /config/apprise.yml
```

Then create `/config/apprise.yml` and list your services:

```yaml
# /config/apprise.yml
urls:
  - tgram://BOT_TOKEN/CHAT_ID:
      tag: telegram
  - mailtos://user:pass@smtp.gmail.com:
      tag: email
```

### Remote Apprise API

If you run a self-hosted [Apprise API](https://appriseit.com/api/) instance, you can point the `config` option directly to it. This is useful when you manage multiple Home Assistant installations and want to keep your notification services defined in one place:

```yaml
notify:
  - name: NOTIFIER_NAME
    platform: apprise
    config: https://apprise.example.com/get/YOUR_PROFILE_KEY
```

You can also use `url` and `config` together in the same entry, and you can define as many services as you like in either option. For details on YAML and plain text configuration file formats, see the [Apprise configuration documentation](https://appriseit.com/config/).

## Configuration options

{% configuration %}
name:
  description: The notifier will bind to the action `notify.NAME`.
  required: false
  type: string
  default: notify
url:
  description: >-
    One or more Apprise URLs pointing to notification services. Accepts a
    single URL string or a list of URL strings. All listed services are
    notified on every call.
  required: false
  type: list
config:
  description: >-
    A path or URL pointing to an Apprise configuration file or a remote
    Apprise API endpoint.
  required: false
  type: string
{% endconfiguration %}

## Sending a notification

Once Home Assistant restarts, use the notify service you defined to send notifications from an automation:

```yaml
- action: notify.NOTIFIER_NAME
  data:
    title: "Motion detected"
    message: "Front door camera triggered."
```

### Tag-based targeting

When you use a configuration file, you can assign tags to your services and use the `target` field to control who receives each message. By default, Apprise only notifies services that have no tags assigned. Use `target` to reach tagged services:

```yaml
- action: notify.NOTIFIER_NAME
  data:
    message: "Security alert: front door opened."
    target: "security"
```

How multiple tags combine in `target`:

- A list sends to every service tagged with *any* of the listed values (OR logic).
- A space-separated string sends only to services that carry *all* of the listed tags (AND logic).
- The reserved tag `all` notifies every service, whether tagged or not.

```yaml
# OR logic: notify anything tagged "security" or "family"
- action: notify.NOTIFIER_NAME
  data:
    message: "Alert."
    target:
      - "security"
      - "family"
```

```yaml
# AND logic: notify only services tagged BOTH "security" AND "family"
- action: notify.NOTIFIER_NAME
  data:
    message: "Alert."
    target: "security family"
```

## Troubleshooting

If notifications are not sending, enable debug logging for the Apprise component in your {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.apprise: debug
```

After restarting, your Home Assistant logs will show which configuration files Apprise loads, how it resolves tags, and whether each notification dispatches successfully. This makes it easy to spot invalid URLs or connectivity issues.
