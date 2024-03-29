---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

After your Home Assistant server is up and running, there are 5 simple steps to log in and see your devices.

**Step 1**: type  <http://homeassistant.local:8123/> into your browser.
![Home Assistant preparation](/images/getting-started/onboarding_preparing_01_.png)

{% details If that didn’t work %}
If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at homeassistant:8123 or http://X.X.X.X:8123 (replace X.X.X.X with your device’s IP address).
{% enddetails %}

**Step 2:** Click on “Create my Smart Home”.

This will create an administrator account. It will always be able to change everything in Home Assistant. Enter your name, username, and password and click “Create Account”.

**Be sure to save this information safely as there is no way to recover it!**
![Set your username and password.](/images/getting-started/username.png)

{% details If you want to restore from backup instead%}
If you want to restore from a backup of a previous installation, select Restore from backup.

Continue with the procedure on restoring from backup.
You can ignore the remaining steps listed on this page

{% enddetails %}

**Step 3:** Enter the location of your home.

The location is used to configure the time zone, unit system, and currency. It is also used for automations that would show the weather, open the shades at sunrise, or start the vacuum when you leave the home.

You can always change this information later in settings.
![Define your location.](/images/getting-started/onboarding_location.png)

**Step 4:** Improving Home Assistant.

Home Assistant can use anonymous information about your system to improve the product. This is disabled by default. However, we would like to encourage you to share some of this data as it helps us to find out which platforms we need to support and where to focus our efforts.

The data is anonymized and aggregated. To see the charts we generate out of this data, take a look at our [analytics page](https://analytics.home-assistant.io/)

Once you are done, select Next.
![Share anonymized data](/images/getting-started/onboarding_share_anonymized_info.png)

**Step 5: Show found devices.**

Home Assistant will then try to find any devices it has discovered on your network. What shows up depends on the devices in your home. Don’t worry if you don’t see anything but your name at the top. You can add more devices later.

Select Finish.
![Discovery of devices on your network.](/images/getting-started/onboarding_devices.png)

You’ve now got your basic Home Assistant server up and running.

{% include getting-started/next_step.html step="Concepts & Terminology" link="/getting-started/concepts-terminology/" %}
