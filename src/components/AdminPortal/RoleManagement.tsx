import React, { useState } from 'react';
import { demoUsers } from '../../data/mockData';
import {
  ShieldCheck,
  Plus,
  Search,
  Edit3,
  Trash2,
  Users,
  Check,
  X,
  UserPlus,
  Lock,
  Key,
  Shield,
  ChevronRight,
  Copy,
  Filter,
  Sparkles,
  Building2,
  BookOpen,
  FileSpreadsheet,
  Settings,
  Award,
  Globe,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export interface PermissionItem {
  id: string;
  label: string;
  description: string;
}

export interface PermissionGroup {
  category: string;
  icon: React.ElementType;
  permissions: PermissionItem[];
}

export interface CustomRole {
  id: string;
  code: string;
  title: string;
  level: 'executive' | 'department' | 'operational';
  department: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  permissions: string[];
  assignedUsers: string[]; // Names of assigned staff
  isSystem?: boolean;
  updatedAt: string;
}

const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    category: 'Quản Lý Website & Content CMS',
    icon: Globe,
    permissions: [
      { id: 'cms:view', label: 'Xem tin bài & Văn bản', description: 'Quyền xem danh sách tin tức và văn bản công khai' },
      { id: 'cms:create', label: 'Soạn thảo & Đăng bài mới', description: 'Tạo tin tức, thông báo, hình ảnh hoạt động' },
      { id: 'cms:approve', label: 'Duyệt bài đăng toàn trường', description: 'Phê duyệt nội dung xuất bản lên trang chủ trường' },
      { id: 'cms:delete', label: 'Xóa & Lưu trữ nội dung', description: 'Xóa hoặc lưu trữ bài viết cũ trên website' },
    ],
  },
  {
    category: 'Quản Lý Nhân Sự & Giáo Viên',
    icon: Users,
    permissions: [
      { id: 'teacher:view', label: 'Xem hồ sơ cán bộ giáo viên', description: 'Xem danh sách, bằng cấp và phân công giảng dạy' },
      { id: 'teacher:create', label: 'Thêm mới & Tiếp nhận cán bộ', description: 'Tạo hồ sơ giáo viên, nhân viên mới gia nhập trường' },
      { id: 'teacher:assign', label: 'Phân công chủ nhiệm & bộ môn', description: 'Sắp xếp phân công giảng dạy theo năm học' },
      { id: 'teacher:evaluate', label: 'Đánh giá thi đua & Khen thưởng', description: 'Quản lý đánh giá phân loại thi đua cán bộ' },
    ],
  },
  {
    category: 'Quản Lý Học Sinh & Học Tập',
    icon: BookOpen,
    permissions: [
      { id: 'student:view', label: 'Xem học bạ & Sổ điểm', description: 'Xem thông tin cá nhân và kết quả học tập học sinh' },
      { id: 'student:grade_approve', label: 'Duyệt & Khóa sổ điểm môn', description: 'Phê duyệt điểm số học kỳ và khóa sổ điểm điện tử' },
      { id: 'student:discipline', label: 'Duyệt Khen thưởng & Kỷ luật', description: 'Quản lý quyết định khen thưởng và xử lý vi phạm' },
      { id: 'student:transfer', label: 'Duyệt chuyển lớp & Tiếp nhận', description: 'Xử lý thủ tục rút học bạ, chuyển lớp/chuyển trường' },
    ],
  },
  {
    category: 'Thời Khóa Biểu & Lịch Công Tác',
    icon: Sliders,
    permissions: [
      { id: 'schedule:manage', label: 'Lập & Xếp thời khóa biểu', description: 'Tạo và điều chỉnh TKB cho toàn bộ khối lớp' },
      { id: 'schedule:approve_swap', label: 'Duyệt dạy thay & Đổi tiết', description: 'Phê duyệt phiếu báo giảng dạy thay và đổi tiết dạy' },
    ],
  },
  {
    category: 'Báo Cáo & Thống Kê BGH',
    icon: FileSpreadsheet,
    permissions: [
      { id: 'reports:view', label: 'Xem báo cáo chuyên môn & BGH', description: 'Xem tổng quan kết quả học tập và chuyên cần' },
      { id: 'reports:export', label: 'Xuất dữ liệu Excel/PDF cấp Sở', description: 'Trích xuất báo cáo dữ liệu ngành cho Phòng/Sở GD&ĐT' },
    ],
  },
  {
    category: 'Hệ Thống & Trợ Lý AI Hub',
    icon: Settings,
    permissions: [
      { id: 'ai:access_advanced', label: 'Sử dụng AI Hub chuyên sâu', description: 'Truy cập các tính năng trợ lý AI nâng cao cho BGH' },
      { id: 'system:rbac', label: 'Quản lý phân quyền RBAC', description: 'Tạo và phân bổ vai trò quản lý cho cán bộ nhân viên' },
      { id: 'system:settings', label: 'Cấu hình chung nhà trường', description: 'Thay đổi thông tin trường, niên khóa và tham số hệ thống' },
    ],
  },
];

