import Card from "../models/Card.js";
import mongoose from "mongoose";
import detectText from "../visionapi.js";
// import fs from 'fs';

const parseExtractedInfo = (textArray) => {

    //----------extracting identification number---------
    var index = textArray.findIndex(element => /\d/.test(element));
    let idNum = textArray[index] + " " + textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3] + " " + textArray[index+4];
    console.log("identification number: ", idNum);

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
    console.log("first name: ", firstName);

    //now index is at element "Last"
    var lastName = "";
    for (index = index + 2; index < textArray.length; index++) {
        if (textArray[index] === "เกิดวันที่") {
          break; // Stop the loop when "เกิดวันที่" is encountered
        }
        lastName += textArray[index] + " ";
    }
    lastName = lastName.trim();
    console.log("last name: ", lastName);

    //now index is at element "เกิดวันที่"
    //delete elements of array upto this point so it does not hinder further search
    textArray.splice(0, index+1);

    //------------now extracting Date of Birth-------------
    var index = textArray.findIndex(element => element==="Birth");
    var dob = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    console.log("Date of Birth: ", dob);

    //------------now extracting Date of Issue-------------
    //date of issue is always present after "วันออกบัตร"
    var index = textArray.findIndex(element => element==="วันออกบัตร");
    var doi = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    console.log("Date of Issue: ", doi);

    //------------now extracting Date of Expiry-------------
    //date of expiry is always present after "วันบัตรหมดอายุ"
    var index = textArray.findIndex(element => element==="วันบัตรหมดอายุ");
    var doe = textArray[index+1] + " " + textArray[index+2] + " " + textArray[index+3];
    console.log("Date of Expiry: ", doe);

    return {
        idNum: idNum,
        fName: firstName,
        lName: lastName,
        dob: dob,
        doi: doi,
        doe: doe
    };
};

export const uploadCard = async (req, res) => {
    // console.log(req.body);
    const { image } = req.body;
    var cardAlreadyExists = false;
    try {
        var extractedText = await detectText(image);

        const textArray = extractedText.split(/\s+/);
        console.log(textArray);

        //now parsing the extracted text
        const parsedInfo = parseExtractedInfo(textArray);

        const existingCard = await Card.findOne({ id_num: parsedInfo.idNum });

        if(existingCard) {
            cardAlreadyExists = true;
            throw new Error('Card already exists');
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
        console.log("card", card);

        const newCard = new Card({ ...card });

        try {
            newCard.save();
        } catch (error) {
            throw error;
        }

        res.status(201).json(newCard);

        // res.status(201).json(parsedInfo);
    } catch (error) {
        if(cardAlreadyExists)
            res.status(409).json({ error, message: "Card already exists!" });
        else
            res.status(409).json({ error, message: "Something went wrong!"});
    }
    
}
// const delay = ms => new Promise(res => setTimeout(res, ms));

export const search = async (req, res) => {
    const { idNum, fName, lName, dob, searchType } = req.query;
    
    try {
        switch(searchType) {
            case "idNum":
                console.log(idNum);
                var cards = await Card.find({id_num: idNum});
                console.log(cards);
                res.json({cards});
                break;
            case "name":
                console.log(fName, lName);
                var cards = await Card.find({
                    first_name: { $regex: new RegExp(fName, 'i') },
                    last_name: { $regex: new RegExp(lName, 'i') }
                  });
                console.log(cards);
                res.json({cards});
                break;
            case "dob":
                console.log(dob);
                var cards = await Card.find({ dob: dob });
                console.log(cards);
                res.json({cards});
                break;
        }
        // console.log("reached here!!");
        // await delay(5000);
        
    } catch (error) {
        res.status(409).json({ error, message: "Something went wrong!"});
    }
}

export const editRecord = async (req, res) => {
    const data = req.body;
    console.log(data);
    // console.log("reached here");
    try {
        var card = await Card.findOne({id_num: data.idNum});
        // console.log(card);
        if(card) {
            console.log("hello", card._id);
            const updatedRecord = await Card.findByIdAndUpdate(card._id, { id_num: data.idNum, first_name: data.fname, last_name: data.lname, dob: data.dateOfBirth, doi: data.dateOfIssue, doe: data.dateOfExpiry, _id}, {new: true});
            console.log("updated: ", updatedRecord);
            res.json(updatedRecord);
        }
        // else
        //     console.log("reached hererer");
        
    } catch (error) {
        res.status(409).json({ error, message: "Something went wrong!"});
    }

}

