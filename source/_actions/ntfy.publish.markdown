---
title: "Publish notification"
action: ntfy.publish
domain: ntfy
description: "Publish a notification to a ntfy topic. Optionally customize message content and appearance with priority, links, attachments, tags, emojis, and more."
since: "2025.10"
related_actions:
  - notify.send_message
  - ntfy.clear
  - ntfy.delete
---

The **Publish notification** action publishes a notification message to a **ntfy** topic.

With the **Publish notification** action you can take full advantage of the **ntfy** service’s capabilities. You can customize the message content and appearance with priority, links, attachments, tags, emojis, and more.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ntfy: Publish notification**.
6. Under **Targets**, select the topics you want to notify (see [Targets](#targets)).
7. _Optional_: Customize message priority, incorporate emojis, or add interactive elements like URLs, attachments, and action buttons.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Title:
  description: Title for your notification message.
  required: false
Message:
  description: Your notification message. Defaults to the string `triggered` if no value is provided.
  required: false
Format as Markdown:
  description: Enable Markdown formatting for the message body. See the [Markdown guide](https://www.markdownguide.org/basic-syntax/) for syntax details.
  required: false
Tags/Emojis:
  description: Add tags or emojis to the notification. Emojis (using shortcodes like `smile`) will appear in the notification title or message. Other tags will be displayed below the notification content.
  required: false
Message priority:
  description: All messages have a priority that defines how urgently your phone notifies you, depending on the configured vibration patterns, notification sounds, and visibility in the notification drawer or pop-over.
  required: false
Click URL:
  description: URL that is opened when the notification is clicked.
  required: false
Delay delivery:
  description: Set a delay for message delivery. Minimum delay is 10 seconds, maximum is 3 days.
  required: false
Attachment URL:
  description: Attach images or other files by URL.
  required: false
Attach local file:
  description: Attach images or other files by uploading from a local file, camera, or image media source. When selecting a camera entity, a snapshot of the current view will be captured and attached to the notification.
  required: false
Attachment filename:
  description: Specify a custom filename for the attachment, including the file extension (for example, `snapshot.jpg`). If not provided, the filename defaults to _attachment_ (for example, `attachment.jpg`).
  required: false
Forward to email:
  description: Specify the address to forward the notification to, for example `mail@example.com`.
  required: false
Phone call:
  description: Phone number to call and read the message out loud using text-to-speech. Requires ntfy Pro and prior phone number verification.
  required: false
Icon URL:
  description: Include an icon that will appear next to the text of the notification. Only JPEG and PNG images are supported.
  required: false
Action buttons:
  description: Up to three actions (**[Open website/app](#open-a-website-or-app)**, **[Send Android broadcast](#send-android-broadcast)**, **[Send HTTP request](#send-http-request)**, or **[Copy to clipboard](#copy-to-clipboard)**) can be added as buttons below the notification. Actions are executed when the corresponding button is tapped or clicked.
  required: false
Sequence ID:
  description: Enter a message or sequence ID to update an existing notification, or specify a sequence ID to reference later when updating, clearing (mark as read and dismiss), or deleting a notification.
  required: false
{% endoptions_ui %}

{% note %}

All parameters are optional. If **message** is left empty, the notification will use the default text: `triggered`. If **priority** is not specified, the default priority (3) will be used.

{% endnote %}

{% tip %}

Check out the [emoji reference](https://docs.ntfy.sh/emojis/) for a full list of supported emoji shortcodes.

{% endtip %}

#### Action button options

##### Open a website or app

{% options_ui %}
Action type:
  description: Select **Open website/app** to open a website or app when the button is clicked or tapped.
  required: true
Label:
  description: Label of the action button in the notification.
  required: true
URL:
  description: Label of the action button in the notification.
  required: true
Clear:
  description: Clear notification after action button is tapped.
  required: false
{% endoptions_ui %}

##### Send HTTP request

{% options_ui %}
Action type:
  description: Select **Send HTTP reques** to send an HTTP request when the button is clicked or tapped.
  required: true
Label:
  description: Label of the action button in the notification.
  required: true
URL:
  description: URL to which the HTTP request will be sent.
  required: true
HTTP method:
  description: HTTP method to use for request, default is POST.
  required: false
HTTP headers:
  description: Additional HTTP headers as key-value pairs to send with the HTTP request.
  required: false
HTTP body:
  description: The body of the HTTP.
  required: false
Clear:
  description: Clear notification after action button is tapped.
  required: false
{% endoptions_ui %}

##### Send Android broadcast

{% options_ui %}
Action type:
  description: Select **Send Android broadcast** to send an Android broadcast intent when the button is clicked or tapped.
  required: true
Label:
  description: Label of the action button in the notification.
  required: true
Intent:
  description: Android intent to send when the **Send Android broadcast** action is triggered. Defaults to `io.heckel.ntfy.USER_ACTION`.
  required: false
Intent extras:
  description: Extras to include in the intent as key-value pairs.
  required: false
Clear:
  description: Clear notification after action button is tapped.
  required: false
{% endoptions_ui %}

##### Copy to clipboard

{% options_ui %}
Action type:
  description: Select **Copy to clipboard** to copy a given value to the clipboard when the button is clicked or tapped.
  required: true
Label:
  description: Label of the action button in the notification.
  required: true
Value:
  description: Value to copy to the clipboard.
  required: true
Clear:
  description: Clear notification after action button is tapped.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ntfy.publish`. A basic example looks like this:

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
{% endexample %}

This sends a notification to the topic `mytopic` with the message content `triggered`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
title:
  description: >
    Title for your notification message.
  required: false
  type: string
message:
  description: >
    Your notification message. Defaults to the string `triggered` if no value is provided.
  required: false
  type: string
markdown:
  description: >
    Set to true to enable Markdown formatting for the message body.
  required: false
  type: boolean
  default: false
tags:
  description: >
    Add tags or emojis to the notification. A list of strings representing tags or emoji codes.
  required: false
  type: list
priority:
  description: >
    The priority of the notification (1 = minimum, 2 = low, 3 = default, 4 = high, 5 = maximum).
  required: false
  type: integer
click:
  description: >
    URL that is opened when the notification is clicked.
  required: false
  type: string
delay:
  description: >
    Set a delay for message delivery. The minimum delay is 10 seconds, and the maximum delay is 3 days.
  required: false
  type: map
attach:
  description: >
    Attach images or other files by URL.
  required: false
  type: string
attach_file:
  description: >
     Attach images or other files by uploading from a local file or camera media source.
  required: false
  type: map
filename:
  description: >
    Custom filename for the attachment, including the file extension.
  required: false
  type: string
email:
  description: >
    The email address to forward the notification to.
  required: false
  type: string
call:
  description: >
    Phone number to call and read the message out loud using text-to-speech.
  required: false
  type: string
icon:
  description: >
    URL of an icon that will appear next to the text of the notification.
  required: false
  type: string
action:
  description: >
    Up to three actions (**[`view`](#action-view)**, **[`broadcast`](#action-broadcast)**, **[`http`](#action-http)**, or **[`copy`](#action-copy)**) can be added as buttons below the notification. Actions are executed when the corresponding button is tapped or clicked.
  required: false
  type: map
sequence_id:
  description: >
    A message or sequence ID to update an existing notification, or to reference later when updating, clearing, or deleting a notification.
  required: false
  type: string
{% endoptions_yaml %}

#### Action button options in YAML

##### Action `view`

{% options_yaml %}
type:
  description: >
    Enter `view` to open a website or app when the button is clicked or tapped.
  required: true
  type: string
label:
  description: >
    Label of the action button in the notification.
  required: true
  type: string
url:
  description: >
    Label of the action button in the notification.
  required: true
  type: string
clear:
  description: >
    Clear notification after action button is tapped.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

##### Action `http`

{% options_yaml %}
type:
  description: >
    Enter `http` to send an HTTP request when the button is clicked or tapped.
  required: true
  type: string
label:
  description: >
    Label of the action button in the notification.
  required: true
  type: string
url:
  description: >
    URL to which the HTTP request will be sent.
  required: true
  type: string
method:
  description: >
    HTTP method to use for request, default is `POST`.
  required: false
  type: string
headers:
  description: >
    Additional HTTP headers as key-value pairs to send with the HTTP request.
  required: false
  type: map
body:
  description: >
    The body of the HTTP.
  required: false
  type: string
clear:
  description: >
    Clear notification after action button is tapped.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

##### Action `broadcast`

{% options_yaml %}
type:
  description: >
    Enter `broadcast` to send an Android broadcast intent when the button is clicked or tapped.
  required: true
  type: string
label:
  description: >
    Label of the action button in the notification.
  required: true
  type: string
intent:
  description: >
    Android intent to send when the `broadcast` action is triggered. Defaults to `io.heckel.ntfy.USER_ACTION`.
  required: false
  type: string
extras:
  description: >
    Extras to include in the intent as key-value pairs.
  required: false
  type: map
clear:
  description: >
    Clear notification after action button is tapped.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

##### Action `copy`

{% options_yaml %}
type:
  description: >
    Enter `copy` to copy a given value to the clipboard when the button is clicked or tapped.
  required: true
  type: string
label:
  description: >
    Label of the action button in the notification.
  required: true
  type: string
value:
  description: >
    Value to copy to the clipboard.
  required: true
  type: string
clear:
  description: >
    Clear notification after action button is tapped.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: send a notification with a camera snapshot

You can send a notification with a camera snapshot, for example when someone rings the doorbell.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a notification with a camera snapshot" %}

{% example %}
action: |
  action: ntfy.publish
  target:
      entity_id: notify.mytopic
  data:
    title: Someone is at the door
    attach_file:
      media_content_id: media-source://camera/camera.demo_camera
      media_content_type: application/vnd.apple.mpegurl
    filename: camera-snapshot.jpg
    tags:
      - bellhop_bell
{% endexample %}

{% enddetails %}

### Action: send a dead man's switch notification

This action sends a notification that will only be delivered after a specified delay, acting as a so called dead man's switch.

To reset the timer (for example, after a successful daily check-in), you must send the notification again. This cancels the previously scheduled notification and starts a new 24-hour countdown.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a dead man's switch" %}

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
  data:
    title: "Dead Man's Switch Activated"
    message: "I haven't checked in for 24 hours. Please check on me."
    priority: 5
    delay:
      hours: 24
    sequence_id: "dead-mans-switch-check-in"
    tags:
      - warning
      - skull
{% endexample %}

{% enddetails %}

### Action: send a notification to open a URL

This action sends a notification with an action button that, when tapped, opens a specific URL. For example, you can send an alert that includes a direct link to a relevant dashboard or camera feed.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a notification with a button to open an URL" %}

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
  data:
    message: "The garage door has been open for 10 minutes."
    actions:
      - type: view
        label: "View Garage Camera"
        url: "http://homeassistant.local/lovelace/garage"
        clear: true
{% endexample %}

{% enddetails %}

### Action: send a notification to trigger a webhook

This action sends a notification that can trigger a webhook or another automation via an HTTP request. For example, you can create a "Party Mode" button that, when tapped, tells Home Assistant to run a script.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a notification with a button to trigger a webhook" %}

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
  data:
    message: "The party is starting!"
    actions:
      - type: http
        label: "Start Party Mode"
        url: "http://homeassistant.local/api/webhook/party-mode-webhook"
        method: "POST"
{% endexample %}

{% enddetails %}

### Action: send a notification to copy text to the clipboard

This action sends a notification that allows you to copy a value to the clipboard. This is useful for sharing temporary information like guest Wi-Fi passwords or access codes.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a notification with a copy to clipboard button" %}

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
  data:
    title: "Guest Wi-Fi Password"
    message: "Here is the guest Wi-Fi password for today."
    actions:
      - type: copy
        label: "Copy Password"
        value: "GuestPass1234!"
{% endexample %}

{% enddetails %}

### Action: send a notification to start sleep tracking

This action sends a notification that can trigger an Android broadcast intent to start sleep tracking in Sleep as Android.

- **Action**: ntfy: Publish notification
- **Target**: ntfy topic

{% details "YAML example for a notification with a button to trigger an Android broadcast" %}

{% example %}
action: |
  action: ntfy.publish
  target:
    entity_id: notify.mytopic
  data:
    message: "Time for bed?"
    actions:
      - type: broadcast
        label: "Start sleep tracking"
        intent: "com.urbandroid.sleep.START_SLEEP_TRACK"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
