const postModel = require("../model/postModel")
const commentModel = require("../model/commentModel")

const createpost = async function (req, res) {
    try {
        let postData = req.body;

        if (!postData.title) return res.status(400).send({ status: false, msg: "title Is Mandatory" });
        if (!postData.content) return res.status(400).send({ status: false, msg: "content Is Mandatory" });


        let savedData = await postModel.create(postData);
        return res.status(201).send({ status: true, message: "post is Created Successfully", data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





const getpost = async function (req, res) {
    try {
        let postId = req.params.postId;


        let data = await postModel.findById(postId);
        if (!data) {
            return res.status(404).send({ status: false, message: "id does not exist" });
        }


        let findcomments = await commentModel.find({ postId: postId }).select({ content: 1, _id: 0 })

        let respondData = {
            title: data.title,
            content: data.content,
            comment: findcomments


        }

        return res.status(200).send({ status: true, message: "post", data: respondData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const deletepost = async function (req, res) {

    try {
        let postId = req.params.postId

        const post = await postModel.findOne({ _id: postId, isDeleted: false })
        if (!post) {
            return res.status(404).send({ status: false, message: "contact does not found" })
        }

        await postModel.updateOne({ _id: postId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: "post deleted successfully" })
    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}


const updatepost = async function (req, res) {
    try {
        const data = req.body
        let postId = req.params.postId

        const { title, content } = data
        let obj = {}

        if (title) obj.title = title
        if (content) obj.content = content
        let post = await postModel.findOne({ _id: postId, isDeleted: false })
        if (!post) return res.status(404).send({ status: false, message: "post does not found" })

        const updatepost = await postModel.findOneAndUpdate({ _id: postId }, { $set: obj }, { new: true })


        let comment = await commentModel.find({ postId: postId }).select({ content: 1 })
        return res.status(200).send({ status: true, message: "post update is successful", data:updatepost,comment })

    }
    catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}



module.exports.deletepost = deletepost
module.exports.createpost = createpost
module.exports.getpost = getpost
module.exports.updatepost = updatepost