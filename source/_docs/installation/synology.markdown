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
Synology only provide <a href="https://www.synology.com/nl-nl/dsm/packages/py3k">Python 3.5.1</a>, which is not compatible with Home Assistant 0.65.0 or later. Until Synology offer an updated version of Python, Home Assistant 0.64 is the most recent version that will be able to be installed. You can manually specify the version of Home Assistant to install, for example to install version 0.64.3 you would do `./python3 -m pip install homeassistant==0.64.3`
</p>

<p class="note">
Update: You can install a more recent home assistant (eg, 0.84.2) by manually compiling a python3 package using the <a href="https://github.com/SynoCommunity/spksrc">spksrc compilation framework</a>. The new installation guide will be a little different though, but the upside is most failing components will now work, such as “<a href="/components/discovery/">Discovery</a>”, “<a href="/components/cloud/">Cloud</a>” and “<a href="/components/Xiaomi_Aqara/">Xiaomi_Aqara</a>”. Thread for more info: <a href="https://community.home-assistant.io/t/python-3-5-3-on-synology/46372/27">Python >=3.5.3 on Synology</a>.
</p>

There are 2 alternatives, when using Home Assistant on Synology NAS:
1. Using Docker
2. Directly running on DSM

Option 1 is described on the [Docker installation page](/docs/installation/docker/), whereas Option 2 is described below.


