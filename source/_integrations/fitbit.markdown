---
title: Fitbit
description: Instructions on how to integrate Fitbit devices within Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_domain: fitbit
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@allenporter'
ha_config_flow: true
---

The **Fitbit** {% term integration %} allows you to expose data from [Fitbit](https://fitbit.com/) to Home Assistant.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Fitbit account.

{% details "Generate Client ID and Client Secret" %}

1. Your Fitbit account must be registered as a Developer account at the [Fitbit Developer Portal](https://dev.fitbit.com), and have a verified email address. 
2. Visit [Register an application](https://dev.fitbit.com/apps/new).
3. Enter an **Application Name** of your choosing, for example **Home Assistant**.
4. Since we are creating a *Personal* registration, the details for **Description**, **Application Website URL**, **Organization**, etc. must be filled in. However, the contents do not matter and will only be shown to you on the authorization page later.
5. Set **OAuth 2.0 Application Type** to **Personal**.
6. Under **Redirect URL**, add `https://my.home-assistant.io/redirect/oauth`.
7. You can leave **Default Access Type** as **Read Only**.
8. Read the terms of service, check the box, then select **Register**.
9. You will then be shown the page with your registered application, showing **OAuth 2.0 Client ID** and **Client Secret**. Make a note of these (for example, copy and paste them into a text editor), as you will need them shortly. You can always revisit this page through the **Manage My Apps** tab.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Fitbit account

{% details "OAuth and Authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.
2. You will be asked to grant access to specific data in your Fitbit account.
3. For Home Assistant to understand your account, select **profile**.
4. All other data is optional. Home Assistant will create entities based on the information you select. For example, if you allow access to **Activity and exercise**, then Home Assistant will create activity-related sensors such as `sensor.step`. 
5. The page will now display **Link account to Home Assistant?**, note **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.
6. You may close the window, and return back to Home Assistant where you should see a **Success!** message from Home Assistant.

{% enddetails %}

## Additional information

Please be aware that Fitbit has very low rate limits, 150 per user per hour. The clock resets at the _top_ of the hour (meaning it is not a rolling 60 minutes). There is no way around the limits. Due to the rate limits, the sensor only updates every 30 minutes. You can manually trigger an update by restarting Home Assistant. Keep in mind that 1 request is used for every sensor.

The unit system that the sensor will use is based on the country you set in your Fitbit profile.

## Troubleshooting

### Resetting a broken or incorrect configuration

If the Fitbit integration was initially configured incorrectly, simply removing and re-adding the integration may not be sufficient. When removing the integration, Home Assistant asks whether the existing application credentials should be kept or removed.

If you choose to keep them, the previously stored (and possibly incorrect) credentials will continue to be used automatically during the next setup attempt, which can lead to repeated connection failures.

To fully reset the configuration, the stored application credentials must also be removed (see [Deleting application credentials](/integrations/application_credentials/#deleting-application-credentials)).

### “Connection failed” after authorization

#### Symptom

In some cases, the authorization appears to succeed, but Home Assistant returns a `Connection failed` error after redirecting back from Fitbit.

The Home Assistant Core log typically shows the message `Failed to fetch user profile for Fitbit API: Error from Fitbit API`.

#### Description

This is usually caused by missing permissions. The Fitbit integration requires the **Profile** scope. If **Profile** is not enabled during authorization, Home Assistant cannot fetch the user profile and the setup fails.

#### Resolution

1. In the Fitbit permission settings, enable **Profile**.
2. Repeat the authorization steps.
