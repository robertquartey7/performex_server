import mongoose from "mongoose";

const athleteProfile = new mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userType: {
    required: true,
    default: "Althete",
  },
  parentEmail: {
    type: String,
    required: false,
  },
  primarySport: {
    type: String,
    required: false,
  },
  secondarySport: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

const recruiterProfile = new mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userType: {
    required: true,
    default: "Althete",
  },
  sport: {
    type: String,
    required: false,
  },

  roleAtInstitution: {
    type: String,
    required: false,
  },
  institution: {
    type: String,
    required: true,
  },
});
