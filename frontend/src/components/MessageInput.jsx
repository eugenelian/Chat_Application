import { useRef, useState } from "react";

import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Error if file is not an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Attempt to read image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    // Reset image preview and current
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      // Send message with text and image
      await sendMessage({ text: text.trim(), image: imagePreview });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message, please try again later.")
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            {/* Remove image button */}
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      {/* Form Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* Text Inputs */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:imput-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* File Inputs: Button calls input field through ref*/}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                               ${
                                 imagePreview
                                   ? "text-emerald-500"
                                   : "text-zinc-400"
                               }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          {/* Diable submit button if there are no text or no image attached */}
          <button
            type="submit"
            className="btn btn-circle items-center justify-center"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
