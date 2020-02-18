---
title: "Installation on a Synology NAS"
description: "Instructions to install Home Assistant on a Synology NAS."
redirect_from: /getting-started/installation-synology/
---

<div class='note warning'>

Synology only provide Python 3.5.1, which is not compatible with Home Assistant 0.65.0 or later. Until Synology offer an updated version of Python, Home Assistant 0.64 is the most recent version that will be able to be installed. You can manually specify the version of Home Assistant to install, for example to install version 0.64.3 you would do `./python3 -m pip install homeassistant==0.64.3`

</div>

There are 3 alternatives, when using Home Assistant on Synology NAS:
1. Using Home Assistant Core on Docker
2. Directly running Home Assistant Core on DSM
3. Using the Home Assistant a VM (if you have an Intel based Synology)

Option 1 is described on the [Docker installation page](/docs/installation/docker/).

Option 3 uses the Synology Based Virtual Machine Manager. You can import the VDI image to be found at the [Home Assistant installation page](/hassio/installation/). Download the image and add it to the image store. The go to "Virtual Machine" in the interface and create a new VM with the image you just added.

The main benefit from this method is that you can assign Home Assistant its own IP number, so there is no risk regarding TCP/UDP port conflicts. USB dongles an be connected to the VM without the need to install a driver in DSM.

Option 2 is described below.

The following configuration has been tested on Synology 413j running DSM 6.0-7321 Update 1.

Running these commands will:

- Install Home Assistant
- Enable Home Assistant to be launched on `http://localhost:8123`

Using the Synology webadmin:

- Install python3 using the Synology Package Center
- Create a `homeassistant` user and add to the "users" group

SSH onto your Synology & login as admin or root

- Log in with your own administrator account
- Switch to root using:

```bash
$ sudo -i
```

Check the path to python3 (assumed to be /volume1/@appstore/py3k/usr/local/bin)

```bash
# cd /volume1/@appstore/py3k/usr/local/bin
```

Install PIP (Python's package management system)

```bash
# ./python3 -m ensurepip
```

Use PIP to install the Home Assistant package 0.64.3

```bash
# ./python3 -m pip install homeassistant==0.64.3
```

Create a Home Assistant configuration directory & switch to it

```bash
# mkdir /volume1/homeassistant
# chown homeassistant /volume1/homeassistant 
# chmod 755 /volume1/homeassistant
# cd /volume1/homeassistant
```

Hint: alternatively you can also create a "Shared Folder" via Synology WebUI (e.g., via "File Station") - this has the advantage that the folder is visible via "File Station".

Create hass-daemon file using the following code (edit the variables in uppercase if necessary)

```bash
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
    kill `cat ${PID_FILE}`
    wait_for_status 1 20 || kill -9 `cat ${PID_FILE}`
    rm -f ${PID_FILE}
}

daemon_status ()
{
    if [ -f ${PID_FILE} ] && kill -0 `cat ${PID_FILE}` > /dev/null 2>&1; then
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

Create links to Python folders to make things easier in the future:

```bash
# ln -s /volume1/@appstore/py3k/usr/local/bin/python3 python3
# ln -s /volume1/@appstore/py3k/usr/local/lib/python3.5/site-packages/homeassistant homeassistant
```

Set the owner and permissions on your configuration folder

```bash
# chown -R homeassistant:users /volume1/homeassistant
# chmod -R 664 /volume1/homeassistant
```

Make the daemon file executable:

```bash
# chmod 755 /volume1/homeassistant/hass-daemon
```

Update your firewall (if it is turned on the Synology device):

 - Go to your Synology control panel
 - Go to security 
 - Go to firewall
 - Go to Edit Rules
 - Click Create
 - Select Custom: Destination port "TCP"
 - Type "8123" in port
 - Click on OK
 - Click on OK again


Copy your `configuration.yaml` file into the configuration folder
That's it... you're all set to go

Here are some useful commands:

- Start Home Assistant:

```bash
$ sudo /volume1/homeassistant/hass-daemon start
```

- Stop Home Assistant:

```bash
$ sudo /volume1/homeassistant/hass-daemon stop
```

- Restart Home Assistant:

```bash
$ sudo /volume1/homeassistant/hass-daemon restart
```

- Upgrade Home Assistant::

```bash
$  /volume1/@appstore/py3k/usr/local/bin/python3 -m pip install --upgrade homeassistant
```
