import express from "express"; 
import { nanoid } from "nanoid"; 

const router = express.Router(); 

const idLength = 7; 

// GET all drinks 
router.get("/", (req, res) => {
  res.send(req.app.db.data.drinks);
});

// GET single drink 
router.get("/:id", (req, res) => {
  let found = req.app.db.data.drinks.find(drink => drink.id == req.params.id); 

  res.send(found); 
}); 

// POST single drink 
router.post("/", (req, res) => {
  let drink = {}; 
  
  drink.id = nanoid(idLength), 
  drink.name = req.body.name; 
  drink.category = req.body.category; 
  drink.price = req.body.price;
  drink.url = req.body.url;
  
  req.app.db.data.drinks.push(drink);

  req.app.db.write();

  res.send(drink.id);
}); 

// PUT single drink 
router.put("/:id", (req, res) => {
  let found = req.app.db.data.drinks.find(drink => drink.id == req.params.id); 
  let propToUpdate = Object.keys(req.body)[0]; 

  if(found && propToUpdate) {
    found[propToUpdate] = req.body[propToUpdate]; 
  }

  req.app.db.write(); 

   res.send(found);
})

// DELETE single drink 
router.delete("/:id", (req, res) => {
  let found = req.app.db.data.drinks.find(drink => drink.id == req.params.id); 
  let index = req.app.db.data.drinks.indexOf(found); 

  if(found && index) {
    req.app.db.data.drinks.splice(index, 1);
  }

  req.app.db.write();

  res.send(found);
});

export { router as drinksRouter }; 