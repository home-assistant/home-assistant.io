---
layout: page
title: "Autostart using init.d"
description: "Documentation about setting up Home Assistant as a daemon running under init.d."
release_date: 2016-12-02 15:00:00 -0700
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/autostart-init.d/
---

Home Assistant can run as a daemon within init.d with the script below.

### {% linkable_title 1. Copy script %}

Copy the script at the end of this page to `/etc/init.d/hass-daemon`.

After that, set the script to be executable:

```bash
$ sudo chmod +x /etc/init.d/hass-daemon
```

### {% linkable_title 2. Select a user. %}

Create or pick a user that the Home Assistant daemon will run under. Update script to set `RUN_AS` to the username that should be used to execute hass.

### {% linkable_title 3. Change hass executable if required. %}

Some installation environments may require a change in the Home Assistant executable `hass`. Update script to set `HASS_BIN` to the appropriate `hass` executable path.

### {% linkable_title 4. Register the daemon with Linux %}

```bash
$ sudo update-rc.d hass-daemon defaults
```

### {% linkable_title 5. Install this service %}

```bash
$ sudo service hass-daemon install
```

### {% linkable_title 6. Restart Machine %}

That's it. Restart your machine and Home Assistant should start automatically.

If HA does not start, check the log file output for errors at `/var/opt/homeassistant/home-assistant.log`

### {% linkable_title Extra: Running commands before hass executes %}

If any commands need to run before executing hass (like loading a virtual environment), put them in PRE_EXEC. This command must end with a semicolon.

### {% linkable_title Daemon script %}

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides:          hass
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       Home\ Assistant
### END INIT INFO

# /etc/init.d Service Script for Home Assistant
# Created with: https://gist.github.com/naholyr/4275302#file-new-service-sh
PRE_EXEC=""
# Typically /usr/bin/hass
HASS_BIN="hass"
RUN_AS="USER"
PID_FILE="/var/run/hass.pid"
CONFIG_DIR="/var/opt/homeassistant"
FLAGS="-v --config $CONFIG_DIR --pid-file $PID_FILE --daemon"
REDIRECT="> $CONFIG_DIR/home-assistant.log 2>&1"

start() {
  if [ -f $PID_FILE ] && kill -0 $(cat $PID_FILE) 2> /dev/null; then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service…' >&2
  local CMD="$PRE_EXEC $HASS_BIN $FLAGS $REDIRECT;"
  su -c "$CMD" $RUN_AS
  echo 'Service started' >&2
}

stop() {
    if [ ! -f "$PID_FILE" ] || ! kill -0 $(cat "$PID_FILE") 2> /dev/null; then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill $(cat "$PID_FILE")
  while ps -p $(cat "$PID_FILE") > /dev/null 2>&1; do sleep 1;done;
  echo 'Service stopped' >&2
}

install() {
    echo "Installing Home Assistant Daemon (hass-daemon)"
    echo "999999" > $PID_FILE
    chown $RUN_AS $PID_FILE
    mkdir -p $CONFIG_DIR
    chown $RUN_AS $CONFIG_DIR
}

uninstall() {
  echo -n "Are you really sure you want to uninstall this service? That cannot be undone. [yes|No] "
  local SURE
  read SURE
  if [ "$SURE" = "yes" ]; then
    stop
    rm -fv "$PID_FILE"
    echo "Notice: The config directory has not been removed"
    echo $CONFIG_DIR
    update-rc.d -f hass-daemon remove
    rm -fv "$0"
    echo "Home Assistant Daemon has been removed. Home Assistant is still installed."
  fi
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  install)
    install
    ;;
  uninstall)
    uninstall
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|install|uninstall}"
esac
```

### {% linkable_title Python virtual environment %}

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides:          hass
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       Home\ Assistant
### END INIT INFO

# /etc/init.d Service Script for Home Assistant
# Created with: https://gist.github.com/naholyr/4275302#file-new-service-sh
PRE_EXEC="cd /srv/homeassistant && python3 -m venv . && source bin/activate &&"
# Typically /usr/bin/hass
HASS_BIN="hass"
RUN_AS="USER"
PID_FILE="/var/run/hass.pid"
CONFIG_DIR="/home/USER/.homeassistant"
FLAGS="-v --config $CONFIG_DIR --pid-file $PID_FILE --daemon"
REDIRECT="> $CONFIG_DIR/home-assistant.log 2>&1"

start() {
  if [ -f $PID_FILE ] && kill -0 $(cat $PID_FILE) 2> /dev/null; then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service…' >&2
  local CMD="$PRE_EXEC $HASS_BIN $FLAGS $REDIRECT;"
  su -s /bin/bash -c "$CMD" $RUN_AS
  echo 'Service started' >&2
}

stop() {
    if [ ! -f "$PID_FILE" ] || ! kill -0 $(cat "$PID_FILE") 2> /dev/null; then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill $(cat "$PID_FILE")
  while ps -p $(cat "$PID_FILE") > /dev/null 2>&1; do sleep 1;done;
  echo 'Service stopped' >&2
}

install() {
    echo "Installing Home Assistant Daemon (hass-daemon)"
    echo "999999" > $PID_FILE
    chown $RUN_AS $PID_FILE
    mkdir -p $CONFIG_DIR
    chown $RUN_AS $CONFIG_DIR
}

uninstall() {
  echo -n "Are you really sure you want to uninstall this service? That cannot be undone. [yes|No] "
  local SURE
  read SURE
  if [ "$SURE" = "yes" ]; then
    stop
    rm -fv "$PID_FILE"
    echo "Notice: The config directory has not been removed"
    echo $CONFIG_DIR
    update-rc.d -f hass-daemon remove
    rm -fv "$0"
    echo "Home Assistant Daemon has been removed. Home Assistant is still installed."
  fi
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  install)
    install
    ;;
  uninstall)
    uninstall
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|install|uninstall}"
esac
```
