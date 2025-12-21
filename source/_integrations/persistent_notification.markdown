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

The `persistent_notification` integration can be used to show a notification on the frontend that has to be dismissed by the user.

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

See [Automation Trigger Variables: Persistent Notification](/docs/automation/templating/#persistent-notification) 
for additional trigger data available for conditions or actions.

### Action

The `persistent_notification.create` action takes in `message`, `title`, and `notification_id`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification. |
| `title`                |      yes | Title of the notification. |
| `notification_id`      |      yes | If `notification_id` is given, it will overwrite the notification if there already was a notification with that ID. |

Here is how an [action](/docs/automation/action) of your [automation setup](/getting-started/automation/) with static content could look like.

```yaml
actions:
  - action: persistent_notification.create
    data:
      message: "Your message goes here"
      title: "Custom subject"
```

If you want to show some runtime information, you have to use [templates](/docs/configuration/templating/).

{% raw %}

```yaml
actions:
  - action: persistent_notification.create
    data:
      title: >
        Thermostat is {{ state_attr('climate.thermostat', 'hvac_action') }}
      message: "Temperature {{ state_attr('climate.thermostat', 'current_temperature') }}"
```

{% endraw %}

The `persistent_notification.dismiss` action requires a `notification_id`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `notification_id`      |      no  | the `notification_id` is required to identify the notification that should be removed.

This action allows you to remove a notifications by script or automation.

```yaml
actions:
  - action: persistent_notification.dismiss
    data:
      notification_id: "1234"
```

The `persistent_notification.dismiss_all` action allows you to remove all notifications.

```yaml
actions:
  - action: persistent_notification.dismiss_all
```

### Markdown support

The message attribute supports the [Markdown formatting syntax](https://daringfireball.net/projects/markdown/syntax). Some examples are:

| Type | Message |
| ---- | ------- |
| Headline 1 | `# Headline` |
| Headline 2 | `## Headline` |
| Newline | `\n` |
| Bold | `**My bold text**` |
| Italic | `*My italic text*` |
| Link | `[Link](https://home-assistant.io/)` |
| Image | `![image](/local/my_image.jpg)` |

{% note %}
`/local/` in this context refers to the `.homeassistant/www/` folder.
{% endnote %}

### Create a persistent notification

Choose the **{% my developer_services title="Actions" %}** tab from the **Developer Tools** sidebar item, then select the {% my developer_services service="persistent_notification.create" title="`persistent_notification.create`" %} action from the **Action** dropdown. Enter something like the sample below into the **data** field and press the **Perform action** button.

```json
{
  "notification_id": "1234",
  "title": "Sample notification",
  "message": "This is a sample text."
}
```
This will create the notification entry shown above.

### Use as a notifier

Persistent notifications can also be used as a pre-configured notifier for the [Notify integration](/integrations/notify/) if that integration is loaded. It is available as `notify.persistent_notification`. This enables it to be used with features that require a notifier like [Notify Groups](/integrations/group/#notify-groups) or the [Alert integration](/integrations/alert/).

The following attributes can be placed inside `data` for extended functionality.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `notification_id`      |      yes | If `notification_id` is given, it will overwrite the notification if there already was a notification with that ID. |
