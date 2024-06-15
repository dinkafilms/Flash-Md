const { france } = require("../framework/france");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

france({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `*ŋąɖɛɛŋ ცơɬ SONG DOWNLOADER*\n\n*Title:* ${videos[0].title}
         
*Duration:* ${videos[0].timestamp}
*Song Url:* ${videos[0].url}



*_Powered by ©Nadeen poorna._*`
       }

      

      

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vidéo
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // Écrire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Envoi du fichier audio terminé !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'එහෙම එකක් නෑ බං 😕 :', error);
        repondre('Une erreur est survenue lors de l\'එහෙම සින්දුවක් නෑ බං 😕.');
      });
    } else {
      repondre('එහෙම එකක් නෑ බං 😕.');
    }
  } catch (error) {
    console.error('වීඩියෝව සෙවීමේ හෝ බාගැනීමේ දෝෂයකි :', error);
    
    repondre('වීඩියෝව සෙවීමේදී හෝ බාගත කිරීමේදී දෝෂයක් ඇති විය.');
  }
});

  

france({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("insert video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*​ŋąɖɛɛŋ BOT VIDEO DOWNLOADER*\n\n*Title :* ${Element.title}
*Duration :* ${Element.timestamp}
*Video Url:* ${Element.url}



*Powered by ©Nadeen poorna*\n\n`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption: "*ŋąɖɛɛŋ 🇧​​🇴​​🇹​*", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('වීඩියෝ ගොනුව ලිවීමේදී දෝෂයක් ඇති විය. :', error);
        repondre('වීඩියෝ ගොනුව ලිවීමේදී දෝෂයක් ඇති විය.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('වීඩියෝ ගොනුව ලිවීමේදී දෝෂයක් ඇති විය.:', error);
    repondre('වීඩියෝ ගොනුව ලිවීමේදී දෝෂයක් ඇති විය.');
  }
});
