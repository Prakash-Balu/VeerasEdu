const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://anwarmydheenk:9YxXSq95uUSInzfd@cluster0.foga8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("sample_mflix"); // Replace "selfPractice" with your database name
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

app.post('/api/addsegment',async (req,res)=>{
  try{
    const db = await connectToMongoDB(); 
    const collection = db.collection("qa");
    const {segmentid,title,nofexercise,video} = req.body;
    const newDocument = {
      segmentid,
      title,
      video,
      nofexercise,
      questions: {},
      exercise: []
    };
    await collection.insertOne(newDocument);
    res.status(201).json({ message: "New document created successfully!", data: newDocument });
  }catch(err){
    console.error(err);
  }
});

app.post("/api/addqa", async (req, res) => {
  try {
    const db = await connectToMongoDB(); // Connect to the database
    const collection = db.collection("qa"); // Replace with your collection name
    
    console.log(req.body);

    let { segmentid, title, video, exercise, question, answers, nofexercise,timeline,rawquestion } = req.body;

    answers.forEach(answer => {
      question = question.replace(answer, `{{}}`);
    });
    // Generate a unique question ID using a 13-digit timestamp
    const questionId = Date.now().toString(); 

    // Create the question structure
    const questionData = {
      exercise,
      question,
      rawquestion,
      answers,
      timeline,
    };

    //Check if a document with the same timestamp already exists
    const existingDoc = await collection.findOne({ segmentid });

    if (existingDoc) {
      // If document with timestamp exists, update it by adding the new question and exercise
      await collection.updateOne(
        { segmentid },
        {
          $set: { 
            title, 
            video, 
            nofexercise: Number(nofexercise), // Convert to number if it's a string
            [`questions.${questionId}`]: questionData,
          },
          $push: {
            exercise: questionId
          }          
        }
      );

      res.status(200).json({ message: "Document updated successfully!" });
    } else {
      // If document doesn't exist, create a new one
      const newDocument = {
        segmentid,
        title,
        video,
        nofexercise: Number(nofexercise), // Convert to number if it's a string
        questions: {
          [questionId]: questionData,
        },
        exercise: [questionId],
      };

      await collection.insertOne(newDocument);

      res.status(201).json({ message: "New document created successfully!", data: newDocument });
    }
  } catch (error) {
    console.error("Error saving exercise:", error);
    res.status(500).json({ message: "Failed to save exercise", error });
  }
});


app.get("/api/getqa", async (req, res) => {
    try {
      const db = await connectToMongoDB(); // Connect to the database
      const collection = db.collection("qa"); // Replace with your collection name
  
      const exercises = await collection.find({}).toArray(); // Fetch all documents from the collection
      console.log(exercises);
      res.status(200).json({
        message: "Exercises retrieved successfully!",
        data: exercises,
      });
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ message: "Failed to fetch exercises", error });
    }
});

app.get("/api/segments", async (req, res) => {
    try {
      const db = await connectToMongoDB(); // Connect to the database
      const collection = db.collection("qa"); // Replace with your collection name
  
      const exercises = await collection.find({}).toArray(); // Fetch all documents from the collection
      
      const segments = exercises.map((item)=>({
        id:item._id,
        segmentid:item.segmentid,
        video:item.video,
        title:item.title,
        nofexercise:item.nofexercise,
      }));
      
      console.log(segments);

      res.status(200).json({
        message: "Exercises retrieved successfully!",
        data: segments,
      });
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ message: "Failed to fetch exercises", error });
    }
});

app.get("/api/getqa/:id", async (req, res) => {
  try {
    const db = await connectToMongoDB(); // Connect to the database
    const collection = db.collection("qa"); // Replace with your collection name

    // Fetch the document by ID
    const exercise = await collection.findOne({ _id: new ObjectId(req.params.id) });

    // Extract video, title, and segmentid
    console.log(exercise);
    const { video, title, segmentid, questions } = exercise;

    // Transform the `questions` object
    const transformedQuestions = Object.entries(questions).map(([index, q]) => {
      let questionText = q.question; // Original question text
      let exercise = q.exercise;
      let timeline = q.timeline;
      let rawquestion = q.rawquestion;

      const answers = [];
      const result = [];

      q.answers.forEach((ans,index) => {
        answers.push('');
        result.push(false);
      });

      // Return the transformed question
      return {
        q_id : index,
        question: questionText,
        rawquestion:rawquestion,
        exercise:exercise,
        timeline: timeline,
        answers:answers,
        result: result,
      };
    });

    // Construct the final transformed data
    const transformedData = {
      video: video || null,
      title: title || null,
      segmentid: segmentid || null,
      questions: transformedQuestions, // Use the transformed `questions` array
    };
    res.status(200).json({
      message: "Exercise retrieved successfully!",
      data: transformedData,
    });
  } catch (error) {
    console.error("Error fetching exercise:", error);
    res.status(500).json({ message: "Failed to fetch exercise", error });
  }
});

app.put("/api/editqa", async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("qa");

    console.log(req.body);

    let { segmentid, qid, answers,timeline,question,exercise,rawquestion,title,video } = req.body;

    answers.forEach(answer => {
      question = question.replace(answer, `{{}}`);
    });

    const updatedQuestionData = {
        exercise:exercise,
        question:question,
        rawquestion:rawquestion,
        answers:answers,
        timeline:timeline,
    }

    const updateResult = await collection.updateOne(
      { segmentid },
      {
        $set: {
          title,
          video,
          [`questions.${qid}`]: {
            ...updatedQuestionData,
          },
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to update question" });
    }

    return res.status(200).json({ message: "Question updated successfully!" });
  } catch (error) {
    console.error("Error editing question:", error);
    return res.status(500).json({ message: "Failed to edit question", error });
  }
});

app.put("/api/check-answer/:id", async (req, res) => {
  try {
    const { qid, blanks } = req.body; // Extract index and answer array from request body

    const db = await connectToMongoDB(); // Connect to the database
    const collection = db.collection("qa"); // Replace with your collection name

    // Fetch the document containing the questions
    const exercise = await collection.findOne({ _id: new ObjectId(req.params.id) });

    // if (!exercise || !exercise.questions || !exercise.questions[index]) {
    //   return res.status(404).json({
    //     message: `Question with index ${index} not found in the database.`,
    //   });
    // }
    console.log(qid);
    // Retrieve the database answer array for the given index
    const dbAnswers = exercise.questions[qid].answers;

    // Compare the first element of the provided answer array with the database answer array
    const result = blanks.map((answer, i) => answer === dbAnswers[i]);
    const video = exercise.questions[qid].timeline;
    // Return the result in the response
    return res.status(200).json({
      message: "Answer comparison completed.",
      result: result, // true or false
      video : video,
    });
  } catch (error) {
    console.error("Error in /api/check-answer:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.post('/api/segment/delete',async (req,res)=>{
  try{
    
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const db = await connectToMongoDB();
    const collection = db.collection("qa");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Segment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Segment not found' });
    }

  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const HOST = '192.168.29.219'; 
const PORT = 3000;
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});