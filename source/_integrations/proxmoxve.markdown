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
  description: "Authentication source of Proxmox. Default is `PAM`."
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

1. Click `Datacenter`
2. Open `Permissions` and click `Groups`
3. Click the `Create` button above all the existing groups
4. Name the new group (e.g., `HomeAssistant`)
5. Click `Create`

### Add Group Permissions to all Assets

For the group to access the VMs we need to grant it the auditor role

1. Click `Datacenter`
2. Click `Permissions`
3. Open `Add` and click `Group Permission`
4. Select "/" for the path
5. Select your Home Assistant group (`HomeAssistant`)
6. Select the Auditor role (`PVEAuditor`)
7. Make sure `Propagate` is checked

### Create Home Assistant User

Creating a dedicated user for Home Assistant, limited to only to the access just created is the most secure method. These instructions use the `pve` realm for the user. This allows a connection, but ensures that the user is not authenticated for SSH connections. If you use the `pve` realm, just be sure to add `realm: pve` to your configuration.

{% important %}
The Home Assistant user you create must already exist on the Linux system.
{% endimportant %}

1. Click `Datacenter`
2. Open `Permissions` and click `Users`
3. Click `Add`
4. Enter a username (e.g.,`hass`)
5. Set the realm to "Proxmox VE authentication server"
6. Enter a secure password (it can be complex as you will only need to copy/paste it into your Home Assistant configuration)
7. Select the group just created earlier (`HomeAssistant`) to grant access to Proxmox
8. Ensure `Enabled` is checked and `Expire` is set to "never"
9. Click `Add`

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
