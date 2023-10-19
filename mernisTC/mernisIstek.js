const express = require('express');
const axios = require('axios');
const app = express();
const xml2js = require('xml2js');

app.use(express.json());

app.post('/soap-request', async (req, res) => {
  try {
    const soapRequest = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
            <TCKimlikNo>${req.body.TCKimlikNo}</TCKimlikNo>
            <Ad>${req.body.Ad}</Ad>
            <Soyad>${req.body.Soyad}</Soyad>
            <DogumYili>${req.body.DogumYili}</DogumYili>
          </TCKimlikNoDogrula>
        </soap:Body>
      </soap:Envelope>
    `;

    const response = await axios.post('http://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', soapRequest, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula',
      },
    });

    const responseBody = response.data;
    console.log(response.data)
    // Veriyi işleme işlemlerini burada gerçekleştirin
    xml2js.parseString(responseBody, (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        console.error('XML ayrıştırma hatası:', err);
        res.status(500).json({ error: 'XML ayrıştırma hatası' });
      }
    });
  } catch (error) {
    console.error('SOAP istek hatası:', error);
    res.status(500).json({ error: 'SOAP istek hatası' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});