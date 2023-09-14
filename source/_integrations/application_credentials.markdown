---
title: Application Credentials
description: Allows users to link accounts with integrations that support OAuth2
ha_release: 2022.6
ha_domain: application_credentials
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The Application Credentials integration is used by integrations that use OAuth2 to link your account to Home Assistant. The most common and preferred approach is using account linking with Home Assistant Cloud, however not all cloud providers support that and integrations can use Application Credentials instead. Additionally, users may use Application Credentials if preferred instead of Home Assistant Cloud Account Linking.

## Automatic Setup

Some integrations like [Google Calendar](/integrations/google/) will automatically create application credentials as part of adding an integration. To view any entries:
1. Go to **{% my integrations title="Settings -> Devices & Services" %}**
2. Click the overflow menu on the top right **...** and choose **Application Credentials**

![Devices and services overflow menu](/images/integrations/application_credentials/devices-and-services-menu.png)

![Application credential list](/images/integrations/application_credentials/application-credentials.png)

## Manual Setup

Note that integrations that do not support cloud linking will prompt to setup Application Credentials
when setting up for the first time. You may also manually enter credentials with the following steps:

1. Obtain an OAuth *Client ID* and *Client Secret* from the cloud provider. The integration should have specific instructions for this.
2. In Home Assistant navigate to **{% my integrations title="Settings -> Devices & Services" %}**
3. Click the overflow menu on the top right **...** and choose **Application Credentials**
4. Select the integration, enter a *Name* and your OAuth *Client ID* and *Client Secret*.
5. Save the credentials

![Manual setup](/images/integrations/application_credentials/application-credential-setup.png)

You may then visit **Integrations** and setup the integration.
