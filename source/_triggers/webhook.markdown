---
title: "Webhook"
trigger: webhook
domain: homeassistant
description: "Triggers when Home Assistant receives a web request to a webhook address."
related_triggers:
  - event
  - template
---

The **Webhook** trigger is useful when another app or service needs to start an automation in Home Assistant. Each webhook has its own secret address. When an app or service sends a web request to that address, the trigger reacts. For example, a build server can let you know that a build failed, or a phone shortcut can start a scene.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select the **Webhook** trigger.
   - Result: Home Assistant fills in a **Webhook ID** that's hard to guess.
5. To copy the address of the webhook, select **Copy URL to clipboard** {% icon "mdi:content-copy" %}.
   - Use this address in the app or service that should start the automation.
6. Optional: To change which requests the webhook accepts, select **Webhook settings** {% icon "mdi:cog" %}.
   - Select the request methods to allow: **GET**, **HEAD**, **POST**, or **PUT**.
   - To accept requests from outside your local network, turn off **Only accessible from the local network**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Webhook ID:
  description: The ID of the webhook. The address of the webhook is `/api/webhook/` followed by this ID. Treat the ID like a password, and keep it secret.
  required: true
Webhook settings:
  description: |
    - The request methods that the webhook accepts: **GET**, **HEAD**, **POST**, and **PUT**. Default is **POST** and **PUT**.
    - **Only accessible from the local network**: When turned on, the webhook only accepts requests from your local network. Default is on.
  required: false
{% endoptions_ui %}

## Using a webhook with Home Assistant Cloud

With [Home Assistant Cloud](/cloud/), a webhook gets a public address. Apps and services can then reach it from anywhere, without opening your Home Assistant to the internet.

1. In the automation, select **Webhook settings** {% icon "mdi:cog" %} on the trigger, and turn off **Only accessible from the local network**. Then, select **Save**.
   - Requests through Home Assistant Cloud don't count as local, so the webhook must accept requests from outside your local network. Webhooks that only accept local requests don't appear in the list of Home Assistant Cloud webhooks.
2. Go to {% my cloud title="**Settings** > **Home Assistant Cloud**" %}, and select **Webhooks**.
3. Next to your automation, turn on the switch.
   - Result: A dialog shows the **Public address** of the webhook.
4. Use the public address in the app or service. To see the address again later, select **Manage** next to the automation.

## Sending a request to a webhook

To start the automation, send a web request to the address of the webhook, for example, with the **curl** command line program. In the examples, replace the address with the one you copied with **Copy URL to clipboard**. This example sends form data with a POST request:

```shell
curl -X POST -d 'key=value&key2=value2' \
  http://YOUR_HOME_ASSISTANT_ADDRESS/api/webhook/YOUR_WEBHOOK_ID
```

To send JSON data, set the `Content-Type` header to `application/json`:

```shell
curl -X POST -H "Content-Type: application/json" -d '{ "key": "value" }' \
  http://YOUR_HOME_ASSISTANT_ADDRESS/api/webhook/YOUR_WEBHOOK_ID
```

Use an HTTPS address if you've secured your Home Assistant with SSL/TLS.

