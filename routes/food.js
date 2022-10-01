import express from "express"; 
import { nanoid } from "nanoid"; 

const router = express.Router(); 

const idLength = 7; 

// GET all food 
router.get("/", (req, res) => {
  res.send(req.app.db.data.food);
});

// GET single food 
router.get("/:id", (req, res) => {
  let found = req.app.db.data.food.find(food => food.id == req.params.id); 

  res.send(found); 
}); 

// POST single food 
router.post("/", (req, res) => {
  let food = {}; 
  
  food.id = nanoid(idLength), 
  food.name = req.body.name; 
  food.category = req.body.category; 
  food.price = req.body.price;
  food.url = req.body.url;
  
  req.app.db.data.food.push(food);

  req.app.db.write();

  res.send(food.id);
}); 

// PUT single food 
router.put("/:id", (req, res) => {
  let found = req.app.db.data.food.find(food => food.id == req.params.id); 
  let propToUpdate = Object.keys(req.body)[0]; 

  if(found && propToUpdate) {
    found[propToUpdate] = req.body[propToUpdate]; 
  }

  req.app.db.write(); 

   res.send(found);
})

// DELETE single food 
router.delete("/:id", (req, res) => {
  let found = req.app.db.data.food.find(food => food.id == req.params.id); 
  let index = req.app.db.data.food.indexOf(found); 

  if(found && index) {
    req.app.db.data.food.splice(index, 1);
  }

  req.app.db.write();

  res.send(found);
});

export { router as foodRouter }; 