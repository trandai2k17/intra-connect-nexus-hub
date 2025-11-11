import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UploadZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: UploadZoneProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Upload className="h-5 w-5 text-primary" />
          Upload Excel File
        </CardTitle>
        <CardDescription>
          Upload master data Excel file containing Courses, Diaries, and Exam Results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-16 text-center transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/10 scale-105"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full p-6 ${isDragging ? 'bg-primary/20' : 'bg-muted'} transition-colors`}>
              <Upload className={`h-12 w-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isDragging ? "Drop your file here" : "Drag and drop your Excel file here"}
              </h3>
              <p className="text-muted-foreground mb-4">or</p>
            </div>
            <label htmlFor="file-upload">
              <Button variant="default" size="lg" className="cursor-pointer" asChild>
                <span>
                  <Upload className="mr-2 h-5 w-5" />
                  Browse Files
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={onFileSelect}
              />
            </label>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <span>Supported: .xlsx, .xls</span>
              <span>•</span>
              <span>Max size: 10MB</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
