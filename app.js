const searchInput = document.getElementById("poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const colors = {
  //her pokemonun typesine göre backgroundcolorunu değiştirdik
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flyinh: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff",
};

const pokeCount = 151; //totalde 151 tane pokemon oldugu ıcın buna sabıt değer verdık

const initPokemon = async () => {
  //1 den 151 e kadar sayabilmek için böyle bir döngü kurduk bilerek async/await kulladıkki getpokemon fonksıyonunu beklemeyıp arka planda o çalıssın dıye
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (farkmiyoburayayazdigim) => {
  //bu fonksiyonda apiden verileri çektik ve içine 1 tane fonksıyon daha tanımladıkki apiden verileri çekerken onuda uygulasın diye
  let url = `https://pokeapi.co/api/v2/pokemon/${farkmiyoburayayazdigim}`;
  let res = await fetch(url);
  let data = await res.json();
  // console.log(data);
  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  //bu fonksiyonda apiden çektiğin verilere işlem uygulkadın ona göre kur cümlelerini kardo
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); // her pokemonun isminin ilk harfini büyüğe çevirdik sonra slice ile ilk herfini kestik ve ikisini birleştirdik böylece isimlerin ilk harfi büyük olmuş oldu
  const id = pokemon.id.toString().padStart(3, "0"); //pokemon ıd sini stringe cevırıp padstart methoduyla 3basamaklı diyip basamak olmayan yerlere 0 koyduk
  const weight = pokemon.weight; // pokemonların agırlıklarını cektık
  const type = pokemon.types[0].type.name; //pokemonların typelarını cektık
  const color = colors[type]; //yukarıda bahsettiğim herbir pokemonun background color olayını burda optimize ettik

  const pokemonEl = document.createElement("div"); //div olusturup içine bişiler bastık zaten anlarsın burayı
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = `${color}`;
  pokemonEl.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-weight">${weight}kg</p>
        <p class="poke-type">Type: ${type} </p>
    `;
  pokeContainer.appendChild(pokemonEl);
};

searchInput.addEventListener("input", function (e) {
  //ınputa yazdıgımız her bir harfi anlık olarak cekiyoruz
  const pokeNames = document.querySelectorAll(".poke-name"); // bütün pokenamelerını sectık
  const search = searchInput.value.toLowerCase(); //inputa yazılan veriyi kücük harfe cevirdik

  pokeNames.forEach((pokeName) => {
    //pokenames bize array cevirdiği için içinde foreach ile gezdik
    pokeName.parentElement.style.display = `block`; //burda bi ince takılmıştın hatırlarsan. Bunu yazmazsam eğer inputa harf girip sildikten sonra yada şöyle anlatıyım addevent tanımladık ya, her inputa bir şey yazdılgıında bu calıssın dıye, ıste bunu yazmazsam eğer direk asagıda if kosuluna bakıyor tekrar bunu calıstırmıyor yanı, halbukı benım sıtedıgım her harf gırımınde butun dısplaylar block olsun diyorum aşağıdada bunu kısıtlamaya gidiyorum 
    // console.log(pokeName.parentElement);

    if (!pokeName.innerHTML.toLocaleLowerCase().includes(search)) {
      //inputa yazdıgımız harf pokename de yoksa display ını none yaptık
      pokeName.parentElement.style.display = `none`;
    }
  });

  // if(pokeName.includes(search)){}
});

initPokemon();
