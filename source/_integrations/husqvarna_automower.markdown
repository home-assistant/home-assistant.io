---
title: Husqvarna Automower
description: Instructions on how to integrate Husqvarna Automower lawn mowers into Home Assistant.
ha_category:
  - Lawn Mower
ha_release: 2024.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@Thomas55555'
ha_platforms:
  - lawn_mower
ha_integration_type: integration
ha_domain: husqvarna_automower
---

The Husqvarna Automower integration provides connectivity with Husqvarna Automowers lawn mowers through Husqvarna's cloud API. Only mowers with *Automower® Connect* or with the *Automower® Connect Module* are supported.

In order to use this integration you must properly configure OAuth2 credentials using your Husqvarna account.  Refer to [this guide](https://developer.husqvarnagroup.cloud/docs/get-started) for general overview of the process.
Your Husqvarna account username/password used for the *Automower® Connect*  phone app is required.  Most users probably created a Husqvarna account during initial mower setup.

1. Go to the [Husqvarna Developer Portal](https://developer.husqvarnagroup.cloud) and sign in with your Husqvarna account. Authorize *Developer Portal* to access Husqvarna account when prompted.

2. After signing in you will be automatically redirected to "My applications". (Otherwise go to: [Applications](https://developer.husqvarnagroup.cloud/applications))

3. Create a new application:
   - Name is required but can be anything, for example "My Home Assistant"

   - Description is optional

   - Redirect URL: `https://my.home-assistant.io/redirect/oauth`
     Make sure no extra spaces were appended at end of URL from copy and paste.

    ![Create new Application](/images/integrations/husqvarna_automower/create_new_application.png)

   - Click **CREATE**.  *Application Key* and *Application Secret* will be generated and shown.  Protect these like a username and password.

4. Click on **CONNECT NEW API** and connect the **Authentication API**.
   ![Authentication API*](/images/integrations/husqvarna_automower/connect_authentication_api.png)

5. Click on **CONNECT NEW API** again and connect the **Automower Connect API**.
   ![Automower Connect API](/images/integrations/husqvarna_automower/connect_automower_api.png)

6. Leave this tab open in browser and continue with Home Assistant configuration.
   ![Application Overview](/images/integrations/husqvarna_automower/application_overview.png)

### Home Assistant

The My Home Assistant redirect feature needs to be setup to redirect to your Home Assistant installation. See [My FAQ](https://my.home-assistant.io/faq) for additional information.

1. Add the integration to your Home Assistant installation and test the redirect feature by following below link:
   [![my_button](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=husqvarna_automower)

2. Acknowledge prompts to open link, install Husqvarna Automower integration.

3. Acknowledge prompt to setup application credentials.

4. Enter the following from the Husqvarna developer tab:

   - A name of the application
   - Copy and paste the *Application key* into the *OAuth Client ID* field
   - Copy and paste the *Application secret* into the *OAuth Client Secret* field

5. Click **Create**

6. Browser will be redirected to Husqvarna Developer site.  Sign in and Authorize the integration to connect with your Husqvarna account

7. After authorizing the integration the browser will show the My Home Assistant redirect link to link this account.  Click on **Link Account**.

8. Confirm successful connection of mower and assign to an area.

{% include integrations/config_flow.md %}


## Entities

Once you have enabled the Husqvarna Automower integration, you should see the following entities:

### Lawn Mower

The integration will create a lawn mower entity to control the mower. This entity can:

- Resume the schedule
- Pause mowing
- Park until next schedule
