import {
  SchoolInfo,
  User,
  ClassRoom,
  Subject,
  GradeEntry,
  AttendanceRecord,
  TimetableSlot,
  Assignment,
  Submission,
  NewsArticle,
  Announcement,
  DocumentItem,
  Achievement,
  ParentTeacherMessage,
  AiPromptItem,
} from '../types';

export const mockSchoolInfo: SchoolInfo = {
  name: 'Trường THCS Tân Lợi',
  slogan: 'Dạy Tốt — Học Tốt',
  address: 'Phường Tân Lợi, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk',
  phone: '0262.3951.999',
  email: 'thcstanloi@bmt.edu.vn',
  website: 'https://thcstanloi.edu.vn',
  principal: 'ThS. Nguyễn Minh Trí',
  establishedYear: 1999,
  totalStudents: 1250,
  totalTeachers: 85,
  totalClasses: 32,
  totalParents: 1200,
  todayAttendanceRate: 98.6,
};

export const demoUsers: User[] = [
  {
    id: 'u-bgh01',
    code: 'BGH01',
    name: 'ThS. Nguyễn Minh Trí',
    email: 'minhtri.bgh@tanloi.edu.vn',
    role: 'principal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    phone: '0903.112.233',
    department: 'Ban Giám Hiệu',
    subject: 'Quản lý giáo dục',
    status: 'active',
  },
  {
    id: 'u-gv101',
    code: 'GV101',
    name: 'Thầy Trần Quốc Bảo',
    email: 'quocbao.toan@tanloi.edu.vn',
    role: 'homeroom_teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '0918.445.566',
    department: 'Tổ Toán - Tin',
    subject: 'Toán học',
    classId: 'c-9a1',
    className: '9A1',
    status: 'active',
  },
  {
    id: 'u-gv102',
    code: 'GV102',
    name: 'Cô Lê Thu Trang',
    email: 'thutrang.van@tanloi.edu.vn',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    phone: '0982.778.899',
    department: 'Tổ Ngữ Văn - GDCD',
    subject: 'Ngữ văn',
    status: 'active',
  },
  {
    id: 'u-hs901',
    code: 'HS901',
    name: 'Nguyễn Văn An',
    email: 'vanan.hs9a1@tanloi.edu.vn',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    phone: '0938.990.112',
    classId: 'c-9a1',
    className: '9A1',
    status: 'active',
  },
  {
    id: 'u-ph901',
    code: 'PH901',
    name: 'Bác Nguyễn Văn Bình',
    email: 'vanbinh.ph9a1@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    phone: '0908.889.900',
    childStudentId: 'u-hs901',
    childName: 'Nguyễn Văn An',
    childClass: '9A1',
    status: 'active',
  },
  {
    id: 'u-guest',
    code: 'GUEST',
    name: 'Khách Ghé Thăm Website',
    email: 'guest@tanloi.edu.vn',
    role: 'guest',
    status: 'active',
  },
];

export const mockClasses: ClassRoom[] = [
  { id: 'c-6a1', name: '6A1', grade: 6, homeroomTeacherId: 'u-gv103', homeroomTeacherName: 'Cô Nguyễn Mai Hương', studentCount: 40, roomNumber: 'P.101' },
  { id: 'c-6a2', name: '6A2', grade: 6, homeroomTeacherId: 'u-gv104', homeroomTeacherName: 'Thầy Hoàng Văn Hải', studentCount: 38, roomNumber: 'P.102' },
  { id: 'c-7a1', name: '7A1', grade: 7, homeroomTeacherId: 'u-gv105', homeroomTeacherName: 'Cô Phạm Thanh Hà', studentCount: 42, roomNumber: 'P.201' },
  { id: 'c-7a2', name: '7A2', grade: 7, homeroomTeacherId: 'u-gv106', homeroomTeacherName: 'Thầy Đỗ Minh Đức', studentCount: 41, roomNumber: 'P.202' },
  { id: 'c-8a1', name: '8A1', grade: 8, homeroomTeacherId: 'u-gv107', homeroomTeacherName: 'Cô Bùi Bích Phương', studentCount: 39, roomNumber: 'P.301' },
  { id: 'c-8a2', name: '8A2', grade: 8, homeroomTeacherId: 'u-gv108', homeroomTeacherName: 'Thầy Lê Anh Tuấn', studentCount: 40, roomNumber: 'P.302' },
  { id: 'c-9a1', name: '9A1', grade: 9, homeroomTeacherId: 'u-gv101', homeroomTeacherName: 'Thầy Trần Quốc Bảo', studentCount: 40, roomNumber: 'P.401' },
  { id: 'c-9a2', name: '9A2', grade: 9, homeroomTeacherId: 'u-gv102', homeroomTeacherName: 'Cô Lê Thu Trang', studentCount: 39, roomNumber: 'P.402' },
];

