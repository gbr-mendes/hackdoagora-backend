const controller = {}

controller.createUser = async (req, resp) =>{
    resp.status(201).json({success: "User created"})
}

controller.loginUser = async (req, resp) => {
    resp.status(201).json({token: "User token"})
}

controller.logoutUser = async (req, resp) => {
    resp.status(201).json({success: "User logged out"})
}

module.exports = controller