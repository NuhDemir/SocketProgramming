const exp = require("constants");
const express = require("express");
const app = express();

//static fonksiyonunu kullanarak bir dizin altındaki dosyaları tarayıcıda görüntüleme
app.use(express.static("public"));

app.get("/", (req, res) => {
  //Tarayıcıda public dizini altındaki dosyaları görüntüleme
  res.send("public dizini altındaki dosyaları görüntüleyin");
});

app.listen(3000, () => {
  console.log("Sunucu başlatıldı!");
});
