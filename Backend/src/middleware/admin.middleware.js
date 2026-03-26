const adminMiddleware = (req,res,next)=>{
    try {
        //check role 
 if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only"
      });
    }

    //if admins 
    next();

        
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

export default adminMiddleware