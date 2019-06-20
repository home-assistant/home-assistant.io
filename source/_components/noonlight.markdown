---
layout: page
title: "Noonlight"
description: "24/7 Smart Home Monitoring and 9-1-1 integration"
date: 2019-06-19 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: noonlight.png
ha_category:
  - Switch
ha_release: 0.96
---

[Noonlight](https://noonlight.com) connects your smart home to local emergency services to help keep you safe in case of a break-in, fire, or medical emergency.

<p class='note warning'>
This integration is currently using a _sandbox_ API. It will not actually contact emergency services at this time!
Pending approval from Noonlight, this notice will be removed once the live API has been activated.   
</p> 

<p class='note info'>
Noonlight service is currently available in the United States.
</p> 

## {% linkable_title How it Works %}

Noonlight connects to emergency 9-1-1 services in all 50 U.S. states. Backed by a UL-compliant alarm monitoring center and staffed 24/7 with live operators in the United States, Noonlight is standing by to send help to your home at a moment's notice.

When integrated with Home Assistant, a **Noonlight Alarm** switch will appear in your list of entities. When the Noonlight Alarm switch is turned _on_, this will send an emergency signal to Noonlight. You will be contacted by text and voice at the phone number associated with your Noonlight account. If you confirm the emergency with the Noonlight operator, or if you're unable to respond, Noonlight will dispatch local emergency services to your home using the [longitude and latitude coordinates](/docs/configuration/basic/#latitude) specified in your Home Assistant configuration.

**False alarm?** No problem. Just tell the Noonlight operator your PIN when you are contacted and the alarm will be canceled. We're glad you're safe!

The _Noonlight Switch_ can be activated by any Home Assistant automation, just like any type of switch! [See examples below](#automation-examples).

## {% linkable_title Initial set up %}

Setup requires a U.S. based mobile phone number.

1. Ensure that your [longitude and latitude coordinates](/docs/configuration/basic/#latitude) are set accurately so that Noonlight knows where to send help.

1. Click the button below to set up a Noonlight account and authorize Home Assistant to create alarms on your behalf:
    
    <p class='img' style='background-color:transparent;box-shadow:none;'>
    <a href="https://aki7yd9u0m.execute-api.us-east-1.amazonaws.com/dev/ha/auth" target="_blank">
    <img src='/images/components/noonlight/connect-noonlight-blue.png' style='border:none;' />
    </a></p>

3. Copy and paste the resulting YAML snippet into your configuration.yaml and restart Home Assistant

### {% linkable_title Configuration %}

A `noonlight` section must be present in the `configuration.yaml` file to enable the Noonlight Alarm entity.

**Note:** This configuration snippet will be generated for you automatically to copy and paste when you follow the [initial setup steps](#initial-set-up)

```yaml
# Example configuration.yaml entry
noonlight:
  id: NOONLIGHT_ID
  secret: NOONLIGHT_SECRET
  api_endpoint: https://api.noonlight.com/platform/v1
  token_endpoint: https://noonlight.konnected.io/ha/token
```

{% configuration %}
id:
  description: A unique identifier assigned to you when you complete the [initial setup steps](#initial-set-up)
  required: true
  type: string
secret:
  description: A secret key associated with your id
  required: true
  type: string
api_endpoint:
  description: The Noonlight API endpoint used when creating an alarm
  required: true
  type: string
token_endpoint:
  description: The OAuth endpoint used to refresh your Noonlight auth token (hosted by [Konnected](https://konnected.io))
  required: true
  type: string
{% endconfiguration%}  

## {% linkable_title Automation Examples %}

### {% linkable_title Notify Noonlight when an intrusion alarm is triggered %}

This example is using the [Manual Alarm component](/components/manual/)

```yaml
automation:
  - alias: 'Activate the Noonlight Alarm when the security system is triggered'
    trigger:
      - platform: state
        entity_id: alarm_control_panel.ha_alarm
        to: 'triggered'
    action:
      - service: homeassistant.turn_on
        entity_id: switch.noonlight_alarm

```

### {% linkable_title Notify Noonlight when a smoke detector detects smoke %}

```yaml
automation:
  - alias: 'Activate the Noonlight Alarm when smoke is detected'
    trigger:
      - platform: state
        entity_id: binary_sensor.smoke_alarm
        to: 'on'
    action:
      - service: homeassistant.turn_on
        entity_id: switch.noonlight_alarm

```

## {% linkable_title Warnings & Disclaimers %}

<p class='note warning'>
**Requires an Internet connection!** Home Assistant must have an active internet connection for this to work!
</p> 

**NO GUARANTEE**

**This integration is provided as-is without warranties of any kind. Using Noonlight with Home Assistant involves multiple service providers and potential points of failure, including (but not limited to) your internet service provider, 3rd party hosting services such as Amazon Web Services, and the Home Assistant software platform.**
Please read and understand the [Noonlight terms of use](https://noonlight.com/terms), [Konnected terms of use](https://konnected.io/terms) and [Home Assistant terms of Service](https://www.home-assistant.io/tos/), each of which include important limitations of liability and indemnification provisions.
