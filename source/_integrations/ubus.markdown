---
title: OpenWrt (ubus)
description: Instructions on how to integrate OpenWRT routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.7.6
ha_iot_class: Local Polling
ha_domain: ubus
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This is a presence detection scanner for [OpenWrt](https://openwrt.org/) using [ubus](https://openwrt.org/docs/techref/ubus). It scans for changes in `hostapd.*`, which will detect and report changes in devices connected to the access point on the router.

Before this scanner can be used, you have to install the ubus RPC packages on OpenWrt (versions older than 18.06.x do not require the `uhttpd-mod-ubus` package):

```bash
opkg update
opkg install rpcd-mod-file uhttpd-mod-ubus
```

Add a new system user `hass` (or do it in any other way that you prefer):

- Add line to /etc/passwd: hass:x:10001:10001:hass:/var:/bin/false
- Add line to /etc/shadow: hass:x:0:0:99999:7:::

Edit the `/etc/config/rpcd` and add the following lines:

```yaml
config login
        option username 'hass'
        option password '$p$hass'
        list read hass
        list read unauthenticated
        list write hass
```

Then, create an ACL file at `/usr/share/rpcd/acl.d/hass.json` for the user `hass`:

```json
{
  "hass": {
    "description": "Access role for OpenWrt ubus integration",
    "read": {
      "ubus": {
        "hostapd.*": ["get_clients"],
        "uci": ["get"]
      }
    },
    "write": {}
  }
}
```

Restart the services. This ACL file needs to be recreated after updating/upgrading your OpenWrt firmware.

```bash
# /etc/init.d/rpcd restart && /etc/init.d/uhttpd restart
```

Check if the `file` namespaces is registered with the RPC server.

```bash
# ubus list | grep file
file
```

After this is done, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ubus
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges, usually `root`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
dhcp_software:
  description: "The DHCP software used in your router: `dnsmasq`, `odhcpd`, or `none`."
  required: false
  default: dnsmasq
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

## Troubleshooting

If you find that this never creates `known_devices.yaml`, or if you need more information on the communication chain between Home Assistant and OpenWrt, follow these steps to grab the packet stream and gain insight into what's happening.

### Increase log level

1. On your Home Assistant device, stop Home Assistant
2. Adjust {% term "`configuration.yaml`" %} to log more detail for the `device_tracker` integration.

    ```yaml
    logger:
      default: warn
      logs:
        homeassistant.components.device_tracker: debug
    ```

3. In another window, tail the logfile in the configuration directory:

    ```bash
    tail -f home-assistant.log  | grep device_tracker
    ```

4. If you see a Python stack trace like the following, check your configuration for correct username/password.

    ```txt
    17-04-28 10:43:30 INFO (MainThread) [homeassistant.loader] Loaded device_tracker from homeassistant.components.device_tracker
    17-04-28 10:43:30 INFO (MainThread) [homeassistant.loader] Loaded device_tracker.ubus from homeassistant.components.device_tracker.ubus
    17-04-28 10:43:30 INFO (MainThread) [homeassistant.setup] Setting up device_tracker
    17-04-28 10:43:31 INFO (MainThread) [homeassistant.components.device_tracker] Setting up device_tracker.ubus
    17-04-28 10:43:31 ERROR (MainThread) [homeassistant.components.device_tracker] Error setting up platform ubus
      File "/opt/homeassistant/venv/lib/python3.4/site-packages/homeassistant/integrations/device_tracker/__init__.py", line 152, in async_setup_platform
      File "/opt/homeassistant/venv/lib/python3.4/site-packages/homeassistant/integrations/device_tracker/ubus.py", line 36, in get_scanner
      File "/opt/homeassistant/venv/lib/python3.4/site-packages/homeassistant/integrations/device_tracker/ubus.py", line 58, in __init__
      File "/opt/homeassistant/venv/lib/python3.4/site-packages/homeassistant/integrations/device_tracker/ubus.py", line 156, in _get_session_id
      File "/opt/homeassistant/venv/lib/python3.4/site-packages/homeassistant/integrations/device_tracker/ubus.py", line 147, in _req_json_rpc
    17-04-28 10:43:31 INFO (MainThread) [homeassistant.core] Bus:Handling <Event service_registered[L]: domain=device_tracker, service=see>
    17-04-28 10:43:31 INFO (MainThread) [homeassistant.core] Bus:Handling <Event component_loaded[L]: component=device_tracker>
    ```

5. If you see lines like the following repeated at intervals that correspond to the check interval from the configuration (12 seconds by default), then Home Assistant is correctly polling the router, and you'll need to look at what the router is sending back.

    ```txt
    17-04-28 10:50:34 INFO (Thread-7) [homeassistant.components.device_tracker.ubus] Checking ARP
    ```

### Inspect packets with TCPDump

_These steps require that `tcpdump` is installed on your Home Assistant device, and that you have a utility such as [Wireshark](https://www.wireshark.org) for viewing the packets. It also assumes that Home Assistant is communicating with your router over HTTP and not HTTPS._

1. On your Home Assistant device, stop Home Assistant
2. In another shell on your Home Assistant device, start tcpdump

    ```bash
    sudo tcpdump -nnvXSs 0 -w /var/tmp/dt.out 'host <router_ip> and port 80'
    ```

     - In this example we are only looking for traffic to or from port 80, and we are writing the packet stream out to `/var/tmp/dt.out`

3. Start Home Assistant
4. After a few seconds you should see a line like `Got xx` where `xx` is an incrementing number. This indicates that it has captured packets that match our filter. After you see this number increment a few times (>20), you can hit `Ctrl-C` to cancel the capture.
5. Transfer `/var/tmp/dt.out` to the machine where you're running Wireshark and either drag/drop it onto the Wireshark window or use File/Open to open the capture file.
6. In the window that opens, look for the first line that reads `POST /ubus`. Right click on this line, choose Follow and then HTTP Stream to view just the HTTP stream for this connection.
7. The first `POST` will show Home Assistant logging into ubus and receiving a session identifier back. It will look something like this:

    ```txt
    POST /ubus HTTP/1.1
    Host: 10.68.0.1
    Accept: */*
    User-Agent: python-requests/2.13.0
    Connection: keep-alive
    Accept-Encoding: gzip, deflate
    Content-Length: 161

    {"jsonrpc": "2.0", "params": ["00000000000000000000000000000000", "session", "login", {"password": "<password>", "username": "root"}], "method": "call", "id": 1}

    HTTP/1.1 200 OK
    Content-Type: application/json
    Transfer-Encoding: chunked
    Connection: keep-alive

    {"jsonrpc":"2.0","id":1,"result":[0,{"ubus_rpc_session":"8b4e1632389fcfd09e96a792e01c332c","timeout":300,"expires":300,"acls":{"access-group":{"unauthenticated":["read"],"user":["read"]},"ubus":{"*":["*"],"session":["access","login"]},"uci":{"*":["read"]}},"data":{"username":"root"}}]}
    ```

8. In the response above, the portion that reads `"result":[0,` indicates that ubus accepted the login without issue. If this is not `0`, search online for what ubus status corresponds to the number you're receiving and address any issues that it brings to light.
9. Otherwise, back in the main Wireshark window click the `x` in the right side of the filter bar where it reads `tcp.stream eq 0`. Scroll down until you find the next `POST /ubus` line and view the HTTP stream again. This request is Home Assistant actually requesting information and will look something like the following:

    ```txt
    POST /ubus HTTP/1.1
    Host: 10.68.0.1
    Accept: */*
    User-Agent: python-requests/2.13.0
    Connection: keep-alive
    Accept-Encoding: gzip, deflate
    Content-Length: 114

    {"jsonrpc": "2.0", "params": ["8b4e1632389fcfd09e96a792e01c332c", "hostapd.*", "", {}], "method": "list", "id": 1}

    HTTP/1.1 200 OK
    Content-Type: application/json
    Transfer-Encoding: chunked
    Connection: keep-alive

    {"jsonrpc":"2.0","id":1,"result":{}}
    ```

10. In this case we are actually receiving a valid response with no data. The request says that we are looking for ARP information from `hostapd.*`, which is the access point on the router. In my environment I don't use the AP on the router, and so it was correctly returning no data. Armed with this information, I know that I cannot use this integration for device tracking or presence.

### Cleanup

When you're done troubleshooting, remember to reset your logging configuration and delete any capture files that contain sensitive information.
