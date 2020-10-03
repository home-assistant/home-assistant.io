---
title: "Google Nest Device Access"
description: "Instructions on how to integrate Google Nest into Home Assistant"
ha_category:
  - Sensor
ha_iot_class: "Cloud Polling"
ha_release: 0.116
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: google_nest
---

The `google_nest` integration allows you to access supported Google Nest devices using [Google Nest Device Access](https://developers.google.com/nest/device-access) and the Device Access Sandbox.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

## Developer Account Setup

  You will need to follow the instructions in [Device Access Registration](https://developers.google.com/nest/device-access/registration) which includes the following steps:

  * Accept the Terms of Service
  * Pay a fee (currently US$5)
  * Register in the Device Access Console to get a `project_id`
  * Authorize your Google Account and create OAuth credentials to get a `client_id` and `client_secret`

Additionally, Home Assistant must be configured with a URL (e.g. external exposed [`http`](/integrations/http/), Nabu Casa, etc).  When setting up the OAuth credentials, also make sure the URL is the list of *Authorized redirect URIs* in order to make sure the redirect back to Home Assistant can get an OAuth authorization code.

Follow all of the instructions in [Device Access: Quick Start Guide](https://developers.google.com/nest/device-access/get-started) carefully as it is easy to make a configuration mistake that is difficult to debug.  It is recommended to exercise the entire guide, including the command to test out the API, to make sure that it is working before configuring Home Assistant.

## Configuration

```yaml
# Example configuration.yaml entry
google_nest:
  project_id: PROJECT_ID
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

{% configuration %}
project_id:
  description: Your Device Access project_id
  required: true
  type: string
client_id:
  description: Your OAuth2 Client ID from your Cloud Console project credentials.
  required: true
  type: string
client_secret:
  description: Your OAuth2 Client Secret from your Cloud Console project credentials.
  required: true
  type: string
{% endconfiguration %}

## Device Setup

Once your developer account is setup and `google_nest` has been configured, you need to connect devices.  In Home Assistant navigate to:

1. From the Home Assistant front-end, navigate to **Configuration** then **Integrations**. Under **Set up a new integration** locate 'Google Nest Device Access'.
1. You should get redirected to Google to choose an account.  This should be the same developer account you configured above.
1. The *Google Nest permissions* screen will allow you to choose which devices to configure.
1. You will get redirected back to another account selection page.
1. Confirm you want to allow persistent access to Home Assitant.

## Sensor

All supported sensor types on all devices are automatically monitored once configured.  The [Smart Device Management API](https://developers.google.com/nest/device-access/api) works in terms of *traits* of a particular device, rather than any particular *device type*.

The `google_nest` integration supports these traits:

  * [Temperature](https://developers.google.com/nest/device-access/traits/device/temperature)
  * [Humidity](https://developers.google.com/nest/device-access/traits/device/humidity)
