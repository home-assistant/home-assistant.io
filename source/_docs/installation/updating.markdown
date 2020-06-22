---
title: "Updating Home Assistant"
description: "Step to update Home Assistant."
redirect_from: /getting-started/updating/
---

<div class='note warning'>

The upgrade process differs depending on the installation you have, so please review the documentation that is specific to your install: [Home Assistant](/hassio/) or [Home Assistant Core](/docs/installation/virtualenv/#upgrading-home-assistant).

</div>

Check what's new in the latest version and potentially impacts your system in the [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). It is good practice to review these release notes and pay close attention to the **Breaking Changes** that are listed there. If you haven't done an update for a while, you should also check previous release notes as they can also contain relevant **Breaking Changes**. These **Breaking Changes** may require configuration updates for your components. If you missed this and Home Assistant refuses to start, check the log file in the [configuration](/docs/configuration/) directory, e.g., `.homeassistant/home-assistant.log`, for details about broken components.

<div class='note'>

To avoid permission errors, the upgrade must be run as the same user as was used during the initial installation, again review the documentation specific to your install [Home Assistant](/hassio/) or [Home Assistant Core](/docs/installation/virtualenv).

</div>

The default way to update Home Assistant to the latest release, when available, is:

```bash
pip3 install --upgrade homeassistant
```

For a Docker container, simply pull the latest stable one:

```bash
sudo docker pull homeassistant/home-assistant:stable
```

For a Raspberry Pi Docker container, simply pull the latest stable one:

```bash
sudo docker pull homeassistant/raspberrypi3-homeassistant:stable
```

After updating, you must start/restart Home Assistant for the changes to take effect. This means that you will have to restart `hass` itself.
Startup can take a considerable amount of time (i.e., minutes) depending on your device. This is because all requirements are updated as well.

[BRUH automation](https://www.bruhautomation.io/) has created [a tutorial video](https://www.youtube.com/watch?v=tuG2rs1Cl2Y) explaining how to upgrade Home Assistant.

## Run a specific version

In the event that a Home Assistant version doesn't play well with your hardware setup, you can downgrade to a previous release:

```bash
pip3 install homeassistant==0.XX.X
```

## Run the beta version

If you would like to test the next release before anyone else, you can install the beta version released every two weeks:

```bash
pip3 install --pre --upgrade homeassistant
```

## Run the development version

If you want to stay on the bleeding-edge Home Assistant development branch, you can upgrade to `dev`.

<div class='note warning'>
  The "dev" branch is likely to be unstable. Potential consequences include loss of data and instance corruption.
</div>

```bash
pip3 install --upgrade git+git://github.com/home-assistant/home-assistant.git@dev
```

## Update Home Assistant installation

Best practice for updating a Home Assistant installation:

1. Backup your installation, using the snapshot functionality Home Assistant offers.
2. Check the release notes for breaking changes on [Home Assistant release notes](https://github.com/home-assistant/home-assistant/releases). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f`) and search for **Breaking Changes**.
3. Check your configuration using the [Check Home Assistant configuration](/addons/check_config/) add-on.
4. If the check passes, you can safely update. If not, update your configuration accordingly.
5. Update Home Assistant.
