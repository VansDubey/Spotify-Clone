let btns = document.querySelector(".btns");

let currFolder;
let folder;
let songs=[];

let currSong = new Audio();

async function displayalbumns() {

  let aa = await fetch("http://127.0.0.1:5502/songs/");
  let response = await aa.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let allas = div.getElementsByTagName("a");
  let array = Array.from(allas);

}

 // playmusic function 
 const playmusic = (track) => {
  currSong.src = `${track}`;
  currSong.play();
  index = songs.indexOf(track); // Update the index when a song is played
  updateButtons(track);


 }
 

async function main() {

  //Display the albumns
  displayalbumns()


  //Load the playlist when album is clicked!!
  Array.from(document.getElementsByClassName("card1")).forEach(e => {
    e.addEventListener("click", async item => {

      let a = await fetch(`http://127.0.0.1:5502/songs/${e.dataset.folder}/`);
      let response = await a.text();
      let div = document.createElement("div");
      div.innerHTML = response;
      let as = div.getElementsByTagName("a");
      songs=[];

      for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
          songs.push(element.href);
        }

      }

       //Show all the songs in the playlist
       let ul = document.querySelector(".song-cards").getElementsByTagName("ul")[0];
       ul.innerHTML = "";
       for (const index of songs) {
       ul.innerHTML = ul.innerHTML + ` <li>  
                <i  class="fa-solid fa-music invert" style="color: #000000;"></i>
               <div class="card">
               <p class="index">${index}</p>
                 <p class="song">${index.replaceAll("%20", " ").split("/")[5].replace('.mp3', '')}</p>
                 <p>Artist</p
               </div>
               <p>Play-Now!!</p>
               <i class="fa-solid fa-play fa-rotate-180 invert" style="color: #000000;"></i> 
            </li>`
     }

     
   //Add an event listener to each song
   Array.from(document.querySelector(".song-cards").getElementsByTagName("li")).forEach(e => {
  
    e.addEventListener("click", element => {
      let url = e.querySelector(".card").firstElementChild.innerHTML;
      // (document.querySelector(".playbar").firstElementChild.innerHTML) = e.querySelector(".card").children[1].innerHTML
    
      playmusic(url);
      updateButtons();

    })
  })

    })
  })

  return songs

}

      function updateButtons(track) {
        document.querySelector(".song-name").innerHTML = track.replaceAll("%20", " ").split("/")[5].replace('.mp3', '');
        btns.innerHTML = `
            <i id="previous" class="fa-solid fa-backward previous" style="color: #000000; height:18px"></i>
            <i id="play" class="fa-solid fa-${currSong.paused ? 'play' : 'pause'} play" style="color: #000000; height:18px"></i>
            <i id="next" class="fa-solid fa-forward next" style="color: #000000; height:18px"></i>
            `;

        // Reattach event listener
        document.querySelector(".play").addEventListener("click", togglePlayPause);
        document.querySelector(".previous").addEventListener("click", playPrevious);
       document.querySelector(".next").addEventListener("click", playNext);
  
  
        function togglePlayPause() {
          if (currSong.paused) {
            currSong.play();
          } else {
            currSong.pause();
          }
          updateButtons();
  
        }
  
      
  
      
        function playPrevious() {
          if (index > 0) {
            index--;
            currSong.src = songs[index];
            currSong.play();
            console.log("previous is clicked");
            updateButtons();
          }
        }

        function playNext() {
          if (index < songs.length - 1) {
            index++;
            currSong.src = songs[index];
            currSong.play();
            console.log("next is clicked");
            updateButtons();
           
          }
  
          }
  
        //Add an event listener to the volume
        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
          //set the volume
          currSong.volume = (e.target.value) / 100;
          
  
        })

          
  //Add eventListenet to mut the track
  //muted,unmuted pr last mai aate hain!!
  document.querySelector(".vol-img").addEventListener("click", volume)
  function volume(){
    if (currSong.muted){

     
      console.log("unmuted");
      
      currSong.muted = false;
  
    }
    else {

      console.log("muted");
     
      currSong.muted = true;
  
    }
    updateButtons();

  }
      }
      
  

   

    





main();







