---
title: ISEO Argo BLE
description: Instructions on how to integrate your ISEO Argo smart lock into Home Assistant via Bluetooth.
ha_category:
  - Lock
ha_release: 2026.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@FezVrasta'
ha_domain: iseo_argo_ble
ha_platforms:
  - event
  - lock
ha_bluetooth: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **ISEO Argo BLE** {% term integration %} connects Home Assistant to [ISEO](https://www.iseo.com) Argo smart locks over Bluetooth Low Energy. ISEO is an Italian security manufacturer specializing in high-security cylinders and electronic access control, widely used in residential and commercial buildings across Italy and Switzerland.

Home Assistant registers itself as an Argo Gateway, giving it the same privileges as the official Argo app: unlocking the lock and receiving real-time access log entries.

All communication is direct Bluetooth, with no cloud dependency or bridge hardware required.

## Prerequisites

- A Bluetooth adapter accessible to Home Assistant (built-in or via [ESPHome Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies)).
- An ISEO Argo smart lock, such as x1R Smart or AGB Smart.
- The physical Master Card that was supplied with the lock. It is required during the setup process to authorize Home Assistant.
- The official **Argo** app must be closed on all phones during each setup step, as the lock only accepts one Bluetooth connection at a time.

{% include integrations/config_flow.md %}

### Adding your ISEO lock to Home Assistant

1. As soon as you add the integration to Home Assistant, Home Assistant scans for nearby ISEO locks and presents them in a list.
2. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. From the list, select the lock you want to set up.
4. Select **Submit** and within 30 seconds, scan the Master Card on the lock to authorize Home Assistant. 
   - **Result**: The lock's LED will blink green when the card is successfully read.

## Supported functionality

- **Lock**: Controls the lock (unlock only). Reflects the current locked/unlocked state.
- **Access log**: An event entity reporting what your lock recorded in its own access log. It reports three kinds of event:
  - **Opened**: The door was opened, whether from Home Assistant, the Argo app, a card, a PIN, a fingerprint, a mechanical key, the internal handle, or a remote button.
  - **Access denied**: A credential was turned away, for example a wrong PIN or password, an expired or out-of-schedule credential, or a fingerprint that did not match.
  - **Fault**: The lock reported a problem, such as a full memory, a failing backup battery, or a hardware fault.

Each event carries the lock's own description of what happened, the event code behind it, the time the lock recorded, the name the lock stored for whoever triggered it (`opened_by`, when it stored one), and the identifier of the credential involved (`credential_id`).

{% include integrations/actions.md %}

## ISEO Argo BLE automation examples

The access log tells you not just that your door opened, but who opened it, so you can act on the difference.

{% include docs/paste_yaml_tip.md %}

### Automation: Announce who came home

When the front door is opened, the name the lock recorded is announced on a speaker.

- **Trigger**: State of the **Access log** entity changes
- **Condition**: The event type is `opened`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for announcing who came home" %}

{% example %}
automation: |
  alias: "Announce who came home"
  triggers:
    - trigger: state
      entity_id: event.front_door_access_log
  conditions:
    - condition: state
      entity_id: event.front_door_access_log
      attribute: event_type
      state: opened
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ state_attr('event.front_door_access_log', 'opened_by')
             or 'Someone' }} just came in.
{% endexample %}

{% enddetails %}

### Automation: Warn about repeated failed attempts

When someone is turned away at the door, you get a notification with the lock's own explanation.

- **Trigger**: State of the **Access log** entity changes
- **Condition**: The event type is `access_denied`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for warning about failed attempts" %}

{% example %}
automation: |
  alias: "Warn about failed attempts at the front door"
  triggers:
    - trigger: state
      entity_id: event.front_door_access_log
  conditions:
    - condition: state
      entity_id: event.front_door_access_log
      attribute: event_type
      state: access_denied
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Front door: {{ state_attr('event.front_door_access_log',
          'description') }}.
{% endexample %}

{% enddetails %}

## Data updates

Home Assistant {% term polling polls %} the lock for its door state every 30 seconds.

It reads the access log only when there is likely to be something in it: when that poll notices the door has been opened, and after you unlock the door from Home Assistant. You can also read it yourself at any time with the [**Read access log**](/actions/iseo_argo_ble.read_access_log/) action.

Reading the log clears it. Your lock hands over everything recorded since the last read and then never offers those entries again, so a read after a quiet spell can return a long history at once. Home Assistant reports the most recent entry of each kind from every read, rather than replaying the whole backlog as though it had just happened.

## Known limitations

- The lock only supports _one active Bluetooth connection_ at a time. Close the Argo app on all phones before unlocking or during setup.
- The ISEO X1R is a momentary actuator: it re-latches automatically after every unlock. The `lock` action is therefore not supported.
- Because the door state is checked every 30 seconds, a door that is opened and closed again within that time is not noticed, and its access log entries are not read until the next time the log is read. Nothing is lost: those entries are still waiting on the lock, and they arrive with the next read. Use the **Read access log** action if you want them straight away.
- Only the most recent entry of each kind is reported per read, so several openings in quick succession appear as one.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
