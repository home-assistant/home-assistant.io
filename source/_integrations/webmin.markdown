---
title: Webmin
description: Instructions on how to set up Webmin with Home Assistant.
ha_category:
  - System monitor
ha_release: 2024.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: webmin
ha_integration_type: device
ha_platforms:
  - diagnostics
  - sensor
---

[Webmin](https://webmin.com) is a web-based interface for the system administration of Unix-like servers.

This {% term integration %} provides sensors for monitoring the CPU and memory usage of your server.

## Prerequisites

### Authentication setup

{% warning %}
Always consider your own setup and security needs before exposing services with system-level access.
{% endwarning %}

As a good security practice, create a Webmin User specific to Home Assistant. A dedicated account allows for this integration to operate uninterrupted should you change your primary login for Webmin, and it can allow for more granular access so that only the necessary data and access is made available to Home Assistant.

#### Suggested User Setup

- Create the account with a strong password,
- Only enable the _"Can accept RPC calls"_ permission (under "Permissions for all modules"),
- Consider disabling the _"Can accept RPC calls"_ permission for other users (unless specifically required),
- Consider limiting this account to only have access via the IP address of your Home Assistant instance (if appropriate).

{% note %}
The Webmin API ignores any 2FA set up via the frontend. Even with 2FA enabled, it is still possible to use the API with only a username and password.
{% endnote %}

### Required Webmin Perl Module

Ensure the `XML::Parser` Perl module is installed via [Webmin Perl Modules](https://webmin.com/docs/modules/perl-modules/) before configuring the integration.

#### Installing XML::Parser Perl Module

1. In the Webmin UI, go to **Tools** > **Perl Modules**.
2. Under the **Install module** tab, enter `XML::Parser` into the **From CPAN** text field.
3. Select **Install** at the bottom of the dialog.
4. Confirm that the installation is successful.
   - If the installation succeeds:
     - Continue with any remaining steps for Home Assistant.
   - If the installation fails:
     - Refer to [Webmin documentation for Perl Modules](https://webmin.com/docs/modules/perl-modules/) to resolve any Webmin issues.
     - Retry the module installation and confirm that `XML::Parser` is listed on the Perl Modules page under **Existing Modules**.
{% include integrations/config_flow.md %}

## Sensors

{% note %}
All entities are **disabled** by default. You must enable any entities that you wish to use.
{% endnote %}

The following sensors are provided:

- Load (1m)
- Load (5m)
- Load (15m)
- Memory total
- Memory free
- Swap total
- Swap free
- Total space for all disks
- Free space for all disks
- Used space for all disks
- For each filesystem mountpoint:
  - Used space
  - Free space
  - Total space
  - Used inodes
  - Free inodes
  - Total inodes
  - Disk usage in percent
  - Inode usage in percent
