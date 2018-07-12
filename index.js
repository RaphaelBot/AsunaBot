const Discord = require('discord.js');
const bot = new Discord.Client();
const client = new Discord.Client();
const moment = require("moment");
const superagent = require("superagent");
const economy = require('discord-eco');
const config = require("./config.json")


var prefix = ("+")

bot.on('ready', function() {

    bot.user.setActivity(`+help - ${client.guilds.size} serveurs`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/bot"});

    console.log(`Connecté sur ${client.guilds.size} avec ${client.users.size} membres`);
});

bot.login(config.token);

bot.on('message', message => {

    let msg = message.content.toUpperCase();


    if(message.channel.type === "dm") return;

    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send(`Mon ping est de **${bot.ping}ms**`)
        console.log(`+ping effectué par ${message.author.tag}`)
    };

    if (message.content.startsWith(prefix + 'help')) {
      
        var help1embed = new Discord.RichEmbed()
        .setTitle("Utiles")
        .setColor("RANDOM")
        .addField(prefix + "help :",  "Affiche la commande help")
        .addField(prefix + "ping :", "Affiche le ping du bot")
        .addField(prefix + "userinfo <@utilisateur> :", "Donne des infos sur l'user")
        .addField(prefix + "dice :", "Lance un dé")
        .addField(prefix + "emojis :", "Donne les emojis du serveur")
        .addField(prefix + "sinfo :", "Donne des infos sur le serveur")
        .addField(prefix + "purge <nombre> :", "Purge le nombre de message selectionné");
        message.channel.send(help1embed);

        var help2embed = new Discord.RichEmbed()
        .setTitle("Economie")
        .setColor("RANDOM")
        .addField(prefix + "bal :", "Affiche le montant de son argent.")
        .addField(prefix + "addmoney <montant> <@utilisateur> :", "Ajoute ou retire de l'argent à la personne mentionné (Owner Only)");
        message.channel.send(help2embed);
       
        

  console.log(`+help effectué par ${message.author.tag}`)
    };

    if (message.content.startsWith(prefix + 'userinfo')) {
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
          } else {
              user = message.author;
          }
      
          const member = message.guild.member(user);
          
       
          var userinfoembed = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setThumbnail(user.avatarURL)
              .setTitle(`${user.username}#${user.discriminator}`)
              .addField("ID:", `${user.id}`, true)
              .addField("Surnom:", `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`)
              .addField("Créé le:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
              .addField("Serveur rejoint le:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
              .addField("Bot:", `${user.bot}`)
              .addField("Status:", `${user.presence.status}`)
              .addField("Jeu:", `${user.presence.game ? user.presence.game.name : 'None'}`)
              .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '))
              .setFooter(`Commande éffectué par ${message.author.username}#${message.author.discriminator}`)
           message.channel.send(userinfoembed);
           console.log(`+userinfo effectué par ${message.author.tag}`)
          };


          if (message.content.startsWith(prefix + 'dice')) {
          let replies = ["Un", "Deux", "Trois", "Quatre", "Cinque", "Six"];
          let result = Math.floor((Math.random() * replies.length));
      
          message.delete().catch(O_o => {});
      
          try {
              let newembed = new Discord.RichEmbed()
                  .setAuthor("Le dé est bien lancé")
                  .setColor("#00FF00")
                  .setDescription("Lancé par: " + message.author.username + "\nResultat: " + replies[result]);
                  console.log(`+dé effectué par ${message.author.tag}`)
              message.channel.send({
                  embed: newembed
              });
          } catch (e) {
              console.log(e.stack);
          }; 
      };
      


      if (message.content.startsWith(prefix + 'emojis')) {
      try {

        let emojis;
        if (message.guild.emojis.size === 0) emojis = 'Il n\'y a pas d\'emotes ici';
        else emojis = `**Emojis de ${message.guild.name}**\n${message.guild.emojis.map(e => e).join(' ')}`;
        message.channel.send(emojis);
 console.log(`+emojis effectué par ${message.author.tag}`)
    } catch (err) {

        message.channel.send(`**${err.name}: ${err.message}**`)
    };
};

    if (message.content.startsWith(prefix + 'invite')) {
            message.channel.send("**Invitation permanente : ** http://bit.ly/AsunaBotDiscord")
            console.log(`+invite effectué par ${message.author.tag}`)
    };



    if (message.content.startsWith(prefix + 'sinfo')) {
    let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
    let day = message.guild.createdAt.getDate()
    let month = 1 + message.guild.createdAt.getMonth()
    let year = message.guild.createdAt.getFullYear()
     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setAuthor(message.guild.name, sicon)
     .setFooter(`Serveur créé le • ${day}.${month}.${year}`)
     .setColor("RANDOM")
     .setThumbnail(sicon)
     .addField("ID", message.guild.id)
     .addField("Nom", message.guild.name)
     .addField("Owner", message.guild.owner.user.tag)
     .addField("Region", message.guild.region)
     .addField("Channels", message.guild.channels.size)
     .addField("Roles", message.guild.roles.size);
     message.channel.send(serverembed);
     console.log(`+sinfo effectué par ${message.author.tag}`)
    };

    if(message.content.startsWith(prefix + "eval")) {
        try{
          if (message.author.id !== config.ownerID)
            return;
          let args = message.content.split(" ").slice(1);
          eval(args.join(" "));
        }
        
        catch(err){
          var evalembed = new Discord.RichEmbed()
          .setTitle("Erreur")
          .setDescription("Eval terminé avec l'erreur suivante `" + err + "`");
         message.channel.send(evalembed)
         console.log(`+eval effectué par ${message.author.tag}`)
        }
      };

      if(message.content.startsWith(prefix + "purge")) {
        let args = message.content.split(" ").slice(1);
    
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Non.");
            if(!args[0]) return message.channel.send("Veuillez specifiez un nombre !");
         message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`J'ai supprimé ${args[0]} messages.`).catch(console.error);
      console.log(`+purge effectué par ${message.author.tag}`)
    });
};


