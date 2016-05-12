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

There are various ways to access the stream. One is `curl`:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/stream
```

For more comfort put the HTML snippet below in a file `sse.html` in your `www` folder of your Home Assistant configuration directory (`.homeassistant`)

```html
<!DOCTYPE html>
<html>
<body>
    <h1>Getting Home Assistant server events</h1>
    <div id="events"></div>
    <script type="text/javascript">
        var source = new EventSource("/api/stream");
        source.onmessage = function(event) {
            document.getElementById("events").innerHTML += event.data + "<br>";
        };
    </script>
</body>
</html>
```

Visit [https://localhost:8123/local/sse.html](https://localhost:8123/local/sse.html) to see the stream of events.

### {% linkable_title Example %}

The [home-assistant-sse](https://github.com/fabaff/home-assistant-sse) repository contains an more advanced example.

