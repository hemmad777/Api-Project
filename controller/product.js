
const express=require("express");
const Product=require("../model/product");
const { default: mongoose } = require("mongoose");
const product = require("../model/product");

// Get all products 
exports.getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find();

        if(!products||products.length==0){
            return res.status(404).json({message:"Product not found"});
        }

        res.status(201).json({message:"success fully take all products",products:products});
    } catch (error) {
        res.status(500).json({message:"Server error is",error:error.message})
    }
}