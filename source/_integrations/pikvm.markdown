---
title: PiKVM
description: Instructions on how to monitor the health of your PiKVM device in Home Assistant.
ha_release: '2026.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@adamoutler'
ha_domain: pikvm
ha_integration_type: device
ha_config_flow: true
ha_categories:
  - computers_network.monitoring
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://pikvm.org/
    title: PiKVM website
  - url: https://docs.pikvm.org/auth/
    title: PiKVM authentication documentation
---

The **PiKVM** {% term integration %} lets you monitor the health of your [PiKVM](https://pikvm.org/) device in Home Assistant. PiKVM is an open-source IP-KVM based on the Raspberry Pi. It gives you remote keyboard, video, and mouse access to another computer over your network.

Use case: Keep an eye on the CPU temperature, load, and virtual media storage of the PiKVM devices that look after your servers, and get notified before a problem affects your remote access.

## Supported devices

The following devices are known to be supported by the integration:

- PiKVM V3
- PiKVM V4 Mini
- PiKVM V4 Plus
- DIY PiKVM builds that run KVMD, the PiKVM OS service that provides the PiKVM web interface and API

The integration is tested with KVMD version 4.

## Prerequisites

- Your PiKVM must be reachable from Home Assistant over HTTPS.
- You need the username and password of an account that can log in to the PiKVM web interface.
- If two-factor authentication is enabled on your PiKVM, you need its two-factor authentication secret. This is the secret key that was used to set up your authenticator app, not a 6-digit code. To display the secret again, run `kvmd-totp show` in the PiKVM terminal. For more information, refer to the [PiKVM authentication documentation](https://docs.pikvm.org/auth/).

### Creating a dedicated account for Home Assistant

This step is optional but recommended. A dedicated account lets you change or remove the access of Home Assistant without affecting your own login.

1. Open a terminal on your PiKVM, either over SSH or with the **Terminal** in the PiKVM web interface, and become `root`.
2. Make the file system writable with the `rw` command.
3. Create a new user with `kvmd-htpasswd add homeassistant`, and enter a password when asked.
4. Make the file system read-only again with the `ro` command.

Two-factor authentication on PiKVM applies to all accounts. If it is enabled, the dedicated account uses the same two-factor authentication secret.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your PiKVM, optionally followed by a port. For example, `pikvm.local` or `192.168.1.50:8443`. Do not include `http://`."
Username:
    description: "The username you use to log in to the PiKVM web interface. Defaults to `admin`."
Password:
    description: "The password you use to log in to the PiKVM web interface."
Two-factor authentication secret:
    description: "Only needed if two-factor authentication is enabled on your PiKVM. Enter the base32 secret key that was used to set up your authenticator app. A one-time code from your authenticator app is not accepted, because it expires after a few seconds."
Verify SSL certificate:
    description: "Whether to verify the certificate of your PiKVM. Off by default. Only turn this on if you replaced the self-signed certificate that ships with PiKVM with a trusted certificate that matches the host you entered, for example a Let's Encrypt certificate."
{% endconfiguration_basic %}

Each PiKVM is identified by its hardware serial number, so you can add the same PiKVM only once. If your PiKVM gets a new address, add it again at the new address. Home Assistant shows that the device is already configured and updates the stored host. The entry is named after the name your PiKVM reports, which is usually its hostname.

## Supported functionality

The **PiKVM** integration provides the following entities.

### Sensors

All sensors are diagnostic entities, so you find them in the **Diagnostic** section of the device page. A sensor is only created if your PiKVM reports the matching value.

- **CPU temperature**
  - **Description**: The temperature of the PiKVM CPU, in °C.
  - **Available for devices**: all
- **CPU utilization**
  - **Description**: How busy the PiKVM CPU is, as a percentage.
  - **Available for devices**: all
- **Memory utilization**
  - **Description**: How much of the PiKVM memory is in use, as a percentage.
  - **Available for devices**: all
- **Fan speed**
  - **Description**: The fan power level set by the PiKVM fan controller (`kvmd-fan`), as a percentage.
  - **Available for devices**: Devices with a fan controlled by `kvmd-fan`, such as the PiKVM V4 Plus or a PiKVM V3 with a fan
  - **Remarks**: This value is the fan duty cycle, not the rotation speed in RPM.
- **Mass storage usage**
  - **Description**: How much of the mass storage drive (virtual media) partition is in use, as a percentage.
  - **Available for devices**: Devices with the mass storage drive feature available

## PiKVM automation examples

You can use the PiKVM sensors to get notified before a problem affects your remote access. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when the PiKVM is running hot

A PiKVM in a closed rack or cabinet can overheat. This automation sends a notification to your phone when the CPU temperature rises above 75 °C (167 °F). This example assumes the temperature sensor uses Celsius; if your sensor uses Fahrenheit, use `167` in the trigger and `167 °F` in the notification message.

- **Trigger**: Numeric state
  - **Entity**: CPU temperature (`sensor.pikvm_cpu_temperature`)
  - **Above**: `75` (or `167` for Fahrenheit)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a CPU temperature alert" %}

{% example %}
automation: |
  alias: "Notify when the PiKVM is running hot"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.pikvm_cpu_temperature
      above: 75
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The PiKVM CPU temperature is above 75 °C."
{% endexample %}

{% enddetails %}

### Automation: Get notified when the virtual media storage is almost full

If the mass storage drive is full, you cannot upload new images to your PiKVM. This automation sends a notification to your phone when more than 90% of the storage is in use.

- **Trigger**: Numeric state
  - **Entity**: Mass storage usage (`sensor.pikvm_mass_storage_usage`)
  - **Above**: `90`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a virtual media storage alert" %}

{% example %}
automation: |
  alias: "Notify when the PiKVM storage is almost full"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.pikvm_mass_storage_usage
      above: 90
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The PiKVM virtual media storage is more than 90% full."
{% endexample %}

{% enddetails %}

## Data updates

The **PiKVM** integration {% term polling polls %} your PiKVM every 30 seconds. Each update requests the device information and the mass storage drive status from the PiKVM API.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Known limitations

- The integration is read-only. It cannot control the power of the connected computer, press the ATX buttons, or manage virtual media.
- PiKVM ships with a self-signed certificate that is issued for `localhost` and does not include the IP address of the device. By default, the integration connects over HTTPS so the connection is encrypted, but it does not verify the certificate. If you installed a trusted certificate on your PiKVM, you can turn on **Verify SSL certificate** during setup.
- Home Assistant stores the password and, if you entered it, the two-factor authentication secret in its configuration, like it does for other integrations.
- IPv6 addresses are not supported. Use a hostname or an IPv4 address.
- You cannot update the credentials of an existing entry. If you change the password or the two-factor authentication secret on your PiKVM, delete the entry and add your PiKVM again. To update only the address, add your PiKVM again at its new address.

## Troubleshooting

### Failed to connect

If you get a **Failed to connect** error during setup, Home Assistant cannot reach your PiKVM.

1. Make sure your PiKVM is turned on and connected to your network.
2. Check the hostname or IP address, and the port if you entered one.
3. Make sure you can open the PiKVM web interface over HTTPS from a device on the same network as Home Assistant.

### Invalid hostname or IP address

If you get an **Invalid hostname or IP address** error during setup, the value in the **Host** field is not valid. Enter only the hostname or IPv4 address, optionally followed by a port between 1 and 65535. For example, `pikvm.local` or `192.168.1.50:8443`.

### Invalid authentication

If you get an **Invalid authentication** error during setup, the PiKVM did not accept your login.

1. Check that you can log in to the PiKVM web interface with the same username and password.
2. If two-factor authentication is enabled on your PiKVM, enter the two-factor authentication secret.
3. If you already entered the secret, make sure it is the current secret. If two-factor authentication was set up again on the PiKVM, the old secret no longer works.

### The two-factor authentication secret is not accepted

If setup shows the message **The two-factor authentication secret is invalid. Enter the base32 secret key, not a one-time code.**, you entered a one-time code from your authenticator app or a value that is not a valid secret. Enter the secret key instead. To display it, run `kvmd-totp show` in the PiKVM terminal.

### The PiKVM cannot be identified

If setup stops with the message that the PiKVM did not report a hardware serial number, your PiKVM does not report a serial number through its API. The integration needs the serial number to tell your devices apart, so it cannot add this device.

### A sensor is missing

The **Fan speed** and **Mass storage usage** sensors are only created when your PiKVM reports these values. If your PiKVM has no fan controlled by `kvmd-fan`, or the mass storage drive feature is not available, these sensors are not created.

The sensors are created when the integration starts. If you enable the feature later, or your PiKVM did not report the value at startup, reload the integration entry.

### The entities are unavailable

If your PiKVM is turned off or cannot be reached, its entities show as unavailable. They recover automatically when the PiKVM is reachable again.

### The entry stops working after a password change

If the PiKVM password or two-factor authentication secret has changed, the integration can no longer log in. Delete the entry and add your PiKVM again with the new credentials.

## Moving from a custom integration

A community custom integration that uses the same `pikvm` domain replaces this integration while it is installed. To use this integration, remove the custom integration and restart Home Assistant. If your PiKVM entry does not load afterwards, delete it and add your PiKVM again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
