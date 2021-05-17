const db = require("../models");
const Post_data = db.students_data;

const fs = require("fs");
const csv = require("fast-csv");

const readXlsxFile = require('read-excel-file/node');
const { debug } = require("console");

baseUrl = 'http://localhost:8080/api/csv/getInfo/';

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let post_data = [];
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    if (req.file.mimetype.includes('csv') ||
    req.file.mimetype.includes("vnd.ms-excel")
    ) {

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          post_data.push(row);
        })
        .on("end", () => {
          Post_data.bulkCreate(post_data)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              fs.unlinkSync(path)
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    }
    else if (req.file.mimetype.includes("excel") ||
    req.file.mimetype.includes("spreadsheetml")
    ) {

      readXlsxFile(path).then((rows)=>{
                
        rows.shift();
        let post_data = [];
        rows.forEach((row) => {
            //console.log(row)
            let posts = {
              Date_Text: row[0],
              Language: row[1],
              Post_Type: row[2],
              Publisher: row[3],
              Title: row[4],
              Category: row[5],
              Description: row[6],
              mediaType: row[7],
              Viewes: row[8],
              Reads: row[9],
              Likes: row[10],
              Comments: row[11],
              Shares: row[12],

            };
            post_data.push(posts);
        });
        //console.log(post_data)
        Post_data.bulkCreate(post_data).then(
            ()=>{
                res.status(200).send({
                    message: 'Excel Uploaded Successfully!  '+ req.file.originalname
                });
            }
        ).catch(
            (error)=>{
              fs.unlinkSync(path)
                res.status(500).send({
                    message: 'Failed to upload excel!  ' + req.file.originalname,
                    error: error.message
                });
            } 
        );

    })
    }
  } catch (error) {
    //console.log(error);
    fs.unlinkSync(path);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getPost = (req, res) => {
  Post_data.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts.",
      });
    });
};

const getUrl = (req,res) =>{
  let path = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(path, function(error , excel){
      if(error){
          res.status(500).send({
              message: "Unable to get excel!",
          });
      }

      let excelInfos = [];

      if(excel)
      {
          excel.forEach((file) =>{
            excelInfos.push({
              name: file,
              url: baseUrl + file
           });
          });
          res.status(200).send(excelInfos);
      }
  });
};

const download = (req,res) =>{
  const fileName = req.params.name;
  const path = __basedir + "/resources/static/assets/uploads/";

  res.download(path + fileName, fileName, (error)=>{
      if(error){
          res.status(500).send({
              message: "Unable to Download the Excel!" + error,
          });
      }
  });
};

module.exports = {
  upload,
  getPost,
  getUrl,
  download
};