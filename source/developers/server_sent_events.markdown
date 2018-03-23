---
layout: page
title: "Server-sent events"
description: "Home Assistant Server-sent events documentation"
date: 2016-04-08 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

The [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) feature is a one-way channel from your Home Assistant server to a client which is acting as a consumer. For bi-directional communication check the [RESTful API](/developers/rest_api/) and [Python API](/developers/python_api/).

The URI that is generating the data is `/api/stream`.

A requirement on the client-side is existing support for the [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface.

There are various ways to access the stream. If you have not set an `api_password` in the [`http`](/components/http/) section of your `configuration.yaml` file then you use your modern browser to read the messages. A command-line option is `curl`:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/stream
```

You can create a convenient view for this by creating an HTML file (`sse.html`) in the `www` folder of your Home Assistant configuration directory (`.homeassistant`). Paste this snippet into the file:

```html
<!DOCTYPE html>
<html>
<body>
    <h1>Getting Home Assistant server events</h1>
    <div id="events"></div>
    <script type="text/javascript">
        var source = new EventSource("/api/stream?api_password=YOUR_PASSWORD");
        source.onmessage = function(event) {
            document.getElementById("events").innerHTML += event.data + "<br>";
        };
    </script>
</body>
</html>
```

Visit [http://localhost:8123/local/sse.html](http://localhost:8123/local/sse.html) to see the stream of events.

## {% linkable_title Examples %}

A simple way to consume server-sent events is to use a command-line http client like [httpie](https://httpie.org/). Installation info is on the site (if you use Homebrew, it's `brew install httpie`). Once installed, run this snippet from your terminal:

```bash
$ http --stream http://localhost:8123/api/stream x-ha-access:YOUR_PASSWORD content-type:application/json
```

### {% linkable_title Website %}

The [home-assistant-sse](https://github.com/fabaff/home-assistant-sse) repository contains a more advanced example.

### {% linkable_title Python %}

If you want to test the server-sent events without creating a website, the Python module [`sseclient` ](https://pypi.python.org/pypi/sseclient/) can help. To install (assuming Python and pip3 are already installed):

```bash
$ pip3 install sseclient
```

A simple script to consume SSE in Python looks like this:

```python
from sseclient import SSEClient

messages = SSEClient('http://localhost:8123/api/stream?api_password=YOUR_PASSWORD')
for msg in messages:
    print(msg)
```
