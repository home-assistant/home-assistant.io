---
title: SIA Alarm Systems
description: Instructions on how to integrate SIA Based Alarm systems.
ha_category:
  - Alarm
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: sia
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
---

The SIA Alarm Systems integration provides integration with several alarm systems that implement the SIA Protocol, including [Ajax Systems](https://ajax.systems/). This protocol is listen-only, so does not allow you to turn on/off your alarm system, it just updates the state to reflect your alarm and allows you to act on that state, for instance turning on all lights and opening the curtains when the alarm triggers. The underlying package has support for different variants of SIA, including DC-09, DC-04 and a limited set of ADM-CID. If your alarm system uses the ADM-CID standard and it isn't working, please log an issue [here](https://github.com/eavanvalkenburg/pysiaalarm/issues/new).

To use this platform, you need to setup your alarm system to communicate using the SIA Protocol and setup several things on the alarm. This integration basically works by Home Assistant listening on a port for messages from the alarm systems and handling and responding to that message and finally updating one or more entities in Home Assistant.

## Alarm Setup (Ajax Systems Hub example)

1. In the settings of your hub, go to the monitoring stations page.
2. Select "SIA Protocol".
3. Enable "Connect on demand".
4. Place Account Id - 3-16 ASCII hex characters. For example AAA.
5. Insert Home Assistant IP address. The hub must be able to reach this IP address. There is no cloud connection necessary.
6. Insert Home Assistant listening port. This port must not be used by anything else on the machine Home Assistant is running on, see the notes on [port usage](#port-usage) below.
7. Select Preferred Network. Ethernet is preferred if hub and HA in same network. Multiple networks are not tested.
8. Enable Periodic Reports. The interval with which the alarm systems reports to the monitoring station, default is 1 minute. This component adds 30 seconds before setting the alarm unavailable to deal with slights latencies between ajax and HA and the async nature of HA.
9. Encryption is preferred but optional. Password is 16, 24 or 32 ASCII characters.

{% include integrations/config_flow.md %}

{% configuration_basic %}
port:
  description: Port that your alarm will communicate with, must be set in the alarm system as explained above.
account:
  description: Hub account to communicate with. 3-16 ASCII hex characters. Must be set in the alarm system as explained above.
encryption_key:
  description: Encoding key. 16, 24 or 32 ASCII characters. Must be same, as in hub properties.
ping_interval:
  description: Ping interval in minutes that the alarm system uses to send "Automatic communication test report" messages, the component adds 30 seconds before marking all entities for that account (alarm and binary sensors) unavailable. Must be between 1 and 1440 minutes.
zones:
  description: The number of zones configured in your alarm.
additional_account:
  description: Used to ask if an additional account needs to be included, if so will open a dialog for the next account, after checking the current input.
{% endconfiguration_basic %}

ASCII characters are 0-9 and ABCDEF, so an account is something like `346EB` and the encryption key has the same characters but needs to be 16, 24 or 32 characters in length.

### Note on monitoring multiple alarm systems

If you have multiple accounts (alarm systems) that you want to monitor you can choose to have all communicating with the same port, in that case, use the additional accounts checkbox in the dialog to setup the next account and keep doing that until you have them all. You can also choose to have both running on a different port, in that case setup the component twice with the different ports.

### Port usage

The port used with this component must be a port no other processes use on the machine your HA instance is running. If you have a complex network setup or want to monitor alarm systems at other locations you will most likely have to open firewalls and/or create network routes for that purpose, the integration will just listen for messages coming into that port, and will not proactively send, only responding with an acknowledgement to the alarm system.

### Entities

In the initial version, after setup you will see one alarm_control_panel per account and zone combination. This entity will have 5 attributes that reflect all messages that came in for that account and zone, it includes fields for `last_code`, `last_zone`, `last_message`, `last_id`, `last_timestamp`. The alarm_control_panel state itself is changed based on a subset of values, including but not limited to codes: `CA`, `CB`, `CG`, `BA`, `TA`, `OA`, `NC`, `NL`, for the full list check the code on GitHub. If you expected the state to change then please log which code it was and create an issue on GitHub as well.

### Events

Each event that comes into your systems through SIA is also forwarded to the internal HA event bus, which can then be used to trigger automations directly on the codes that came in there. The events are created with event_type set to `sia_event_<port>_<account>`. The event_data holds many fields, see details below.

{% details "Fields in event_data for HA events emitted by the SIA integration." %}

- message_type
- receiver
- line
- account
- sequence
- content
- ti
- id
- ri (also known as `zone`)
- code
- message
- x_data
- timestamp
- event_qualifier
- event_type
- partition
- extended_data (list)
  - identifier
  - name
  - description
  - length
  - characters
  - value
- sia_code
  - code
  - type
  - description
  - concerns

{% enddetails %}