export const mockSubjects: Subject[] = [
  { id: 'sub-toan', name: 'Toán học', code: 'TOAN', grade: 9, periodsPerWeek: 4 },
  { id: 'sub-van', name: 'Ngữ văn', code: 'VAN', grade: 9, periodsPerWeek: 4 },
  { id: 'sub-anh', name: 'Tiếng Anh', code: 'ANH', grade: 9, periodsPerWeek: 3 },
  { id: 'sub-ly', name: 'Vật lý', code: 'LY', grade: 9, periodsPerWeek: 2 },
  { id: 'sub-hoa', name: 'Hóa học', code: 'HOA', grade: 9, periodsPerWeek: 2 },
  { id: 'sub-sinh', name: 'Sinh học', code: 'SINH', grade: 9, periodsPerWeek: 2 },
  { id: 'sub-su', name: 'Lịch sử & Địa lý', code: 'SUDIA', grade: 9, periodsPerWeek: 3 },
  { id: 'sub-tin', name: 'Tin học', code: 'TIN', grade: 9, periodsPerWeek: 2 },
  { id: 'sub-congnghe', name: 'Công nghệ', code: 'CN', grade: 9, periodsPerWeek: 1 },
  { id: 'sub-gdcd', name: 'GDCD', code: 'GDCD', grade: 9, periodsPerWeek: 1 },
];

export const mockStudents9A1 = [
  { id: 'u-hs901', code: 'HS901', name: 'Nguyễn Văn An', gender: 'Nam', dob: '2011-04-12', parentName: 'Bác Nguyễn Văn Bình', parentPhone: '0908.889.900', status: 'Xuất sắc' },
  { id: 'u-hs902', code: 'HS902', name: 'Trần Thị Mai', gender: 'Nữ', dob: '2011-08-23', parentName: 'Chú Trần Văn Hùng', parentPhone: '0912.334.556', status: 'Giỏi' },
  { id: 'u-hs903', code: 'HS903', name: 'Lê Hoàng Nam', gender: 'Nam', dob: '2011-01-15', parentName: 'Cô Lê Thị Loan', parentPhone: '0933.111.222', status: 'Giỏi' },
  { id: 'u-hs904', code: 'HS904', name: 'Phạm Minh Khôi', gender: 'Nam', dob: '2011-09-30', parentName: 'Bác Phạm Quốc Cường', parentPhone: '0988.777.666', status: 'Khá' },
  { id: 'u-hs905', code: 'HS905', name: 'Vũ Ngọc Bích', gender: 'Nữ', dob: '2011-12-05', parentName: 'Cô Vũ Thị Thu', parentPhone: '0909.555.444', status: 'Xuất sắc' },
  { id: 'u-hs906', code: 'HS906', name: 'Đặng Tuấn Anh', gender: 'Nam', dob: '2011-03-18', parentName: 'Chú Đặng Văn Lâm', parentPhone: '0977.123.456', status: 'Khá' },
  { id: 'u-hs907', code: 'HS907', name: 'Bùi Phương Thảo', gender: 'Nữ', dob: '2011-06-22', parentName: 'Bác Bùi Văn Thành', parentPhone: '0944.888.999', status: 'Giỏi' },
  { id: 'u-hs908', code: 'HS908', name: 'Hoàng Bảo Long', gender: 'Nam', dob: '2011-10-10', parentName: 'Chú Hoàng Văn Nam', parentPhone: '0918.000.111', status: 'Khá' },
];

