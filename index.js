const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  //function that looks for a song with a certin id in an array of songs.
  //and "plays" it.
  playSong(song) {
    let ans; // var to store the song with the right id.
    // search for the song in the array.
    this.songs.forEach(check => {
      if(check.id == song)
        ans = check;
    });
    let mmssDuration;
    if(ans != undefined){
      //calculate the duration in mm:ss format.
      mmssDuration = calculateDuration(ans.duration);
      //log the song in the right format.
      console.log(`Playing ${ans.title} from ${ans.album} by ${ans.artist} | ${mmssDuration}.`);
    }
    else{
      throw 'ID does not exist';
    }
  },
}
//calls for the function that plays a song in the player.
function playSong(id) {
  player.playSong(id);
}
//remove song by id.
function removeSong(id) {
  
  let indexToBeRemoved = 0;
  let indexOfPlaylists = 0;
  let idToBeRemoved;
  let found = false;
  //searchs in the array for a song with certain id and store its index.
  for(indexToBeRemoved = 0;indexToBeRemoved < player.songs.length && !found;indexToBeRemoved++){
    if(player.songs[indexToBeRemoved].id == id){
      found = true;
    }
  }
  //if song id does not exist throw an exception.
  if(!found)
    throw 'ID does not exist';
  //remove song from player.
  player.songs.splice(indexToBeRemoved-1,1);

  //remove song from all playlists.
  player.playlists.forEach(playlist => {
    playlist.songs.forEach(song => {
      if(song.id == idToBeRemoved)
        playlist.songs.splice(indexOfPlaylists,1);
      indexOfPlaylists++;
    });
    indexOfPlaylists = 0;
  });
  
}

function addSong(title, album, artist, duration, id) {
  
  if(id == undefined){
    id = genrateSongID();
  }
  else{
    player.songs.forEach(song => {
      if(song.id == id){
        throw "this ID is already taken";
      }
    });
  }
  let str = duration.split(":");
  let min = str[0]*60;
  let sec = str[1]*1
  let durationInSec = min + sec;
  console.log(id);
  player.songs.push({id:id, title:title, album:album, artist:artist, duration:durationInSec});
  return id;
}

function removePlaylist(id) {
  let found = false;
  for (let i = 0; i < player.playlists.length && !found; i++) {
    if(player.playlists[i].id == id){
      player.playlists.splice(i,1);
      found = true;
    }
  }
  if(!found)
    throw "ID does not exist";
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

function calculateDuration(duration){
  
  mmDuration = Math.floor(duration / 60);
  if(mmDuration < 10)
    mmDuration = "0" + mmDuration;
  ssDuration = duration - mmDuration * 60;
  return mmDuration+":"+ssDuration;
}
function genrateSongID(){
  id = 1;
  player.songs.forEach(song => {
    player.songs.forEach(s => {
      if(song.id == id)
        id++;
    });
  });
  return id;
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
