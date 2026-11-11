---
title: Visonic Security System
description: Connect a Visonic PowerMax or PowerMaster alarm panel to Home Assistant.
ha_release: 2026.11
ha_categories:
  - security_safety.alarm_systems
ha_platforms:
  - alarm_control_panel
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: bronze
ha_codeowners:
  - '@davesmeghead'
ha_domain: visonic
ha_integration_type: hub
---

The **Visonic Security System** {% term integration %} connects a compatible Visonic alarm panel to Home Assistant. Depending on your panel and interface hardware, you can connect locally over Ethernet or serial, or connect through the Visonic cloud service.

[Visonic](https://www.visonic.com) is a global developer and manufacturer of wireless intrusion alarm systems. In addition, they often supply white-labeled or rebranded alarm equipment to major security providers like **ADT**, which rebrands them under their own name. Visonic itself operates as a brand under Johnson Controls (following Tyco's acquisition of Visonic).

The {% term integration %}, in this initial release, creates an alarm control panel to arm and disarm your panel. The commands available depend on the connection mode, panel configuration, and the options you select during setup. The integration creates one alarm control panel entity per configured panel, multiple panels are supported. For partitioned panels, this entity reports the combined state and sends arm and disarm commands to all partitions. Separate partition entities and individual partition control are not available.

## Prerequisites

### Cloud connection

Cloud access is available for PowerMaster panels with a PowerLink 3.1 hardware module and a working Visonic Go account. For a cloud connection you will need your Visonic cloud login details and the panel user code. PowerMaster 10 and 30 panels are known to work, PowerMaster 33 and 360/360R panels should also work but have not been tested.

For cloud connections you will notice that as you arm or disarm the panel, the alarm control panel state in Home Assistant does not change for a period of time. The alarm control panel state in Home Assistant represents the actual panel state as reported back from the panel itself via the cloud. As you arm or disarm the panel, the panel changes state quickly, it is the status return that takes time.

<p class="img">
  <img src="/images/integrations/visonic/PowerMaster10_powerlink2.jpg"
       alt="PowerMaster 10 with PowerLink 3.1 module, Ethernet to a Visonic cloud server"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  PowerMaster 10 with PowerLink 3.1 module, Ethernet to a Visonic cloud server
</p>


### Local connection

For a local connection using:

- Ethernet (wired or Wi-Fi), you will need a compatible network interface or TCP-to-serial bridge that exposes the panel connection. The device must have a TCP stream server with a local Ethernet address and port to connect to. This {% term integration %} connects to the device's address and port. An example is an ESP32 device with [ESPHome](/integrations/esphome/) and a configured TCP stream server (currently a third-party ESPHome library).
- Serial, use one of the following:
   - You will need a serial interface (wired) directly from the panel and attached to the Home Assistant host (USB-to-TTL UART adapter), or
   - An [ESPHome serial proxy](/integrations/esphome/#about-esphome-remote-adapters-proxies) configured for the panel via Ethernet. This is a popular choice, using an ESP32 device with ESPHome and a `serial_proxy` connection.

Local connections require additional hardware and access to the connector inside your panel. For ESPHome, you also need to configure a TCP stream server or `serial_proxy`. Before connecting hardware, verify the connector pinout and electrical requirements for your panel model and board revision.

Local communication may conflict with other modules that communicate with the panel, including GSM modules. Arm and disarm commands from Home Assistant may fail when another module is communicating with the panel.

The effect of local communication on GSM alarm reporting has not been verified. If you rely on GSM reporting, ask your alarm installer or monitoring provider to confirm compatibility and test alarm reporting after installation.

This integration supports the following panel types:

- PowerMax+ (Plus), PowerMax Pro:

  These will work but need to be manually enrolled at the right point in time (usually within a few minutes of starting this integration). You do this by

  ```INSTALLER MODE → 07. ENROL PWRLNK → 01: INSTALL```.

  Most users with these two panel types only need to do this once, however a few users have found that they need to do this every time they restart the integration.

- PowerMax Complete, PowerMax Pro Part, PowerMax Complete Part, PowerMax Express:

  These will work and will automatically enroll.

- PowerMaster 10, PowerMaster 30, PowerMaster 33:

  These will work and will automatically enroll.

- PowerMaster 360, PowerMaster 360R:

  These panels already have the PowerLink Visonic hardware inside them and for a local connection the integration works in parallel, only a direct (wired) serial connection is supported.

The original PowerMax panel (from the early 1990s) does not work with this integration. After extensive work, this panel is not able to be used as it does not support the PowerLink protocol that this integration relies on.

### Advice on the connection

If you already have a PowerMaster panel with the PowerLink hardware and a cloud account set up then use that. It is slower to react than a local connection (as it is polled) but you already have a working system, so use it!

You would then need to consider which local connection type to pursue. Consider these in order of benefit, first being the better in terms of reliability and ease of setup:

- Serial: A serial/USB connection wired directly from your Home Assistant device to the panel.
- Serial/Ethernet: An ESP32 device using `serial_proxy` with ESPHome. Although this uses Ethernet, you select Serial in the integration setup.
- Ethernet: An ESP32 device with a third-party TCP stream server library.
- Ethernet: A streaming device such as, for example, a "USRIOT USR-TCP232-T2 module" which provides a built-in TCP stream server. There are many other devices that can provide an emulation of serial streaming over Ethernet, many of which should be compatible.

The top two of these four have significant advantages:

- Secure and robust (when using ESPHome encryption for `serial_proxy`)
- The integration has direct control over the baud rate to the panel itself (the baud is changed for PowerMaster panels only)
- Disconnections are easier to detect and recover.


### Security

The cloud connection uses HTTPS and requires your Visonic account credentials and panel user code.

The local serial protocol between the interface hardware and the alarm panel is unencrypted. Communication with the panel can include panel user codes and download codes, including during EPROM downloads and arm or disarm commands.

For Ethernet connections using a TCP-to-serial bridge, this data also travels across your local network (LAN) without encryption. Keep the bridge on a trusted network and do not expose its TCP port to the internet.

When using ESPHome `serial_proxy`, enable ESPHome native API encryption to protect the local network connection (LAN) between Home Assistant and the ESP32 device. Although this encryption does not cover the connection between the ESP32 and the alarm panel motherboard, the ESP32 is inside your panel and so it is all physically self-contained.

### Supported hardware - local connections

For all supported panel types, in all the local connections, the integration mimics a physical Visonic PowerLink hardware module to establish a direct connection with the panel's internal control interface.

The PowerMaster 360R example below uses the panel’s internal USB connector. Check your model’s installation documentation to identify the supported connection.

<p class="img">
  <img src="/images/integrations/visonic/PowerMaster360R2.jpg"
       alt="PowerMaster 360R with USB connection"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMaster 360R with USB connection
</p>

For other supported panel types, connect a compatible USB-to-TTL adapter or network interface to the panel’s internal UART connector as defined below.

#### Hardware interface and wiring

There are two physical connection methods:

- A serial interface wired directly from the panel and attached to the Home Assistant host. This has a USB connector at one end of the cable to the host, and three individual female jumper connectors at the other. You would need to connect these female connectors to the panel's motherboard connector. Use an adapter with signal levels compatible with the panel’s UART interface.
- An ESP32 or USRIOT USR-TCP232-T2 module. You would first need to determine how to power the device and then connect the I/O pins to the panel. That device would then connect to your LAN, either wired or wireless. Therefore there are two communication steps:
  - The host to the device via your LAN
  - The device to the panel's motherboard connector. Keep the UART wiring short and follow the interface manufacturer’s wiring guidance.

The photographs below show UART connections on a PowerMax+ (Plus), PowerMax Express, and PowerMaster 10. They illustrate specific boards; connector positions, labels, and pinouts may differ on other board revisions. Use the installation documentation for your exact panel and interface hardware to identify the UART connector, signal pins, and electrical requirements. Do not connect a USB-to-TTL adapter or ESP32 directly to an RS-232 interface.

Verify that the panel’s UART output levels and input requirements are compatible with your adapter or ESP32 board in both directions. A board’s power input voltage does not establish the voltage its signal pins can tolerate. Use a suitable logic level shifter when required by the hardware specifications. This is referred to as "compatible logic levels" below. The photographs do not establish voltage compatibility for your hardware.

For these connections:

- **Ethernet**: you will need to install a hardware device such as an ESP32 / USR-TCP232 device inside your panel and wire the UART to the panel using compatible logic levels.
- **An ESPHome `serial_proxy`**: you will need to install an ESP32 device inside your panel and wire the ESP32’s UART to the panel using compatible logic levels.
- **Directly attached USB**: use a USB-to-TTL UART wired adapter with compatible logic levels.

For these UART connections, identify GND, RX, and TX from the documentation for your hardware before wiring. Use the photographs as examples after verifying the pinout. Leave the panel connector’s VCC pin disconnected for the wiring arrangements shown here.

The PowerMax+ (Plus) example shows a 14-pin connector labeled J7.

<p class="img">
  <img src="/images/integrations/visonic/PowermaxPlus2.jpg"
       alt="PowerMax Plus direct connection J7"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMax+ (Plus) wired to an ESP32 (without power)
</p>

The PowerMax Express and PowerMaster 10 examples below show 10-pin connectors.

<p class="img">
  <img src="/images/integrations/visonic/PowermaxExpressA2.jpg"
       alt="PowerMax Express direct connection"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMax Express wired to an ESP32 (without power)
</p>

<p class="img">
  <img src="/images/integrations/visonic/PowermaxExpressB2.jpg"
       alt="PowerMax Express direct connection, alternate view"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMax Express wired to an ESP32 (without power), alternate view
</p>

<p class="img">
  <img src="/images/integrations/visonic/PowerMaster10_esp322.jpg"
       alt="PowerMaster 10 direct connection"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMaster 10 wired to an ESP32 (without power)
</p>

Notice in the above figures:

- RX and TX are crossed over. For example, the yellow cable connects TX on the panel to RX on the ESP32.
- The ground cable (blue) provides a common voltage reference between the panel and ESP32. The power and signal wiring must provide this reference for a direct UART connection.
- The figures show an ESP32 D1 Mini but other ESP32 boards can be used. You can also use a USR-TCP232 device for an **Ethernet** connection.

#### Connection precautions

1. **Data line crossover**: Ensure the panel's data transmitting pin (TX) is wired to the device's receiving pin (RX), and vice versa.
2. Voltage logic levels: Check the UART electrical specifications for both devices. Use a suitable logic level shifter if needed. Incompatible signal levels can damage the hardware.
3. Powering an ESP32 device (for Ethernet and `serial_proxy`): Use a power supply that meets your specific board’s requirements. If you want to power it from the panel, ask your alarm installer to verify the supply voltage, available current, and grounding arrangement. Leave the panel communication connector’s VCC pin disconnected for the arrangements shown here.
4. **Serial using a cable**: Do not connect the VCC wire. Connect only GND, RX, and TX. The USB side provides the power supply.
5. **Serial configuration and baud rate**: The interface configuration must be set to 8 data bits, no parity, and 1 stop bit (8N1). Ensure data flow control (CTS/RTS) is completely disabled. The baud rate is 9600 for PowerMax panels. The baud rate is either 9600 or 38400 for PowerMaster panels, this is automated using serial (and serial_proxy) connections. For TCP-to-serial bridges, configure the bridge’s baud rate manually to match the panel.

For additional wiring examples, example DIY hardware builds and hardware photographs, see the community-maintained [Visonic hardware](https://github.com/davesmeghead/visonic/wiki/Hardware-Setup) setup guide. Other sections of that wiki may describe features specific to the custom integration.


{% include integrations/config_flow.md %}

After setup, select **Configure** on the Visonic integration entry to review its options.

{% configuration_basic %}
Ethernet, Cloud or Serial:
  description: >-
    Select how Home Assistant connects to the panel. Choose **Ethernet** for a TCP-to-serial bridge, **Serial** for a directly attached serial adapter or an ESPHome serial proxy, or **Cloud** for a panel registered to your Visonic cloud account. The default is **Ethernet**.
Panel number:
  description: >-
    A number used to identify the panel and name its entities. Enter a whole number greater than or equal to `0`, and if you have more than 1 panel then use a different number for each configured panel. The default is `0`. For example, panel `1` produces an alarm entity named `alarm_control_panel.visonic_alarm_p1`. This number remains fixed during reconfiguration to preserve existing device and entity identities.
{% endconfiguration_basic %}

The panel number controls naming. The integration separately checks whether the same local connection or cloud panel is already configured.

### Cloud connection

Enter your cloud account details first. After authenticating your account, the integration retrieves your registered panels.

{% configuration_basic %}
Server URL:
  description: >-
    The Visonic cloud server hostname or HTTPS URL used by your account. For example, enter `visonic.tycomonitor.com` or `https://visonic.tycomonitor.com`. Do not include a path, login details, or URL parameters. The default is `visonic.tycomonitor.com`. Use the server address provided for your account if it is different.
Login Email:
  description: >-
    The email address used to sign in to your Visonic cloud account. This field is required and is initially empty.
Login Password:
  description: >-
    The password used to sign in to your Visonic cloud account. This field is required and is initially empty.
{% endconfiguration_basic %}

The next step lists each registered panel by its alias and serial. This step is shown even if your account has only one panel. An account without registered panels cannot complete setup.

{% configuration_basic %}
Panel:
  description: >-
    Select the registered panel to connect to Home Assistant. If your account has only one panel, it is preselected.
Panel User Code:
  description: >-
    The user PIN for the selected alarm panel. Enter exactly four decimal digits, including any leading zeros. The form defaults to `1111`; replace it with a valid user code for your panel. This is separate from your cloud account password. The integration validates access to the selected panel using this code and uses it for cloud arm and disarm commands.
{% endconfiguration_basic %}

### Local connection settings

Both Ethernet and Serial connections use these settings:

{% configuration_basic %}
Panel User Code for Commands:
  description: >-
    The user-code slot the panel should use for arm and disarm commands. Enter a slot number from `1` to `48`, rather than the PIN stored in that slot. The default is `1`. Choose a slot supported by your panel; the number of available user-code slots varies by model.
EPROM Download Code:
  description: >-
    An optional code used to download the panel's EPROM configuration. Leave this field empty if you do not know the code. If provided, it must contain exactly four hexadecimal characters (`0`–`9`, `A`–`F`), including any leading zeros. Letters are case-insensitive. This is separate from the panel user PIN. The field is initially empty.
{% endconfiguration_basic %}

Before accepting a local connection, the integration waits for decoded panel state without downloading the EPROM. The connection test can take up to 60 seconds. Starting the configured connection can take up to 180 seconds, allowing slower PowerLink initialization. Setup retries if initial panel state is unavailable.

Duplicate local configurations are detected by matching the host and TCP port, or equivalent serial-device paths. A hardware serial is not currently used for direct connection matching, so the integration cannot reliably detect a panel accessed through different host aliases or through both a local connection and the cloud.

#### Ethernet connection

Use this connection type for a TCP-to-serial bridge, such as an ESP32 with a TCP stream server or a USR-TCP232 module. The bridge must be reachable from Home Assistant.

{% configuration_basic %}
Host Address:
  description: >-
    The hostname or IP address of the TCP-to-serial bridge connected to your panel. You can find its address in your router or the bridge's network settings. The form defaults to `127.0.0.1`; replace it with the bridge's address unless the TCP server runs on the Home Assistant host.
Port:
  description: >-
    The TCP port configured on the bridge's stream server. Enter a whole number from `1` to `65535`. The default is `30000`.
{% endconfiguration_basic %}

#### Serial connection

Use this connection type for a directly attached serial adapter or an ESPHome serial proxy. For an ESPHome serial proxy, configure the ESPHome device and add it to Home Assistant using the ESPHome integration first. See the [ESPHome serial proxy documentation](https://esphome.io/components/serial_proxy/).

{% configuration_basic %}
Serial Path:
  description: >-
    Select the serial device or ESPHome serial proxy connected to the panel. For a directly attached adapter, use a persistent device path such as `/dev/serial/by-id/...` when available. This field is required and has no fixed default.
{% endconfiguration_basic %}

## Reconfigure the connection

Select **Reconfigure** from the integration entry menu to change the connection type, address, or cloud account settings. Saved settings are prefilled. Cloud panels are retrieved again after authentication, and the current panel is suggested if it is still available. Reconfiguration preserves the configuration, device, and entity identities. For cloud connections, select the same panel serial that is already configured, including when switching a known local panel to cloud access. To use a different physical panel, add a new integration entry. Reauthentication retains the selected cloud panel while validating corrected credentials.


{% include integrations/option_flow.md %}

### Arming and disarming

These options are available for all connection types. Remote arming and disarming from within Home Assistant are disabled by default. Enable the corresponding option to allow Home Assistant to send those commands.

{% configuration_basic %}
Enable Panel Arm:
  description: >-
    Allows Home Assistant to send arm commands to the panel. This applies to both home and away arming. The default is off.
Enable Panel DisArm:
  description: >-
    Allows Home Assistant to send disarm commands to the panel. The default is off.
Arm Home Enabled:
  description: >-
    Makes the **Arm home** action available in addition to **Arm away**. The default is on. **Enable Panel Arm** must also be on to send arm commands from Home Assistant.
{% endconfiguration_basic %}

The following options are available only for Ethernet and Serial connections. Support depends on the panel and its configuration.

{% configuration_basic %}
Arm Normal Alarm without User Code:
  description: >-
    Allows an arm action to be requested without a user-entered code. The default is off. Disarm authentication is unchanged. A local connection that has not achieved PowerLink can still require a valid four-digit PIN to carry out the command.
Arm Away performs an Arm Away Instant:
  description: >-
    Sends the panel's **Arm Away Instant** command when you select **Arm away**. When off, Home Assistant sends the normal **Arm Away** command. The default is off.
Arm Home performs an Arm Home Instant:
  description: >-
    Sends the panel's **Arm Home Instant** command when you select **Arm home**. When off, Home Assistant sends the normal **Arm Home** command. **Arm Home Enabled** must also be on. The default is off.
{% endconfiguration_basic %}

Cloud connections use the panel user code supplied during setup. They do not offer the local code-free or instant-arming options.

### Local connection retries

These options are available only for Ethernet and Serial connections. Home Assistant's retries of initial integration setup are handled separately.

These settings determine what the integration does if there are local disconnections (through causes such as you rebooting your local router).

{% configuration_basic %}
Try this number of times to attempt a reload:
  description: >-
    Controls how many connection attempts are allowed when reconnecting after a local connection failure. Set to `0` to disable automatic reconnection attempts. The default is `1`. The allowed range is `0` to `1000000`.
Time delay (seconds) between reload attempts:
  description: >-
    The delay between local connection retry attempts, in seconds. The default is `90` seconds. The allowed range is `5` to `1000` seconds.
{% endconfiguration_basic %}

## Visonic Security System automation examples

### Automation: Update cloud panel status every minute

Use this automation if you want to poll your cloud panel once per minute. First, [disable automatic polling](#data-updates) for the cloud entry.

- **Trigger**: Time pattern, every minute.
- **Action**: Update entity.
  - **Target**: Your Visonic cloud alarm entity.

{% include docs/paste_yaml_tip.md %}

{% details "YAML example for updating cloud panel status every minute" %}

Replace `alarm_control_panel.visonic_alarm_p1` with your cloud alarm entity ID.

{% example %}
automation: |
  alias: "Update Visonic cloud panel every minute"
  triggers:
    - trigger: time_pattern
      minutes: "/1"
  actions:
    - action: homeassistant.update_entity
      target:
        entity_id: alarm_control_panel.visonic_alarm_p1
{% endexample %}

{% enddetails %}

## Data updates

Local Ethernet and serial connections receive panel state updates as the panel sends them. Cloud connections request panel status every 20 seconds. Cloud status changes can take up to one polling interval, plus the service response time, to appear in Home Assistant.

To use a different cloud polling schedule:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the Visonic cloud entry.
2. Open the {% icon "mdi:dots-vertical" %} menu, select **System options**, and turn off **Enable polling for changes**. Select **Update**.
3. Create an automation that calls **Update entity** for your cloud alarm entity. For an example, see [Update cloud panel status every minute](#automation-update-cloud-panel-status-every-minute).

Use an interval of at least 20 seconds. More frequent update requests may be delayed by the integration. Slower polling delays reported status changes; arm and disarm actions still run when requested. Authentication, commands, and command-result checks can make additional requests independently of scheduled status polling.

To restore the default schedule, disable the automation and turn **Enable polling for changes** back on.

## Troubleshooting

- If setup reports a connection timeout or refusal, check that the panel interface is powered, that its address and port or serial path are correct, and that Home Assistant can reach it.
- For cloud setup, confirm the server URL, account credentials, and panel user code. Check that the account and panel are accessible through the Visonic service.
- If commands are unavailable or rejected, review the integration options and the panel's user-code and arming configuration. Panel capabilities vary by model and configuration.
- For hardware-specific wiring and interface setup, consult the [Visonic project wiki](https://github.com/davesmeghead/visonic/wiki/Hardware-Setup).
- For local PowerMaster connections operating in PowerLink mode, sustained excessive status traffic can trigger automatic recovery. Commands are temporarily unavailable for two to three minutes. If recovery fails, communication stops and a notification advises you to reload the integration.

## Remove the integration

1. Go to **Settings** > **Devices & services**.
2. Select **Visonic Security System**.
3. Find the entry for the panel you want to remove.
4. Open that entry’s three-dot menu and select **Delete**.

Removing the integration stops its connection to the panel or cloud service and removes its Home Assistant configuration entry. It does not change the alarm panel's own settings.
