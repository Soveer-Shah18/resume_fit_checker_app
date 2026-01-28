

const health = (req,res)=>{
    try{
        res.status(200).json({
            status: "OK",
            message: "Server is Running"
        })

    }
    catch(err){
        res.status(500).json(
            {
                status: "ERROR",
                message: err.message
            }
        )
    }
}

module.exports = health;