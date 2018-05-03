---
layout: page
title: "Facebook Messenger"
description: "Instructions on how to add Facebook user notifications to Home Assistant."
date: 2016-12-31 14:14
sidebar: true
comments: false
sharing: true
footer: true
logo: facebook.png
ha_category: Notifications
ha_release: 0.36
---

The `facebook` notification platform enables sending notifications via Facebook Messenger, powered by [Facebook](https://facebook.com).

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: facebook
    page_access_token: FACEBOOK_PAGE_ACCESS_TOKEN
    allowed_chat_ids:
    - 0034643123212
```

{% configuration %}
page_access_token:
  required: true
  description: Access token for your Facebook page. Checkout [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/guides/setup) for more information.
  type: string
name:
  required: false
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  type: string
allowed_chat_ids:
  required: false
  description: User IDs (page specific) that can trigger Home Assistant events from Facebook messenger
  type: list
{% endconfiguration %}

### {% linkable_title Usage %}

With Facebook notify service, you can send your notifications to your Facebook messenger with help of your Facebook page. You have to create a [Facebook Page and App](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) for this service. You can control it by calling the notify service [as described here](/components/notify/). It will send a message on messenger to user specified by **target** on behalf of your page. See the [quick start](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) guide for more information.
The phone number used in **target** should be registered with Facebook messenger. Phone number of the recipient should be in +1(212)555-2368 format. If your app is not approved by Facebook then the recipient should by either admin, developer or tester for your Facebook app. [More information](https://developers.facebook.com/docs/messenger-platform/send-api-reference#phone_number) about the phone number.

```yaml
# Example automation notification entry
automation:
  - alias: Evening Greeting
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.facebook
      data:
        message: 'Good Evening'
        target:
          - '+919413017584'
          - '+919784516314'
```

If you have your Home Assistant installation exposed to the internet you can also retrieve a page-specific user ID. This user ID can be used as a target for users who do not have their phone number stored on facebook. This user ID is also required if you'd like to trigger events within Home Assistant by sending messages through facebook, or to create actionable notifications with quick reply buttons.

To enable this functionality, enable a webhook for the "messages" event in Facebook's developer console-- the callback URL for this will be https://{your homeassistant base url}/api/facebook_webhooks and the verify token will be your page_access_token.

Once this is enabled, a user can find their page specific user ID by sending a message to your page with the text `get my id`

### {% linkable_title Rich messages %}
You could also send rich messing (cards, buttons, images, videos, etc). [Info](https://developers.facebook.com/docs/messenger-platform/send-api-reference) to which types of messages and how to build them.

```yaml
# Example script with a notification entry with a rich message

script:
  test_fb_notification:
    sequence:
      - service: notify.facebook
        data:
          message: Some text before the quick replies
          target: 0034643123212
          data:
            quick_replies:
              - content_type: text
                title: Red
                payload: FOO
              - content_type: text
                title: Blue
                payload: BAR
```

If a users page specific id is in your allowed_chat_ids list, their messages to your page will trigger a `facebook_message` event. This can be used as the basis for automations. This event will have the following event_data:

- **sender_id**: The page specific user ID of the user who sent the message
- **message**: The text body of the message
- **payload**: In the case of quick replies, the developer defined payload.

An automation that reacts to the quick reply message from above might look like this:

```yaml
# Example automation for clicking the red button

automation:
- alias: 'red message'
  trigger:
    platform: event
    event_type: facebook_message
    event_data:
      payload: FOO
      sender_id: 0034643123212
  action:
  - service: notify.facebook
    data:
      message: 'Received red'
      target:
        - 0034643123212
```

You can now also use Facebook public beta broadcast API to push messages to ALL users who interacted with your chatbot on your page, without having to collect their number. This will scale to thousands of users. Facebook requires that this only be used for non-commercial purposes and they validate every message you send. Also note, your Facebook bot needs to be authorized for "page_subscritions" if you want to make it to all but can be used right away to a selected group of testers of your choice. 

To enable broadcast just use the keyword "BROADCAST" as your target. Only put ONE target BROADCAST as below:

```yaml
- alias: Facebook Broadcast
  trigger:
    platform: sun
    event: sunset
  action:
    service: notify.facebook
    data:
      message: Some text you want to send
      target:
        - BROADCAST
```

