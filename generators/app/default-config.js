var core = {
    "modules": {
        "application": {
            "id": "",
            "home": "/",
            "blank": "/blank",
            "notFound": "/not-found",
            "redirectAfterRouteError": "/error",
            "defaultSandboxPermissions": "",
            "defaultSandboxId": ""
        },
        "culture": {
            "available": [
                "en",
                "fr"
            ],
            "default": "en"
        },
        "env": {
            "type": "test"
        },
        "security": {
            "autoLogin": true,
            "redirectAfterLogout": "/",
            "redirectAfterLogin": "/",
            "persistentRestrictions": false
        },
        "utils": {},
        "text": {},
        "notifications": {
            "disableNotifications": false,
            "position": "bottom-right",
            "limit": 10,
            "options": {}
        },
        "ui": {
            "expandedRouteCategories": []
        }
    }
};

var components = {
    "modules": {
        "select": {},
        "grid": {}
    }
};

var dataviz = {
    "modules": {
        "bullet": {},
        "cumulativeline": {},
        "discretebar": {},
        "historicalbar": {},
        "line": {},
        "lineplusbar": {},
        "linewithfocus": {},
        "multibar": {},
        "multibarhorizontal": {},
        "pie": {},
        "scatter": {},
        "stackedarea": {}
    }
};


var extras = {
    "modules": {
        "analytics": {
            "provider": "piwik",
            "virtualPageViews": true,
            "settings": {}
        }
    }
};

var businessTheme = {
    "modules": {
        "main": {
            "sidebar": { "width": 270 },
            "logoUrl": "",
            "links":  [{label: '', i18n: 'custom.link.key', href: 'https://www.google.com', target: '_blank', security: ''}],
            "hideConnectivity": true,
            "hideCulture": false,
            "hideSecurity": true
        }
    }
};

var simpleTheme = {
    "modules": {
        "menu": {
            "logoUrl": "",
            "categories": [],
            "hideViews": false,
            "routes": [],
            "hideConnectivity": false,
            "hideCulture": false,
            "hideSecurity": false
        }
    }
};

var bootstrap3 = {};

var bootstrap2 = {};

var material = {};

module.exports = {
    core: { path: "bower_components/w20/w20-core.w20.json", definition: core },
    components: { path: "bower_components/w20-components/w20-components.w20.json", definition: components } ,
    dataviz: { path: "bower_components/w20-dataviz/w20-dataviz.w20.json", definition: dataviz },
    extras: { path:"bower_components/w20-extras/w20-extra.w20.json", definition: extras },
    'bootstrap-3': { path:"bower_components/w20-bootstrap-3/w20-bootstrap-3.w20.json", definition: bootstrap3 },
    'bootstrap-2': { path:"bower_components/w20-bootstrap-2/w20-bootstrap-2.w20.json", definition: bootstrap2 },
    'material': { path:"bower_components/w20-material/w20-material.w20.json", definition: material },
    'business-theme': { path:"bower_components/w20-business-theme/w20-business-theme.w20.json", definition: businessTheme },
    'simple-theme': { path:"bower_components/w20-simple-theme/w20-simple-theme.w20.json", definition: simpleTheme },
};
