import i18next from 'i18next';

import { dashboard } from '../dashboard/index.js';
import { embeds } from '../embeds/index.js';
import { CommandCategory } from '../@types/index.js';

import type { ChatInputCommandInteraction, Client, Message } from 'discord.js';
import type { Bot } from '../@types/index.js';


export const name = 'join';
export const aliases = ['add', 'summon'];
export const description = i18next.t('commands:CONFIG_JOIN_DESCRIPTION');
export const usage = i18next.t('commands:CONFIG_JOIN_USAGE');
export const category = CommandCategory.MUSIC;
export const voiceChannel = true;
export const showHelp = true;
export const sendTyping = false;
export const options = [];


export const execute = async (bot: Bot, client: Client, message: Message) => {

    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(message.guild?.id),
        voiceChannelId: String(message.member?.voice.channelId),
        textChannelId: message.channel.id,
        selfDeaf: true
    });

    if (!player.setting) {
        player.setting = {
            queuePage: null,
            volume: null
        };
    }


    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = message;
    } catch (error) {
        bot.logger.emit('error', bot.shardId, 'Error joining channel: ' + error);
        return message.reply({ embeds: [embeds.textErrorMsg(bot, client.i18n.t('commands:ERROR_PLAY_JOIN_CHANNEL'))], allowedMentions: { repliedUser: false } });
    }

    try {
        // Intial dashboard
        if (!player.dashboard) await dashboard.initial(bot, message, player);
    } catch (error) {
        await dashboard.destroy(bot, player);
    }

    return message.react('👍');
};

export const slashExecute = async (bot: Bot, client: Client, interaction: ChatInputCommandInteraction) => {
    const guildMember = interaction.guild!.members.cache.get(interaction.user.id);
    const { channel } = guildMember!.voice;

    // Creates the audio player
    const player = client.lavashark.createPlayer({
        guildId: String(interaction.guild?.id),
        voiceChannelId: String(channel?.id),
        textChannelId: interaction.channel?.id,
        selfDeaf: true
    });

    if (!player.setting) {
        player.setting = {
            queuePage: null,
            volume: null
        };
    }

    const curVolume = player.setting.volume ?? bot.config.bot.volume.default;

    try {
        // Connects to the voice channel
        await player.connect();
        player.metadata = interaction;
        player.filters.setVolume(curVolume);
    } catch (error) {
        bot.logger.emit('error', bot.shardId, 'Error joining channel: ' + error);
        return interaction.editReply({ embeds: [embeds.textErrorMsg(bot, client.i18n.t('commands:ERROR_PLAY_JOIN_CHANNEL'))], allowedMentions: { repliedUser: false } });
    }

    try {
        // Intial dashboard
        if (!player.dashboard) await dashboard.initial(bot, interaction, player);
    } catch (error) {
        await dashboard.destroy(bot, player);
    }

    return interaction.editReply({ embeds: [embeds.textSuccessMsg(bot, client.i18n.t('commands:MESSAGE_JOIN_SUCCESS'))], allowedMentions: { repliedUser: false } });
};