const INITIAL_ROLES: CustomRole[] = [
  {
    id: 'role-1',
    code: 'PRINCIPAL',
    title: 'Hiệu Trưởng / Trưởng BGH',
    level: 'executive',
    department: 'Ban Giám Hiệu',
    description: 'Điều hành toàn bộ hoạt động chuyên môn, nhân sự, tài chính và định hướng phát triển nhà trường.',
    color: 'border-purple-300 bg-purple-50/50',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    badgeText: 'Cấp Điều Hành BGH',
    permissions: PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.id)),
    assignedUsers: ['Hà Văn Vương'],
    isSystem: true,
    updatedAt: '10/08/2026',
  },
  {
    id: 'role-2',
    code: 'VICE_PRINCIPAL_ACADEMIC',
    title: 'Phó Hiệu Trưởng Chuyên Môn',
    level: 'executive',
    department: 'Ban Giám Hiệu',
    description: 'Chịu trách nhiệm chỉ đạo công tác giảng dạy, thời khóa biểu, thi học sinh giỏi và chất lượng đào tạo.',
    color: 'border-indigo-300 bg-indigo-50/50',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    badgeText: 'Cấp Điều Hành BGH',
    permissions: [
      'cms:view',
      'cms:create',
      'cms:approve',
      'teacher:view',
      'teacher:assign',
      'teacher:evaluate',
      'student:view',
      'student:grade_approve',
      'student:discipline',
      'schedule:manage',
      'schedule:approve_swap',
      'reports:view',
      'reports:export',
      'ai:access_advanced',
    ],
    assignedUsers: ['Trần Văn Bình'],
    isSystem: false,
    updatedAt: '08/08/2026',
  },
  {
    id: 'role-3',
    code: 'DEPARTMENT_HEAD_MATH',
    title: 'Tổ Trưởng Chuyên Môn Toán - Tin',
    level: 'department',
    department: 'Tổ Toán - Tin',
    description: 'Quản lý sinh hoạt tổ chuyên môn, duyệt giáo án, kiểm tra tiến độ chương trình và chất lượng môn học.',
    color: 'border-blue-300 bg-blue-50/50',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    badgeText: 'Cấp Tổ Chuyên Môn',
    permissions: [
      'cms:view',
      'teacher:view',
      'student:view',
      'student:grade_approve',
      'schedule:approve_swap',
      'reports:view',
      'ai:access_advanced',
    ],
    assignedUsers: ['Nguyễn Văn An'],
    isSystem: false,
    updatedAt: '05/08/2026',
  },
  {
    id: 'role-4',
    code: 'INSPECTION_LEAD',
    title: 'Trưởng Ban Thanh Tra Giáo Dục',
    level: 'operational',
    department: 'Ban Thanh Tra',
    description: 'Thanh tra nề nếp giảng dạy, dự giờ đột xuất, kiểm tra hồ sơ sổ sách và giải quyết khiếu nại.',
    color: 'border-amber-300 bg-amber-50/50',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeText: 'Cấp Ban Chức Năng',
    permissions: [
      'cms:view',
      'teacher:view',
      'student:view',
      'reports:view',
      'reports:export',
    ],
    assignedUsers: ['Lê Thị Mai'],
    isSystem: false,
    updatedAt: '01/08/2026',
  },
  {
    id: 'role-5',
    code: 'EQUIPMENT_LIBRARY_MANAGER',
    title: 'Quản Lý Thư Viện & Thiết Bị Dạy Học',
    level: 'operational',
    department: 'Tổ Thiết Bị - Thư Viện',
    description: 'Quản lý kho sách, thiết bị thí nghiệm, mượn trả dụng cụ học tập và tài nguyên số.',
    color: 'border-emerald-300 bg-emerald-50/50',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeText: 'Cấp Vận Hành',
    permissions: [
      'cms:view',
      'cms:create',
      'student:view',
      'reports:view',
    ],
    assignedUsers: ['Phạm Hoàng Long'],
    isSystem: false,
    updatedAt: '25/07/2026',
  },
];

