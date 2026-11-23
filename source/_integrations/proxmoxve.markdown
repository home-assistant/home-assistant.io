---
description: Access your ProxmoxVE instance in Home Assistant.
ha_release: 0.103
ha_domain: proxmoxve
related:
  - docs: /docs/configuration/
    title: Configuration file
---

[Proxmox VE](https://www.proxmox.com/en/) is an open-source server virtualization environment. This integration lets you monitor your Proxmox VE nodes, virtual machines, and containers in Home Assistant, and exposes control actions (if your Proxmox permissions allow it).

## Supported devices

The integration is tested with the latest version of Proxmox VE (currently Proxmox VE 9), both on a standalone node and in a cluster. Earlier versions should also work, because the integration uses the Proxmox VE API, which has been available since Proxmox VE 2.0. Some features need a more recent version. For details, see [Known limitations](#known-limitations).

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

Home Assistant only creates the entities your Proxmox VE user has privileges for. The privileges you need depend on what you want to do:

- Monitor nodes, VMs, containers, and storages: the `PVEAuditor` role.
- Start, stop, and restart VMs and containers: `VM.PowerMgmt`, included in the `PVEVMUser` role.
- Create snapshots: `VM.Snapshot`, included in the `PVEVMAdmin` role.
- Restart and shut down nodes: `Sys.PowerMgmt`.
- Show updates for nodes: `Sys.Modify`.

`PVEVMUser` and `PVEVMAdmin` do not include `Sys.Audit`, which the node sensors need, so assign them together with `PVEAuditor`. `Sys.PowerMgmt` and `Sys.Modify` are only included in the `Administrator` role. To use them without full access, create a custom role with only the privileges you need.

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
6. For **Role**, select the role you want to use, like **PVEAuditor** (monitoring only).
7. Make sure **Propagate** is checked.
8. Confirm **Create**.
9. To add another role, like **PVEVMUser**, repeat these steps.

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

## Supported functionality

The integration creates a device for each node, VM, container, and storage, and adds new ones automatically. Each device page links to the matching page in the Proxmox VE web interface.

Some entities are not enabled by default. You can enable them from the device page.

### Sensors

- **CPU usage**: Percentage of CPU usage of the node/VM/LXC.
- **Max CPU**: Number of CPUs of the node/VM/LXC.
- **Disk usage** and **Max disk usage**: Disk space in use and total disk space of the node/VM/LXC.
- **Memory usage** and **Memory usage percentage**: The amount of memory in use, and the percentage of memory in use, on the node/VM/LXC.
- **Max memory usage**: Total amount of memory of the node/VM/LXC.
- **Network input** and **Network output**: Amount of incoming and outgoing network traffic since the VM/LXC started.
- **Status** (node): Shows whether the node is **Online** or **Offline**.
- **Status** (VM/LXC): Shows whether the VM/LXC is **Running**, **Stopped**, or **Suspended**.
- **Uptime**: Time since the node/VM/LXC started.
- **Last backup** and **Backup duration**: Time and duration of the last backup on the node. Shows **Unknown** if no backups exist.
- **Used storage**: Space in use on a storage.
- **Available storage**: Free space on a storage.
- **Total storage**: Total size of a storage.
- **Storage usage percentage**: Percentage of the storage that is in use.

### Binary sensors

- **Backup status**: for the node. Shows **Problem** if the last backup failed, and **OK** if it was successful or no backup exists.
- **Status**: for each node/VM/LXC. Shows **Running** if the node is online or the VM/LXC is running, and **Not running** for any other state.
- **Storage active**: for each storage. Shows **Active** if the storage is available on the node, or **Inactive** if it is not.
- **Storage enabled**: for each storage. Shows **Enabled** if the storage is enabled in Proxmox VE, or **Disabled** if it is not.
- **Storage shared**: for each storage. Shows **Shared** if the storage is shared between the nodes in a cluster, or **Not shared** if it is local to one node.

### Buttons

Buttons are only created when the Proxmox VE user has the required privileges (see [Choose the right role](#choose-the-right-role)).

- **Create snapshot**: Creates a snapshot of a VM/LXC.
- **Start**: Starts a VM/LXC.
- **Start all**: Starts all VMs and LXCs known on a node.
- **Stop**: Stops a VM/LXC immediately.
- **Stop all**: Stops all VMs and LXCs known on a node.
- **Suspend all**: Suspends all VMs on a node.
- **Restart**: Restarts a node/VM/LXC.
- **Shut down**: Shuts a node/VM down.
- **Pause**: Pauses a VM; only available to VMs.
- **Suspend**: Suspends a VM to disk (hibernation); only available to VMs.
- **Resume**: Resumes a paused VM; only available to VMs.
- **Reset**: Resets a VM; only available to VMs.

{% note %}
**Restart** and **Shut down** stop a system cleanly. **Restart** shuts a VM or LXC down and then starts it again. **Shut down** on a VM sends an ACPI shutdown event to the guest operating system. On a node, these buttons restart or shut down the host.
**Stop** ends a running VM or LXC immediately. It is like pulling the power plug of a running computer and may damage data.
{% endnote %}

### Updates

For each node in your Proxmox VE environment, the update entity shows whether the node is up to date or if a new version is available, including any pending package updates.

## Use cases

- See at a glance on a dashboard whether your nodes, VMs, and containers are running, and how much CPU and memory they use.
- Get notified when a storage is almost full, or when a VM or container is running low on memory.
- Get notified when a backup fails, or when a node has updates available.
- Shut down non-essential VMs when your uninterruptible power supply (UPS) switches to battery, and start them again when the power is back.
- Start a VM only when you need it, such as a game server, and shut it down again at night.
- Create a snapshot of a VM or container on a schedule, so you can go back to an earlier state if something goes wrong.

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

### Alert for a failed backup

This example automation alerts you when the last backup on a node has failed. It uses the **Backup status** binary sensor, which is not enabled by default.

{% example %}
automation: |
  alias: "Proxmox backup failed"
  triggers:
    - trigger: state
      entity_id: binary_sensor.pve1_backup_status
      to: "on"
  actions:
    - action: notify.send_message
      data:
        message: "The last backup on Proxmox node pve1 has failed."
      target:
        entity_id: notify.notifier
{% endexample %}

### Weekly snapshot of a VM

This example automation creates a snapshot of a VM every Sunday night, so you can go back to an earlier state if something goes wrong.

{% example %}
automation: |
  alias: "Proxmox weekly snapshot of database VM"
  triggers:
    - trigger: time
      at: "03:00:00"
      weekday: sun
  actions:
    - action: button.press
      target:
        entity_id: button.databaseserver_create_snapshot
{% endexample %}

{% caution %}
Home Assistant does not remove snapshots. Each time the automation runs, it adds a new snapshot, named `homeassistant_snapshot_` followed by the date and time in UTC. Snapshots take up space on the storage of the VM, so remove old snapshots regularly in Proxmox VE: select the VM, open **Snapshots**, select the snapshot, and select **Remove**.
{% endcaution %}

## Known limitations

- The integration connects to a single host. In a cluster, all nodes are reported through that host, but if that host is down, all entities become unavailable.
- For a node that is offline, no VM, container, storage, backup, or update data can be retrieved.
- Backup entities only reflect the most recent backup (`vzdump`) task of a node.
- The update entity only shows pending updates; installing them must be done in Proxmox VE.
- Snapshots created with the **Create snapshot** button are not removed automatically. VM snapshots do not include the RAM state.
- Not all storage types and data are fully available through the Proxmox VE API.
- The **Suspend all** button requires Proxmox VE 8.1 or later.
- Authentication with an API token requires Proxmox VE 6.2 or later.

## Troubleshooting

{% details "Buttons, node sensors, or the update entity are missing" %}

Home Assistant only creates entities your Proxmox VE user has privileges for. For example, with only the `PVEVMUser` role, a node shows just its status sensor.

1. Check the privileges of your user against [Choose the right role](#choose-the-right-role), and add what is missing in Proxmox VE.
2. Home Assistant reads the privileges when the integration starts. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Proxmox VE**, and reload the integration.

{% enddetails %}

### Diagnostic data

If you need to create an issue to report a bug or want to inspect diagnostic data, use the following steps to retrieve diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration and device.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **Download diagnostics** and a JSON file will be downloaded.
3. You can inspect the downloaded file or, when requested, upload it to your issue report.

## Removing the integration

This integration follows standard integration removal. No extra steps are required within Home Assistant. Remember to clean up your Proxmox permissions.

{% include integrations/remove_device_service.md %}
