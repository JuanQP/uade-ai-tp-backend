import { Request, Response } from "express";
import * as UserService from '../services/user.service';
import { UserData } from '../types';

function isUserData(object: any): object is UserData {
  return 'firstName' in object
    && 'lastName' in object
    && 'email' in object
    && 'password' in object
}

// Async Controller function to get the To do List
export async function getUsers(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  try {
    const Users = await UserService.getUsers({}, page, limit)
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getActualUser(req: Request, res: Response) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  try {
    if(!req.userId) throw new Error("No user ID provided")
    const User = await UserService.getUserById(req.userId);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: User, message: "Succesfully User Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getUserById(req: Request, res: Response) {
  // Check the existence of the query parameters, If doesn't exists assign a default value
  const filtro = req.params.id;
  try {
    const User = await UserService.getUserById(filtro);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: User, message: "Succesfully User Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getUsersByMail(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  let filtro = { email: req.body.email }
  try {
    const Users = await UserService.getUsers(filtro, page, limit)
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function createUser(req: Request, res: Response) {
  // Req.Body contains the form submit values.
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }
    if(!isUserData(newUser)) throw new Error("Missing fields for User")
    // Calling the Service function with the new object from the Request Body
    const createdUser = await UserService.createUser(newUser)
    return res.status(201).json({ createdUser, message: "Succesfully Created User" })
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

export async function updateUser(req: Request, res: Response) {

  // Id is necessary for the update
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "ID must be present" })
  }

  const user = {
    ...req.body,
  }
  try {
    const updatedUser = await UserService.updateUser(user)
    return res.status(200).json({ status: 200, data: updatedUser, message: "Usuario modificado." })
  } catch (e: any) {
    return res.status(400).json({ status: 400., message: e.message })
  }
}

export async function updateActualUser(req: Request, res: Response) {

  try {
    const updatedUser = await UserService.updateUser({
      _id: req.userId,
      ...req.body,
    })
    return res.status(200).json({ status: 200, data: updatedUser, message: "Usuario modificado." })
  } catch (e: any) {
    return res.status(400).json({ status: 400., message: e.message })
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.status(200).send("Succesfully Deleted... ");
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message })
  }
}

export async function removeUsers(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const ids = req.body.ids;
  try {
    const results = await UserService.deleteUsersById(ids);
    const message = results.deletedCount === 1 ? `Se borró 1 usuario` : `Se borraron ${results.deletedCount} usuarios`;
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: results,
      message,
    });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}


export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    if(typeof email !== "string" || typeof password !== "string")
      throw new Error("Invalid credentials")
    // Calling the Service function with the new object from the Request Body
    const loginUser = await UserService.loginUser({ email, password });
    return res.status(200).json({ loginUser, message: "Succesfully login" })
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: "Invalid username or password" })
  }
}
