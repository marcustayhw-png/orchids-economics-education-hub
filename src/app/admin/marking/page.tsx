"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkingManager } from "@/components/admin/marking-manager";

export default function MarkingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Marking Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Submissions & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkingManager />
        </CardContent>
      </Card>
    </div>
  );
}
