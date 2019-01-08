---
layout: page
title: "Installation on a Synology NAS"
description: "Instructions to install Home Assistant on a Synology NAS."
date: 2018-12-05 10:36
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-synology/
---

<p class="note warning">
Synology only provides [Python 3.5.1](https://www.synology.com/en-global/dsm/packages/py3k), which is not compatible with Home Assistant 0.65.0 or later.<br/>
If you want to run newer Home Assistant versions, you will need to make a new Python 3 package, which will be detailed in this guide, otherwise you can follow the instructions "[Using older Python 3 provided by Synology](#using-older-python-3-provided-by-synology)" at the bottom of this page.
</p>

There are 2 alternatives, when using Home Assistant on Synology NAS:
1. Using Docker (Recommended)
1. Directly running on DSM

Option 1 is described on the [Docker installation page](/docs/installation/docker/#synology-nas), whereas Option 2 is described below, but as the instructions below require compilation, our recommendation is to run Home Assistant on Docker (If available) or a Raspberri Pi.

The following configuration has been tested on [Synology DS115j](https://www.synology.com/en-global/products/DS115j) running DSM 6.2.1-23824 Update 1.

Running these commands will:
* Compile the required new Python 3 package
* Install Home Assistant
* Enable Home Assistant to be launched on http://*Synology_IP*:8123

Using the [Synology webadmin](https://www.synology.com/en-global/knowledgebase/DSM/help):
* Install compiled Python 3 package using the [Synology Package Center](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)
* Create "homeassistant" user
* Create "homeassistant" [Shared-Folder](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_share_desc)
* Enable [SSH](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal) service
* Optionally start Home Assistant on bootup of your Synology NAS

## {% linkable_title Getting prerequisites) %}

#### {% linkable_title Installing Docker on [Mint, Ubuntu or derivatives](https://docs.docker.com/install/linux/docker-ce/ubuntu/) %}

Install Docker:
```bash
# sudo apt-get update
# sudo apt install docker.io
```
Start Docker and enable start on system bootup:
```bash
# sudo systemctl start docker
# sudo systemctl enable docker
```

#### {% linkable_title Preparing compiling environment %}

Install Git:
```bash
# sudo apt-get install git
```
Fork and clone [spksrc](https://github.com/SynoCommunity/spksrc), this will make a directory "~/spksrc":
```bash
git clone https://github.com/SynoCommunity/spksrc.git ~/spksrc
```

Edit the following 2 files.

These edits will make cross compiled Python module packages, which Home Assistant needs to install. These edits also enable use of the "[Cloud](/components/cloud/)" and [Homekit](/components/homekit/)" components.
Most components will setup just fine, but certain components need a python package that compiles on installation, which will fail as Synology did not provide a compiler, causing said need for cross compilation.

Edit "*~/spksrc/spk/python3/src/requirements.txt*" and add the following text to the end of the file:
```
## It may happen you want to add a component to Home Assistant, but it fails to install a Python package.
## In the logs you see a error "Unable to install package *Module_Name*", if you install that
# package with pip, some of its required packages fail with error "Failed building wheel for *Module_Name*"
## Add these Python modules/packages that fail with that "building wheel" error in to the list below.

# Example format of module:
#pythonmodule==version

## Cross compilation requirements for installing Home Assistant (Tested to work on 84.3).
cffi==1.11.5
bcrypt==3.1.4
cryptography==2.3.1

## Cross compilation requirement for installing "Warrant" module (Needed by "Cloud" Component)
pycryptodome==3.7.2

## Cross compilation requirement for installing "HAP_python" module (Needed by "Homekit" Component)
curve25519-donna==1.3
ed25519==1.4
```

Add these edits to fix OpenSSL errors when using the "[Xiaomi_Aqara](/components/Xiaomi_Aqara/)" component.<br/>
Edit "*~/spksrc/spk/python3/Makefile*" and add the following text above the text "**include ../../mk/spksrc.spk.mk**":
```makefile
## Makefile variable needed to fix "_openssl.so: undefined symbol: pthread_atfork" error when using "xiaomi_aqara" component.
export CFLAGS=-pthread
```

#### {% linkable_title Compiling the Python 3 package %}

Modify the `docker run` command so "**XXXX**" in "*arch-**XXXX***" contains the appropriate architecture of your Synology NAS. For a list of architectures, look at this [list of architectures](https://github.com/SynoCommunity/spksrc/wiki/Architecture-per-Synology-model) accepted by [spksrc](https://github.com/SynoCommunity/spksrc).<br/>
Depending on your computer, compilation may take a hour or more (Significantly less if you have a SSD and a moderately good CPU):
```bash
# sudo docker run -it -v ~/spksrc:/spksrc -w /spksrc synocommunity/spksrc bash -c 'make clean && make setup && make -C spk/python3 arch-XXXX'
```
After the compilation is done, you can find the Python 3 package at "*~/spksrc/packages/python3_XXXX.spk*".<br/>
It should be named something like "python3_armada370-6.1_3.5.5-7.spk" with a possibly different architecture and version.

To remove the Docker container downloaded by `docker run` to save drive space, run the following command:
```bash
# sudo docker rmi synocommunity/spksrc
```

## {% linkable_title Using the Synology webadmin %}

Install the Python 3 package as follows:
1. Open "[*Package Center*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)"
1. Press the "*Manual Install*" button on the top right of the window
1. Click on "*Browse*" and select the Python 3 package you made at "[Compiling the Python 3 package](#compiling-the-python-3-package)"
1. Click on "*Next*"
1. You will most likely get a unverified signature warning, click on "*Yes*"
1. Click on "*Apply*"

Now while it's installing, you may setup the Shared-Folder for Home Assistant:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*Shared-Folder*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_desc)" settings
1. Click on "*Create*"
1. In "*Name*" write "**homeassistant**"
1. in "*Description*" write "**Home Assistant**"
1. Click on "*Next*"
1. Click on "*Next*" again
1. Click on "*Apply*"

Next setup the user:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*User*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_user_desc)" settings
1. Click on "*Create*"
1. In "*Name*" write "**homeassistant**"
1. In "*Description*" write "**Home Assistant**"
1. The "*Password*" is up to your choice
1. Click on "*Next*"
1. Make sure only "*users*" group is checked and click "*Next*"
1. Set the permission "*Read/Write*" for "*homeassistant*" and all other Shared-Folders to "*No access*"
1. Click on "*Next*"
1. Click on "*Next*" again
1. Click on "*Apply*"

Next you need to enable SSH:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*Terminal & SNMP*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal)" settings
1. Click on the checkbox next to "*Enable SSH service*"
1. Click on "*Apply*"

If you turned on the firewall on your Synology NAS, please config it to allow connections for Home Assistant:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*Security*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_desc)" settings
1. Go to "[*Firewall*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_firewall)" settings
1. Go to "*Edit Rules*"
1. Click on "*Create*"
1. Select Custom: Destination port "TCP"
1. Type "8123" in port (e.g., setting of "[*server_port*](/components/http/#server_port)" in configuration.yaml)
1. Click on "*OK*"
1. Click on "*OK*" again

## {% linkable_title Installing Home Assistant %}

After the Python 3 package has been installed, open terminal and open SSH to the synology.<br/>
Replace "*user*" with your Synology NAS user and "x.x.x.x" with the its IP address:
```bash
ssh user@x.x.x.x
```
Use `pip` to install Home Assistant:
```bash
# sudo /volume1/@appstore/python3/bin/python3 -m pip install homeassistant
```
Create a file named "**hass-daemon**" in your "*homeassistant*" Shared-Folder with the script below as its content.<br/>
You can use it to easily start, stop and restart Home Assistant like a service/daemon.
```sh
#!/bin/sh

# Package
PACKAGE="homeassistant"
DNAME="Home Assistant"

# Others
USER="homeassistant"
PYTHON_DIR="/volume1/@appstore/python3/bin"
PYTHON="$PYTHON_DIR/python3"
HASS="$PYTHON_DIR/hass"
INSTALL_DIR="/volume1/homeassistant"
PID_FILE="$INSTALL_DIR/home-assistant.pid"
FLAGS="-v --config $INSTALL_DIR --pid-file $PID_FILE --daemon"
REDIRECT="> $INSTALL_DIR/home-assistant.log 2>&1"

start_daemon ()
{
    sudo -u ${USER} /bin/sh -c "$PYTHON $HASS $FLAGS $REDIRECT;"
}

stop_daemon ()
{
    sudo kill `cat ${PID_FILE}`
    wait_for_status 1 20 || sudo kill -9 `cat ${PID_FILE}`
    rm -f ${PID_FILE}
}

daemon_status ()
{
    if [ -f ${PID_FILE} ] && sudo kill -0 `cat ${PID_FILE}` > /dev/null 2>&1; then
        return
    fi
    rm -f ${PID_FILE}
    return 1
}

wait_for_status ()
{
    counter=$2
    while [ ${counter} -gt 0 ]; do
        daemon_status
        [ $? -eq $1 ] && return
        let counter=counter-1
        sleep 1
    done
    return 1
}

case $1 in
    start)
        if daemon_status; then
            echo ${DNAME} is already running
            exit 0
        else
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        fi
        ;;
    stop)
        if daemon_status; then
            echo Stopping ${DNAME} ...
            stop_daemon
            exit $?
        else
            echo ${DNAME} is not running
            exit 0
        fi
        ;;
        restart)
        if daemon_status; then
            echo Stopping ${DNAME} ...
            stop_daemon
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        else
            echo ${DNAME} is not running
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        fi
        ;;
    status)
        if daemon_status; then
            echo ${DNAME} is running
            exit 0
        else
            echo ${DNAME} is not running
            exit 1
        fi
        ;;
    log)
        echo ${LOG_FILE}
        exit 0
        ;;
    *)
        exit 1
        ;;
esac
```

## {% linkable_title Controlling Home Assistant %}

* Start Home Assistant:
```bash
/volume1/homeassistant/hass-daemon start
```
* Stop Home Assistant:
```bash
/volume1/homeassistant/hass-daemon stop
```
* Restart Home Assistant:
```bash
/volume1/homeassistant/hass-daemon restart
```
* Upgrade Home Assistant:
```bash
# sudo /volume1/@appstore/python3/bin/python3 -m pip install --upgrade homeassistant
```
<p class="note">
If you need a update for Python 3 or added a component which failed because of a Python module not installing on your Synology NAS with error code "_Failed building wheel for *Module_Name*_", delete the "*~/spksrc*" directory and redo the guide, but add the failed python module to "*requirements.txt*" from "[Preparing compiling environment](#preparing-compiling-environment)".
</p>

## {% linkable_title Starting Home Assistant on bootup %}

To have Home Assistant start on bootup of your Synology NAS, do as follows:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*Task Scheduler*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_taskscheduler)" settings
1. Click on "*Create*" > "*Triggered Task*" > "*User-defined script*"
1. In "*Task*" write "**Home Assistant**"
1. Click on the checkbox next to "*Enabled*"
1. Make sure "*root*" is selected in "*User*"
1. Go to "*Task Settings* settings
1. in "*User-defined script*" write "**/volume1/homeassistant/hass-daemon start**"
1. Click on "*OK*".

---

## {% linkable_title Using older Python 3 provided by Synology %}

<p class="note warning">
Synology only provides [Python 3.5.1](https://www.synology.com/en-global/dsm/packages/py3k), which is not compatible with Home Assistant 0.65.0 or later.<br/>
The instructions above describes how to install newer Home Assistant on your Synology NAS.<br/>
If you want to proceed with a older version of Home Assistant, follow the instructions below. Please note that you may not be able to use certain components, such as "[Cloud](/components/cloud/)" and [Homekit](/components/homekit/)".
</p>

Running these commands will:
* Install Home Assistant 0.64.3
* Enable Home Assistant to be launched on http://*Synology_IP*:8123

Using the [Synology webadmin](https://www.synology.com/en-global/knowledgebase/DSM/help):
* Install Python 3 using the Synology Package Center
* Create "homeassistant" user
* Create "homeassistant" [Shared-Folder](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_share_desc)
* Enable [SSH](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal) service
* Optionally start Home Assistant on bootup of your Synology NAS

### {% linkable_title Install Synology provided Python 3 %}

Install Python 3 as follows:
1. Open "[*Package Center*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)"
1. Go to "*All Packages*"
1. Scroll all the way down until you find "*Python3*" and click on "*Install*"

Follow the other instructions at "[Using the Synology webadmin](#using-the-synology-webadmin)", ignore the  "Python 3 package" part.

### {% linkable_title Installing Home Assistant 0.64.3 %}

After the Python 3 package has been installed, open terminal and open SSH to the synology.<br/>
Replace "*user*" with your Synology NAS user and "x.x.x.x" with the its IP address:
```bash
$ ssh user@x.x.x.x
```
Install `pip` (Python’s package management system):
```bash
# sudo /volume1/@appstore/py3k/usr/local/bin/python3 -m ensurepip
```
Use `pip` to install Homeassistant 0.64.3:
```bash
# sudo /volume1/@appstore/py3k/usr/local/bin/python3 -m pip install homeassistant==0.64.3
```
Create a file named "**hass-daemon**" in your "*homeassistant*" Shared-Folder with the script below as its content.
You can use it to easily start, stop and restart Home Assistant like a service/daemon.
```sh
#!/bin/sh

# Package
PACKAGE="homeassistant"
DNAME="Home Assistant"

# Others
USER="homeassistant"
PYTHON_DIR="/volume1/@appstore/py3k/usr/local/bin"
PYTHON="$PYTHON_DIR/python3"
HASS="$PYTHON_DIR/hass"
INSTALL_DIR="/volume1/homeassistant"
PID_FILE="$INSTALL_DIR/home-assistant.pid"
FLAGS="-v --config $INSTALL_DIR --pid-file $PID_FILE --daemon"
REDIRECT="> $INSTALL_DIR/home-assistant.log 2>&1"

start_daemon ()
{
    sudo -u ${USER} /bin/sh -c "$PYTHON $HASS $FLAGS $REDIRECT;"
}

stop_daemon ()
{
    sudo kill `cat ${PID_FILE}`
    wait_for_status 1 20 || sudo kill -9 `cat ${PID_FILE}`
    rm -f ${PID_FILE}
}

daemon_status ()
{
    if [ -f ${PID_FILE} ] && sudo kill -0 `cat ${PID_FILE}` > /dev/null 2>&1; then
        return
    fi
    rm -f ${PID_FILE}
    return 1
}

wait_for_status ()
{
    counter=$2
    while [ ${counter} -gt 0 ]; do
        daemon_status
        [ $? -eq $1 ] && return
        let counter=counter-1
        sleep 1
    done
    return 1
}

case $1 in
    start)
        if daemon_status; then
            echo ${DNAME} is already running
            exit 0
        else
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        fi
        ;;
    stop)
        if daemon_status; then
            echo Stopping ${DNAME} ...
            stop_daemon
            exit $?
        else
            echo ${DNAME} is not running
            exit 0
        fi
        ;;
        restart)
        if daemon_status; then
            echo Stopping ${DNAME} ...
            stop_daemon
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        else
            echo ${DNAME} is not running
            echo Starting ${DNAME} ...
            start_daemon
            exit $?
        fi
        ;;
    status)
        if daemon_status; then
            echo ${DNAME} is running
            exit 0
        else
            echo ${DNAME} is not running
            exit 1
        fi
        ;;
    log)
        echo ${LOG_FILE}
        exit 0
        ;;
    *)
        exit 1
        ;;
esac
```

### {% linkable_title Controlling Home Assistant 0.64.3 %}

* Start Home Assistant:
```bash
/volume1/homeassistant/hass-daemon start
```
* Stop Home Assistant:
```bash
/volume1/homeassistant/hass-daemon stop
```
* Restart Home Assistant:
```bash
/volume1/homeassistant/hass-daemon restart
```

### {% linkable_title Starting Home Assistant 0.64.3 on bootup %}

To have Home Assistant start on bootup of your Synology NAS, do as follows:
1. Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
1. Go to "[*Task Scheduler*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_taskscheduler)" settings
1. Click on "*Create*" > "*Triggered Task*" > "*User-defined script*"
1. In "*Task*" write "**Home Assistant**"
1. Click on the checkbox next to "*Enabled*"
1. Make sure "*root*" is selected in "*User*"
1. Go to "*Task Settings* settings
1. in "*User-defined script*" write "**/volume1/homeassistant/hass-daemon start**"
1. Click on "*OK*".
