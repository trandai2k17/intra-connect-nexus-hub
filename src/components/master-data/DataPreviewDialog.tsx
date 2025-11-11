import { CheckCircle, FileSpreadsheet, Users, BookOpen, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MasterDataPreview } from "@/types/masterData";

interface DataPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: MasterDataPreview | null;
  onConfirm: () => void;
}

export function DataPreviewDialog({
  open,
  onOpenChange,
  preview,
  onConfirm,
}: DataPreviewDialogProps) {
  if (!preview) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            Master Data Preview
          </DialogTitle>
          <DialogDescription>
            Review the extracted data before importing to the database
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {preview.totalRows.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Total Rows</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/50">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {preview.courses.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/50">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {preview.diaries.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Diaries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/50">
                    <ClipboardCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {preview.examResults.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Exam Results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables */}
          <ScrollArea className="h-[450px] rounded-md border">
            <Tabs defaultValue="courses" className="w-full">
              <div className="sticky top-0 bg-background z-10 border-b px-4 pt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="courses" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="diaries" className="gap-2">
                    <Users className="h-4 w-4" />
                    Diaries
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Exam Results
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="courses" className="mt-0 p-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead className="w-32">Start Date</TableHead>
                        <TableHead className="w-32">End Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.courses.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono font-semibold text-primary">
                            {course.courseCode}
                          </TableCell>
                          <TableCell className="font-medium">{course.courseName}</TableCell>
                          <TableCell className="text-muted-foreground">{course.startDate}</TableCell>
                          <TableCell className="text-muted-foreground">{course.endDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="diaries" className="mt-0 p-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Diary Code</TableHead>
                        <TableHead className="min-w-40">Participant</TableHead>
                        <TableHead className="w-28">Course</TableHead>
                        <TableHead className="w-28">Date</TableHead>
                        <TableHead className="w-24">Status</TableHead>
                        <TableHead className="w-32">Location</TableHead>
                        <TableHead className="w-32">Instructor</TableHead>
                        <TableHead className="w-24 text-right">Duration</TableHead>
                        <TableHead className="w-20 text-right">Score</TableHead>
                        <TableHead className="min-w-48">Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.diaries.map((diary, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono font-semibold text-primary">
                            {diary.diaryCode}
                          </TableCell>
                          <TableCell className="font-medium">{diary.participantName}</TableCell>
                          <TableCell className="font-mono text-sm">{diary.courseCode}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{diary.attendanceDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="whitespace-nowrap">{diary.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{diary.location}</TableCell>
                          <TableCell className="text-muted-foreground">{diary.instructor}</TableCell>
                          <TableCell className="text-right font-medium">{diary.duration} min</TableCell>
                          <TableCell className="text-right font-bold text-primary">{diary.score}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{diary.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="exams" className="mt-0 p-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Diary Code</TableHead>
                        <TableHead className="min-w-40">Participant</TableHead>
                        <TableHead className="min-w-32">Test 1</TableHead>
                        <TableHead className="w-20 text-right">Score 1</TableHead>
                        <TableHead className="w-28">Eval 1</TableHead>
                        <TableHead className="min-w-32">Test 2</TableHead>
                        <TableHead className="w-20 text-right">Score 2</TableHead>
                        <TableHead className="w-28">Eval 2</TableHead>
                        <TableHead className="min-w-32">Test 3</TableHead>
                        <TableHead className="w-20 text-right">Score 3</TableHead>
                        <TableHead className="w-28">Eval 3</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.examResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono font-semibold text-primary">
                            {result.diaryCode}
                          </TableCell>
                          <TableCell className="font-medium">{result.participantName}</TableCell>
                          <TableCell className="text-sm">{result.test1Name}</TableCell>
                          <TableCell className="text-right font-bold text-primary">{result.test1Score}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{result.test1Evaluation}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{result.test2Name}</TableCell>
                          <TableCell className="text-right font-bold text-primary">{result.test2Score}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{result.test2Evaluation}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{result.test3Name}</TableCell>
                          <TableCell className="text-right font-bold text-primary">{result.test3Score}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{result.test3Evaluation}</Badge>
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
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              File: <span className="font-medium">{preview.filename}</span>
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onConfirm} size="lg" className="gap-2">
                <CheckCircle className="h-5 w-5" />
                Confirm & Import Data
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
