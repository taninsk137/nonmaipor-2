/**
 * @type {import('./src/@types/index.js').Config} - Bot config
 */
const config = {
    // Lavalink node list
    nodeList: [
        {
            id: 'Node 1',
            hostname: 'lava-all.ajieblogs.eu.org',
            port: 80,
            password: 'https://dsc.gg/ajidevserver'
        }
    ],

    spotify: {
        clientId: '',               // If you want to use Spotify to play songs, you need to set up Spotify credentials.
        clientSecret: ''            // https://developer.spotify.com/documentation/web-api
    },

    bot: {
        textCommand             : true,                 // Whether to enable text command
        slashCommand            : falsae,                 // Whether to enable slash command

        // OAUTH2 mode requires setting 'admin', 'clientSecret' value
        admin                   : [],                   // Admin users, It must be the user ID (string[])
        dj                      : [],                   // DJ users, It must be the user ID (string[])
        djRoleId                : '',                   // DJ role ID, members with this role have DJ permissions (string)

        clientSecret            : '',

        name                    : 'Pandie',
        prefix                  : '-',                  // Text command prefix
        status                  : 'online',             // 'online' | 'idle' | 'dnd'
        activity: {
            type                : 0,                    // https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
            name                : '-p',
            // state               : '',
            // url                 : '',                // The streaming type currently only supports Twitch and YouTube. Only https://twitch.tv/ and https://youtube.com/ urls will work.
        },
        embedsColors: {
            message             : '#FFFFFF',            // Message embed color
            success             : '#FFFFFF',            // Success embed color
            error               : '#FF0000',            // Error embed color
            warning             : '#FFFF00',            // Warning embed color
        },
        volume: {
            default             : 100,
            max                 : 100,
        },
        // Auto leave channel settings
        autoLeave: {
            enabled             : true,
            cooldown            : 5000,         // ms
        },

        // Show voice channel updates
        displayVoiceState       : true,

        // Specify the text channel for receiving commands.
        // If this value is set, text messages from other channels will not be processed.
        specifyMessageChannel   : '',           // Text channel ID

        // Specify the voice channel to join.
        // If this value is set, other voice channels will not be joined.
        specifyVoiceChannel     : '',           // Vioce channel ID

        // After starting the Bot, it will automatically join the specified voice channel and wait.
        // The specifyVoiceChannel value needs to be set, otherwise it will be invalid.
        startupAutoJoin         : false,

        // Language settings
        i18n: {
            localePath          : '../../locales',
            defaultLocale       : 'en-US'
        }
    },

    blacklist                   : [],           // It must be the user ID (string[])

    // Web dashboard settings
    webDashboard: {
        enabled                 : true,
        port                    : 33333,
        loginType               : 'USER',       // 'USER' | 'OAUTH2'

        // USER mode settings
        user: {
            username            : 'admin',
            password            : 'password',
        },

        // OAUTH2 mode settings
        oauth2: {
            link                : '',
            redirectUri         : 'http://localhost:33333/login',
        },

        // SessionManager config
        sessionManager: {
            validTime           : 10 * 60 * 1000,           // Session validity time (ms) (default: 10 minutes)
            cleanupInterval     : 5 * 60 * 1000             // Timing cleaner time (ms) (default: 5 minutes)
        },
        // IPBlocker config
        ipBlocker: {
            retryLimit              : 5,                    // Maximum number of retries (default: 5)
            unlockTimeoutDuration   : 5 * 60 * 1000,        // Blocking time (ms) (default: 5 minutes)
            cleanupInterval         : 5 * 60 * 1000         // Timing cleaner time (ms) (default: 5 minutes)
        }
    },

    // Local Lavalink node
    localNode: {
        enabled             : false,
        autoRestart         : true,
        // downloadLink        : 'https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar'
    },

    // Command permission settings
    command: {
        disableCommand: [],                                 // Disabled commands, all enabled by default
        adminCommand: ['language','server', 'status'],      // Admin commands, only Admin role user can use
        djCommand: []                                       // DJ commands, only DJ role user can use
    }
};

export { config };
