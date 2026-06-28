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
Authentication Method:
  description: "Authentication source of Proxmox. Default is `PAM`. For a dedicated Home Assistant account, we recommend using the built-in Proxmox VE realm and selecting `PVE` (see [Proxmox permissions](#proxmox-permissions))."
Host:
  description: "The hostname or IP address of your Proxmox VE server. Example: `pve.mydomain.local` or `10.20.30.40`."
Port:
  description: "Port to connect to Proxmox. Default is `8006`."
Username:
  description: "Configured user to authenticate. Example: `hass`."
Verify SSL certificate:
  description: "Enable SSL certificate verification for secure connections."
API token:
  description: "Enable to use an API token or leave disabled to authenticate with a password."
Password:
  description: "When using password authentication: Password associated with the username."
Token ID:
  description: "When using API tokens: The name given to the API token during creation."
Token Secret:
  description: "When using API tokens: The secret generated for the API token."
Realm:
  description: "Only required when you choose the Other option for the **Authentication Method** field: Enter the realm name as defined in Proxmox."
{% endconfiguration_basic %}


## Proxmox permissions

To use Proxmox VE with Home Assistant, start by creating a dedicated user in Proxmox and granting it only the permissions Home Assistant needs. The paragraphs below will guide you through the Proxmox configuration. First, decide which authentication realm to use. If Home Assistant shows **Authentication Method** during setup, choose the matching realm.

You can use any realm as long as you have valid credentials, like a username and password or an API token:

