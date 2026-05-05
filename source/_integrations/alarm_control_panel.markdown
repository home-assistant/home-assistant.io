---
title: Alarm control panel
description: Connect your home alarm system to Home Assistant for automated arming, disarming, and instant notifications when the alarm triggers.
ha_category:
  - Alarm
ha_release: 0.7.3
ha_quality_scale: internal
ha_domain: alarm_control_panel
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /integrations/manual/
    title: Manual alarm
  - docs: /integrations/template/#alarm-control-panel
    title: Template alarm
---

The **Alarm control panel** {% term integration %} brings your home alarm system into Home Assistant. Whether you have a professionally installed security system or a DIY setup, this integration gives you full control over arming and disarming from anywhere. Imagine your alarm arming itself automatically when the last person leaves the house, disarming the moment you arrive home, sending an urgent notification to your phone when the alarm triggers at 3 AM, or quietly switching to night mode when bedtime rolls around. With Home Assistant watching over your security system, you get peace of mind knowing your home protects itself.

{% include integrations/building_block_integration.md %}

## The state of an alarm panel entity

An alarm panel {% term entity %} reflects the current state of your alarm system. Not every alarm panel supports every state or every arming mode. Home Assistant shows only the modes your hardware provides.

- **Disarmed**: the alarm is off. Sensors are not being monitored.
- **Armed home**: perimeter protection while you are inside. Doors and windows are monitored, but interior motion sensors are ignored so you move freely around the house.
- **Armed away**: full protection for when nobody is home. All sensors (perimeter and interior) are active.
- **Armed night**: similar to home mode, but tuned for sleeping. Typically covers perimeter sensors and selected interior zones while leaving bedroom areas free.
- **Armed vacation**: extended away protection for longer trips. Some systems enable additional monitoring or alerts in this mode.
- **Armed custom bypass**: armed with one or more zones deliberately skipped. Useful when you want to leave a specific door or window open while arming the rest of the system.
- **Arming**: the alarm is counting down its exit delay. You have a short window to leave the house before monitoring begins.
- **Pending**: the alarm detected a sensor trip and is counting down its entry delay. You have a short window to disarm before the alarm triggers.
- **Triggered**: the alarm has gone off. Sirens, notifications, and any other alert actions are active.
- **Disarming**: the alarm is in the process of being disarmed.
- **Unavailable**: the entity is currently unavailable.
- **Unknown**: the state is not yet known.

## Using an alarm PIN code in actions

Some alarm panels require a PIN code to arm, disarm, or both. Others work without a PIN code. If your panel requires a PIN and you omit it or enter the wrong one, the action fails silently, and the alarm stays in its current state.

1. Check your alarm integration's documentation to find out whether a PIN is required for arming, disarming, or both.
2. In your automation or script, add the alarm action.
3. If a PIN is needed, under **Data**, add `code` with your PIN:

   ```yaml
   actions:
     - action: alarm_control_panel.alarm_disarm
       target:
         entity_id: alarm_control_panel.home_alarm
       data:
         code: "1234"
   ```

## About the "Changed by" attribute

If your alarm panel supports it, the **Changed by** (`changed_by`) attribute tells you _who_ last changed the alarm state. This is the name or identifier reported by your alarm system, for example a person's name like "Franck Nijhof" or a key fob ID. You can use this attribute in notifications and automations to keep your household informed about who armed or disarmed the alarm.

## Alarm automation examples

The real power of this integration is combining triggers and conditions into automations that protect your home without you having to think about it. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: arm the alarm when everyone leaves

When the last person leaves the house, arm the alarm in away mode automatically. No more wondering whether you remembered to set the alarm after rushing out the door.

- **Trigger**: Everyone leaves the home zone
- **Action**: Arm the alarm in away mode

{% details "YAML example for arming when everyone leaves" %}

{% example %}
automation: |
  alias: "Arm alarm when everyone leaves"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: leave
    - trigger: zone
      entity_id: person.jamie
      zone: zone.home
      event: leave
  conditions:
    - condition: not
      conditions:
        - condition: zone
          entity_id:
            - person.alex
            - person.jamie
          zone: zone.home
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: disarm when you arrive home

When you pull into the driveway, Home Assistant recognizes you are home and disarms the alarm. You walk through the front door without fumbling for a keypad or app.

- **Trigger**: Your person entity enters the home zone
- **Action**: Disarm the alarm

{% details "YAML example for disarming on arrival" %}

{% example %}
automation: |
  alias: "Disarm alarm on arrival"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: enter
  actions:
    - action: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

### Automation: send an urgent notification when the alarm triggers

If the alarm goes off, you want to know immediately, even if you are on the other side of town. This automation sends a critical notification to your phone the instant the alarm triggers.

- **Trigger**: Alarm triggered
- **Action**: Send a critical mobile notification

{% details "YAML example for an alarm trigger notification" %}

{% example %}
automation: |
  alias: "Notify on alarm trigger"
  triggers:
    - trigger: alarm_control_panel.triggered
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Alarm triggered"
        message: >
          Your home alarm has been triggered.
          Check your cameras immediately.
{% endexample %}

{% enddetails %}

### Automation: arm in night mode at bedtime

When bedtime arrives, switch the alarm to night mode so perimeter sensors stay active while you move freely inside the house.

- **Trigger**: Time reaches 23:00
- **Action**: Arm the alarm in night mode

{% details "YAML example for arming at bedtime" %}

{% example %}
automation: |
  alias: "Arm alarm at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_night
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: notify the household who disarmed the alarm

If your alarm panel reports who made the change, you get a notification telling you exactly who disarmed the system. Handy for families who want to know when the kids got home, or for keeping a log of who opened up the house.

- **Trigger**: Alarm disarmed
- **Action**: Send a notification with the name of the person who disarmed it

{% details "YAML example for a changed-by notification" %}

{% example %}
automation: |
  alias: "Notify who disarmed the alarm"
  triggers:
    - trigger: alarm_control_panel.disarmed
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
  actions:
    - action: notify.notify
      data:
        title: "Alarm disarmed"
        message: >
          The alarm was disarmed
          by {{ state_attr(
          'alarm_control_panel.home_alarm',
          'changed_by') }}.
{% endexample %}

{% enddetails %}

{% include integrations/triggers_conditions_actions.md %}
