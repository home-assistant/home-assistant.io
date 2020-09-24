---
title: Govee LED strips
description: Instructions on setting up Govee LED strips within Home Assistant.
ha_category:
  - Light
ha_iot_class: Assumed State, Cloud Polling
featured: false
ha_release: '0.116'
ha_config_flow: true
ha_quality_scale: No score
ha_codeowners:
  - '@LaggAt'
ha_domain: govee
---

The Govee integration allows you to control an monitor lights using the Govee API.

To set up this integration, click Configuration in the sidebar and then click Integrations. Click the + icon to add "Govee LED strips" to the integrations. An API-Key
is necessary, you need to obtain it in the 'Govee Home' App on your mobile, in the User menu - About us - Request API-Key screen. The key will be sent to you by mail.

## Pulling or assuming state

Some devices do not support pulling state, in this case we use assumed state on your last input.
For others we assume the state just after controlling the light, but will otherwise request from the cloud api.

## Support

Support thread is here: <https://community.home-assistant.io/t/govee-led-strips-integration/228516>
There you'll also find links to code repositories and their issue trackers.

For bug reports include debug log, which could be enabled in configuration YAML + restart:

```YAML
logger:
  default: warning
  logs:
    homeassistant.components.govee: debug
    custom_components.govee: debug
    govee_api_laggat: debug
```

Then on Settings - Logs click on “full logs” button and add them to the bug report after removing personal data.

## Caveats

You can set a pull interval, don't set it too low as the API has a limit of 60 requests per minute, and each device needs one request per state pull and control action.
If you have more than one lamp use a higher interval. Govee wants to implement a single request for all devices in 2021.

Once the integration is active you will see all your registered devices, and may control on/off, brightness, color temperature and color.
