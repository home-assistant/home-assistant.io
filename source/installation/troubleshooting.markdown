---
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
---

It can happen that you run into trouble while installing and onboarding Home Assistant. This page is here to help you solve the most common problems.

## Can’t access Home Assistant in my browser

### Symptom: “This site can’t be reached”

When trying to access Home Assistant in the browser, the browser shows the message “This site can’t be reached”.

### Description

This means the browser can’t find your Home Assistant installation on the network.

### Resolution

To resolve this issue, try the following steps:

1. Make sure your Home Assistant device is powered up (LEDs are on).
2. Make sure your Home Assistant installation is connected to the internet:
   - Make sure the Ethernet cable is plugged-in to both Home Assistant and to your router or switch.
   - Make sure your network has internet access.
     - During first startup, time will be synchronized. Ensure NTP is allowed in your network.
     - During first startup, Home Assistant completes the installation. It needs access to the following URLs:
       - version.home-assistant.io: to fetch new version information.
       - github.com: to update metadata of the add-on store.
       - ghcr.io: the GitHub container registry to fetch new Home Assistant updates.
3. Make sure the system on which you opened the browser to access Home Assistant is connected to the same network as Home Assistant.
   - For example, if the system your Browser runs on is using Wi-Fi, make sure it is using the same Wi-Fi Home Assistant is connected to.
4. Make sure you typed the address correctly.
   - Especially if the message includes the error code “ERR_CONNECTION_REFUSED”, it is likely that there was a typo in the port part of the URL (`:8123`).
   - Typically, the URL is [http://homeassistant.local:8123](http://homeassistant.local:8123).
   - If you are running an older Windows version or have a stricter network configuration, try [http://homeassistant:8123](http://homeassistant:8123) instead.
5. The system might still be starting up. Wait for a couple of minutes and refresh the page.
   - Refreshing might work differently depending on your browser. Look for the refresh {% icon "mdi:refresh" %} icon, or press CTRL+R or CTRL+SHIFT+R.
6. Check your router's web interface to see what IP address is assigned to your Home Assistant installation.
   - Enter this IP address (`http://x.x.x.x:8123`) directly into your browser.
7. If you still can’t reach Home Assistant, connect keyboard and monitor to the device Home Assistant is running on to access the console and see where Home Assistant gets stuck.
   - If you are using a Home Assistant Green, follow these steps [to access the console](https://green.home-assistant.io/guides/use-terminal/).
   - If you are using a Home Assistant Yellow, follow these steps [to access the console from Windows](https://yellow.home-assistant.io/guides/use-serial-console-windows/), or [to access the console from Linux or macOS](https://yellow.home-assistant.io/guides/use-serial-console-linux-macos/).
8. [Reach out to our community for help](https://www.home-assistant.io/help/).

## "Error installing Home Assistant"

### Symptom: During onboarding, there is an "Error installing Home Assistant"

You are in the onboarding procedure, but you get the message **Error installing Home Assistant**.

![Error installing Home Assistant during onboarding](/images/getting-started/error_installing_ha.png)

### Resolution

1. Make sure your network has internet access.
     - During first startup, time will be synchronized. Ensure NTP is allowed in your network.
     - During first startup, Home Assistant completes the installation. It needs access to the following URLs:
       - version.home-assistant.io: to fetch new version information.
       - github.com: to update metadata of the add-on store.
       - ghcr.io: the GitHub container registry to fetch new Home Assistant updates.
2. After changing your network environment, wait a few minutes. Home Assistant will try to reconnect.
3. [Reach out to our community for help](https://www.home-assistant.io/help/).

## Stuck at "Preparing Home Assistant"

### Symptom: Onboarding seems stuck at "Preparing Home Assistant"

You are in the onboarding procedure, but the process seems stuck at the step **Preparing Home Assistant**.

![Home Assistant preparation](/images/getting-started/onboarding_preparing_01.png)

### Resolution

1. Select the pulsing blue dot to view the log files.
   - The log files might provide more information on the current status.
2. Make sure your network has internet access.
     - During first startup, time will be synchronized. Ensure NTP is allowed in your network.
     - During first startup, Home Assistant completes the installation. It needs access to the following URLs:
       - version.home-assistant.io: to fetch new version information.
       - github.com: to update metadata of the add-on store.
       - ghcr.io: the GitHub container registry to fetch new Home Assistant updates.
3. After changing your network environment, wait a few minutes. Home Assistant will try to reconnect.
4. [Reach out to our community for help](https://www.home-assistant.io/help/).
