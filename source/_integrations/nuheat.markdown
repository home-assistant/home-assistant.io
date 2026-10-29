---
title: NuHeat
description: Connect your NuHeat floor-heating thermostats to Home Assistant and control schedules, temperature holds, and Standby.
ha_categories:
  - climate.thermostats_heating
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_domain: nuheat
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - climate
ha_integration_type: hub
ha_codeowners:
  - '@tstabrawa'
---

The **NuHeat** {% term integration %} connects your NuHeat account to Home Assistant. You can view thermostat temperatures, resume schedules, set temperature holds, and enter Standby.

## Supported devices

The integration has been tested with [NuHeat Signature](https://www.nuheat.com/products/thermostats/signature-thermostat) floor-heating thermostats.

## Prerequisites

- A NuHeat account with your thermostats already connected and working in the NuHeat app.
- An internet connection for Home Assistant and your thermostats.
- Home Assistant's [cloud integration](/integrations/cloud/), included in `default_config`, for official account linking.

{% include integrations/config_flow.md %}

Follow the sign-in steps to authorize access to your NuHeat account. Home Assistant discovers the thermostats linked to that account; you do not need to enter each thermostat's serial number.

### Reconnecting an existing NuHeat integration

If you previously used the username and password integration, reconnect it through the authorization flow:

1. [Create a Home Assistant backup](/common-tasks/general/#backups).
2. Go to **Settings** > **Devices & services** and open the NuHeat entry that requires attention.
3. Follow the reconnection prompt. In **Reconnect NuHeat**, confirm that you want to continue.
4. Sign in to the NuHeat account that contains your existing thermostat and authorize access.

Home Assistant validates the account and thermostat before removing the stored legacy credentials. Matching legacy thermostat entries are consolidated into an account entry while preserving their entity and device identities and registry customizations.

## Supported functionality

Home Assistant creates one climate entity for each thermostat found during setup. Reload the integration to discover thermostats added later. The entity provides the current temperature, target temperature, heating activity, operating mode, and supported presets. Temperatures use Home Assistant's configured temperature unit.

### Operating modes

- **Auto** resumes the thermostat's programmed schedule and cancels a hold or Manual operation.
- **Heat** selects permanent hold, preserving the behavior of the previous integration.
- **Off** enters NuHeat Standby. This uses Manual operation at 5 °C (41 °F) and retains frost protection. It does not disconnect power or guarantee that heating can never run.

Turning the entity on resumes the schedule. Turning it off enters Standby. After cloud readback confirms Standby, the entity reports **Off** and does not display a target temperature. Setting a target temperature while off exits Standby into permanent hold at that target. To resume the schedule instead, turn the entity on.

### Presets

- **Run Schedule** resumes the programmed schedule.
- **Temporary Hold** holds the current target until the next scheduled event.
- **Permanent Hold** maintains the current target indefinitely, until you select another preset or operating mode.

Permanent hold keeps the thermostat in automatic operation with its schedule overridden. Manual operation is a separate operating mode. If the cloud response cannot distinguish them, Home Assistant does not report a permanent-hold preset.

### Changing the target temperature

The result depends on the thermostat's current state:

- During scheduled operation, changing the target creates a hold until the next scheduled event.
- During a timed hold, changing the target preserves the hold's end time.
- During a permanent hold, changing the target keeps the indefinite hold.
- During Manual operation, changing the target keeps Manual operation.

### Heating activity

The entity reports **Heating** when the thermostat reports active heating, **Idle** when it is not heating, and **Off** in Standby.

The standard climate actions also let you [set the operating mode](/actions/climate.set_hvac_mode/), [select a preset](/actions/climate.set_preset_mode/), and [change the target temperature](/actions/climate.set_temperature/).

## NuHeat automation examples

### Automation: control an existing thermostat

To add thermostat control to an existing automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open your automation or script.
3. In **Then do**, select **Add action**.
4. Select what you want to control. Under **By target**, select your NuHeat climate entity.
5. Select **Set thermostat target temperature**, **Set thermostat preset mode**, or **Set thermostat HVAC mode**, and enter the settings you want to apply.
6. Select **Save**.

Use the preset values `Run Schedule`, `Temporary Hold`, and `Permanent Hold` when editing a climate preset action in YAML. Operating-mode values are `auto`, `heat`, and `off`.

## Data updates

The integration polls the NuHeat cloud every five minutes. After a command, it also schedules a delayed read. Home Assistant displays the latest cloud-reported settings, so you may briefly see the previous value while the cloud updates. It does not automatically repeat the heating command.

## Known limitations

- The integration requires the NuHeat cloud; it does not provide local thermostat control.
- The cloud API does not expose the thermostat's native minimum and maximum temperatures. Home Assistant uses fallback control limits of 7–35 °C, approximately 45–95 °F. These are not reported hardware limits. The separate Standby command uses 5 °C (41 °F).
- The integration follows schedules stored by NuHeat. It does not edit the thermostat's schedule.
- If schedule details are missing or conflicting, an implicit temperature change can be rejected rather than silently changing a hold to Manual. Select a preset or operating mode explicitly, then retry after the state updates.

## Troubleshooting

### Authorization needs to be renewed

Open the NuHeat entry under **Settings** > **Devices & services** and follow the reauthentication prompt. In **Relink NuHeat**, sign in to the same NuHeat account used by that entry.

### The thermostat becomes unavailable

Check that the thermostat is online in the NuHeat app and that Home Assistant can reach the internet. Offline thermostats, thermostats temporarily omitted by the cloud, and failed cloud updates are represented as unavailable without deleting their entities.

### Reconnection reports a different account

Sign in to the NuHeat account that contains the original thermostat. Account validation failures leave the legacy configuration unchanged. If Home Assistant reports incomplete migration cleanup, follow the repair instructions. If it reports that rollback could not restore the configuration, stop retrying and restore the backup created before reconnection.

## Removing the integration

{% include integrations/remove_device_service.md %}
