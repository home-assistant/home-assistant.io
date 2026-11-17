---
title: "Installing and managing apps"
description: "How to install apps from the app store, choose whether an app starts on boot, restarts after a crash, updates automatically, or runs in protection mode, change its network ports, check its resources, and uninstall it."
---

Apps (formerly known as add-ons) are applications that run alongside Home Assistant on the same system, such as a file editor. You install apps from the app store. For each app that you installed, you can choose how it starts, whether it restarts after a crash, and which network ports it uses. You can also check the system resources that an app uses, and uninstall an app that you no longer need.

Apps are only available on {% term "Home Assistant Operating System" %}.

## The app store

The app store lists the apps that you can install. To open it, go to {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}.

The app store groups the apps by repository. A repository is a collection of apps that someone publishes. The app store includes the following repositories by default:

- **Official apps**
- **Home Assistant Community Apps**
- **ESPHome**
- **Music Assistant**
- **Local apps**

You can also add app repositories from the community. Home Assistant can't guarantee the quality or security of apps from other repositories. For the steps, refer to [Installing a third-party app repository](/common-tasks/os/#installing-a-third-party-app-repository).

To check for new versions of the apps, in the app store, select **Menu** {% icon "mdi:dots-vertical" %} > **Check for updates**.

## Installing an app

You install apps from the app store. For the repositories that the app store includes, refer to [The app store](#the-app-store).

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To install an app

1. Go to {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}.
   - Result: The **App store** opens.
2. Select the app that you want to install.
   - To find an app, use the search field.
   - The app page shows the documentation of the app on the **Documentation** tab.
3. On the **Info** tab, select **Install**.
4. If the app needs settings before it can start, set them first. The **Documentation** tab tells you which settings are needed. Enter them on the **Configuration** tab, and then select **Save**.
5. On the **Info** tab, select **Start**.
   - To choose whether the app starts with the system, restarts after a crash, or updates automatically, refer to [App options](#app-options).

## App options

Each app has the following options on its **Info** tab. Some options are only shown for some apps.

- **Start on boot**: Starts the app when the system starts, for example, after a reboot. Restarting Home Assistant doesn't start the app.
- **Watchdog**: Restarts the app after it stops or crashes. If you stopped the app yourself, the watchdog doesn't restart it. Not shown for apps that only run once.
  - Some apps also report whether they still work. The watchdog checks this every 2 minutes. If the app doesn't respond twice in a row, the watchdog restarts it.
  - If a restart fails, the watchdog tries again, up to 5 times.
- **Auto update**: Updates the app when a new version is available. For details, refer to [Updating apps automatically](/common-tasks/general/updating/#updating-apps-automatically).
- **Show in sidebar**: Shows a shortcut to the app in the sidebar. Only shown for apps that have their own web interface.
- **Protection mode**: Prevents the app from getting full access to the system. Only shown for apps that can ask for more access, for example, full access to the hardware. Protection mode is on by default.

Some apps are managed by the system. On their **Info** tab, a **System managed** box says that their settings are configured automatically, and that your changes may be overwritten. Their options are locked. To change the options anyway, select **Take control** in that box. Home Assistant doesn't save this choice. After you reload the page, the options are locked again.

## Changing the options of an app

You can turn the options of an app on or off at any time. For what each option does, refer to [App options](#app-options).

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- If the app shows **System managed**, select **Take control** first. For details, refer to [App options](#app-options).

### To change the options of an app

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app.
2. On the **Info** tab, under **Controls**, turn the options on or off.
   - The change is saved right away.

## Turning off protection mode

Protection mode prevents an app from getting full access to the system. Some apps need full access to work.

An app without protection mode has full access to the entire system. If the app is compromised, your entire system is at risk. Only turn off protection mode for apps that you trust, and only if the app needs it.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- The app shows the **Protection mode** option.
- If the app shows **System managed**, select **Take control** first. For details, refer to [App options](#app-options).

### To turn off protection mode

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app.
2. On the **Info** tab, under **Controls**, turn off **Protection mode**.
   - Result: The app page shows **Protection mode disabled!**.
   - To turn protection mode on again, select **Enable**, and then restart the app.
3. If the app is running, under **Controls**, select **Restart**.
   - The change only takes effect when the app starts again.

## Changing the network ports of an app

Some apps use network ports, so that other devices on your network can reach them. You can change the port that your system uses for the app, for example, if another program already uses it. You can also turn off a port that you don't need.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- The app has a **Network** section on its **Configuration** tab.

### To change the network ports of an app

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app.
2. Select the **Configuration** tab.
3. Under **Network**, change the port numbers.
   - Each field shows the port inside the app, for example, `1883/tcp`, and a description of what it's for.
   - To turn off a port, clear its field. To show the ports that are turned off, select **Show disabled ports**.
   - To go back to the ports that the app uses by default, select **Reset to defaults**.
4. Select **Save**.
   - If the app is running, Home Assistant asks whether to restart it. The new ports are used after the restart.

## Checking the resources an app uses

Each app uses system resources: disk space, memory, and processor time. While an app runs, you can check how much memory and processor time it uses.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- The app is running.

### To check the resources an app uses

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app.
2. On the **Info** tab, check **CPU usage** and **RAM usage**.

## Uninstalling an app

When you uninstall an app, the app and everything in its private data folder are deleted. This includes databases, credentials, and other data that the app stored there. Some apps also have a configuration folder. You find it in the `app_configs` folder, which you can open with a file access app. For details, refer to [Configuring access to files](/common-tasks/os/#configuring-access-to-files). You can choose to keep or delete this folder.

To keep the data of an app, create a backup that includes the app before you uninstall it. For the steps, refer to [Creating a manual backup](/common-tasks/general/backups/#creating-a-manual-backup).

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- If the app shows **System managed**, select **Take control** first. For details, refer to [App options](#app-options).

### To uninstall an app

1. Go to {% my supervisor title="**Settings** > **Apps**" %}, and select the app.
2. On the **Info** tab, next to **Controls**, select **Menu** {% icon "mdi:dots-vertical" %} > **Uninstall**.
3. In the **Uninstall app** dialog, choose whether to delete the configuration folder of the app.
   - To also delete it, turn on **Also delete the app's configuration folder (if used)**.
   - To keep it, leave the option off. This is the default.
4. Select **Uninstall**.
