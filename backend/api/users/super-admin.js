const UserModel = require("../../model/user");
const bcrypt = require('bcrypt');


async function createSuperAdmin() {
  try {
    // Check if super admin already exists
    const superAdmin = await UserModel.findOne({ role: 'superAdmin' });

    if (superAdmin) {
      // console.log('Super admin already exists');
      return;
    }

    // Super admin details
    const name = "Admin"
    const email = 'admin@gmail.com' 
    const password = 'test@1'
    // const name = process.env.SUPER_ADMIN_NAME
    // const email = process.env.SUPER_ADMIN_EMAIL 
    // const password = process.env.SUPER_ADMIN_PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSuperAdmin = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    await newSuperAdmin.save();

    console.log('Super admin created successfully');
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
}

// Call the function to create super admin

module.exports={
  createSuperAdmin
}