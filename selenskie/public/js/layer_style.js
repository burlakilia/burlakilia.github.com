/* 
 * Описание стилей карт
 * newHouseStyle - стиль свободный домов
 */

var layersStyle = {
    "new": {
        "checked" : {
            'default': {
                "strokeOpacity": "1",
                "strokeWidth": "1",
                "strokeColor": "green",
                "fillColor": "green", 
                "fillOpacity": "0.2",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "green", 
                "fillColor": "green",
                "fillOpacity": "0.5"
            }
        },
        "unchecked": {
            'default': {
                "strokeOpacity": "0",
                "strokeWidth": "0",
                "strokeColor": "green",
                "fillColor": "green",
                "fillOpacity": "0",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "green",
                "fillColor": "green",
                "fillOpacity": "0.5"
            }
        }
    },
    
    "wait": {
        "checked": {
            'default': {
                "strokeOpacity": "1",
                "strokeWidth": "1",
                "strokeColor": "yellow",
                "fillColor": "yellow", 
                "fillOpacity": "0.2",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "yellow", 
                "fillColor": "yellow",
                "fillOpacity": "0.8"
            }
        },
        "unchecked":{
            'default': {
                "strokeOpacity": "0",
                "strokeWidth": "0",
                "strokeColor": "yellow",
                "fillColor": "yellow", 
                "fillOpacity": "0",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "yellow", 
                "fillColor": "yellow",
                "fillOpacity": "0.5"
            }
        }
    },
    
    "sold": {
        "checked":{
            'default': {
                "strokeOpacity": "1",
                "strokeWidth": "1",
                "strokeColor": "red",
                "fillColor": "red", 
                "fillOpacity": "0.2",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "red", 
                "fillColor": "red",
                "fillOpacity": "0.8"
            }
        },
        "unchecked": {
            'default': {
                "strokeOpacity": "0",
                "strokeWidth": "0",
                "strokeColor": "red",
                "fillColor": "red", 
                "fillOpacity": "0",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "red", 
                "fillColor": "red",
                "fillOpacity": "0.5"
            }
        }
    },
    "work": {
        "checked":{
            'default': {
                "strokeOpacity": "1",
                "strokeWidth": "1",
                "strokeColor": "rgb(35, 97, 161)",
                "fillColor": "rgb(35, 97, 161)",
                "fillOpacity": "0",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "rgb(35, 97, 161)",
                "fillColor": "rgb(35, 97, 161)",
                "fillOpacity": "0.8"
            }
        },
        "unchecked": {
            'default': {
                "strokeOpacity": "0",
                "strokeWidth": "0",
                "strokeColor": "white",
                "fillColor": "white", 
                "fillOpacity": "0",
                "pointRadius": "3", 
                "cursor": "default"
            },
            'select': {
                "strokeColor": "red", 
                "fillColor": "red",
                "fillOpacity": "0.5"
            }
        }
    }
};

/*
var newHouseStyle = {
        
    "checked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "1",
            "strokeWidth": "1",
            "strokeColor": "blue",
            "fillColor": "blue", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "blue", 
            "fillColor": "blue",
            "fillOpacity": "0.5"
        }
    }),
    "unchecked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "0",
            "strokeWidth": "0",
            "strokeColor": "blue",
            "fillColor": "blue", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "blue", 
            "fillColor": "blue",
            "fillOpacity": "0.5"
        }
    })
};

var waitHouseStyle = {
        
    "checked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "1",
            "strokeWidth": "1",
            "strokeColor": "yellow",
            "fillColor": "yellow", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "yellow", 
            "fillColor": "yellow",
            "fillOpacity": "0.5"
        }
    }),
    "unchecked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "0",
            "strokeWidth": "0",
            "strokeColor": "yellow",
            "fillColor": "yellow", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "yellow", 
            "fillColor": "yellow",
            "fillOpacity": "0.5"
        }
    })
};

var soldHouseStyle = {
        
    "checked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "1",
            "strokeWidth": "1",
            "strokeColor": "red",
            "fillColor": "red", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "red", 
            "fillColor": "red",
            "fillOpacity": "0.5"
        }
    }),
    "unchecked": new OpenLayers.StyleMap({
        'default': {
            "strokeOpacity": "0",
            "strokeWidth": "0",
            "strokeColor": "red",
            "fillColor": "red", 
            "fillOpacity": "0",
            "pointRadius": "3", 
            "cursor": "default"
        },
        'select': {
            "strokeColor": "red", 
            "fillColor": "red",
            "fillOpacity": "0.5"
        }
    })
};
*/