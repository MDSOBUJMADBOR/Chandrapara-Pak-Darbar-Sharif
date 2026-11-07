import User from "../models/user.model.js";

// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "ইউজারদের তথ্য লোড করতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Update user profile (name, image)
// @route   PUT /api/users/:id
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updateData = {};
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "নাম খালি রাখা যাবে না",
        });
      }
      updateData.name = name.trim();
    }
    if (image !== undefined) {
      updateData.image = image?.trim() || null;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "আপডেট করার জন্য তথ্য প্রদান করুন",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "ইউজার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      message: "প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "প্রোফাইল আপডেট করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Update user role
// @route   PATCH /api/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "groupleader", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "সঠিক রোল নির্বাচন করুন (admin, groupleader, user)",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "ইউজার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      message: "রোল সফলভাবে পরিবর্তন করা হয়েছে",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      message: "রোল পরিবর্তন করতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "ইউজার পাওয়া যায়নি",
      });
    }

    res.status(200).json({
      success: true,
      message: "ইউজার সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "ইউজার মুছতে ব্যর্থ হয়েছে",
      error: error.message,
    });
  }
};

