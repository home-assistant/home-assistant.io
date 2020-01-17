---
title: Asuswrt
description: Instructions on how to integrate Asuswrt into Home Assistant.
logo: asus.png
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_release: 0.83
ha_iot_class: Local Polling
ha_codeowners:
  - '@kennedyshead'
---

The `asuswrt` integration is the main integration to connect to a [ASUSWRT](https://event.asus.com/2013/nw/ASUSWRT/) based router.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The asuswrt platform offers presence detection by looking at connected devices to a ASUSWRT based router.
- **Sensor** - The asuswrt sensor platform allows you to get upload and download data from your ASUSWRT within Home Assistant.

## Configuration

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
asuswrt:
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
```

{% configuration %}
host:
  description: "The IP address of your router, e.g., `192.168.1.1`."
  required: true
  type: string
username:
  description: "The username of a user with administrative privileges, usually `admin`."
  required: true
  type: string
password:
  description: "The password for your given admin account (use this if no SSH key is given)."
  required: false
  type: string
protocol:
  description: "The protocol (`ssh` or `telnet`) to use."
  required: false
  type: string
  default: ssh
port:
  description: SSH port to use.
  required: false
  type: integer
  default: 22
mode:
  description: "The operating mode of the router (`router` or `ap`)."
  required: false
  type: string
  default: router
ssh_key:
  description: The path to your SSH private key file associated with your given admin account (instead of password).
  required: false
  type: string
require_ip:
  description: If the router is in access point mode.
  required: false
  type: boolean
  default: true
sensors:
  description: List of enabled sensors
  required: false
  type: list
  keys:
    "upload":
      description: TX upload sensor
    "download":
      description: RX download sensor
    "download_speed":
      description: download mbit/s sensor
    "upload_speed":
      description: upload mbit/s sensor
{% endconfiguration %}

<div class='note warning'>

You need to enable telnet on your router if you choose to use `protocol: telnet`.

</div>

### Example Sensor Configuration

To enable ASUSWRT sensors as part of your installation, reference the following example configuration:

```yaml
# Example configuration.yaml entry
asuswrt:
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  ssh_key: /config/id_rsa
  sensors:
    - upload
    - download
    - upload_speed
    - download_speed
```

The example above, creates the following sensors:

- sensor.asuswrt_download (unit_of_measurement: Gigabyte - *Daily accumulation*)
- sensor.asuswrt_download_speed (unit_of_measurement: Mbit/s)
- sensor.asuswrt_upload (unit_of_measurement: Gigabyte - *Daily accumulation*)
- sensor.asuswrt_upload_speed (unit_of_measurement: Mbit/s)


## Padavan custom firmware (The rt-n56u project)

The [rt-n56u project](https://bitbucket.org/padavan/rt-n56u) does not store `dnsmasq.leases` which is used to track devices at `/var/lib/misc/` as `asuswrt` do. However this integration can still be used for the rt-n56u project by linking `dnsmasq.leases` during the boot process of the router.

Follow these steps to setup the link.

1. SSH or Telnet into the router. (default ssh admin@my.router)
2. Run the following command to find the file:

```bash
$ find / -name "dnsmasq.leases"
```
3. Copy or remember the full path of, example: `/tmp/dnsmasq.leases`
4. Create the folder if it does not exist:

```bash
$ mkdir -p /var/lib/misc
```
5. Add the linking process to the routers started script (one line):

```bash
$ echo "/bin/ln -s /tmp/dnsmasq.leases /var/lib/misc/dnsmasq.leases" >> /etc/storage/started_script.sh
```

6. Reboot the router or link the file:

```bash
$ /bin/ln -s /tmp/dnsmasq.leases /var/lib/misc/dnsmasq.leases
```

The started script is also accessible and editable in the Router's web interface. `Advanced Settings -> Customization -> Scripts -> Custom User Script -> Run After Router Started`
