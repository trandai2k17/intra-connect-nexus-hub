export interface UploadHistory {
  id: string;
  filename: string;
  size: number;
  uploadDate: Date;
  modifiedDate: Date;
  status: 'pending' | 'processed' | 'failed';
  rowCount?: number;
}

export interface CourseData {
  courseCode: string;
  courseName: string;
  startDate: string;
  endDate: string;
}

export interface DiaryData {
  diaryCode: string;
  participantName: string;
  courseCode: string;
  attendanceDate: string;
  status: string;
  notes: string;
  location: string;
  instructor: string;
  duration: number;
  score: number;
}

export interface ExamResult {
  diaryCode: string;
  participantName: string;
  test1Name: string;
  test1Score: number;
  test1Evaluation: string;
  test2Name: string;
  test2Score: number;
  test2Evaluation: string;
  test3Name: string;
  test3Score: number;
  test3Evaluation: string;
}

export interface MasterDataPreview {
  fileId: string;
  filename: string;
  totalRows: number;
  courses: CourseData[];
  diaries: DiaryData[];
  examResults: ExamResult[];
  processedAt: Date;
}
