import Anser from "../models/anser.model.js";

// @desc    Create new Anser
// @route   POST /api/anser
export const createAnser = async (req, res) => {
  try {
    const {
      name,
      mobile,
      badgeNo,
      badgeType,
      idNo,
      codeNo,
      fatherName,
      motherName,
      addedByName,
      addedByEmail,
      userName,
      userEmail,
    } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "অনুগ্রহ করে আনসারের নাম প্রদান করুন",
      });
    }

    if (!badgeNo || !badgeNo.trim()) {
      return res.status(400).json({
        success: false,
        message: "অনুগ্রহ করে ব্যাজ নম্বর প্রদান করুন",
      });
    }

    // Create record in 'anser' collection
    const newAnser = await Anser.create({
      name: name.trim(),
      mobile: mobile?.trim() || "",
      badgeNo: badgeNo.trim(),
      badgeType: badgeType?.trim() || "লাল",
      idNo: idNo?.trim() || "",
      codeNo: codeNo?.trim() || "",
      fatherName: fatherName?.trim() || "",
      motherName: motherName?.trim() || "",
      addedByName: (addedByName || userName || "")?.trim(),
      addedByEmail: (addedByEmail || userEmail || "")?.trim(),
    });

    res.status(201).json({
      success: true,
      message: "আনসার সফলভাবে ডাটাবেজে সংরক্ষণ করা হয়েছে",
      data: newAnser,
    });
  } catch (error) {
    console.error("Error creating anser:", error);
    res.status(500).json({
      success: false,
      message: "আনসার তথ্য সংরক্ষণ করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Get all Ansers (supports ?email= or ?addedByEmail=)
// @route   GET /api/anser
export const getAllAnser = async (req, res) => {
  try {
    const { email, addedByEmail } = req.query;
    const filterEmail = email || addedByEmail;
    const query = filterEmail ? { addedByEmail: filterEmail.trim() } : {};

    const anserList = await Anser.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: anserList.length,
      data: anserList,
    });
  } catch (error) {
    console.error("Error fetching anser list:", error);
    res.status(500).json({
      success: false,
      message: "আনসারদের তালিকা লোড করতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Get single Anser by ID
// @route   GET /api/anser/:id
export const getAnserById = async (req, res) => {
  try {
    const anser = await Anser.findById(req.params.id);

    if (!anser) {
      return res.status(404).json({
        success: false,
        message: "আনসার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      data: anser,
    });
  } catch (error) {
    console.error("Error fetching anser:", error);
    res.status(500).json({
      success: false,
      message: "আনসারের তথ্য আনতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Update Anser
// @route   PUT /api/anser/:id
export const updateAnser = async (req, res) => {
  try {
    const updatedAnser = await Anser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAnser) {
      return res.status(404).json({
        success: false,
        message: "আনসার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      message: "আনসার তথ্য সফলভাবে আপডেট করা হয়েছে",
      data: updatedAnser,
    });
  } catch (error) {
    console.error("Error updating anser:", error);
    res.status(500).json({
      success: false,
      message: "তথ্য আপডেট করতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Delete Anser
// @route   DELETE /api/anser/:id
export const deleteAnser = async (req, res) => {
  try {
    const anser = await Anser.findByIdAndDelete(req.params.id);

    if (!anser) {
      return res.status(404).json({
        success: false,
        message: "আনসার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      message: "আনসার সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error("Error deleting anser:", error);
    res.status(500).json({
      success: false,
      message: "আনসার মুছতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

