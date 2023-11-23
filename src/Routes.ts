import express from "express";
import Auth from "./auth";

const Routes = async (router: express.Router) => {

	//user
	router.post("/signup", Auth.controllers.signup);
	router.post("/signin", Auth.controllers.login);

};

export { Routes };