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
  - url: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
    title: MDN Notifications API documentation
  - url: https://support.google.com/webmasters/answer/9008080#domain_name_verification
    title: Domain name verification
ha_codeowners:
  - '@alexyao2015'
  - '@tr4nt0r'
---

The **HTML5 Push Notifications** {% term integration %} lets you receive push notifications in supported browsers.

## Supported platforms

The following platforms are known to support web push notifications:

- On desktop (Windows/macOS/Linux) and Android: Chrome/Chromium, Firefox, Edge, Brave, Opera, Vivaldi.
- Since iOS / iPadOS 16.4, for installed web apps (PWAs).

## Prerequisites

- In Brave on desktop, open `brave://settings/privacy` or go to **Settings > Privacy and Security**, and ensure that **Use Google services for push messaging** is enabled.
- Your Home Assistant instance must be reachable from outside your local network over HTTPS, or you must be able to complete an alternative [Domain Name Verification Method](https://support.google.com/webmasters/answer/9008080#domain_name_verification) for the domain used by Home Assistant.
- If using a reverse proxy, HTTP Basic Authentication must be temporarily disabled to allow registering or unregistering push notifications. It can be re-enabled afterwards.
- Your Home Assistant setup must use a valid SSL/TLS certificate. This does not need to be configured directly in Home Assistant (for example, it can be handled by NGINX in front of Home Assistant). See [Enabling HTML5 Push Notifications behind an NGINX reverse proxy with authentication](#enabling-html5-push-notifications-behind-an-nginx-reverse-proxy-with-authentication).
- You must accept the notification permission prompt in your browser.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "Email address used for contact information. This address is included in the metadata of every notification."
VAPID private key:
    description: "Private key used for push notification authentication. If omitted, a key will be generated automatically."
{% endconfiguration_basic %}

### Setting up your browser

Assuming you have already configured the platform:

{% my profile badge %}

1. Open the Home Assistant {% my profile title="**User profile**" %} page in [a supported browser](#supported-platforms).
   - To open the page, select the **User Profile** link above or in Home Assistant, select your user account initials at the bottom of the sidebar.
2. Assuming you have met all the [requirements](#prerequisites) above, you should see a **Receive notifications** toggle.
   - If the toggle is greyed out, make sure you are viewing Home Assistant via its external HTTPS address. 
   - Also, make sure you have added the {% my integrations title="**HTML5 Push Notifications**" domain="html5" %} integration to Home Assistant.
3. Turn on the toggle and name the device.
4. Within a few seconds, you should be prompted to allow notifications from Home Assistant.
5. Assuming you accept, that's all there is to it!

**Note:** If you aren't prompted for a device name when enabling notifications, open the `html5_push_registrations.conf` file in your configuration directory. You will see a new entry for the browser you just added. Rename it from `unnamed device` to a name of your choice, which will make it easier to identify later. _Do not change anything else in this file!_ You need to restart Home Assistant after making any changes to the file.

## Supported functionality

### Notifiers

The **HTML5 Push Notifications** {% term integration %} will add a notify {% term entity %} for your configured device. To send a notification, you can use the **Notify: Send message** (`notify.send_message`) {% term action %}. For more customizable notifications, you can use the [**HTML5 Push Notifications: Send message** (`html5.send_message`)](/actions/html5.send_message/) action instead. For further instructions on how to use **HTML5 Push Notifications** in automations, please see the [getting started with automation page](/getting-started/automation/).

{% example %}
action: |
  action: html5.send_message
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
  target:
    entity_id: notify.my_desktop
{% endexample %}

### Events

The **HTML5 Push Notifications** {% term integration %} creates an **event** {% term entity %} for each configured device. Home Assistant will update the event state whenever a notification is:

- `received`: The notification arrives on the device.
- `clicked`: The recipient interacts with the notification.
- `closed`: The notification is dismissed without interaction.

Each event includes **state attributes** that provide additional context:

- `tag`: The identifier of the notification.
- `action`: The identifier of the action, if the recipient selected an action button in the notification.
- Any extra data that was included in the payload of the notification.

{% include integrations/actions.md %}

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

{% example %}
automation: |
  alias: "HTML5 push notification received and displayed on device"
  triggers:
    - trigger: event
      event_type: html5_notification.received
{% endexample %}

### Clicked event

You will receive an event named `html5_notification.clicked` when the notification or a notification action button is clicked. The action button clicked is available as `action` in the `event_data`.

{% example %}
automation: |
  alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
{% endexample %}

or

{% example %}
automation: |
  alias: "HTML5 push notification action button clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.clicked
      event_data:
        action: open_door
{% endexample %}

### Closed event

You will receive an event named `html5_notification.closed` when the notification is closed.

{% example %}
automation: |
  alias: "HTML5 push notification clicked"
  triggers:
    - trigger: event
      event_type: html5_notification.closed
{% endexample %}

## Enabling HTML5 Push Notifications behind an NGINX reverse proxy with authentication

If your Home Assistant instance is behind an NGINX reverse proxy with authentication enabled, device events may fail to reach Home Assistant. This happens because the authentication token used by the HTML5 Push Notifications integration may not pass through the proxy correctly.

To allow callback requests from devices, add the following location block to your NGINX configuration:

```bash
location /api/notify.html5/callback {
    if ($http_authorization = "") { return 403; }
    
    allow all;
    proxy_pass http://localhost:8123;
    
    proxy_set_header Host $host;
    proxy_redirect http:// https://;
}
```

This configuration allows requests to the callback endpoint to bypass `htpasswd` authentication, while still requiring the `Authorization` HTTP header to be present.

If callbacks still do not work, explicitly forward the Authorization header to Home Assistant by adding:

```bash
    proxy_set_header Authorization $http_authorization;
    proxy_pass_header Authorization;
```

## Data updates

The **HTML5 Push Notifications** integration sends notifications to target devices through push messaging services, while events from devices are pushed directly to your Home Assistant instance.

## Known limitations

Supported features can vary depending on the browser and platform you are using. Refer to the [MDN Notifications API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#browser_compatibility) for a detailed overview of compatibility across environments.

## Troubleshooting

The **HTML5 Push Notifications** integration relies on an active internet connection for sending notifications and receiving events. If you encounter issues, verify that your network connection is stable and your Home Assistant instance is reachable from the internet.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (_download of debug log file will start automatically_). If you have collected the debug log, provide it with the issue report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
