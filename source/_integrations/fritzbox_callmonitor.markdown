---
title: AVM FRITZ!Box Call Monitor
description: Instructions on how to integrate a phone call monitor for AVM FRITZ!Box routers into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: fritzbox_callmonitor
---

The `fritzbox_callmonitor` sensor monitors the call monitor exposed by [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) routers on TCP port 1012. It will assume the values `idle`, `ringing`, `dialing` or `talking` with the phone numbers involved contained in the state attributes.
It can also access the internal phone book of the router to look up the names corresponding to the phone numbers and store them in the state attributes.

## Setup

To activate the call monitor on your FRITZ!Box, dial #96\*5\* from any phone connected to it.

## Configuration

To use the FRITZ!Box call monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_callmonitor
```

{% configuration %}
name:
  description: Give the sensor a friendly name for in the front-end.
  required: false
  default: Phone
  type: string
host:
  description: The IP address of your router, e.g., 192.168.1.1. It is optional since every FRITZ!Box is also reachable by using the IP address 169.254.1.1. If you have a local DNS server and have assigned a hostname to your FRITZ!Box, you can also use that here instead of the IP address.
  required: false
  default: 169.254.1.1
  type: string
port:
  description: The TCP port of the call monitor. There is usually no reason to change this.
  required: false
  default: 1012
  type: integer
username:
  description: FRITZ!Box user's user name. This is required to use the phone book lookup feature. The user needs to have the "voice message, fax message, Fritz!App Fon and call list" permission.
  required: false
  type: string
password:
  description: FRITZ!Box user's user password. This is required to use the phone book lookup feature.
  required: false
  type: string
phonebook:
  description: Numerical ID identifying the phonebook to be used. If there is just one phonebook, this is usually 0.
  required: false
  default: 0
  type: integer
prefixes:
  description: In case of a local call, the phone number seen by the router might differ from the one stored in the phone book by an area code, similarly for the international prefix. To remedy this, a list of prefixes, that can be appended to the phone number in case it is not found in the phone book, can be given.
  required: false
  type: list
{% endconfiguration %}

## Examples

### Full configuration

The example below shows a full configuration for a call monitor with phone book support.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_callmonitor
    name: Phone
    username: my_username
    password: my_password
    phonebook: 0
    prefixes:
      - '+49'
      - '+4989'
      - '089'
```

### Send notifications on state change

This example shows how to send notifications whenever the sensor's state changes. You will get notified both when you receive a call and also when a call is placed.

{% raw %}
```yaml
# Example configuration.yaml entry.
automation:
  - alias: "Notify about phone state"
    trigger:
      - platform: state
        entity_id: sensor.phone
    action:
      - service: notify.notify
        data_template:
          title: "Phone"
          message: >-
            {% if is_state("sensor.phone", "idle") %}
              Phone is idle
            {% elif is_state("sensor.phone", "dialing") %}
              Calling {{ state_attr('sensor.phone', 'to_name') }} ({{ state_attr('sensor.phone', 'to') }})
            {% elif is_state("sensor.phone", "ringing") %}
              Incoming call from {{ state_attr('sensor.phone', 'from_name') }} ({{ state_attr('sensor.phone', 'from') }})
            {% else %}
              Talking to {{ state_attr('sensor.phone', 'with_name') }} ({{ state_attr('sensor.phone', 'with') }})
            {% endif %}
```
{% endraw %}
