---
title: Xbox
description: Instructions on how to set up Xbox devices in Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Cloud Polling
ha_release: 0.117
ha_codeowners:
  - '@hunterjm'
ha_domain: xbox
---

The Xbox integration allows you to control Xbox One (or newer) consoles from Home Assistant.

Home Assistant authenticates with Xbox Live through OAuth2 using the Home Assistant account linking service. Set up the integration through **Configuration -> Integrations -> Xbox**.

## Manual Configuration

If you prefer not to use the Home Assistant account linking service, you may manually configure a local implementation using the following steps:

- Register a new application in [Azure AD](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  - Name your app
  - Select "Personal Microsoft accounts only" under supported account types
  - For Redirect URI, add: `<INTERNAL_HOME_ASSISTANT_URL>/auth/external/callback`
  Use your internal Home Assistant URL, if you didn't configure one manually, use your local IP address. Examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.
- Copy your Application (client) ID for later use
- On the App Page, navigate to "Certificates & secrets"
  - Generate a new client secret and save for later use

Add the client id and secret to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
xbox:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Finish setup in the UI through **Configuration -> Integrations -> Xbox**.

{% configuration %}
client_id:
  description: The `client id` from your Azure AD Application.
  required: true
  type: string
client_secret:
  description: The `client secret` from your Azure AD Application.
  required: true
  type: string
{% endconfiguration %}
