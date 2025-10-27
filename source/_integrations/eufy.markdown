---
title: EufyHome
description: Instructions on how to integrate EufyHome devices into Home Assistant.
ha_category:
  - Hub
  - Light
  - Switch
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: eufy
ha_platforms:
  - light
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **EufyHome** {% term integration %} is the main integration to integrate [eufy](https://eufy.com/) devices sold under the EufyHome product line with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Light
- Switch

Supported devices will be discovered after the EufyHome integration is added to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
eufy:
  username: EMAIL_ADDRESS
  password: PASSWORD
```

where username and password are the ones configured in the EufyHome app. Alternately, EufyHome devices that are not discoverable can be statically configured.

```yaml
eufy:
  devices:
    - address: 192.168.1.10
      access_token: 1234567890abcdef
      type: T1012
      name: Smart Light
    - address: 192.168.1.11
      access_token: abcdef1234567890
      type: T1201
      name: Smart Switch
```

`access_token` can be obtained by running:

```bash
$ curl -H "Content-Type: application/json" \
   -d '{"client_id":"eufyhome-app", "client_Secret":"GQCpr9dSp3uQpsOMgJ4xQ", "email":"USERNAME", "password":"PASSWORD"}' \
   https://home-api.eufylife.com/v1/user/email/login
```

replacing USERNAME and PASSWORD with the EufyHome username and password. This will give an `access_token`. Then run:

```bash
$ curl -H token:TOKEN -H category:Home \
   https://home-api.eufylife.com/v1/device/list/devices-and-groups
```

replacing TOKEN with the `access_token` from the previous command. This will provide the local_code for each device.
