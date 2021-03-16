---
title: NETGEAR LTE
description: Instructions on how to integrate your NETGEAR LTE modem within Home Assistant.
ha_release: 0.72
ha_category:
  - Network
  - Notifications
  - Sensor
  - Binary Sensor
ha_iot_class: Local Polling
ha_domain: netgear_lte
ha_platforms:
  - binary_sensor
  - notify
  - sensor
---

The NETGEAR LTE integration for Home Assistant allows you to observe and control [NETGEAR LTE modems](https://www.netgear.com/home/products/mobile-broadband/lte-modems/default.aspx).

There is currently support for the following device types within Home Assistant:

- Notifications
- Sensors
- Binary Sensors

The integration supports sending notifications with SMS, reporting incoming SMS with events and reporting the modem and connection state in a number of sensors and binary sensors.

<div class='note'>

Splitting of long SMS messages is not supported so notifications can contain a maximum of 70 characters. Simple messages using the reduced GSM-7 alphabet can contain up to 160 characters. Most emojis are not supported.

</div>

## Configuration

To enable the integration, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
netgear_lte:
  - host: IP_ADDRESS
    password: SECRET
    notify:
      - name: sms
        recipient: "+15105550123"
    sensor:
      monitored_conditions:
        - usage
        - sms
    binary_sensor:
      monitored_conditions:
        - wire_connected
        - mobile_connected
```

{% configuration %}
host:
  description: The IP address of the modem web interface.
  required: true
  type: string
password:
  description: The password used for the modem web interface.
  required: true
  type: string
notify:
  description: A list of notification services connected to this specific host.
  required: false
  type: list
  keys:
    recipient:
      description: The phone number of a default recipient or a list with multiple recipients.
      required: false
      type: [string, list]
    name:
      description: The name of the notification service.
      required: false
      default: "`netgear_lte`"
      type: string
sensor:
  description: Configuration options for sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: Sensor types to create.
      required: false
      default: usage
      type: list
      keys:
        cell_id:
          description: The Cell ID, a number identifying the base station.
        connection_text:
          description: A connection text, e.g., "4G".
        connection_type:
          description: The connection type, e.g., "IPv4Only".
        current_band:
          description: The radio band used, e.g., "LTE B3".
        current_ps_service_type:
          description: The service type, e.g.,  "LTE".
        radio_quality:
          description: A number with the radio quality in percent, e.g., "55"
        register_network_display:
          description: The name of the service provider.
        rx_level:
          description: The RSRP value, a measurement of the received power level, e.g., "-95".
        sms:
          description: Number of unread SMS messages in the modem inbox.
        sms_total:
          description: Number of SMS messages in the modem inbox.
        tx_level:
          description: Transmit power, e.g., "23".
        upstream:
          description: Current upstream connection, "WAN" or "LTE".
        usage:
          description: Amount of data transferred.
binary_sensor:
  description: Configuration options for binary sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: Binary sensor types to create.
      required: false
      default: mobile_connected
      type: list
      keys:
        mobile_connected:
          description: The LTE connection state.
        wire_connected:
          description: The wired uplink connection state.
        roaming:
          description: The current roaming state.
{% endconfiguration %}

## Events

### Event `netgear_lte_sms`

Messages arriving in the modem inbox are sent as events of type `netgear_lte_sms` with the following content.

| Event data attribute | Description                              |
| -------------------- | ---------------------------------------- |
| `host`               | The modem that received the message.
| `sms_id`             | The inbox ID of the received message.
| `from`               | The sender of the message.
| `message`            | The SMS message content.

## Services

### Service `netgear_lte.connect_lte`

This service asks the modem to establish its LTE connection, useful if the modem does not autoconnect.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should connect (optional when just one modem is configured).

### Service `netgear_lte.disconnect_lte`

This service asks the modem to close its LTE connection.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should disconnect (optional when just one modem is configured).

### Service `netgear_lte.delete_sms`

The integration makes a service available to delete messages from the modem inbox. This can be used to clean up after incoming SMS events.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `host`                 | yes      | The modem that should have a message deleted (optional when just one modem is configured).
| `sms_id`               | no       | Integer or list of integers with inbox IDs of messages to delete.

### Service `netgear_lte.set_option`

This service can set modem configuration options (otherwise available in the modem web UI).

| Service data attribute | Optional | Description |
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
    trigger:
      - platform: event
        event_type: netgear_lte_sms
    action:
      - service: conversation.process
        data:
          text: "{{ trigger.event.data.message }}"
      - service: netgear_lte.delete_sms
        data:
          host: "{{ trigger.event.data.host }}"
          sms_id: "{{ trigger.event.data.sms_id }}"
```

{% endraw %}
