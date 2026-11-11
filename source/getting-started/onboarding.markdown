---
title: "Onboarding Home Assistant"
description: "Set up Home Assistant for the first time. Create your account, restore from a backup, or pick up where you left off."
---

After you have [installed](/installation/) Home Assistant on your device, there are three steps to complete the setup. The entire onboarding takes only a few minutes and is done in your browser. You don't need to use the command line or write any code.

## Step 1: Open the welcome screen

In your browser, open the address shown in your installation guide.

- For {% term "Home Assistant Operating System" %}, this is usually `http://homeassistant.local/`.
  - If Home Assistant does not open at that address, try `http://homeassistant.local:8123/`.
  - Result: You now see the **Preparing Home Assistant** page, while Home Assistant downloads its latest version. This might take 20 minutes or more, depending on your hardware and internet connection. Once preparation is finished, the welcome screen is shown.
- For {% term "Home Assistant Container" %}, this is usually `http://YOUR_HOST:8123`, where `YOUR_HOST` is the host name or IP address of the computer running Home Assistant Container.
  - Result: The welcome screen is shown.
- If you run into issues with this step, refer to the [installation troubleshooting](/installation/troubleshooting/).

## Step 2: Create a new installation or restore a backup

On the welcome screen, choose whether to create an account for a new installation or restore a backup.

![Screenshot of the Home Assistant welcome screen.](/images/getting-started/onboarding_preparing_01_.png)

### Creating an account for a new installation

To create an account for your new installation:

1. On the welcome screen, select **Create my smart home**.
2. Enter a **Name**, **Username**, and **Password**, and repeat the password under **Confirm password** to create the owner account of Home Assistant.
   - Make sure the username is lowercase and contains no spaces.
   - The **Name** is shown in the interface. You use the **Username** to log in.
   - Store the name, username, and password somewhere safe. There is no way to recover the owner credentials.

   ![Screenshot of the Create user form.](/images/getting-started/onboarding_username.png)

3. Select **Create account**.
   - Result: The owner account of Home Assistant is created.
   - This account is an administrator account. It can always change all settings.

### Restoring a configuration from a backup

To restore a backup of a previous installation:

1. On the welcome screen, under **Or restore**, select **Upload backup** or **Home Assistant Cloud**.
2. Refer to [Restoring a backup during onboarding](/common-tasks/general/backups/#restoring-a-backup-during-onboarding) for the steps.
   - If you have a Home Assistant Yellow, follow the [Yellow documentation on restoring or migrating from a backup](https://support.nabucasa.com/hc/articles/25454643790237).
   - If you have a Home Assistant Green, follow the [Green documentation on restoring or migrating from a backup](https://support.nabucasa.com/hc/articles/25160431579165).

## Step 3: Finish the setup

In this last step, you define the location of your home, choose the data that you want to share, and finish your setup. The location of your home is used to create the [home zone](/integrations/zone/#about-the-home-zone). To change it later, refer to [editing zones](/integrations/zone/#adding-a-new-zone-or-editing-zones).

1. Enter the location of your home. Do one of the following:
   - Search for your address under **Search address**.
   - Select **Detect** {% icon "mdi:crosshairs-gps" %} at the end of the search field to let Home Assistant detect the location of your home.
     - If your browser can share its location (for example, when you access Home Assistant over HTTPS), your browser might ask for permission to share it.
     - Otherwise, Home Assistant asks if it may detect your location by making a one-time request to an external service. Confirm to continue.
   - Drag the home marker {% icon "mdi:home" %} on the map to the location of your home.
2. Select **Next**.
   - If Home Assistant can't determine the country or time zone from your location, it asks for them, so that it uses the correct units. Select your **Country** and, if shown, your **Time zone**, and then select **Next**.
3. On the **Help us help you** screen, select which information you are willing to share, and then select **Next**.

   ![Screenshot of the Help us help you screen with options to share basic analytics, usage, statistical data, and diagnostics.](/images/getting-started/onboarding_share_anonymized_info.png)

   - Sharing is turned off by default. Sharing some of this data helps the Home Assistant project find out which platforms to support and where to focus its efforts.
   - **Usage** and **Statistical data** require **Basic analytics**. Turning on one of them also turns on **Basic analytics**. Turning off **Basic analytics** also turns them off.
   - The data is anonymized and aggregated. To see the charts made from this data, take a look at the [analytics page](https://analytics.home-assistant.io/).
4. Review the final setup screen.
   - If Home Assistant has found compatible devices, you see **We found compatible devices!** and a list of the discovered {% term integrations %}. Some are already added, while others might need additional configuration.
   - If no compatible devices are found, you see **All set!** instead.
5. Select **Finish** to complete onboarding and open the default [dashboard](/dashboards/).

{% include getting-started/next_step.html step="Concepts & Terminology" link="/getting-started/concepts-terminology/" %}
