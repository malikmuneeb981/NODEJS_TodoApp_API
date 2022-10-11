
const mongoose=require('mongoose')

const userschema=new mongoose.Schema({

   username:{
      type:String,
      required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   avatar:{
    type:String
   }

})

module.exports=mongoose.model('User',userschema)
















































// const mongoose=require('mongoose')


// const userschema= new mongoose.Schema({

// username:{
//     type:String,
//     required:true
// },
// email:{
// type:String,
// required:true
// },
// password:{
// type:String,
// required:true

// },
// avatar:{
//     type:String
// }

// })
// module.exports=mongoose.model('User',userschema)