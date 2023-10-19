const mongoose = require("mongoose");

class connectToDatabase {
  constructor() {
    this.url = process.env.DATABASE_URI;
  }
  async connect() {
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB bağlantısı başarılı");
    } catch (err) {
      console.error("MongoDB bağlantısı hatası:", err);
    }
  }

  async close() {
    await mongoose.connection.close();
    console.log("MongoDB bağlantısı kapatıldı");
  }
}

module.exports = new connectToDatabase();