The following configuration has been tested on [Synology DS115j](https://www.synology.com/en-global/products/DS115j) running DSM 6.2.1-23824 Update 1.

Running these commands will:
* Compile the required new Python3 package
* Install Home Assistant
* Enable Home Assistant to be launched on http://*Synology_IP*:8123

Using the [Synology webadmin](https://www.synology.com/en-global/knowledgebase/DSM):
* Install compiled Python3 package using the [Synology Package Center](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)
* Create “homeassistant” user and add to the “users” group
* Create “homeassistant” “Shared-Folder”
* Optionally Start Home Assistant on Bootup of Synology


Like you might have read above, at this time of writing, Synology has not provided a recent [Python3](https://www.synology.com/nl-nl/dsm/packages/py3k) package, so we have to create a recent Python3 package ourself.
Do not worry though, were gonna try keep this as painless as possible.

## {% linkable_title Preparing prerequisites %}

In this guide we are going to use a Linux based Operating System such as [Ubuntu](https://www.ubuntu.com/), [Mint](https://linuxmint.com/) or [Solus](https://getsol.us) to minimize difficulty. You will also need [Docker](https://docs.docker.com/install/).
You can think of [Docker](https://docs.docker.com/install/) as a way more powerful [Chroot](https://help.ubuntu.com/community/BasicChroot) and containers as ready made mini operating systems.

---
### {% linkable_title Installing Docker on [Mint, Ubuntu or derivatives](https://docs.docker.com/install/linux/docker-ce/ubuntu/) %}

Refresh package lists:
```bash
# sudo apt-get update
```
Install prerequisite packages which lets APT get packages over HTTPS:
```bash
# sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```
Add GPG key for the official Docker repository to your system:
```bash
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
<p class="note">
The “lsb_release -cs” sub-command below returns the name of your Ubuntu distribution, such as xenial.
Sometimes, in a distribution like Linux Mint, you might need to change “lsb_release -cs” to your parent Ubuntu distribution.
For example, if you are using Linux Mint <b>Tara</b> (eg, 19), you could use <b>Bionic</b> (eg, 18.04).
</p>

```bash
# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
Refresh package lists for newly added Docker repository:
```bash
# sudo apt-get update
```
Install Docker:
```bash
# sudo apt-get install docker-ce
```
---
### {% linkable_title Installing Docker on [Solus](https://getsol.us) %}

Update package lists:
```bash
# sudo eopkg update-repo
```
Install Docker:
```bash
# sudo eopkg install docker
```
Enable the docker service at system boot:
```bash
# sudo systemctl enable docker
```
Start the docker service:
```bash
# sudo systemctl start docker
```
---
To enable your user account to manage Docker without superuser privileges, add your user account to the “docker” group:
```bash
# sudo gpasswd -a YOUR_USER_ACCOUNT docker
```

You will now need to get the [spksrc framework and Docker container](https://github.com/SynoCommunity/spksrc#docker) for the compiling environment.

Install Git
#### Ubuntu/Mint
```bash
# sudo apt-get install git
```
#### Solus
```bash
# sudo eopkg install git
```
Fork and clone spksrc, this will make a directory named “spksrc”.
```bash
git clone https://You@github.com/You/spksrc.git ~/spksrc
```
Download the spksrc Docker container:
```bash
docker pull synocommunity/spksrc
```

Now you need to edit 2 files.
You need to do this to get “cross compiled module package” files, which you require for Home Assistant to able to be installed.
These edits also enable you to use the “[Cloud](/components/cloud/)” component and fix the OpenSSL errors when using the “[Xiaomi_Aqara](/components/Xiaomi_Aqara/)” component.


Edit “*~/spksrc/spksrc/spk/python3/src/requirements.txt*”, add at the end of the file:
```
##Cross compilation requirements for installing Home Assistant (Tested to work on 83.3).
##In the future, the requirements may change (need newer version to work, eg), modify as needed.
cffi==1.11.5
bcrypt==3.1.4
cryptography==2.3.1
#Cross compilation requirement for installing “Warrent” module (Needed by “Cloud” Component)
pycryptodome==3.7.2
```

Edit “*~/spksrc/spksrc/spk/python3/src/Makefile*”, add above the line that says “<b>include ../../mk/spksrc.spk.mk</b>”:
```makefile
# Needed to fix “_openssl.so: undefined symbol: pthread_atfork” error caused by lack of libpthread linkage on Synology (Needed for SSL and “xiaomi_aqara” component)
export CFLAGS=-pthread
```

## {% linkable_title Compiling the Python3 package %}
Run the container, this will make your terminal run inside the Docker container:
```bash
# docker run -it -v ~/spksrc:/spksrc synocommunity/spksrc /bin/bash
# cd spksrc/
# make setup
# cd spk/python3
```
<p class='note'>
You need to change the arch-XXXX to the architecture of your Synology (eg, DS115j = arch-armada370)
For information about the Arch of your Synology look at the <a href="https://github.com/SynoCommunity/spksrc/wiki/Architecture-per-Synology-model">list of architectures on spkrc</a>
Depending on your device, compilation may take a hour or more (significantly less if you have a SSD and a good CPU).
</p>

Compile Python3 for your Synology model
```bash
# make arch-XXXX
```
After the compilation is done, you can find the Python package at “*~/spksrc/spksrc/packages/python3_XXXX.spk*”.
It should be named something like “python3_armada370-6.1_3.5.5-7.spk”, of course with a possibly different arch and version.

Now you need to extract your “cross compiled module package” files which you added earlier.
For ease of use this guide will use p7zip for extracting from these archives.
#### Ubuntu/Mint
```bash
# sudo apt-get install p7zip
```
#### Solus
```bash
# sudo eopkg install p7zip
```
Run these commands to extract the packages
```bash
# 7z e python3_XXXX.spk package.tgz
# 7z e package.tgz package.tar
# 7z e package.tar -o"Module-Packages" "share/wheelhouse/cffi-1.11.5-cp35-none-any.whl"
# 7z e package.tar -o"Module-Packages" "share/wheelhouse/bcrypt-3.1.4-cp35-none-any.whl"
# 7z e package.tar -o"Module-Packages" "share/wheelhouse/cryptography-2.3.1-cp35-none-any.whl"
# 7z e package.tar -o"Module-Packages" "share/wheelhouse/pycryptodome-3.7.2-cp35-none-any.whl"
```
This should give you a directory named “**Module-Packages**” with four .whl files, which you need to install later.
Inside some of the .whl archives you need to rename all files containing the text “**x86_64-linux-gnu**” to “**arm-linux-gnueabihf**”.
If you do not, these will be ignored by Python on ARM based Synology's, causing Home Assistant to not function.
```bash
# 7z rn "Module-Packages/cffi-1.11.5-cp35-none-any.whl" "_cffi_backend.cpython-35m-x86_64-linux-gnu.so" "_cffi_backend.cpython-35m-arm-linux-gnueabihf.so"
# 7z l "Module-Packages/pycryptodome-3.7.2-cp35-none-any.whl" | grep "x86_64-linux-gnu" | cut -c54- | while read -r file; do 7z rn "Module-Packages/pycryptodome-3.7.2-cp35-none-any.whl" "$file" "$(echo $file | sed "s/x86_64-linux-gnu/arm-linux-gnueabihf/")"; done
```
<p class='note'>
The 7z <b>rn</b> (eg, rename) parameter was included from 7-Zip 9.30, in the case you are pitifully stuck on a older version, do as follows.
Extract the .whl (these are zip archives), rename all files as described above, then rearchive as zip (ofcourse the same full name with .whl and without .zip).
</p>


## {% linkable_title Using the Synology webadmin: %}

* Open [Package Center](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/PkgManApp/PackageCenter_desc)
* Press the “*Manual Install*” button on the top right of the window
* Click on “*Browse*” and select the Python3 spk package you created earlier
* Click on “*Next*”
* You will most likely get a unverified signature warning, click on “*Yes*”
* Click on “*Apply*”

Now while it's installing, you may setup the Shared-Folder for Home Assistant:
* Open “[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)”
* Go to “[*Shared-Folder*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_desc)” settings
* Click on “*Create*”
* In “*Name*” write “**homeassistant**”
* in "*Description*” write “**Home Assistant**”
* Click on “*Next*”
* Click on “*Next*” again
* Click on “*Apply*”

As the “*homeassistant*” Shared-Folder has been made, copy the (previously created) “*Module-Packages*” directory there.

Next setup the user:
* Open “[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)”
* Go to “[*User*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/file_user_desc)” settings
* Click on “*Create*”
* In "*Name*" write “**homeassistant**”
* In "*Description*” write “**Home Assistant**”
* The "*Password*" up to your choice
* Click on “*Next*”
* Make sure only “*users*” group is checked and click “*Next*”
* Set the permission “*Read/Write*” for “*homeassistant*” and the all the other Shared-Folders to “*No access*”
* Click on “*Next*”
* Click on “*Next*” again
* Click on “*Apply*”.

In the case you turned on the firewall on your Synology device, please config it to allow connections for Home Assistant:
* Open “[*Control Panel*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/ControlPanel_desc)”
* Go to “[*Security*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_desc)” settings
* Go to “[*Firewall*](https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/connection_security_firewall)” settings
* Go to “*Edit Rules*”
* Click on “*Create*”
* Select Custom: Destination port “TCP”
* Type “8123” in port (eg, setting in [*server_port*](/components/http/#server_port))
* Click on “*OK*”
* Click on “*OK*” again


## {% linkable_title Installing Home Assistant %}

After the Python 3 package has been installed, open terminal and open SSH to the synology.
Replace “<i>user</i>” with your Synology user and “x.x.x.x” with the its IP-Adress.
```bash
# ssh user@x.x.x.x
```
Create a virtual Python environment where we will install Home Assistant into.
This will leave the Python package untouched, makes Home Assistant work better and installable/updateable without sudo.
Note: After you made a virtual Python envoriment, you cant relocate the folder, else it will break. 
Make a new one if you need to change it's name, the path or Shared-Folder.
```bash
# /volume1/@appstore/python3/bin/python3 -m venv /volume1/homeassistant/venv-hass
```
Activate the virtual Python environment
```bash
# source /volume1/homeassistant/venv-hass/bin/activate
```
Install the “cross compiled module package” files we compiled earlier.
This command expects you have copied the “*Module-Packages*” directory to your “*homeassistant*” Shared-Folder.
```bash
# cd /volume1/homeassistant/Module-Packages
# pip3 install cffi-1.11.5-cp35-none-any.whl bcrypt-3.1.4-cp35-none-any.whl cryptography-2.3.1-cp35-none-any.whl pycryptodome-3.7.2-cp35-none-any.whl
```
Install Home Assistant
```bash
# pip3 install homeassistant
```
Leave the virtual Python environment
```bash
# deactivate
```

Create a file named “hass-daemon” in the “homeassistant” Shared-Folder with the script below as it's content.
You can use it to easily start, stop and restart Home Assistant like a service/daemon.

```sh
#!/bin/sh

# Package
PACKAGE="homeassistant"
DNAME="Home Assistant"

# Others
USER="homeassistant"
INSTALL_DIR="/volume1/homeassistant"
VIRTENV_DIR="$INSTALL_DIR/venv-hass"
PID_FILE="$INSTALL_DIR/home-assistant.pid"
FLAGS="-v --config $INSTALL_DIR --pid-file $PID_FILE --daemon"
REDIRECT="> $INSTALL_DIR/home-assistant.log 2>&1"

start_daemon ()
{
   source "$VIRTENV_DIR/bin/activate"
   sudo -u ${USER} /bin/sh -c "hass $FLAGS $REDIRECT;"
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

## {% linkable_title Controlling Home Assistent %}

* Start Home Assistant:
```bash
# /volume1/homeassistant/hass-daemon start
```
* Stop Home Assistant:
```bash
# /volume1/homeassistant/hass-daemon stop
```
* Restart Home Assistant:
```bash
# /volume1/homeassistant/hass-daemon restart
```
* Upgrade Home Assistant:
```bash
# source /volume1/homeassistant/venv-hass/bin/activate
# pip3 install --upgrade homeassistant
# deactivate
```
