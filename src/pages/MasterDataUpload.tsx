import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { UploadHistory, MasterDataPreview } from "@/types/masterData";
import { mockUploadHistory, mockPreviewData } from "@/utils/mockMasterData";
import { UploadZone } from "@/components/master-data/UploadZone";
import { FileHistoryTable } from "@/components/master-data/FileHistoryTable";
import { DataPreviewDialog } from "@/components/master-data/DataPreviewDialog";

export default function MasterDataUpload() {
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>(mockUploadHistory);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<MasterDataPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
        
        toast({
          title: "Processing complete",
          description: `${file.name} has been processed successfully.`,
        });
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
    // In real app, fetch data based on fileId
    setCurrentPreview(mockPreviewData);
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
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Master Data Upload</h1>
        <p className="text-lg text-muted-foreground">
          Upload Excel files to import course data, participant diaries, and exam results into the system
        </p>
      </div>

      {/* Upload Section */}
      <UploadZone
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileSelect={handleFileUpload}
      />

      {/* Upload History */}
      <FileHistoryTable
        uploadHistory={uploadHistory}
        selectedFiles={selectedFiles}
        onSelectAll={handleSelectAll}
        onSelectFile={handleSelectFile}
        onView={handleView}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      {/* Preview Dialog */}
      <DataPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        preview={currentPreview}
        onConfirm={handleConfirmUpload}
      />
    </div>
  );
}
