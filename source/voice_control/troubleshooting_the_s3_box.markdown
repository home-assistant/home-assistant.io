---
title: "Troubleshooting the ESP32-S3-BOX"
---

This section provides troubleshooting steps for the following three ESP32 devices by Espressif:

- ESP32-S3-BOX
- ESP32-S3-BOX-3
- ESP32-S3-BOX-Lite

The steps are the same for all three product variants. The term *ESP32-S3-BOX* is used to refer to all three variants.

## Error: Unable to connect to Wi-Fi

### Symptom

The ESP32-S3-BOX shows a message that it is unable to connect to Wi-Fi.

### Remedy

The remedy depends on your current setup.

**Option 1**: You already have the ESPHome add-on installed and adopted the ESP32-S3-BOX on your ESPHome Dashboard.

1. Make sure the USB cable is plugged into the ESP32-S3-BOX.
2. Make sure you have [access to the configuration files](/common-tasks/os/#configuring-access-to-files).
   - There are multiple ways to achieve this
   - If you are unsure which method to use, [install the Samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
   - An advantage of using the Samba add-on is that you can drag and drop multiple files at once.
3. In the `homeassistant` folder, find the **ESPHome** folder and open the configuration file of the ESP32-S3-BOX-3.
   - Under the Wi-Fi component, enter your Wi-Fi credentials:
     - Instead of `!secret wifi_ssid`, enter the name of your 2.4&nbsp;GHz Wi-Fi.
     - Instead of `!secret wifi_password`, enter the password.
    
     ```yaml
     wifi:
         ssid: !secret wifi_ssid
         password: !secret wifi_password
     ```
    
   - If the file does not contain a **wifi** section, add one.
   - If you are unsure what the credentials are, log on to your router and open the settings of the 2.4&nbsp;GHz Wi-Fi network.

**Option 2**: You do not have the ESPHome add-on installed or you did **not** adopt the S3 Box on your ESPHome Dashboard.

1. Make sure the USB cable is plugged into the ESP32-S3-BOX.
2. Go to https://esphome.io/projects/index.html select the **Connect** button, then **Change Wi-Fi**.

## Error: No Home Assistant

### Symptom

The ESP32-S3-BOX shows a message that there is no Home Assistant.

### Description

This message indicates that the device could connect to the Wi-Fi, but is unable to communicate with Home Assistant.

### Remedy

1. If you see this message during a restart or while an update is running, wait until the restart or update is finished.
   - In this case, there is nothing you need to do. It is expected that the device temporarily stops communicating in these situations.
2. If there is currently no restart or update running, make sure the device is correctly integrated:
   - Do this.
   - Do something else.

## Related topics

- list of related topics here