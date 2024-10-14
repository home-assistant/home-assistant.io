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

This guide assumes that you already have an operating system setup.
The instructions below will guide you through installing [uv](https://docs.astral.sh/uv/) which ships with downloadable python installations for most platforms.
If for some reason it cannot find a python download for your operating system you will need to install Python {{site.installation.versions.python}} yourself.

### Install dependencies

Before you start, make sure your system is fully updated, all packages in this guide are installed with `apt`, if your OS does not have that, look for alternatives.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

Install the dependencies:

```bash
sudo apt-get install -y bluez libffi-dev libssl-dev libjpeg-dev zlib1g-dev autoconf build-essential libopenjp2-7 libtiff6 libturbojpeg0-dev tzdata ffmpeg liblapack3 liblapack-dev libatlas-base-dev
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

### Create the homeassistant user

First we will create a directory for the installation of Home Assistant Core, change the owner to the `homeassistant` account, and login as the new user.

```bash
sudo mkdir /srv/homeassistant
sudo chown homeassistant:homeassistant /srv/homeassistant
sudo -u homeassistant -H -s
```

### Install uv

This will install the uv package and project manager.

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.cargo/env
```

### Create the virtual environment

Next up is to create and change to a virtual environment for Home Assistant Core. This will be done as the `homeassistant` account.

```bash
cd /srv/homeassistant
uv venv --python {{ site.installation.versions.python }} .
source bin/activate
```

Once you have activated the virtual environment (notice the prompt change to `(homeassistant) homeassistant@raspberrypi:/srv/homeassistant $`) it is now time to install Home Assistant Core!

```bash
uv pip install homeassistant=={{ site.current_major_version }}.{{ site.current_minor_version }}.{{ site.current_patch_version }}
```

Start Home Assistant Core for the first time. This will complete the installation for you, automatically creating the `.homeassistant` configuration directory in the `/home/homeassistant` directory, and installing any basic dependencies.

```bash
hass
```

You can now reach your installation via the web interface on `http://homeassistant.local:8123`.

If this address doesn't work you may also try `http://localhost:8123` or `http://X.X.X.X:8123` (replace X.X.X.X with your machines’ IP address).

{% note %}

When you run the `hass` command for the first time, it will download, install and cache the necessary libraries/dependencies. This procedure may take anywhere between 5 to 10 minutes. During that time, you may get a **site cannot be reached** error when accessing the web interface. This will only happen the first time. Subsequent restarts will be much faster.

{% endnote %}
