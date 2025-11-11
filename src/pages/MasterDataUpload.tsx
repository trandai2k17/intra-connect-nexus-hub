import { useState } from "react";
import { Upload, Download, Trash2, Eye, CheckCircle, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { UploadHistory, MasterDataPreview } from "@/types/masterData";

// Mock data for demonstration
const mockHistory: UploadHistory[] = [
  {
    id: "1",
    filename: "training_master_data_2024_Q1.xlsx",
    size: 2456789,
    uploadDate: new Date("2024-03-15T10:30:00"),
    modifiedDate: new Date("2024-03-15T10:30:00"),
    status: "processed",
    rowCount: 1250,
  },
  {
    id: "2",
    filename: "course_data_jan_2024.xlsx",
    size: 1234567,
    uploadDate: new Date("2024-02-20T14:20:00"),
    modifiedDate: new Date("2024-02-20T14:20:00"),
    status: "processed",
    rowCount: 850,
  },
];

const mockPreview: MasterDataPreview = {
  fileId: "1",
  filename: "training_master_data_2024_Q1.xlsx",
  totalRows: 1250,
  processedAt: new Date(),
  courses: [
    {
      courseCode: "NG-001",
      courseName: "New Graduate Training Program",
      startDate: "2024-03-01",
      endDate: "2024-05-30",
    },
    {
      courseCode: "RPD-102",
      courseName: "Removable Partial Denture Advanced",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
    },
  ],
  diaries: [
    {
      diaryCode: "D-2024-001",
      participantName: "Nguyen Van A",
      courseCode: "NG-001",
      attendanceDate: "2024-03-05",
      status: "Present",
      notes: "Good progress",
      location: "Room 101",
      instructor: "Dr. Tran",
      duration: 120,
      score: 85,
    },
    {
      diaryCode: "D-2024-002",
      participantName: "Le Thi B",
      courseCode: "RPD-102",
      attendanceDate: "2024-03-16",
      status: "Present",
      notes: "Excellent performance",
      location: "Lab 2",
      instructor: "Dr. Pham",
      duration: 180,
      score: 92,
    },
  ],
  examResults: [
    {
      diaryCode: "D-2024-001",
      participantName: "Nguyen Van A",
      test1Name: "Theory Test",
      test1Score: 85,
      test1Evaluation: "Good",
      test2Name: "Practical Test",
      test2Score: 88,
      test2Evaluation: "Very Good",
      test3Name: "Final Assessment",
      test3Score: 90,
      test3Evaluation: "Excellent",
    },
  ],
};

export default function MasterDataUpload() {
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>(mockHistory);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<MasterDataPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "File uploaded successfully",
        description: `Processing ${file.name}...`,
      });
      
      // Simulate file processing
      setTimeout(() => {
        const newFile: UploadHistory = {
          id: Date.now().toString(),
          filename: file.name,
          size: file.size,
          uploadDate: new Date(),
          modifiedDate: new Date(),
          status: "processed",
          rowCount: Math.floor(Math.random() * 1000) + 500,
        };
        setUploadHistory([newFile, ...uploadHistory]);
      }, 1500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.match(/\.(xlsx|xls)$/)) {
        const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileUpload(event);
      }
    }
  };

  const handleView = (fileId: string) => {
    setCurrentPreview(mockPreview);
    setPreviewOpen(true);
  };

  const handleDownload = (filename: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${filename}...`,
    });
  };

  const handleDelete = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to delete",
        variant: "destructive",
      });
      return;
    }
    
    setUploadHistory(uploadHistory.filter((file) => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    toast({
      title: "Files deleted",
      description: `${selectedFiles.length} file(s) deleted successfully`,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(uploadHistory.map((file) => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    }
  };

  const handleConfirmUpload = () => {
    if (!currentPreview) return;
    
    toast({
      title: "Data import confirmed",
      description: `Processing ${currentPreview.totalRows} rows into database...`,
    });
    
    // Simulate data import
    setTimeout(() => {
      toast({
        title: "Import completed",
        description: `Successfully imported ${currentPreview.courses.length} courses, ${currentPreview.diaries.length} diaries, and ${currentPreview.examResults.length} exam results.`,
      });
      setPreviewOpen(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Master Data Upload</h1>
          <p className="text-muted-foreground mt-2">
            Upload Excel files to import course data, participant diaries, and exam results
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Upload Excel File
          </CardTitle>
          <CardDescription>
            Upload your master data Excel file. The system will extract 3 tables: Courses, Diaries, and Exam Results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Drag and drop your Excel file here
            </h3>
            <p className="text-muted-foreground mb-4">or</p>
            <label htmlFor="file-upload">
              <Button variant="default" className="cursor-pointer" asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
            </label>
            <p className="text-sm text-muted-foreground mt-4">
              Supported formats: .xlsx, .xls (Max size: 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>
                View and manage previously uploaded files
              </CardDescription>
            </div>
            {selectedFiles.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleDelete}>
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
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Filename</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Modified Date</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadHistory.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={(checked) =>
                          handleSelectFile(file.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        className="font-medium text-primary hover:underline text-left"
                        onClick={() => handleView(file.id)}
                      >
                        {file.filename}
                      </button>
                    </TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>{formatDate(file.uploadDate)}</TableCell>
                    <TableCell>{formatDate(file.modifiedDate)}</TableCell>
                    <TableCell>{file.rowCount?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          file.status === "processed"
                            ? "default"
                            : file.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {file.status === "processed" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {file.status === "failed" && (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        )}
                        {file.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(file.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file.filename)}
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

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Master Data Preview</DialogTitle>
            <DialogDescription>
              Review the extracted data before importing to the database
            </DialogDescription>
          </DialogHeader>

          {currentPreview && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {currentPreview.totalRows}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Rows</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {currentPreview.courses.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {currentPreview.diaries.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Diaries</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {currentPreview.examResults.length}
                      </p>
                      <p className="text-sm text-muted-foreground">Exam Results</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Tables */}
              <ScrollArea className="h-[500px]">
                <Tabs defaultValue="courses" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="diaries">Diaries</TabsTrigger>
                    <TabsTrigger value="exams">Exam Results</TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course Code</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentPreview.courses.map((course, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {course.courseCode}
                              </TableCell>
                              <TableCell>{course.courseName}</TableCell>
                              <TableCell>{course.startDate}</TableCell>
                              <TableCell>{course.endDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="diaries" className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Diary Code</TableHead>
                            <TableHead>Participant</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentPreview.diaries.map((diary, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {diary.diaryCode}
                              </TableCell>
                              <TableCell>{diary.participantName}</TableCell>
                              <TableCell>{diary.courseCode}</TableCell>
                              <TableCell>{diary.attendanceDate}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{diary.status}</Badge>
                              </TableCell>
                              <TableCell>{diary.location}</TableCell>
                              <TableCell>{diary.instructor}</TableCell>
                              <TableCell>{diary.duration} min</TableCell>
                              <TableCell>{diary.score}</TableCell>
                              <TableCell className="max-w-xs truncate">
                                {diary.notes}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="exams" className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Diary Code</TableHead>
                            <TableHead>Participant</TableHead>
                            <TableHead>Test 1</TableHead>
                            <TableHead>Score 1</TableHead>
                            <TableHead>Eval 1</TableHead>
                            <TableHead>Test 2</TableHead>
                            <TableHead>Score 2</TableHead>
                            <TableHead>Eval 2</TableHead>
                            <TableHead>Test 3</TableHead>
                            <TableHead>Score 3</TableHead>
                            <TableHead>Eval 3</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentPreview.examResults.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {result.diaryCode}
                              </TableCell>
                              <TableCell>{result.participantName}</TableCell>
                              <TableCell>{result.test1Name}</TableCell>
                              <TableCell>{result.test1Score}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {result.test1Evaluation}
                                </Badge>
                              </TableCell>
                              <TableCell>{result.test2Name}</TableCell>
                              <TableCell>{result.test2Score}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {result.test2Evaluation}
                                </Badge>
                              </TableCell>
                              <TableCell>{result.test3Name}</TableCell>
                              <TableCell>{result.test3Score}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {result.test3Evaluation}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmUpload}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm & Import Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
