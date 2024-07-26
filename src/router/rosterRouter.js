import express from "express";
import { deleteRosterByID, getRosterBydeptAndDate, getRosterforAllstaff, insertRoster, updateRoster } from "../model/roster/rosterModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await insertRoster(req.body);
    result?._id
      ? res.json({
          status: "succes",
          message: "shift added to the roster",
        })
      : res.json({
          status: "error",
          message: "something went wrong try again later",
        });
  } catch (error) {
    console.log(error);
  }
});

router.get('/',async(req,res)=>{
  try {
    const result = await getRosterforAllstaff()
    result?.length>0 ?
    res.json({
      status:"success",
      result
    })
    :
    res.json({
      status:"error",
      message:"could not fetch data something went wrong or there is not data available"
    })
  } catch (error) {
    console.log(error);
    
  }
})

router.get('/rosterByDate',async(req,res)=>{
  try {
    const department = req.body.department;
    const date = req.body.date;
    const result=await getRosterBydeptAndDate(department,date)
    result?.length>0 ?
    res.json({
      status:"success",
      result
    })
    :
    res.json({
      status:"error",
      message:"could not fetch data something went wrong or there is not data available"
    })
    

  } catch (error) {
    console.log(error);
    
  }

})

router.patch('/', async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "ID is required to update the roster"
      });
    }

    const result = await updateRoster(id, { ...rest });
    

    if (result?._id) {
      return res.json({
        status: "success",
        message: "Roster updated successfully"
      });
    } else {
      return res.status(500).json({
        status: "failed",
        message: "Failed to update roster, try again later"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while updating the roster"
    });
  }
});

router.delete("/", async(req,res)=>{
  try {
    console.log(req.body);
    const {id} = req.body
    console.log("hello");
    console.log(id);
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "ID is required to delete the roster"
      });
    }
    const result = await deleteRosterByID(id)
    console.log(result);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Roster deleted successfully"
      });
    } else {
      return res.status(500).json({
        status: "failed",
        message: "Failed to delete roster, try again later"
      });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while deleting the roster"
    });
    
  }
})

export default router
