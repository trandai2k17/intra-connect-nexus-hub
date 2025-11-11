import { Download, Eye, Trash2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadHistory } from "@/types/masterData";

interface FileHistoryTableProps {
  uploadHistory: UploadHistory[];
  selectedFiles: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectFile: (fileId: string, checked: boolean) => void;
  onView: (fileId: string) => void;
  onDownload: (filename: string) => void;
  onDelete: () => void;
}

export function FileHistoryTable({
  uploadHistory,
  selectedFiles,
  onSelectAll,
  onSelectFile,
  onView,
  onDownload,
  onDelete,
}: FileHistoryTableProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "pending":
        return <Clock className="mr-1 h-3 w-3" />;
      case "failed":
        return <AlertCircle className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "processed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (uploadHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>No files uploaded yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Clock className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Upload History</h3>
            <p className="text-muted-foreground max-w-sm">
              Upload your first Excel file to see it appear here. All your upload history will be stored and accessible.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Upload History</CardTitle>
            <CardDescription>
              {uploadHistory.length} file{uploadHistory.length !== 1 ? 's' : ''} uploaded
            </CardDescription>
          </div>
          {selectedFiles.length > 0 && (
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedFiles.length})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedFiles.length === uploadHistory.length &&
                      uploadHistory.length > 0
                    }
                    onCheckedChange={onSelectAll}
                  />
                </TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Modified Date</TableHead>
                <TableHead className="text-right">Rows</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadHistory.map((file) => (
                <TableRow key={file.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={(checked) =>
                        onSelectFile(file.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      className="font-medium text-primary hover:underline text-left transition-colors"
                      onClick={() => onView(file.id)}
                    >
                      {file.filename}
                    </button>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatFileSize(file.size)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(file.uploadDate)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(file.modifiedDate)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {file.rowCount?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(file.status)}>
                      {getStatusIcon(file.status)}
                      {file.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(file.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(file.filename)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
