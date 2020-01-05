---
title: "Configurator"
description: "Instructions on how to install and use the Configurator"
redirect_from: /ecosystem/hass-configurator/
---

### Configuration UI for Home Assistant

Since there is currently no nice way to edit the YAML files Home Assistant is using through the frontend, here is a small webapp that hopefully makes configuration easier. It is a customized and embedded [Ace editor](https://ace.c9.io/), which has syntax highlighting for YAML, the format used for Home Assistant's configuration files. There is also an integrated file browser to select whatever file you want to edit. When you're done editing the file, simply click the save button and your changes will be applied.
This is essentially a browser-based alternative to modifying your configuration through SSH, Windows + SMB, Github, etc.

<p class='img'>
<img src='/images/hassio/screenshots/addon-hass-configurator.png'>
Screenshot of the Configurator.
</p>

### Feature list

- Web-based editor to modify your files
- Upload and download files
- Git integration
- List of available triggers, events, entities, conditions and services. Selected element gets inserted into the editor at the last cursor position.
- Check valid configuration and restart Home Assistant directly with the click of a button
- SSL support
- Optional authentication and IP filtering for additional security
- Direct links to Home Assistant documentation and icons
- Execute shell commands
- Runs on pretty much any machine Home Assistant can run on

<div class='note warning'>
This tool allows you to browse your filesystem and modify files. So be careful which files you edit, or you might break critical parts of your system.<br />
Consider running the configurator as a user with limited privileges to limit possible damage.
</div>

### Installation (Linux, macOS)
There are no dependencies on Python modules that are not part of the standard library. All the fancy JavaScript libraries are loaded from CDN (which means this doesn't work when you're offline).
- Copy [configurator.py](https://github.com/danielperna84/hass-configurator/blob/master/configurator.py) to your Home Assistant configuration directory (e.g `/home/homeassistant/.homeassistant`): `wget https://raw.githubusercontent.com/danielperna84/hass-configurator/master/configurator.py`
- Make it executable: `sudo chmod 755 configurator.py`
- (Optional) Set the `GIT` variable in configurator.py to `True` if [GitPython](https://gitpython.readthedocs.io/) is installed on your system. This is required if you want to make use of the Git integration.
- Execute it: `sudo ./configurator.py`
- To terminate the process do the usual `CTRL+C`, maybe once or twice

### Configuration
Near the top of the `configurator.py` file you will find some global variables you can change to customize the configurator. When setting variables of the type _string_, the string must be within quotation marks. The default settings are fine for just checking out the configurator quickly. For more customized setups it might be advisable to change some settings.
To keep your settings across updates it is also possible to save settings in an external file. In that case copy [settings.conf](https://github.com/danielperna84/hass-configurator/blob/master/settings.conf) wherever you like and append the full path to the file to the command when starting the configurator. e.g., `sudo .configurator.py /home/homeassistant/.homeassistant/mysettings.conf`. This file is in JSON format, so make sure it has a valid syntax (you can set the editor to JSON to get syntax highlighting for the settings). The major difference to the settings in the .py file is that `None` becomes `null`.

#### LISTENIP (string)
The IP the service is listening on. By default it is binding to `0.0.0.0`, which is every interface on the system.
#### LISTENPORT (integer)
The port the service is listening on. By default it is using `3218`, but you can change this if you need to.
#### BASEPATH (string)
It is possible to place configurator.py somewhere else. Set the `BASEPATH` to something like `"/home/homeassistant/.homeassistant"`, and no matter where you are running the configurator from, it will start serving files from there. This is needed if you plan on running the configurator with systemd or some other way of daemonizing the configurator.
#### SSL_CERTIFICATE / SSL_KEY (string)
If you are using SSL, set the paths to your SSL files here. This is similar to the SSL setup you can do in Home Assistant.
#### HASS_API (string)
The configurator fetches some data from your running Home Assistant instance. If the API is not available through the default URL, modify this variable to fix this.
#### HASS_API_PASSWORD (string)
If you plan on using the restart button, you have to set your API password. Calling the restart service of Home Assistant is prohibited without authentication.
#### CREDENTIALS (string)
Set credentials in the form of `"username:password"` if authentication should be required for access to the configurator.
#### ALLOWED_NETWORKS (list)
Limit access to the configurator by adding allowed IP addresses / networks to the list, e.g `ALLOWED_NETWORKS = ["192.168.0.0/24", "172.16.47.23"]`
#### BANNED_IPS (list)
List of statically banned IP addresses, e.g., `BANNED_IPS = ["1.1.1.1", "2.2.2.2"]`
#### BANLIMIT (integer)
Ban IPs after `n` failed login attempts. Restart the service to reset banning. The default of `0` disables this feature. `CREDENTIALS` has to be set for this to work.
#### IGNORE_PATTERN (list)
Files and folders to ignore in the UI, e.g., `IGNORE_PATTERN = [".*", "*.log", "__pycache__"]`.
#### DIRSFIRST (bool)
If set to `True`, directories will be displayed at the top of the filebrowser.
#### GIT (bool)
Set this variable to `True` to enable Git integration. This feature requires [GitPython](https://gitpython.readthedocs.io)
 to be installed on the system that is running the configurator. For technical reasons this feature cannot be enabled with the static settings file.

__Note regarding `ALLOWED_NETWORKS`, `BANNED_IPS` and `BANLIMIT`__:
The way this is implemented works in the following order:

1. (Only if `CREDENTIALS` is set) Check credentials
  - Failure: Retry `BANLIMIT` times, after that return error 420 (unless you try again without any authentication headers set, such as in a private tab of your browser)
  - Success: Continue
2. Check if client IP address is in `BANNED_IPS`
  - Yes: Return error 420
  - No: Continue
3. Check if client IP address is in `ALLOWED_NETWORKS`
  - Yes: Continue and display UI of configurator
  - No: Return error 420

### Embedding into Home Assistant
Home Assistant has the [panel_iframe](/integrations/panel_iframe/) component. With this it is possible to embed the configurator directly into Home Assistant, allowing you to modify your configuration through the Home Assistant frontend.
An example configuration would look like this:

```yaml
panel_iframe:
  configurator:
    title: Configurator
    icon: mdi:wrench
    url: http://123.123.132.132:3218
```

<div class='note warning'>
Be careful when setting up port forwarding to the configurator while embedding it into Home Assistant. If you don't restrict access by requiring authentication and/or blocking based on client IP addresses, your configuration will be exposed to the Internet!
</div>

### Daemonizing / Keeping the configurator running
Since the configurator script on its own is not a service, you will have to take some extra steps to keep it running. Here are five options (for Linux), but there are more depending on your usecase.

1. Fork the process into the background with the command:
`nohup sudo ./configurator.py &`
2. If your system is using systemd (that's usually what you'll find on a Raspberry Pi), there's a [template file](https://github.com/danielperna84/hass-configurator/blob/master/hass-configurator.systemd) you can use and then apply the same process to integrate it as mentioned in the [Home Assistant documentation](/docs/autostart/systemd/). If you use this method you have to set the `BASEPATH` variable according to your environment.
3. If you have [supervisor](http://supervisord.org/) running on your system, [hass-poc-configurator.supervisor](https://github.com/danielperna84/hass-configurator/blob/master/hass-configurator.supervisor) would be an example configuration you could use to control the configurator.
4. A tool called [tmux](https://tmux.github.io/), which should be pre-installed with [HASSbian](/docs/installation/hassbian/).
5. A tool called [screen](http://ss64.com/bash/screen.html) (alternative to tmux). If it's not already installed on your system, you can do `sudo apt-get install screen` or `sudo yum install screen` to get it. When it's installed, start a screen session by executing `screen`. Then navigate to your Home Assistant directory and start the configurator like described above. Put the screen session into the background by pressing `CTRL+A` and then `CTRL+D`. It is now safe to disconnect from your SSH session.
To resume the screen session, log in to your machine and execute `screen -r`.

### Troubleshooting, Issues etc.
If you encounter difficulties setting up the configurator or stumble upon a possible bug, head over to the [Issues](https://github.com/danielperna84/hass-configurator/issues) section of the configurator repository. Additionally there is a thread at the [Home Assistant Community](https://community.home-assistant.io/t/simplistic-configuration-ui/10175) where common problems may have been discussed already. And if not, there are always friendly people around to help finding solutions.
