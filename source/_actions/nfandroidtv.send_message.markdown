---
title: "Send a notification message"
action: nfandroidtv.send_message
domain: nfandroidtv
description: "Send a notification to your Android TV or Fire TV with support for images, icons, and dialog appearance customization."
since: "2026.7"
related_actions:
  - notify.send_message
---

The **Send a notification message** action sends a notification to an Android TV or Fire TV with the **Notifications for Android TV / Fire TV** app installed.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Notifications for Android TV / Fire TV: Send a notification message**.
6. Under **Target**, select the notification device to send the message to (see [Targets](#targets)).
7. Add a message for the notification.
8. _Optional_: add a title, image, icon, or other settings.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Title:
  description: Title for your notification.
  required: false
Message:
  description: The notification text.
  required: true
Image:
  description: The image displayed above the notification text.
  required: false
Icon:
  description: The image displayed as the notification icon to the left of the notification text.
  required: false
Position:
  description: The screen location where the notification dialog appears. One of bottom right, bottom left, top right, top left, or center.
  required: false
Duration:
  description: The time the notification remains visible.
  required: false
Interactive:
  description: Interactive mode that enables manual dismissal or expansion for additional details via the remote control.
  required: false
Background color:
  description: The color of the notification dialog background. One of <!-- textlint-disable -->grey<!-- textlint-enable -->, black, indigo, green, red, cyan, teal, amber, or pink.
  required: false
Font size:
  description: The size of the title and message text. One of small, medium, large, or maximum.
  required: false
Transparency:
  description: The opacity of the background. One of 0% (solid), 25%, 50%, 75%, or 100% (invisible).
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nfandroidtv.send_message`. A basic example looks like this:

{% example %}
action: |
  action: nfandroidtv.send_message
  target:
    entity_id: notify.my_tv
  data:
    message: "There is a frog in the garden!"
{% endexample %}

### Options in YAML

{% options_yaml %}
title:
  description: >
    Title for your notification.
  required: false
  type: string
message:
  description: >
    The notification text.
  required: true
  type: string
image:
  description: >
    The image displayed above the notification text.
  required: false
  type: map
icon:
  description: >
    The image displayed as the notification icon to the left of the notification text.
  required: false
  type: map
position:
  description: >
    The screen location where the notification dialog appears. One of `bottom-right`, `bottom-left`, `top-right`, `top-left`, or `center`.
  required: false
  type: string
duration:
  description: >
    The time the notification remains visible.
  required: false
  type: map
interactive:
  description: >
    Interactive mode that enables manual dismissal or expansion for additional details via the remote control.
  required: false
  type: boolean
  default: false
background_color:
  description: >
    The color of the notification dialog background. One of `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber`, or `pink`.
  required: false
  type: string
fontsize:
  description: >
    The size of the title and message text. One of `small`, `medium`, `large`, or `max`.
  required: false
  type: string
transparency:
  description: >
    The opacity of the background. One of `0%` (solid), `25%`, `50%`, `75%`, or `100%` (invisible).
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: send a doorbell notification with a front door camera snapshot

When the doorbell is pressed, send a notification that includes a snapshot from the front door camera.

- **Action**: Notifications for Android TV / Fire TV: Send a notification message
- **Target**: My TV

{% example %}
action: |
  action: nfandroidtv.send_message
  target:
    entity_id: notify.my_tv
  data:
    message: "Someone is at the door"
    image:
      media_content_id: media-source://camera/camera.demo_camera
      media_content_type: application/vnd.apple.mpegurl
{% endexample %}

### Action: send a one-time password to your TV when starting Final Fantasy XIV

When you launch Final Fantasy XIV on your PlayStation console, automatically send a one-time password from an [OTP sensor](/integrations/otp/) to your TV, making it easy to log in without reaching for another device.

- **Trigger**: State
- **Action**: Notifications for Android TV / Fire TV: Send a notification message
- **Target**: My TV

{% example %}
automation: |
  triggers:
    trigger: state
    entity_id: media_player.playstation_5
    attribute: media_title
    to: FINAL FANTASY XIV Online
  actions:
    action: nfandroidtv.send_message
    target:
      entity_id: notify.my_tv
    data:
      title: "Your One-Time Password"
      message: |
        {{ states('sensor.otp_final_fantasy_xiv') }}
      icon:
        media_content_id: media-source://media_source/local/ffxiv_meteor.png
        media_content_type: image/png
      fontsize: medium
      position: bottom-right
      duration:
        seconds: 30
      transparency: 75%
      background_color: amber
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
