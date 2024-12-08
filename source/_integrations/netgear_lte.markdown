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
ha_integration_type: integration
---

The NETGEAR LTE integration for Home Assistant allows you to observe and control [NETGEAR LTE modems](https://www.netgear.com/home/mobile-wifi/lte-modems/).

There is currently support for the following device types within Home Assistant:

- Notifications
- Sensors
- Binary sensors

The integration supports sending notifications with SMS, reporting incoming SMS with events and reporting the modem and connection state in a number of sensors and binary sensors.

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

## Actions

### Action `netgear_lte.connect_lte`

This action asks the modem to establish its LTE connection, useful if the modem does not autoconnect.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should connect (optional when just one modem is configured).

### Action `netgear_lte.disconnect_lte`

This action asks the modem to close its LTE connection.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should disconnect (optional when just one modem is configured).

### Action `netgear_lte.delete_sms`

The integration makes an action available to delete messages from the modem inbox. This can be used to clean up after incoming SMS events.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should have a message deleted (optional when just one modem is configured).
| `sms_id`               | no       | Integer or list of integers with inbox IDs of messages to delete.

### Action `netgear_lte.set_option`

This action can set modem configuration options (otherwise available in the modem web UI).

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem to set options on (optional when just one modem is configured).
| `autoconnect`          | yes      | Autoconnect value: `never`/`home`/`always`, with `home` meaning "not roaming".
| `failover`             | yes      | Failover mode: `wire` (wired connection only), `mobile` (mobile connection only), `auto` (wired connection with failover to mobile connection).

## Examples

The following automation example processes incoming SMS messages with the [Conversation](/integrations/conversation/) integration and then deletes the message from the inbox.

{% raw %}

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

{% endraw %}
