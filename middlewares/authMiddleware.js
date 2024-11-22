const jwt = require("jsonwebtoken");

// Xác thực token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token sau 'Bearer'
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác minh token
    req.user = decoded; // Lưu thông tin user từ token vào req
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" }); // Token không hợp lệ
  }
};

// Phân quyền cho admin hoặc chính user đó
const authorizeAdminOrSelf = (req, res, next) => {
  const userId = req.user.id; // ID của user từ token
  const isAdmin = req.user.role === "admin"; // Kiểm tra vai trò admin

  // Kiểm tra nếu là admin hoặc chính user đang yêu cầu
  if (isAdmin || userId === req.params.id) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Access denied. Admin or the user only." });
};

module.exports = { authenticate, authorizeAdminOrSelf };
