import express from "express";
import cors from "cors";
import morgan from "morgan";
import session, { SessionOptions } from "express-session";

import "@db";
import config from "@config";
import logger from "@logger";
import router from "@routes";
import { errorHandler } from "@utils/error";

const app = express();
const PORT = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		credentials: true
	})
);
app.use(
	morgan(
		`[:date[iso]] - :method :url :status :response-time ms - :res[content-length] ":user-agent"`
	)
);

const sessionOptions: SessionOptions = {
	secret: config.session_secret,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
};

// @ts-expect-error - There is conflict with @types/express and @types/express-session
// When using the newest version of @types/express there is no error here
// but there is another error with async routes so I'm using the older version that matches the express version
app.use(session(sessionOptions));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});
