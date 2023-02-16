const commentModel=require("../model/commentModel")

const createcomment = async function (req, res) {
    try {
        let commentData = req.body;

     
        if (!commentData.content) return res.status(400).send({ status: false, msg: "comment Is Mandatory" });


    let savedData = await commentModel.create(commentData);
        return res.status(201).send({ status: true,message:"comment is Created Successfully", data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





const getcomment = async function (req, res) {
    try {
        let commentId = req.params.commentId;


        let data = await commentModel.findById(commentId);
        if (!data) {
            return res.status(404).send({ status: false, message: "id does not exist" });
        }
     

        let findcomment= await commentModel.findOneAndUpdate({ _id: postId, isDeleted: false }, { $set: { content:1} }, { new: true }).select({ __v: 0 })

        let respondData = {
            _id: data._id,
            title: data.title,
            content: data.content,
            comment:findcomment 
        }

      

        return res.status(200).send({ status: true, message: "comment", data: respondData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const deletecomment = async function (req, res) {

    try {
        let commentId = req.params.commentId

        const comment = await commentModel.findOne({ _id: commentId, isDeleted: false })
        if (!comment) {
            return res.status(404).send({ status: false, message: "comment does not found" })
        }

        await commentModel.updateOne({ _id: commentId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: "comment deleted successfully" })
    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}


const updatecomment = async function (req, res) {

    try {
        const data = req.body
        let commentId = req.params.commentId

        const {content} = data
        let obj = {}

        if (content) obj.content = content
       

    

        let comment = await commentModel.findOne({ _id:commentId,  isDeleted : false })
        if (!comment) return res.status(404).send({ status: false, message: "post does not found" })

 

        const updatecomment = await commentModel.findOneAndUpdate({ _id: commentId}, { $set: obj }, { new: true })

        return res.status(200).send({ status: true, message: "comment update is successful", data: updatecomment })

    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}



module.exports.deletecomment=deletecomment
module.exports.createcomment=createcomment
module.exports.getcomment=getcomment
module.exports.updatecomment=updatecomment