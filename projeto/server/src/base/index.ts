import express from "express";
import cors from "cors";
import routing from "../routing";

import {handleZodError} from "./middlewares/handleZodError.middleware";
import {handleCommonError} from "./middlewares/handleCommonError.middleware";

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());


routing(app);

app.use(handleZodError);
app.use(handleCommonError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
