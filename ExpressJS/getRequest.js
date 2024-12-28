const express = require("express");

//express objesini oluşturma
const app = express();

//bir route oluşturma
app.get("/", (req, res) => {
  //istekle birlikte gelen query parametrelerimi almak
  const name = req.query.name;

  //istekle birlikte gelen  verileri kullanarak bir cevap dödndürür
  res.send(`Merhaba ${name}`);
});

//express sunucusunu başlat
app.listen(3000, () => {
  console.log("Sunucu http://localhost:3000 adresinde erişilebilr halde");
});
