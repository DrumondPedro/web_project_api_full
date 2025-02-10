const cards = require("express").Router();

const cardsData = [
  {
    likes: [
      {
        name: "Tim Berners-Lee",
        about: "Inventor, scientist",
        avatar:
          "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
        _id: "d285e3dceed844f902650f40",
      },
    ],
    _id: "5d208fb50fdbbf001ffdf72a",
    name: "White Sulphur Springs, WV",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/2008-0831-TheGreenbrier-North.jpg/1024px-2008-0831-TheGreenbrier-North.jpg",
    owner: {
      name: "Katherine Johnson",
      about: "Mathematician",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
      _id: "8340d0ec33270a25f2413b69",
    },
    createdAt: "2019-07-06T12:10:29.149Z",
  },
  {
    likes: [
      {
        name: "Katherine Johnson",
        about: "Mathematician",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
        _id: "8340d0ec33270a25f2413b69",
      },
      {
        name: "Tim Berners-Lee",
        about: "Inventor, scientist",
        avatar:
          "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
        _id: "d285e3dceed844f902650f40",
      },
      {
        name: "Ada Lovelace",
        about: "Mathematician, writer",
        avatar:
          "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
        _id: "dbfe53c3c4d568240378b0c6",
      },
    ],
    _id: "5d208fe20fdbbf001ffdf72b",
    name: "West Virginia State University",
    link: "https://upload.wikimedia.org/wikipedia/en/4/42/West_Virginia_State_University_seal.png",
    owner: {
      name: "Katherine Johnson",
      about: "Mathematician",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
      _id: "8340d0ec33270a25f2413b69",
    },
    createdAt: "2019-07-06T12:11:14.149Z",
  },
];

const sendAllCards = (req, res, next) => {
  res.send(cardsData);
};

cards.get("/cards", sendAllCards);

module.exports = cards;
