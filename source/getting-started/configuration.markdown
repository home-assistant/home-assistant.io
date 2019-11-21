---
title: "Advanced Configuration"
description: "Instructions to get Home Assistant configured."
---

Until now we have been able to configure Home Assistant purely via the user interface. However, not all options are accessible via the user interface. The other options are accessible via the Home Assistant configuration file called `configuration.yaml`. A default one is created when Home Assistant started for the first time.

<div class='note'>

This final step of the getting started only applies if you've installed Home Assistant via Hass.io. If you've used another installation method, [see here](/docs/configuration/).

</div>

We are going to help you make your first changes to `configuration.yaml`. To do this, we are going to install an add-on from the Hass.io add-on store: the HASS Configurator. To get to the add-on store, click on the menu icon in the top left, then click on Hass.io. On the new page, open the add-on store tab.

<p class='img'>
<img src='/images/hassio/screenshots/main_panel_addon_store.png' />
From the Hass.io main panel, open the add-on store.
</p>

Under the "Core" section you will find HASS Configurator.

 - Click on Configurator and click on INSTALL. When installation is complete, the UI will go to the add-on details page for the configurator.
 - Now start the add-on by clicking on START.
 - Open the user interface by clicking on OPEN WEB UI.

Now let's make a small change using the configurator: we are going to change the name and location of your Home Assistant installation.

 - Click the folder icon in the top left of the configurator window to open the file browser sidebar.
 - Click the `configuration.yaml` file (in the `/config/` folder) to load it into the main Configurator edit window.
 - Find the `homeassistant:` configuration block, which should be the first thing in `configuration.yaml`. In this block, update `name`, `latitude`, `longitude`, `unit_system` and `time_zone` to match yours.
 - Click the save icon in the top right to commit changes.
 - Most changes in `configuration.yaml` require Home Assistant to be restarted to see the changes. You can verify that your changes are acceptable by running a config check. Do this by clicking on Configuration in the sidebar, click on "Server Control" and click on the "CHECK CONFIG" button. When it's valid, it will show the text "Configuration valid!".
 - Now Restart Home Assistant using the "restart" in the Server management section on the same page. In order for "Check Config" to be visible, you must enable "Advanced Mode" on your user profile.

<p class='img'>
<img src='/images/screenshots/configuration-validation.png' />
Screenshot of the "General" page in the configuration panel.
</p>

### Editing config via Samba/Windows Networking

Maybe you are not a big fan of our web editor and want to use a text editor on your computer instead. This is possible by sharing the configuration over the network using the Samba add-on, which can also be installed from the Hass.io add-on store. This will make your configuration accessible via the network tab on your computer.

Go to the add-on store and look for Samba in the core section. After you have installed the add-on, click on START. Hass.io should now be available in the networking tab on your computer.

We suggest that to edit `configuration.yaml`, you use the free text editor [Visual Studio Code](https://code.visualstudio.com/) in combination with the [Home Assistant Config Helper extension](https://marketplace.visualstudio.com/items?itemName=keesschollaart.vscode-home-assistant).
