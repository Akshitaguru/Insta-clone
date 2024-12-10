import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} classNamemax-w-5xl p-0 flex flex-col>
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1732919258529-44f50088aefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Link>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </Link>
            
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
