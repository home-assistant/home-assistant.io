---
title: "Troubleshooting the ESP32-S3-BOX-3"
---

This section provides troubleshooting steps for the ESP32-S3-BOX-3 by Espressif.

## Error: Unable to connect to Wi-Fi

### Symptom

The ESP32-S3-BOX-3 shows a message that it is unable to connect to Wi-Fi.

### Remedy

1. First, check if your network is ready in general.
   1. Make sure your router is on and within reach.
   2. Make sure you have chosen a Wi-Fi network that supports 2.4 GHz. The ESP32-S3-BOX-3 won't show up on a 5 GHz network.

2. The next step is to make sure you entered the correct Wi-Fi password. Follow the steps either under **Option 1** or **Option 2**, depending on whether or not you have the ESPHome add-on installed.
   - **Option 1**: You do not have the ESPHome add-on installed or you have the add-on but did **not** adopt the ESP32-S3-BOX-3.
     1. Make sure the USB cable is plugged into the ESP32-S3-BOX-3.
     2. Go to https://esphome.io/projects/index.html select the **Connect** button, then **Change Wi-Fi**.
   - **Option 2**: You already have the ESPHome add-on installed and adopted the ESP32-S3-BOX-3 on your ESPHome dashboard.
     1. Make sure the USB cable is plugged into the ESP32-S3-BOX-3.
     2. In Home Assistant, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome), and **Open Web UI**.
     3. On the **ESP32-S3-BOX-3** add-on, select edit.
       ![ESP32-S3-BOX-3 open config file](/images/assist/esps32-s3-edit-config.png)
       - **Result**: An editor opens, showing the configuration file.
       ![ESP32-S3-BOX-3 edit config file](/images/assist/esp32-edit-wifi-credentials.png)
     4. Under the Wi-Fi component, enter your Wi-Fi credentials:
        - Instead of `!secret wifi_ssid`, enter the name of your 2.4&nbsp;GHz Wi-Fi.
        - Instead of `!secret wifi_password`, enter the password.

        ```yaml
        wifi:
          ssid: !secret wifi_ssid
          password: !secret wifi_password
        ```

        - If the file does not contain a **wifi** section, add one.
        - If you are unsure what the credentials are, log on to your router and open the settings of the 2.4&nbsp;GHz Wi-Fi network.

## Error: No Home Assistant

### Symptom

The ESP32-S3-BOX-3 shows a message that there is no Home Assistant.

### Description

This message indicates that the device could connect to the Wi-Fi, but is unable to communicate with Home Assistant.

### Remedy

1. If you see this message during a restart or while an update is running, wait until the restart or update is finished.
   - In this case, there is nothing you need to do. It is expected that the device temporarily stops communicating.
2. Make sure your device is on the same network as Home Assistant.
   - If you have a complex network setup with VLAN, make sure it is in the same VLAN.
3. If you see the screen below, but the ESP32-S3-BOX-3 is not listed, select **Setup another instance of ESPHome**.

   ![ESP32-S3-BOX-3 open config file](/images/assist/esp32-s3-box-not-discovered.png)
   - Go to your router, find the IP address or hostname of your device, and enter it.

## Related topics

- [Assist Pipeline](/voice_control/voice_remote_local_assistant)