const express = require("express");

const Users=require("../Model/user");

// Created userRegister section
exports.register = async (req,res)=>{
    try {
        const{id,name,email,password,role,createdAt}=req.body;

    if(!id||!name||!email||!password||!role||!createdAt){
        return res.status(401).json({message:"All fields required"});
    }

    const existUser=Users.findOne({gmail:gmail});

    if(existUser){
       return res.status(401).json({message:"This user allready exist"});
    }

    const user={
        id,
        name,
        email,
        password,
        role,
        createdAt
    }

    await user.save();
    res.status(201).json({message:"Registration succesfully"+user});

    } catch (error) {
        res.status(500).json({message:"Error happened when running :"+error})
    }
}

// Logic for user login

exports.userLogin= async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await Users.findOne({email:email});

        if(!user){
            return res.status(404).json({message:"Not found user with this email"})
        }

        res.status(201).json({message:"registration succesfully the user"+user});
    } catch (error) {
        res.status(500).json({message:"Error happened when run is: "+error.message});
    }
}

// Logic for Get user by Id

exports.userGetById=async (req,res)=>{
    try {
        const {id}=req.params;

        const user=await Users.findById(id);

        if(!user){
            return res.status(404).json({message:"can't find user with this Id"});
        }

        res.status(201).json({message:`User with this id ${id} is : ${user}`});
    } catch (error) {
        res.status(500).json({message:"Error happened whe run is :"+error.message})
    }
}

// Logic for Update by Id

exports.userUpdateById=async (req,res)=>{
    try {
        const {id}=req.params;
        const {name,email,password,role,createdAt}=req.body;
        const user={
            name,
            email,
            password,
            role,
            createdAt
        }

        if(!name||!email||!password||!role||!createdAt){
            return res.status(401).json({message:"Enter atleaste one field for update"})
        }
    
        const userUpdate=await Users.findByIdAndUpdate(id,user);

        if(!userUpdate){
            res.status(401).json({message:"Not found the user with this Id"});
        }

        res.status(201).json({message:"Successfully ubdated this user"+userUpdate});
    
    } catch (error) {
        res.status(500).json({message:"Error happened when run is "+error.message})
    }
}

// Logic for delete by Id

exports.userDeleteById=async (req,res)=>{
    try {
        const{id}=req.params;

    const deleteUser=await Users.findByIdAndDelete(id);

    if(!deleteUser){
        res.status(404).json({message:"Not found the user with this Id"});
    }

    res.status(201).json({message:"Deleted this user"+deleteUser});
    } catch (error) {
        res.status(500).json({message:"Error happened whe run"+error.message});
    }
}