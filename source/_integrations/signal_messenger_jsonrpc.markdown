---
title: Signal Messenger JSONRPC
description: Instructions on how to integrate Signal Messenger JSONRPC within Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_codeowners:
  - '@morph027'
ha_domain: signal_messenger_jsonrpc
ha_platforms:
  - notify
ha_integration_type: integration
---

The `signal_messenger_jsonrpc` integration uses the native JSON-RPC HTTP endpoint of [signal-cli](https://github.com/AsamK/signal-cli/) to deliver notifications from Home Assistant to your Android, iOS or other Signal client devices.

## Setup
 
The requirements are:

- You need to set up the signal-cli w/ HTTP endpoint. 
- You need a spare phone number to register with the signal-cli service. 

Please follow the signal-cli [instructions](https://github.com/AsamK/signal-cli/#installation) to set up the requirements.


## Configuration

To send Signal Messenger notifications with Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for Signal Messenger JSONRPC
notify:
  - name: signal
    platform: signal_messenger_jsonrpc
    endpoint: "http://127.0.0.1:3000/api/v1/rpc" # the URL where the signal-cli JSON-RPC API is listening 
    user: username # optional basic auth username
    password: password # optional basic auth password
    account: "YOUR_SIGNAL_CLI_ACCOUNT" # the sender account
    recipients: # one or more recipients
      - "RECIPIENT1"
```

Both phone numbers and Signal Messenger groups can be added to the `recipients` list. However, it's not possible to mix phone numbers and Signal Messenger groups in a single notifier. If you would like to send messages to individual phone numbers and Signal Messenger groups, separate notifiers need to be created.

You can obtain Signal Messenger group ids using this api call:

```bash
curl -s -H "Content-Type: application/json" -d '{"jsonrpc":"2.0", "method": "listGroups", "id": "42", "params": {"account": "YOUR_SIGNAL_CLI_ACCOUNT"}}' http://127.0.0.1:3000/api/v1/rpc # the URL where the signal-cli JSON-RPC API is listening
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
  default: notify
endpoint:
  description: the URL where the signal-cli JSON-RPC API is listening.
  required: true
  type: string
username:
  description: Optional basic auth username.
  required: false
  type: string
password:
  description: Optional basic auth password.
  required: false
  type: string
account:
  description: The sender account.
  required: true
  type: string
recipients:
  description: A list of recipients (either phone numbers or Signal Messenger group ids).
  required: true
  type: string
{% endconfiguration %}

## Examples

A few examples on how to use this integration as actions in automations.

### Text message

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    message: "That's an example that sends a simple text message to the recipients specified in the configuration.yaml"
```

### Text message with an attachment

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    message: "Alarm in the living room!"
    data:
      attachments:
        - "/tmp/surveillance_camera.jpg"
```

### Text message with an attachment from a URL

To attach files from outside of Home Assistant, the URLs must be added to the [`allowlist_external_urls`](/docs/configuration/basic/#allowlist_external_urls) list.

Note there is a 50MB size limit for attachments retrieved via URLs. You can also set `verify_ssl` to `false` to ignore SSL errors (default `true`).

```yaml
...
action:
  service: notify.NOTIFIER_NAME
  data:
    message: "Person detected on Front Camera!"
    data:
      verify_ssl: false
      urls:
        - "http://homeassistant.local/api/frigate/notifications/<event-id>/thumbnail.jpg"
```
