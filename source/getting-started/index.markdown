---
layout: page
title: "Getting Started"
description: "Step by step guide to get started with Home Assistant."
date: 2014-12-18 22:57
sidebar: false
comments: false
sharing: true
footer: true
---

<div class='install-instructions-container' markdown='0'>
<input name='install-instructions' type='radio' id='normal-install' checked>
<input name='install-instructions' type='radio' id='raspberry-install'>
<input name='install-instructions' type='radio' id='docker-install'>
<label class='menu-selector normal' for='normal-install'>Install on local machine</label>
<label class='menu-selector raspberry' for='raspberry-install'>Install on a Raspberry Pi</label>
<label class='menu-selector docker' for='docker-install'>Install using Docker</label>

<div class='install-instructions normal' markdown='1'>
Installing and running Home Assistant on your local machine is easy. Make sure you have [Python 3.4 or higher](https://www.python.org/downloads/) installed and execute the following code in a console:

```bash
$ pip3 install homeassistant
$ hass --open-ui
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)
 
 
If would prefer to watch a video tutorial however, [tktino](https://github.com/tktino) has made some great ones.

 - [Windows 10](https://www.youtube.com/watch?v=X27eVvuqwnY)
 - [Mac OS X](https://www.youtube.com/watch?v=hej6ipN86ls)
 - [Ubuntu 14.04](https://www.youtube.com/watch?v=SXaAG1lGNH0)

</div> <!-- INSTALL-INSTRUCTIONS NORMAL -->


<div class='install-instructions docker' markdown='1'>

Installation with Docker is straightforward. Adjust the following command so that `/path/to/your/config/` points at the folder where you want to store your config and run it:

```bash
$ docker run -d --name="home-assistant" -v /path/to/your/config:/config -v /etc/localtime:/etc/localtime:ro --net=host balloob/home-assistant
```

This will launch Home Assistant and serve the web interface from port 8123 on your Docker host.

<p class='note'>
When using boot2docker on OS X you are unable to map the local time to your Docker container. Replace `-v /etc/localtime:/etc/localtime:ro` with `-e "TZ=America/Los_Angeles"` (replacing America/Los_Angeles with [your timezone](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
</p>

</div> <!-- INSTALL-INSTRUCTIONS DOCKER -->


<div class='install-instructions raspberry' markdown='1'>

Home Assistant requires the Raspberry Pi to run [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/). This version was released on September 24, 2015 and comes by default with Python 3.4 which is required for Home Assistant.

Execute the following code in a console:

```bash
$ sudo pip3 install homeassistant
$ hass
```

Running these commands will:

 - Install Home Assistant
 - Launch Home Assistant and serve the web interface on [http://localhost:8123](http://localhost:8123)

</div> <!-- INSTALL-INSTRUCTIONS RASPBERRY -->

<div class='install-instructions synology' markdown='1'>

The following configuration has been tested on a Synology 415+ running DSM 5.2-5644 Update 3

Running these commands will:

 - Install Home Assistant
 - Enable Home Assistant to be launched on [http://localhost:8123](http://localhost:8123)

Using the Synology webadmin:
 - Install python3 using the Synology package centre
 - Create homeassistant user and add to the "users" group

SSH onto your synology & login as admin or root
Check the path to python3 (assumed to be /usr/local/python3/bin)
```bash
$ cd /usr/local/python3/bin
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
PYTHON_DIR="/usr/local/python3/bin"
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
$ ln -s /usr/local/python3/bin python3
$ ln -s /usr/local/python3/lib/python3.4/site-packages/homeassistant
```
Set the owner and permissions on your config folder

```bash
$ chown -r homeassistant:users /volume1/homeassistant
$ chmod -r 660 /volume1/homeassistant
```
Make the daemon file executable:
```bash
$ chmod -r 777 /volume1/homeassistant/hass-daemon
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
$ python3/pip3 install --upgrade homeassistant
```
</div> <!-- INSTALL-INSTRUCTIONS SYNOLOGY -->
</div>

### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

For additional help, in addition to this site, there are four sources:

 - [Forum](https://automic.us/forum/)
 - [Gitter Chatroom](https://gitter.im/balloob/home-assistant) for general Home Assistant discussions and questions.
 - [Development Mailing List](https://groups.google.com/forum/#!forum/home-assistant-dev) for development related questions and discussing new features.
 - [GitHub Page](https://github.com/balloob/home-assistant/issues) for issue reporting.

### What's next
If you want to have Home Assistant start on boot, autostart instructions can be found [here](/getting-started/autostart/).

To see what Home Assistant can do, launch demo mode: `hass --demo-mode` or visit the [demo page](/demo).

To update Home Assistant to the latest release run: `pip3 install --upgrade homeassistant`

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
