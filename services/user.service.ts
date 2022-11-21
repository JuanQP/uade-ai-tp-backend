import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User, { UserDocument } from '../models/User.model'
import { User as UserType, UserData } from '../types'

export async function getUsers(query: any, page: number, limit: number) {
  // Options setup for the mongoose paginate
  const options = {
    page,
    limit
  }
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query)
    const Users = await User.paginate(query, options)
    // Return the Userd list that was retured by the mongoose promise
    return Users;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e)
    throw Error('Error while Paginating Users');
  }
}

export async function getUserById(id: string) {
  // Try Catch the awaited promise to handle the error
  try {
    const UserResult = await User.findById(id)
    // Return the Userd list that was retured by the mongoose promise
    return UserResult;

  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e)
    throw Error('Error while getting User');
  }
}

export async function createUser(user: UserData) {
  // Creating a new Mongoose Object by using the new keyword
  const hashedPassword = bcrypt.hashSync(user.password, 8);

  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword,
    address: {
      address1: '',
      province: '',
      city: '',
      zip: 0,
    },
    payment: {
      cardName: `${user.firstName} ${user.lastName}`,
      cardNumber: '',
      expDate: '',
      cvv: 0,
    },
    isAdmin: false,
    avatar: '',
  });

  try {
    if(!process.env.SECRET) throw new Error("No SECRET set in .env file")
    const savedUser = await newUser.save();
    const token = jwt.sign({
      id: savedUser._id
    }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return token;
  } catch (e) {
    throw Error("Error while Creating User")
  }
}

export async function updateUser(user: UserDocument) {
  try {
    //Find the old User Object by the Id
    const id = { _id: user._id };
    const oldUser = await User.findById(id);
    if (!oldUser) {
      throw new Error("User doesn't exist");
    }
    const savedUser = await oldUser.$set({ ...user });
    savedUser.save();
    return savedUser;
  } catch (e) {
    throw Error("Error occured while updating the User")
  }
}

export async function deleteUser(id: string) {

  // Delete the User
  try {
    const deleted = await User.remove({
      _id: id
    })
    if (deleted.n === 0 && deleted.ok === 1) {
      throw Error("User Could not be deleted")
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the User")
  }
}


export async function loginUser(user: Pick<UserType, 'email' | 'password'>) {

  // Creating a new Mongoose Object by using the new keyword
  try {
    // Find the User
    const _details = await User.findOne({
      email: user.email
    });
    if(_details === null)
      throw new Error("Error while login user")
    if(!process.env.SECRET)
      throw new Error("SECRET is not set in .env file")
    const passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) throw Error("Invalid username/password")

    const token = jwt.sign({
      id: _details._id,
      email: _details.email,
      isAdmin: _details.isAdmin,
    }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    return { token: token, user: _details };
  } catch (e) {
    throw Error("Error while Login User")
  }
}

export async function deleteUsersById(ids: string[]) {
  try {
    const UserResult = await User.deleteMany({ '_id': { $in: ids } });
    return UserResult;
  } catch (e) {
    throw Error('Error while retrieving User');
  }
}
