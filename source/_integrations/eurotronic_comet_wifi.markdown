---
title: Eurotronic Comet WiFi
description: Instructions on how to integrate Eurotronic Comet WiFi thermostats into Home Assistant through your own MQTT broker.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: '2026.10'
ha_config_flow: true
ha_codeowners:
  - '@zerog981'
ha_domain: eurotronic_comet_wifi
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - climate
related:
  - docs: /integrations/mqtt/
    title: MQTT integration
  - url: https://pypi.org/project/comet-wifi-communicator/
    title: comet-wifi-communicator setup tool
---

The **Eurotronic Comet WiFi** {% term integration %} is used to control [Eurotronic](https://eurotronic.org) Comet WiFi thermostats from Home Assistant.

You can use this {% term integration %} to control your thermostats and read their temperature. The thermostats communicate via MQTT with a local MQTT broker, so everything stays inside your local network - no cloud and no manufacturer app involved.

{% important %}
Read this before you buy or reconfigure anything:

- **The thermostats need your own MQTT broker.** Out of the box they only talk to the manufacturer's cloud. Each thermostat has to be reconfigured once, with the [`comet-wifi-communicator`](https://pypi.org/project/comet-wifi-communicator/) setup tool, to use a broker in your network instead. See [Setting up the thermostats](#setting-up-the-thermostats).
- **The Mosquitto broker app cannot accept the thermostats directly.** The thermostats connect anonymously, without a username or password, and the app refuses anonymous clients by design. You need a separate broker that allows for anonymous connections. It can be bridged into the app, so Home Assistant keeps using its existing broker. See [Setting up the broker](#setting-up-the-broker).
- **A reconfigured thermostat no longer works with the Eurotronic Smart Living app.** Schedules made in the app are lost. To go back to the app, reset the thermostat and set it up with the app again.
{% endimportant %}

## Supported devices

- Eurotronic Comet WiFi (tested up to firmware version 5.8)

## Prerequisites

1. The [MQTT](/integrations/mqtt/) integration is set up and connected to a broker.
2. A broker that allows for anonymous connections, reachable from Home Assistant's broker. See [Setting up the broker](#setting-up-the-broker).
3. Each thermostat is reconfigured with the [`comet-wifi-communicator`](https://pypi.org/project/comet-wifi-communicator/) setup tool. See [Setting up the thermostats](#setting-up-the-thermostats).
4. The MAC address of each thermostat. Either see the output of the setup tool or look it up in your router after the thermostat is connected.

### Setting up the broker

The thermostats cannot authenticate, so they need a broker that accepts anonymous connections. Unfortunately, the Mosquitto broker app does not allow this by design. There are two ways to solve this. Be aware of the security implications.

#### Option 1: Bridge a second broker into the Mosquitto app (recommended)

Keep the Mosquitto broker app for Home Assistant and everything else, and run a second, minimal Mosquitto broker for the thermostats only. That broker forwards the thermostat topics (`01/#`) to the app in both directions, as a **bridge**. Home Assistant and your other MQTT devices stay untouched.

The second broker has to run somewhere in your network: a Docker container on a NAS or any always-on computer, or a separate small board like a Raspberry Pi Zero. Home Assistant OS cannot run it itself.

1. Set up the Home Assistant Mosquitto app ({% my supervisor title="**Settings** > **Apps**" %}).
2. Go to {% my supervisor title="**Settings** > **Apps**" %}, select the Mosquitto broker and go to Configuration. Under logins, add another login, for example `comet_bridge`.
3. On the second broker (the one running on another device) the exact configuration depends on the choice of broker and installation method. For the Docker version of mosquitto, create a folder with the following two config files:

   `mosquitto.conf`:

   ```text
   # Listener for the thermostats (anonymous), restricted by the ACL
   listener 1883
   allow_anonymous true
   acl_file /mosquitto/config/acl

   # Bridge the thermostat topics into the Home Assistant broker
   connection homeassistant
   address HOME_ASSISTANT_IP:1883
   remote_username comet_bridge
   remote_password BRIDGE_USER_PASSWORD
   remote_clientid comet_bridge
   topic 01/# both 0
   cleansession true
   notifications false
   ```

   `acl`:

   ```text
   # Anonymous clients may only use the thermostat topics
   topic readwrite 01/#
   ```

4. Start the broker:

   ```bash
   docker run -d --name comet-broker --restart unless-stopped -p 1883:1883 \
     -v /PATH/TO/THE/FOLDER:/mosquitto/config eclipse-mosquitto
   ```

5. Note the IP address of the computer running this broker. This is the address the thermostats are set up with in the next section, **not** the address of Home Assistant.

#### Option 2: Use one anonymous broker for everything

If you do not use the Mosquitto broker app, run a single Mosquitto broker that accepts the thermostats anonymously, and point the [MQTT](/integrations/mqtt/) integration at it.

`mosquitto.conf`:

```text
listener 1883
allow_anonymous true
password_file /mosquitto/config/passwd
acl_file /mosquitto/config/acl
persistence true
persistence_location /mosquitto/data/
```

`acl`:

```text
# Anonymous clients may only use the thermostat topics
topic readwrite 01/#

# Home Assistant has full access
user homeassistant
topic readwrite #
```

Create the Home Assistant user with `mosquitto_passwd -c /mosquitto/config/passwd homeassistant`, and use that username and password in the MQTT integration.

#### Security notes

Anyone who can reach the anonymous broker can read the room temperatures and change the setpoints of all thermostats. The thermostats cannot be given credentials, so the ACL is all that limits an unknown client. Therefore:

- Never expose the anonymous broker to the internet. No port forwarding for port 1883.
- Prefer a dedicated IoT network or VLAN for the thermostats and the broker, and restrict the broker's port to the thermostats and Home Assistant with a firewall.
- Keep the ACL: it restricts anonymous clients to the thermostat topics and keeps them away from everything else on the broker.

### Setting up the thermostats

Every thermostat has to be reconfigured once with the [`comet-wifi-communicator`](https://pypi.org/project/comet-wifi-communicator/) setup tool. This is done from a computer with Wi-Fi connected to the thermostat's hotspot. The tool needs Python 3.12 or newer, or [pipx](https://pipx.pypa.io/) or [uv](https://docs.astral.sh/uv/), and can run without installing anything permanently.

{% warning %}
Reconfiguring the thermostat is not a documented function of the device, and a reconfigured thermostat cannot be used with the manufacturer's app anymore until it is reset. Proceed at your own risk.
{% endwarning %}

1. Run the setup tool once to fetch it with internet connection (for other usage methods see the [`comet-wifi-communicator` documentation](https://pypi.org/project/comet-wifi-communicator/)):

   ```bash
   pipx run comet-wifi-communicator setup --help
   ```

2. Reset the thermostat. This erases everything stored on it, including schedules.
   1. With a pin, press and hold the reset button in the battery tray until the display turns off, then release it.
   2. Remove the batteries and insert them again.
   3. After a few seconds the display shows `PA` and the Wi-Fi symbol blinks.
3. Connect your computer to the thermostat's Wi-Fi hotspot `Comet Wifi` with the password `11223344`.
4. Run the setup tool. Use the IP address of the broker from [Setting up the broker](#setting-up-the-broker) and the name of the Wi-Fi network the thermostat should join:

   ```bash
   pipx run comet-wifi-communicator setup --wifi-ssid YOUR_WIFI_SSID --mqtt-server-ip BROKER_IP
   ```

   The tool asks for the Wi-Fi password, sends the configuration, and prints the thermostat's MAC address. Note it down as you need it to add the thermostat to Home Assistant.
5. Reconnect your computer to your own network. The thermostat closes its hotspot and joins the network you named.

{% include integrations/config_flow.md %}

{% configuration_basic %}
MAC address:
  description: "The MAC address of the thermostat, for example `12:34:56:78:9A:BC`. The integration checks that the thermostat answers on the broker before the entry is created."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device per thermostat with a single {% term entity %}.

### Climate

- **Current temperature**: the room temperature measured by the thermostat.
- **Target temperature**: the setpoint, from 8°C to 28°C in steps of 0.5°C.
- **HVAC modes**:
  - **Heat**: the thermostat regulates to the target temperature. Turning the thermostat on restores the last target temperature it was heating to, or 16°C if none is known yet.
  - **Off**: the valve is closed.

## Data updates

The integration {% term polling polls %} each thermostat every 15 minutes. After a command from Home Assistant, the thermostat is polled again right away, so the new state shows after a few seconds. A setpoint turned by hand on the thermostat is picked up with the next regular poll.

The thermostats regularly check that something is listening on the broker. The integration answers these checks, which keeps the thermostat online. If Home Assistant is not running, the thermostats will behave the same way as if the manufacturer cloud is offline.

## Known limitations

- Data is only polled every 15 minutes to keep battery usage low. Therefore, a manual setpoint change is not picked up immediately. This is planned to be fixed in a future version.
- Weekly schedules, holiday mode, key lock, the temperature offset, and the battery level of the thermostat are not available in Home Assistant yet.
- The thermostat has no authentication, so its broker must accept anonymous clients. See [Security notes](#security-notes).
- The thermostat talks to one broker only, by IPv4 address. Host names, IPv6, and TLS are not supported by the device.
- A thermostat that is set up for Home Assistant cannot be used with the Eurotronic Smart Living app at the same time.
- Each thermostat has to be added by its MAC address. An automatic discovery feature is planned for a future release.

## Troubleshooting

### The setup dialog says the MQTT integration is not set up or not connected

The integration relies on the [MQTT](/integrations/mqtt/) integration for the connection to the broker. Set it up first, or check its broker settings.

### Failed to connect

The thermostat did not answer on the broker within a few seconds. Check, in this order:

1. The thermostat is on your Wi-Fi network: it shows the Wi-Fi symbol steadily, and your router lists it.
2. The thermostat reaches the anonymous broker. Subscribe to `01/#` on that broker, for example with `mosquitto_sub -h BROKER_IP -t '01/#' -v`. Messages appear when the thermostat connects and then from time to time. If nothing appears, reconfigure the thermostat with the setup tool and check that you used the anonymous broker's IP address.
3. The messages also arrive on the broker Home Assistant uses. With the bridge from option 1, subscribe on the Mosquitto broker app with a valid user. If nothing arrives there, check the bridge settings, the bridge user's password, and the app's log.
4. The MAC address you entered is the one from the topics.

### The thermostat becomes unavailable

When a thermostat disconnects from the broker, for example because its batteries are empty or the Wi-Fi dropped, the integration marks it unavailable at the next poll, at most 15 minutes later. It also becomes unavailable when it does not answer a poll. Check the batteries and the Wi-Fi signal at the radiator. After a broker restart, the thermostat reconnects on its own within a few minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The thermostats keep working with their last setpoint and keep talking to your broker. To use a thermostat with the Eurotronic Smart Living app again, reset it as described in [Setting up the thermostats](#setting-up-the-thermostats) and follow the manufacturer's setup guide.
