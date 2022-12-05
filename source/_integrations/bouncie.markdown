---
title: Bouncie
description: Instructions on how to integrate Bouncie within Home Assistant.
ha_category:
  - Car
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mandarons'
ha_domain: bouncie
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `bouncie` integration uses the [Bouncie](https://www.bouncie.dev/) web service
as a source for monitoring your car(s).

## Setup

To generate an Bouncie application credentials -

1. Go to the [Bouncie Developer Page](https://bouncie.dev/login/) page
2. Login with your `bouncie.com` credentials
3. Click on `+ ADD APPLICATION` 
4. Provide a `name` for application e.g. Home Assistant Integration
5. Provide a unique `client_id` e.g. alphanumeric random string
6. Provide redirect URL to be your Home Assistant URL
7. Click on `SAVE`
8. Visit https://auth.bouncie.com/dialog/authorize?response_type=code&`client_id`=&redirect_uri=`redirect_url` in a browser.
9.  Follow the prompts to provide your application access to your account
10. Copy the alphanumeric string after `<redirect URL provided above>?code=...` - this is your `authorization_code`
11. Note down following values to enter in Home Assistant
    1.  Client ID 
    2.  Client Secret
    3.  Redirect URL
    4.  Authorization code

{% include integrations/config_flow.md %}

<div class="note">
This integration currently uses REST API only with polling.
</div>
