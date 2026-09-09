---
title: "Send message"
action: smtp.send_message
domain: smtp
description: "Send an email notification. Optionally use HTML formatting and include inline images or attach images and other files."
since: "2026.8"
related_actions:
  - notify.send_message
---

The **Send message** action sends an email notification. You can use plain text or HTML content, embed images inline in the HTML body, and attach images or other files.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SMTP: Send message**.
6. Under **Target**, select the notification device to send the message to (see [Targets](#targets)).
7. In **Message**, enter a message for the notification.
8. _Optional_: enter the message subject in **Title**, add HTML content in **HTML message**, or attach files in **Attachments**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Title:
  description: Subject for your email notification.
  required: false
Message:
  description: The plain text message body of the email notification.
  required: true
HTML message:
  description: The HTML body of the email notification. Use HTML to create rich email content with formatting, images, links, tables, and custom styling.
  required: false
Attachments:
  description: Attach images or other files from camera, image, TTS, or local media source. When selecting a camera entity, a snapshot of the current view will be captured and attached to the email.
  required: false
Priority:
  description: Priority of the email notification. Possible values are **lowest**, **low**, **normal**, **high**, and **highest**. Support for this setting varies between email clients.
  required: false
{% endoptions_ui %}

#### Attachment options

Attachments are configured in the **Attachments** field. Each item supports:

{% options_ui %}
Media source:
  description: Select a camera, image, TTS, or local media source to attach to the email. If a camera source is selected, a snapshot of its current view is captured when the email is sent.
  required: true
Filename:
  description: Specify the filename for the attachment. This is required for camera, image, and TTS media sources, and optional for local media sources.
  required: false
Content-ID:
  description: A unique identifier used to embed this image directly inside an HTML email body.
  required: false
{% endoptions_ui %}

<br>

{% tip %}

To embed an attachment in the HTML body, assign it a **Content-ID** and reference it using the `cid:` URL scheme. For example, to embed an image:

```html
<img src="cid:bird_feeder_snapshot">
```

The value after `cid:` must match the attachment's **Content-ID**.

{% endtip %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smtp.send_message`. A basic example looks like this:

{% example %}

action: |
  action: smtp.send_message
  target:
    entity_id: notify.recipient
  data:
    title: "Reminder"
    message: "Have you considered frogs?"

{% endexample %}

### Options in YAML

{% options_yaml %}
title:
  description: >
    Subject for your email notification.
  required: false
  type: string
message:
  description: >
    The plain text message body of the email notification.
  required: true
  type: string
html:
  description: >
    The HTML body of the email notification. Use HTML to create rich email content with formatting, images, links, tables, and custom styling.
  required: false
  type: string
attachments:
  description: >
    Attach images or other files from camera, image, TTS, or local media source. When selecting a camera entity, a snapshot of the current view will be captured and attached to the email.
  required: false
  type: list
priority:
  description: >
    Priority of the email notification. Possible values are `lowest`, `low`, `normal`, `high` and `highest`. Support for this setting varies between email clients.
  required: false
  type: string
{% endoptions_yaml %}

#### Attachment options in YAML

Attachments are configured in the `attachments` field. Each item supports:

{% options_yaml %}
media_source:
  description: >
    Select a camera, image, TTS, or local media source to attach to the email. If a camera source is selected, a snapshot of its current view is captured when the email is sent.
  required: true
  type: map
filename:
  description: >
    Specify the filename for the attachment. This is required for camera, image, and TTS media sources, and optional for local media sources.
  required: false
  type: string
content_id:
  description: >
    A unique identifier used to embed this image directly inside an HTML email body.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a bird feeder activity notification with an embedded camera snapshot

When motion is detected at the bird feeder, send an email notification with the latest camera snapshot embedded in the HTML message.

- **Trigger**: Motion detected (`motion.detected`)
- **Action**: SMTP: Send message (`smtp.send_message`)
  - **Target**: Recipient (`notify.recipient`)

{% example %}
automation: |
  alias: "Email bird feeder motion snapshot"
  triggers:
    - trigger: motion.detected
      target:
        entity_id: binary_sensor.bird_feeder
  actions:
    - action: smtp.send_message
      target:
        entity_id: notify.recipient
      data:
        title: "🐦️ Bird feeder activity detected"
        message: "Motion was detected at the bird feeder."
        html: |
            <html>
              <body>
                <h2>🐦️ Bird feeder activity detected</h2>
                <p>Motion was detected at the bird feeder. See the captured snapshot below.</p>
                <img src="cid:bird_feeder_snapshot" alt="Bird feeder snapshot">
              </body>
            </html>
        attachments:
            - media_source:
                media_content_id: media-source://camera/camera.bird_feeder
                media_content_type: image/jpeg
              filename: bird_feeder_snapshot.jpg
              content_id: bird_feeder_snapshot
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
