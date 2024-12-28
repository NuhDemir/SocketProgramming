const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // Anasayfada bir form oluşturun.
  res.send(`
      <form action="/" method="POST">
        <input type="text" name="name" placeholder="İsminiz" />
        <button type="submit">Gönder</button>
      </form>
    `);
});

app.post("/", (req, res) => {
  //Formdan gelen verileri alın
  const name = req.body.name;

  //verileri tarayıcıda görüntüleme
  res.send(`Gönderilen isim :${name}`);
});

app.listen(3000, () => {
  console.log(
    "Sunucu başlatıldı, http://localhost:3000 adresinden erişilebilir."
  );
});
