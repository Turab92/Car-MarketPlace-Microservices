const { PostListing } = require("../models/post_listing.model");
const { PostListingImages } = require("../models/post_listing_images.models");
const { PostSpecialFeatures } = require("../models/post_special_features.model");
const { PostConditionHistory } = require("../models/post_condition_history.model");
const { Make } = require("../models/vehicle_make.model");
const { Model } = require("../models/vehicle_model.model");
const { Year } = require("../models/vehicle_year.model");
const FetchUser = require("../middleware/FetchUser.js")
const Mongoose = require("mongoose");
const cron = require('node-cron');
const moment = require('moment');
const axios = require('axios');
require('dotenv').config();

const LIVE_API_URL= `${process.env.PROTOCOL}://${process.env.LIVE}:${process.env.GATEWAYPORT}`;
//const { NODEMAIL } = require("../../../sleek_user_management/app/config/nodemailer");
//var nodeMailer = require("nodemailer");

// exports.create = async (req, res) => {
//   try {
//     var baseURL = req.protocol + "://" + req.get("Host") + "/";
//     var fetchUser = await FetchUser.user(req.header("auth-token"));

//     if (!req.body || Object.keys(req.body).length === 0) {

//       return res.status(422).json({ errors: "Object missing" });

//     } else {
//       PostListing.find({ endUserId: fetchUser._id, is_pending: true })
//         .then(async (data) => {
//           if (!data.length) {
//             const postlisting = {
//               endUserId: fetchUser._id,
//               licensePlate: req.body.licensePlate,
//               stateId: req.body.stateId,
//               zipCode: req.body.zipCode,
//               colorId: req.body.colorId,
//               transmissionId: req.body.transmissionId,
//               wheelDriveId: req.body.wheelDriveId,
//               engineTypeId: req.body.engineTypeId,
//               sellOrTrade: req.body.sellOrTrade,
//               seatTypeId: req.body.seatTypeId,
//               roofTypeId: req.body.roofTypeId,
//               exteriorPartsId: req.body.exteriorPartsId,
//               wheelTypeId: req.body.wheelTypeId,
//               accidents: req.body.accidents,
//               isdrivable: req.body.isdrivable,
//               exteriorDamagesId: req.body.exteriorDamagesId,
//               interiorDamagesId: req.body.interiorDamagesId,
//               isModification: req.body.isModification,
//               isSmokedIn: req.body.isSmokedIn,
//               vehicleKeys: req.body.vehicleKeys,
//               vehicleCondition: req.body.vehicleCondition,
//               status: 1,
//             };
//             const post = await PostListing.create(postlisting);
//             if(req.files && req.files.length) {
//               Promise.all(
//                 req.files.map(async (file) => {
//                   if (
//                     file.mimetype != "image/png" &&
//                     file.mimetype != "image/jpg" &&
//                     file.mimetype != "image/jpeg" &&
//                     file.mimetype != "image/gif"
//                   ) {
//                     res.status(400).send({
//                       message: "You can Only Upload Images!!",
//                     });
//                   } else {
//                     const postlistingimages = {
//                       postListingId: post._id,
//                       fileName: file.filename,
//                       filePath: baseURL + file.path,
//                     };
//                     return PostListingImages.create(postlistingimages);
//                   }
//                 })
//               ).then(
//                   res.status(201).send({
//                       message:
//                         "Your post has been sent to the Administrator. You have to wait for approval",
//                     })
//               ).catch((e) => {
//                   res.status(500)
//                     .json({
//                       message: "Something went wrong in /uploads/img",
//                       error: e,
//                     });
//               });
//             }else {
//               res.status(201).send({
//                 message:
//                   "Your post has been sent to the Administrator. You have to wait for approval",
//               })
//             }

//           } else {
//             const postlisting = {
//               licensePlate: req.body.licensePlate,
//               stateId: req.body.stateId,
//               zipCode: req.body.zipCode,
//               colorId: req.body.colorId,
//               transmissionId: req.body.transmissionId,
//               wheelDriveId: req.body.wheelDriveId,
//               engineTypeId: req.body.engineTypeId,
//               sellOrTrade: req.body.sellOrTrade,
//               seatTypeId: req.body.seatTypeId,
//               roofTypeId: req.body.roofTypeId,
//               exteriorPartsId: req.body.exteriorPartsId,
//               wheelTypeId: req.body.wheelTypeId,
//               accidents: req.body.accidents,
//               isdrivable: req.body.isdrivable,
//               exteriorDamagesId: req.body.exteriorDamagesId,
//               interiorDamagesId: req.body.interiorDamagesId,
//               isModification: req.body.isModification,
//               isSmokedIn: req.body.isSmokedIn,
//               vehicleKeys: req.body.vehicleKeys,
//               vehicleCondition: req.body.vehicleCondition,
//               is_pending: req.body.is_pending,
//               status: 1,
//             };
//             var query = {
//               _id: new Mongoose.Types.ObjectId(data[0]._id),
//             };
//             const data1 = await PostListing.findOneAndUpdate(
//               query,
//               postlisting,
//               { upsert: true }
//             );
//             if(req.files && req.files.length) { 
//               PostListing.findOne({ _id: data1._id }).then((post) => {
//                 Promise.all(
//                   req.files.map(async (file) => {
//                     if (
//                       file.mimetype != "image/png" &&
//                       file.mimetype != "image/jpg" &&
//                       file.mimetype != "image/jpeg" &&
//                       file.mimetype != "image/gif"
//                     ) {
//                       res.status(400).send({
//                         message: "You can Only Upload Images!!",
//                       });
//                     } else {
//                       const postlistingimages = {
//                         postListingId: post._id,
//                         fileName: file.filename,
//                         filePath: baseURL + file.path,
//                       };
//                       return PostListingImages.create(postlistingimages);
//                     }
//                   })
//                 )
//                   .then(
//                     res
//                       .status(201)
//                       .send({
//                         message:
//                           "Your post has been sent to the Administrator. You have to wait for approval",
//                       })
//                   )
//                   .catch((e) => {
//                     res
//                       .status(500)
//                       .json({
//                         message: "Something went wrong in /uploads/img",
//                         error: e,
//                       });
//                   });
//               });
              
