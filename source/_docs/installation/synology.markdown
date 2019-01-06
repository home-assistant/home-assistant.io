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
Synology only provides [Python 3.5.1](https://www.synology.com/en-global/dsm/packages/py3k), which is not compatible with Home Assistant 0.65.0 or later. Until Synology offer an updated version of Python, Home Assistant 0.64 is the most recent version that will be able to be installed. If you want to run newer Home Assistant versions, you will need to make a new Python 3 package, which will be detailed in this guide. Otherwise you can manually specify the version of Home Assistant to install, for example to install version 0.64.3 you would do `/volume1/@appstore/python3/bin/python3 -m pip install homeassistant==0.64.3`
</p>

There are 2 alternatives, when using Home Assistant on Synology NAS:
1. Using Docker (Recommended)
2. Directly running on DSM

Option 1 is described on the [Docker installation page](/docs/installation/docker/#synology-nas), whereas Option 2 is described below.  
Our recommendation is to run Home Assistant on Docker (If available) or a Raspberri Pi, as the instructions written below are a bit involved.


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
* Optionally start Home Assistant on bootup of your Synology

## {% linkable_title Getting prerequisites) %}

#### {% linkable_title Installing Docker on [Mint, Ubuntu or derivatives](https://docs.docker.com/install/linux/docker-ce/ubuntu/) %}

Install Docker
```bash
# sudo apt-get update
# sudo apt install docker.io
```
Start Docker and enable start on system bootup
```bash
# sudo systemctl start docker
# sudo systemctl enable docker
```
Download the [spksrc Docker container](https://github.com/SynoCommunity/spksrc#docker):
```bash
# sudo docker pull synocommunity/spksrc
```
#### {% linkable_title Preparing compiling environment %}
Install Git
```bash
# sudo apt-get install git
```
Fork and clone spksrc, this will make a directory named "spksrc".
```bash
$ git clone https://github.com/SynoCommunity/spksrc.git
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

## Cross compilation requirement for installing "Warrent" module (Needed by "Cloud" Component)
pycryptodome==3.7.2

## Cross compilation requirement for installing "HAP_python" module (Needed by "Homekit" Component)
curve25519-donna==1.3
ed25519==1.4
```

Add these edits to fix OpenSSL errors when using the "[Xiaomi_Aqara](/components/Xiaomi_Aqara/)" component.  
Edit "*~/spksrc/spk/python3/Makefile*" and add the following text above the text "**include ../../mk/spksrc.spk.mk**":
```makefile
## Makefile variable needed to fix "_openssl.so: undefined symbol: pthread_atfork" error when using "xiaomi_aqara" component.
export CFLAGS=-pthread
```
#### {% linkable_title Compiling the Python 3 package %}
Make the Python 3 package for your Synology model, please replace "arch-**XXXX**" by the apporiate architecture of your Synology. For a list of architectures, look at this [list of architectures](https://github.com/SynoCommunity/spksrc/wiki/Architecture-per-Synology-model) accepted by spksrc. Depending on your computer, compilation may take a hour or more (Significantly less if you have a SSD and a moderately good CPU).
```bash
# sudo docker run -it -v ~/spksrc:/spksrc synocommunity/spksrc /bin/bash
$ make setup
$ cd spk/python3
$ make arch-XXXX
$ exit
```
After the compilation is done, you can find the Python 3 package at "*~/spksrc/packages/python3_XXXX.spk*".
It should be named something like "python3_armada370-6.1_3.5.5-7.spk", of course with a possibly different architecture and version.

#### {% linkable_title Extracting cross compiled packages %}
Now you need to extract the Python module packages which you added earlier to "*requirements.txt*".
Run these commands to extract the `.whl` files to the directory "**~/Module-Packages**", please modify `pyspk` command so the "**XXXX**" in `python3_XXXX.spk` points to the package file you made earlier.
```bash
$ mkdir ~/Module-Packages
$ cd ~/Module-Packages
$ pyspk="$HOME/spksrc/packages/python3_XXXX.spk"
$ tar -x -f $pyspk -C /tmp package.tgz; gzip -df /tmp/package.tgz
$ tar -x -f /tmp/package.tar --wildcards share/wheelhouse/$file --strip=2
```
Inside some of the `.whl` files (These are zip archives) you need to rename all files containing the text "**x86_64-linux-gnu**" to "**arm-linux-gnueabihf**", this is only required for ARM based Synology's.  
Run this command to patch all `.whl` files found in the current directory:
```bash
$ rand=$RANDOM; for module in *.whl; do unzip "$module" -d "temp$rand" && find "temp$rand" -name "*x86_64-linux-gnu*" -type f | while read -r file; do mv "$file" "$(echo $file | sed "s/x86_64-linux-gnu/arm-linux-gnueabihf/")"; done && rm "$module" && (cd "temp$rand" && zip -r0 "../$module" ./) && rm -r "temp$rand"; done
```
## {% linkable_title Using the Synology webadmin %}
Install the Python 3 package as follows:
* Open "[*Package Center*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)"
* Press the "*Manual Install*" button on the top right of the window
* Click on "*Browse*" and select the Python 3 package you made earlier (e.g., "*~/spksrc/packages/python3_XXXX.spk*")
* Click on "*Next*"
* You will most likely get a unverified signature warning, click on "*Yes*"
* Click on "*Apply*"

Now while it's installing, you may setup the Shared-Folder for Home Assistant:
* Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
* Go to "[*Shared-Folder*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_desc)" settings
* Click on "*Create*"
* In "*Name*" write "**homeassistant**"
* in "*Description*" write "**Home Assistant**"
* Click on "*Next*"
* Click on "*Next*" again
* Click on "*Apply*"

As the "*homeassistant*" Shared-Folder has been made, copy the previously created "*~/Module-Packages*" directory there.

Next setup the user:
* Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
* Go to "[*User*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_user_desc)" settings
* Click on "*Create*"
* In "*Name*" write "**homeassistant**"
* In "*Description*" write "**Home Assistant**"
* The "*Password*" up to your choice
* Click on "*Next*"
* Make sure only "*users*" group is checked and click "*Next*"
* Set the permission "*Read/Write*" for "*homeassistant*" and the all the other Shared-Folders to "*No access*"
* Click on "*Next*"
* Click on "*Next*" again
* Click on "*Apply*"

Next you need to enable SSH:
* Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
* Go to "[*Terminal & SNMP*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal)" settings
* Click on the checkbox next to "*Enable SSH service*"
* Click on "*Apply*"

In the case you turned on the firewall on your Synology device, please config it to allow connections for Home Assistant:
* Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
* Go to "[*Security*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_desc)" settings
* Go to "[*Firewall*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_firewall)" settings
* Go to "*Edit Rules*"
* Click on "*Create*"
* Select Custom: Destination port "TCP"
* Type "8123" in port (e.g., setting of "[*server_port*](/components/http/#server_port)" in configuration.yaml)
* Click on "*OK*"
* Click on "*OK*" again

## {% linkable_title Installing Home Assistant %}
After the Python 3 package has been installed, open terminal and open SSH to the synology.
Replace "*user*" with your Synology user and "x.x.x.x" with the its IP address:
```bash
$ ssh user@x.x.x.x
```
Install the `.whl` module package files you made earlier and Home Assistant.  
This command expects you have copied the "*~/Module-Packages*" directory from "[Extracting cross compiled packages](#-linkable_title-extracting-cross-compiled-packages-)" to your "*homeassistant*" "[*Shared-Folder*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_desc)".
```bash
# sudo /volume1/@appstore/python3/bin/python3 -m pip install /volume1/homeassistant/Module-Packages/*.whl
# sudo /volume1/@appstore/python3/bin/python3 -m pip install homeassistant
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
$ /volume1/homeassistant/hass-daemon start
```
* Stop Home Assistant:
```bash
$ /volume1/homeassistant/hass-daemon stop
```
* Restart Home Assistant:
```bash
$ /volume1/homeassistant/hass-daemon restart
```
* Upgrade Home Assistant:
```bash
$ /volume1/@appstore/python3/bin/python3 -m pip install --upgrade homeassistant
```
<p class="note">
If you need to update Python 3 or added a component which fails caused by python modules not installing on your Synology, delete the "spksrc" directory, redo the steps from "[Preparing compiling environment](#-linkable_title-preparing-compiling-environment-)", add the failed python modules to "*requirements.txt*" file, extract and install the new `.whl` module package files to your Synology.
</p>

## {% linkable_title Starting Home Assistant on bootup %}
To have Home Assistant start on bootup of your Synology, do as follows:
* Open "[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)"
* Go to "[*Task Scheduler*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_taskscheduler)" settings
* Click on "*Create*" > "*Triggered Task*" > "*User-defined script*"
* In "*Task*" write "**Home Assistant**"
* Click on the checkbox next to "*Enabled*"
* Make sure "*root*" is selected in "*User*"
* Go to "*Task Settings* settings
* in "*User-defined script*" write "**/volume1/homeassistant/hass-daemon start**"
* Click on "*OK*".
