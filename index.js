const Discord = require('discord.js');
const Ytdl = require('ytdl-core');

const token = require('./credentials/authentication.json').discordjs;
var realy = false;
const app = new Discord.Client();

app.on('ready', () => {
  console.log('Pai Ta On porra!');
});

var connection;

app.on('message', async (msg) => {
  // ;leave
  if (msg.content == ';leave') {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.leave();
      realy = false;
    }
    else {
      msg.channel.send('Pai precisa estar em um canal de voz');
    }
  }
  // ;play [link]
  else if (msg.content.startsWith(';play ')) {
    if (msg.member.voice.channel) {
      connection = await msg.member.voice.channel.join();
      realy = true;
    }
    else {
      msg.channel.send('Pai precisa estar em um canal de voz');
    }
    if (realy) {
      let linkPlay = msg.content.replace(';play ', '');
      if (Ytdl.validateURL(linkPlay)) {
        // msg.member.voice.channel.connection.play(Ytdl(linkPlay));
        console.log("Tocando... " + linkPlay);
        try {
          connection.play(Ytdl(linkPlay));
        }
        catch (error) {
          console.log(error);
        }
      } else {
        msg.channel.send('Pai não encontrou essa musica...');
      }
    }
  }
});

app.login(token);
