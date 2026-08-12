import React, { useState } from 'react';
import { demoUsers } from '../../data/mockData';
import { User } from '../../types';
import { Users, Search, Plus, Edit2, Mail, Phone, ShieldCheck, UserCheck, Trash2, X } from 'lucide-react';

export const TeacherManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Tất cả');
  const [teachersList, setTeachersList] = useState<User[]>(
    demoUsers.filter((u) => u.role === 'teacher' || u.role === 'homeroom_teacher')
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // New Teacher form state
  const [newCode, setNewCode] = useState('GV' + Math.floor(100 + Math.random() * 900));
  const [newName, setNewName] = useState('');
  const [newSubject, setNewSubject] = useState('Toán học');
  const [newDept, setNewDept] = useState('Tổ Toán - Tin');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const departments = ['Tất cả', 'Tổ Toán - Tin', 'Tổ Ngữ Văn - GDCD', 'Tổ Ngoại Ngữ', 'Tổ KHTN'];

  const filteredTeachers = teachersList.filter((t) => {
    const matchesDept = departmentFilter === 'Tất cả' || t.department === departmentFilter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.subject && t.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const createdTeacher: User = {
      id: 'u-' + Date.now(),
      code: newCode,
      name: newName,
      email: newEmail || `${newCode.toLowerCase()}@tanloi.edu.vn`,
      role: 'teacher',
      phone: newPhone || '0901.234.567',
      department: newDept,
      subject: newSubject,
      status: 'active',
    };

    setTeachersList([createdTeacher, ...teachersList]);
    setShowAddModal(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            <span>QUẢN LÝ ĐỘI NGŨ GIÁO VIÊN ({teachersList.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách cán bộ giáo viên, phân công bộ môn & tổ chuyên môn</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2 shrink-0"
          id="add-teacher-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Giáo Viên Mới</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo Mã GV, Họ tên, Môn dạy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden ring-1 ring-slate-200"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                departmentFilter === dept
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">MÃ GV & HỌ TÊN</th>
                <th className="p-4">BỘ MÔN & TỔ CHUYÊN MÔN</th>
                <th className="p-4">NHIỆM VỤ</th>
                <th className="p-4">LIÊN HỆ</th>
                <th className="p-4 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Mã: {t.code}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{t.subject || 'Chưa phân công'}</div>
                    <div className="text-[10px] text-slate-500">{t.department}</div>
                  </td>

                  <td className="p-4">
                    {t.role === 'homeroom_teacher' ? (
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        GVCN Lớp {t.className}
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        Giáo viên bộ môn
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" /> {t.email}
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {t.phone}
                    </div>
                  </td>

                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => alert(`Chỉnh sửa hồ sơ GV ${t.name}`)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTeachersList(teachersList.filter((item) => item.id !== t.id))}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">THÊM GIÁO VIÊN MỚI</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mã Giáo Viên</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-mono text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và Tên Giáo Viên</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cô Nguyễn Mai Phương"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bộ Môn Chính</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-800 bg-white"
                  >
                    <option value="Toán học">Toán học</option>
                    <option value="Ngữ văn">Ngữ văn</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                    <option value="Vật lý">Vật lý</option>
                    <option value="Hóa học">Hóa học</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tổ Chuyên Môn</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-800 bg-white"
                  >
                    <option value="Tổ Toán - Tin">Tổ Toán - Tin</option>
                    <option value="Tổ Ngữ Văn - GDCD">Tổ Ngữ Văn - GDCD</option>
                    <option value="Tổ Ngoại Ngữ">Tổ Ngoại Ngữ</option>
                    <option value="Tổ KHTN">Tổ KHTN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  placeholder="0912.345.678"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                >
                  Lưu Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
