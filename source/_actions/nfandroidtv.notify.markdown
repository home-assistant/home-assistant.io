---
title: "Send notification"
action: nfandroidtv.notify
domain: nfandroidtv
description: "Sends a notification to an Android TV or Fire TV device."
---

Use this action to show a notification overlay on an Android TV or Fire TV device. You can send a basic message, or add images and icons for camera snapshots, reminders, and status updates.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select the notify action for your TV.
6. Enter the **Message** and set any other options.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Message:
  description: The message to show on the TV.
Title:
  description: The notification title.
  required: false
Data:
  description: Additional notification settings, such as duration, position, image, or icon.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action by the notify action created for your TV, such as `notify.living_room_tv`. A basic example looks like this:

{% example %}
action: |
  action: notify.living_room_tv
  data:
    title: "Doorbell"
    message: "Someone is at the front door."
{% endexample %}

### Options in YAML

{% options_yaml %}
message:
  description: The message to show on the TV.
  required: true
  type: string
title:
  description: The notification title.
  required: false
  type: string
data:
  description: Additional notification settings.
  required: false
  type: map
{% endoptions_yaml %}

The following settings can be used inside `data`:

{% configuration %}
duration:
  description: The duration in seconds for which the notification is displayed.
  required: false
  default: 5
  type: integer
fontsize:
  description: "The font size, one of `small`, `medium`, `large`, or `max`."
  required: false
  default: medium
  type: string
position:
  description: "The notification position, one of `bottom-right`, `bottom-left`, `top-right`, `top-left`, or `center`."
  required: false
  default: bottom-right
  type: string
color:
  description: "The notification color, one of `grey`, `black`, `indigo`, `green`, `red`, `cyan`, `teal`, `amber`, or `pink`."
  required: false
  default: grey
  type: string
transparency:
  description: "The notification transparency, one of `0%`, `25%`, `50%`, `75%`, or `100%`."
  required: false
  default: 25%
  type: string
timeout:
  description: The timeout in seconds for trying to send the notification to the device.
  required: false
  default: 5
  type: integer
interrupt:
  description: Set to `true` to make the notification interactive so it can be dismissed or selected to display more details.
  required: false
  default: false
  type: boolean
image:
  description: Image upload settings. It can contain `url` or `path`.
  required: false
  type: map
icon:
  description: Icon upload settings. It can contain `url` or `path`.
  required: false
  type: map
{% endconfiguration %}

For `image` and `icon`, use these nested settings:

{% configuration %}
path:
  description: Local path of an image file.
  required: false
  type: string
url:
  description: URL of an image file.
  required: false
  type: string
username:
  description: Username if the URL requires authentication.
  required: false
  type: string
password:
  description: Password if the URL requires authentication.
  required: false
  type: string
auth:
  description: Set to `digest` to use HTTP Digest authentication. If omitted, basic authentication is used.
  required: false
  type: string
{% endconfiguration %}

## Good to know

- Notifications are shown on top of the current Android TV or Fire TV app.
- Interactive notifications may interrupt playback, depending on the app that is running.
- Local image and icon paths are validated against `allowlist_external_dirs` in {% term "configuration.yaml" %}.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a doorbell notification

Show a notification on the TV when the doorbell detects motion.

- **Trigger**: State, doorbell motion changes to detected
- **Action**: Send notification
  - **Message**: Someone is at the front door.
  - **Data**:
    - **Duration**: 4
    - **Position**: bottom-left

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show doorbell notification on the TV"
  triggers:
    - trigger: state
      entity_id: binary_sensor.doorbell_motion
      to: "on"
  actions:
    - action: notify.living_room_tv
      data:
        message: "Someone is at the front door."
        data:
          duration: 4
          position: "bottom-left"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
