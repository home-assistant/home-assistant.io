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
  - '@Corbeno'
  - '@erwindouna'
  - '@CoMPaTech'
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

[Proxmox VE](https://www.proxmox.com/en/) is an open-source server virtualization environment. This integration lets you monitor your Proxmox VE nodes, virtual machines, and containers in Home Assistant, and exposes control actions (if your Proxmox permissions allow it).

## Prerequisites

{% important %}
To see entities in Home Assistant, you need at least one node with at least one virtual machine or container in Proxmox VE.

Before you set up the integration, make sure you have created a Proxmox VE user with the right permissions. See [Proxmox permissions](#proxmox-permissions).
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Address of your Proxmox instance. Example: `https://proxmox.example.com`."
Port:
  description: "Port to connect to Proxmox. Default is `8006`."
Realm:
  description: "The authentication realm in Proxmox VE. Default is `pam`. For a dedicated Home Assistant account, we recommend using the built-in Proxmox VE realm and selecting `pve` (see [Proxmox permissions](#proxmox-permissions))."
Username:
  description: "Configured user to authenticate."
Password:
  description: "Password associated with the username."
Verify SSL certificate:
  description: "Enable SSL certificate verification for secure connections."
{% endconfiguration_basic %}

## Proxmox permissions

This integration reads status and resource usage from Proxmox VE, and can perform actions using `button` entities.

{% important %}
To keep things secure, create a dedicated Proxmox VE user for Home Assistant and only grant the permissions you need. In short, do not use the `root` account.
{% endimportant %}

### Choose the right role

The minimum required permissions depend on what you want to do:

- **Monitor only** (sensors and binary sensors): The **Auditor** role (`PVEAuditor`) is typically sufficient.
- **Monitor and control** (button entities like start, stop, reboot): You will need a role that allows those actions, such as **User** (`PVEVMUser`) or another custom role that includes the required privileges.

If you are not sure which privileges you need for control in your Proxmox VE setup, start with `PVEVMUser`, confirm everything works, and then tighten the permissions by switching to a custom role. If you want full but responsible control start with `PVEVMAdmin`.

### Create a Home Assistant group

Before creating the user, you need to create a group for the user.
Privileges can be either applied to Groups or Roles.

1. Select **Datacenter**.
2. Open **Permissions** and select **Groups**.
3. Select the **Create** button above all the existing groups.
4. Name the new group (for example, `HomeAssistant`).
5. Confirm **Create**.

### Add Group Permissions to all Assets

Assign the role you chose to the group at the root path (**/**) so it applies to all nodes, VMs, and containers.

1. Select **Datacenter**.
2. Select **Permissions**.
3. Open **Add** and select **Group Permission**.
4. For **Path**, select **/**.
5. For **Group**,  select your Home Assistant group (`HomeAssistant`).
6. For **Role**, select the role you want to use, like **PVEAuditor** (monitoring only) or **PVEVMUser** (monitoring plus basic actions).
7. Make sure **Propagate** is checked.
8. Confirm **Create**.

### Create a user for Home Assistant

Using the `pve` realm helps limit the account to API access, instead of Linux system authentication and remote (SSH) command line access.

{% important %}
If you plan to use the `pve` realm, make sure you select it during user creation and use the `@pve` suffix in Home Assistant (like `hass@pve`).
{% endimportant %}

1. Select **Datacenter**.
2. Open **Permissions** and select **Users**.
3. Select **Add**.
4. Enter a username (for example,`hass`).
5. Set the realm to **Proxmox VE authentication server** for `pve` (or **Linux PAM standard authentication** for `pam`).
6. Enter a secure password (it can be complex as you will only need to copy/paste it into your Home Assistant configuration).
7. Select the group just created earlier (`HomeAssistant`) to grant access to Proxmox.
8. Ensure **Enabled** is checked and **Expire** is set to "never" (for example, leave it blank).
9. Confirm **Add**.

## Entities

### Sensor

- **CPU**: Percentage of CPU usage.
- **Max CPU**: Maximum amount of CPU on the node/VM/LXC.
- **Disk**: Disk usage of the node/VM/LXC.
- **Max disk**: Maximum amount of available disk space.
- **Memory**: Amount of memory usage.
- **Max memory**: Maximum amount of memory on the node/VM/LXC.
- **Status**: Current status of the node/VM/LXC.

### Binary sensor

The integration will automatically create a binary sensor for each tracked virtual machine or container. The binary sensor will either be on if the VM state is running or off if the VM state is different.

The created sensor will be called `binary_sensor.NODE_NAME_VMNAME_running`.

### Button

- **Start**: Starts a node/VM/LXC.
- **Start all**: Starts all VMs and LXCs known on a node.
- **Stop**: Stops a node/VM/LXC.
- **Stop all**: Stops all VMs and LXCs known on a node.
- **Restart**: Restarts a VM/LXC.
- **Reboot**: Reboots a node.
- **Shutdown**: Shuts a node down.
- **Hibernate**: Puts a VM in hibernation; only available to VMs.
- **Reset**: Resets a VM; only available to VMs.

## Troubleshooting

### Buttons not working

If you want to use the `button` entities to control power actions (start/stop/reboot and similar actions), the Proxmox VE user must have the required privileges for those actions (for example, `VM.PowerMgmt` on the relevant path).  If monitoring works but button presses fail, assign a more permissive role (or create a custom role) and try again.

### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the following steps to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
3. You can inspect the downloaded file or, when requested, upload it to your issue report.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant. Remember to clean up your Proxmox permissions.

{% include integrations/remove_device_service.md %}
