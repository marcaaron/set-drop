const rekordboxParse = function(setlist){
  const sl = setlist.split(/\t/);

  class Track{
    constructor(number, title, artist, album, genre, bpm, time){
      this.number = number;
      this.title = title;
      this.artist = artist;
      this.album = album;
      this.genre = genre;
      this.bpm = bpm;
      this.time = time;
    }
  }

  let tracklist = [];
  let trackNum = 1;

  for (let i=12; i<sl.length; i+=10){
    tracklist.push(new Track(
      trackNum,
      sl[i],
      sl[i+1],
      sl[i+2],
      sl[i+3],
      sl[i+4],
      sl[i+6]
    ));
    trackNum++;
  };
  return tracklist;
};

export default rekordboxParse;
