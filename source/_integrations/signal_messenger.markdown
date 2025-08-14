---
title: Signal Messenger
description: Instructions on how to integrate Signal Messenger within Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.104
ha_codeowners:
  - '@bbernhard'
ha_domain: signal_messenger
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `signal_messenger` {% term integration %} uses the [Signal Messenger REST API](https://github.com/bbernhard/signal-cli-rest-api) to deliver notifications from Home Assistant to your Android or iOS device.

## Setup
 
The requirements are:

- You need to set up the Signal Messenger REST API. 
- You need a spare phone number to register with the Signal Messenger service. 


Please follow those [instructions](https://github.com/bbernhard/signal-cli-rest-api/blob/master/doc/HOMEASSISTANT.md), to set up the Signal Messenger REST API. 


## Configuration

To send Signal Messenger notifications with Home Assistant, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry for Signal Messenger 
notify:
  - name: signal
    platform: signal_messenger
    url: "http://127.0.0.1:8080" # the URL where the Signal Messenger REST API is listening 
    number: "YOUR_PHONE_NUMBER" # the sender number
    recipients: # one or more recipients
      - "RECIPIENT1"
```

Both phone numbers and Signal Messenger groups can be added to the `recipients`list. However, it's not possible to mix phone numbers and Signal Messenger groups in a single notifier. If you would like to send messages to individual phone numbers and Signal Messenger groups, separate notifiers need to be created.

To obtain the Signal Messenger group ids, follow [this guide]( https://github.com/bbernhard/signal-cli-rest-api/blob/master/doc/HOMEASSISTANT.md).

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  type: string
  default: notify
url:
  description: The URL where the Signal Messenger REST API listens for incoming requests. 
  required: true
  type: string
number:
  description: The sender number.
  required: true
  type: string
recipients:
  description: A list of recipients (either phone numbers or Signal Messenger group ids).
  required: true
  type: string
{% endconfiguration %}


## Notification action

### Examples

A few examples on how to use this integration to send notifications from automations.

#### Text message

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "That's an example that sends a simple text message to the recipients specified in the configuration.yaml. If text mode is 'styled', you can use *italic*, **bold** or ~strikethrough~ ."
      ## Optional
      data:
        text_mode: styled
```

| Attribute   | Optional | Default |Description                                                                                                                                                                                          |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text_mode` | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

#### Text message with an attachment

This example assumes you have an image stored in the default `www`-folder in Home Assistant Operating System.

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Alarm in the living room!"
      data:
        attachments:
          - "/config/www/surveillance_camera.jpg"
        text_mode: styled
```

| Data attribute   | Optional | Default |Description                                                                                                                                                                                          |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attachments` | **required** | -  | List of paths of files to be attached. |
| `text_mode` | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

#### Text message with an attachment from a URL

```yaml
...
actions:
  - action: notify.NOTIFIER_NAME
    data:
      message: "Person detected on Front Camera!"
      data:
        verify_ssl: false
        urls:
          - "http://homeassistant.local/api/frigate/notifications/<event-id>/thumbnail.jpg"
        text_mode: styled
```

| Data attribute   | Optional | Default |Description                                                                                                                                                                                          |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urls` | **required** | -  | List of URLs of files to be attached. |
| `verify_ssl` | *optional* | true  | Accepted values are `true`, `false`. You can set it to `false` to ignore SSL errors. |
| `text_mode` | *optional* | normal | Accepted values are `normal` or `styled`. If set to `styled`, additional text formatting is enabled (*`*italic*`*, **`**bold**`**, and ~~`~strikethrough~`~~). |

**Notes:**

- To attach files from outside of Home Assistant, the URLs must be reachable and added to the [`allowlist_external_urls`](/integrations/homeassistant/#allowlist_external_urls) list.

- There is a 50MB size limit for attachments retrieved via URLs.

## Sending messages to Signal to trigger events

You can use the Signal Messenger REST API as a Home Assistant trigger. In this example, we will make a simple chatbot. If you write anything to your Signal account linked to Signal Messenger REST API, the automation gets triggered, with the condition that the number (attribute source) is correct, to take action by sending a Signal notification back with a "Message received!".

To accomplish this, make sure the addon's `mode` parameter is set to `native` or `normal`, and edit the configuration of Home Assistant, adding a [RESTful resource](/integrations/rest/) as follows:

```yaml
- resource: "http://127.0.0.1:8080/v1/receive/<number>"
  headers:
    Content-Type: application/json
  sensor:
    - name: "Signal message received"
      value_template: "{{ value_json[0].envelope.dataMessage.message }}" #this will fetch the message
      json_attributes_path: $[0].envelope
      json_attributes:
        - source #using attributes you can get additional information, in this case, the phone number.
  ```

You can create an automation as follows:

```yaml
...
triggers:
  - trigger: state
    entity_id:
      - sensor.signal_message_received
    attribute: source
    to: "<yournumber>"
actions:
  - action: notify.signal
    data:
      message: "Message received!"
```

**NOTE** If the parameter `mode` is set to `json-rpc`, then you can use [signal-api-receiver](https://github.com/kalbasit/signal-api-receiver) to receive from Signal as follows:

```yaml
- resource: "http://127.0.0.1:8105/receive/pop"
  sensor:
    - name: "Signal message received"
      value_template: >
        {{ value_json['envelope']['dataMessage']['message'] }}
      json_attributes_path: envelope
      json_attributes:
        - source
        - sourceNumber
        - sourceUuid
        - sourceDevice
        - timestamp
```
