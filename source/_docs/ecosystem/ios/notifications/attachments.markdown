---
title: "Notification attachments"
description: "Adding attachments to iOS push notifications"
redirect_from: /ecosystem/ios/notifications/attachments/
---

iOS 10 adds _attachments_ to notifications. An attachment is an image, video, or audio file which is downloaded to the device when a notification is received and shown alongside the notification. A thumbnail is shown when the notification is not expanded. The full size attachment is shown when the notification is expanded.

<div class="note">
To expand a notification on 3D Touch devices simply force touch any notification. On non-3D Touch devices swipe and tap the "View" button.
</div>

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!"
        data:
          attachment:
            url: "https://github.com/home-assistant/home-assistant-assets/blob/master/logo-round-192x192.png?raw=true"
            content-type: png
            hide-thumbnail: false
```

Notes:
* The thumbnail of the notification will be the media at the `url`.
* The notification content is the media at the `url`.
* Attachment can be used with custom push notification categories.

## Example

<p class='img'>
  <img src='/images/ios/attachment.png' />
  An unexpanded push notification with an attachment.
</p>

<p class='img'>
  <img src='/images/ios/expanded_attachment.png' />
  The same notification but expanded to show the full size attachment
</p>

## Supported media types

If the attachment does not appear please ensure it is in one of the following formats:

### Audio attachments

Maximum file size: 5 MB

Allowed Formats: AIFF, WAV, MP3, MPEG4 Audio

### Image attachments

Maximum file size: 10 MB

Allowed Formats: JPEG, GIF, PNG

### Video attachments

Maximum file size: 50 MB

Allowed Formats: MPEG, MPEG2, MPEG4, AVI

## Configuration

- **url** (*Required*): The URL of content to use as the attachment. This URL _must_ be accessible from the Internet, or the receiving device must be on the same network as the hosted content.
- **content-type** (*Optional*): By default, the extension of the URL will be checked to determine the filetype. If there is no extension/it can't be determined you can manually provide a file extension.
- **hide-thumbnail** (*Optional*): If set to `true` the thumbnail will not show on the notification. The content will only be viewable by expanding.
