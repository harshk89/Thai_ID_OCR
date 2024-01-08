import Card from "../models/Card.js";
import mongoose from "mongoose";
import detectText from "../visionapi.js";
// import fs from 'fs';

const parseExtractedInfo = (textArray) => {

    //----------extracting identification number---------
    var index = textArray.findIndex(element => /\d/.test(element));
    let idNum = textArray[index] + " " + textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3] + " " + textArray[index+4];
    // console.log("identification number: ", idNum);

    //delete elements of array upto index+4
    textArray.splice(0, index + 5);

    //----------now extracting First Name and Last Name-----------
    var index = textArray.findIndex(element => element==="Name");

    var firstName = "";
    for (index = index + 1; index < textArray.length-1; index++) {
        if (textArray[index] === "Last" && textArray[index + 1] === "name") {
          break; // Stop the loop when "Last name" is encountered
        }
        firstName += textArray[index] + " ";
    }
    firstName = firstName.trim();
    // console.log("first name: ", firstName);

    //now index is at element "Last"
    var lastName = "";
    for (index = index + 2; index < textArray.length; index++) {
        if (textArray[index] === "เกิดวันที่") {
          break; // Stop the loop when "เกิดวันที่" is encountered
        }
        lastName += textArray[index] + " ";
    }
    lastName = lastName.trim();
    // console.log("last name: ", lastName);

    //now index is at element "เกิดวันที่"
    //delete elements of array upto this point so it does not hinder further search
    textArray.splice(0, index+1);

    //------------now extracting Date of Birth-------------
    var index = textArray.findIndex(element => element==="Birth");
    var dob = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    // console.log("Date of Birth: ", dob);

    //------------now extracting Date of Issue-------------
    //date of issue is always present after "วันออกบัตร"
    var index = textArray.findIndex(element => element==="วันออกบัตร");
    var doi = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    // console.log("Date of Issue: ", doi);

    //------------now extracting Date of Expiry-------------
    //date of expiry is always present after "วันบัตรหมดอายุ"
    var index = textArray.findIndex(element => element==="วันบัตรหมดอายุ");
    var doe = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    // console.log("Date of Expiry: ", doe);

    return {
        idNum: idNum,
        fName: firstName,
        lName: lastName,
        dob: dob,
        doi: doi,
        doe: doe
    };
};

class CustomError extends Error {
    constructor(message, statusCode) {
      super();
      this.message = message;
      this.statusCode = statusCode || 500;
    }
}

export const uploadCard = async (req, res) => {

    const { image } = req.body;
    try {
        var extractedText = await detectText(image);

        const textArray = extractedText.split(/\s+/);
        // console.log(textArray);

        if(textArray[0] !== "บัตรประจำตัวประชาชน") {
            throw new CustomError("Invalid Image!, Please upload THAI NATIONAL ID CARD", 406);
        }

        //now parsing the extracted text
        const parsedInfo = parseExtractedInfo(textArray);

        const existingCard = await Card.findOne({ id_num: parsedInfo.idNum });

        if(existingCard) {
            throw new CustomError('Card already exists!', 409);
        }

        //----------saving the parsed info in the database------------

        const card = {
            first_name: parsedInfo.fName,
            last_name: parsedInfo.lName,
            id_num: parsedInfo.idNum,
            dob: parsedInfo.dob,
            doi: parsedInfo.doi,
            doe: parsedInfo.doe,
        };
        // console.log("card", card);

        const newCard = new Card({ ...card });

        try {
            newCard.save();
        } catch (error) {
            throw new CustomError("Could not save card to database!", 500);
        }

        res.status(201).json(newCard);

        // res.status(201).json(parsedInfo);
    } catch (error) {
        res.status(error.statusCode || 500).json(error);
    }
    
}
// const delay = ms => new Promise(res => setTimeout(res, ms));



export const search = async (req, res) => {
    const { idNum, fName, lName, dob, searchType } = req.query;
    
    try {
        // console.log("reached here!!");
        // throw new CustomError("customm error message!!");
        switch(searchType) {
            case "idNum":
                // console.log(idNum);
                var cards = await Card.find({id_num: idNum});
                // console.log(cards);
                res.json({cards});
                break;
            case "name":
                // console.log(fName, lName);
                var cards = await Card.find({
                    first_name: { $regex: new RegExp(fName, 'i') },
                    last_name: { $regex: new RegExp(lName, 'i') }
                  });
                // console.log(cards);
                res.json({cards});
                break;
            case "dob":
                // console.log(dob);
                var cards = await Card.find({ dob: dob });
                // console.log(cards);
                res.json({cards});
                break;
        }
        // console.log("reached here!!");
        // await delay(5000);
        
    } catch (error) {
        console.log(error)
        res.status(409).json(error);
    }
}

export const editRecord = async (req, res) => {
    const data = req.body;

    const newData = {
        first_name: data.fname,
        last_name: data.lname,
        id_num: data.idNum,
        dob: data.dateOfBirth,
        doi: data.dateOfIssue,
        doe: data.dateOfExpiry
    }
    // console.log(data);
    // console.log("reached here");
    try {
        // var card = await Card.findOne({id_num: data.idNum});
        var idNum = data.idNum;
        var result = await Card.updateOne({ id_num: data.idNum }, { $set: newData });
        // console.log("result: ", result);

        if (result.matchedCount == 0) {
            // console.log(`No card found with idNum: ${idNum}`);
            res.json({message: "No record found!"});
        }
        else {
            // console.log(`Card with idNum ${idNum} updated successfully`);
            res.json({message: "Record updated", newRecord: newData});
        }
        
    
        // if(card) {
        //     console.log("hello", card._id);
        //     const updatedRecord = await Card.findByIdAndUpdate(card._id, { ...card, id_num: data.idNum, first_name: data.fname, last_name: data.lname, dob: data.dateOfBirth, doi: data.dateOfIssue, doe: data.dateOfExpiry, _id}, {new: true});
        //     console.log("updated: ", updatedRecord); }

        
        
    } catch (error) {
        res.status(409).json({ error, message: "Something went wrong!"});
    }

}


export const deleteRecord = async (req, res) => {
 
    const { idNum: idNum } = req.params;
    // console.log("reached here", idNum)

    try {
        const result = await Card.deleteOne({ idNum });
        // console.log(result);

        if (result.deletedCount === 0) {
        // console.log(`No card found with idNum: ${idNum}`);
        res.json({message: "No record found!"});
        }
        else {
            // console.log(`Card with idNum ${idNum} deleted successfully`);
            res.json({message: "Record deleted"});
        }
    } catch (error) {
        res.status(409).json({ error, message: "Something went wrong!"});
    }

}
