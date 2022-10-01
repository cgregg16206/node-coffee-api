import express from "express"; 
import { nanoid } from "nanoid"; 

const router = express.Router(); 

const idLength = 7; 

// GET all merch 
router.get("/", (req, res) => {
  res.send(req.app.db.data.merch);
});

// GET single merch 
router.get("/:id", (req, res) => {
  let found = req.app.db.data.merch.find(item => item.id == req.params.id); 

  res.send(found); 
}); 

// POST single merch 
router.post("/", (req, res) => {
  let merch = {}; 
  
  merch.id = nanoid(idLength), 
  merch.name = req.body.name; 
  merch.category = req.body.category; 
  merch.price = req.body.price;
  merch.url = req.body.url;
  
  req.app.db.data.merch.push(merch);

  req.app.db.write();

  res.send(merch.id);
}); 

// PUT single merch 
router.put("/:id", (req, res) => {
  let found = req.app.db.data.merch.find(merch => merch.id == req.params.id); 
  let propToUpdate = Object.keys(req.body)[0]; 

  if(found && propToUpdate) {
    found[propToUpdate] = req.body[propToUpdate]; 
  }

  req.app.db.write(); 

   res.send(found);
})

// DELETE single merch 
router.delete("/:id", (req, res) => {
  let found = req.app.db.data.merch.find(merch => merch.id == req.params.id); 
  let index = req.app.db.data.merch.indexOf(found); 

  if(found && index) {
    req.app.db.data.merch.splice(index, 1);
  }

  req.app.db.write();

  res.send(found);
});

export { router as merchRouter }; 