export const mockGrades: GradeEntry[] = [
  {
    id: 'g-901-toan',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    subjectId: 'sub-toan',
    subjectName: 'Toán học',
    frequentScores: [9.0, 9.5, 9.0],
    midtermScore: 9.5,
    finalScore: 9.8,
    averageScore: 9.5,
    evaluationNote: 'Tư duy toán học rất sắc bén, luôn giải quyết bài tập nâng cao xuất sắc.',
  },
  {
    id: 'g-901-van',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    subjectId: 'sub-van',
    subjectName: 'Ngữ văn',
    frequentScores: [8.5, 8.0, 8.5],
    midtermScore: 8.5,
    finalScore: 8.8,
    averageScore: 8.5,
    evaluationNote: 'Cảm thụ văn học tốt, bài viết lập luận chặt chẽ.',
  },
  {
    id: 'g-901-anh',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    subjectId: 'sub-anh',
    subjectName: 'Tiếng Anh',
    frequentScores: [9.0, 9.0, 9.5],
    midtermScore: 9.0,
    finalScore: 9.5,
    averageScore: 9.2,
    evaluationNote: 'Phát âm tự nhiên, giao tiếp tự tin và nắm chắc ngữ pháp.',
  },
  {
    id: 'g-901-ly',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    subjectId: 'sub-ly',
    subjectName: 'Vật lý',
    frequentScores: [8.5, 9.0],
    midtermScore: 9.0,
    finalScore: 9.0,
    averageScore: 8.9,
    evaluationNote: 'Hăng hái làm thí nghiệm và phát biểu.',
  },
  {
    id: 'g-901-hoa',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    subjectId: 'sub-hoa',
    subjectName: 'Hóa học',
    frequentScores: [9.0, 9.5],
    midtermScore: 9.5,
    finalScore: 9.0,
    averageScore: 9.2,
    evaluationNote: 'Cân bằng phương trình nhanh và chính xác.',
  },
  {
    id: 'g-902-toan',
    studentId: 'u-hs902',
    studentName: 'Trần Thị Mai',
    subjectId: 'sub-toan',
    subjectName: 'Toán học',
    frequentScores: [8.0, 8.5, 8.0],
    midtermScore: 8.5,
    finalScore: 8.5,
    averageScore: 8.3,
    evaluationNote: 'Chăm chỉ, cần rèn luyện thêm bài tập hình học không gian.',
  },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs901', studentName: 'Nguyễn Văn An', status: 'present' },
  { id: 'att-2', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs902', studentName: 'Trần Thị Mai', status: 'present' },
  { id: 'att-3', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs903', studentName: 'Lê Hoàng Nam', status: 'present' },
  { id: 'att-4', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs904', studentName: 'Phạm Minh Khôi', status: 'excused', note: 'Sốt nhẹ, phụ huynh đã xin phép' },
  { id: 'att-5', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs905', studentName: 'Vũ Ngọc Bích', status: 'present' },
  { id: 'att-6', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs906', studentName: 'Đặng Tuấn Anh', status: 'present' },
  { id: 'att-7', date: '2026-08-10', classId: 'c-9a1', studentId: 'u-hs907', studentName: 'Bùi Phương Thảo', status: 'present' },
];

export const mockTimetable9A1: TimetableSlot[] = [
  { id: 'tt-1', dayOfWeek: 'Thứ 2', period: 1, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Chào cờ / SHDC', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'Sân trường' },
  { id: 'tt-2', dayOfWeek: 'Thứ 2', period: 2, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Toán học', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'P.401' },
  { id: 'tt-3', dayOfWeek: 'Thứ 2', period: 3, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Ngữ văn', teacherId: 'u-gv102', teacherName: 'Cô Lê Thu Trang', roomNumber: 'P.401' },
  { id: 'tt-4', dayOfWeek: 'Thứ 2', period: 4, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Tiếng Anh', teacherId: 'u-gv109', teacherName: 'Thầy Phạm Đức Anh', roomNumber: 'P.401' },
  { id: 'tt-5', dayOfWeek: 'Thứ 2', period: 5, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Vật lý', teacherId: 'u-gv110', teacherName: 'Cô Hoàng Mai Anh', roomNumber: 'P.Thí nghiệm' },

  { id: 'tt-6', dayOfWeek: 'Thứ 3', period: 1, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Toán học', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'P.401' },
  { id: 'tt-7', dayOfWeek: 'Thứ 3', period: 2, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Toán học', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'P.401' },
  { id: 'tt-8', dayOfWeek: 'Thứ 3', period: 3, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Hóa học', teacherId: 'u-gv111', teacherName: 'Thầy Vũ Văn Khiêm', roomNumber: 'P.Hóa học' },
  { id: 'tt-9', dayOfWeek: 'Thứ 3', period: 4, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Sinh học', teacherId: 'u-gv112', teacherName: 'Cô Nguyễn Kim Anh', roomNumber: 'P.Sinh học' },

  { id: 'tt-10', dayOfWeek: 'Thứ 4', period: 1, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Ngữ văn', teacherId: 'u-gv102', teacherName: 'Cô Lê Thu Trang', roomNumber: 'P.401' },
  { id: 'tt-11', dayOfWeek: 'Thứ 4', period: 2, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Ngữ văn', teacherId: 'u-gv102', teacherName: 'Cô Lê Thu Trang', roomNumber: 'P.401' },
  { id: 'tt-12', dayOfWeek: 'Thứ 4', period: 3, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Lịch sử & Địa lý', teacherId: 'u-gv113', teacherName: 'Cô Trịnh Ngọc Hoa', roomNumber: 'P.401' },
  { id: 'tt-13', dayOfWeek: 'Thứ 4', period: 4, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Tin học', teacherId: 'u-gv114', teacherName: 'Thầy Ngô Văn Tân', roomNumber: 'P.Máy tính 1' },

  { id: 'tt-14', dayOfWeek: 'Thứ 5', period: 1, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Tiếng Anh', teacherId: 'u-gv109', teacherName: 'Thầy Phạm Đức Anh', roomNumber: 'P.401' },
  { id: 'tt-15', dayOfWeek: 'Thứ 5', period: 2, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Toán học', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'P.401' },
  { id: 'tt-16', dayOfWeek: 'Thứ 5', period: 3, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Công nghệ', teacherId: 'u-gv115', teacherName: 'Cô Lâm Thị Yến', roomNumber: 'P.401' },
  { id: 'tt-17', dayOfWeek: 'Thứ 5', period: 4, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'GDCD', teacherId: 'u-gv116', teacherName: 'Thầy Đỗ Tiến Dũng', roomNumber: 'P.401' },

  { id: 'tt-18', dayOfWeek: 'Thứ 6', period: 1, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Vật lý', teacherId: 'u-gv110', teacherName: 'Cô Hoàng Mai Anh', roomNumber: 'P.401' },
  { id: 'tt-19', dayOfWeek: 'Thứ 6', period: 2, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Tiếng Anh', teacherId: 'u-gv109', teacherName: 'Thầy Phạm Đức Anh', roomNumber: 'P.401' },
  { id: 'tt-20', dayOfWeek: 'Thứ 6', period: 3, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Âm nhạc / Mỹ thuật', teacherId: 'u-gv117', teacherName: 'Cô Mai Lan', roomNumber: 'P.Nghệ thuật' },
  { id: 'tt-21', dayOfWeek: 'Thứ 6', period: 4, session: 'sáng', classId: 'c-9a1', className: '9A1', subjectName: 'Sinh hoạt lớp', teacherId: 'u-gv101', teacherName: 'Thầy Trần Quốc Bảo', roomNumber: 'P.401' },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Bài tập Đại số: Phương trình bậc hai và Hệ thức Vi-ét',
    subjectName: 'Toán học',
    classId: 'c-9a1',
    className: '9A1',
    teacherName: 'Thầy Trần Quốc Bảo',
    createdDate: '2026-08-08',
    dueDate: '2026-08-12',
    description: 'Hoàn thành bài tập 1 đến bài tập 5 trang 42 SGK Toán 9 Tập 2. Áp dụng định lý Vi-ét để tính nhẩm nghiệm và tìm tham số m.',
    attachmentName: 'De_Tap_Viet_Toan9.pdf',
    totalSubmitted: 38,
    totalStudents: 40,
  },
  {
    id: 'asg-2',
    title: 'Viết đoạn văn Nghị luận xã hội: Ý nghĩa của lòng biết ơn',
    subjectName: 'Ngữ văn',
    classId: 'c-9a1',
    className: '9A1',
    teacherName: 'Cô Lê Thu Trang',
    createdDate: '2026-08-07',
    dueDate: '2026-08-11',
    description: 'Viết đoạn văn khoảng 200 chữ trình bày suy nghĩ của em về truyền thống "Uống nước nhớ nguồn" và thái độ sống của tuổi trẻ hôm nay.',
    attachmentName: 'Huong_Dan_Nghi_Luan.docx',
    totalSubmitted: 40,
    totalStudents: 40,
  },
  {
    id: 'asg-3',
    title: 'Project STEM: Thiết kế Mô hình Chuông báo động đơn giản',
    subjectName: 'Vật lý',
    classId: 'c-9a1',
    className: '9A1',
    teacherName: 'Cô Hoàng Mai Anh',
    createdDate: '2026-08-05',
    dueDate: '2026-08-15',
    description: 'Làm việc theo nhóm (4-5 HS) dựng mạch điện công tắc dập chuông, quay video hoạt động 1 phút nộp lại.',
    attachmentName: 'STEM_Dien_Hoc.pdf',
    totalSubmitted: 25,
    totalStudents: 40,
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: 'subm-1',
    assignmentId: 'asg-1',
    studentId: 'u-hs901',
    studentName: 'Nguyễn Văn An',
    submittedAt: '2026-08-09 14:30',
    content: 'Em gửi bài giải chi tiết bài tập Phương trình bậc hai và Vi-ét qua file PDF ạ.',
    attachmentName: 'NguyenVanAn_BaiTapToan9.pdf',
    score: 10,
    feedback: 'Bài làm trình bày rất cẩn thận, lập luận logic và đúng hoàn toàn các đáp số.',
    status: 'graded',
  },
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Trường THCS Tân Lợi Tuyên Dương 12 Học Sinh Đạt Giải Học Sinh Giỏi Cấp Thành Phố',
    category: 'Thành tích',
    summary: 'Kỳ thi Học sinh giỏi cấp TP năm học 2025-2026 ghi dấu ấn rực rỡ với 3 giải Nhất môn Toán, 4 giải Nhì môn Ngữ Văn và 5 giải Ba các môn Khoa học Tự nhiên.',
    content: 'Sáng ngày 08/08/2026, trong không khí tưng bừng của lễ tuyên dương, Ban Giám hiệu nhà trường đã trao tặng giấy khen và học bổng cho 12 em học sinh xuất sắc khối 9. Đây là niềm tự hào to lớn của tập thể giáo viên và học sinh trường THCS Tân Lợi...',
    publishedDate: '2026-08-08',
    author: 'Ban Giám Hiệu',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
  },
  {
    id: 'news-2',
    title: 'Ngày Hội STEM & Sáng Tạo Trẻ 2026: Nơi Nâng Tầm Đam Mê Khoa Học',
    category: 'STEM',
    summary: 'Hơn 30 gian hàng triển lãm sản phẩm robot, mô hình nhà thông minh và các dự án năng lượng xanh do chính học sinh khối 6, 7, 8, 9 tự tay thiết kế.',
    content: 'Ngày hội STEM năm nay đã thu hút hơn 1.200 học sinh cùng đông đảo phụ huynh tham quan trải nghiệm. Các đề tài có tính thực tiễn cao như Hệ thống tưới cây tự động bằng năng lượng mặt trời, Robot dọn dẹp vệ sinh trường học...',
    publishedDate: '2026-08-05',
    author: 'Tổ KHTN & Công nghệ',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    isFeatured: true,
  },
  {
    id: 'news-3',
    title: 'Thông Báo Tuyển Sinh Lớp 6 Năm Học 2026 - 2027',
    category: 'Tuyển sinh',
    summary: 'Kế hoạch tuyển sinh vào lớp 6 trường THCS Tân Lợi với chỉ tiêu 360 học sinh cho 9 lớp học, trong đó có 2 lớp Tiếng Anh Tăng cường.',
    content: 'Trường THCS Tân Lợi chính thức thông báo phương thức tiếp nhận hồ sơ xét tuyển lớp 6 trực tuyến qua Cổng Dịch vụ công Giáo dục. Thời gian nhận hồ sơ từ 15/08 đến 25/08...',
    publishedDate: '2026-08-01',
    author: 'Hội đồng Tuyển sinh',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Lịch Kiểm Tra Khảo Sát Chất Lượng Đầu Năm Học Khối 6, 7, 8, 9',
    type: 'Lịch kiểm tra',
    date: '2026-08-10',
    targetRole: 'all',
    content: 'Nhà trường tổ chức kiểm tra định hướng đầu năm vào ngày 18/08/2026 với 3 môn: Toán, Ngữ Văn, Tiếng Anh. Đề nghị giáo viên bộ môn ôn tập cho học sinh.',
  },
  {
    id: 'ann-2',
    title: 'Lịch Họp Phụ Huynh Đầu Năm Học 2026 - 2027',
    type: 'Lịch họp phụ huynh',
    date: '2026-08-09',
    targetRole: 'parents',
    content: 'Trân trọng kính mời toàn thể phụ huynh học sinh tham dự họp mặt đầu năm lúc 08h00 Chủ Nhật ngày 16/08/2026 tại Phòng học các lớp.',
  },
  {
    id: 'ann-3',
    title: 'Thông Báo Lịch Tập Huấn Ứng Dụng Trợ Lý AI Trong Giảng Dạy Cho Giáo Viên',
    type: 'Khẩn',
    date: '2026-08-08',
    targetRole: 'teachers',
    content: 'Tất cả giáo viên tham dự buổi tập huấn "Khai thác AI Education Hub tạo Giáo án & Đề thi" lúc 14h00 chiều Thứ Sáu ngày 14/08 tại Hội trường A.',
  },
];

export const mockDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Kế hoạch giáo dục môn Toán 9 theo Công văn 5512/BGDĐT',
    category: 'Giáo án',
    subjectName: 'Toán học',
    grade: 9,
    fileType: 'docx',
    fileSize: '2.4 MB',
    uploadedBy: 'Thầy Trần Quốc Bảo',
    uploadedDate: '2026-08-02',
    downloadCount: 142,
  },
  {
    id: 'doc-2',
    title: 'Bộ Đề Thi Thử Vào Lớp 10 Môn Ngữ Văn Cấu Trúc Mới (Có Đáp Án)',
    category: 'Đề kiểm tra',
    subjectName: 'Ngữ văn',
    grade: 9,
    fileType: 'pdf',
    fileSize: '4.8 MB',
    uploadedBy: 'Cô Lê Thu Trang',
    uploadedDate: '2026-08-04',
    downloadCount: 310,
  },
  {
    id: 'doc-3',
    title: 'Văn bản số 3215/GDĐT về Hướng dẫn đánh giá học sinh THCS theo Thông tư 22/2021',
    category: 'Văn bản - Thông tư',
    fileType: 'pdf',
    fileSize: '1.2 MB',
    uploadedBy: 'Ban Giám Hiệu',
    uploadedDate: '2026-07-28',
    downloadCount: 89,
  },
  {
    id: 'doc-4',
    title: 'Slide Bài Giảng Điên Tử: Hiện Tượng Khúc Xạ Ánh Sáng - Vật Lý 9',
    category: 'Tài liệu môn học',
    subjectName: 'Vật lý',
    grade: 9,
    fileType: 'pptx',
    fileSize: '12.5 MB',
    uploadedBy: 'Cô Hoàng Mai Anh',
    uploadedDate: '2026-08-01',
    downloadCount: 205,
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Giải Nhất Toàn Đoàn Hội Thi Khoa Học Kỹ Thuật Cấp Thành Phố',
    category: 'Nhà trường',
    year: '2025 - 2026',
    description: 'Trường THCS Tân Lợi xuất sắc dành vương miện Toàn đoàn với 2 đề tài ứng dụng AI và năng lượng sạch.',
    award: 'Cờ Thi Đua Dẫn Đầu',
    recipient: 'Tập thể Trường THCS Tân Lợi',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'ach-2',
    title: 'Huy Chương Vàng Olympic Toán Học Trẻ Quốc Tế IMO Junior',
    category: 'Học sinh',
    year: '2025 - 2026',
    description: 'Em Nguyễn Văn An (Lớp 9A1) đạt điểm tuyệt đối 40/40 ở vòng thi chung kết tại Singapore.',
    award: 'Huy Chương Vàng',
    recipient: 'Nguyễn Văn An (Lớp 9A1)',
    imageUrl: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80&w=800',
  },
];

export const mockMessages: ParentTeacherMessage[] = [
  {
    id: 'msg-1',
    parentId: 'u-ph901',
    parentName: 'Bác Nguyễn Văn Bình',
    teacherId: 'u-gv101',
    teacherName: 'Thầy Trần Quốc Bảo',
    studentName: 'Nguyễn Văn An',
    className: '9A1',
    senderRole: 'parent',
    content: 'Chào thầy Bảo ạ, gia đình muốn xin phép thầy tư vấn thêm về định hướng đăng ký nguyện vọng thi lớp 10 chuyên Toán cho cháu An ạ.',
    timestamp: '2026-08-09 19:15',
    isRead: true,
  },
  {
    id: 'msg-2',
    parentId: 'u-ph901',
    parentName: 'Bác Nguyễn Văn Bình',
    teacherId: 'u-gv101',
    teacherName: 'Thầy Trần Quốc Bảo',
    studentName: 'Nguyễn Văn An',
    className: '9A1',
    senderRole: 'teacher',
    content: 'Chào bác Bình! Cháu An học Toán cực kỳ chắc chắn, nằm trong top 1% học sinh xuất sắc nhất khối. Thầy khuyên gia đình hoàn toàn tự tin đăng ký Chuyên Lê Hồng Phong / Chuyên Trần Đại Nghĩa cho cháu!',
    timestamp: '2026-08-09 19:40',
    isRead: true,
  },
];

export const mockAiPrompts: AiPromptItem[] = [
  {
    id: 'prm-1',
    title: 'Tạo Giáo Án Chuẩn Công Văn 5512 (MoET)',
    category: 'Giáo án',
    description: 'Tạo giáo án chi tiết 4 hoạt động (Mở đầu, Hình thành kiến thức, Luyện tập, Vận dụng) kèm Yêu cầu cần đạt.',
    promptTemplate: `Hãy soạn một giáo án môn [MÔN HỌC] khối [KHỐI] bài "[TÊN BÀI HỌC]" thời lượng [SỐ TIẾT] tiết theo định hướng phát triển năng lực chuẩn Công văn 5512/BGDĐT.
Bao gồm:
1. MỤC TIÊU (Kiến thức, Năng lực chung & riêng, Phẩm chất)
2. THIẾT BỊ DẠY HỌC & HỌC LIỆU
3. TIẾN TRÌNH DẠY HỌC (Hoạt động 1: Mở đầu; Hoạt động 2: Hình thành kiến thức mới; Hoạt động 3: Luyện tập; Hoạt động 4: Vận dụng)
4. HƯỚNG DẪN VỀ NHÀ VÀ ĐÁNH GIÁ.`,
    subjectHint: 'Toán, Ngữ văn, Tiếng Anh, KHTN...',
    favoriteCount: 245,
    isFavorite: true,
  },
  {
    id: 'prm-2',
    title: 'Tạo Đề Kiểm Tra Kèm Ma Trận & Bản Đặc Tả',
    category: 'Đề kiểm tra',
    description: 'Tạo ma trận 4 mức độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) + Bản đặc tả + Đề thi + Đáp án.',
    promptTemplate: `Hãy thiết kế đề kiểm tra môn [MÔN HỌC] khối [KHỐI], chủ đề "[CHỦ ĐỀ/BÀI HỌC]", thời gian làm bài [SỐ PHÚT] phút.
Cấu trúc đề gồm: [SỐ CÂU TN] câu trắc nghiệm (4 lựa chọn A, B, C, D) và [SỐ CÂU TL] câu tự luận.
Tỷ lệ nhận thức: 40% Nhận biết - 30% Thông hiểu - 20% Vận dụng - 10% Vận dụng cao.
Đầu ra bao gồm:
1. Ma trận đề kiểm tra
2. Bản đặc tả kĩ thuật
3. Đề bài chính thức
4. Đáp án chi tiết và Thang điểm chấm.`,
    favoriteCount: 312,
    isFavorite: true,
  },
  {
    id: 'prm-3',
    title: 'Tạo Trò Chơi Ô Chữ / Quiz Show Học Tập',
    category: 'Trò chơi',
    description: 'Thiết kế game học tập sôi nổi đầu giờ hoặc củng cố cuối tiết học.',
    promptTemplate: `Hãy thiết kế một kịch bản trò chơi học tập "[TÊN TRÒ CHƠI]" dành cho học sinh THCS môn [MÔN HỌC] bài "[TÊN BÀI]".
Thời lượng: 10 phút khởi động.
Bao gồm: 8 câu hỏi kèm từ khóa hàng ngang/hàng dọc, gợi ý sinh động, luật chơi và cách cộng điểm thi đua theo nhóm.`,
    favoriteCount: 189,
  },
  {
    id: 'prm-4',
    title: 'Xây Dựng Dự Án STEM Liên Môn',
    category: 'STEM',
    description: 'Thiết kế bài học STEM ứng dụng thực tế theo quy trình 5 bước kỹ thuật.',
    promptTemplate: `Hãy thiết kế dự án học tập STEM môn [MÔN HỌC] lớp [KHỐI] với chủ đề "[TÊN CHỦ ĐỀ STEAM]".
Bao gồm:
- Xác định vấn đề thực tiễn cần giải quyết
- Kiến thức nền tảng tích hợp (Toán, Lý, Hóa, Sinh, Tin học...)
- Tiêu chí đánh giá sản phẩm
- Quy trình nghiên cứu & chế tạo mô hình thử nghiệm.`,
    favoriteCount: 156,
  },
  {
    id: 'prm-5',
    title: 'Dàn Ý Slide PowerPoint Bài Giảng Sinh Động',
    category: 'PowerPoint',
    description: 'Gợi ý nội dung từng slide, hình ảnh minh họa và câu hỏi tương tác cho mỗi trang.',
    promptTemplate: `Soạn dàn ý bài giảng trình chiếu PowerPoint cho bài học "[TÊN BÀI HỌC]" môn [MÔN HỌC] lớp [KHỐI] (khoảng 10-12 slide).
Với mỗi slide trình bày:
- Tiêu đề slide
- Nội dung cốt lõi dạng gạch đầu dòng ngắn gọn
- Gợi ý hình ảnh/sơ đồ tư duy cần dùng
- Câu hỏi tương tác / Minigame phát biểu.`,
    favoriteCount: 278,
    isFavorite: true,
  },
  {
    id: 'prm-6',
    title: 'Tạo Phiếu Học Tập Dạng Sơ Đồ Tư Duy / Khuyết Từ',
    category: 'Học liệu',
    description: 'Thiết kế phiếu bài tập tự học cá nhân hoặc thảo luận nhóm.',
    promptTemplate: `Tạo một Phiếu Học Tập (Worksheet) bài "[TÊN BÀI]" môn [MÔN HỌC] lớp [KHỐI].
Nội dung thiết kế thành 3 phần:
Phần A: Nhớ nhanh (Bảng điền từ khuyết)
Phần B: Khám phá (Sơ đồ tư duy / Bảng so sánh)
Phần C: Thử thách (1 câu hỏi vận dụng thực tế gần gũi với lứa tuổi học sinh THCS).`,
    favoriteCount: 195,
  },
  {
    id: 'prm-7',
    title: 'Tạo Nhận Xét Học Sinh Theo Thông Tư 22 (Học Bạ / Sổ Đánh Giá)',
    category: 'Học sinh',
    description: 'Tạo lời nhận xét tinh tế, động viên về ưu điểm, hạn chế và biện pháp khắc phục.',
    promptTemplate: `Hãy tạo 5 mẫu nhận xét học bạ môn [MÔN HỌC] cho học sinh THCS với các mức độ học lực khác nhau (Xuất sắc, Giỏi, Khá, Trung bình, Cần cố gắng).
Yêu cầu: Lời văn ấm áp, chuẩn mực sư phạm, đúng tinh thần Thông tư 22/2021/TT-BGDĐT, kết hợp giữa năng lực môn học và phẩm chất.`,
    favoriteCount: 340,
    isFavorite: true,
  },
  {
    id: 'prm-8',
    title: 'Mẫu Thư Trao Đổi Vớí Phụ Huynh Học Sinh',
    category: 'Phụ huynh',
    description: 'Thư mời họp, thư khen ngợi, hoặc trao đổi tình hình học tập và rèn luyện của học sinh.',
    promptTemplate: `Viết một thông điệp/thư gửi phụ huynh em [TÊN HS] lớp [TÊN LỚP] về nội dung [NỘI DUNG CẦN TRAO ĐỔI: khen ngợi / nhắc nhở bài tập / phối hợp giáo dục].
Sử dụng giọng văn lịch sự, thấu hiểu, mang tính xây dựng cao giữa Nhà trường và Gia đình.`,
    favoriteCount: 167,
  },
  {
    id: 'prm-9',
    title: 'Viết Báo Cáo Thống Kê Tổng Kết Học Kỳ',
    category: 'Báo cáo',
    description: 'Dành cho Tổ trưởng chuyên môn hoặc GVCN tổng hợp tình hình lớp.',
    promptTemplate: `Lập dàn ý bài báo cáo tổng kết học kỳ môn [MÔN HỌC] / Lớp [TÊN LỚP].
Gồm: Đánh giá chất lượng bộ môn, tỷ lệ đạt điểm Giỏi/Khá/Trung bình, phân tích nguyên nhân học sinh còn yếu, giải pháp nâng cao chất lượng học kỳ tiếp theo.`,
    favoriteCount: 142,
  },
  {
    id: 'prm-10',
    title: 'Gợi Ý Đề Tài Sáng Kiến Kinh Nghiệm (SKKN) Ngành Giáo Dục',
    category: 'Sáng kiến kinh nghiệm',
    description: 'Đề xuất tên đề tài SKKN kèm dàn ý giải pháp đột phá ứng dụng CNTT/AI.',
    promptText: `Gợi ý 3 tên đề tài Sáng kiến kinh nghiệm đột phá năm học 2026-2027 dành cho giáo viên môn [MÔN HỌC] cấp THCS. Kèm theo khung giải pháp chi tiết 5 chương cho 1 đề tài ấn tượng nhất.`,
    promptTemplate: `Gợi ý 3 tên đề tài Sáng kiến kinh nghiệm đột phá năm học 2026-2027 dành cho giáo viên môn [MÔN HỌC] cấp THCS.
Kèm theo khung giải pháp chi tiết 5 chương cho 1 đề tài ấn tượng nhất.`,
    favoriteCount: 220,
  },
];

export const mockAiPromptCategories = [
  {
    id: 'cat-1',
    categoryName: 'GỢI Ý PROMPT CHUẨN CÔNG VĂN 5512 & SOẠN GIẢNG',
    prompts: mockAiPrompts.map((p) => ({
      ...p,
      promptText: p.promptText || p.promptTemplate || p.description,
    })),
  },
];

