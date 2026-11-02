---
title: Seafile
description: Instructions on how to integrate a Seafile server into Home Assistant.
ha_categories:
  - computers_network.nas_servers
ha_release: '2026.11'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@erwindouna'
ha_domain: seafile
ha_platforms:
  - backup
  - button
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Seafile** {% term integration %} connects Home Assistant to your [Seafile](https://www.seafile.com/) server.

Seafile is a self-hosted file sync and share server. Files are stored in libraries. This integration shows the size, number of files, and last modification time of the libraries you choose, and can store Home Assistant backups in them.

## Use cases

- Keep an eye on how much storage your libraries use and get notified when one grows too large.
- Check that a library you back up to is still being updated.
- Store your Home Assistant backups on your own Seafile server.

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
4. Optionally, turn on **Store backups** and choose a **Backup folder**. See [Backups](#backups).

To change the backup settings of a library later, select the {% icon "mdi:cog-outline" %} **Reconfigure library** button next to the library.

{% configuration_basic %}
Library:
  description: "The library to add. Encrypted libraries are not supported."
Store backups:
  description: "Make this library available as a backup location in Home Assistant."
Backup folder:
  description: "The folder in the library to store backups in. Defaults to `/Home Assistant backups`. It is created when the first backup is uploaded."
{% endconfiguration_basic %}

## Supported functionality

Each library is added as a separate device in Home Assistant, with the following entities.

### Sensors

- **Size**
  - **Description**: Total size of the files in the library.
- **Files**
  - **Description**: Number of files in the library.
- **Last modified**
  - **Description**: Time the library was last changed.

### Buttons

- **Empty trash**
  - **Description**: Permanently deletes the files and folders in the trash of the library. This can't be undone. Only the owner or an admin of the library can empty its trash.

### Backups

Each library with **Store backups** turned on is available as a backup location in Home Assistant, named after the account and the library, for example, **admin@example.com (seafile.example.com) - Documents**. Libraries you select while setting up the integration have backups turned off; turn them on by reconfiguring the library.

Each backup is stored in the backup folder as a `.tar` file, with a `_meta.json` file next to it that describes the backup. Don't rename or delete only one of the two files: backups without both files are not listed.

Backups are uploaded in parts of 50 MiB, so they also work when Seafile is behind a proxy that limits the request size, such as Cloudflare.

For more information on backups, see [backups](/common-tasks/general/#backups).

## Data updates

The **Seafile** integration {% term polling polls %} your Seafile server every 5 minutes.

The list of backups is cached for 5 minutes. Backups that you add or delete in Seafile directly can take up to 5 minutes to show up in Home Assistant.

## Supported versions

The integration has been tested with Seafile 13 and 14 (Community Edition).

## Known limitations

- Encrypted libraries are not supported and are not shown in the list of libraries.
- An account on a server can only be added once.

## Troubleshooting

### Symptom: The sensors of a library are unavailable

The sensors of one or more libraries show as unavailable.

#### Description

Home Assistant can't reach the Seafile server, or the library is no longer available to your account: it was deleted on the server, or your account lost access to it. When the server can't be reached, the sensors of the account are unavailable as well.

#### Resolution

1. Check that Home Assistant can reach the Seafile server, and look for connection errors in {% my logs title="**Settings** > **System** > **Logs**" %}.
2. Sign in to the Seafile web interface with the same account and check that the library is still listed.
3. Only if the library is gone from your account, delete its library entry from the **Seafile** integration page.

### Symptom: A library is not listed as a backup location

The library is not shown as a location when you create a backup.

#### Description

**Store backups** is turned off for the library, or the Seafile account is not loaded.

#### Resolution

1. On the **Seafile** integration page, select the {% icon "mdi:cog-outline" %} **Reconfigure library** button next to the library.
2. Turn on **Store backups** and select **Submit**.
3. If the library still isn't listed, check that the integration is loaded and its sensors are available.

### Symptom: Home Assistant asks you to log in to Seafile again

The Seafile integration needs attention and its entities are unavailable.

#### Description

The access token of the integration was revoked or is no longer valid, for example, because the **Home Assistant** entry was removed from the linked devices of your account.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Reconfigure** on the Seafile integration.
2. Log in with the username and password of the same Seafile account. If the account uses two-factor authentication, also enter the code.

Home Assistant creates a new access token and loads the integration again. Logging in with a different account is not accepted.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

To also remove the access token from Seafile, delete the **Home Assistant** entry from the linked devices of your account.
