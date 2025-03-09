import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.header("Authorization")?.split(" ")[1]; // ✅ Support both

    console.log("🔹 Received Token:", token); // ✅ Debugging

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log("✅ Token Verified:", decode); // ✅ Log decoded token

    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

export default isAuthenticated;
