---
title: Somfy
description: Instructions on how to set up the Somfy hub within Home Assistant.
ha_category:
  - Hub
ha_iot_class: Cloud Polling
ha_release: 0.95
ha_config_flow: true
ha_codeowners:
  - '@tetienne'
ha_domain: somfy
ha_zeroconf: true
ha_platforms:
  - climate
  - cover
  - sensor
  - switch
---

The Somfy integration will allow users to integrate their Somfy devices into Home Assistant using the [official API](https://developer.somfy.com/somfy-open-api/apis), unlike the [Tahoma](/integrations/tahoma/) integration.

## Installation

Somfy is leveraging the new account linking service. This means that to set up Somfy, you only need to go to the integrations page and click on add new integration.

<div class='videoWrapper'>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/y0SECWUVR-M" frameborder="0" allowfullscreen></iframe>
</div>

## Installation with own developer account

It is possible to create your own developer account and configure Somfy via that.

### Setting up developer account

1. Visit [https://developer.somfy.com](https://developer.somfy.com).
2. Log in using your Somfy credentials.
3. Open the _My Apps_ menu.
4. Add a new App:

- App Name: Home Assistant
- Callback URL: `<YOUR_HOME_ASSISTANT_URL>/auth/external/callback`
- Description: Home Assistant instance
- Product: Somfy Open API

### Pre-configuration

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
optimistic:
  description: Set optimistic mode.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

**optimistic** mode should only be used when the integration is not able to gain information on whether a cover is open or closed (e.g., [RTS](https://www.somfysystems.com/en-us/discover-somfy/technology/radio-technology-somfy) devices). It will attempt to track the status within Home Assistant. This mode should only be used if Home Assistant is the only way you operate the blind. If you also use the physical remote control or the Somfy app, Home Assistant will become out of sync.

{% include integrations/config_flow.md %}

### Potential duplicate with the Tahoma integration

If you use the [Tahoma](/integrations/tahoma) integration, you will have to exclude the covers added by this one. Otherwise, they will be added twice.

```yaml
# Example configuration.yaml entry
tahoma:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  exclude:
    [
      "rts:RollerShutterRTSComponent",
      "rts:CurtainRTSComponent",
      "rts:BlindRTSComponent",
      "rts:VenetianBlindRTSComponent",
      "rts:DualCurtainRTSComponent",
      "rts:ExteriorVenetianBlindRTSComponent",
      "io:ExteriorVenetianBlindIOComponent",
      "io:RollerShutterUnoIOComponent",
      "io:RollerShutterWithLowSpeedManagementIOComponent",
      "io:RollerShutterVeluxIOComponent",
      "io:RollerShutterGenericIOComponent",
      "io:WindowOpenerVeluxIOComponent",
      "io:VerticalExteriorAwningIOComponent",
      "io:HorizontalAwningIOComponent",
    ]
```
