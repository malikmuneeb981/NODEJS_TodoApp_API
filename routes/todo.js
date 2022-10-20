const express = require("express");

const Todo = require("../models/Todo");
const router = express.Router();

const auth = require("../middleware/user_jwt");

router.delete("/:id", async (req, res, next) => {
  const findtodotodel = await Todo.findById(req.params.id);
  if (!findtodotodel) {
    return res.status(400).json({
      msg: "Todo Not Found",
      success: false,
    });
  } else {
    const deltodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deltodo) {
      return res.status(200).json({
        msg: "Something Went Wong",
        success: false,
      });
    } else {
      return res.status(200).json({
        msg: "Todo Deleted Successfully",
        success: true,
      });
    }
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const toDo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
    });

    if (!toDo) {
      return res.status(400).json({
        success: false,
        msg: "Something Went Wrong ",
        todo: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Created Successfully",
        todo: toDo,
      });
    }
  } catch (error) {
    console.log(req.user);
    next();
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id, finished: false });

    if (!todos) {
      return res.status(400).json({
        msg: "Something Went Wrong",
        success: false,
        todos: null,
      });
    } else {
      return res.status(200).json({
        msg: "Successfully Retrieved",
        success: true,
        todos: todos,
      });
    }
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get('/finished',auth,async(req,res,next)=>{
  try {
    const finishedtodos=await Todo.find({user:req.user.id,finished:true})
    if(!finishedtodos)
    {
      return res.status(400).json({
        msg:"Todo Not Found",
        success:false,
        todos:null
      })
    }
    else
    {
      return res.status(200).json({
        msg:"Todo Found",
        success:true,
        todos:finishedtodos
      })
    }
    
  } catch (error) {
    console.log(error);
    next()
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const istodo = await Todo.findById(req.params.id);
    if (!istodo) {
      return res.status(400).json({
        msg: "Todo Not Found",
        success: false,
        todo: null,
      });
    } else {
      const updatetodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatetodo) {
        return res.status(400).json({
          msg: "Something went wrong",
          success: false,
          todo: null,
        });
      } else {
        return res.status(200).json({
          msg: "Todo Successfully Updated",
          success: true,
          todo: updatetodo,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
