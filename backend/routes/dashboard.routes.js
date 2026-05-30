const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

// Middlewares for authentication
const { protect, authorize } = require("../middlewares/auth.middleware");

router.get("/booking/overview",protect,
    authorize("owner"),
    dashboardController.overview);


router.get("/booking/:_id",protect,
    authorize("owner"),
    dashboardController.bookingDetail);


router.get("/staff_overview",protect,
    authorize("owner"),
    dashboardController.staff);

router.get("/staff/:staffId",protect,
    authorize("owner"),
    dashboardController.staffDetail);

/*
router.get("/trends",protect,
    authorize("owner"),
    dashboardController.trends);
*/
router.get("/customerInsights",protect,
    authorize("owner"),
    dashboardController.customerInsights);



module.exports = router;
