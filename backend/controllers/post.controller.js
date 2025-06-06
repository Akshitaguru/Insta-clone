import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) return res.status(400).json({ message: "Image required" });

    // image upload
    const optimizedImageBuffer = await sharp(image.buffer)
    .resize({ width: 500, height: 500, fit: 'inside' }) // Reduce size
    .jpeg({ quality: 70 }) // Lower quality to reduce file size
    .toBuffer();


    // buffer to data uri
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
        caption,
        image:cloudResponse.secure_url,
        author:authorId
    });
    const user = await User.findById(authorId);
    if(user)
    {
        user.posts.push(post._id);
        await user.save();
    }
    
    await post.populate({path: 'author', select: '-password'});
    
    return res.status(201).json({
        message: 'New post added',
        post,
        success:true,
    })

  } catch (error) {
    console.log(error);
  }
}

export const getAllPost = async (req,res) => {
    try {
        const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({ path: 'author', select: 'username profilePicture' })
        .populate({
          path: 'comments',
          sort: { createdAt: -1 },
          populate: { path: 'author', select: 'username profilePicture' },
        });
      
       return res.status(200).json({
        posts,
        success:true
       });
    }
    catch (error) {
        console.log(error);
    }
};
export const getUserPost = async (req,res) => {
    try 
    {
        const authorId = req.id;
        const posts = await Post.find({author:authorId}).sort({createdAt:-1}).populate({
            path:'author',
            select:'username, profilePicture'
        }).populate({
            path: 'comments',
        sort:{createdAt:-1},
        populate:{
            path: 'author',
            select: 'username profilePicture'
        }
        });
        return res.status(200).json({
            posts,
            success:true
           })
    }
    catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id; 
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await post.save();

        // implement socket io for real time notification
        const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
         
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likeKrneWalaUserKiId){
            // emit a notification event
            const notification = {
                type:'like',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }

        return res.status(200).json({message:'Post liked', success:true});
    } catch (error) {

    }
}



export const dislikePost = async (req,res) => {
    try {
        const likekarnewalauserkiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: 'Post not found', success:false});

        // like logic started
        await post.updateOne({$pull :{likes: likekarnewalauserkiId}});
        await post.save();

        const user = await User.findById(likekarnewalauserkiId).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likekarnewalauserkiId) {
            const notification = {
                type:'dislike',
                userId:likekarnewalauserkiId,
                userDetails:user,
                postId,
                message:'Your post was disliked'
            }
            const postOwnenSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnenSocketId).emit('notification', notification);
        }


      return res.status(200).json({message: 'Post Disliked', success:true});
    }
    catch(error)
    {

    }
}

export const addComment = async (req,res) => {
    try{
        const postId = req.params.id;
        const commentkarnewalauserId = req.id;
        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text) return res.status(400).json({message: 'text is required', success:true});
        
        const comment = await Comment.create({
            text,
            author: commentkarnewalauserId,
            post:postId
        })

        await comment.populate({
            path: 'author',
            select:"username profilePicture"
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: 'Comment Added',
            comment,
            success:true
        })

    }
    catch (error) {
        console.log(error);
    }
};

export const getCommentsOfPost = async (req,res) => {

    try{
        const postId = req.params.id;
        const comments = await Comment.find({post: postId})
        .sort({createdAt: -1})
        .populate('author', 'username profilePicture');

        if(!comments) return res.status(404).json({message: 'No comments found for this post', success:false});

        return res.status(200).json({success:true,comments});
    }
    catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json ({message: 'Post Not Found', success: false});


        // check if the logged in user is the author of the post
        if(post.author.toString() != authorId) return res.status(403).json({message: 'Unauthorized'}); 

        //delete post
        await Post.findByIdAndDelete(postId);

        // remove the post id from the user's post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() != postId);
        await user.save();

        // delete associated comments
        await Comment.deleteMany({post:postId});
        return res.status(200).json({
            success:true,
            message: 'Post Deleted'
        })

    }
    catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id; // Ensure this is set correctly in your middleware

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ message: 'User  not found', success: false });
        }

        if (user.bookmarks.includes(post._id)) {
            // Already bookmarked -> remove from the bookmark
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await res.status(200).json({ type: 'unsaved', message: 'Post removed from bookmark', success: true });
        } else {
            // Bookmark the post
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await res.status(200).json({ type: 'saved', message: 'Post bookmarked', success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};