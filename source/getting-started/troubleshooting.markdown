---
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
---

It can happen that you run into trouble while installing and onboarding Home Assistant. This page is here to help you solve the most common problems.

## Can’t access Home Assistant in my browser

### Symptom: “This site can’t be reached”

When trying to access Home Assistant in the browser, the browser shows the message “This site can’t be reached”.

#### Description

This means the browser can’t find your Home Assistant installation on the network.

#### Resolution

To resolve this issue, try the following steps:

1. The system might still be starting up. Wait for a couple of minutes and refresh the browser.
2. Make sure you typed the address correctly.
   - Typically, this is http://homeassistant.local:8123/.
   - If you are running an older Windows version or have a stricter network configuration, you might need to use homeassistant:8123.
3. Make sure your Home Assistant device is powered up (LEDs are on).
4. Make sure your Home Assistant installation is connected to the internet:
   - Make sure the Ethernet cable is plugged-in to both Home Assistant and to your router or switch.
   - Make sure your network is up and running and your router has internet access.
5. Make sure the system on which you opened the browser to access Home Assistant is connected to the same network as Home Assistant.
   - For example, you might have 2 networks with the same name, but one is on 2.4&nbsp;GHz and the other on 5&nbsp;GHz.
   - One of your devices might default to another network. Make sure they are in the exact same network.
6. Check your router's web interface to see what IP address is assigned to your Home Assistant installation.
   - Enter this IP address (`http://x.x.x.x:8123`) directly into your browser.
7. If you still can’t reach Home Assistant, connect keyboard and monitor to the device Home Assistant is running on to access the console and see where the Home Assistant gets stuck.
   - If you are using a Home Assistant Green, follow these steps [to access the console](https://green.home-assistant.io/guides/use-terminal/).
   - If you are using a Home Assistant Yellow, follow these steps [to access the console from Windows](https://yellow.home-assistant.io/guides/use-serial-console-windows/), or [to access the console from Linux or macOS](https://yellow.home-assistant.io/guides/use-serial-console-linux-macos/).
8. [Reach out to our community for help](https://www.home-assistant.io/help/).
   - If you report an issue, follow the steps on [reporting issues](/help/reporting_issues/).

### Symptom: “ERR_CONNECTION_REFUSED”

When trying to access Home Assistant in the browser, the browser message includes the error code “ERR_CONNECTION_REFUSED”.

#### Description

If you are using Chrome or Edge and ERR_CONNECTION_REFUSED is displayed, there might be a typo in the URL.

#### Resolution

1. Make sure you typed the address correctly.
   - Typically, this is `http://homeassistant.local:8123/`.
   - If you are running an older Windows version or have a stricter network configuration, you might need to use `homeassistant:8123`.
2. Check the port number:
   - Double check that you use :8123 at the end of the URL.
3. The system might still be starting up. Wait for a couple of minutes and refresh the browser.
4. If you still get this error, then you might need to reinstall again.
5. If you still can’t reach Home Assistant, connect a display to the device Home Assistant is running on to access the console to see where the Home Assistant gets stuck.
   - If you are using a Home Assistant Green, follow these steps [to access the console](https://green.home-assistant.io/guides/use-terminal/).
   - If you are using a Home Assistant Yellow, follow these steps [to access the console from Windows](https://yellow.home-assistant.io/guides/use-serial-console-windows/), or [to access the console from Linux or macOS](https://yellow.home-assistant.io/guides/use-serial-console-linux-macos/).
6. [Reach out to our community for help](https://www.home-assistant.io/help/).
   - If you report an issue, follow the steps on [reporting issues](/help/reporting_issues/).
