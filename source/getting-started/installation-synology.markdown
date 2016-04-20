---
layout: page
title: "Installation on a Synology NAS"
description: "Instructions to install Home Assistant on a Synology NAS."
date: 2016-04-16 11:36
sidebar: true
comments: false
sharing: true
footer: true
---

The following configuration has been tested on Synology 413j running DSM 6.0-7321 Update 1.

Running these commands will:

 - Install Home Assistant
 - Enable Home Assistant to be launched on [http://localhost:8123](http://localhost:8123)

Using the Synology webadmin:

 - Install python3 using the Synology package centre
 - Create homeassistant user and add to the "users" group

SSH onto your synology & login as admin or root

Check the path to python3 (assumed to be /volume1/@appstore/py3k/usr/local/bin)

```bash
$ cd /volume1/@appstore/py3k/usr/local/bin
```

Install PIP (Python's package management system)

```bash
$ python -m ensurepip
```

Use PIP to install Homeassistant package

```bash
$ pip3 install homeassistant
```

Create homeassistant config directory & switch to it

```bash
$ mkdir /volume1/homeassistant
$ cd /volume1/homeassistant
```

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
    su ${USER} -s /bin/sh -c "$PYTHON $HASS $FLAGS $REDIRECT;"
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

Create links to python folders to make things easier in the future:

```bash
$ ln -s /volume1/@appstore/py3k/usr/local/bin python3
$ ln -s /volume1/@appstore/py3k/usr/local/lib/python3.5/site-packages/homeassistant
```

Set the owner and permissions on your config folder

```bash
$ chown -R homeassistant:users /volume1/homeassistant
$ chmod -R 664 /volume1/homeassistant
```

Make the daemon file executable:

```bash
$ chmod 777 /volume1/homeassistant/hass-daemon
```

Copy your configuration.yaml file into the config folder
That's it... you're all set to go

Here are some useful commands:

- Start Home Assistant:

```bash
$ sh hass-daemon start
```

- Stop Home Assistant:

```bash
$ sh hass-daemon stop
```

- Restart Home Assistant:

```bash
$ sh hass-daemon restart
```

- Upgrade Home Assistant::

```bash
$ python3 -m pip install --upgrade homeassistant
```

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/balloob/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### {% linkable_title What's next %}

If you want to have Home Assistant start on boot, [autostart instructions can be found here](/getting-started/autostart-synology/).

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
