import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

const CreatePost = ({ open, setOpen }) => {
  const createPostHandler = async (e) => {
    e.preventDefault();
 
   try {

   } catch (error) {

   }
  }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
            Create New Post
        </DialogHeader>
        <form onSubmit={createPostHandler}>
            hello
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
