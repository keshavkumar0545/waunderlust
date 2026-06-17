const mongoose = require("mongoose");
const Listing = require("./listing.js");
const { data } = require("./data.js");

main()
  .then(() => {
    console.log("mongoose connected");
    initDB();
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://kc3083033_db_user:Ie9w6ZriYNpAcw7o@cluster0.gdxprvz.mongodb.net/?appName=Cluster0");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const ownerId = new mongoose.Types.ObjectId(
    "6a32bf5a3d293e58829c92ec"
  );

  const updatedData = data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));

  await Listing.insertMany(updatedData);

  console.log("Data saved successfully");
  mongoose.connection.close();
};