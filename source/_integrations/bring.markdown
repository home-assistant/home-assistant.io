---
title: Bring!
description: Instructions on how to integrate the Bring! todo list with Home Assistant.
ha_category:
  - To-do list
ha_iot_class: Cloud Polling
ha_release: 2024.2
ha_config_flow: true
ha_codeowners:
  - '@miaucl'
  - '@tr4nt0r'
ha_domain: bring
ha_integration_type: service
ha_platforms:
  - diagnostics
  - event
  - sensor
  - todo
related:
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /dashboards/todo-list/
    title: To-do list card
  - url: https://www.getbring.com/
    title: Bring!
ha_quality_scale: platinum
---

The **Bring!** integration allows you to sync your [Bring!](https://www.getbring.com/) shopping lists with Home Assistant.

## About Bring!  

**Bring!** is a grocery shopping list app that allows users to create shared lists and organize grocery shopping with family, partners, or roommates.  

Available as a mobile app on [Google Play for Android](https://play.google.com/store/apps/details?id=ch.publisheria.bring) and the [App Store for iOS](https://itunes.apple.com/app/apple-store/id580669177). **Bring!** also offers a web version at [web.getbring.com](https://web.getbring.com).  

## How you can use this integration

- **Automated notifications**: Receive alerts on your phone when essential items are added to your list or when the quantity of items reaches a set value.
- **List updates based on events**: Automatically add items to your shopping list when appliances are low on supplies, like dishwasher salt, or need routine maintenance, such as tub cleaner for the washer.
- **Voice control**: Use voice assistants connected to Home Assistant to add items to your **Bring!** list.
- **Geofencing**: Receive reminders when you are near a specific store and need to pick up items, based on your location.

## Prerequisites

For authentication, the integration requires the `email` and `password` of your **Bring!** account.  If you don’t have an account, you can sign up via the mobile app or the web version.

If you signed up using **Apple ID**, **Google Sign-in**, or **Facebook Login**, you will need to create a password to use the integration.

- On mobile: Open the Bring! app and go to **Profile** > **More settings** > **Change password**.  
- On the web: Visit **Settings** > **Reset password** or go directly to [Reset Password](https://web.getbring.com/app/settings/resetpassword).

You can still log in with your existing authentication method afterward.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Email:
  description: "The email address associated with your Bring! account."
Password:
  description: "The password to log in to your Bring! account."
{% endconfiguration_basic %}

## Sensors

- **Urgent**: Shows the number of items tagged with the **Urgent** badge on the shopping list. Completed items are excluded.
- **On occasion**: Displays the count of items marked with the **If convenient** badge.
- **Discount only**: Indicates the number of items tagged with the **Offer** badge.
- **Region & Language**: The sensor can be used for diagnostics. If everything is set correctly, it will display the selected region for the shopping list. If it shows **Unknown**, the region has not been set properly in the **Bring!** app.
- **List access**: Indicates whether the shopping list is **personal** (private) or **shared** (accessible to others).

## Events

- **Activities:** The event entity displays the most recent activity on a Bring! shopping list, including the activity type and the profile picture of the user who performed it. There are three types of activities: *Items added* (when a user adds items to the list), *Items removed* (when a user removes items), and *Items changed* (when a user modifies item details or quantity). The event attributes provide additional details, including the list of added, removed, or modified items, the user's name, and the exact time of the activity.

## Actions

You can use the actions from the [to-do list](/integrations/todo/) to create, update, or delete items on your Bring! shopping lists.

### Notifications

The **Bring!** integration offers an action to send push notifications to the Bring! mobile apps of other members of a shared shopping list. The Bring! mobile app has 4 predefined notification types.

{% note %}

If you want to receive these notifications, you must use a dedicated account, as outlined in the [known limitations](#known-limitations).

{% endnote %}

| Data attribute         | Optional | Description                                                                                                                             |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `target`               |       no | Target Bring! list(s) whose members should be notified.                                                                                 |
| `message`              |       no | Type of push notification to send to list members. See [Notification types](#available-notification-types).                             |
| `item`                 |      yes | Required for `urgent_message`. Item to include in the message. For example: *Attention! Attention! - We still urgently need: Cilantro*. |

### Available notification types

| Notification type   | Name of notification                                           |
| ------------------- | -------------------------------------------------------------- |
| `going_shopping`    | I'm going shopping! - Last chance for adjustments              |
| `changed_list`      | I changed the list! - Take a look at the items                 |
| `shopping_done`     | The shopping is done! - The fridge is well stocked             |
| `urgent_message`    | Attention! Attention! - We still urgently need: `[Items]`      |

{% note %}

The notification that list members receive differs from the label shown in the Bring! app. This variation depends not only on the recipient’s language settings but also on the sender's profile name. Additionally, notifications may change with new app updates. Here are some example notifications:

- `name` is going shopping for "`shopping list name`"! Last chance to make changes
- `name` went shopping for "`shopping list name`"! The fridge is well stocked
- `name` updated the list "`shopping list name`"! Take a look at the articles
- Attention, something's missing! Please buy `item` urgently

{% endnote %}

### Sending a going shopping notification

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: going_shopping 
```

### Sending an urgent message notification

Note that for the notification type `urgent_message` the attribute `item` is **required**.

```yaml
...
actions:
  - action: bring.send_message
    target:
      entity_id: todo.bring_shoppinglist
    data:
      message: urgent_message
      item: Cilantro
```

## Automations

Get started with these automation examples for **Bring!**, each featuring ready-to-use blueprints!

### Grocery shopping reminder 🛒

Get notified when it's time to go grocery shopping. A notification is sent when your shopping list reaches a set threshold or when urgent items are added.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/bring-grocery-shopping-reminder/843123" %}

{% details "Example YAML configuration" %}

{% raw %}

```yaml
triggers:
  - trigger: numeric_state
    entity_id: todo.shopping_list
    above: 10
    id: shopping list too long
  - trigger: numeric_state
    entity_id: sensor.shopping_list_urgent
    above: 0
    id: shopping is urgent
actions:
  - choose:
      - conditions:
          - condition: trigger
            id: shopping list too long
        sequence:
          - action:
              - action: notify.notify
                data:
                  message: >-
                    The list is getting long, plan a trip to the grocery shop in
                    the next days
                  title: Shopping needed soon 🛒
      - conditions:
          - condition: trigger
            id: shopping is urgent
        sequence:
          - action:
              - action: notify.notify
                data:
                  title: 🚨 Time to go shopping! 🛒
                  message: Urgent groceries needed! Grab your shopping bag and go!
  - delay:
      hours: 1
mode: single
alias: "Bring!: Grocery shopping reminder 🛒"
description: "Get notified when it's time to go grocery shopping. A notification is sent when your shopping list reaches a set threshold or when urgent items are added."
```

{% endraw %}

{% enddetails %}

## Data updates  

This integration syncs your lists by {% term polling %} the **Bring!** service every 90 seconds or immediately after an action is performed in Home Assistant, such as adding an item. If you prefer a less frequent update, **custom polling interval** can also be defined — see [Defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) for details.

## Known limitations

- Changes made in Home Assistant are reflected instantly in the **Bring!** app, while changes in the Bring! app may be delayed by up to 90 seconds due to the polling interval.
- To receive push notifications in the **Bring!** app when items are added or removed in Home Assistant, or when triggered by the `bring.send_message` action, it is recommended to use a dedicated account (such as `email:name+ha@example.com`) when setting up the integration.

## Troubleshooting

The **Bring!** integration relies on an active internet connection to communicate with Bring!. If you encounter issues, verify that your network connection is stable. Additionally, the Bring! service itself may experience downtime, whether unexpected or due to scheduled maintenance.

- A **502 - Bad Gateway** error (`aiohttp.client_exceptions.ClientResponseError: 502, message='Bad Gateway'`) is known to occur occasionally (1–2 times per day) but is usually temporary. The integration will retry automatically after 90 seconds, so there’s no need to take action.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
