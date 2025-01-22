---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

After Home Assistant has been [installed](/installation/) on your device, there are 5 steps to complete setting up Home Assistant.

1. Enter the following URL into the browser's address bar: [http://homeassistant.local:8123/](http://homeassistant.local:8123/).
   - **Result**: You now see the **Preparing Home Assistant** page. Depending on your hardware and internet connection, preparation may take a while.
     - Home Assistant downloads the latest version of {% term "Home Assistant Core" %} (about 700&nbsp;MB).
   - If you ran into issues with this step, refer to the [installation troubleshooting](/installation/troubleshooting/).
   - Once preparation is finished, the welcome screen is shown.

    ![Home Assistant preparation](/images/getting-started/onboarding_preparing_01_.png)

2. You can either create a new installation or recover an existing installation from a backup:
   - **Option 1: new installation**: If this is your initial installation, we will now create the owner's account of Home Assistant.
     - {% icon "mdi:information-outline" %} This account is an administrator account. It will always be able to change everything.
     - Select **Create my smart home**.

        ![Home Assistant preparation](/images/getting-started/onboarding_preparing_02.png)
     - Enter a name, username, and password.
       - Make sure the username is lowercase and contains no whitespace.
       - {% icon "mdi:info" %} **Info**: The **Name** is the name of the person the is shown in the UI. The username is used for login.

        ![Set your username and password.](/images/getting-started/onboarding_username.png)
     - Store the name, username, and password somewhere safe. There is no way to recover the owner credentials.
     - Select **Create account**.

   - **Option 2: restore from backup**: If you want to restore a backup of a previous installation, select **Restore from backup**.
     - Ignore the rest of this procedure and continue with the procedure on [restoring from backup](/common-tasks/general/#restoring-a-backup).
       - If you have a Home Assistant Yellow, start with the [Yellow documentation on restoring from backup](https://yellow.home-assistant.io/guides/restore-backup/).
       - If you have a Home Assistant Green, start with the [Green documentation on restoring from backup](https://green.home-assistant.io/guides/restore-backup/).

3. Enter the location of your home.
   - The home location is used to configure the time zone, unit system, and currency.
   - It is also used to create the home [zone](/integrations/zone/), which designates the area of your home with a default radius of 100&nbsp;m.
   - You can always change this information later in the settings.
   - This home zone can be used for automations such as showing the weather, opening the shades at sunrise, or starting the vacuum when you leave the home.
   - After finding your location, select **Next**.

    ![Define your location.](/images/getting-started/onboarding_location.png)

4. Select which information you are willing to share.
    - Sharing is disabled by default. However, we would like to encourage you to share some of this data.
    - This information helps us find out which platforms we need to support and where to focus our efforts.
    - The data is anonymized and aggregated. To see the charts we generate out of this data, take a look at our [analytics page](https://analytics.home-assistant.io/).
    - To confirm, select **Next**.
   ![Share anonymized data](/images/getting-started/onboarding_share_anonymized_info.png)

5. Check out the {% term devices %} Home Assistant has discovered on your network.
    - Don't be alarmed if you see fewer items than shown below; you can always manually add devices later.
    - Select **Finish**.
    ![Discovery of devices on your network.](/images/getting-started/onboarding_devices.png)

6. {% icon "mdi:party-popper" %} You’ve now got Home Assistant up and running.
   - You now see the default [dashboard](/dashboards/).
   - If some of your devices were discovered and set up automatically, this shows those devices.

{% include getting-started/next_step.html step="Concepts & Terminology" link="/getting-started/concepts-terminology/" %}
