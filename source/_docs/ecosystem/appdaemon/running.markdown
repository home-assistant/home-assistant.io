---
title: "Running AppDaemon"
description: "Running AppDaemon"
redirect_from: /ecosystem/appdaemon/running/
---

As configured, `AppDaemon` comes with a single HelloWorld App that will send a greeting to the logfile to show that everything is working correctly.

## Docker

Assuming you have set the configuration up as described above for Docker, you can run it with the command:

```bash
$ docker run -d -v <Path to Config>/conf:/conf --name appdaemon acockburn/appdaemon:latest
```

In the example above you would use:

```bash
$ docker run -d -v /Users/foo/ha-config:/conf --name appdaemon acockburn/appdaemon:latest
```

Where you place the `conf` and `conf/apps` directory is up to you - it can be in downloaded repository, or anywhere else on the host, as long as you use the correct mapping in the `docker run` command.

You can inspect the logs as follows:

```bash
$ docker logs appdaemon
2016-08-22 10:08:16,575 INFO Got initial state
2016-08-22 10:08:16,576 INFO Loading Module: /export/hass/appdaemon_test/conf/apps/hello.py
2016-08-22 10:08:16,578 INFO Loading Object hello_world using class HelloWorld from module hello
2016-08-22 10:08:16,580 INFO Hello from AppDaemon
2016-08-22 10:08:16,584 INFO You are now ready to run Apps!
```

Note that for Docker, the error and regular logs are combined.

## `pip3`

You can then run AppDaemon from the command line as follows:

```bash
$ appdaemon -c conf/appdaemon.cfg
```

If all is well, you should see something like the following:

```bash
$ appdaemon -c conf/appdaemon.cfg
2016-08-22 10:08:16,575 INFO Got initial state
2016-08-22 10:08:16,576 INFO Loading Module: /export/hass/appdaemon_test/conf/apps/hello.py
2016-08-22 10:08:16,578 INFO Loading Object hello_world using class HelloWorld from module hello
2016-08-22 10:08:16,580 INFO Hello from AppDaemon
2016-08-22 10:08:16,584 INFO You are now ready to run Apps!
```

## AppDaemon arguments

```txt
usage: appdaemon [-h] [-c CONFIG] [-p PIDFILE] [-t TICK] [-s STARTTIME]
                 [-e ENDTIME] [-i INTERVAL]
                 [-D {DEBUG,INFO,WARNING,ERROR,CRITICAL}] [-v] [-d]

optional arguments:
  -h, --help            show this help message and exit
  -c CONFIG, --config CONFIG
                        full path to config file
  -p PIDFILE, --pidfile PIDFILE
                        full path to PID File
  -t TICK, --tick TICK  time in seconds that a tick in the schedular lasts
  -s STARTTIME, --starttime STARTTIME
                        start time for scheduler <YYYY-MM-DD HH:MM:SS>
  -e ENDTIME, --endtime ENDTIME
                        end time for scheduler <YYYY-MM-DD HH:MM:SS>
  -i INTERVAL, --interval INTERVAL
                        multiplier for scheduler tick
  -D {DEBUG,INFO,WARNING,ERROR,CRITICAL}, --debug {DEBUG,INFO,WARNING,ERROR,CRITICAL}
                        debug level
  -v, --version         show program's version number and exit
  -d, --daemon          run as a background process
```

-c is the path to the configuration file. If not specified, AppDaemon will look for a file named `appdaemon.cfg` first in `~/.homeassistant` then in `/etc/appdaemon`. If the file is not specified and it is not found in either location, AppDaemon will raise an exception.

-d and -p are used by the init file to start the process as a daemon and are not required if running from the command line. 

-D can be used to increase the debug level for internal AppDaemon operations as well as apps using the logging function.

The -s, -i, -t and -s options are for the Time Travel feature and should only be used for testing. They are described in more detail in the API documentation. 
