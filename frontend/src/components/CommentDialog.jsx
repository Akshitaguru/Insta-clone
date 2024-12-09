import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'

const CommentDialog = ({open, setOpen}) => {

  return (
   <Dialog open={open}>
    <DialogContent onInteractOutside={()=> setOpen(false)}>

        <img  
        src="https://images.unsplash.com/photo-1732919258529-44f50088aefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
        alt="post_img" 
        />


        
    </DialogContent>
   </Dialog>
  )
}

export default CommentDialog
