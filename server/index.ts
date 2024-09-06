import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
