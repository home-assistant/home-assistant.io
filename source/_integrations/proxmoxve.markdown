---
title: Proxmox VE
description: Access your ProxmoxVE instance in Home Assistant.
ha_category:
  - Binary sensor
ha_release: 0.103
ha_iot_class: Local Polling
ha_codeowners:
  - '@jhollowe'
  - '@Corbeno'
ha_domain: proxmoxve
ha_platforms:
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Proxmox VE](https://www.proxmox.com/en/) is an open-source server virtualization environment. This integration allows you to poll various data from your instance.

After configuring this {% term integration %}, the binary sensors automatically appear.

## Configuration

{% important %}
You should have at least one VM or container entry configured, else this integration won't do anything.
{% endimportant %}

To use the `proxmoxve` {% term integration %}, add the following configuration to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
proxmoxve:
  - host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
    nodes:
      - node: NODE_NAME
        vms:
          - VM_ID
        containers:
          - CONTAINER_ID
```

{% configuration %}
host:
  description: IP address of the Proxmox VE instance. Can include port by appending ":\<port\>".
  required: true
  type: string
port:
  description: The port number on which Proxmox VE is running.
  required: false
  default: 8006
  type: integer
verify_ssl:
  description: Whether to do strict validation on SSL certificates. If you use a self signed SSL certificate you need to set this to false.
  required: false
  default: true
  type: boolean
username:
  description: The username used to authenticate. Can include the realm by appending "@\<realm\>".
  required: true
  type: string
password:
  description: The password used to authenticate.
  required: true
  type: string
realm:
  description: The authentication realm of the user.
  required: false
  default: pam
  type: string
nodes:
  description: List of the Proxmox VE nodes to monitor.
  required: true
  type: map
  keys:
    node:
      description: Name of the node
      required: true
      type: string
    vms:
      description: List of the QEMU VMs to monitor.
      required: false
      type: list
    containers:
      description: List of the LXC containers to monitor.
      required: false
      type: list
{% endconfiguration %}

Example with multiple VMs, no containers, self-signed certificate and pve realm for the user setup described below:

```yaml
proxmoxve:
  - host: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
    verify_ssl: false
    realm: pve
    nodes:
      - node: NODE_NAME
        vms:
          - VM_ID_1
          - VM_ID_2
```

## Binary sensor

The integration will automatically create a binary sensor for each tracked virtual machine or container. The binary sensor will either be on if the VM's state is running or off if the VM's state is different.

The created sensor will be called `binary_sensor.NODE_NAME_VMNAME_running`.

## Proxmox Permissions

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

1. Click `Datacenter`
2. Open `Permissions` and click `Users`
3. Click `Add`
4. Enter a username (e.g.,` hass`)
5. Set the realm to "Proxmox VE authentication server"
6. Enter a secure password (it can be complex as you will only need to copy/paste it into your Home Assistant configuration)
7. Select the group just created earlier (`HomeAssistant`) to grant access to Proxmox
8. Ensure `Enabled` is checked and `Expire` is set to "never"
9. Click `Add`

In your Home Assistant configuration, use `hass@pve` for the username and your chosen password for the password.
