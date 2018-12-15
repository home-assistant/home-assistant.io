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

<p class='note warning'>
Synology only provide Python 3.5.1, which is not compatible with Home Assistant 0.65.0 or later. Until Synology offer an updated version of Python, Home Assistant 0.64 is the most recent version that will be able to be installed. You can manually specify the version of Home Assistant to install, for example to install version 0.64.3 you would do `./python3 -m pip install homeassistant==0.64.3`
</p>
<p class='note'>
Update: You can install a more recent home assistent (Tested to work at Home Assistant 0.84) by manually compiling a python3 package using the spksrc compilation framework. The new installation guide will be a little different though, but the upside is most failing components will now work, such as “Discovery”, “Cloud” and “Xiaomi_Aqara”. Thread for more info: [Python >=3.5.3 on Synology](https://community.home-assistant.io/t/python-3-5-3-on-synology/46372/27)
</p>

There are 2 alternatives, when using Home Assistant on Synology NAS:
1. using Docker
2. directly running on DSM

Option 1 is described on the [Docker installation page](/docs/installation/docker/), whereas Option 2 is described below.


The following configuration has been tested on Synology 115j running DSM 6.2.1-23824 Update 1.

Running these commands will:
* Compile the required new python3 package
* Install Home Assistant
* Enable Home Assistant to be launched on http://localhost:8123

Using the Synology webadmin:
* Install compiled python3 package using the Synology Package Center
* Create “homeassistant” user and add to the “users” group
* Create “homeassistant” “Shared-Folder”
* Optionally Start Home Assistant on Bootup of Synology



Like you might have read above, at this time of writing, Synology has not provided a recent Python3 package, so we will have to compile Python3 ourself.
Do not worry though, were gonna try keep this as painless as possible.

## preparing prerequisites

We are going to use a Linux based Operating System such as [Ubuntu](https://www.ubuntu.com/), [Mint](https://linuxmint.com/) or [Solus](https://getsol.us) to minimize difficulty. In this guide we will need [Docker](https://docs.docker.com/install/).
You can think of Docker as a way more powerful Chroot and containers as ready made mini operating systems.

---
### Installing Docker on [Mint, Ubuntu or derivatives](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

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
<p class='note'>
Note: The “lsb_release -cs” sub-command below returns the name of your Ubuntu distribution, such as xenial.
Sometimes, in a distribution like Linux Mint, you might need to change “lsb_release -cs” to your parent Ubuntu distribution.
For example, if you are using Linux Mint <b>Tara</b>“=19”, you could use <b>Bionic</b>“=18.04”.
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
### Installing Docker on Solus

Update package lists:
```bash
# sudo eopkg update-repo
```
Install Docker:
```bash
# sudo eopkg install docker
```
Enable the Docker service at system boot:
```bash
# sudo systemctl enable docker
```
Start the docker service:
```bash
# sudo systemctl start docker
```
---
To enable your user account to manage Docker without superuser privileges, add your “USER” account to the “docker” group:
```bash
# sudo gpasswd -a USER docker
```

You will now need to get the [spksrc Docker container](https://github.com/SynoCommunity/spksrc#docker) for the compiling environment.

Pull/Download the spksrc Docker container, this will make a directory named “spksrc”.
```bash
# docker pull synocommunity/spksrc
```
Now run the container, this will make your terminal run inside the Docker container:
```bash
# docker run -it -v ~/spksrc:/spksrc synocommunity/spksrc /bin/bash
```
While inside the container, clone/download the spkrc repository.
```bash
# git clone https://github.com/SynoCommunity/spksrc.git
```

## Preparing to compile Python

Before you continue in the container, you need to edit 2 files.
You need to do this to get “cross compiled module package” files, which you require for Home Assistent to able to be installed.
These edits also enable you to use the “Cloud” component and fix the OpenSSL errors when using the “Xiaomi_Aqara” component.

Edit “~/spksrc/spksrc/spk/python3/src/requirements.txt”, add at the end of the file:
```
##Cross compilation requirements for installing Home Assistent (Tested to work on 83.3).
##In the future, the requirements may change (need newer version to work, eg), modify as needed.
cffi==1.11.5
bcrypt==3.1.4
cryptography==2.3.1
#Cross compilation requirement for installing “Warrent” module (Needed by “Cloud” Component)
pycryptodome==3.7.2
```
Edit “~/spksrc/spksrc/spk/python3/src/Makefile”, add above the line that says “<b>include ../../mk/spksrc.spk.mk</b>”:
```makefile
# Needed to fix “_openssl.so: undefined symbol: pthread_atfork” error caused by lack of libpthread linkage on Synology (Needed for SSL and “xiaomi_aqara” component)
export CFLAGS=-pthread
```


While still in the docker container, create the Python3 package:
```bash
# cd spksrc/
# make setup
# cd spk/python3
```
<p class='note'>
    you have to change the arch-XXXX to the architecture of your Synology (eg, DS115j = arch-armada370)
For information about the Arch of your Synology look at the {architecture List spkrc}[https://github.com/SynoCommunity/spksrc/wiki/Architecture-per-Synology-model]
Depending on your device, compilation may take a hour or more (significantly less if you have a SSD and a good CPU).
</p>

Compile Python3 for your Synology model
```bash
# make arch-XXXX
```
After the compilation is done, you can find the Python package at “~/spksrc/spksrc/packages/python3_XXXX.spk”.
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
This should give you a directory “Module-Packages” with four .whl files, which you need to install later.
Inside some of the .whl archives we need to rename files with “<b>x86_64-linux-gnu</b>” to “<b>arm-linux-gnueabihf</b>”.
If we dont, these will be ignored by Python on ARM based Synology's, causing Home Assistent to not function.
```bash
# 7z rn "Module-Packages/cffi-1.11.5-cp35-none-any.whl" "_cffi_backend.cpython-35m-x86_64-linux-gnu.so" "_cffi_backend.cpython-35m-arm-linux-gnueabihf.so"
# 7z l "Module-Packages/pycryptodome-3.7.2-cp35-none-any.whl" | grep "x86_64-linux-gnu" | cut -c54- | while read -r file; do 7z rn "Module-Packages/pycryptodome-3.7.2-cp35-none-any.whl" "$file" "$(echo $file | sed "s/x86_64-linux-gnu/arm-linux-gnueabihf/")"; done
```
<p class='note'>
The 7z <b>rn</b> (eg, rename) parameter was included from 7-Zip 9.30, in the case you are pitifully stuck on a older version, do as follows.
Extract the .whl (these are zip archives), rename all files as described above, then rearchive as zip (ofcourse the same full name with .whl and without .zip).
If that is not possible, then upgrade your base or switch to a recent distribution so you can.
</p>


## Using the Synology webadmin:

Open Synology Package Center and press the “Manual Install” button.
Click “Browse” and select the Python package we created, then press “Next”.
You will get a unverified package popup, press yes and next screen press Apply.

Now while it's installing, you can setup the user and Shared-Folder for Home Assistent.

Open “Control Panel”, go to “Shared-Folder” settings and click on “Create”.
In “Name” write “<b>homeassistant</b>”, in "Description” write “<b>Home Assistent</b>”
Click “Next”, same for second screen, the third screen click “Apply”.

Next go to “User” settings and click on “Create”.
In "Name" write “<b>homeassistant</b>”, in "Description” write “<b>Home Assistent</b>”, "Password" is up to you.
Click “Next”, next screen leave only “users” group checked and click “Next”.
In this screen, set permission “No access” for all Shared-Folders and only “homeassistent” Shared-Folder to “Read/Write.”
Click “Next” on this screen and the next, on the last screen click “Apply”.

Now the “homeassistent” Shared-Folder has been made, you need to copy the “Module-Packages” directory there.

## Preparing to install Home Assistent

After the Python package has been installed, open terminal and open SSH to the synology.
Replace “user” with your Synology user and “x.x.x.x” with the its IP-Adress.
```bash
# ssh user@x.x.x.x
```
Create a virtual Python environment where we will install Home Assistent into.
This will leave the Python package untouched, makes Home Assistent work better and installable/updateable without sudo.
Note: After you made a virtual Python envoriment, you cant relocate the folder, else it will break. 
Make a new one if you need to change it's name, the path or Shared-Folder.
```bash
# /volume1/@appstore/python3/bin/python3 -m venv /volume1/homeassistant/venv-hass
```
Activate the virtual Python environment
```bash
# source ./venv-hass/bin/activate
```
Install the “cross compiled module package” files we compiled earlier.
This command expects you have copied the “Module-Packages” directory to your “homeassistent” Shared-Folder.
```bash
# cd /volume1/homeassistant/Module-Packages
# pip3 install cffi-1.11.5-cp35-none-any.whl bcrypt-3.1.4-cp35-none-any.whl cryptography-2.3.1-cp35-none-any.whl pycryptodome-3.7.2-cp35-none-any.whl
```
Install Home Assistent
```bash
# pip3 install homeassistant
```
Leave the virtual Python environment
```bash
# deactivate
```

Create a file named “hass-daemon” in the “homeassistent” Shared-Folder with the script below as it's content.
You can use it to easily start, stop and restart Home Assistent like a service/daemon.

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

Update your firewall (if it is turned on the Synology device):

* Go to your Synology control panel
* Go to security
* Go to firewall
* Go to Edit Rules
* Click Create
* Select Custom: Destination port "TCP"
* Type "8123" in port
* Click on OK
* Click on OK again


Copy your configuration.yaml file into the config folder That's it... you're all set to go

Here are some useful commands:

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
# source ./venv-hass/bin/activate
# pip3 install --upgrade homeassistant
# deactivate
```
