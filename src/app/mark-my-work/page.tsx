
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle2, AlertCircle, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

export default function MarkMyWorkPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFileUrl(data.fileUrl);
        toast.success("File uploaded successfully");
      } else {
        toast.error(data.error || "Failed to upload file");
      }
    } catch (error) {
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileUrl) {
      toast.error("Please upload your work first");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      phone: formData.get("phone"),
      level: formData.get("level"),
      subject: formData.get("subject"),
      fileUrl: fileUrl,
      fileName: file?.name,
    };

    try {
      const res = await fetch("/api/marking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Work submitted for marking!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to submit request");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Submission Received!</CardTitle>
            <CardDescription>
              Your work has been successfully submitted for marking. I will review it and get back to you via email within 3-5 working days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => window.location.href = "/"}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get Your Work Marked</h1>
          <p className="text-lg text-muted-foreground">
            Submit your essays or CSQ answers for professional marking and personalized feedback.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Submit Your Work</CardTitle>
            <CardDescription>
              Fill in your details and upload your work (PDF or Image, max 10MB).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="e.g. +65 9123 4567" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="level">Study Level *</Label>
                  <Select name="level" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secondary">Secondary School</SelectItem>
                      <SelectItem value="JC H1">JC H1 Economics</SelectItem>
                      <SelectItem value="JC H2">JC H2 Economics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Topic / Question Title</Label>
                  <Input id="subject" name="subject" placeholder="e.g. Market Failure Essay" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Your Work *</Label>
                <div className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary'}
                `}>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
                        <p className="text-sm font-medium">Uploading...</p>
                      </div>
                    ) : file ? (
                      <div className="flex flex-col items-center">
                        <FileText className="w-10 h-10 text-primary mb-2" />
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF or Images up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By submitting your work, you agree to receive feedback via the provided email. 
                  Your personal information will be kept confidential and used only for communication regarding your submission.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg" 
                disabled={isSubmitting || isUploading || !fileUrl}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Marking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
