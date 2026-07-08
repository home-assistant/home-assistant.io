---
title: NETGEAR LTE
description: Instructions on how to integrate your NETGEAR LTE modem within Home Assistant.
ha_release: 0.72
ha_category:
  - Binary sensor
  - Network
  - Notifications
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: netgear_lte
ha_platforms:
  - binary_sensor
  - notify
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

The **NETGEAR LTE** {% term integration %} for Home Assistant allows you to observe and control [NETGEAR LTE modems](https://www.netgear.com/home/mobile-wifi/lte-modems/).

There is currently support for the following device types within Home Assistant:

- Notifications
- Sensors
- Binary sensors

The integration supports sending notifications with SMS, reporting incoming SMS with events and reporting the modem and connection state in several sensors and binary sensors.

{% note %}
Splitting of long SMS messages is not supported so notifications can contain a maximum of 70 characters. Simple messages using the reduced GSM-7 alphabet can contain up to 160 characters. Most emojis are not supported.
{% endnote %}

{% include integrations/config_flow.md %}

## Notification Actions

The integration will create a `notify` actions matching the name of the integration entry. This is the model name of the device by default.

## Events

### Event `netgear_lte_sms`

Messages arriving in the modem inbox are sent as events of type `netgear_lte_sms` with the following content.

| Event data attribute | Description                              |
| -------------------- | ---------------------------------------- |
| `host`               | The modem that received the message.
| `sms_id`             | The inbox ID of the received message.
| `from`               | The sender of the message.
| `message`            | The SMS message content.

{% include integrations/actions.md %}

## Examples

The following automation example processes incoming SMS messages with the [Conversation](/integrations/conversation/) integration and then deletes the message from the inbox.

```yaml
automation:
  - alias: "SMS conversation"
    triggers:
      - trigger: event
        event_type: netgear_lte_sms
    actions:
      - action: conversation.process
        data:
          text: "{{ trigger.event.data.message }}"
      - action: netgear_lte.delete_sms
        data:
          host: "{{ trigger.event.data.host }}"
          sms_id: "{{ trigger.event.data.sms_id }}"
```
