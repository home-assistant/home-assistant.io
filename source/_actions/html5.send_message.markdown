---
title: "Send message"
action: html5.send_message
domain: html5
description: "Send a notification message via web push. Optionally customize the notification with images, action buttons, and other settings."
since: "2026.5"
related_actions:
  - notify.send_message
  - html5.dismiss_message
---

The **Send message** action sends a notification to a browser or installed web app (PWA) registered with HTML5 Push Notifications.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HTML5 Push Notifications: Send message**.
6. Under **Target**, select the notification device to send the message to (see [Targets](#targets)).
7. Add a title for the message.
8. _Optional_: add a message, icon, action buttons, or other settings.
9. Select **Save**.

{% note %}

Keep in mind that support for the features described below can vary depending on the browser and platform you are using. Refer to the [MDN Notifications API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#browser_compatibility) for a detailed overview of compatibility across environments.

{% endnote %}

### Options in the UI

{% options_ui %}
Title:
  description: Title for your notification.
  required: true
Message:
  description: The message body of the notification.
  required: false
Icon:
  description: URL or relative path of an image to display as the main notification icon. Maximum size is 320px by 320px.
  required: false
Badge:
  description: URL or relative path of a small image to replace the browser icon on mobile platforms. Maximum size is 96px by 96px.
  required: false
Image:
  description: URL or relative path of a larger image to display in the main body of the notification. Experimental support; may not be displayed on all platforms.
  required: false
Tag:
  description:  The identifier of the notification. Sending a new notification with the same tag replaces the existing one. If not specified, a unique tag is generated for each notification.
  required: false
Actions:
  description: Adds action buttons to the notification. When the user clicks a button, an event is sent back to Home Assistant. The number of actions supported may vary between platforms. ([See action button options](#action-button-options)).
  required: false
Text direction:
  description: The direction of the notification's text. Adopts the browser's language setting behavior by default.
  required: false
Renotify:
  description: If enabled, the user is alerted again (sound/vibration) when a notification with the same tag replaces a previous one.
  required: false
Silent:
  description: If enabled, the notification does not play sounds or trigger vibration, regardless of the device's settings.
  required: false
Require interaction:
  description: If enabled, the notification remains active until the user clicks or dismisses it, rather than automatically closing after a few seconds. This provides the same behavior on desktop as on mobile platforms.
  required: false
Vibration pattern:
  description: A vibration pattern to run with the notification. An array of integers representing alternating periods of vibration and silence in milliseconds. For example, `[200, 100, 200]` vibrates for 200ms, pauses for 100ms, then vibrates for another 200ms.
  required: false
Language:
  description: The language of the notification's content.
  required: false
Timestamp:
  description: The timestamp of the notification. By default, uses the time when the notification is sent.
  required: false
Time to live:
  description: Specifies how long the push service retains the message if the user's browser or device is offline. After this period, the notification expires. A value of `0` means the notification is discarded immediately if the target is not connected. Defaults to 1 day.
  required: false
Urgency:
  description: Whether the push service tries to deliver the notification immediately or defers it in accordance with the user's power-saving preferences.
  required: false
Extra data:
  description: Additional custom key-value pairs to include in the payload of the push message. This can be used to include extra information that can be accessed in the notification click event.
  required: false
{% endoptions_ui %}

#### Action button options

Action buttons are configured in the **Actions** field. Each item supports:

{% options_ui %}
Action identifier:
  description: The identifier of the action. This is sent back to Home Assistant when the user clicks the button.
  required: true
Title:
  description:  The label of the button displayed to the user.
  required: true
Icon:
  description: URL or relative path of an image displayed as the icon for this button. Maximum size is 128px by 128px.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `html5.send_message`. A basic example looks like this:

{% example %}
action: |
  action: html5.send_message
  data:
    title: "Reminder"
    message: "Have you considered frogs?"
    icon: /static/icons/favicon-192x192.png
    badge: /static/images/notification-badge.png
    tag: message-group-1
    actions:
      - action: test-action
        title: 🆗 Click here!
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
  target:
    entity_id: notify.my_desktop
{% endexample %}

{% note %}

When using a relative path for an image or icon URL, the path is resolved relative to the base URL of your Home Assistant instance.

{% endnote %}

### Options in YAML

{% options_yaml %}
title:
  description: >
    Title for your notification message.
  required: true
  type: string
message:
  description: >
    The message body of the notification.
  required: false
  type: string
icon:
  description: >
    URL or relative path of an image to display as the main icon in the notification. Maximum size is 320px by 320px.
  required: false
  type: string
badge:
  description: >
    URL or relative path of a small image to replace the browser icon on mobile platforms. Maximum size is 96px by 96px.
  required: false
  type: string
image:
  description: >
    URL or relative path of a larger image to display in the main body of the notification. Experimental support; may not be displayed on all platforms.
  required: false
  type: string
tag:
  description: >
    The identifier of the notification. Sending a new notification with the same tag replaces the existing one. If not specified, a unique tag is generated for each notification.
  required: false
  type: string
actions:
  description: >
    Adds action buttons to the notification. When the user clicks a button, an event is sent back to Home Assistant. The number of actions supported may vary between platforms. ([See action button options](#action-button-options-in-yaml)).
  required: false
  type: list
dir:
  description: >
    The direction of the notification's text. Adopts the browser's language setting behavior by default.
  required: false
  type: string
renotify:
  description: >
    If enabled, the user is alerted again (sound/vibration) when a notification with the same tag replaces a previous one.
  required: false
  type: boolean
  default: false
silent:
  description: >
    If enabled, the notification does not play sounds or trigger vibration, regardless of the device's settings.
  required: false
  type: boolean
  default: false
require_interaction:
  description: >
    If enabled, the notification remains active until the user clicks or dismisses it, rather than automatically closing after a few seconds. This provides the same behavior on desktop as on mobile platforms.
  required: false
  type: boolean
  default: false
vibrate:
  description: >
    A vibration pattern to run with the notification. An array of integers representing alternating periods of vibration and silence in milliseconds. For example, `[200, 100, 200]` vibrates for 200ms, pauses for 100ms, then vibrates for another 200ms.
  required: false
  type: list
lang:
  description: >
    The language of the notification's content.
  required: false
  type: string
timestamp:
  description: >
    The timestamp of the notification. By default, uses the time when the notification is sent.
  required: false
  type: string
ttl:
  description: >
    Specifies how long the push service retains the message if the user's browser or device is offline. After this period, the notification expires. A value of `0` means the notification is discarded immediately if the target is not connected. Defaults to 1 day.
  required: false
  type: map
urgency:
  description: >
    Whether the push service tries to deliver the notification immediately or defers it in accordance with the user's power-saving preferences.
  required: false
  type: string
data:
  description: >
    Additional custom key-value pairs to include in the payload of the push message. This can be used to include extra information that can be accessed in the notification click event.
  required: false
  type: map
{% endoptions_yaml %}

#### Action button options in YAML

Action buttons are configured in the `actions` field. Each item supports:

{% options_yaml %}
action:
  description: >
    The identifier of the action. This is sent back to Home Assistant when the user clicks the button.
  required: true
  type: string
title:
  description: >
    The label shown on the button.
  required: true
  type: string
icon:
  description: >
    Optional URL or relative path to an image for the button. Maximum size is 128px by 128px.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: send a doorbell-rang notification with an open-door action button

If the doorbell rings, receive an actionable notification with a camera snapshot. Opens the door when you tap the "Open door" action button.

- **Trigger**: Doorbell rang (`event.doorbell`)
- **Action**: Send message
- **Target**: My desktop (`notify.my_desktop`)

{% example %}
automation: |
  alias: "Send doorbell-ran notification to my desktop"
  triggers:
    trigger: doorbell.rang
    target:
      entity_id: event.doorbell
  actions:
    action: html5.send_message
    target:
      entity_id: notify.my_desktop
    data:
      title: 🔔 The doorbell rang.
      message: Someone is at the entrance door.
      icon: https://homeassistant.example.com/www/entrancecamera_snapshot.jpg
      actions:
        - action: open-door
          title: Open door
      require_interaction: true
      ttl:
        minutes: 5
      urgency: high
{% endexample %}

- **Trigger**: Event
- **Condition**: Template
- **Action**: Open lock
- **Target**: Entrance door

{% example %}
automation: |
  alias: "Open entrance door when open-door action button is tapped"
  triggers:
    trigger: event.received
    target:
      entity_id: event.pc
    options:
      event_type:
        - clicked
  conditions:
    - condition: template
      value_template: "{{ trigger.to_state.attributes.action == \"open-door\"}}"
  actions:
    - action: lock.open
      target:
        entity_id: lock.entrance_door
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
