const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iaqupfb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorize access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}
async function run() {
  try {
    await client.connect();
    const serviceCollection = client
      .db("Doctors_portals")
      .collection("services");
    const bookingsCollection = client
      .db("Doctors_portals")
      .collection("bookings");
    const usersCollection = client.db("Doctors_portals").collection("users");
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/user',verifyJWT, async (req,res)=>{
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    app.get('/admin/:email', async(req,res)=>{
      const email=req.params.email;
      const user=await usersCollection.findOne({email:email});
      const isAdmin = user.role;
      res.send({admin:isAdmin});
    })

    app.put("/user/admin/:email",verifyJWT, async (req, res) => {
      const email = req.params.email;
      const requester = req.decoded.email;
      const requestAccount = await usersCollection.findOne({
        email: requester
      });
      if (requestAccount.role === "admin") {
        const filter = { email: email };
        const updateDoc = {
          $set: { role: "admin" },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
      else{
        res.status(403).send({message:'forbidden'});
      }
    });

    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send({ result, token });
    });
    app.get("/available", async (req, res) => {
      const date = req.query.date;
      //step 1: get all services
      const services = await serviceCollection.find().toArray();
      //step 2: get the booking of the day
      const query = { date: date };
      const bookings = await bookingsCollection.find(query).toArray();
      //step 3: for each service , find booking for the service
      services.forEach((service) => {
        const serviceBookings = bookings.filter(
          (b) => b.treatment === service.name
        );
        const booked = serviceBookings.map((s) => s.slot);
        const available = service.slots.filter((s) => !booked.includes(s));
        service.slots = available;
      });

      res.send(services);
    });

    app.get("/bookings", verifyJWT, async (req, res) => {
      const patient = req.query.patient;
      const authorization = req.headers.authorization;
      const decodedEmail = req.decoded.email;
      if (patient === decodedEmail) {
        const query = { patient: patient };
        const bookings = await bookingsCollection.find(query).toArray();
        return res.send(bookings);
      }
      else{
        return res.status(403).send({message:'Forbidden Access'});
      }
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const query = {
        treatment: booking.treatment,
        date: booking.date,
        patient: booking.patient,
      };
      const exists = await bookingsCollection.findOne(query);
      if (exists) {
        return res.send({ success: false, booking: exists });
      }
      const result = await bookingsCollection.insertOne(booking);
      return res.send({ success: true, result });
    });
  } finally {
  }
}
run().catch(console.dir);

console.log(uri);
app.get("/", (req, res) => {
  res.send("Hello Doctor!");
});

app.listen(port, () => {
  console.log(`Doctor App listening on port ${port}`);
});
