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
//get song detailes, create a new song with those detailes, and returns the id of the new song.
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
  let t = duration.split(":");
  let minutes = t[0]*60;
  let seconds = t[1]*1
  let durationInSec = minutes + seconds;
  console.log(id);
  player.songs.push({id:id, title:title, album:album, artist:artist, duration:durationInSec});
  return id;
}
//gets id and remove the corresponding playlist from player
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
//gets a name and id, create a new playlist, and returns the id of the new playlist
function createPlaylist(name, id) {
  if(id == undefined) { id = genratePlaylistID(); }
  else{
    player.playlists.forEach(playlist => {
      if(playlist.id == id)
        throw "ID is already taken";
    });
  }
  player.playlists.push({id:id, name:name, songs:[]});
  return id;
}
//gets a playlist's id and play all the songs in it.
function playPlaylist(id) {
  let found = false;
  player.playlists.forEach(playlist => {
    if(playlist.id == id){
      for (let i = 0; i < playlist.songs.length; i++) {
        playSong(playlist.songs[i]);
      }
      found = true;
    }
  });
  if(!found) throw "ID does not exist";
}

//gets a song's id and a playlist's id and adds/removes the song from the playlist, if the playlist contains 0 songs the playlist will be deleted.
function editPlaylist(playlistId, songId) {
  let indexes = getPlaylistAndSongIndex(playlistId, songId);
  let indexOfPlaylist = indexes[0];
  let indexOfSong = indexes[1];
  console.log(indexOfPlaylist+",,,"+indexOfSong);
  if(indexOfSong != -1){
    if(player.playlists[indexOfPlaylist].songs.length == 1){
      player.playlists.splice(indexOfPlaylist,1);
    }
    else{
      player.playlists[indexOfPlaylist].songs.splice(indexOfSong,1);
    }
  }
  else{
    let exist = false;
    player.songs.forEach(song => {
      if(song.id == songId)
        exist = true;
    });
    if(!exist)
      throw "song does not exist";
    player.playlists[indexOfPlaylist].songs.push(songId);
  }
  
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
//gets a duration in seconds and returns a duration in mm:ss format.
function calculateDuration(duration){
  mmDuration = Math.floor(duration / 60);
  if(mmDuration < 10)
    mmDuration = "0" + mmDuration;
  ssDuration = duration - mmDuration * 60;
  return mmDuration+":"+ssDuration;
}
//returns a new unused id number for songs.
function genrateSongID(){
  id = 1;
  player.songs.forEach(song => {
    if(song.id > id)
      id = song.id;
  });
  return id + 1;
}
//returns a new unused id number for playlists.
function genratePlaylistID(){
  id = 1;
  player.playlists.forEach(playlist => {
    if(playlist.id > id)
      id = playlist.id;
  });
  return id + 1;
  
}
//gets a playlist's id and a song's id and returns the index of the playlist int the array of playlists, also returns the song's index in the picked playlist.
function getPlaylistAndSongIndex(playlistID, songID){
  let indexOfSong = -1;
  let indexOfPlaylist = -1;
  for (let i = 0; i < player.playlists.length; i++) {
    const playlist = player.playlists[i];
    if(playlist.id == playlistID){
      indexOfPlaylist = i;
      for (let j = 0; j < playlist.songs.length; j++) {
        const song = playlist.songs[j];
        if(song == songID){
          indexOfSong = j;
        }
      }
    }
  }
  if(indexOfPlaylist == -1){
    throw "playlist index does not exisst";
  }
  return [indexOfPlaylist,indexOfSong];

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
