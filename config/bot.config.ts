import { GatewayIntentBits, PermissionsString, PresenceData, ActivityType } from "discord.js";

export const botConfig = {
    botName: "test",


    colors: {
        primary: parseInt("#hex", 16),
        success: parseInt("#hex", 16),
        warning: parseInt("#hex", 16),
        error: parseInt("#hex", 16),
    },
    dashboard: "",

    /** External Info (legacy based on closed or open source status*/
    githubUrl: "",
    /**
     * GuildPresences, MessageContent, and GuildMembers are privileged and must be enabled in the dev portal
     * @see https://discord.com/developers/docs/topics/gateway#privileged-intents
     * */
    intents: [
        GatewayIntentBits.Guilds,
    ],
    /** People that can access bot owner only commands */
    owners: [""],

    presence: {
        activities: [
            {
                type: ActivityType.Playing,
                name: ""
            }
        ],
        /** online, idle, dnd, invisible */
        status: "online"
    } as PresenceData,


    requiredPermissions: [
        "EmbedLinks",
        "SendMessages",
        "UseExternalEmojis"
    ] as PermissionsString[],

    supportServer: "",

    version: ""
}