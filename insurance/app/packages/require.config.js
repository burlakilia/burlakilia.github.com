var jam = {
    "packages": [
        {
            "name": "async",
            "location": "packages/async",
            "main": "lib/async.js"
        },
        {
            "name": "events",
            "location": "packages/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "packages/jquery",
            "main": "jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "packages/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "json",
            "location": "packages/json",
            "main": "json.js"
        },
        {
            "name": "text",
            "location": "packages/text",
            "main": "text.js"
        }
    ],
    "version": "0.2.12",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "async",
            "location": "packages/async",
            "main": "lib/async.js"
        },
        {
            "name": "events",
            "location": "packages/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "packages/jquery",
            "main": "jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "packages/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "json",
            "location": "packages/json",
            "main": "json.js"
        },
        {
            "name": "text",
            "location": "packages/text",
            "main": "text.js"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "async",
            "location": "packages/async",
            "main": "lib/async.js"
        },
        {
            "name": "events",
            "location": "packages/events",
            "main": "events.js"
        },
        {
            "name": "jquery",
            "location": "packages/jquery",
            "main": "jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "packages/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "json",
            "location": "packages/json",
            "main": "json.js"
        },
        {
            "name": "text",
            "location": "packages/text",
            "main": "text.js"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}