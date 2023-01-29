export const SUPPLIER_USER_1 = {
  email: 'admin_supplier_1@gmail.com',
  firstName: 'John',
  lastName: 'Admin',
  password: 'ShopplyAdmin',
};

export const SUPPLIER_USER_2 = {
  email: 'admin_supplier_2@gmail.com',
  firstName: 'Bob',
  lastName: 'Admin',
  password: 'ShopplyAdmin',
};

export const SUPPLIERS = [
  {
    tradingName: 'Fashion Supply Co',
    corporateEntity: 'Fashion Supply Co Pty Ltd',
    address: {
      line1: '1 Good Street',
      line2: '',
      suburb: 'A Suburb',
      state: 'NSW',
    },
    emailAddress: 'admin_supplier_1@gmail.com',
    phoneNumber: '0412345678',
    abn: '12345678901',
    status: 'Active',
    user: SUPPLIER_USER_1,
    categories: [
      {
        apiId: 1,
        name: 'Clothes',
        slug: 'clothes',
        image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=3912',
      },
      {
        apiId: 4,
        name: 'Shoes',
        slug: 'shoes',
        image: 'https://api.lorem.space/image/shoes?w=640&h=480&r=9199',
      },
    ],
    logo: 'https://api.lorem.space/image/fashion?w=640&h=480&r=3912',
  },
  {
    tradingName: 'Tech Supply Co',
    corporateEntity: 'Tech Supply Co Pty Ltd',
    address: {
      line1: '1 Nice Street',
      line2: '',
      suburb: 'B Suburb',
      state: 'NSW',
    },
    emailAddress: 'admin_supplier_1@gmail.com',
    phoneNumber: '0412345678',
    abn: '12345678901',
    status: 'Active',
    user: SUPPLIER_USER_2,
    categories: [
      {
        apiId: 2,
        name: 'Electronics',
        slug: 'electronics',
        image: 'https://api.lorem.space/image/watch?w=640&h=480&r=2738',
      },
      {
        apiId: 3,
        name: 'Furniture',
        slug: 'furniture',
        image: 'https://api.lorem.space/image/furniture?w=640&h=480&r=4602',
      },
    ],
    logo: 'https://api.lorem.space/image/watch?w=640&h=480&r=2738',
  },
];
