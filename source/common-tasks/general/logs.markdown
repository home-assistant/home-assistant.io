---
title: "Viewing and downloading logs"
description: "How to view and download the logs of Home Assistant, remove sensitive information from them, and find where logs are stored on each installation type."
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
  - docs: /integrations/logger/
    title: Logger integration
  - docs: /common-tasks/os/logs/
    title: Logs on Home Assistant OS
---

Home Assistant writes down what it does in logs. When something doesn't work as expected, the logs often show why. For example, a log can show that an integration can't reach a device, or that a line in your configuration isn't valid.

To find out more about a problem with one integration, you can also turn on debug logging for that integration. For the steps, refer to [Debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

On {% term "Home Assistant Operating System" %}, you can also view the logs of the Supervisor, the host, and your apps, and the logs of earlier startups. For the steps, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/).

## Viewing the logs

The **Logs** page shows the errors and warnings of Home Assistant. A message that repeats is shown once, with the number of times it occurred. The list starts again each time Home Assistant restarts. The raw logs show all messages, including older ones.

### Prerequisites

- Administrator rights.

### To view the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
   - Result: The page shows the errors and warnings of **Home Assistant Core**.
2. To see the details of a message, select it.
   - The details show, for example, which integration the message comes from, when it first occurred, and how often.
3. To see the entire log, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs**.
   - To go back to the errors and warnings, select **Menu** {% icon "mdi:dots-vertical" %} > **Show condensed logs**.
4. To find a message, enter a word from the message in the **Search logs** field.

## Downloading the logs

You can download a log to keep a copy of it, or to look at it in another program, such as a text editor.

### Prerequisites

- Administrator rights.

### To download the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. Select the log that you want to download.
   - On {% term "Home Assistant Operating System" %}, you can also select another part of the system or an earlier startup. For the steps, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/).
3. Select **Download logs** {% icon "mdi:download" %}.
   - In the errors and warnings view of **Home Assistant Core**, the entire log is downloaded right away.
   - In the raw logs, a dialog opens. Under **Lines**, select how many lines to download, and then select **Download**. The newest lines are downloaded.
   - Result: Your browser saves the log as a file, for example, `home-assistant_<date and time>.log`, or `supervisor_<date and time>.log` for the Supervisor log.

## Sensitive information in logs

Logs can contain sensitive information. This includes personal data that can identify you directly or indirectly, such as user names, the names of your devices, the name of your Wi-Fi network, IP addresses, or your location.

Much of this information comes from your own configuration, for example, the address of a server that you set up, the name that you gave a device, or the web address of a service that an integration connects to. Home Assistant can't tell whether such a value is sensitive to you, and hiding it would also make the log useless for finding out what went wrong. Credentials are different: passwords, API keys, and tokens are always sensitive. The developer guidelines ask integrations to keep them out of the log, and reviewers check for this. This is a guideline, not a guarantee. In particular, debug logging often records the raw data that an integration exchanges with a device or service, and that data can include credentials, locations, or other sensitive details. Custom integrations are not reviewed by the Home Assistant project and may log anything.

The following list shows examples of what a log can contain. A log can also contain other sensitive information.

- IP addresses and MAC addresses of devices on your network.
  - An IP address identifies a device on a network, such as `192.168.1.23`. A MAC address is a unique ID of your specific device, such as `a4:c1:38:12:34:56`.
  - For example, when a login fails, Home Assistant logs the IP address of the device that tried to log in.
  - When a Bluetooth device can't be reached, the error message starts with its MAC address.
- Host names, the names of devices on a network, such as `kitchen-speaker.local`.
  - For example, when a login fails, Home Assistant also logs the host name of the device that tried to log in.
- User names.
  - For example, when an app checks a login with Home Assistant, the **Supervisor** log shows the user name.
- The name of your Wi-Fi network.
  - For example, the **Host** log shows it when the system connects to Wi-Fi.
- Entity IDs, such as `light.living_room`, and the names of your network storage.
- Locations, such as the coordinates `52.37, 4.90`.
- Web addresses that you entered when you set up an integration, such as `https://api.example.com/data?key=abc123`.
  - For example, when the [RESTful](/integrations/rest/) integration can't reach an address, it logs the address. If the address contains a key, like `abc123` in the example, the key is in the log as well.

