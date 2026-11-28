---
title: Ablago
description: Instructions on how to integrate Ablago into Home Assistant
ha_release: 2026.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@motom001'
ha_domain: ablago
ha_integration_type: service
related:
  - url: https://github.com/motom001/dms
    title: Ablago
---

The **Ablago** {% term integration %} connects [Ablago](https://github.com/motom001/dms), a self-hosted document archive for households and small businesses, to Home Assistant. It shows how much new mail, how many to-dos and how many overdue items a person has in Ablago, so you can show them on a dashboard or use them in automations.

## Prerequisites

Every person who wants their counters in Home Assistant creates their own API key in Ablago with the level **Counters only** ("nur Zähler"). Such a key can only read the counters: no titles, no senders, no documents.

{% details "Create an API key" %}

1. Log in to Ablago.
2. In the upper-right corner, select your name.
3. Select **My account** > **Security** > **API keys**.
4. Create a key with the level **Counters only** and copy it.

{% enddetails %}

Administrators cannot create keys for other people. Each person decides whether their counters appear in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The address you open Ablago with in the browser, for example `https://ablago.example.org`."
API key:
  description: "The API key with the level **Counters only**."
Verify SSL certificate:
  description: "Verify the SSL certificate of Ablago. Disable this option only for a self-signed certificate in your home network."
{% endconfiguration_basic %}

Add the integration once per person. The key does not tell Home Assistant whom it belongs to, so the new device is named after the address. Rename it after the person, for example **Ablago · Lena**.

## Supported functionality

Each entry creates a service device with the following sensors.


| Sensor          | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **New mail**    | Mail in the state "New" for this person or without a recipient.            |
| **To do**       | Folders listed under "To do".                                               |
| **Overdue**     | Open deadlines, reminders and tasks of this person dated before today.      |
| **Last change** | When one of the counters last changed.                                     |

While Ablago is not reachable, the sensors are unavailable.

## Use cases

- Turn on a lamp in the hallway while **New mail** is above 0.
- Send a notification to your phone when new mail arrives.
- Show the counters of every person on a family dashboard.

## Ablago automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Send a notification when new mail arrives

This automation sends a notification each time the **New mail** count of a person goes up, also when mail was already waiting.

- **Trigger**: Entity state: **New mail** of the person changes
- **Condition**: The new count is higher than the old one
- **Action**: Send a notification

After pasting the example into the automation editor, select the **New mail** sensor of the person in the trigger and your notification entity in the action. Replace `sensor.ablago_lena_new_mail` in the message with the entity ID of that **New mail** sensor.

{% details "YAML example for a notification when new mail arrives" %}

```yaml
alias: New mail in Ablago
triggers:
  - trigger: state
    entity_id: sensor.ablago_lena_new_mail
conditions:
  - condition: template
    value_template: >
      {{ trigger.from_state is not none and trigger.to_state is not none
         and trigger.to_state.state | int(0) > trigger.from_state.state | int(0) }}
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      message: "{{ states('sensor.ablago_lena_new_mail') }} new mail waiting in Ablago."
```

{% enddetails %}

## Data updates

The integration polls the counters from Ablago **every minute**. If the counters have not changed, Ablago answers without sending them again, so frequent polling costs next to nothing.

## Known limitations

- Ablago does not push changes to Home Assistant. New mail shows up within a minute.
- A key with the level **Counters only** cannot read titles, senders or the Ablago version, so the integration shows none of them.
- Without HTTPS in your home network, the API key travels unencrypted. Anyone who intercepts it can read the person's new mail, to-do and overdue counters. Use HTTPS to protect the key and the counters.

## Troubleshooting

{% details "Message: 'Invalid authentication'" %}

The key was mistyped, revoked or has expired. Create a new key with the level **Counters only**. If Ablago rejects the key while the integration is running, its entities become unavailable and the integration stops asking Ablago. To use the new key, remove the entry and add it again with the new key. The same applies if the address of Ablago changes.

{% enddetails %}

{% details "Message: 'The address redirects elsewhere'" %}

Enter the address Ablago ends up at, usually the one starting with `https://`. The integration does not follow redirects, so the key is never sent to another address.

{% enddetails %}

{% details "Message: 'The certificate of Ablago is not trusted'" %}

Fix the certificate of Ablago, or disable **Verify SSL certificate** for a self-signed certificate in your home network.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Afterwards, revoke the API key in Ablago under **My account** > **Security** > **API keys**.
