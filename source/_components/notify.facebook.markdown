---
layout: page
title: "Facebook Messenger"
description: "Instructions how to add Facebook user notifications to Home Assistant."
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
```

Configuration variables:

- **page_access_token** (*Required*): Access token for your facebook page. Checkout [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/guides/setup) for more information.
- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

### {% linkable_title Usage %}

With Facebook notify service, you can send your notifications to your facebook messenger with help of your facebook page. You have to create a [Facebook Page and App](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) for this service. You can control it by calling the notify service [as described here](/components/notify/). It will send a message on messenger to user specified by **target** on behalf of your page. See the [quick start](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) guide for more information.
The phone number used in **target** should be registered with facebook messenger. Phone number of the recipient should be in  +1(212)555-2368 format. If your app is not approved by facebook then the recipient should by either admin, developer or tester for your facebook app. [More...](https://developers.facebook.com/docs/messenger-platform/send-api-reference#phone_number)

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
          - +919413017584
          - +919784516314
```
