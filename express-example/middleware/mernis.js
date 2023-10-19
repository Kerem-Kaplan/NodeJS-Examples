const soap = require("strong-soap").soap;
const url = "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL";
const sikayetciModel = require("../models/users/sikayetciModel");
const bcrypt = require("bcrypt");
const database = require("./database");

const mernisDogrula = async (req, res) => {
  await database.connect();
  const requestArgs = {
    TCKimlikNo: req.body.tcveyapasaport,
    Ad: req.body.isim,
    Soyad: req.body.soyisim,
    DogumYili: req.body.dogumTarihi,
  };

  const options = {};

  await soap.createClient(url, options, function (err, client) {
    const method = client["TCKimlikNoDogrula"];
    method(requestArgs, async function (err, result, envelope, soapHeader) {
      console.log(result.TCKimlikNoDogrulaResult);
      if (result.TCKimlikNoDogrulaResult === false) {
        res.status(500).json({ message: "Böyle bir kişi yok" });
        database.close();
      }
      if (result.TCKimlikNoDogrulaResult === true) {
        const saltRounds = 10; // Salt tur sayısı
        const hashedPassword = await bcrypt.hash(req.body.sifre, saltRounds);

        const sikayetci = new sikayetciModel({
          isim: req.body.isim,
          soyisim: req.body.soyisim,
          cinsiyet: req.body.cinsiyet,
          dogumTarihi: req.body.dogumTarihi,
          uyruk: req.body.uyruk,
          tcveyapasaport: req.body.tcveyapasaport,
          email: req.body.email,
          sifre: hashedPassword,
          telefonNo: req.body.telefonNo,
          rol: req.body.rol,
        });

        const result = await sikayetci.save();
        if (result) {
          res.status(201).json({ message: "Şikayetçi başarıyla kaydedildi" });
          database.close();
        }
      }
      return result.TCKimlikNoDogrulaResult;
    });
  });
};

module.exports = mernisDogrula;