//             }else {
//               res
//               .status(201)
//               .send({
//                 message:
//                   "Your post has been sent to the Administrator. You have to wait for approval",
//               })
//             }
//           }
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: err.message || "Some error occured while retrieving User",
//           });
//         });
//     }
//   } catch (err) {
//     console.log(err);
//     throw (err);
//   }
// };

// exports.findPending2 = async (req, res) => {
//   try {
//     var fetchUser = await FetchUser.user(req.header("auth-token"));
//     var postlist = await PostListing.findOne({is_pending: true, endUserId: fetchUser._id });
//     if (!postlist) {
//       res.status(500).send({
//         message: "No Pending Post",
//       });
//     } else {
//       var state = await RegistrationState.findOne({ _id: postlist.stateId });
//       var color = await Colors.findOne({ _id: postlist.colorId });
//       var transmission = await TransmissionType.findOne({ _id: postlist.transmissionId });
//       var wheeldrive = await WheelDriveType.findOne({ _id: postlist.wheelDriveId });
//       var enginetype = await EngineType.findOne({ _id: postlist.engineTypeId });
//       var seattype = await SeatType.findOne({ _id: postlist.seatTypeId });
//       var rooftype = await RoofType.findOne({ _id: postlist.roofTypeId });
//       var exteriorparts = await ExteriorParts.findOne({ _id: postlist.exteriorPartsId });
//       var wheeltype = await WheelType.findOne({ _id: postlist.wheelTypeId });
//       var exteriordamages = await ExteriorDamages.findOne({ _id: postlist.exteriorDamagesId });
//       var interiordamages = await InteriorDamages.findOne({ _id: postlist.interiorDamagesId });

//       // var res = 1 == 2 ? 'true' : 'false' // res = false
//       var licensePlate = !postlist.licensePlate ? "null" : postlist.licensePlate;
//       var stateName = state == null ? "null" : state.stateName;
//       var zipCode = !postlist.zipCode ? "null" : postlist.zipCode;
//       var colorName = color == null ? "null" : color.colorName;
//       var TransmissionTypeName = transmission == null ? "null" : transmission.TransmissionTypeName;
//       var WheelDriveTypeName = wheeldrive == null ? "null" : wheeldrive.WheelDriveTypeName;
//       var engineTypeName = enginetype == null ? "null" : enginetype.engineTypeName;
//       var sellOrTrade = !postlist.sellOrTrade ? "null" : postlist.sellOrTrade;
//       var seatTypeName = seattype == null ? "null" : seattype.seatTypeName;
//       var roofTypeName = rooftype == null ? "null" : rooftype.roofTypeName;
//       var exteriorPartsName = exteriorparts == null ? "null" : exteriorparts.exteriorPartsName;
//       var WheelTypeName = wheeltype == null ? "null" : wheeltype.WheelTypeName;
//       var accidents = !postlist.accidents ? "null" : postlist.accidents;
//       var isdrivable = !postlist.isdrivable ? "null" : postlist.isdrivable;
//       var exteriorDamagesName = exteriordamages == null ? "null" : exteriordamages.exteriorDamagesName;
//       var interiorDamagesName = interiordamages == null ? "null" : interiordamages.interiorDamagesName;
//       var isModification = !postlist.isModification ? "null" : postlist.isModification;
//       var isSmokedIn = !postlist.isSmokedIn ? "null" : postlist.isSmokedIn;
//       var vehicleKeys = !postlist.vehicleKeys ? "null" : postlist.vehicleKeys;
//       var vehicleCondition = !postlist.vehicleCondition ? "null" : postlist.vehicleCondition;

//       res.status(200).send({
//         postListingId: postlist._id,
//         endUserId: postlist.endUserId,
//         licensePlate: licensePlate,
//         stateName: stateName,
//         zipCode: zipCode,
//         colorName: colorName,
//         TransmissionTypeName: TransmissionTypeName,
//         WheelDriveTypeName: WheelDriveTypeName,
//         engineTypeName: engineTypeName,
//         sellOrTrade: sellOrTrade,
//         seatTypeName: seatTypeName,
//         roofTypeName: roofTypeName,
//         exteriorPartsName: exteriorPartsName,
//         WheelTypeName: WheelTypeName,
//         accidents: accidents,
//         isdrivable: isdrivable,
//         exteriorDamagesName: exteriorDamagesName,
//         interiorDamagesName: interiorDamagesName,
//         isModification: isModification,
//         isSmokedIn: isSmokedIn,
//         vehicleKeys: vehicleKeys,
//         vehicleCondition: vehicleCondition,
//         is_pending: postlist.is_pending,
//         is_approved: postlist.is_approved,
//         status: postlist.status
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     // throw error
//   }
// };

// exports.findPending = async (req, res) => {
//   try {
//     var fetchUser = await FetchUser.user(req.header("auth-token"));
//     var data = await PostListing.findOne({is_pending: true, endUserId: fetchUser._id });
//     if (!data) {
//       res.status(500).send({
//         message: "No Pending Post",
//       });
//     } else {
//       res.status(200).send(data);
//     }
//   } catch (error) {
//     console.error(error);
//     // throw error
//   }
// };

// exports.findApproved = async (req, res) => {
//   var postlist = await PostListing.find({ is_approved: true, is_pending: false });
//   var data = [];
//   if (!postlist) {
//     res.status(500).send({
//       message: "No Posts available",
//     });
//   } else {
//     for (let post = 0; post < postlist.length; post++) {
      
//           var state = await RegistrationState.findOne({ _id: postlist[post].stateId });
//           var color = await Colors.findOne({ _id: postlist[post].colorId });
//           var transmission = await TransmissionType.findOne({ _id: postlist[post].transmissionId });
//           var wheeldrive = await WheelDriveType.findOne({ _id: postlist[post].wheelDriveId });
//           var enginetype = await EngineType.findOne({ _id: postlist[post].engineTypeId });
//           var seattype = await SeatType.findOne({ _id: postlist[post].seatTypeId });
//           var rooftype = await RoofType.findOne({ _id: postlist[post].roofTypeId });
//           var exteriorparts = await ExteriorParts.findOne({ _id: postlist[post].exteriorPartsId });
//           var wheeltype = await WheelType.findOne({ _id: postlist[post].wheelTypeId });
//           var exteriordamages = await ExteriorDamages.findOne({ _id: postlist[post].exteriorDamagesId });
//           var interiordamages = await InteriorDamages.findOne({ _id: postlist[post].interiorDamagesId });
//           var postlistingimages = await PostListingImages.find({ postListingId: postlist[post]._id });

