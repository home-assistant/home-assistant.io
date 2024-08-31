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

### Recommended Authentication Setup

{% warning %}
Always consider your own specific environment and security needs before integrating services with extensive system-level access.{% endwarning %}

As a good security practice, create a Webmin User specific to Home Assistant. A dedicated account allows for this integration to operate uninterrupted should you change your primary login for Webmin, and it allows for more granular access so that only the necessary data and access is made available to Home Assistant.

#### Considerations

- Create the account with a strong password,
- Enable only the _"Can accept RPC calls"_ permission (under "Permissions for all modules"),
  - Consider removing the _"Can accept RPC calls"_ permission for all other users (unless specifically required),
- Consider limiting this specific account to only have access via the IP address of your Home Assistant instance (if appropriate).

{% note %}
The Webmin API ignores any 2FA set up via the frontend. Even with 2FA enabled, it is still possible to use the API with only a username and password.
{% endnote %}

### Required Webmin Perl Module

The `XML::Parser` Perl module must be installed via [Webmin Perl Modules](https://webmin.com/docs/modules/perl-modules/) before configuring the integration in Home Assistant. 

#### Installing XML::Parser Perl Module

1. In the Webmin UI, navigate to Tools > Perl Modules.
2. Under the "Install module" tab, enter `XML::Parser` into the _From CPAN_ text field.
3. Select _Install_ at the bottom of the dialog.
4. Confirm that the installation is successful.
   - If the installation succeeded, continue with any remaining prequisites for Home Assistant.
   - If the installation failed, refer to [Webmin documentation for Perl Modules](https://webmin.com/docs/modules/perl-modules/) and resolve any Webmin-specific issues before attempting to reinstall the module.

{% include integrations/config_flow.md %}

## Sensors

**All entities are disabled by default. You must enable any entities that you wish to use.**

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
