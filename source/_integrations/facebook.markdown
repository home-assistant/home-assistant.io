---
title: Facebook Messenger
description: Instructions on how to add Facebook user notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.36
ha_domain: facebook
ha_iot_class: Cloud Push
ha_platforms:
  - notify
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

{% configuration %}
page_access_token:
  description: "Access token for your Facebook page. Checkout [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform/guides/setup) for more information."
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

With Facebook notify service, you can send your notifications to your Facebook messenger with help of your Facebook page. You have to create a [Facebook Page and App](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) for this service. You can control it by calling the notify service [as described here](/integrations/notify/). It will send a message on messenger to user specified by **target** on behalf of your page. See the [quick start](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) guide for more information.
The phone number used in **target** should be registered with Facebook messenger. Phone number of the recipient should be in +1(212)555-2368 format. If your app is not approved by Facebook then the recipient should by either admin, developer or tester for your Facebook app. [More information](https://developers.facebook.com/docs/messenger-platform/send-api-reference#phone_number) about the phone number.

```yaml
# Example automation notification entry
automation:
  - alias: "Evening Greeting"
    trigger:
      platform: sun
      event: sunset
    action:
      service: notify.facebook
      data:
        message: "Good Evening"
        target:
          - '+919413017584'
          - '+919784516314'
```

You can also send messages to users that do not have stored their phone number on Facebook, but this requires a bit more work. The Messenger platform uses page-specific user IDs instead of a global user ID. You will need to enable a webhook for the "messages" event in Facebook's developer console. Once a user writes a message to a page, that webhook will then receive the user's page specific ID as part of the webhook's payload. Below is a simple PHP script that reacts to the message "get my id" and sends a reply containing the user's ID: 

```php
<?php

$access_token = "";
$verify_token = "";

if (isset($_REQUEST['hub_challenge'])) {
    $challenge        = $_REQUEST['hub_challenge'];
    $hub_verify_token = $_REQUEST['hub_verify_token'];

    if ($hub_verify_token === $verify_token) {
        echo $challenge;
    }
}

$input   = json_decode(file_get_contents('php://input'), true);
$sender  = $input['entry'][0]['messaging'][0]['sender']['id'];
$message = $input['entry'][0]['messaging'][0]['message']['text'];

if (preg_match('/get my id/', strtolower($message))) {
    $url      = 'https://graph.facebook.com/v2.10/me/messages?access_token=' . $access_token;
    $ch       = curl_init($url);
    $jsonData = '{
        "recipient":{
            "id":"' . $sender . '"
        },
        "message":{
            "text":"Your ID: ' . $sender . '"
        }
      }';

    $jsonDataEncoded = $jsonData;
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    if (!empty($input['entry'][0]['messaging'][0]['message'])) {
        $result = curl_exec($ch);
    }
}

```

### Rich messages
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
                payload: DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED
              - content_type: text
                title: Blue
                payload: DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE
```