//           // var res = 1 == 2 ? 'true' : 'false' // res = false
//           var licensePlate = !postlist[post].licensePlate ? null : postlist[post].licensePlate;
//           var stateName = state == null ? null : state.stateName;
//           var zipCode = !postlist[post].zipCode ? null : postlist[post].zipCode;
//           var colorName = color == null ? null : color.colorName;
//           var TransmissionTypeName = transmission == null ? null : transmission.TransmissionTypeName;
//           var WheelDriveTypeName = wheeldrive == null ? null : wheeldrive.WheelDriveTypeName;
//           var engineTypeName = enginetype == null ? null : enginetype.engineTypeName;
//           var sellOrTrade = !postlist[post].sellOrTrade ? null : postlist[post].sellOrTrade;
//           var seatTypeName = seattype == null ? null : seattype.seatTypeName;
//           var roofTypeName = rooftype == null ? null : rooftype.roofTypeName;
//           var exteriorPartsName = exteriorparts == null ? null : exteriorparts.exteriorPartsName;
//           var WheelTypeName = wheeltype == null ? null : wheeltype.WheelTypeName;
//           var accidents = !postlist[post].accidents ? null : postlist[post].accidents;
//           var isdrivable = !postlist[post].isdrivable ? null : postlist[post].isdrivable;
//           var exteriorDamagesName = exteriordamages == null ? null : exteriordamages.exteriorDamagesName;
//           var interiorDamagesName = interiordamages == null ? null : interiordamages.interiorDamagesName;
//           var isModification = !postlist[post].isModification ? null : postlist[post].isModification;
//           var isSmokedIn = !postlist[post].isSmokedIn ? null : postlist[post].isSmokedIn;
//           var vehicleKeys = !postlist[post].vehicleKeys ? null : postlist[post].vehicleKeys;
//           var vehicleCondition = !postlist[post].vehicleCondition ? null : postlist[post].vehicleCondition;
//           var filePath = postlistingimages.length == 0 ? null : postlistingimages;
          

//           const postArr = {
//             postListingId: postlist[post]._id,
//             licensePlate: licensePlate,
//             stateName: stateName,
//             zipCode: zipCode,
//             colorName: colorName,
//             TransmissionTypeName: TransmissionTypeName,
//             WheelDriveTypeName: WheelDriveTypeName,
//             engineTypeName: engineTypeName,
//             sellOrTrade: sellOrTrade,
//             seatTypeName: seatTypeName,
//             roofTypeName: roofTypeName,
//             exteriorPartsName: exteriorPartsName,
//             WheelTypeName: WheelTypeName,
//             accidents: accidents,
//             isdrivable: isdrivable,
//             exteriorDamagesName: exteriorDamagesName,
//             interiorDamagesName: interiorDamagesName,
//             isModification: isModification,
//             isSmokedIn: isSmokedIn,
//             vehicleKeys: vehicleKeys,
//             vehicleCondition: vehicleCondition,
//             is_pending: postlist[post].is_pending,
//             is_approved: postlist[post].is_approved,
//             status: postlist[post].status,
//             postlistingimages: filePath,
//           };
//           data.push(postArr);
//     }
//     res.status(200).send(data);
//   }
// };


//enduser panel

cron.schedule('0 5 9 * * *', async () =>  {
  // everyday at 9:05:00 am

  console.log('running a task everyday at 9:05:00 am');
  var yesterday=moment().subtract(7, 'hours').format();
   
  // const subscrip = await axios.get('http://192.168.1.227:3007/api/ins/internal/getall_newlist_subscrip')
  //   if(subscrip)
  //   {
  //   // handle succes
  //   console.log(subscrip.data);
  //   for(subs of subscrip.data)
  //   {
  //     const search = await axios.get(`http://192.168.1.227:3007/api/ins/endusr/get_recent_search/`+subs.endUserId)
  //     if(search)
  //     {
  //       var arr =[];
  //       // handle succes
  //       console.log(search.data);
  //       for(search of search.data)
  //       {
  //         var posts = await PostListing.find({ status: 1, is_pending:false, is_rejected:false, is_approved:true, cityId:search.city, make:search.maker, model:search.modal}).sort({ createdAt: -1 });
  //         if(posts.length)
  //         {
  //           for(post of posts)
  //           {
  //             var obj = {
  //               similar_post:post
  //             }
  //             arr.push(obj)
  //           }
            
  //         }
  //       }
  //       var transport = nodeMailer.createTransport({
  //         host: NODEMAIL.MAIL_HOST,
  //         port: NODEMAIL.MAIL_PORT,
  //         secure: true,
  //         requireTLS: true,
  //         service: NODEMAIL.MAIL_SERVICE,
  //         auth: {
  //           user: NODEMAIL.MAIL_USER,
  //           pass: NODEMAIL.MAIL_PASSWORD,
  //         },
  //       });
  //       var mailOptions = {
  //         from: NODEMAIL.MAIL_USER, //sender email address
  //         to: subscrip.endUserEmail, //receiver email address
  //         subject: NODEMAIL.MAIL_SUBJECT,
  //         text: `Hello we have similar new posts related to your recent searches you can see simiar posts attached in this email address. \n\n\n Kind Regards,\n Sleek Rides`,
  //       };
  //       transport.sendMail(mailOptions, function (error, info) {
  //         if (error) {
  //           res.status(501).send({
  //             message: error,
  //           });
  //         } else {
  //           console.warn("Email has been sent", info.response);
  //           res.status(200).send({
  //             message: `Email Verification Code has been sent to your Email Address`,
  //             data: arr,
  //           });
  //         }
  //       });

  //     }
  //   }

  // }
});