With debug logging, integrations can log the raw data that they exchange with devices and services, so expect all of the above and more. For example, [DHCP discovery](/integrations/dhcp/) logs the IP address, host name, and MAC address of devices on your network. The [Companion app](/integrations/mobile_app/) logs the data that your phone sends, including its location.

Integrations use other software, such as libraries for a device or a service. This software can also write to the log, for example, in error messages.

## Removing sensitive information from a log

When you ask for help with a problem, someone may ask you for a log, for example, in a bug report. Anyone you share a log with can read it. Before you share a log, review it and remove anything that you consider sensitive. To learn what a log can contain, refer to [Sensitive information in logs](#sensitive-information-in-logs).

If the problem is with one integration, consider sharing its diagnostics instead. Diagnostics are meant for sharing, and integrations hide known sensitive values in them. For the steps, refer to [Downloading diagnostics](/docs/configuration/troubleshooting/#downloading-diagnostics).

### Prerequisites

- Administrator rights.

### To remove sensitive information from a log

1. Download the log soon after the problem happens. For the steps, refer to [Downloading the logs](#downloading-the-logs).
   - The download contains the newest lines. Choose enough lines to include the problem.
2. Open the downloaded file in a text editor.
3. Remove the lines that have nothing to do with the problem.
4. Search the remaining lines for sensitive information, such as the examples in [Sensitive information in logs](#sensitive-information-in-logs), and for anything that gives access to an account or a device, such as a password, a key, or a token.
   - To find some of the examples, search for the following words. These words don't find all sensitive information, so also read the remaining lines yourself.
     - `Login attempt`: Finds the IP address and host name of a device whose login failed.
     - `login for`: Finds user names in the **Supervisor** log.
     - `wireless network`: Finds the name of your Wi-Fi network in the **Host** log.
     - `http`: Finds web addresses, including any key in them.
     - `mac=`: Finds MAC addresses in the debug messages of DHCP discovery.
     - `lat`, `gps`, and `coordinate`: Find locations.
     - `key`, `token`, and `password`: Find values that can give access.
   - Also search for values that you know, such as the name of your Wi-Fi network, your user name, or the names of your devices.
   - To find your IP addresses, search for the first part of the IP address of Home Assistant. To find it, go to {% my network title="**Settings** > **System** > **Network**" %}.
5. Replace each sensitive value with a placeholder, such as `REDACTED`.
   - Use the same placeholder each time the same value appears, for example, `DEVICE_1` for one device. Then the log still shows which messages belong together.
   - Use a different placeholder for each different value, for example, `DEVICE_1` and `DEVICE_2`.
   - Keep the rest of each line, such as the time, the name of the integration, and the error message. These help others find the cause of the problem.
6. Save the file, and share the edited copy.

If you shared anything that gives access, make sure it no longer works. Change the password, or delete the key or token, and then create a new one.

## Where the logs are stored

Where Home Assistant stores its logs depends on your installation type.

- {% term "Home Assistant Operating System" %}:
  - All logs are stored in the system journal of the operating system. They are kept across startups, until the space for logs is full.
  - Home Assistant doesn't write a `home-assistant.log` file in your configuration folder, unless you [turn that on](/common-tasks/os/logs/#writing-the-home-assistant-log-to-a-file).
  - For details, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/#where-the-logs-are-stored).
- {% term "Home Assistant Container" %}:
  - The log is stored in `home-assistant.log` in your [configuration folder](/docs/configuration/).
  - When Home Assistant starts, the log of the previous run is moved to `home-assistant.log.1`.
  - The container runtime also keeps the log. For example, with Docker, use `docker logs homeassistant`, if your container is named `homeassistant`, as in the installation steps.
  - If the `HA_DISABLE_LOG_FILE` environment variable is set, Home Assistant doesn't write `home-assistant.log`. Then you can't show the raw logs or download the log on the **Logs** page. For details, refer to the [Logger integration](/integrations/logger/).

On both installation types, if Home Assistant crashes, details of the crash are written to `home-assistant.log.fault` in your configuration folder.
