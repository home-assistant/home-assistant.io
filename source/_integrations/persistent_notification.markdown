---
title: Persistent Notification
description: Instructions on how to integrate persistent notifications into Home Assistant.
ha_category:
  - Other
ha_iot_class: Local Push
ha_release: 0.23
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: persistent_notification
ha_integration_type: system
---

The **Persistent Notification** {% term integration %} can be used to show a notification on the frontend that has to be dismissed by the user.

<p class='img'>
  <img src='/images/screenshots/persistent-notification.png' />
</p>

## Automation

Persistent notification [triggers](/docs/automation/trigger) enable automations to be triggered when persistent notifications are updated. Triggers can be limited to a specific notification by providing an ID for `notification_id`, or when this value is omitted the automation will trigger for any notification ID. If no `update_type` is provided, the automation will trigger for the following update types: `added`, `removed`, `updated`, or `current`. By providing one or more of these values to the `update_type` option, the automation triggers only on these `update_type` events.

Review the [Automating Home Assistant](/getting-started/automation/) getting started guide on automations or the [Automation](/docs/automation/) documentation for full details.

{% my automations badge %}

An example of a persistent notification trigger in YAML:

```yaml
automation:
  - triggers:
      - trigger: persistent_notification
        # Optional. Possible values: added, removed, updated, current
        update_type:
          - added
          - removed
        # Optional.
        notification_id: invalid_config
```

See [Automation Trigger Variables: Persistent Notification](/docs/automation/templating/#persistent-notification) for additional trigger data available for conditions or actions.

{% include integrations/actions.md %}

## Use as a notifier

Persistent notifications can also be used as a pre-configured notifier for the [Notify integration](/integrations/notify/) when that integration is loaded. It is available as `notify.persistent_notification`. This lets you use it with features that require a notifier, such as [notify action groups](/integrations/group/#notify-action-groups) or the [Alert integration](/integrations/alert/).

You can place the following attribute inside `data` for extended functionality:

- `notification_id`: When a notification ID is given, it overwrites the notification if one with that ID already exists.