exports.create = async (req, res) => {
    try {
      var baseURL = req.protocol + "://sleekride.s3.ap-southeast-1.amazonaws.com/sleek_vehicle_management/uploads/";
      var fetchUser = await FetchUser.user(req.header("auth-token"));
  
      if (!req.body || Object.keys(req.body).length === 0) {
  
        return res.status(422).json({ errors: "Object missing" });
  
      } else {
          const postlisting = {
              endUserId: fetchUser._id,
              regCityId: req.body.regCityId,
              licensePlate: req.body.licensePlate,
              VIN: req.body.vin,
              cityId: req.body.cityId,
              year: req.body.year,
              make: req.body.make,
              model: req.body.model,
              listingTitle: req.body.listingTitle,
              overview: req.body.overview,
              exteriorColorId: req.body.exteriorColorId,
              transmissionId: req.body.transmissionId,
              mileage: req.body.mileage,
              price: req.body.price,
              interiorColorId: req.body.interiorColorId,
              trim: req.body.trim,
              driveTrainId: req.body.driveTrainId,
              doors: req.body.doors,
              engineSize: req.body.engineSize,
              sellOrTrade: req.body.sellOrTrade,
              accidents: req.body.accidents,
              isdrivable: req.body.isdrivable,
              is_modification: req.body.is_modification,
              is_smokedIn: req.body.is_smokedIn,
              vehicleKeys: req.body.vehicleKeys,
              vehicleCondition: req.body.vehicleCondition,
              is_pending: req.body.final ? false : true,
              status: 1,
            //   stateId: req.body.stateId,
            //   zipCode: req.body.zipCode,
            //   colorId: req.body.colorId,
            //   wheelDriveId: req.body.wheelDriveId,
            //   engineTypeId: req.body.engineTypeId,
            //   seatTypeId: req.body.seatTypeId,
            //   roofTypeId: req.body.roofTypeId,
             // exteriorPartsId: req.body.exteriorPartsId,
              //wheelTypeId: req.body.wheelTypeId,
            //   exteriorDamagesId: req.body.exteriorDamagesId,
            //   interiorDamagesId: req.body.interiorDamagesId,
             
            };
           var postid; 
        PostListing.find({ endUserId: fetchUser._id, is_pending: true })
          .then(async (data) => {
            if (!data.length) {
              const post = await PostListing.create(postlisting);
              postid = post._id
  
            } else {
              var query = {
                _id: new Mongoose.Types.ObjectId(data[0]._id),
              };
              const data1 = await PostListing.findOneAndUpdate(
                query,
                postlisting,
                { upsert: true }
              );
              postid =data[0]._id
  
            }
            //images
            if(req.files && req.files.length) {
              console.log(postid)
              Promise.all(
                req.files.map(async (file) => {
                  if (
                    file.mimetype != "image/png" &&
                    file.mimetype != "image/jpg" &&
                    file.mimetype != "image/jpeg" &&
                    file.mimetype != "image/gif"
                  ) {
                    res.status(400).send({
                      message: "You can Only Upload Images!!",
                    });
                  } else {
                    console.log(file)
                    const postlistingimages = {
                      postListingId: postid,
                      fileName: file.originalname,
                      filePath: file.location,
                    };
                    return PostListingImages.create(postlistingimages);
                  }
                })
              )
            }
            //special feature
            if(req.body.special_features){
               var sf = await PostSpecialFeatures.find({ postListingId: postid })
               console.log(sf)
               const sp = req.body.special_features
               //const sp_array = sp.split(",")
               if(!sf.length){
                  for(psf of sp){
                      const postsf = {
                          postListingId: postid,
                          specialFeaturesTypeId:psf,
                          status: 1,
                          created_by: fetchUser._id,
                        };
                        const addsf = await PostSpecialFeatures.create(postsf);
                  }  
              }
              else{
                  var data = await PostSpecialFeatures.findOneAndDelete({ postListingId: new Mongoose.Types.ObjectId(postid) })
                      if(data){
                        for(psf of sp){
                              const postsf = {
                                  postListingId: postid,
                                  specialFeaturesTypeId: psf,
                                  status: 1,
                                  created_by: fetchUser._id,
                                };
                              var addsf = await  PostSpecialFeatures.create(postsf);
                     
                          }
                      }
                    
              }
             
            }
          
            //condition history
            if(req.body.condition_history){
              var ch = await PostConditionHistory.find({ postListingId: postid})
              const chh = req.body.condition_history
              //const ch_array = chh.split(",")
              if(!ch.length)
              {
                  for(pch of chh){
                      const postch = {
                          postListingId: postid,
                          ConditionHistoryTypeId: pch,
                          status: 1,
                          created_by: fetchUser._id,
                        };
                      var addch = await  PostConditionHistory.create(postch);
                  }
              }
              else{
                  var data = await PostConditionHistory.findOneAndDelete({ postListingId: new Mongoose.Types.ObjectId(postid) })
                      if(data){
                          for(pch of chh){
                              const postch = {
                                  postListingId: postid,
                                  ConditionHistoryTypeId: pch,
                                  status: 1,
                                  created_by: fetchUser._id,
                                };
                              var addch = await  PostConditionHistory.create(postch);
                          }
                      }
                    
                  }
              
            }

            //maker
            if(req.body.make){
              var mak = await Make.findOne({ makeName: req.body.make })
              if(!mak)
              {
                const vehicle_make = {
                  makeName: req.body.make,
                  status: 1,
                  created_by: fetchUser._id,
                };
                  var addmake = await  Make.create(vehicle_make);
                  
              }
            }

            //model
            if(req.body.model){
              var mod = await Model.findOne({ modelName: req.body.model })
              if(!mod)
              {
                var mak = await Make.findOne({ makeName: req.body.make })
                const vehicle_model = {
                  makerID: mak._id,
                  modelName: req.body.model,
                  status: 1,
                  created_by: fetchUser._id,
                };
                  var addmake = await  Model.create(vehicle_model);
                  
              }
            }

            //year
            if(req.body.year){
              var yea = await Year.findOne({ yearName: req.body.year })
              if(!yea)
              {
                const yearname = {
                  yearName: req.body.year,
                  status: 1,
                  created_by: fetchUser._id,
                };
                  var addyear = await  Year.create(yearname);
                  
              }
            }
         
              res.status(201).send({
                message:
                  "Your post has been sent to the Administrator. You have to wait for approval",
              })
            
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occured while retrieving User",
            });
          });
      }
    } catch (err) {
      console.log(err);
      throw (err);
    }
  };

  //enduser panel
  exports.findUserPending = async (req, res) => {
    try {
      var fetchUser = await FetchUser.user(req.header("auth-token"));
      var data = await PostListing.findOne({is_pending: true, endUserId: fetchUser._id });
      if (!data) {
        res.status(500).send({
          message: "No Pending Post",
        });
      } else {
        var image = await PostListingImages.find({ postListingId: data._id })
        var sf = await PostSpecialFeatures.find({ postListingId: data._id }).populate("specialFeaturesTypeId")
        var ch = await PostConditionHistory.find({ postListingId: data._id }).populate("ConditionHistoryTypeId")
        const postlisting = {
          postID:data._id,
          endUserId: data.endUserId,
          regCityId: data.regCityId,
          licensePlate: data.licensePlate,
          VIN: data.vin,
          cityId: data.cityId,
          year: data.year,
          make: data.make,
          model: data.model,
          listingTitle: data.listingTitle,
          overview: data.overview,
          exteriorColorId: data.exteriorColorId,
          transmissionId: data.transmissionId,
          mileage: data.mileage,
          price: data.price,
          interiorColorId: data.interiorColorId,
          trim: data.trim,
          driveTrainId: data.driveTrainId,
          doors: data.doors,
          engineSize: data.engineSize,
          sellOrTrade: data.sellOrTrade,
          accidents: data.accidents,
          isdrivable: data.isdrivable,
          is_modification: data.is_modification,
          is_smokedIn: data.is_smokedIn,
          vehicleKeys: data.vehicleKeys,
          vehicleCondition: data.vehicleCondition,
          is_pending: data.is_pending,
          status: data.status,
          images:image,
          special_features:sf,
          condition_history:ch
         
        };
       
        res.status(200).send(postlisting);
      
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };

    //enduser panel
    exports.findUserPosts = async (req, res) => {
      try {
        var arr=[];
        var fetchUser = await FetchUser.user(req.header("auth-token"));
        var data = await PostListing.find({is_pending: false, endUserId: fetchUser._id });
        if (!data) {
          res.status(500).send({
            message: "No Post Found",
          });
        } else {
          for(usr of data){
            var image = await PostListingImages.find({ postListingId: usr._id })
            var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
            var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
            const postlisting = {
              postID:usr._id,
              endUserId: usr.endUserId,
              regCityId: usr.regCityId,
              licensePlate: usr.licensePlate,
              VIN: usr.vin,
              cityId: usr.cityId,
              year: usr.year,
              make: usr.make,
              model: usr.model,
              listingTitle: usr.listingTitle,
              overview: usr.overview,
              exteriorColorId: usr.exteriorColorId,
              transmissionId: usr.transmissionId,
              mileage: usr.mileage,
              price: usr.price,
              interiorColorId: usr.interiorColorId,
              trim: usr.trim,
              driveTrainId: usr.driveTrainId,
              doors: usr.doors,
              engineSize: usr.engineSize,
              sellOrTrade: usr.sellOrTrade,
              accidents: usr.accidents,
              isdrivable: usr.isdrivable,
              is_modification: usr.is_modification,
              is_smokedIn: usr.is_smokedIn,
              vehicleKeys: usr.vehicleKeys,
              vehicleCondition: usr.vehicleCondition,
              is_pending: usr.is_pending,
              is_approved: usr.is_approved,
              is_rejected: usr.is_rejected,
              createdAt: usr.createdAt,
              reason: usr.reason,
              status: usr.status,
              images:image,
              special_features:sf,
              condition_history:ch
             
            };

            arr.push(postlisting);
          }
         
          
          res.status(200).send(arr);
        
        }
      } catch (error) {
        console.error(error);
        // throw error
      }
    };

  //adminpanel
  exports.findAllPost = async (req, res) => {
    try {
      let query;
      switch (req.body.type) {
        case "All": {
          return query = { status: 1};
        }
        case "Pending": {
          return query = { status: 1,is_pending:true};
        }
        case "Approved":{
          return query = { status: 1, is_pending:false, is_approved:true};
        }
        case "Not Approved":{
          return query = { status: 1,is_pending:false, is_approved:false};
        }
      }
      var fetchUser = await FetchUser.user(req.header("auth-token"));
      var data = await PostListing.find(query);
      if (!data) {
        res.status(500).send({
          message: "No Post Found",
        });
      } else {
        res.status(200).send(data);
      
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };

  //adminpanel
  exports.findSinglePost = async (req, res) => {
    try {
      var postid=new Mongoose.Types.ObjectId(req.params.postid)
      var usr = await PostListing.findOne({_id:postid});
      if (!usr) {
        res.status(500).send({
          message: "No Post Found",
        });
      } else {

        var image = await PostListingImages.find({ postListingId: postid })
        var sf = await PostSpecialFeatures.find({ postListingId: postid }).populate("specialFeaturesTypeId")
        var ch = await PostConditionHistory.find({ postListingId: postid }).populate("ConditionHistoryTypeId")

            const postlisting = {
              postID:usr._id,
              endUserId: usr.endUserId,
              regCityId: usr.regCityId,
              licensePlate: usr.licensePlate,
              VIN: usr.vin,
              cityId: usr.cityId,
              year: usr.year,
              make: usr.make,
              model: usr.model,
              listingTitle: usr.listingTitle,
              overview: usr.overview,
              exteriorColorId: usr.exteriorColorId,
              transmissionId: usr.transmissionId,
              mileage: usr.mileage,
              price: usr.price,
              interiorColorId: usr.interiorColorId,
              trim: usr.trim,
              driveTrainId: usr.driveTrainId,
              doors: usr.doors,
              engineSize: usr.engineSize,
              sellOrTrade: usr.sellOrTrade,
              accidents: usr.accidents,
              isdrivable: usr.isdrivable,
              is_modification: usr.is_modification,
              is_smokedIn: usr.is_smokedIn,
              vehicleKeys: usr.vehicleKeys,
              vehicleCondition: usr.vehicleCondition,
              is_pending: usr.is_pending,
              is_approved: usr.is_approved,
              is_rejected: usr.is_rejected,
              createdAt: usr.createdAt,
              reason: usr.reason,
              status: usr.status,
              images:image,
              special_features: sf,
              condition_history:ch,
            
            };
            
        res.status(200).send(postlisting);
      
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };

  //adminpanel
  exports.UpdatePost = async (req, res) => {
    try {
      let query;
      switch (req.body.type) {
        case "Rejected": {
          return query = { is_rejected: true, is_approved:false, reason:req.body.reason};
        }
        case "Approved": {
          return query = { is_approved: true, is_rejected:false, reason:req.body.reason};
        }
      }
      var id = {
        _id: new Mongoose.Types.ObjectId(req.body.postid),
      };
      const data = await PostConditionHistory.findOneAndUpdate(
        id,
        query,
        { upsert: true }
      );
      if (!data) {
        res.status(500).send({
          message: "Not update",
        });
      } else {
        res.status(200).send(data);
      
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };

  exports.PostListingUsers = async (req, res) => {
    try {
          const token = req.header("auth-token");
          var arr=[];
          let wishlist=null;
          const { page = 1, limit = 10 } = req.query
          var data = await PostListing.find({ status: 1, is_pending:false, is_rejected:false, is_approved:true}).limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });
          if (!data) {
            res.status(500).send({
              message: "No Post Found",
            });
          } else {

            for(usr of data){
              var image = await PostListingImages.find({ postListingId: usr._id })
              var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
              var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
              if(token){
                var fetchUser = await FetchUser.user(token);
              try {
                  var wish = await axios.get(`${LIVE_API_URL}/api/ins/endusr/get_wishlist/`+fetchUser._id+`/`+usr._id,{
                    headers:{
                      'auth-token':token
                    }
                  });
                  wishlist =wish.data
                } catch (err) {
                  wishlist=null
                }  
           
              console.log(wishlist)
             
              }
              const postlisting = {
                postID:usr._id,
                endUserId: usr.endUserId,
                regCityId: usr.regCityId,
                licensePlate: usr.licensePlate,
                VIN: usr.vin,
                cityId: usr.cityId,
                year: usr.year,
                make: usr.make,
                model: usr.model,
                listingTitle: usr.listingTitle,
                overview: usr.overview,
                exteriorColorId: usr.exteriorColorId,
                transmissionId: usr.transmissionId,
                mileage: usr.mileage,
                price: usr.price,
                interiorColorId: usr.interiorColorId,
                trim: usr.trim,
                driveTrainId: usr.driveTrainId,
                doors: usr.doors,
                engineSize: usr.engineSize,
                sellOrTrade: usr.sellOrTrade,
                accidents: usr.accidents,
                isdrivable: usr.isdrivable,
                is_modification: usr.is_modification,
                is_smokedIn: usr.is_smokedIn,
                vehicleKeys: usr.vehicleKeys,
                vehicleCondition: usr.vehicleCondition,
                is_pending: usr.is_pending,
                is_approved: usr.is_approved,
                is_rejected: usr.is_rejected,
                createdAt: usr.createdAt,
                reason: usr.reason,
                status: usr.status,
                images:image,
                special_features: sf,
                condition_history:ch,
                wishlist: wishlist
              
              };

              arr.push(postlisting);
            }
          
            
            res.status(200).send(arr);
          }
          
    } catch (error) {
      console.error(error);
      // throw error
    }
  };


  exports.PostListingMaker = async (req, res) => {
    try {
      if (req.query.make == undefined) {
        res.status(400).send({
          message: "make required",
        });
        return;
      } else {
            var arr=[];
            const { page = 1, limit = 10 } = req.query
            var data = await PostListing.find({ status: 1, is_pending:false, is_rejected:false, is_approved:true, make:req.query.make,}).limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });
            if (!data) {
              res.status(500).send({
                message: "No Post Found",
              });
            } else {
              for(usr of data){
                var image = await PostListingImages.find({ postListingId: usr._id })
                var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
                var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
                const postlisting = {
                  postID:usr._id,
                  endUserId: usr.endUserId,
                  regCityId: usr.regCityId,
                  licensePlate: usr.licensePlate,
                  VIN: usr.vin,
                  cityId: usr.cityId,
                  year: usr.year,
                  make: usr.make,
                  model: usr.model,
                  listingTitle: usr.listingTitle,
                  overview: usr.overview,
                  exteriorColorId: usr.exteriorColorId,
                  transmissionId: usr.transmissionId,
                  mileage: usr.mileage,
                  price: usr.price,
                  interiorColorId: usr.interiorColorId,
                  trim: usr.trim,
                  driveTrainId: usr.driveTrainId,
                  doors: usr.doors,
                  engineSize: usr.engineSize,
                  sellOrTrade: usr.sellOrTrade,
                  accidents: usr.accidents,
                  isdrivable: usr.isdrivable,
                  is_modification: usr.is_modification,
                  is_smokedIn: usr.is_smokedIn,
                  vehicleKeys: usr.vehicleKeys,
                  vehicleCondition: usr.vehicleCondition,
                  is_pending: usr.is_pending,
                  is_approved: usr.is_approved,
                  is_rejected: usr.is_rejected,
                  createdAt: usr.createdAt,
                  reason: usr.reason,
                  status: usr.status,
                  images:image,
                  special_features: sf,
                  condition_history:ch,
                
                };

                arr.push(postlisting);
              }
            
              
              res.status(200).send(arr);
      }
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };

  exports.SimilarPostListing = async (req, res) => {
    try {
      if (req.query.postid == undefined) {
        res.status(400).send({
          message: "postid required",
        });
        return;
      } else {
            var similar = await PostListing.findOne({ _id:req.query.postid,})
            var arr=[];
            const { page = 1, limit = 10 } = req.query
            var data = await PostListing.find({ status: 1, is_pending:false, is_rejected:false, is_approved:true, cityId:similar.cityId, year:similar.year, make:similar.make, model:similar.model}).limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });
            if (!data) {
              res.status(500).send({
                message: "No Post Found",
              });
            } else {
              for(usr of data){
                var image = await PostListingImages.find({ postListingId: usr._id })
                var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
                var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
                const postlisting = {
                  postID:usr._id,
                  endUserId: usr.endUserId,
                  regCityId: usr.regCityId,
                  licensePlate: usr.licensePlate,
                  VIN: usr.vin,
                  cityId: usr.cityId,
                  year: usr.year,
                  make: usr.make,
                  model: usr.model,
                  listingTitle: usr.listingTitle,
                  overview: usr.overview,
                  exteriorColorId: usr.exteriorColorId,
                  transmissionId: usr.transmissionId,
                  mileage: usr.mileage,
                  price: usr.price,
                  interiorColorId: usr.interiorColorId,
                  trim: usr.trim,
                  driveTrainId: usr.driveTrainId,
                  doors: usr.doors,
                  engineSize: usr.engineSize,
                  sellOrTrade: usr.sellOrTrade,
                  accidents: usr.accidents,
                  isdrivable: usr.isdrivable,
                  is_modification: usr.is_modification,
                  is_smokedIn: usr.is_smokedIn,
                  vehicleKeys: usr.vehicleKeys,
                  vehicleCondition: usr.vehicleCondition,
                  is_pending: usr.is_pending,
                  is_approved: usr.is_approved,
                  is_rejected: usr.is_rejected,
                  createdAt: usr.createdAt,
                  reason: usr.reason,
                  status: usr.status,
                  images:image,
                  special_features: sf,
                  condition_history:ch,
                
                };

                arr.push(postlisting);
              }
            
              
              res.status(200).send(arr);
      }
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };


  exports.FilterPostListing = async (req, res) => {
    try {
        const conditions = [ 
        {name: "year", value:{$gte:req.body.year_end, $lte: req.body.year_start} },
        {name: "model", value: { $regex: req.body.makerORmodel, "$options": "i"} },
        {name: "cityId", value:  req.body.cityId },
        {name: "transmissionId", value:  req.body.transmissionId },
        {name: "mileage", value: { $gte: req.body.max_mileage} },
        {name: "price", value:{$gte:req.body.price_end, $lte: req.body.price_start}},
        {name: "exteriorColorId", value:  req.body.exteriorColorId },
        {name: "interiorColorId", value:  req.body.interiorColorId },
        {name: "vehicleCondition", value: { $regex: req.body.vehicleCondition, "$options": "i"} },
        {name: "doors", value:  req.body.doors },
        {name: "driveTrainId", value:  req.body.driveTrainId },
        {
          name:"listingTitle",
          value: { $regex: req.body.search_keywords, "$options": "i"}
        }
      ]
      .filter(el =>  {
          if(el.name === "listingTitle" || el.name === "vehicleCondition" || el.name === "model") {
            return !!el.value?.$regex
          }

          return !!el.value
        })
        .map(el => ({[el.name]: el.value}))
        console.log(conditions)
        var arr=[];
        var data = await PostListing.find(
          { status: 1, is_pending:false, is_rejected:false, is_approved:true,
            $or:[
              ...conditions
                  // {year:{$year:{$gte:req.body.year_end, $lte: req.body.year_start}} },
                  // {model: { $eq: req.body.makerORmodel} },
                  // {transmissionId: { $eq: req.body.transmissionId } },
                  // {mileage: { $eq: req.body.max_mileage } },
                  // {cityId: { $eq: req.body.cityId } },
                  // {price: {$price:{$gte:req.body.price_end,$lte: req.body.price_start}}},
                  // {exteriorColorId: { $eq: req.body.exteriorColorId } },
                  // {interiorColorId: { $eq: req.body.interiorColorId } },
                  // {vehicleCondition: { $eq: req.body.condition } },
                  // {doors: { $eq: req.body.doors } },
                  // {driveTrainId: { $eq: req.body.drivetrain } }
                  // remaining :  distance, sf_bodytypeID, sf_origintypeID, sf_fueltypeID
                ]})
        if (!data) {
          res.status(500).send({
            message: "No Post Found",
          });
        } else {
          for(usr of data){
            var image = await PostListingImages.find({ postListingId: usr._id })
            var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
            var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
            const postlisting = {
              postID:usr._id,
              endUserId: usr.endUserId,
              regCityId: usr.regCityId,
              licensePlate: usr.licensePlate,
              VIN: usr.vin,
              cityId: usr.cityId,
              year: usr.year,
              make: usr.make,
              model: usr.model,
              listingTitle: usr.listingTitle,
              overview: usr.overview,
              exteriorColorId: usr.exteriorColorId,
              transmissionId: usr.transmissionId,
              mileage: usr.mileage,
              price: usr.price,
              interiorColorId: usr.interiorColorId,
              trim: usr.trim,
              driveTrainId: usr.driveTrainId,
              doors: usr.doors,
              engineSize: usr.engineSize,
              sellOrTrade: usr.sellOrTrade,
              accidents: usr.accidents,
              isdrivable: usr.isdrivable,
              is_modification: usr.is_modification,
              is_smokedIn: usr.is_smokedIn,
              vehicleKeys: usr.vehicleKeys,
              vehicleCondition: usr.vehicleCondition,
              is_pending: usr.is_pending,
              is_approved: usr.is_approved,
              is_rejected: usr.is_rejected,
              createdAt: usr.createdAt,
              reason: usr.reason,
              status: usr.status,
              images:image,
              special_features: sf,
              condition_history:ch,
            
            };

            arr.push(postlisting);
          }
        
          
          res.status(200).send(arr);
      }
      
    } catch (error) {
      console.error(error);
      // throw error
    }

  }; 


  exports.SearchPostListing = async (req, res) => {
    try {
        var arr=[];
        const { page = 1, limit = 10 } = req.query
        const conditions = [ 
        {name: "make", value: { $regex: req.body.maker, "$options": "i"} },
        {name: "model", value: { $regex: req.body.modal, "$options": "i"} },
        {name: "cityId", value:  req.body.city },
         {
          name:"listingTitle",
          value: { $regex: req.body.search_keywords, "$options": "i"}
        }
      ]
      .filter(el =>  {
          if(el.name === "listingTitle" || el.name === "make" || el.name === "model") {
            return !!el.value?.$regex
          }

          return !!el.value
        })
        .map(el => ({[el.name]: el.value}))
        console.log(conditions)

        const conditionss = [
          {$or:[{name: "make", value:  req.body.maker }]},
          {$or:[{name: "model", value:  req.body.modal }]},
          {$or:[{name: "cityId", value:  req.body.city }]},
          {$or:[ {
            name:"listingTitle",
            value: { $regex: req.body.search_keywords, "$options": "i"}
          }]}
        ]
        .filter(el =>  {
            if(el.$or[0].name === "listingTitle") {
              return !!el.$or[0].value?.$regex
            }
  
            return !!el.$or[0].value
          })
          .map(el => ({[el.$or[0].name]: el.$or[0].value}))
          console.log(conditionss)
        var data = await PostListing.find({
          // $match: {
                          status: 1,
                          is_pending: false,
                          is_rejected: false,
                          is_approved: true,
                         
             
                            //$or:[req.body.search_keywords != null ?{listingTitle: { $regex: req.body.search_keywords, "$options": "i"} }: {}],
                            //$or:[ {make:  req.body.maker }],
                            //$or:[{model:  req.body.modal }],
                           // $or:[{cityId: req.body.city }]
                          

                           $or:[
                           
                             ...conditions
                            ]
                          
        //           }
                  
        //   },
        //   {
        //     $facet: {
        //         listingTitle_match: [
        //            req.body.search_keywords ?{ $match: { listingTitle : { $regex: req.body.search_keywords, "$options": "i" } } }: { $match: { listingTitle : req.body.search_keywords }},
                   
        //         ],
        //         make_match: [
        //            { $match: { make : req.body.maker } },
                 
        //         ],
        //         model_match: [
        //            { $match: { model : req.body.modal  } },
                 
        //         ],
        //         // city_match: [
        //         //    { $match: { cityId : req.body.city  } },
                 
        //         // ]
        //     }
        //   },
        //   { 
        //     $project: { 
        //         result: { 
        //             $concatArrays: [ "$listingTitle_match", "$make_match", "$model_match" ] 
        //         }
        //     }
        //   },
        //   { 
        //       $unwind: "$result" 
        //   },
        //   { 
        //       $replaceRoot: { newRoot: "$result" } 
        //   },
        //   { $group: {
        //     "_id": "$_id",
        //     "endUserId": { $first:"$endUserId"},
        //     "regCityId": { $first:"$regCityId"},
        //     "licensePlate": { $first:"$licensePlate"},
        //     "VIN": { $first:"$vin"},
        //     "cityId": { $first:"$cityId"},
        //     "year": { $first:"$year"},
        //     "make": { $first:"$make"},
        //     "model": { $first:"$model"},
        //     "listingTitle":{ $first: "$listingTitle"},
        //     "overview": { $first:"$overview"},
        //     "exteriorColorId":{ $first: "$exteriorColorId"},
        //     "transmissionId": { $first:"$transmissionId"},
        //     "mileage":{ $first: "$mileage"},
        //     "price":{ $first: "$price"},
        //     "interiorColorId": { $first:"$interiorColorId"},
        //     "trim": { $first:"$trim"},
        //     "driveTrainId": { $first:"$driveTrainId"},
        //     "doors": { $first:"$doors"},
        //     "engineSize": { $first:"$engineSize"},
        //     "sellOrTrade":{ $first: "$sellOrTrade"},
        //     "accidents": { $first:"$accidents"},
        //     "isdrivable": { $first:"$isdrivable"},
        //     "is_modification": { $first:"$is_modification"},
        //     "is_smokedIn": { $first:"$is_smokedIn"},
        //     "vehicleKeys": { $first:"$vehicleKeys"},
        //     "vehicleCondition": { $first:"$vehicleCondition"},
        //     "is_pending": { $first:"$is_pending"},
        //     "is_approved": { $first:"$is_approved"},
        //     "is_rejected": { $first:"$is_rejected"},
        //     "createdAt": { $first:"$createdAt"},
        //     "reason":{ $first: "$reason"},
        //     "status": { $first:"$status"},
        //     "result": { "$addToSet": "$result" }
        // }
      })
      //.limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });
        if (!data) {
          res.status(500).send({
            message: "No Post Found",
          });
        } else {
          for(usr of data){
            var image = await PostListingImages.find({ postListingId: usr._id })
            var sf = await PostSpecialFeatures.find({ postListingId: usr._id }).populate("specialFeaturesTypeId")
            var ch = await PostConditionHistory.find({ postListingId: usr._id }).populate("ConditionHistoryTypeId")
            const postlisting = {
              postID:usr._id,
              endUserId: usr.endUserId,
              regCityId: usr.regCityId,
              licensePlate: usr.licensePlate,
              VIN: usr.vin,
              cityId: usr.cityId,
              year: usr.year,
              make: usr.make,
              model: usr.model,
              listingTitle: usr.listingTitle,
              overview: usr.overview,
              exteriorColorId: usr.exteriorColorId,
              transmissionId: usr.transmissionId,
              mileage: usr.mileage,
              price: usr.price,
              interiorColorId: usr.interiorColorId,
              trim: usr.trim,
              driveTrainId: usr.driveTrainId,
              doors: usr.doors,
              engineSize: usr.engineSize,
              sellOrTrade: usr.sellOrTrade,
              accidents: usr.accidents,
              isdrivable: usr.isdrivable,
              is_modification: usr.is_modification,
              is_smokedIn: usr.is_smokedIn,
              vehicleKeys: usr.vehicleKeys,
              vehicleCondition: usr.vehicleCondition,
              is_pending: usr.is_pending,
              is_approved: usr.is_approved,
              is_rejected: usr.is_rejected,
              createdAt: usr.createdAt,
              reason: usr.reason,
              status: usr.status,
              images:image,
              special_features: sf,
              condition_history:ch,
            
            };

            arr.push(postlisting);
          }
        
          
          res.status(200).send(arr);
      }
      
    } catch (error) {
      console.error(error);
      // throw error
    }

  }; 


  exports.SearchKeywords = async (req, res) => {
    try {
      if (req.params.search == undefined) {
        res.status(400).send({
          message: "keyword required",
        });
        return;
      } else {
        arr =[];
        console.log(req.params.search)
            var data = await PostListing.find({ status: 1, is_pending:false, is_rejected:false, is_approved:true,

              $or:[{make: {$regex : req.params.search, "$options": "i" }},
            // ],
            //   $or:[
                {model:  {$regex : req.params.search, "$options": "i" }}
            ],
            });
            if (!data) {
              res.status(500).send({
                message: "No Post Found",
              });
            } else {
            for(var dat of data){
              var obj={
                make:dat.make,
                model:dat.model
              }
              //arr.push(obj)
              arr.findIndex(x => x.model == obj.model) == -1 ? arr.push(obj) : console.log("object already exists")
            }
              
              res.status(200).send(arr);
      }
      }
    } catch (error) {
      console.error(error);
      // throw error
    }
  };