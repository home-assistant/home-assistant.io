---
title: Seafile
description: Instructions on how to integrate a Seafile server into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_release: '2026.11'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@erwindouna'
ha_domain: seafile
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Seafile** {% term integration %} connects Home Assistant to your [Seafile](https://www.seafile.com/) server.

Seafile is a self-hosted file sync and share server. Files are stored in libraries. This integration shows the size, number of files, and last modification time of the libraries you choose.

## Use cases

- Keep an eye on how much storage your libraries use and get notified when one grows too large.
- Check that a library you back up to is still being updated.

## Prerequisites

- A Seafile server that Home Assistant can reach.
- A Seafile account with access to the libraries you want to add.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The address you use to open Seafile in your browser, for example, `https://seafile.example.com`."
Username:
  description: "The email address or login ID of your Seafile account."
Password:
  description: "The password of your Seafile account. It is only used to create an access token and is not stored."
Verify SSL certificate:
  description: "Turn this off if your server uses a self-signed certificate."
{% endconfiguration_basic %}

If your account uses two-factor authentication, you are asked for the code from your authenticator app.

Home Assistant exchanges your password for an access token. In Seafile, this token is listed under the linked devices of your account as **Home Assistant**, followed by the name of your home in parentheses. Revoking it there disconnects Home Assistant.

After logging in, you can select the libraries to add. You can also skip this step and add libraries later.

## Adding a library

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Seafile** integration.
2. Select **Add library**.
3. Select the library you want to add.

## Supported functionality

Each library is added as a separate device in Home Assistant, with the following entities.

### Sensors

- **Size**
  - **Description**: Total size of the files in the library.
- **Files**
  - **Description**: Number of files in the library.
- **Last modified**
  - **Description**: Time the library was last changed.

## Data updates

The **Seafile** integration {% term polling polls %} your Seafile server every 5 minutes.

## Supported versions

The integration has been tested with Seafile 13 and 14 (Community Edition).

## Known limitations

- Encrypted libraries are not supported and are not shown in the list of libraries.
- An account on a server can only be added once.
- There is no reauthentication yet. If the access token is no longer accepted, remove the integration and add it again.

## Troubleshooting

### The sensors of a library are unavailable

The library was deleted on the Seafile server, or your account lost access to it. Delete the library entry from the **Seafile** integration page.

### The integration fails to load with an authentication error

The access token was revoked or is no longer valid. Remove the integration and add it again with your current password.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

To also remove the access token from Seafile, delete the **Home Assistant** entry from the linked devices of your account.
