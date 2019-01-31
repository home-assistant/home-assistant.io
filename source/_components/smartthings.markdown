---
layout: page
title: "SmartThings"
description: "Instructions on setting up Samsung SmartThings within Home Assistant."
date: 2018-01-14 00:00
sidebar: true
comments: false
sharing: true
footer: true
featured: true
logo: samsung_smartthings.png
ha_category: Hub
ha_release: ""
ha_iot_class: "Cloud Push"
---

Samsung SmartThings is integrated into Home Assistant through the SmartThings Cloud API. The SmartThings component is the main component to integrate all SmartThings related platforms. The basic features of this integration include:

1. Controlling SmartThings devices with pushed state updates from SmartThings.
2. Entities automatically added, removed, or updated when changed in SmartThings (upon Home Assistant restart).
3. Support for multiple SmartThings accounts and locations, each represented as a unique integration in the front-end configuration.
4. No brokers, bridges, or additional dependencies.

## {% linkable_title Basic requirements %}

1. A [personal access token](https://account.smartthings.com/tokens) tied to a Samsung or SmartThings account (see below for instructions).
2. Home Assistant setup for [remote access](/docs/configuration/remote/) via a domain name secured with SSL. *Self-signed SSL certificates are not supported by the SmartThings Cloud API.*
3. [`base_url` of the http component](/components/http#base_url) set the URL that Home Assistant is available on the internet.

## {% linkable_title Setup instructions %}

### {% linkable_title Create personal access token %}

1. Log into the [personal access tokens page](https://account.smartthings.com/tokens) and click '[Generate new token](https://account.smartthings.com/tokens/new)'
2. Enter a token name (can be whatever you want), for example, 'Home Assistant' and select the following authorized scopes:
    - Devices (all)
    - Installed Apps (all)
    - Locations (all)
    - Apps (all)
    - Schedules (all)
    - Scenes (all)
3. Click 'Generate token'. When the token is displayed, copy and save it somewhere safe (such as your keystore) as you will not be able to retrieve it again.

### {% linkable_title Configure Home Assistant %}

<p class='note info'>
The SmartThings component is configured exclusively through the front-end. Manual setup through `configuration.yaml` is not available at this time.
</p>

1. From the Home Assistant front-end, navigate to 'Configuration' then 'Integrations'. Under 'Set up a new integration' locate 'SmartThings' and click 'Configure'.
2. Enter the personal access token created above and click 'Submit'
3. When prompted, install the SmartApp:
    1. Open the SmartThings mobile app. Navigate to 'Automation' and select the 'SmartApps' tab.
    2. Click 'Add a SmartApp', scroll to the bottom, and select 'My Apps', then choose 'Home Assistant'.
    3. Optionally change the display name and press 'Done'
    4. Authorize the app by pressing 'Allow'
4. Return to Home Assistant and click 'Submit'.

<p class='note info'>
Advanced: If you have multiple locations in SmartThings, each can be integrated into Home Assistant. Follow the steps above, then for each subsequent location, install the SmartApp and it will automatically add to Home Assistant. This can be completed during step 3 (install SmartApp) above or at any time after that.
</p>

## {% linkable_title Additional information %}

### Supported capabilities/device mapping

SmartThings represents devices as a set of [capabilities](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html) and the SmartThings component follows the following rules to represent those as entities in Home Assistant:

| Capability        |Platform
|-------------------|------------------------------------------------------------|
| [switch](https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html#Switch)            | [switch](/components/smartthings.switch)

Support for additional capabilities will be added in the future.
