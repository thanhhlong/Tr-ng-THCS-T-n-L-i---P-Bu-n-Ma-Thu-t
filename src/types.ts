export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'principal'
  | 'teacher'
  | 'homeroom_teacher'
  | 'student'
  | 'parent'
  | 'guest';

export interface User {
  id: string;
  code: string; // Mã GV / Mã HS / Mã PH / Mã NV
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string; // Tổ chuyên môn (e.g. Toán-Tin, Tự nhiên, Xã hội)
  subject?: string; // Bộ môn chính
  classId?: string; // Lớp phụ trách / Lớp học (e.g. 9A1)
  className?: string;
  childStudentId?: string; // Dành cho Phụ huynh: ID học sinh liên kết
  childName?: string;
  childClass?: string;
  status: 'active' | 'inactive';
}

export interface SchoolInfo {
  name: string;
  slogan: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  principal: string;
  establishedYear: number;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalParents: number;
  todayAttendanceRate: number;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g. 6A1, 9A1
  grade: 6 | 7 | 8 | 9;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  studentCount: number;
  roomNumber: string;
}

export interface Subject {
  id: string;
  name: string; // e.g. Toán, Ngữ văn, Tiếng Anh
  code: string;
  grade: number;
  periodsPerWeek: number;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  teacherName?: string;
  frequentScores: number[]; // Điểm thường xuyên (15p, miệng)
  midtermScore?: number; // Điểm giữa kỳ
  finalScore?: number; // Điểm cuối kỳ
  averageScore?: number; // Điểm trung bình môn
  evaluationNote?: string; // Nhận xét giáo viên
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  classId: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'excused' | 'unexcused'; // Có mặt, Vắng có phép, Vắng không phép
  note?: string;
}

export interface TimetableSlot {
  id: string;
  dayOfWeek: 'Thứ 2' | 'Thứ 3' | 'Thứ 4' | 'Thứ 5' | 'Thứ 6' | 'Thứ 7';
  period: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  session: 'sáng' | 'chiều';
  classId: string;
  className: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  roomNumber: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectName: string;
  classId?: string;
  className: string;
  teacherName?: string;
  assignedBy?: string;
  assignedDate?: string;
  createdDate?: string;
  dueDate: string;
  description: string;
  attachmentName?: string;
  attachmentUrl?: string;
  totalSubmitted?: number;
  submittedCount?: number;
  totalStudents: number;
  status?: 'active' | 'closed';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachmentName?: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'graded';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Hoạt động' | 'Tuyển sinh' | 'STEM' | 'Thành tích' | 'Sự kiện' | 'Thông báo';
  summary: string;
  content: string;
  publishedDate: string;
  author: string;
  imageUrl?: string;
  videoUrl?: string;
  attachmentName?: string;
  isFeatured?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  type: 'Lịch kiểm tra' | 'Lịch nghỉ' | 'Lịch họp phụ huynh' | 'Tuyển sinh' | 'Khẩn';
  date: string;
  targetRole: 'all' | 'teachers' | 'students' | 'parents';
  content: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Giáo án' | 'Đề kiểm tra' | 'Văn bản - Thông tư' | 'Tài liệu môn học' | 'Mẫu biểu';
  subjectName?: string;
  grade?: number;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip';
  fileSize: string;
  uploadedBy: string;
  uploadedDate: string;
  downloadCount: number;
  fileUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Học sinh' | 'Giáo viên' | 'Nhà trường';
  year: string;
  description: string;
  award: string;
  recipient: string;
  imageUrl?: string;
}

export interface ParentTeacherMessage {
  id: string;
  parentId: string;
  parentName: string;
  teacherId: string;
  teacherName: string;
  studentName: string;
  className: string;
  senderRole: 'parent' | 'teacher';
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface AiPromptItem {
  id: string;
  title: string;
  category:
    | 'Giáo án'
    | 'Đề kiểm tra'
    | 'Trò chơi'
    | 'STEM'
    | 'PowerPoint'
    | 'Học liệu'
    | 'Học sinh'
    | 'Phụ huynh'
    | 'Báo cáo'
    | 'Sáng kiến kinh nghiệm';
  description: string;
  promptText?: string;
  promptTemplate?: string;
  subjectHint?: string;
  gradeHint?: string;
  favoriteCount?: number;
  isFavorite?: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
