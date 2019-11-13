---
title: "Onboarding Home Assistant"
description: "Instructions to get Home Assistant configured."
---

Alright, you made it here. The tough part is done.

With Home Assistant installed, it's time to configure it. Here you will create the owner account of Home Assistant. This account will be an administrator and will always be able to change everything. Enter a name, username, password and click on "create account".

<p class='img'>
<img src='/source/getting-started/screenshots/01 - username.png' />
Set your username and password.
</p>

Next, you can enter a name for your home and set your location and unit system. Click DETECT to find your location and set your time zone and unit system based on that location. If you'd rather not send your location, you can set these values manually.

<p class='img'>
<img src='/source/getting-started/screenshots/03 - location.png' />
Set your location, time zone, and unit system.
</p>

Once you are done, click Next. In this screen, Home Assistant will show any devices that it has discovered on your network. Don't be alarmed if you see fewer items than what is shown below; you can always manually add devices later.

<p class='img'>
<img src='/source/getting-started/screenshots/04 - devices.png' />
Discovery of devices on your network.
</p>

Finally, click Finish. Now you're brought to the main screen of Home Assistant called Lovelace. This screen will show all of your devices. So let's get that screen filled up!

<p class='img'>
<img src='/source/getting-started/screenshots/05 - lovelace.png' />
The Lovelace user interface.
</p>

Click on Configuration in the sidebar on the left. On the next screen, click on Integrations. At this screen you will be able to set up integrations with Home Assistant. You might notice a "discovered" section. This section contains integrations that were found on your network and can easily be added with a few clicks. If your integrations are not discovered, click the + button in the lower right and search for your integration in that list.

<p class='img'>
<img src='/source/getting-started/screenshots/07 - integrations.png' />
The integrations page in the configurations panel shows you all your configured integrations.
</p>

When each integration is done setting up, it will ask you to put the new devices in areas. Areas allow you to organize all the devices in your home.

When you're done, navigate back to Lovelace and voila, your devices are ready for you to control.

### [Next step: Automate Home Assistant &raquo;](/getting-started/automation/)
