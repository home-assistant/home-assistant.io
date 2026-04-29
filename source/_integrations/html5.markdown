---
title: HTML5 Push Notifications
description: Instructions on how to use the HTML5 push notifications platform from Home Assistant.
ha_category:
  - Event
  - Notifications
ha_release: 0.27
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: html5
ha_platforms:
  - event
  - notify
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@alexyao2015'
  - '@tr4nt0r'
---

The **HTML5 Push Notifications** {% term integration %} enables you to receive push notifications to Chrome or Firefox, no matter where you are in the world. `html5` also supports Chrome and Firefox on Android, which enables native-app-like integrations without actually needing a native app.

{% important %}
HTML5 push notifications **do not** work on iOS versions below 16.4.
{% endimportant %}

## Requirements

The `html5` platform can only function if all of the following requirements are met:

- You are using Chrome and/or Firefox on any desktop platform, ChromeOS or Android. Or you added your Home Assistant instance to your home screen on iOS 16.4 or higher.
- On Brave desktop, you have gone into Brave Privacy Settings by going to `brave://settings/privacy` in your address bar or **Settings > Privacy and Security** and made sure the **Use Google services for push messaging** option is turned on.
- Your Home Assistant instance is accessible from outside your network over HTTPS or can perform an alternative [Domain Name Verification Method](https://support.google.com/webmasters/answer/9008080#domain_name_verification) on the domain used by Home Assistant.
- If using a proxy, HTTP basic authentication must be disabled to register or deregister push notifications. It can be re-enabled afterwards.
- You have configured SSL/TLS for your Home Assistant. It doesn't need to be configured in Home Assistant though, e.g., you can be running NGINX in front of Home Assistant and this will still work. The certificate must be trustworthy (i.e., not self-signed).
- You are willing to accept the notification permission in your browser.


{% include integrations/config_flow.md %}

### Setting up your browser

Assuming you have already configured the platform:

{% my profile badge %}

1. Open the Home Assistant {% my profile title="**User profile**" %} page in [a supported browser](#requirements). 
   - To open the page, select the **User Profile** link above or in Home Assistant, select your user account initials at the bottom of the sidebar.
2. Assuming you have met all the [requirements](#requirements) above, you should see a **Receive notifications** toggle.
   - If the toggle is greyed out, make sure you are viewing Home Assistant via its external HTTPS address. 
   - Also, make sure you have added the {% my integrations title="**HTML5 Push Notifications**" domain="html5" %} integration to Home Assistant.
3. Turn on the toggle and name the device.
4. Within a few seconds, you should be prompted to allow notifications from Home Assistant.
5. Assuming you accept, that's all there is to it!

**Note:** If you aren't prompted for a device name when enabling notifications, open the `html5_push_registrations.conf` file in your configuration directory. You will see a new entry for the browser you just added. Rename it from `unnamed device` to a name of your choice, which will make it easier to identify later. _Do not change anything else in this file!_ You need to restart Home Assistant after making any changes to the file.

## Notifiers

The **HTML5 Push Notifications** {% term integration %} will add a notify {% term entity %} for your configured device. To send a notification, you can use the `notify.send_message` {% term action %}. For more customizable notifications, you can use the [`html5.send_message`](#send-message) action instead. For further instructions on how to use **HTML5 Push Notifications** in automations, please see the [getting started with automation page](/getting-started/automation/).

{% details "Example YAML configuration" %}

```yaml
action: notify.send_message
data:
  title: "Reminder"
  message: "Have you considered frogs?"
  entity_id: notify.my-desktop
```

{% enddetails %}

### Events

The **HTML5 Push Notifications** {% term integration %} creates an **event** {% term entity %} for each configured device. Home Assistant will update the event state whenever a notification is:

- `received`: The notification arrives on the device.
- `clicked`: The recipient interacts with the notification.
- `closed`: The notification is dismissed without interaction.

Each event includes **state attributes** that provide additional context:

- `tag`: The identifier of the notification.
- `action`: The identifier of the action, if the recipient selected an action button in the notification.
- Any extra data that was included in the payload of the notification.

## Actions

The integration provides the following actions.

### Action: Send message

For more customizable notifications, use the `html5.send_message` action instead of `notify.send_message`.

Keep in mind that support for the features described below can vary depending on the browser and platform you are using. Refer to the [MDN Notifications API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#browser_compatibility) for a detailed overview of compatibility across environments.

- **Data attribute**: `title`
  - **Description**: Title for your notification message.
  - **Optional**: No
- **Data attribute**: `message`
  - **Description**: The message body of the notification.
  - **Optional**: Yes
- **Data attribute**: `icon`
  - **Description**: URL or relative path of an image to display as the main icon in the notification. Maximum size is 320px by 320px.
  - **Optional**: Yes
- **Data attribute**: `badge`
  - **Description**: URL or relative path of a small image to replace the browser icon on mobile platforms. Maximum size is 96px by 96px.
  - **Optional**: Yes
- **Data attribute**: `image`
  - **Description**: URL or relative path of a larger image to display in the main body of the notification. Experimental support; may not be displayed on all platforms.
  - **Optional**: Yes
- **Data attribute**: `tag`
  - **Description**: The identifier of the notification. Sending a new notification with the same tag replaces the existing one. If not specified, a unique tag is generated for each notification.
  - **Optional**: Yes
- **Data attribute**: `actions`
  - **Description**: Adds action buttons to the notification. When the user clicks a button, an event is sent back to Home Assistant. The number of actions supported may vary between platforms.
  - **Optional**: Yes
  - **Keys**:
    - **`action`**: The identifier of the action. This is sent back to Home Assistant when the user clicks the button. Required.
    - **`title`**: The label of the button displayed to the user. Required.
    - **`icon`**: URL or relative path of an image displayed as the icon for this button. Maximum size is 128px by 128px. Optional.
- **Data attribute**: `dir`
  - **Description**: The direction of the notification's text. Adopts the browser's language setting behavior by default.
  - **Optional**: Yes
- **Data attribute**: `renotify`
  - **Description**: If enabled, the user is alerted again (sound/vibration) when a notification with the same tag replaces a previous one.
  - **Optional**: Yes
- **Data attribute**: `silent`
  - **Description**: If enabled, the notification does not play sounds or trigger vibration, regardless of the device's settings.
  - **Optional**: Yes
- **Data attribute**: `require_interaction`
  - **Description**: If enabled, the notification remains active until the user clicks or dismisses it, rather than automatically closing after a few seconds. This provides the same behavior on desktop as on mobile platforms.
  - **Optional**: Yes
- **Data attribute**: `vibrate`
  - **Description**: A vibration pattern to run with the notification. An array of integers representing alternating periods of vibration and silence in milliseconds. For example, `[200, 100, 200]` vibrates for 200ms, pauses for 100ms, then vibrates for another 200ms.
  - **Optional**: Yes
- **Data attribute**: `lang`
  - **Description**: The language of the notification's content.
  - **Optional**: Yes
- **Data attribute**: `timestamp`
  - **Description**: The timestamp of the notification. By default, uses the time when the notification is sent.
  - **Optional**: Yes
- **Data attribute**: `ttl`
  - **Description**: Specifies how long the push service retains the message if the user's browser or device is offline. After this period, the notification expires. A value of `0` means the notification is discarded immediately if the target is not connected. Defaults to 1 day.
  - **Optional**: Yes
- **Data attribute**: `urgency`
  - **Description**: Whether the push service tries to deliver the notification immediately or defers it in accordance with the user's power-saving preferences.
  - **Optional**: Yes
- **Data attribute**: `data`
  - **Description**: Additional custom key-value pairs to include in the payload of the push message. This can be used to include extra information that can be accessed in the notification click event.
  - **Optional**: Yes

{% details "Example YAML configuration" %}

```yaml
action: html5.send_message
data:
  title: Home Assistant
  message: Hello World
  icon: /static/icons/favicon-192x192.png
  badge: /static/images/notification-badge.png
  image: /static/images/image.jpg
  tag: message-group-1
  actions:
    - action: test-action
      title: 🆗 Click here!
      icon: /images/action-1-128x128.png
  dir: auto
  renotify: true
  silent: false
  require_interaction: true
  vibrate:
    - 125
    - 75
    - 125
    - 275
    - 200
    - 275
    - 125
    - 75
    - 125
    - 275
    - 200
    - 600
    - 200
    - 600
  lang: es-419
  timestamp: 1970-01-01 00:00:00
  ttl:
    days: 28
  urgency: normal
  data:
    url: https://www.home-assistant.io/integrations/html5/
target:
  entity_id: notify.my_desktop
```


{% enddetails %}

{% note %}

When using a relative path for an image or icon URL, the path is resolved relative to the base URL of your Home Assistant instance.

{% endnote %}

### Action: Dismiss message

You can dismiss notifications using the `html5.dismiss_message` action.

- **Data attribute**: `tag`
  - **Description**: The tag of the notifications to dismiss. If not specified, all notifications to the selected devices will be dismissed.
  - **Optional**: Yes

{% details "Example YAML configuration" %}

```yaml
action: html5.dismiss_message
data:
  tag: message-group-1
target:
  entity_id: notify.my_desktop
```


{% enddetails %}

## Automating notification events

During the lifespan of a single push notification, Home Assistant will emit a few different events to the event bus which you can use to write automations against.

Common event payload parameters are:

| Parameter | Description                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `action`  | The `action` key that you set when sending the notification of the action clicked. Only appears in the `clicked` event.                                                                                                                                                  |
| `data`    | The data dictionary you originally passed in the notify payload, minus any parameters that were added to the HTML5 notification (`actions`, `badge`, `body`, `dir`, `icon`, `image`, `lang`, `renotify`, `requireInteraction`, `tag`, `timestamp`, `vibrate`, `silent`). |
| `tag`     | The unique identifier of the notification. Can be overridden when sending a notification to allow for replacing existing notifications.                                                                                                                                  |
| `target`  | The target that this notification callback describes.                                                                                                                                                                                                                    |
| `type`    | The type of event callback received. Can be `received`, `clicked` or `closed`.                                                                                                                                                                                           |

You can use the `target` parameter to write automations against a single `target`. For more granularity, use `action` and `target` together to write automations which will do specific things based on what target clicked an action.

### Received event

You will receive an event named `html5_notification.received` when the
notification is received on the device.

```yaml
- alias: "HTML5 push notification received and displayed on device"
  triggers:
    - trigger: event
      event_type: html5_notification.received
```

### Clicked event

You will receive an event named `html5_notification.clicked` when the notification or a notification action button is clicked. The action button clicked is available as `action` in the `event_data`.

```yaml
- alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
```

or

```yaml
- alias: "HTML5 push notification action button clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
      event_data:
        action: open_door
```

### Closed event

You will receive an event named `html5_notification.closed` when the notification is closed.

```yaml
- alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.closed
```

## Making notifications work with NGINX proxy

If you use NGINX as a proxy with authentication in front of your Home Assistant instance, you may have trouble with receiving events back to Home Assistant. It's because of an authentication token that cannot be passed through the proxy.

To solve the issue put additional location into your NGINX site's configuration:

```bash
location /api/notify.html5/callback {
    if ($http_authorization = "") { return 403; }
    allow all;
    proxy_pass http://localhost:8123;
    proxy_set_header Host $host;
    proxy_redirect http:// https://;
}
```

This rule check if request have `Authorization` HTTP header and bypass the htpasswd (if you use one).

If you still have the problem, even with mentioned rule, try to add this code:

```bash
    proxy_set_header Authorization $http_authorization;
    proxy_pass_header Authorization;
```
