---
title: "Troubleshooting the ESP32-S3-BOX-3"
related:
  - docs: /voice_control/s3_box_voice_assistant/
    title: Creating a ESP32-S3-BOX-3 voice assistant
  - url: https://esphome.io/projects/index.html
    title: ESPHome projects website
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
   - **Option 1**: You do not have the ESPHome add-on installed or you have the add-on but did **not** adopt the ESP32-S3-BOX-3. If the device is shown in green, it is not adopted. 
      ![ESP32-S3-BOX-3 not adopted](/images/assist/esp32-not-adopted.png)
     1. Make sure the USB cable is plugged into the ESP32-S3-BOX-3.
     2. Go to the [ESPHome projects website](https://esphome.io/projects/index.html), select the **Connect** button, then **Change Wi-Fi**.
   - **Option 2**: You already have the ESPHome add-on installed and adopted the ESP32-S3-BOX-3 on your ESPHome dashboard.
     1. Make sure the USB cable is plugged into the ESP32-S3-BOX-3.
     2. In Home Assistant, go to [**Settings** > **Add-ons** > **ESPHome**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=5c53de3b_esphome), and **Open Web UI**.
     3. On the **ESP32-S3-BOX-3** add-on, select edit.
       ![ESP32-S3-BOX-3 open config file](/images/assist/esps32-s3-edit-config.png)
        - **Result**: An editor opens, showing the configuration file.
       ![ESP32-S3-BOX-3 edit config file](/images/assist/esp32-edit-wifi-credentials.png)
     4. In the **wifi** section, check if it refers to the `secrets` file (contains `!secret`).
        If it does not contain a **wifi** section, enter the section below:

        ```yaml
        wifi:
          ssid: !secret wifi_ssid
          password: !secret wifi_password
        ```

     5. Close the editor and in the overview, select **Secrets**.
        ![ESP32-S3-BOX-3 open config file](/images/assist/esp32-open-secrets.png)
     6. Enter your Wi-Fi credentials.
        ![ESP32-S3-BOX-3 open config file](/images/assist/esp32-edit-secrets.png)

## The Wi-Fi dialog never shows after the installation

### Symptom

The installation wizard never shows the dialog to connect to the Wi-Fi, but directly returns to the screen with **Install Voice Assistant**.

### Remedy

1. Disconnect the USB cable connecting the ESP32-S3-BOX-3 and connect it again.
2. If this didn't help, check if you are using a USB cable that is power only and does not transfer data.

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
3. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
   - If the device is shown as **Discovered**, select **Add**.
     ![ESP32-S3-BOX-3 open config file](/images/assist/esp32-discovered.png)
   - If it was not discovered, select [**Add integration** > **ESPHome**](https://my.home-assistant.io/redirect/config_flow_start/?domain=esphome).
4. If you see the screen below, but the ESP32-S3-BOX-3 is not listed, select **Setup another instance of ESPHome**.

   ![ESP32-S3-BOX-3 open config file](/images/assist/esp32-s3-box-not-discovered.png)
   - Go to your router, find the IP address or hostname of your device, and enter it.
