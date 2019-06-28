---
layout: page
title: "Somfy"
description: "Instructions on how to set up the Somfy hub within Home Assistant."
date: 2019-06-07 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: somfy.png
ha_category:
  - Hub
ha_iot_class: Cloud Polling
ha_release: 0.95
---

The Somfy integration will allow users to integrate their Somfy devices into Home Assistant using the [official API](https://developer.somfy.com/somfy-open-api/apis), unlike the [tahoma](/components/tahoma/) component.

### {% linkable_title Setting up developer account %}

To connect Somfy, you need to set up a developer account.

1. Visit [https://developer.somfy.com](https://developer.somfy.com).
2. Log in using your Somfy credentials.
3. Open the *My Apps* menu.
4. Add a new App:
  - App Name: Home Assistant
  - Callback URL: `<YOUR_HOME_ASSISTANT_URL>/auth/somfy/callback`
  - Description: Home Assistant instance
  - Product: Somfy Open API
5. Once Home Assistant restarted, go to Configuration>Integrations.
6. Select the Somfy integration.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
somfy:
  client_id: CONSUMER_KEY
  client_secret: CONSUMER_SECRET
```

{% configuration %}
client_id:
  description: Your Somfy consumer key.
  required: true
  type: string
client_secret:
  description: Your Somfy consumer secret.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Potential duplicate with the Tahoma integration %}

If you use the [tahoma](/component/tahoma) component, you will have to exclude the covers added by this one. Otherwise, they will be added twice.

```yaml
# Example configuration.yaml entry
tahoma:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  exclude: ['rts:RollerShutterRTSComponent','rts:CurtainRTSComponent','rts:BlindRTSComponent','rts:VenetianBlindRTSComponent','rts:DualCurtainRTSComponent','rts:ExteriorVenetianBlindRTSComponent','io:ExteriorVenetianBlindIOComponent','io:RollerShutterUnoIOComponent','io:RollerShutterWithLowSpeedManagementIOComponent','io:RollerShutterVeluxIOComponent','io:RollerShutterGenericIOComponent','io:WindowOpenerVeluxIOComponent','io:VerticalExteriorAwningIOComponent','io:HorizontalAwningIOComponent']
```