export const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<CustomRole[]>(INITIAL_ROLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix'>('cards');

  // Modal State for Creating/Editing Role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<CustomRole | null>(null);

  // Modal State for Assigning User
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignRoleTarget, setAssignRoleTarget] = useState<CustomRole | null>(null);
  const [selectedStaffName, setSelectedStaffName] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formLevel, setFormLevel] = useState<'executive' | 'department' | 'operational'>('department');
  const [formDepartment, setFormDepartment] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPermissions, setFormPermissions] = useState<string[]>([]);
  const [formColorTheme, setFormColorTheme] = useState('indigo');

  const openCreateModal = () => {
    setEditingRole(null);
    setFormTitle('');
    setFormCode('');
    setFormLevel('department');
    setFormDepartment('Tổ Chuyên Môn');
    setFormDescription('');
    setFormPermissions(['cms:view', 'teacher:view', 'student:view']);
    setFormColorTheme('indigo');
    setIsModalOpen(true);
  };

  const openEditModal = (role: CustomRole) => {
    setEditingRole(role);
    setFormTitle(role.title);
    setFormCode(role.code);
    setFormLevel(role.level);
    setFormDepartment(role.department);
    setFormDescription(role.description);
    setFormPermissions(role.permissions);
    setFormColorTheme(
      role.color.includes('purple')
        ? 'purple'
        : role.color.includes('indigo')
        ? 'indigo'
        : role.color.includes('blue')
        ? 'blue'
        : role.color.includes('amber')
        ? 'amber'
        : 'emerald'
    );
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingRole) {
      // Auto generate code
      const generatedCode = val
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '_');
      setFormCode(generatedCode);
    }
  };

  const togglePermission = (permId: string) => {
    setFormPermissions((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  const toggleAllInGroup = (group: PermissionGroup) => {
    const groupPermIds = group.permissions.map((p) => p.id);
    const hasAll = groupPermIds.every((id) => formPermissions.includes(id));
    if (hasAll) {
      setFormPermissions((prev) => prev.filter((id) => !groupPermIds.includes(id)));
    } else {
      setFormPermissions((prev) => Array.from(new Set([...prev, ...groupPermIds])));
    }
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Vui lòng nhập Tên Vai Trò Quản Lý');
      return;
    }

    const themeMap: Record<
      string,
      { color: string; badgeBg: string; badgeText: string }
    > = {
      purple: {
        color: 'border-purple-300 bg-purple-50/50',
        badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
        badgeText: formLevel === 'executive' ? 'Cấp Điều Hành BGH' : 'Cấp Quản Lý',
      },
      indigo: {
        color: 'border-indigo-300 bg-indigo-50/50',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        badgeText: formLevel === 'executive' ? 'Cấp Điều Hành BGH' : 'Cấp Quản Lý',
      },
      blue: {
        color: 'border-blue-300 bg-blue-50/50',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
        badgeText: formLevel === 'department' ? 'Cấp Tổ Chuyên Môn' : 'Cấp Quản Lý',
      },
      amber: {
        color: 'border-amber-300 bg-amber-50/50',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
        badgeText: 'Cấp Ban Chức Năng',
      },
      emerald: {
        color: 'border-emerald-300 bg-emerald-50/50',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        badgeText: 'Cấp Vận Hành',
      },
    };

    const selectedTheme = themeMap[formColorTheme] || themeMap['indigo'];

    if (editingRole) {
      // Update
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole.id
            ? {
                ...r,
                title: formTitle,
                code: formCode || r.code,
                level: formLevel,
                department: formDepartment || 'Toàn trường',
                description: formDescription,
                permissions: formPermissions,
                color: selectedTheme.color,
                badgeBg: selectedTheme.badgeBg,
                badgeText: selectedTheme.badgeText,
                updatedAt: new Date().toLocaleDateString('vi-VN'),
              }
            : r
        )
      );
      showToast(`Đã cập nhật vai trò quản lý: ${formTitle}`);
    } else {
      // Create
      const newRole: CustomRole = {
        id: `role-${Date.now()}`,
        code: formCode || `ROLE_${Date.now()}`,
        title: formTitle,
        level: formLevel,
        department: formDepartment || 'Toàn trường',
        description: formDescription || 'Vai trò quản lý chuyên trách mới được tạo.',
        color: selectedTheme.color,
        badgeBg: selectedTheme.badgeBg,
        badgeText: selectedTheme.badgeText,
        permissions: formPermissions,
        assignedUsers: [],
        isSystem: false,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      };
      setRoles((prev) => [newRole, ...prev]);
      showToast(`Đã tạo thành công vai trò quản lý mới: ${formTitle}`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteRole = (role: CustomRole) => {
    if (role.isSystem) {
      alert('Không thể xóa vai trò mặc định của hệ thống!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa vai trò quản lý "${role.title}"?`)) {
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      showToast(`Đã xóa vai trò "${role.title}"`);
    }
  };

  const handleDuplicateRole = (role: CustomRole) => {
    const dupRole: CustomRole = {
      ...role,
      id: `role-${Date.now()}`,
      code: `${role.code}_COPY`,
      title: `${role.title} (Bản sao)`,
      assignedUsers: [],
      isSystem: false,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };
    setRoles((prev) => [dupRole, ...prev]);
    showToast(`Đã nhân bản vai trò "${role.title}"`);
  };

  // Assign Staff
  const openAssignModal = (role: CustomRole) => {
    setAssignRoleTarget(role);
    setSelectedStaffName('');
    setIsAssignModalOpen(true);
  };

  const handleAssignStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignRoleTarget || !selectedStaffName) return;

    if (assignRoleTarget.assignedUsers.includes(selectedStaffName)) {
      alert('Cán bộ này đã giữ vai trò quản lý này từ trước!');
      return;
    }

    setRoles((prev) =>
      prev.map((r) =>
        r.id === assignRoleTarget.id
          ? { ...r, assignedUsers: [...r.assignedUsers, selectedStaffName] }
          : r
      )
    );

    showToast(`Đã gán vai trò "${assignRoleTarget.title}" cho cán bộ ${selectedStaffName}`);
    setIsAssignModalOpen(false);
  };

  const handleRemoveStaff = (roleId: string, staffName: string) => {
    if (confirm(`Bản có chắc muốn bãi nhiệm vai trò này đối với ${staffName}?`)) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === roleId
            ? { ...r, assignedUsers: r.assignedUsers.filter((u) => u !== staffName) }
            : r
        )
      );
      showToast(`Đã thu hồi vai trò khỏi cán bộ ${staffName}`);
    }
  };

  // Filtered Roles
  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || role.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const allTeachersAndStaff = demoUsers.filter(
    (u) => u.role === 'teacher' || u.role === 'homeroom_teacher' || u.role === 'admin' || u.role === 'principal'
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
            <span>QUẢN TRỊ NĂNG LỰC HỆ THỐNG - RBAC ENFORCER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            QUẢN LÝ VAI TRÒ & PHÂN QUYỀN
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Khởi tạo các vai trò quản lý chuyên trách (Phó Hiệu trưởng, Tổ trưởng bộ môn, Ban thanh tra, Thủ thư, v.v.), cấu hình ma trận phân quyền chi tiết cho toàn bộ nhân sự nhà trường.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>TẠO VAI TRÒ MỚI</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase">TỔNG SỐ VAI TRÒ</span>
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{roles.length}</div>
          <p className="text-[10px] text-slate-500 font-medium">Bao gồm {roles.filter((r) => !r.isSystem).length} vai trò tùy chỉnh</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase">CẤP BGH ĐIỀU HÀNH</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-900">
            {roles.filter((r) => r.level === 'executive').length}
          </div>
          <p className="text-[10px] text-indigo-600 font-medium">Ban Giám Hiệu & Quản trị</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase">CẤP TỔ CHUYÊN MÔN</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">
            {roles.filter((r) => r.level === 'department').length}
          </div>
          <p className="text-[10px] text-blue-600 font-medium">Tổ trưởng & Khối trưởng</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase">CÁN BỘ ĐƯỢC GÁN VAI TRÒ</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900">
            {Array.from(new Set(roles.flatMap((r) => r.assignedUsers))).length}
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">Cán bộ / Giáo viên đảm nhiệm</p>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên vai trò, mã hoặc phòng ban..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-3">
          {/* Level Filter */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedLevel('executive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === 'executive'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cấp BGH
            </button>
            <button
              onClick={() => setSelectedLevel('department')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === 'department'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cấp Tổ Chuyên Môn
            </button>
            <button
              onClick={() => setSelectedLevel('operational')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === 'operational'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cấp Vận Hành
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cards'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Danh Sách Cards
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ma Trận RBAC
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'cards' ? (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className={`bg-white rounded-3xl border-2 p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${role.color}`}
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full border mb-2 ${role.badgeBg}`}
                    >
                      {role.badgeText}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {role.title}
                    </h3>
                    <div className="text-[11px] font-mono font-bold text-slate-400 mt-0.5">
                      {role.code} • {role.department}
                    </div>
                  </div>

                  {role.isSystem && (
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md shrink-0">
                      Gốc Hệ Thống
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {role.description}
                </p>

                {/* Permissions count breakdown */}
                <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-indigo-600" />
                      Quyền hạn được cấp:
                    </span>
                    <span className="font-extrabold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                      {role.permissions.length} / {PERMISSION_GROUPS.flatMap((g) => g.permissions).length}
                    </span>
                  </div>

                  {/* Sample granted permission tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {role.permissions.slice(0, 4).map((pId) => {
                      const found = PERMISSION_GROUPS.flatMap((g) => g.permissions).find(
                        (item) => item.id === pId
                      );
                      return (
                        <span
                          key={pId}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {found ? found.label : pId}
                        </span>
                      );
                    })}
                    {role.permissions.length > 4 && (
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        +{role.permissions.length - 4} quyền khác...
                      </span>
                    )}
                  </div>
                </div>

                {/* Assigned Staff */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      Cán bộ đảm nhiệm ({role.assignedUsers.length}):
                    </span>
                    <button
                      onClick={() => openAssignModal(role)}
                      className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <UserPlus className="w-3 h-3" />
                      Gán cán bộ
                    </button>
                  </div>

                  {role.assignedUsers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {role.assignedUsers.map((staff) => (
                        <span
                          key={staff}
                          className="inline-flex items-center space-x-1 text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-xl"
                        >
                          <span>{staff}</span>
                          <button
                            onClick={() => handleRemoveStaff(role.id, staff)}
                            className="text-emerald-500 hover:text-red-600 ml-1 rounded-full hover:bg-emerald-100 p-0.5 transition-colors cursor-pointer"
                            title="Bãi nhiệm vai trò này"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Chưa có cán bộ nào được bổ nhiệm vai trò này.</p>
                  )}
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/80">
                <span className="text-[10px] text-slate-400">Cập nhật: {role.updatedAt}</span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleDuplicateRole(role)}
                    className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Nhân bản cấu hình vai trò này"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openEditModal(role)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Chỉnh sửa quyền & thông tin vai trò"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {!role.isSystem && (
                    <button
                      onClick={() => handleDeleteRole(role)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                      title="Xóa vai trò tùy chỉnh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* RBAC Matrix View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                MA TRẬN PHÂN QUYỀN HỆ THỐNG (RBAC PERMISSION MATRIX)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                So sánh quyền truy cập chi tiết giữa tất cả các vai trò quản lý trong nhà trường.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-200">
              {roles.length} Vai Trò x {PERMISSION_GROUPS.flatMap((g) => g.permissions).length} Quyền
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-700 uppercase">
                  <th className="p-4 min-w-[280px] sticky left-0 bg-slate-100 z-10 border-r border-slate-200">
                    NÓM QUYỀN / TÊN QUYỀN HẠN
                  </th>
                  {filteredRoles.map((role) => (
                    <th key={role.id} className="p-4 min-w-[160px] text-center border-r border-slate-200">
                      <div className="font-extrabold text-slate-900">{role.title}</div>
                      <div className="text-[9px] font-mono font-semibold text-slate-500">{role.code}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {PERMISSION_GROUPS.map((group) => (
                  <React.Fragment key={group.category}>
                    {/* Category Header Row */}
                    <tr className="bg-slate-50/80 font-bold text-slate-800">
                      <td
                        colSpan={filteredRoles.length + 1}
                        className="p-3 pl-4 bg-slate-100/60 font-black text-slate-700 text-xs uppercase tracking-wider flex items-center gap-2"
                      >
                        <group.icon className="w-4 h-4 text-indigo-600" />
                        <span>{group.category}</span>
                      </td>
                    </tr>

                    {/* Permission Items Rows */}
                    {group.permissions.map((perm) => (
                      <tr key={perm.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3 pl-8 sticky left-0 bg-white z-10 border-r border-slate-200">
                          <div className="font-bold text-slate-900">{perm.label}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{perm.description}</div>
                        </td>

                        {filteredRoles.map((role) => {
                          const hasPerm = role.permissions.includes(perm.id);
                          return (
                            <td key={role.id} className="p-3 text-center border-r border-slate-200">
                              {hasPerm ? (
                                <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-emerald-100 text-emerald-800">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-slate-100 text-slate-300">
                                  <X className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE / EDIT ROLE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">
                    {editingRole ? 'CHỈNH SỬA VAI TRÒ QUẢN LÝ' : 'TẠO VAI TRÒ QUẢN LÝ MỚI'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Cấu hình tên, phạm vi và ma trận phân quyền cho vai trò chuyên trách
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveRole} className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Tên Vai Trò Quản Lý <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Phó Hiệu Trưởng Chuyên Môn"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Mã Định Danh (Role Code)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: VICE_PRINCIPAL"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-indigo-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Cấp Quản Lý
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="executive">Cấp Điều Hành BGH</option>
                    <option value="department">Cấp Tổ Chuyên Môn / Phòng Ban</option>
                    <option value="operational">Cấp Ban Chức Năng / Vận Hành</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                    Tổ / Phòng Ban Phụ Trách
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Ban Giám Hiệu, Tổ Toán - Tin"
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Mô Tả Nhiệm Vụ & Trách Nhiệm
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt phạm vi trách nhiệm của vai trò quản lý này..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Theme Color Picker */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">
                  Tông Màu Nhận Diện Card
                </label>
                <div className="flex items-center space-x-3">
                  {[
                    { id: 'purple', bg: 'bg-purple-500', label: 'Tím BGH' },
                    { id: 'indigo', bg: 'bg-indigo-500', label: 'Xanh Chuyên Môn' },
                    { id: 'blue', bg: 'bg-blue-500', label: 'Xanh Tổ Trưởng' },
                    { id: 'amber', bg: 'bg-amber-500', label: 'Cam Thanh Tra' },
                    { id: 'emerald', bg: 'bg-emerald-500', label: 'Lục Vận Hành' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setFormColorTheme(item.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        formColorTheme === item.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${item.bg}`} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions checklist grouped */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase flex items-center gap-2">
                    <Key className="w-4 h-4 text-indigo-600" />
                    BẢNG PHÂN QUYỀN HỆ THỐNG ({formPermissions.length} quyền chọn)
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormPermissions(
                          PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.id))
                        )
                      }
                      className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={() => setFormPermissions([])}
                      className="text-[11px] font-bold text-slate-500 hover:underline cursor-pointer"
                    >
                      Bỏ chọn tất cả
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {PERMISSION_GROUPS.map((group) => {
                    const groupPermIds = group.permissions.map((p) => p.id);
                    const isAllSelected = groupPermIds.every((id) =>
                      formPermissions.includes(id)
                    );

                    return (
                      <div
                        key={group.category}
                        className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                          <span className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                            <group.icon className="w-4 h-4 text-indigo-600" />
                            {group.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleAllInGroup(group)}
                            className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 cursor-pointer"
                          >
                            {isAllSelected ? 'Bỏ chọn nhóm này' : 'Chọn toàn bộ nhóm'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {group.permissions.map((perm) => {
                            const checked = formPermissions.includes(perm.id);
                            return (
                              <label
                                key={perm.id}
                                className={`flex items-start space-x-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  checked
                                    ? 'bg-white border-indigo-300 ring-1 ring-indigo-500/20 shadow-2xs'
                                    : 'bg-transparent border-slate-200 hover:bg-white'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => togglePermission(perm.id)}
                                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                                />
                                <div className="space-y-0.5">
                                  <div className="text-xs font-bold text-slate-900">
                                    {perm.label}
                                  </div>
                                  <div className="text-[10px] text-slate-500 leading-tight">
                                    {perm.description}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  {editingRole ? 'LƯU CẤP NHẬT VAI TRÒ' : 'TẠO VAI TRÒ QUẢN LÝ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN ROLE TO STAFF */}
      {isAssignModalOpen && assignRoleTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    BỔ NHIỆM CÁN BỘ QUẢN LÝ
                  </h3>
                  <p className="text-xs text-slate-500">{assignRoleTarget.title}</p>
                </div>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">
                  Chọn Cán Bộ / Giáo Viên
                </label>
                <select
                  required
                  value={selectedStaffName}
                  onChange={(e) => setSelectedStaffName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Chọn cán bộ giáo viên từ danh sách --</option>
                  {allTeachersAndStaff.map((staff) => (
                    <option key={staff.id} value={staff.name}>
                      {staff.name} - {staff.department || 'Giáo viên'} ({staff.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-emerald-700" />
                  Quyền lợi khi gán vai trò:
                </div>
                <p className="text-[11px] text-emerald-800">
                  Cán bộ được chọn sẽ ngay lập tức thừa hưởng toàn bộ {assignRoleTarget.permissions.length} quyền quản lý của vai trò "{assignRoleTarget.title}".
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  HỦY
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  XÁC NHẬN BỔ NHIỆM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
