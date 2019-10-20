---
title: "Common tasks on Hassbian"
description: "Instructions on how to do common tasks on Hassbian."
redirect_from: /docs/hassbian/common-tasks/
---

### Login to the Raspberry Pi

To login to your Raspberry Pi running Hassbian you're going to be using a ssh client. Depending on your platform there are several alternatives for doing this. Linux and Mac OS generally have a ssh client installed. Windows users are recommended to download and install the ssh client [Putty][ssh-putty].

Connect to the Raspberry Pi over ssh. Default user name is `pi` and password is `raspberry`.
Linux and Mac OS users execute the following command in a terminal.

```bash
ssh pi@ip-address-of-pi
```

Windows users start [Putty][ssh-putty], enter the IP address of the Raspberry Pi in the *Host name* field and port 22 in the *Port* field. Then click *Open* and a terminal window will open. Enter the credentials. Default user name is `pi` and password is `raspberry`.

Optionally, starting with Windows 10 anniversary update, you can use the built-in '[Bash on Windows][bash-windows]' to use SSH if you have enabled Developer mode and have installed the "Windows Subsystem for Linux (beta)" feature.

### Start/Stop/Restart Home Assistant

Log in as the `pi` account and execute the following commands:

```bash
sudo systemctl stop home-assistant@homeassistant.service
```

Replace `stop` with `start` or `restart` to get the desired functionality.
To get the current state of the `homeassistant.service` replace `stop` with `status`.

### Update Home Assistant

<div class='note'>

You can use `hassbian-config` to automate the process by running `sudo hassbian-config upgrade homeassistant`

</div>

Log in as the `pi` account and execute the following commands:

```bash
sudo systemctl stop home-assistant@homeassistant.service
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
pip3 install --upgrade homeassistant
exit
sudo systemctl start home-assistant@homeassistant.service
```

This will in order do the following:

- Stop the Home Assistant service running on Hassbian
- Open a shell as the `homeassistant` user running the Homeassistant service and that has ownership over the Home Assistant installation.
- Change into the virtual Python environment at `/srv/homeassistant/` containing the Home Assistant installation.
- Upgrade the Home Assistant installation to the latest release.
- Exit the shell and return to the `pi` user.
- Start the Home Assistant service.

### Manually launch Home Assistant

Log in as the `pi` account and execute the following commands:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
hass
```

This will start Home Assistant in your shell and output anything that ends up in the log and more into the console. This will fail if the Home Assistant service is already running so don't forget to [stop][stop-homeassistant] it first. If you want the log output to be colored, execute `hass --script check_config` first. This will install the `colorlog` module.

### Check your configuration

Log in as the `pi` account and execute the following commands:

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
hass --script check_config
```

This will output any errors in your configuration files to console.

### Read the Home Assistant log file

Log in as the `pi` account and execute the following commands:

```bash
sudo -u homeassistant -H -s
cd /home/homeassistant/.homeassistant
nano home-assistant.log
```

This will in order do the following:

- Open a shell as the `homeassistant` user.
- Change directory to the Home Assistant configuration directory.
- Open the log file in the nano editor.

Optionally, you can also view the log with `journalctl`.
Log in as the `pi` account and execute the following commands:

```bash
sudo journalctl -fu home-assistant@homeassistant.service
```

### Edit the Home Assistant configuration

Log in as the `pi` account and execute the following commands:

```bash
sudo -u homeassistant -H -s
cd /home/homeassistant/.homeassistant
nano configuration.yaml
```

This will in order do the following:

- Open a shell as the `homeassistant` user.
- Change directory to the Home Assistant configuration directory.
- Open the configuration file in the nano editor.

It's generally recommended that you read the [Getting started][configuring-homeassistant] guide for how to configure Home Assistant.

### Change locale, timezone and keyboard layout

```bash
sudo raspi-config
```

[configuring-homeassistant]: /getting-started/configuration/
[ssh-putty]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
[stop-homeassistant]: /docs/installation/hassbian/common-tasks/#startstoprestart-home-assistant
[bash-windows]: https://msdn.microsoft.com/en-us/commandline/wsl/about
