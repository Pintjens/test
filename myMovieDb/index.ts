import express from "express";
const app = express();

interface Movie{
    name: string,
    myScore: number,
    image: string,
    description: string
}

let movies : Movie[] = [
    {name: "The Matrix", myScore: 90, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9fcc8387e9d47ab5af4318d7183f6d2b_19f7e1e1-3941-4c27-bad1-1f6dd70f35e0_480x.progressive.jpg?v=1573587594", description: "In a dystopian future, humanity is enslaved by intelligent machines that have created a simulated reality known as the Matrix to pacify and control them. When a computer programmer, Neo, is contacted by a group of rebels who claim to know the truth about the world he inhabits, he discovers that he may be the key to the salvation of humankind. With groundbreaking special effects and intense action sequences, The Matrix is a mind-bending sci-fi classic that explores the nature of reality, identity, and freedom."},
    {name: "Pulp Fiction", myScore: 100, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/pulpfiction.2436_500x749.jpg?v=1620048742", description: "A groundbreaking, non-linear crime drama that weaves together multiple stories and characters in the seedy underworld of Los Angeles. With its sharp dialogue, memorable characters, and iconic soundtrack, Pulp Fiction explores themes of violence, redemption, and the blurred lines between good and evil. From hitmen Vincent and Jules to boxer Butch and his girlfriend Fabienne, each character's story is uniquely compelling and intertwines in unexpected ways. Directed by Quentin Tarantino, Pulp Fiction is widely regarded as one of the greatest films ever made."},
    {name: "Monster Hunter", myScore: 5, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/monsterhunter.styleb.ar_500x749.jpg?v=1608660576", description: "Based on the popular video game series, this action-packed adventure follows a group of soldiers who are transported to a mysterious and dangerous alternate world inhabited by giant monsters. Led by a skilled hunter, they must navigate this new world and find a way back home while battling terrifying creatures and uncovering the secrets of the world they now find themselves in. With stunning visual effects and pulse-pounding action sequences, Monster Hunter is a thrilling ride for fans of the video game and newcomers alike."},
    {name: "Blade Runner", myScore: 100, image:"https://cdn.shopify.com/s/files/1/0057/3728/3618/products/d9f6067d2406a7cfbf42a5fc4ae4cd9d_8174831c-db77-4608-9ae2-44aca8f2a6f5_500x749.jpg?v=1573585461", description:"Set in a dystopian future, this sci-fi classic follows Rick Deckard, a retired Blade Runner, who is tasked with hunting down and killing a group of dangerous replicants - bioengineered beings designed to look and act like humans. As Deckard begins his investigation, he uncovers a web of secrets and conspiracies that force him to question his own identity and morality. With its haunting visuals, philosophical themes, and mesmerizing score by Vangelis, Blade Runner is a seminal work of science fiction that has influenced countless films and pop culture phenomena."},
    {name: "The Matrix 2", myScore: 45, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9fcc8387e9d47ab5af4318d7183f6d2b_19f7e1e1-3941-4c27-bad1-1f6dd70f35e0_480x.progressive.jpg?v=1573587594", description: "In this highly anticipated sequel to The Matrix, Neo, Trinity, and Morpheus continue their fight against the machines that have enslaved humanity. As they uncover more about the Matrix's origins and the true nature of their reality, they must also confront a new threat: Agent Smith, a rogue program that has gained incredible powers and seeks to destroy both the Matrix and the real world. With even more mind-bending action and stunning visual effects, The Matrix Reloaded takes the franchise to new heights of excitement and philosophical inquiry."},
    {name: "Pulp Fiction 2", myScore: 50, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/pulpfiction.2436_500x749.jpg?v=1620048742", description: "Jules and Vincent are back as hitmen working for a new boss in the seedy underworld of New York City. This time, they get caught up in a plot involving a mysterious briefcase, a deadly femme fatale, and a vengeful ex-cop. With even more violence, memorable characters, and a killer soundtrack, 'Pulp Fiction 2' takes the original film to new heights of cinematic brilliance."},
    {name: "Monster Hunter 2", myScore: 2.5, image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/monsterhunter.styleb.ar_500x749.jpg?v=1608660576", description: "Monster Hunter 2 is a top-secret government project that involves genetically engineering monsters for military purposes. The game involves controlling a team of monster hunters tasked with tracking down and capturing these creatures before they can cause harm to civilians. The twist? The monsters are not the real threat - it's the corrupt government officials behind the project who will stop at nothing to keep their secrets hidden. Can you expose the truth and save the world?"},
    {name: "Blade Runner 2", myScore: 50, image:"https://cdn.shopify.com/s/files/1/0057/3728/3618/products/d9f6067d2406a7cfbf42a5fc4ae4cd9d_8174831c-db77-4608-9ae2-44aca8f2a6f5_500x749.jpg?v=1573585461", description:"Set thirty years after the events of the original film, Blade Runner 2049 follows a new blade runner, LAPD Officer K, who uncovers a long-buried secret that has the potential to plunge what's left of society into chaos. His discovery leads him on a quest to find former blade runner Rick Deckard, who has been missing for three decades. As K's investigation progresses, he grapples with questions of what it means to be human and whether replicants deserve the same rights as humans. Directed by Denis Villeneuve and starring Ryan Gosling and Harrison Ford, Blade Runner 2049 is a stunning and thought-provoking sequel that expands upon the themes and world of the original film."}
];

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('home', {titel: "Home"});
  });

app.get('/movies',(req, res) => {
    res.render('movies', {titel: "Movies", movies: movies});
});
app.get('/movie/:index',(req, res) => {
  let index : number = parseInt(req.params.index);
  if((typeof(movies[index]) == "undefined")){
      res.render("bad-request", {message: `Unknow Movie index suplied\nHighest know movie index = ${movies.length}`});
      return;
  }
  else{
      res.render("movie", {titel: movies[index].name, movie: movies[index]});
          return;

      }
});

app.get("/whoamijson", (req, res) => {
  res.type('json');
  res.send();
});

app.use((req, res) => {
  res.type("text/html");
  res.status(404);
  res.render("bad-request");
  }
);

app.listen (app.get("port"), async() => {
  console.log("[server] http://localhost:" + app.get("port"));
});