// Economy



if(message.content.startsWith(prefix + "bal")) {

  
    economy.fetchBalance(message.author.id + message.guild.id).then((i) => { 

        const balembed = new Discord.RichEmbed()
            .setDescription(`**Banque de ${message.guild.name}**`)
            .setColor(0xD4AF37) 
            .addField('Proptiétaire',message.author.username) 
            .addField('Account Balance',i.money + "<:Pieces:466795453221044236>")


    
        message.channel.send(balembed)
        console.log(`+bal effectué par ${message.author.tag}`)
    })

};



if(message.content.startsWith(prefix + "addmoney")) {

    let args = message.content.split(" ").slice(1);

    if (message.author.id !== config.ownerID)
            return;


if (!args[0]) {
    message.channel.send(`Tu dois définir un montant.`);
    return;
}


if (isNaN(args[0])) {
    message.channel.send(`Le montant doit etre un nombre`);
    return; 
}


let defineduser = '';
if (!args[1]) { 
    defineduser = message.author.id;
} else {
    let firstMentioned = message.mentions.users.first();
    defineduser = firstMentioned.id;
}


economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => { 
    message.channel.send(` ${args[0]} ont été ajouté/retiré à ce compte`)
});

};



});

bot.on('message', message => {
    const swearWords = ["fdp", "fils de pute","pute","pd","pede","pédé","con","connard","encul","enculé","naigre","negro","pioute","salope","slp","nique ta mere","nique ta mére","ntm","ntr","nique","nik","ta gueule","tg","tgl"];
    if( swearWords.some(word => message.content.includes(word)) ) {
        message.delete();
        message.reply('Les insultes sont interdites');
        console.log(`${message.author.tag} a dit une insulte`)
      };
});



bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le serveur ' + member.displayName);
    }).catch(console.error)

});

  
  client.on("guildCreate", guild => {

    console.log(`Nouveau serveur: ${guild.name} (id: ${guild.id}). Elle possede ${guild.memberCount} membres!`);
    bot.user.setActivity(`+help - ${client.guilds.size} serveurs`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/bot"});
    });
  
  client.on("guildDelete", guild => {

    console.log(`J'ai quitté: ${guild.name} (id: ${guild.id})`);
    bot.user.setActivity(`+help - ${client.guilds.size} serveurs`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/bot"});
    });
