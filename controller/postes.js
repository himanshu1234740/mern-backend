import PostMessage from "../model/postemsg.js"


export const getPost = (req, res) => {
    PostMessage.find()
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err)
        })
}

export const createUser = (req, res) => {
    
    let main = req.body.title
    let title = main[0].toString()
    let description = main[1].toString()
    const addPost = new PostMessage({
        user: req.user,
        selectedFiles: req.file.filename,
        description: description,
        title: title,

    })
    addPost.save(addPost).then((data) => {
        res.send(data)

    }).catch((err) => {
        console.log(err)
    })

}

export const likeUpdate = (req, res) => {
    const id = req.params.id
    const count = req.body.userid

    PostMessage.findOne({ _id: id }).select({ likeCount: 1 }).then((data) => {
        let likecount = 0
        for (let i = 0; i < data.likeCount.length; i++) {
            if (data.likeCount[i] === count) {
                likecount++
                // const updatelike = data.likeCount[i].Splice(i, 1)
                data.likeCount.splice(i, 1)
                PostMessage.findByIdAndUpdate({ _id: id }, { $set: { likeCount: data.likeCount } }).then((data) => {
                    res.send(data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
        if (likecount === 0) {
            PostMessage.findByIdAndUpdate({ _id: id }, { $push: { likeCount: count } }).then((data) => {
                res.send(data)
            }).catch((err) => {
                console.log(err)
            })
        }
    })

}
export const findpost = (req, res) => {
    const id = req.params.id
    PostMessage.findById({ _id: id }).select({ likeCount: 1 }).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.error(err)
    })
}

export const comments = (req, res) => {
    const id = req.params.id

    PostMessage.findByIdAndUpdate({ _id: id }, {
        $push: {
            comments: req.body
        }
    }).then((comments) => {
        res.send(comments)
    }).catch((err) => {
        console.log(err)
    })
}

export const fetchComment = (req, res) => {
    PostMessage.findOne({ _id: req.params.id }).select({ comments: 1 }).then((comments) => {
        res.send(comments)
    }).catch((err) => {
        console.log(err)
    })
}
export const delet = (req, res) => {
    const id = req.params.id
    PostMessage.findByIdAndDelete({ _id: id }).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
}