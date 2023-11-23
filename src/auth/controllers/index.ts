import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { Now } from "../../utils";
import setlog from "../../utils/setlog";
import config from "../../../config.json";
import { toChecksumAddress } from "../../utils/blockchain";
import authDatas from "../data-access";
import authService from "../services";
import bcrypt, { hash } from "bcrypt";

const authController = {
	// This function is for signing up a new user.
	signup: async (req: Request, res: Response) => {
		try {
			const { username, email, password, address, sign } = req.body;


			// service
			const existsMail = await authService.checkExistOfAccount({ username, password, email, address });
			if (existsMail.res === true) {
				throw new Error(`${existsMail.param} is already exist!`);
			};

			// service
			// if (!authService.verifySignature({ sig: sign, address: address })) {
			// 	throw new Error("invalid signature")
			// };

			// data access
			await authDatas.AuthDB.create({
				username: username,
				email: email,
				password: await bcrypt.hash(password, 10),
				address: toChecksumAddress(address),
				created: Now(),
				lasttime: Now(),
			});
			console.log("username", username)
			return res.status(200).json({ message: "success" });
		} catch (err) {
			setlog("request", err);
			return res.status(200).send({ message: err.message || "internal error" });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			if (req.body && req.body.username && req.body.password) {
				const data = await authDatas.AuthDB.find({ filter: { username: req.body.username } });
				if (data.length > 0) {
					bcrypt.compare(req.body.password, data[0].password, (err, result) => {
						if (err) {
							console.log(err)
						}
						if (result) {
							res.status(200).json({ message: 'Login successfully' });
							console.log('password match')
						} else {
							res.status(400).json({
								errorMessage: 'password not match',
								status: false
							});
							console.log('password not match')
						}
					})
				} else {
					res.status(400).json({
						errorMessage: 'Username is not exist',
						status: false
					});
				}

			} else {
				res.status(400).json({
					errorMessage: 'Add proper parameter first!',
					status: false
				});
			}

		} catch (err) {
			setlog("request", err);
			res.status(200).send({ message: "internal error" });
		}
	},
	middleware: (req: any, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization || "";
			jwt.verify(
				token,
				config.JWT_SECRET,
				async (err: any, userData: any) => {
					if (err) return res.sendStatus(403);
					const user = await authDatas.AuthDB.find({
						filter: {
							email: userData.email
						},
					});
					if (user.length == 0) return res.sendStatus(403);
					req.user = {
						name: userData.name,
						email: userData.email,
						password: userData.password
					};
					authDatas.AuthDB.update({
						filter: {
							email: userData.email
						},
						update: {
							lasttime: Now()
						}
					});
					next();
				}
			);
		} catch (err: any) {
			if (err) return res.sendStatus(403);
		}
	}
}

export default authController;

function checkUserAndGenerateToken(data, req, res) {
	jwt.sign({ username: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
		if (err) {
			res.status(400).json({
				status: false,
				errorMessage: err,
			});
		} else {
			res.json({
				message: 'Login Successfully.',
				token: token,
				status: true
			});
		}
	});
}