The automation can use the data of the request in templates. Form data is in `trigger.data`, JSON data is in `trigger.json`, and URL query parameters are in `trigger.query`. For all properties, refer to [Webhook triggers](/docs/automation/trigger-data/#webhook-triggers).

{% include triggers/yaml_header.md %}

In YAML, use `trigger: webhook`. A basic example looks like this:

{% example %}
trigger: |
  trigger: webhook
  webhook_id: "YOUR_WEBHOOK_ID"
{% endexample %}

This runs when Home Assistant receives a request to `/api/webhook/YOUR_WEBHOOK_ID`. By default, the webhook only accepts POST and PUT requests from your local network. To change this, use `allowed_methods` and `local_only`.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `webhook`.
  required: true
  type: string
webhook_id:
  description: The ID of the webhook. The address of the webhook is `/api/webhook/` followed by this ID. You can also use a [template](/docs/templating/).
  required: true
  type: [string, template]
allowed_methods:
  description: The request methods that the webhook accepts. You can use `GET`, `HEAD`, `POST`, and `PUT`.
  required: false
  type: list
  default: "[POST, PUT]"
local_only:
  description: Set to `true` to only accept requests from your local network. Set to `false` to also accept requests from the internet, including through Home Assistant Cloud.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

This example uses a template for the webhook ID, based on a trigger variable:

{% example %}
automation: |
  trigger_variables:
    webhook_id_variable: "template_webhook_id"
  triggers:
    - trigger: webhook
      webhook_id: "{{ webhook_id_variable }}"
      allowed_methods:
        - POST
{% endexample %}

## Webhook security

A webhook doesn't need a password or a token. Anyone who knows the webhook ID can send a request to it. To keep your webhooks secure:

- Don't use webhooks for automations that are destructive, or that can create safety issues. For example, don't use a webhook to unlock a lock or open a garage door.
- Treat a webhook ID like a password: use a unique value that's hard to guess, and keep it secret.
- Don't copy webhook IDs from public sources, including blueprints. Always create your own.
- Keep **Only accessible from the local network** (`local_only`) turned on if you don't need access from the internet.

## Good to know

- Home Assistant renders the `webhook_id` template once, when it sets up the trigger: when the automation loads, is reloaded, or is turned on. It doesn't render the template again when a webhook call comes in, or when a state the template uses changes. In a **Wait for a trigger** step, Home Assistant renders the template each time the wait starts, and the template can use the variables of the run.
- Several triggers can use the same webhook ID, also in different automations. They all react to each request. Give them the same webhook settings, because Home Assistant uses the settings of the trigger that it sets up first.
- Requests through Home Assistant Cloud don't count as local. This includes the Home Assistant Cloud webhook addresses and the remote access address of Home Assistant Cloud.
- Home Assistant almost always answers a webhook request with `200 OK`, so that nobody can find out whether a webhook ID exists. It also answers `200 OK` when the webhook ID doesn't exist, or when a request from outside your local network reaches a webhook that only accepts local requests. Only a request method that isn't allowed gets `405 Method Not Allowed`. If a webhook doesn't react, check the logs at {% my logs title="**Settings** > **System** > **Logs**" %}.
- A **HEAD** request always gets `200 OK`, so that apps and services can check that the address exists. If **HEAD** isn't one of the allowed methods, the trigger doesn't react to it.

{% include triggers/try_it.md %}

For this trigger, send a request to the address of the webhook, as described in [Sending a request to a webhook](#sending-a-request-to-a-webhook).

{% include triggers/more_examples.md %}

### Automation: send a notification when a build fails

When your build server reports a failed build, send a notification to your phone. Set up the build server to send a POST request to the address of the webhook when a build fails.

- **Trigger**: Webhook
  - **Webhook ID**: The ID that Home Assistant generated
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The build failed.

{% details "YAML example for sending a notification when a build fails" %}

{% example %}
automation: |
  alias: "Notify when a build fails"
  triggers:
    - trigger: webhook
      webhook_id: "YOUR_WEBHOOK_ID"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The build failed."
{% endexample %}

{% enddetails %}

### Automation: forward a message from the request

When the backup software on your NAS finishes a job, it can send a JSON request with a message, such as `{ "message": "Backup finished" }`. This automation sends that message to your phone. Set up the backup software to send a POST request with a JSON body to the address of the webhook.

- **Trigger**: Webhook
  - **Webhook ID**: The ID that Home Assistant generated
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The message from the request ({% raw %}`{{ trigger.json.message }}`{% endraw %})

{% details "YAML example for forwarding a message from the request" %}

{% example %}
automation: |
  alias: "Forward messages from the NAS"
  triggers:
    - trigger: webhook
      webhook_id: "YOUR_WEBHOOK_ID"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "{{ trigger.json.message }}"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
