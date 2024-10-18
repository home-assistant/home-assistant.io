## Install Home Assistant Core

{% if page.installation_type == 'windows' %}
### Install WSL

To install {% term "Home Assistant Core" %}  on Windows, you will need to use the Windows Subsystem for Linux (WSL). Follow the [WSL installation instructions](https://docs.microsoft.com/windows/wsl/install-win10) and install Ubuntu from the Windows Store.

As an alternative, Home Assistant OS can be installed in a Linux guest VM. Running {% term "Home Assistant Core" %}  directly on Windows is not supported.
{% endif %}

{% caution %}
This is an advanced installation process, and some steps might differ on your system. Considering the nature of this installation type, we assume you can handle subtle differences between this document and the system configuration you are using. When in doubt, please consider one of the [other installation methods](/installation/), as they might be a better fit instead.
{% endcaution %}

### Prerequisites

This guide assumes that you already have an operating system setup and have installed Python {{site.installation.versions.python}} (including the package `python3-dev`) or newer.

### Install dependencies

Before you start, make sure your system is fully updated, all packages in this guide are installed with `apt`, if your OS does not have that, look for alternatives.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

Install the dependencies:

```bash
sudo apt-get install -y python3 python3-dev python3-venv python3-pip bluez libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev libatlas-base-dev
```

The above-listed dependencies might differ or missing, depending on your system or personal use of Home Assistant.

### Create an account

Add an account for Home Assistant Core called `homeassistant`.
Since this account is only for running Home Assistant Core the extra arguments of `-rm` is added to create a system account and create a home directory.
{%- if site.installation.types[page.installation_type].board %}
The arguments `-G dialout,gpio,i2c` adds the user to the `dialout`, `gpio` and the `i2c` group. The first is required for using Z-Wave and Zigbee controllers, while the second is required to communicate with GPIO.

```bash
sudo useradd -rm homeassistant -G dialout,gpio,i2c
```

{% else %}

```bash
sudo useradd -rm homeassistant
```

{% endif %}

### Create the virtual environment

First we will create a directory for the installation of Home Assistant Core and change the owner to the `homeassistant` account.

```bash
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
```

Next up is to create and change to a virtual environment for Home Assistant Core. This will be done as the `homeassistant` account.

```bash
sudo -u homeassistant -H -s
cd /srv/homeassistant
python3 -m venv .
source bin/activate
```

Once you have activated the virtual environment (notice the prompt change to `(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $`) you will need to run the following command to install a required Python package.

```bash
python3 -m pip install wheel
```

Once you have installed the required Python package, it is now time to install Home Assistant Core!

```bash
pip3 install homeassistant=={{ site.current_major_version }}.{{ site.current_minor_version }}.{{ site.current_patch_version }}
```

**Troubleshooting**: If you do not see the above version of Home Assistant package in your environment, make sure you have the correct Python version installed, as defined under the [Prerequisites](#prerequisites).

Start Home Assistant Core for the first time. This will complete the installation for you, automatically creating the `.homeassistant` configuration directory in the `/home/homeassistant` directory, and installing any basic dependencies.

```bash
hass
```

You can now reach your installation via the web interface on `http://homeassistant.local:8123`.

If this address doesn't work you may also try `http://localhost:8123` or `http://X.X.X.X:8123` (replace X.X.X.X with your machines’ IP address).

{% note %}

When you run the `hass` command for the first time, it will download, install and cache the necessary libraries/dependencies. This procedure may take anywhere between 5 to 10 minutes. During that time, you may get a **site cannot be reached** error when accessing the web interface. This will only happen the first time. Subsequent restarts will be much faster.

{% endnote %}
