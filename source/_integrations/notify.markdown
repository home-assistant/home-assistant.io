---
title: Notifications
description: Instructions on how to add user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: notify
ha_integration_type: entity
---

The **Notify** {% term integration %} makes it possible to send notifications to a wide variety of platforms. To use it, you have to set up at least one notification target (notifier). Check the [integrations list](/integrations/#notifications) for one that fits your use case.

If you want to send notifications to the Home Assistant web interface, you may use the [Persistent Notification integration](/integrations/persistent_notification/). It is available as an automatically configured notifier. See [its documentation](/integrations/persistent_notification/) for more details.

{% include integrations/building_block_integration.md %}

## Service

The legacy `notify` platform will expose a generic `notify` service that can be called to send notifications.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.
| `target`               |      yes | Some platforms allow specifying a recipient that will receive the notification. See your platform page if it is supported.
| `data`                 |      yes | On platforms who have extended functionality. See your platform page if it is supported.

## Usage

The different **Notify** integrations you have set up will each show up as a different automation {% term action %} or {% term service %} call that you can use.

One notification integration is automatically included, the Persistent Notifications which creates a notification in the sidebar of the web interface of Home Assistant. This can be chosen with the action named "Notifications: Send a persistent notification" which uses the service `notify.persistent_notification`.

## Notify entity service

Integrations can also implement the notify entity platform. Entity platform implementations will replace the legacy notify service in time. There is an entity platform service `send_message` which allows you to send notification messages to multiple notify entities.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `title`                |      yes | Title of the notification.

## Companion app notifications

A common notification integration is via the Home Assistant Companion app for Android or iPhone. This can be chosen with the action "Send a notification via mobile_app_your_phone_name", which uses the service `notify.mobile_app_your_phone_name`. Refer to the [Companion app documentation](https://companion.home-assistant.io/docs/notifications/notifications-basic) for lots of customization options.

With any of these integrations, the `message` data input in the automation editor is the main text that will be sent. Other fields are optional, and some integrations support additional `data` or `target` information to customize the action. For more details, refer to their integration documentation.

Be aware that the `notify.notify` service is shorthand for the first notify service the system can find. It might not work as intended. Choose a specific service to make sure your message goes to the right place.

Notifications can also be sent using [Notify groups](https://www.home-assistant.io/integrations/group/#notify-groups). These allow you to send notification to multiple devices with a single call, or to update which device is notified by only changing it in a single place.

### Test if it works

After you setup a [notifier](/integrations/#notifications), a simple way to test if you have set up your notify platform correctly is to open {% my developer_services title="**Developer tools** > **Services**" %}** tab from the sidebar. Choose your service from the **Service** dropdown menu depending on the integration you want to test, such as **Notifications: Send a persistent notification** or **Notifications: Send a notification via mobile_app_your_phone_name**. Enter your message into the **message** field, and select the **CALL SERVICE** button.

To test the entity platform service, select the `notify.send_message` service, and select one or more of `entity`, `device`, `area`, or `label`. Then, supply a `message`.

### Example with the entity platform notify service

Under {% my developer_services title="**Developer Tools** > **Services**" %}, select the **Notifications: Send a notification message** action. Select some target entity's using the entity selectors, enter a message and test sending it.

If you switch to view the YAML data under **Developer Tools**, it will appear as below. The same {% term action %} can be chosen in {% term automation %}. The YAML will appear the same:

{% raw %}

```yaml
service: notify.send_message
data:
  entity_id: notify.my_direct_message_notifier
  message: "You have an update!"
  title: "Status changed"
```

{% endraw %}

The notify integration supports specifying [templates](/docs/configuration/templating/). This will allow you to use the current state of entities in Home Assistant in your notifications, or use more complex logic to decide the message that is sent.

{% raw %}

```yaml
action:
  service: notify.send_message
  data:
    entity_id: notify.my_direct_message_notifier
    message: "You have {{ states('todo.shopping_list') }} items on your shopping list."
```

{% endraw %}

### Examples with the legacy notify service

In the **Developer Tools**, on the **Services** tab, select the **Notifications: Send a persistent notification** action. Enter a message and test sending it.

If you switch to view the YAML data under **Developer Tools**, it will appear as below. The same {% term action %} can be chosen in {% term automation %} actions %, whose YAML will appear the same:

{% raw %}

```yaml
service: notify.persistent_notification
data:
  message: "Can you hear me now?"
```

{% endraw %}

The notify integration supports specifying [templates](/docs/configuration/templating/). This will allow you to use the current state of entities in Home Assistant in your notifications, or use more complex logic to decide the message that is sent.

{% raw %}

```yaml
action:
  service: notify.persistent_notification
  data:
    message: "You have {{ states('todo.shopping_list') }} items on your shopping list."
```

{% endraw %}

{% raw %}

```yaml
action:
  service: notify.persistent_notification
  data:
    message: "The sun is {% if is_state('sun.sun', 'above_horizon') %}up{% else %}down{% endif %}!"
```

{% endraw %}
