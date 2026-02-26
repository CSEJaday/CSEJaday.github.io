class Song {
    constructor(title, artist, album, year, genre, coverArt, youtubeCode) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.genre = genre;
        this.coverArt = coverArt;
        this.youtubeCode = youtubeCode;
    }

    getCard() {
        const card = document.createElement("div");
        card.classList.add("card");

        //Title
        const top = document.createElement("div");
        top.classList.add("card-top");

        const h3 = document.createElement("h3");
        h3.textContent = this.title;

        const by = document.createElement("p");
        by.textContent = `By: ${this.artist}`;

        top.append(h3, by);

        //Image
        const img = document.createElement("img");
        img.src = `images/${this.coverArt}`;
        img.alt = `${this.title} cover art`;
        img.classList.add("card-image");
        card.append(top, img);

        card.onclick = () => {
            this.showModal();
        };

        return card;
    }

    showModal() {
        const modalContent = document.getElementById("modal-content-area");

        modalContent.innerHTML = `
  <div class="modal-inner">
    <div id="yt-frame">
      <iframe
        src="https://www.youtube.com/embed/${this.youtubeCode}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="modal-info">
      <button class="modal-close" onclick="closeModal()" aria-label="Close modal">&times;</button>
      <h2 class="modal-title">${this.title}</h2>
      <p> by ${this.artist}</p>
      <p class="modal-album">${this.album}, ${this.year}</p>
      <p class="modal-genre">${this.genre}</p>
    </div>
  </div>
`;

        document.getElementById("id01").style.display = "block";
    }

    
}

function closeModal() {
    document.getElementById("id01").style.display = "none";
} 

const songs = [];
songs.push(new Song("Smooth Operator", "Sade", "Diamond Life", 1984, "R&B", "sadepic.png","OPgmQc3OkFs"));
songs.push(new Song("Human Nature", "Michael Jackson", "Thriller", 1982, "Pop", "michaeljpic.png","oqLpko9Gprs"));
songs.push(new Song("Every Little Step", "Bobby Brown", "Dont Be Cruel", 1988, "R&B", "bobbybpic.png","muDCggSpqpE"));
songs.push(new Song("Never Too Much", "Luther Vandross", "Never Too Much", 1981, "Classic Soul", "lvpic.png","o6vCn2sBbBE"));

const container = document.getElementById("cards-container");
songs.forEach(song => {
    container.appendChild(song.getCard());
});
