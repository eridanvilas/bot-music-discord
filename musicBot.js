const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl =  require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};


const token = 'NzIzNTk2ODU5OTgxMDM3NzAw.Xuz_LA.07Mj0aJ1OpEZV0titZ_ubZLdUB4';
bot.login(token);

bot.on('ready',() => {
  console.log('Pai Ta On Porra!');
});

bot.on('message', msg => {
  if(msg.author.bot) {
    return;
  }
  if(msg.content.indexOf("youtube") !== -1 && msg.content.toLowerCase().startsWith("?play")){
    var voiceChannel = message.member.voiceChannel;
    var CompleteMessage = msg.content.split(' ');
    var youtubeLink = CompleteMessage[1];

    voiceChannel.join().then(connection =>{
      console.log("joined channel");
      const stream = ytdl(youtubeLink, {filter: 'audioonly'});
      const dispatcher = connection.playStream(stream, streamOptions);
      dispatcher.on("end", end => {
        console.log("left channel");
        voiceChannel.leave();
      });
    }).catch(err => console.log(err));
  }
});
