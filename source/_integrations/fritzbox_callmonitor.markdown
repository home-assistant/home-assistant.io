---
title: AVM FRITZ!Box Call Monitor
description: Instructions on how to integrate a phone call monitor for AVM FRITZ!Box routers into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: fritzbox_callmonitor
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@cdce8p'
---

The `fritzbox_callmonitor` sensor monitors the call monitor exposed by [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) routers on TCP port 1012. It will assume the values `idle`, `ringing`, `dialing` or `talking` with the phone numbers involved contained in the state attributes.
It can also access the internal phone book of the router to look up the names corresponding to the phone numbers and store them in the state attributes.

## Prerequisites

To use the FRITZ!Box call monitor in your installation, a user with at least `Voice messages, faxes, FRITZ!App Fon and call list` rights has to be created:

1.  Open the web user interface via `fritz.box` or the IP address of your FRITZ!Box (e.g. `192.168.1.1`).
2.  Log in with your admin user credentials. The default admin user credentials can be found at the bottom of your FRITZ!Box.
3.  Navigate to **System** -> **FRITZ!Box User**.
4.  Click the `Add User` button.
5.  Enable the option `User account enabled`.
6.  Enter a username and password.
7.  Check the rights box next to `Voice messages, faxes, FRITZ!App Fon and call list`.
8.  Click the `Apply` button.

You also need network access from HA to your FRITZ!Box on port `tcp/1012` for the call monitoring, as well as *one time access* to port `tcp/80` for setting up the integration.

## Setup

To activate the call monitor on your FRITZ!Box, dial **#96\*5\*** from any phone connected to it.

{% include integrations/config_flow.md %}

If you want Home Assistant to resolve numbers to names based on your FRITZ!Box phone book, you have to configure the correct prefixes. Usually, you just need one single prefix, which equals your country calling code, e.g. `+49` for Germany or `+33` for France. Find the right prefix on [Wikipedia](https://en.wikipedia.org/wiki/List_of_country_calling_codes) and add it on the configurations page.

## Examples

### Send notifications on state change

This example shows how to send notifications whenever the sensor's state changes. You will get notified both when you receive a call and also when a call is placed.

{% raw %}

```yaml
# Example configuration.yaml entry.
automation:
  - alias: "Notify about phone state"
    triggers:
      - trigger: state
        entity_id: sensor.phone
    actions:
      - action: notify.notify
        data:
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
