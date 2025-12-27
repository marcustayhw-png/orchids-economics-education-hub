
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Loader2, Search, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface MarkingRequest {
  id: number;
  email: string;
  phone: string | null;
  level: string;
  subject: string | null;
  fileUrl: string;
  fileName: string | null;
  status: string;
  adminComments: string | null;
  markedFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export function MarkingManager() {
  const [requests, setRequests] = useState<MarkingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<MarkingRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingMarked, setIsUploadingMarked] = useState(false);

  // Form states for update
  const [status, setStatus] = useState("");
  const [adminComments, setAdminComments] = useState("");
  const [markedFileUrl, setMarkedFileUrl] = useState("");

      const fetchRequests = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("bearer_token");
          const headers: Record<string, string> = {};
          if (token && token !== "null" && token !== "undefined") {
            headers["Authorization"] = `Bearer ${token}`;
          }
          
          const res = await fetch("/api/marking-requests", {
            headers
          });
          if (res.ok) {
            const data = await res.json();
            setRequests(data);
          } else if (res.status === 401) {
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("Failed to fetch requests");
          }
        } catch (error) {
          toast.error("Error fetching requests");
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      fetchRequests();
    }, []);

    const handleOpenRequest = (request: MarkingRequest) => {
      setSelectedRequest(request);
      setStatus(request.status);
      setAdminComments(request.adminComments || "");
      setMarkedFileUrl(request.markedFileUrl || "");
    };

    const handleUpdate = async () => {
      if (!selectedRequest) return;
      setIsUpdating(true);
      try {
        const token = localStorage.getItem("bearer_token");
        const res = await fetch("/api/marking-requests", {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: selectedRequest.id,
            status,
            adminComments,
            markedFileUrl,
          }),
        });

        if (res.ok) {
          toast.success("Request updated successfully");
          fetchRequests();
          setSelectedRequest(null);
        } else {
          toast.error("Failed to update request");
        }
      } catch (error) {
        toast.error("Error updating request");
      } finally {
        setIsUpdating(false);
      }
    };

    const handleMarkedFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploadingMarked(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = localStorage.getItem("bearer_token");
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          setMarkedFileUrl(data.fileUrl);
          toast.success("Marked file uploaded");
        } else {
          toast.error(data.error || "Upload failed");
        }
      } catch (error) {
        toast.error("Upload error");
      } finally {
        setIsUploadingMarked(false);
      }
    };

  const filteredRequests = requests.filter(r => 
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'marking': return <Badge variant="outline" className="border-blue-500 text-blue-500">Marking</Badge>;
      case 'completed': return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email, level or subject..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchRequests}>
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No marking requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="text-sm font-medium">
                    {format(new Date(request.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{request.email}</span>
                      {request.phone && <span className="text-xs text-muted-foreground">{request.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>{request.level}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {request.subject || "No subject"}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenRequest(request)}>
                      View & Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Marking Request</DialogTitle>
            <DialogDescription>
              Review the submission and provide feedback.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Student Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="font-medium">{selectedRequest.email}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedRequest.phone || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Study Level</p>
                  <Badge variant="outline">{selectedRequest.level}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Submitted On</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{format(new Date(selectedRequest.createdAt), "PPP p")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Subject / Title</p>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {selectedRequest.subject || "Untitiled Submission"}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Original File</p>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href={selectedRequest.fileUrl} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">{selectedRequest.fileName || "View Document"}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </Button>
              </div>

              <hr />

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Update Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="marking">Marking in Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected / Invalid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback & Comments</label>
                  <Textarea
                    placeholder="Provide marking comments and advice for the student..."
                    rows={5}
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Marked File (Optional)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      className="hidden"
                      id="marked-file-upload"
                      onChange={handleMarkedFileUpload}
                      accept=".pdf,image/*"
                    />
                    <Button
                      variant="outline"
                      className="flex-1"
                      asChild
                      disabled={isUploadingMarked}
                    >
                      <label htmlFor="marked-file-upload" className="cursor-pointer">
                        {isUploadingMarked ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {markedFileUrl ? "Change Marked File" : "Upload Marked Version"}
                      </label>
                    </Button>
                    {markedFileUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={markedFileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  {markedFileUrl && <p className="text-xs text-muted-foreground">File uploaded: {markedFileUrl.split('/').pop()}</p>}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Upload(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
