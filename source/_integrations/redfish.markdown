---
title: Redfish
description: Instructions on how to integrate Redfish-compatible management controllers with Home Assistant.
ha_category:
  - Hub
  - Switch
  - System monitor
ha_config_flow: true
ha_release: 2026.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@jyundt'
ha_domain: redfish
ha_platforms:
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

[Redfish](https://www.dmtf.org/standards/redfish) is an open standard for managing servers and other infrastructure. The **Redfish** {% term integration %} connects to a Redfish service on your local network and lets you monitor and control the power state of the ComputerSystem resources it exposes.

The integration is vendor-independent and uses the standard Redfish service root and ComputerSystem resources.

## Supported devices

The integration supports management controllers that implement the following standard Redfish resources:

- The Redfish service root at `/redfish/v1/`
- The `Systems` collection advertised by the service root
- The `ComputerSystem.Reset` action for power control

Support depends on how completely the management controller implements these standard resources.

## Prerequisites

Before setting up the integration, make sure you have:

- The HTTPS base URL of the Redfish service, for example `https://bmc.example`
- The username and password of a Redfish account
- Network connectivity from Home Assistant to the management controller

Use a dedicated account with only the permissions needed to read ComputerSystem resources and invoke their reset action. Management controllers provide privileged access to physical systems and should not be exposed directly to the internet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Redfish base URL:
  description: "The base URL of the Redfish service, including the `https://` scheme. Do not include `/redfish/v1/` or another path."
Username:
  description: "The username of the Redfish account."
Password:
  description: "The password of the Redfish account."
Verify SSL certificate:
  description: "Whether to verify the management controller's TLS certificate. This is enabled by default. If the controller uses a self-signed certificate that Home Assistant cannot validate, disable verification only when the management network is trusted."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one **Power** switch for each ComputerSystem resource discovered during setup.

The switch state is based only on the `PowerState` reported by Redfish. It is on only when `PowerState` is exactly `On`; transitional and vendor-specific states are not treated as on.

- Turning on the switch sends the `On` reset type only when the management controller advertises it.
- Turning off the switch sends `GracefulShutdown` only when the management controller advertises it.
- The integration does not substitute `ForceOff` when graceful shutdown is unavailable.

Power commands are sent to the reset-action URL advertised by the ComputerSystem resource.

## Data updates

Home Assistant polls the Redfish service once per minute to update ComputerSystem information and power state. If a previously discovered system is absent from an update, its entity becomes unavailable.

## Known limitations

- Only HTTPS Redfish services are supported.
- Only HTTP Basic authentication is supported.
- The integration provides ComputerSystem power switches only.
- ComputerSystem resources added after setup require the integration to be reloaded before their switches are created.
- Vendor-specific resources and actions are not supported.

## Troubleshooting

### Cannot connect

If setup reports that Home Assistant cannot connect:

1. Confirm that the base URL begins with `https://` and does not include a path.
2. Confirm that Home Assistant can reach the management controller on the network.
3. If certificate verification is enabled, confirm that the controller presents a certificate trusted by Home Assistant.
4. Confirm that the Redfish service root is available at `/redfish/v1/`.

### Invalid authentication

Confirm the username and password and verify that the account can read ComputerSystem resources. Some management controllers require an administrator to explicitly grant Redfish access.

### No systems found

Confirm that the service root advertises a `Systems` collection and that the configured account can access its members.

### A power command is rejected

The management controller must advertise the corresponding reset type. Turning on requires `On`, and turning off requires `GracefulShutdown`.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
