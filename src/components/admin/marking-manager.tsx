
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
          const res = await fetch("/api/marking-requests");
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
        const res = await fetch("/api/marking-requests", {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
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
        const res = await fetch("/api/upload", {
          method: "POST",
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <Input
            placeholder="Search by email, level or subject..."
            className="pl-12 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={fetchRequests} className="w-full sm:w-auto h-12 rounded-xl border-white/10 hover:bg-white/5 font-bold uppercase tracking-wider text-xs">
          Refresh List
        </Button>
      </div>

      <div className="hidden lg:block rounded-[1.5rem] border border-white/10 overflow-hidden bg-black/40">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="py-5 font-black uppercase tracking-wider text-[10px] text-white/40">Date</TableHead>
              <TableHead className="py-5 font-black uppercase tracking-wider text-[10px] text-white/40">Student</TableHead>
              <TableHead className="py-5 font-black uppercase tracking-wider text-[10px] text-white/40">Level</TableHead>
              <TableHead className="py-5 font-black uppercase tracking-wider text-[10px] text-white/40">Subject</TableHead>
              <TableHead className="py-5 font-black uppercase tracking-wider text-[10px] text-white/40">Status</TableHead>
              <TableHead className="py-5 text-right font-black uppercase tracking-wider text-[10px] text-white/40">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-white/40 font-bold uppercase tracking-widest text-xs">
                  No marking requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-white/[0.02] border-white/10 transition-colors group">
                  <TableCell className="text-xs font-bold text-white/60">
                    {format(new Date(request.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-white group-hover:text-primary transition-colors">{request.email}</span>
                      {request.phone && <span className="text-[10px] text-white/40 font-medium">{request.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-black uppercase">{request.level}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm font-medium text-white/60">
                    {request.subject || "No subject"}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenRequest(request)} className="rounded-lg hover:bg-primary hover:text-primary-foreground font-bold">
                      View & Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile & Tablet View */}
      <div className="lg:hidden grid gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No marking requests found.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="bg-white/[0.03] border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                    {format(new Date(request.createdAt), "MMM d, yyyy")}
                  </span>
                  {getStatusBadge(request.status)}
                </div>
                <div>
                  <p className="font-black text-lg text-white group-hover:text-primary transition-colors truncate">{request.email}</p>
                  <p className="text-xs text-white/40 font-medium truncate mt-1">
                    {request.subject || "No subject"}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-black uppercase">{request.level}</Badge>
                  <Button size="sm" onClick={() => handleOpenRequest(request)} className="rounded-xl px-6 font-black uppercase tracking-wider text-[10px]">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black border-white/10 text-white p-0 overflow-hidden rounded-[2rem]">
          <DialogHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Manage Marking Request</DialogTitle>
            <DialogDescription className="text-white/40 font-medium">
              Review the submission and provide feedback.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Student Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-bold">{selectedRequest.email}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-bold">{selectedRequest.phone || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Study Level</p>
                  <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary font-black uppercase">{selectedRequest.level}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Submitted On</p>
                  <div className="flex items-center gap-2 text-white/60 font-bold">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{format(new Date(selectedRequest.createdAt), "PPP p")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Subject / Title</p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white/80">
                  {selectedRequest.subject || "Untitiled Submission"}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Original File</p>
                <Button variant="outline" className="w-full h-14 justify-between bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 group" asChild>
                  <a href={selectedRequest.fileUrl} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-bold truncate">{selectedRequest.fileName || "View Document"}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                </Button>
              </div>

              <div className="h-px bg-white/5" />

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Update Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="marking">Marking in Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected / Invalid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Feedback & Comments</label>
                  <Textarea
                    placeholder="Provide marking comments and advice for the student..."
                    className="bg-white/5 border-white/10 rounded-2xl min-h-[150px] font-medium p-4 focus:ring-primary"
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Upload Marked File (Optional)</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      className="hidden"
                      id="marked-file-upload"
                      onChange={handleMarkedFileUpload}
                      accept=".pdf,image/*"
                    />
                    <Button
                      variant="outline"
                      className="flex-1 h-12 bg-white/5 border-white/10 rounded-xl hover:bg-white/10 font-bold"
                      asChild
                      disabled={isUploadingMarked}
                    >
                      <label htmlFor="marked-file-upload" className="cursor-pointer">
                        {isUploadingMarked ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2 text-primary" />
                        )}
                        {markedFileUrl ? "Change Marked File" : "Upload Marked Version"}
                      </label>
                    </Button>
                    {markedFileUrl && (
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10" asChild>
                        <a href={markedFileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-8 border-t border-white/5 bg-white/[0.02] flex flex-col sm:flex-row gap-4">
            <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold uppercase tracking-wider text-xs" onClick={() => setSelectedRequest(null)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isUpdating} className="flex-1 h-12 rounded-xl font-black uppercase tracking-wider text-xs shadow-lg shadow-primary/20">
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
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
