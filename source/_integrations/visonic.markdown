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

For this you will need to buy additional hardware and be able to wire it to the connector inside your panel. If you do use ESPHome then you will also need to be able to set up the device with a stream server or `serial_proxy`. The wiring sounds complicated but it is not, please read on.

For local connections this integration is not fully compatible with other hardware that directly interacts with your alarm control panel at the same time. For example, if you have a GSM module installed inside your panel then there are limitations of use that you need to be aware of. The GSM module periodically polls the panel, during this time the panel ignores any commands sent to it. This will affect your ability to arm or disarm the panel through Home Assistant and the commands may fail. Although it cannot be determined the opposite may also be true, that while this integration interacts with your panel, the GSM capability may be compromised.

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

A PowerMaster 360/360R already has a USB connector inside the panel for you to use.

<p class="img">
  <img src="/images/integrations/visonic/PowerMaster360R2.jpg"
       alt="PowerMaster 360R with USB connection"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMaster 360R with USB connection
</p>

For other supported panel types, connect a compatible USB-to-TTL adapter or network interface to the panel’s internal UART connector as defined below.

#### Hardware interface and wiring

There are two physical connection methods:

- A serial interface wired directly from the panel and attached to the Home Assistant host. This has a USB connector at one end of the cable to the host, and three individual female jumper connectors at the other. You would need to connect these female connectors to the panel's motherboard connector. The communication at the panel's connector is low voltage TTL, but these cables usually have amplification and buffering.
- An ESP32 or USRIOT USR-TCP232-T2 module. You would first need to determine how to power the device and then connect the I/O pins to the panel. That device would then connect to your LAN, either wired or wireless. Therefore there are two communication steps:
  - The host to the device via your LAN
  - The device to the panel's motherboard connector. The communication between the device and the panel is low voltage TTL without any amplification or buffering and so the cable lengths need to be short, which is why it is suggested that the device is physically located inside the panel.

This section specifically looks at connecting the wires to the panel's motherboard connector. To connect the serial wired connection or the ESP32 / USR-TCP232 device to the panel, the panel provides an internal 10-pin (or 14-pin on older PowerMax+ variants) male interface connector. This connector utilizes TTL-level UART serial signal levels. You do not need the official Visonic RS-232 board when you use a compatible TTL interface. The panel and the serial / ESP32 devices all use TTL voltage levels. Connect to the panel’s TTL UART connector labeled Control, PC, or IP. Do not connect the USB-to-TTL adapter or ESP32 directly to the panel’s RS-232 interface.

Note: From what I understand, the voltage level of the logic signals on the panel's connector is 3.3 V, 3.75 V or 5 V, depending on panel type. The devices that have been used to connect to that connector are either 3.3 V or 5 V so a voltage level shifter may be needed. It sounds complicated but they can be bought from vendors such as Amazon and are relatively cheap, a few dollars. Verify compatible signal levels before connecting; [Espressif](https://docs.espressif.com/projects/esp-faq/en/latest/esp-faq-en-master.pdf) specifies a 3.6 V GPIO tolerance. A board’s 5 V power input does not make its GPIO 5 V tolerant. This is referred to as "compatible logic levels" in the remainder of this description.

For these connections:

- **Ethernet**: you will need to install a hardware device such as an ESP32 / USR-TCP232 device inside your panel and wire the UART to the panel using compatible logic levels.
- **An ESPHome `serial_proxy`**: you will need to install an ESP32 device inside your panel and wire the ESP32’s UART to the panel using compatible logic levels.
- **Directly attached USB**: use a USB-to-TTL UART wired adapter with compatible logic levels.

In all three cases you will need to connect/wire it to the panel connector. To interface with the panel, connect the ground, RX, and TX lines according to the figures below. Leave the panel connector’s VCC pin disconnected for the wiring arrangements shown here.

A PowerMax+ panel has a 14-pin (J7) connector.

<p class="img">
  <img src="/images/integrations/visonic/PowermaxPlus2.jpg"
       alt="PowerMax Plus direct connection J7"
       style="display: block; width: 100%; max-width: 480px; height: auto; margin: 0 auto;">
  A PowerMax+ (Plus) wired to an ESP32 (without power)
</p>

All other panels have a 10-pin (PC/IP/PRG/BBA) connector.

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
- The ground cable (blue) connects the two grounds together for a common voltage reference. Please read on to determine if you need the blue cable, depending on how you power the ESP32.
- The figures show an ESP32 D1 Mini but other ESP32 boards can be used. You can also use a USR-TCP232 device for an **Ethernet** connection.

#### Connection precautions

1. **Data line crossover**: Ensure the panel's data transmitting pin (TX) is wired to the device's receiving pin (RX), and vice versa.
2. **Voltage logic levels**: The alarm panel's serial lines may operate at different voltages (for example, 3.3 V or 5 V, depending on the board) than the device pins, which tolerate 3.3 V. A logic level shifter must be used if the panel logic exceeds 3.3 V to prevent permanent damage to the device.
3. **Powering an ESP32 device (for Ethernet and serial_proxy)**: ESP32 devices usually need a 5 V DC power supply. It is recommended to either:
    - Power the device from its own power supply, a USB power adapter for example, or
    - Use a DC-DC converter powered by the panel’s main 12 V DC internal supply. Its output must match the voltage required by your ESP32 board, usually 3.3 V or 5 V.

      With a non-isolated converter, the panel and ESP32 already share a common ground through the power wiring, so only RX and TX are needed between the ESP32 and the panel’s communication connector.

      With an isolated converter, the output ground is separate from the panel ground. For a direct UART connection, also connect the ESP32’s GND to the panel’s communication GND. This connection bridges the ground isolation provided by the converter.

      In either case, leave the panel communication connector’s VCC pin disconnected.
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
    The Visonic cloud server address used by your account. The default is `visonic.tycomonitor.com`. Use the server address provided for your account if it is different.
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
Polling Interval (seconds):
  description: >-
    How often Home Assistant requests panel updates from the cloud service, in seconds. Enter a whole number of at least `5`. The default is `20` seconds. Updates can be delayed by the selected interval and the cloud service response time.
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
