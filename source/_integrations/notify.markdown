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

## The state of a notify entity

The state of a notify entity is the date and time when a message was last sent.

<p class='img'>
<img src='/images/integrations/notify/state_notify.png' alt='Screenshot showing the state of a notify entity in the developer tools' />
Screenshot showing the state of a notify entity in the developer tools.
</p>

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}

## Companion app notifications

A common notification integration is via the Home Assistant Companion app for Android or iOS. If your phone is available as a notify entity, use the **Send a notification message** action and select that phone as the target. Some older setups may still provide a phone-specific action such as `notify.mobile_app_your_phone_name`. Refer to the [Companion app documentation](https://companion.home-assistant.io/docs/notifications/notifications-basic) for lots of customization options.

With any of these integrations, the **Message** field in the automation editor is the main text that will be sent. Other fields are optional, and some integrations support additional **Data** or **Target** information to customize the action. For more details, refer to their integration documentation.

Be aware that the `notify.notify` action is shorthand for the first notify action the system can find. It might not work as intended. Choose a specific action to make sure your message goes to the right place.

Notifications can also be sent using [Notify groups](/integrations/group/#notify-groups). These allow you to send notifications to multiple devices with a single call, or to update which device is notified by only changing it in a single place.

## Notifications automation examples

Notifications are most useful when Home Assistant sends them at the right moment, such as when something needs your attention or when you want a message to stay visible in the interface. The examples below show two common ways to use notification actions in automations.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when the garage door stays open

This automation sends a message to your phone when the garage door has been open for 10 minutes.

- **Trigger**: State
  - **Entity**: Garage door (`binary_sensor.garage_door`)
  - **To**: On
  - **For**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The garage door has been open for 10 minutes.

{% details "YAML example for a garage door notification" %}

{% example %}
automation: |
  alias: "Notify when the garage door stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.garage_door
      to: "on"
      for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The garage door has been open for 10 minutes.
{% endexample %}

{% enddetails %}

### Automation: show a persistent notification when a leak is detected

This automation shows a notification in the Home Assistant interface when a leak sensor detects moisture.

- **Trigger**: State
  - **Entity**: Kitchen leak sensor (`binary_sensor.kitchen_leak`)
  - **To**: On
- **Action**: Send a persistent notification
  - **Title**: Water leak detected
  - **Message**: The kitchen leak sensor detected moisture.

{% details "YAML example for a leak notification" %}

{% example %}
automation: |
  alias: "Show a kitchen leak notification"
  triggers:
    - trigger: state
      entity_id: binary_sensor.kitchen_leak
      to: "on"
  actions:
    - action: notify.persistent_notification
      data:
        title: "Water leak detected"
        message: "The kitchen leak sensor detected moisture."
{% endexample %}

{% enddetails %}

## Testing a notification action

After you set up a [notifier](/integrations/#notifications), test its action from the developer tools.

1. Go to {% my developer_services title="**Settings** > **Developer tools** > **Actions**" %}.
2. From the **Action** dropdown menu, choose the action you want to test, such as **Send a notification message** or **Send a persistent notification**.
3. If you are testing `notify.send_message`, select one or more targets using **Entity**, **Device**, **Area**, **Floor**, or **Label**.
4. In **Message**, enter the notification text.
5. Select **Perform action**.
