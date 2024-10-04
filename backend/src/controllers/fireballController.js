const fireballService = require("../services/fireballService");

exports.getExample = async (req, res) => {
  try {
    const data = await fireballService.getCachedData();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error in getExample:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
