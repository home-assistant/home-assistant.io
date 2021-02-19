---
title: "Restart Home Assistant if Wemo Switch is not detected"
description: "Restart Home Assistant if Wemo Switch is not detected."
ha_category: Automation Examples
---

### Restart Home Assistant

This configuration example is restarting Home Assistant if a [WeMo](/integrations/wemo) switch is not detected. An additional MQTT switch is present for stopping Home Assistant and can be triggered by [IFTTT](/integrations/ifttt/). The running batch script will automatically restart Home Assistant if the process isn't found anymore.

{% raw %}

```yaml
mqtt:
  broker: 127.0.0.1
  port: 1883
  client_id: home-assistant-1
  keepalive: 60
  
device_tracker:
  - platform: nmap_tracker
    hosts: 192.168.0.1-255
    home_interval: 1
    interval_seconds: 30
    consider_home: 900
    
ifttt:
  key: ***
  
notify: 
  - platform: pushbullet
    api_key: ***
    name: pushbullet

wemo:
  discovery: true

switch:
  - platform: mqtt
    state_topic: "home/killhass"
    command_topic: "home/killhass"
    name: "KillHass"
    qos: 0
    payload_on: "ON"
    payload_of: "OFF"
    optimistic: false

script:
  restarthawemo:
    alias: "Restart HA if WeMo isn't found after 15 minutes"
    sequence:
      - delay:
          minutes: 15
      - service: notify.pushbullet
        data:
          message: "WeMo not found, restarting HA"
      - service: switch.turn_on
        target:
          entity_id: switch.killhass
  
automation:
- alias: "Restart HA if WeMo switch isn't found after 15 minutes"
  trigger:
    platform: state
    entity_id: device_tracker.wemo
    from: "not_home"
    to: "home"
  condition:
    - condition: template
      value_template: '{% if states.switch.wemo %}false{% else %}true{% endif %}'
    - condition: state
      entity_id: script.restarthawemo
      state: "off"
  action:
    service: homeassistant.turn_on
    target:
      entity_id: script.restarthawemo
- alias: "Stop HA"
  trigger:
    - platform: state
      entity_id: switch.KillHass
      to: "on"
  action:
    service: homeassistant.stop
  - alias: "Stop restarting HA is WeMo is found"
  trigger:
    platform: template
    value_template: '{% if states.switch.wemo %}true{% else %}false{% endif %}'
  condition:
    condition: state
    entity_id: script.restarthawemo
    state: "on"
  action:
    service: homeassistant.turn_off
    target:
      entity_id: script.restarthawemo
```

{% endraw %}
