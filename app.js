
  import express from "express"
import helmet from "helmet"
import cors from 'cors'
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import quizRoutes from "./routes/quiz.routes.js"
import courseRoutes from "./routes/course.routes.js"
dotenv.config({ path: './.env', });
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 4000;
  
const mongoURI = 'mongodb+srv://rohit:bro@cluster0.jpx0qjg.mongodb.net/brandit2?retryWrites=true&w=majority';

connectDB(mongoURI);
  
const app = express();
  
                                
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(morgan('dev'))
    
  
  app.get('/', (req, res) => {
     res.send('Hello, World!');
  });
  
  // your routes here
  app.use("/api/quizzes", quizRoutes);
  app.use("/api/course", courseRoutes);
    
  // app.get("*", (req, res) => {
  //   res.status(404).json({
  //     success: false,
  //     message: "Page not found",
  //   });
  // });
  
  
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  