- **PAM**: Reuse an existing Linux user on the Proxmox node.
- **PVE**: Create a Proxmox-only user (recommended).
- **Other**: LDAP, AD, OpenID Connect, or a custom realm. If you choose **Other**, you must enter the realm name manually during setup. See the Authentication Realms section in the [Proxmox User Management](https://pve.proxmox.com/wiki/User_Management) documentation for details.

When using password authentication, Home Assistant will use the format username@realm. In the UI, you typically enter only the username portion.

{% important %}
For security, create a dedicated Proxmox VE user for Home Assistant and grant only the minimum required permissions. We recommend avoiding the root account.
{% endimportant %}

### Choose the right role

The minimum required permissions depend on what you want to do:

- **Monitor only** (sensors and binary sensors): The **Auditor** role (`PVEAuditor`) is typically sufficient.
- **Monitor and control** (button entities like start, stop, reboot): You will need a role that allows those actions, such as **User** (`PVEVMUser`) or another custom role that includes the required privileges.

If you are not sure which privileges you need for control in your Proxmox VE setup, start with `PVEVMUser`, confirm everything works, and then tighten the permissions by switching to a custom role. If you want full but responsible control start with `PVEVMAdmin`.

### Create a Home Assistant group

Before creating the user, you need to create a group for the user.
Privileges can be either applied to Groups or Roles.

{% details "Group instructions" %}

1. Select **Datacenter**.
2. Open **Permissions** and select **Groups**.
3. Select the **Create** button above all the existing groups.
4. Name the new group (for example, `HomeAssistant`).
5. Confirm **Create**.

{% enddetails %}

### Add Group Permissions to all Assets

Assign the role you chose to the group at the root path (**/**) so it applies to all nodes, VMs, and containers.

{% details "Permissions instructions" %}

1. Select **Datacenter**.
2. Select **Permissions**.
3. Open **Add** and select **Group Permission**.
4. For **Path**, select **/**.
5. For **Group**, select your Home Assistant group (`HomeAssistant`).
6. For **Role**, select the role you want to use, like **PVEAuditor** (monitoring only) or **PVEVMUser** (monitoring plus basic actions).
7. Make sure **Propagate** is checked.
8. Confirm **Create**.

{% enddetails %}

### Create a user for Home Assistant

Using the `PVE` realm helps limit the account to API access, instead of Linux system authentication and remote (SSH) command line access.

{% important %}
If you plan to use the `PVE` realm, make sure you select it during user creation.
{% endimportant %}

{% details "User instructions" %}

1. Select **Datacenter**.
2. Open **Permissions** and select **Users**.
3. Select **Add**.
4. Enter a username (for example,`hass`). You don't need to add the realm, just the username.
5. Set the realm to **Proxmox VE authentication server** for `PVE` (or **Linux PAM standard authentication** for `PAM`).
6. Enter a secure password (it can be complex as you will only need to copy/paste it into your Home Assistant configuration).
7. Select the group just created earlier (`HomeAssistant`) to grant access to Proxmox.
8. Ensure **Enabled** is checked and **Expire** is set to "never" (for example, leave it blank).
9. Confirm **Add**.

{% enddetails %}

### API tokens

Optional: You can authenticate using an API token instead of a password. This is recommended because it gives you a separate, revocable credential for Home Assistant, and avoids storing your Proxmox password in Home Assistant. To limit the token to only the permissions Home Assistant needs, make sure you enable privilege separation and assign token-specific permissions.

{% details "API token instructions" %}

To create a token:

1. Select **Datacenter**.
2. Open **Permissions** and select **API tokens**.
3. Select **Add**.
4. Select the **User** the token will belong to.
5. Enter a **Token ID** (for example `hass`). This is the value you will enter as **Token ID** during configuration.
6. Choose whether to enable **Privilege Separation**.

   - Checked: you can assign specific permissions to the token.
   - Unchecked: the token inherits all permissions of the user.
7. (Optional) Set an **Expire** date. When the token expires, you will need to re-authenticate.
8. Select **Add**.
9. Copy the **Secret** shown in the dialog. It will be displayed only once, so either use it while configuring or store it safely.
10. Close the dialog when ready.

{% enddetails %}

## Entities

Some entities are not enabled by default, you can enable them via the device page.

### Sensor

- **CPU**: Percentage of CPU usage.
- **Max CPU**: Maximum amount of CPU on the node/VM/LXC.
- **Disk**: Disk usage of the node/VM/LXC.
- **Last backup** & **Backup duration**: Time and duration of the last backup on the node. Returns `unknown` if no backups exist.
- **Max disk**: Maximum amount of available disk space.
- **Memory** & **Memory percentage**: The amount of memory in use, and the percentage of memory in use, on the node/VM/LXC.
- **Max memory**: Maximum amount of memory on the node/VM/LXC.
- **Network input**: Amount of incoming network traffic since starting the VM/LXC.
- **Network output**: Amount of outgoing network traffic since starting the VM/LXC.
- **Uptime**: Time since the node/VM/LXC started.

### Binary sensor

- **Backup status**: for the node. This will be **on** if the last backup was successful or **off** for any other state.
- **Status**: for each VM/LXC. This will be **on** if the state is running or **off** for any other state.

### Button

- **Create snapshot**: Creates a snapshot of a VM/LXC.
- **Start**: Starts a node/VM/LXC.
- **Start all**: Starts all VMs and LXCs known on a node.
- **Stop**: Stops a node/VM/LXC.
- **Stop all**: Stops all VMs and LXCs known on a node.
- **Restart**: Restarts a VM/LXC.
- **Reboot**: Reboots a node.
- **Shutdown**: Shuts a node/VM down.
- **Hibernate**: Puts a VM in hibernation; only available to VMs.
- **Reset**: Resets a VM; only available to VMs.

{% note %}
For VMs or LXCs:
**Reboot** and **Shutdown** will attempt to perform a graceful action (if you have the guest agent installed). On a node this will attempt the graceful shutdown of every VM/LXC.
**Restart** and **Stop**/**Stop all** will stop a running system immediately. In other words, it is like pulling the power plug of a running computer.
{% endnote %}

## Data updates

Data is {% term polling polled %} from devices every 60 seconds.

## Examples

### Alert for offline VM

This example automation will alert you if a critical VM is  offline beyond a reasonable time.

{% example %}
automation: |
  alias: "Proxmox Database VM Offline Alert"
  triggers:
    - trigger: state
      entity_id: binary_sensor.databaseserver_status
      from: "on"
      to: "off"
      for:
        minutes: 15
  actions:
    - action: notify.send_message
      metadata: {}
      data:
        message: "The Database Server VM has been offline for over 15 minutes."
      target:
        entity_id: notify.notifier
{% endexample %}

## Known limitations

Unfortunately not all storage types and data are exposed fully via the ProxmoxVE API.

## Troubleshooting

### Buttons not working

If you want to use the `button` entities to perform actions on your node(s), additional privileges may be required:
- For actions related to power, such as start, stop, or reboot, the Proxmox VE user must have the power-management privilege `VM.PowerMgmt`, or role `PVEVMUser`.
- To create snapshots, the privilege `VM.Snapshot` is required, or role `PVEVMAdmin`.
If monitoring works (for example, sensors provide relevant information) but button presses fail, assign a more permissive role or create a custom role and try again.

### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the following steps to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
3. You can inspect the downloaded file or, when requested, upload it to your issue report.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant. Remember to clean up your Proxmox permissions.

{% include integrations/remove_device_service.md %}
