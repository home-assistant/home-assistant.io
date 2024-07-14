---
title: Application credentials
description: Allows users to link accounts with integrations that support OAuth2
ha_release: 2022.6
ha_domain: application_credentials
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **Application credentials** {% term integration %} is used by integrations that use OAuth2 to link your account to Home Assistant. The most common and preferred approach is using account linking with Home Assistant Cloud, however, not all cloud providers support that and integrations can use Application Credentials instead. Additionally, users may use Application Credentials if preferred instead of Home Assistant Cloud Account Linking.

## Automatic setup

Some integrations like [Google Calendar](/integrations/google/) will automatically create application credentials as part of adding an integration.

## To view stored application credentials

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Application credentials**.

    ![Devices and services overflow menu](/images/integrations/application_credentials/devices-and-services-menu.png)

    ![Application credential list](/images/integrations/application_credentials/application-credentials.png)

## Manual setup

Some integrations do not support cloud linking. They will prompt you to set up Application Credentials
when setting up for the first time. You may also manually enter credentials with the following steps:

1. Obtain an OAuth *Client ID* and *Client Secret* from the cloud provider. The integration should have specific instructions for this.
2. In Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Application credentials**.
4. Select the integration, enter a *Name* and your OAuth *Client ID* and *Client Secret*.
5. Save the credentials.

    ![Manual setup](/images/integrations/application_credentials/application-credential-setup.png)

6. You may then visit **Integrations** and set up the integration.

## Deleting application credentials

To delete an application credential, for example because you created a new one, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.

    ![Devices and services overflow menu](/images/integrations/application_credentials/devices-and-services-menu.png)

2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Application credentials**.
3. Select the credential from the list, select the three-dots menu and select **Delete**.

    ![Application credential list](/images/integrations/application_credentials/application-credential_delete.png)
