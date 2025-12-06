"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { ImagePlus } from "tiptap-image-plus";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Type,
  ImageIcon,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        placeholder,
      }),
      ImagePlus.configure({
        inline: true, // Allow inline images
        allowBase64: false,
        resizable: true, // Enable resizing
        uploadFn: async (file: File) => {
          // This won't be used as we handle uploads separately
          return "";
        },
        HTMLAttributes: {
          class: "rounded-md border border-border max-w-full h-auto",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 border rounded-md",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please select a JPG, PNG, WebP, or GIF image.');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('bearer_token');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Insert image at current cursor position with default width
        editor
          .chain()
          .focus()
          .setImage({ 
            src: data.fileUrl,
            width: 400, // Default width
            height: 'auto',
          })
          .run();
        toast.success('Image inserted! Click and drag corners to resize.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload image');
      }
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Upload error:', error);
    } finally {
      setIsUploadingImage(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageButtonClick = () => {
    // Ensure editor is focused before opening file picker
    if (editor) {
      editor.commands.focus();
    }
    fileInputRef.current?.click();
  };

  if (!editor) {
    return null;
  }

  const fontSizes = [
    { label: "Small", value: "0.875rem" },
    { label: "Normal", value: "1rem" },
    { label: "Large", value: "1.25rem" },
    { label: "X-Large", value: "1.5rem" },
    { label: "XX-Large", value: "2rem" },
  ];

  const fonts = [
    { label: "Default", value: "" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
  ];

  const colors = [
    "#000000",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  const highlights = [
    "#fef3c7",
    "#fecaca",
    "#fed7aa",
    "#d9f99d",
    "#bfdbfe",
    "#ddd6fe",
    "#fbcfe8",
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Mobile-Optimized Image Upload Button - Shown prominently at top on mobile */}
      <div className="md:hidden bg-primary/10 p-3 border-b">
        <Button
          type="button"
          size="lg"
          variant="default"
          onClick={handleImageButtonClick}
          disabled={isUploadingImage}
          className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 touch-manipulation text-base font-semibold"
        >
          {isUploadingImage ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span className="font-medium">Uploading Image...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">📷 Tap to Insert Image/Diagram</span>
            </>
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2 font-medium">
          Choose from camera or gallery • Position cursor first, then tap button
        </p>
      </div>

      {/* Toolbar - Horizontally scrollable on mobile */}
      <div className="bg-muted p-2 border-b overflow-x-auto">
        <div className="flex gap-1 items-center min-w-max">
          {/* Font Family */}
          <Select
            value={editor.getAttributes("textStyle").fontFamily || ""}
            onValueChange={(value) =>
              value
                ? editor.chain().focus().setFontFamily(value).run()
                : editor.chain().focus().unsetFontFamily().run()
            }
          >
            <SelectTrigger className="w-[140px] h-9 text-xs touch-manipulation">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value || "default"}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select
            onValueChange={(value) =>
              editor.chain().focus().setMark("textStyle", { fontSize: value }).run()
            }
          >
            <SelectTrigger className="w-[100px] h-9 text-xs touch-manipulation">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Headings */}
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Text Formatting */}
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bold") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("italic") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("underline") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("strike") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Text Color */}
          <div className="flex gap-0.5 items-center bg-background rounded px-1 flex-shrink-0">
            <Type className="w-3 h-3 text-muted-foreground" />
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform touch-manipulation"
                style={{ backgroundColor: color }}
                title={`Text color: ${color}`}
              />
            ))}
          </div>

          {/* Highlight Color */}
          <div className="flex gap-0.5 items-center bg-background rounded px-1 flex-shrink-0">
            <Highlighter className="w-3 h-3 text-muted-foreground" />
            {highlights.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform touch-manipulation"
                style={{ backgroundColor: color }}
                title={`Highlight: ${color}`}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Lists */}
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Quote and Code */}
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("code") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleCode().run()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Code"
          >
            <Code className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Desktop Image Upload Button - Only shown on desktop */}
          <div className="hidden md:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={handleImageButtonClick}
                    disabled={isUploadingImage}
                    className="h-9 px-3 bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap touch-manipulation"
                    title="Insert Graph/Diagram"
                  >
                    {isUploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                        <span className="text-xs">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4 mr-1.5" />
                        <span className="text-xs font-medium">Insert Image</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">Insert Graph/Diagram</p>
                  <p className="text-xs text-muted-foreground">Click to upload images, graphs, or diagrams</p>
                  <p className="text-xs text-muted-foreground">Position your cursor where you want it inserted</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />

          {/* Undo/Redo */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-9 w-9 p-0 flex-shrink-0 touch-manipulation"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className="rich-text-editor"
      />
      
      {/* Helpful Instructions */}
      <div className="bg-muted/50 px-3 py-2 border-t text-xs text-muted-foreground">
        <span className="hidden md:inline">💡 <span className="font-medium">Tip:</span> Position your cursor anywhere in the text and click <span className="font-medium">"Insert Image"</span> to add graphs/diagrams at that exact location</span>
        <span className="md:hidden">💡 <span className="font-medium">Mobile Tip:</span> Tap the big blue button above to insert images. The toolbar scrolls left/right for more options.</span>
      </div>
    </div>
  );
}