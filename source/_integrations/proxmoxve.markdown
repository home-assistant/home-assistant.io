---
title: Proxmox VE
description: Access your ProxmoxVE instance in Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
ha_release: 0.103
ha_iot_class: Local Polling
ha_codeowners:
  - '@jhollowe'
  - '@Corbeno'
  - '@erwindouna'
ha_domain: proxmoxve
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---

[Proxmox VE](https://www.proxmox.com/en/) is an open-source server virtualization environment. This integration allows you to poll various data from your instance.

After configuring this {% term integration %}, the binary sensors automatically appear.

## Configuration

{% important %}
You should have at least one VM or container entry configured within Home Assistant, else this integration won't do anything.
You should have the [Proxmox permissions](#proxmox-permissions) ready before creating the integration.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Address of your Proxmox instance. Example: `https://proxmox.example.com`."
Port:
  description: "Port to connect to Proxmox. Default is `8006`."
Realm:
  description: "Authentication source of Proxmox. Default is `pam`."
Username:
  description: "Configured user to authenticate."
Password:
  description: "Password associated with the username."
Verify SSL certificate:
  description: "Enable SSL certificate verification for secure connections."
{% endconfiguration_basic %}

## Proxmox permissions

To be able to retrieve the status of VMs and containers, the user used to connect must minimally have the `VM.Audit` privilege. Below is a guide to how to configure a new user with the minimum required permissions.

### Create Home Assistant Group

Before creating the user, we need to create a group for the user.
Privileges can be either applied to Groups or Roles.

1. Select `Datacenter`
2. Open `Permissions` and select `Groups`
3. Use the `Create` button above all the existing groups
4. Name the new group (e.g., `HomeAssistant`)
5. Confirm `Create`

### Add Group Permissions to all Assets

For the group to access the VMs read-only, we need to grant it the auditor role

1. Select `Datacenter`
2. Select `Permissions`
3. Open `Add` and select `Group Permission`
4. Choose "/" for the path
5. Select your Home Assistant group (`HomeAssistant`) from the list
6. Select the Auditor role (`PVEAuditor`) from the list
7. Make sure `Propagate` is checked
8. Confirm `Add`

{% note %}
Select `PVEUser` instead of `PVEAuditor` if you wish to grant Home Assistant controlling privileges on your environment.
Or create a new custom role to at grant 'VM.Audit' and 'VM.PowerMgmt' privileges.
{% endnote %}


### Create Home Assistant User

Creating a dedicated user for Home Assistant, limited to only to the privileges just created is the most secure method. These instructions use the `pve` realm for the user. This allows a connection, but ensures that the user is not authenticated for local or SSH connections. If you use the `pve` realm, change the default `realm` to `pve`.

{% important %}
When using `pam`, the Home Assistant user you create must already exist on the Linux system.  For `pve`, the user only has to exist in Proxmox.
{% endimportant %}

1. Select `Datacenter`
2. Open `Permissions` and click `Users`
3. Select `Add`
4. Enter a username (e.g.,`hass`)
5. Set the realm to "Proxmox VE authentication server"
6. Enter a secure password (it can be complex as you will only need to copy/paste it into your Home Assistant configuration)
7. Select the group just created earlier (`HomeAssistant`) to grant access to Proxmox
8. Ensure `Enabled` is checked and `Expire` is set to "never"
9. Confirm `Add`

In your Home Assistant configuration, use `hass@pve` for the username and your chosen password for the password.

## Sensor

- **CPU**: Percentage of CPU usage.
- **Max CPU**: Maximum amount of CPU on the node/VM/LXC.
- **Disk**: Disk usage of the node/VM/LXC.
- **Max disk**: Maximum amount of available disk space.
- **Memory**: Amount of memory usage.
- **Max memory**: Maximum amount of memory on the node/VM/LXC.
- **Status**: Current status of the node/VM/LXC.

## Binary sensor

The integration will automatically create a binary sensor for each tracked virtual machine or container. The binary sensor will either be on if the VM state is running or off if the VM state is different.

The created sensor will be called `binary_sensor.NODE_NAME_VMNAME_running`.

## Button

- **Start**: Starts a node/VM/LXC.
- **Start all**: Starts all VMs and LXCs known on a node.
- **Stop**: Stops a node/VM/LXC.
- **Stop all**: Stops all VMs and LXCs known on a node.
- **Restart**: Restarts a VM/LXC.
- **Reboot**: Reboots a node.
- **Shutdown**: Shuts a node down.
- **Hibernate**: Puts a VM in hiberanation; only available to VMs.
- **Reset**: Resets a VM; only available to VMs.

{% important %}
To use these buttons to control state / power management of your node, VM or LXC, the user should have 'VM.PowerMgmt' privileges. Make sure the Proxmox role assigned to the Home Assistant user includes this privilege.
{% endimportant %}

## Services

### Create snapshot

The `proxmoxve.create_snapshot` {% term action %} creates a snapshot on a QEMU VM or LXC container. This is useful in automations — for example, taking a snapshot before a Home Assistant upgrade.

{% note %}
To create snapshots, the configured Proxmox VE user needs the `VM.Snapshot` privilege in addition to the `VM.Audit` privilege already required for monitoring. You can grant this to the Home Assistant group by updating its role to `PVEAdmin`, or by creating a custom role that includes both `VM.Audit` and `VM.Snapshot`.
{% endnote %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `target` | No | A Proxmox VE VM or container entity or device. |
| `vm_name` | Yes | Override the VM name used to build the snapshot name. |
| `snapshot_name` | Yes | Full snapshot name override. Invalid characters are replaced with underscores. |
| `description` | Yes | Snapshot description. Defaults to `Snapshot triggered from Home Assistant on YYYY-MM-DD`. |
| `version_entity` | Yes | A sensor entity whose state is used as a version string in the snapshot name instead of the current date. |
| `include_ram` | Yes | Save the VM RAM state in the snapshot. Only applies to QEMU VMs — LXC containers do not support RAM snapshots. Defaults to `false`. |

The snapshot name is built automatically from the VM or container name and the current date, for example `my-vm_2026_03_07`. When `version_entity` is provided, the date is replaced by the sensor's state, for example `my-vm_2025_3_4`. If the generated name conflicts with an existing snapshot, a letter suffix is appended automatically (`_a`, `_b`, …, `_z`).

#### Example: snapshot before a Home Assistant upgrade

{% raw %}

```yaml
automation:
  - alias: "Snapshot VMs before HA update"
    trigger:
      - platform: state
        entity_id: update.home_assistant_core_update
        to: "on"
    action:
      - action: proxmoxve.create_snapshot
        target:
          entity_id: sensor.my_vm_cpu_usage
        data:
          version_entity: sensor.current_version
```

{% endraw %}
