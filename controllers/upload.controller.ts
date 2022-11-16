import bluebird from 'bluebird'
import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import Formidable from 'formidable'
import fs from 'fs'
import path from 'path'
const asyncFs = bluebird.promisifyAll(fs)
const { join } = path

//configurar cloudinary
cloudinary.config({
	cloud_name: 'dntepcqvn', //reemplazar con sus credenciales
	api_key: '472924267197892',
	api_secret: 'c8ba8y9svKoABhyLPxvd5WfpzUw'
})

// Returns true if successful or false otherwise
async function checkCreateUploadsFolder(uploadsFolder: string) {
	try {
		await asyncFs.statAsync(uploadsFolder, {})
	}
	catch (e: any) {
		if (e && e.code == 'ENOENT') {
			console.log('The uploads folder doesn\'t exist, creating a new one...')
			try {
				await asyncFs.mkdirAsync(uploadsFolder)
			}
			catch (err) {
				console.log('Error creating the uploads folder 1')
				return false
			}
		}
		else {
			console.log('Error creating the uploads folder 2')
			return false
		}
	}
	return true
}

// Returns true or false depending on whether the file is an accepted type
function checkAcceptedExtensions(file: Formidable.File) {
	const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'webp']
	if(file.type === null) throw new Error("File type is null")
	const type = file.type.split('/').pop()

	if(type === undefined) throw new Error("File type is undefined")
	if (accepted.indexOf(type) == -1) {
		return false
	}
	return true
}

export async function uploadFiles (req: Request, res: Response) {
	const uploadsFolder = process.env.UPLOAD_DIR
	if(!uploadsFolder) throw new Error("Es necesario configurar en .env UPLOAD_DIR")
	const form = new Formidable.IncomingForm({
		multiples: true,
		uploadDir: uploadsFolder,
		maxFileSize: 50 * 1024 * 1024, // 50 MB
	});

	const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)

	try {
		if (!folderCreationResult) {
			throw new Error("The uploads folder couldn't be created")
		}
		form.parse(req, async (err, _fields, files) => {
			let myUploadedFiles = []
			if (err) {
				throw new Error('Error passing the incoming form')
			}
			// If we are sending only one file:
			if (!(files.files instanceof Array)) {
				const file = files.files
				if (!checkAcceptedExtensions(file)) {
					throw new Error('The sent file is not a valid type')
				}
				if(file.name === null) throw new Error("File name is null")
				const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
				myUploadedFiles.push(fileName)
				try {
					await asyncFs.renameAsync(file.path, join(uploadsFolder, fileName))
				} catch (e) {
					try { await asyncFs.unlinkAsync(file.path) } catch (e) { throw e }
					throw new Error('Error uploading the file')
				}
			} else {
				for (let i = 0; i < files.files.length; i++) {
					const file = files.files[i]
					if (!checkAcceptedExtensions(file)) {
						throw new Error('The sent file is not a valid type')
					}
					if(file.name === null) throw new Error("File name is null")
					const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
					myUploadedFiles.push(fileName)
					try {
						await asyncFs.renameAsync(file.path, join(uploadsFolder, fileName))
					} catch (e) {
						try { await asyncFs.unlinkAsync(file.path) } catch (e) { throw e }
						throw new Error('Error uploading the file')
					}
				}
			}
			const imagenCloudinary = process.env.UPLOAD_DIR + myUploadedFiles[0];
			cloudinary.uploader.upload(imagenCloudinary, function (result) {
				res.json({ ok: true, msg: 'Files uploaded succesfully!', url: result?.url });
			});
		})

	} catch (error: any) {
		res.status(400).json({ ok: false, msg: error.message })
	}

}

export async function uploadAvatar (req: Request, res: Response, _next: NextFunction) {
	const uploadsFolder = process.env.UPLOAD_DIR
	const form = new Formidable.IncomingForm({
		multiples: true,
		uploadDir: uploadsFolder,
		maxFileSize: 50 * 1024 * 1024, // 50 MB
	})

	try {
		if(!uploadsFolder) throw new Error("There is no uploads folder path")
		const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
		if (!folderCreationResult) {
			throw new Error("The uploads folder couldn't be created")
		}
		form.parse(req, async (err, _fields, files) => {
			const myUploadedFiles = []
			if (err) {
				throw new Error('Error passing the incoming form')
			}
			// If we are sending only one file:
			if (!(files.files instanceof Array)) {
				const file = files.files
				if (!checkAcceptedExtensions(file)) {
					throw new Error('The sent file is not a valid type')
				}
				if(file.name === null) throw new Error("File name can't be null")
				const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
				myUploadedFiles.push(fileName)
				try {
					await asyncFs.renameAsync(file.path, join(uploadsFolder, fileName))
				} catch (e) {
					try { await asyncFs.unlinkAsync(file.path) } catch (e) { throw e }
					throw new Error('Error uploading the file')
				}
			}

			const imagenCloudinary = process.env.UPLOAD_DIR + myUploadedFiles[0];
			cloudinary.uploader.upload(imagenCloudinary, function (result) {
				console.log("Resultado", result);
				if(!result) throw new Error("Received undefined result")
				res.json({ ok: true, msg: 'Files uploaded succesfully!', url: result.url });
			});
		})

	} catch (error: any) {
		res.status(400).send({ ok: false, message: error.message })
	}
}
